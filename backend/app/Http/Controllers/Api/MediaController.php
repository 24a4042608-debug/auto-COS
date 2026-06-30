<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use ZipArchive;

class MediaController extends Controller
{
    public function index(Request $request)
    {
        $query = Asset::query();

        if ($request->type) {
            $query->where('type', $request->type);
        }

        if ($request->unmapped) {
            $query->doesntHave('products');
        }

        if ($search = $request->search) {
            $query->where('original_name', 'like', "%{$search}%");
        }

        return response()->json($query->latest()->paginate($request->per_page ?? 40));
    }

    public function upload(Request $request)
    {
        $request->validate([
            'files'   => 'required|array',
            'files.*' => 'file|mimes:jpg,jpeg,png,webp,gif,mp4,mov,webm|max:102400',
            'model'   => 'nullable|string|in:products,brands,suppliers,categories,media',
        ]);

        $model    = $request->input('model', 'media');
        $uploaded = [];
        foreach ($request->file('files') as $file) {
            $uploaded[] = $this->storeFile($file, $model);
        }

        return response()->json($uploaded, 201);
    }

    public function uploadZip(Request $request)
    {
        $request->validate(['zip' => 'required|file|mimes:zip|max:524288']);

        $zipFile    = $request->file('zip');
        $tmpZipPath = sys_get_temp_dir() . '/' . Str::uuid() . '.zip';
        $zipFile->move(sys_get_temp_dir(), basename($tmpZipPath));

        $zip = new ZipArchive();
        if ($zip->open($tmpZipPath) !== true) {
            return response()->json(['message' => 'Không thể mở file ZIP.'], 422);
        }

        $uploadDir    = public_path('uploads/media');
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $uploaded     = [];
        $allowedMimes = ['jpg', 'jpeg', 'png', 'webp', 'gif', 'mp4', 'mov', 'webm'];
        $mimeMap      = [
            'jpg'  => 'image/jpeg', 'jpeg' => 'image/jpeg',
            'png'  => 'image/png',  'webp' => 'image/webp',
            'gif'  => 'image/gif',  'mp4'  => 'video/mp4',
            'mov'  => 'video/quicktime', 'webm' => 'video/webm',
        ];

        for ($i = 0; $i < $zip->numFiles; $i++) {
            $name = $zip->getNameIndex($i);
            $ext  = strtolower(pathinfo($name, PATHINFO_EXTENSION));

            if (!in_array($ext, $allowedMimes) || str_ends_with($name, '/')) {
                continue;
            }

            $filename = Str::uuid() . '.' . $ext;
            $destPath = $uploadDir . '/' . $filename;
            file_put_contents($destPath, $zip->getFromIndex($i));

            $type = in_array($ext, ['mp4', 'mov', 'webm']) ? 'video' : 'image';
            $path = 'uploads/media/' . $filename;
            $url  = config('app.url') . '/' . $path;

            $asset = Asset::create([
                'filename'      => $filename,
                'original_name' => basename($name),
                'disk'          => 'local_public',
                'path'          => $path,
                'url'           => $url,
                'mime_type'     => $mimeMap[$ext] ?? 'application/octet-stream',
                'type'          => $type,
                'size'          => filesize($destPath),
            ]);

            $uploaded[] = $asset;
        }

        $zip->close();
        @unlink($tmpZipPath);

        return response()->json($uploaded, 201);
    }

    public function autoMap()
    {
        $unmappedAssets = Asset::doesntHave('products')->get();
        $mapped         = 0;

        foreach ($unmappedAssets as $asset) {
            $name = pathinfo($asset->original_name, PATHINFO_FILENAME);
            if (preg_match('/^([A-Za-z0-9\-]+?)(?:[_\s\.]|$)/', $name, $matches)) {
                $sku     = $matches[1];
                $product = Product::where('sku', $sku)->first();

                if ($product) {
                    $isPrimary = !$product->assets()->exists();
                    $product->assets()->syncWithoutDetaching([
                        $asset->id => [
                            'sort_order' => $product->assets()->count(),
                            'is_primary' => $isPrimary,
                        ],
                    ]);
                    $mapped++;
                }
            }
        }

        return response()->json(['message' => "Đã tự động liên kết {$mapped} tài nguyên vào sản phẩm."]);
    }

    public function destroy(Asset $asset)
    {
        // Delete the physical file
        $fullPath = public_path($asset->path);
        if (file_exists($fullPath)) {
            @unlink($fullPath);
        }
        $asset->delete();

        return response()->json(['message' => 'Đã xóa tài nguyên.']);
    }

    /**
     * Store a single uploaded file to public/uploads/{model}/
     * @param  \Illuminate\Http\UploadedFile $file
     * @param  string $model  e.g. 'products', 'brands', 'media'
     */
    public function storeFile($file, string $model = 'media'): Asset
    {
        $ext      = strtolower($file->getClientOriginalExtension());
        $filename = Str::uuid() . '.' . $ext;

        // Capture these BEFORE move() — move() deletes the temp file
        $originalName = $file->getClientOriginalName();
        $mimeType     = $file->getMimeType() ?? 'application/octet-stream';
        $fileSize     = $file->getSize();

        // Create directory: public/uploads/{model}/
        $uploadDir = public_path('uploads/' . $model);
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }
        $file->move($uploadDir, $filename);

        $type = in_array($ext, ['mp4', 'mov', 'webm']) ? 'video' : 'image';
        $path = 'uploads/' . $model . '/' . $filename;
        $url  = config('app.url') . '/' . $path;

        $width = $height = null;
        if ($type === 'image') {
            [$width, $height] = @getimagesize(public_path($path)) ?: [null, null];
        }

        return Asset::create([
            'filename'      => $filename,
            'original_name' => $originalName,
            'disk'          => 'local_public',
            'path'          => $path,
            'url'           => $url,
            'mime_type'     => $mimeType,
            'type'          => $type,
            'size'          => $fileSize,
            'width'         => $width,
            'height'        => $height,
        ]);
    }
}
