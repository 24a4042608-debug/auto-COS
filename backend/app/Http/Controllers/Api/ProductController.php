<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $query = Product::with(['category:id,name', 'brand:id,name', 'supplier:id,name'])
            ->withCount('variants');

        if ($search = $request->search) {
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('sku', 'like', "%{$search}%");
            });
        }

        if ($request->category_id) {
            $query->where('category_id', $request->category_id);
        }

        if ($request->brand_id) {
            $query->where('brand_id', $request->brand_id);
        }

        if ($request->status) {
            $query->where('status', $request->status);
        }

        return response()->json(
            $query->latest()->paginate($request->per_page ?? 20)
        );
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'sku'             => 'required|string|unique:products',
            'barcode'         => 'nullable|string',
            'name'            => 'required|string|max:255',
            'short_description' => 'nullable|string',
            'description'     => 'nullable|string',
            'category_id'     => 'nullable|exists:categories,id',
            'brand_id'        => 'nullable|exists:brands,id',
            'supplier_id'     => 'nullable|exists:suppliers,id',
            'cost_price'      => 'nullable|numeric|min:0',
            'price'           => 'required|numeric|min:0',
            'sale_price'      => 'nullable|numeric|min:0',
            'stock'           => 'nullable|integer|min:0',
            'min_stock'       => 'nullable|integer|min:0',
            'seo_title'       => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'tags'            => 'nullable|array',
            'status'          => 'nullable|in:draft,active,inactive',
            'variants'        => 'nullable|array',
            'variants.*.sku'        => 'required_with:variants|string',
            'variants.*.attributes' => 'required_with:variants|array',
            'variants.*.price'      => 'nullable|numeric|min:0',
            'variants.*.stock'      => 'nullable|integer|min:0',
        ]);

        $data['slug']         = Str::slug($data['name']) . '-' . Str::random(6);
        $data['has_variants'] = ! empty($data['variants']);

        $variants = $data['variants'] ?? [];
        unset($data['variants']);

        $product = Product::create($data);

        foreach ($variants as $variant) {
            $product->variants()->create($variant);
        }

        return response()->json($product->load('variants'), 201);
    }

    public function show(Product $product)
    {
        return response()->json(
            $product->load(['category', 'brand', 'supplier', 'variants', 'assets'])
        );
    }

    public function update(Request $request, Product $product)
    {
        $data = $request->validate([
            'sku'             => 'sometimes|string|unique:products,sku,' . $product->id,
            'barcode'         => 'nullable|string',
            'name'            => 'sometimes|string|max:255',
            'short_description' => 'nullable|string',
            'description'     => 'nullable|string',
            'category_id'     => 'nullable|exists:categories,id',
            'brand_id'        => 'nullable|exists:brands,id',
            'supplier_id'     => 'nullable|exists:suppliers,id',
            'cost_price'      => 'nullable|numeric|min:0',
            'price'           => 'sometimes|numeric|min:0',
            'sale_price'      => 'nullable|numeric|min:0',
            'stock'           => 'nullable|integer|min:0',
            'min_stock'       => 'nullable|integer|min:0',
            'seo_title'       => 'nullable|string|max:255',
            'seo_description' => 'nullable|string',
            'tags'            => 'nullable|array',
            'status'          => 'nullable|in:draft,active,inactive',
        ]);

        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']) . '-' . Str::random(6);
        }

        $product->update($data);

        return response()->json($product->fresh(['category', 'brand', 'supplier', 'variants']));
    }

    public function destroy(Product $product)
    {
        $product->delete();

        return response()->json(['message' => 'Đã xóa sản phẩm thành công.']);
    }
}
