<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Str;

class CategoryController extends Controller
{
    public function index()
    {
        return response()->json(Category::with('children')->whereNull('parent_id')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'      => 'required|string|max:255',
            'parent_id' => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'sort_order'  => 'nullable|integer',
        ]);
        $data['slug'] = Str::slug($data['name']);
        return response()->json(Category::create($data), 201);
    }

    public function update(Request $request, Category $category)
    {
        $data = $request->validate([
            'name'        => 'sometimes|string|max:255',
            'parent_id'   => 'nullable|exists:categories,id',
            'description' => 'nullable|string',
            'sort_order'  => 'nullable|integer',
            'is_active'   => 'nullable|boolean',
        ]);
        if (isset($data['name'])) {
            $data['slug'] = Str::slug($data['name']);
        }
        $category->update($data);
        return response()->json($category);
    }

    public function destroy(Category $category)
    {
        $category->delete();
        return response()->json(['message' => 'Đã xóa danh mục.']);
    }
}
