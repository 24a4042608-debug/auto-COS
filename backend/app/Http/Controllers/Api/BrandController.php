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
        return response()->json(Brand::orderBy('name')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'        => 'required|string|max:255|unique:brands',
            'description' => 'nullable|string',
            'logo'        => 'nullable|string',
        ]);
        $data['slug'] = Str::slug($data['name']);

        // Handle direct file upload for logo
        if ($request->hasFile('logo_file')) {
            $mediaController = new MediaController();
            $asset = $mediaController->storeFile($request->file('logo_file'), 'brands');
            $data['logo'] = $asset->url;
        }

        return response()->json(Brand::create($data), 201);
    }

    public function update(Request $request, Brand $brand)
    {
        $data = $request->validate([
            'name'        => 'sometimes|string|max:255|unique:brands,name,' . $brand->id,
            'description' => 'nullable|string',
            'is_active'   => 'nullable|boolean',
            'logo'        => 'nullable|string',
        ]);
        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }

        // Handle direct file upload for logo
        if ($request->hasFile('logo_file')) {
            $mediaController = new MediaController();
            $asset = $mediaController->storeFile($request->file('logo_file'), 'brands');
            $data['logo'] = $asset->url;
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
