<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Import;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;
use PhpOffice\PhpSpreadsheet\IOFactory;

class ImportExportController extends Controller
{
    public function index()
    {
        return response()->json(Import::with('user:id,name')->latest()->paginate(20));
    }

    public function import(Request $request)
    {
        $request->validate([
            'file' => 'required|file|mimes:xlsx,xls,csv|max:20480',
        ]);

        $file     = $request->file('file');
        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path     = $file->storeAs('imports', $filename);

        $import = Import::create([
            'user_id'           => $request->user()->id,
            'original_filename' => $file->getClientOriginalName(),
            'stored_path'       => $path,
            'status'            => 'processing',
        ]);

        // Process synchronously (can be moved to Queue in production)
        $this->processImport($import);

        return response()->json($import->fresh(), 201);
    }

    private function processImport(Import $import): void
    {
        try {
            $spreadsheet = IOFactory::load(Storage::path($import->stored_path));
            $sheet       = $spreadsheet->getActiveSheet();
            $rows        = $sheet->toArray(null, true, true, true);

            // First row is header
            $headers = array_map('trim', array_map('strtolower', $rows[1] ?? []));
            array_shift($rows);

            $total   = count($rows);
            $success = 0;
            $errors  = [];

            foreach ($rows as $rowIndex => $row) {
                $data = array_combine($headers, array_values($row));
                $sku  = trim($data['sku'] ?? '');

                if (empty($sku)) {
                    $errors[] = ['row' => $rowIndex + 2, 'error' => 'SKU không được để trống.'];
                    continue;
                }

                try {
                    Product::updateOrCreate(
                        ['sku' => $sku],
                        [
                            'name'        => trim($data['name'] ?? $sku),
                            'slug'        => Str::slug($data['name'] ?? $sku) . '-' . Str::random(4),
                            'price'       => (float) ($data['price'] ?? 0),
                            'cost_price'  => (float) ($data['cost_price'] ?? 0),
                            'sale_price'  => ! empty($data['sale_price']) ? (float) $data['sale_price'] : null,
                            'stock'       => (int) ($data['stock'] ?? 0),
                            'description' => $data['description'] ?? null,
                            'status'      => 'draft',
                        ]
                    );
                    $success++;
                } catch (\Throwable $e) {
                    $errors[] = ['row' => $rowIndex + 2, 'error' => $e->getMessage()];
                }
            }

            $import->update([
                'status'         => 'completed',
                'total_rows'     => $total,
                'processed_rows' => $total,
                'success_rows'   => $success,
                'failed_rows'    => count($errors),
                'errors'         => $errors,
            ]);
        } catch (\Throwable $e) {
            $import->update(['status' => 'failed', 'errors' => [['error' => $e->getMessage()]]]);
        }
    }

    public function export()
    {
        $spreadsheet = new \PhpOffice\PhpSpreadsheet\Spreadsheet();
        $sheet       = $spreadsheet->getActiveSheet();

        // Header row
        $headers = ['SKU', 'Tên sản phẩm', 'Danh mục', 'Thương hiệu', 'Giá vốn', 'Giá bán', 'Giá KM', 'Tồn kho', 'Trạng thái'];
        $sheet->fromArray([$headers], null, 'A1');

        // Style header
        $sheet->getStyle('A1:I1')->getFont()->setBold(true);

        // Data rows
        $row = 2;
        Product::with(['category:id,name', 'brand:id,name'])->chunk(500, function ($products) use ($sheet, &$row) {
            foreach ($products as $p) {
                $sheet->fromArray([[
                    $p->sku,
                    $p->name,
                    $p->category->name ?? '',
                    $p->brand->name ?? '',
                    $p->cost_price,
                    $p->price,
                    $p->sale_price ?? '',
                    $p->stock,
                    $p->status,
                ]], null, "A{$row}");
                $row++;
            }
        });

        $writer   = \PhpOffice\PhpSpreadsheet\IOFactory::createWriter($spreadsheet, 'Xlsx');
        $filename = 'products_export_' . now()->format('Y-m-d_His') . '.xlsx';
        $path     = storage_path("app/exports/{$filename}");

        if (! is_dir(storage_path('app/exports'))) {
            mkdir(storage_path('app/exports'), 0755, true);
        }

        $writer->save($path);

        return response()->download($path, $filename)->deleteFileAfterSend(true);
    }
}
