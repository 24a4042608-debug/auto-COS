<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Brand;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class BrandController extends Controller
{
    public function index()
    {
        return response()->json(Brand::where('is_active', true)->orderBy('name')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255|unique:brands',
            'description' => 'nullable|string',
        ]);
        $data['slug'] = Str::slug($data['name']);
        return response()->json(Brand::create($data), 201);
    }

    public function update(Request $request, Brand $brand)
    {
        $data = $request->validate([
            'name'        => 'sometimes|string|max:255|unique:brands,name,' . $brand->id,
            'description' => 'nullable|string',
            'is_active'   => 'nullable|boolean',
        ]);
        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $brand->update($data);
        return response()->json($brand);
    }

    public function destroy(Brand $brand)
    {
        $brand->delete();
        return response()->json(['message' => 'Đã xóa thương hiệu.']);
    }
}
