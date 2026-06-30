<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Supplier;
use Illuminate\Http\Request;

class SupplierController extends Controller
{
    public function index()
    {
        return response()->json(Supplier::where('is_active', true)->orderBy('name')->get());
    }

    public function store(Request $request)
    {
        $data = $request->validate([
            'name'           => 'required|string|max:255',
            'code'           => 'nullable|string|unique:suppliers',
            'email'          => 'nullable|email',
            'phone'          => 'nullable|string',
            'contact_person' => 'nullable|string',
            'address'        => 'nullable|string',
            'notes'          => 'nullable|string',
        ]);
        return response()->json(Supplier::create($data), 201);
    }

    public function update(Request $request, Supplier $supplier)
    {
        $data = $request->validate([
            'name'           => 'sometimes|string|max:255',
            'code'           => 'nullable|string|unique:suppliers,code,' . $supplier->id,
            'email'          => 'nullable|email',
            'phone'          => 'nullable|string',
            'contact_person' => 'nullable|string',
            'address'        => 'nullable|string',
            'notes'          => 'nullable|string',
            'is_active'      => 'nullable|boolean',
        ]);
        $supplier->update($data);
        return response()->json($supplier);
    }

    public function destroy(Supplier $supplier)
    {
        $supplier->delete();
        return response()->json(['message' => 'Đã xóa nhà cung cấp.']);
    }
}
