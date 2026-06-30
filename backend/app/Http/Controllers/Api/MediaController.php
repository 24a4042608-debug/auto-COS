<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Asset;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
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
            'files.*' => 'file|mimes:jpg,jpeg,png,webp,mp4,mov,webm|max:102400',
        ]);

        $uploaded = [];
        foreach ($request->file('files') as $file) {
            $uploaded[] = $this->storeFile($file);
        }

        return response()->json($uploaded, 201);
    }

    public function uploadZip(Request $request)
    {
        $request->validate(['zip' => 'required|file|mimes:zip|max:524288']);

        $zipFile = $request->file('zip');
        $zipPath = $zipFile->store('tmp_zips');
        $fullZipPath = Storage::path($zipPath);

        $zip = new ZipArchive();
        if ($zip->open($fullZipPath) !== true) {
            return response()->json(['message' => 'Không thể mở file ZIP.'], 422);
        }

        $uploaded = [];
        $allowedMimes = ['jpg', 'jpeg', 'png', 'webp', 'mp4', 'mov', 'webm'];

        for ($i = 0; $i < $zip->numFiles; $i++) {
            $name      = $zip->getNameIndex($i);
            $ext       = strtolower(pathinfo($name, PATHINFO_EXTENSION));

            if (! in_array($ext, $allowedMimes) || str_ends_with($name, '/')) {
                continue;
            }

            $content   = $zip->getFromIndex($i);
            $filename  = Str::uuid() . '.' . $ext;
            $path      = 'media/' . $filename;
            Storage::put($path, $content);

            $type     = in_array($ext, ['mp4', 'mov', 'webm']) ? 'video' : 'image';
            $mimeMap  = ['jpg' => 'image/jpeg', 'jpeg' => 'image/jpeg', 'png' => 'image/png', 'webp' => 'image/webp', 'mp4' => 'video/mp4', 'mov' => 'video/quicktime', 'webm' => 'video/webm'];

            $asset = Asset::create([
                'filename'      => $filename,
                'original_name' => basename($name),
                'disk'          => 'local',
                'path'          => $path,
                'url'           => Storage::url($path),
                'mime_type'     => $mimeMap[$ext] ?? 'application/octet-stream',
                'type'          => $type,
                'size'          => strlen($content),
            ]);

            $uploaded[] = $asset;
        }

        $zip->close();
        Storage::delete($zipPath);

        return response()->json($uploaded, 201);
    }

    public function autoMap()
    {
        // Find all assets that are not yet mapped to any product
        $unmappedAssets = Asset::doesntHave('products')->get();
        $mapped         = 0;

        foreach ($unmappedAssets as $asset) {
            // Extract possible SKU from filename (e.g. "SP001_thumbnail.jpg" -> "SP001")
            $name    = pathinfo($asset->original_name, PATHINFO_FILENAME);
            // Try to match leading alphanumeric SKU before first underscore, dash, or space
            if (preg_match('/^([A-Za-z0-9\-]+?)(?:[_\s\.]|$)/', $name, $matches)) {
                $sku     = $matches[1];
                $product = Product::where('sku', $sku)->first();

                if ($product) {
                    $isPrimary = ! $product->assets()->exists();
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
        Storage::delete($asset->path);
        $asset->delete();

        return response()->json(['message' => 'Đã xóa tài nguyên.']);
    }

    private function storeFile($file): Asset
    {
        $ext      = $file->getClientOriginalExtension();
        $filename = Str::uuid() . '.' . $ext;
        $path     = 'media/' . $filename;
        $file->storeAs('media', $filename);

        $type = in_array(strtolower($ext), ['mp4', 'mov', 'webm']) ? 'video' : 'image';

        $width = $height = null;
        if ($type === 'image') {
            [$width, $height] = @getimagesize($file->getRealPath()) ?: [null, null];
        }

        return Asset::create([
            'filename'      => $filename,
            'original_name' => $file->getClientOriginalName(),
            'disk'          => 'local',
            'path'          => $path,
            'url'           => Storage::url($path),
            'mime_type'     => $file->getMimeType(),
            'type'          => $type,
            'size'          => $file->getSize(),
            'width'         => $width,
            'height'        => $height,
        ]);
    }
}
