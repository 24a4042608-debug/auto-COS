<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\BrandController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\ImportExportController;
use App\Http\Controllers\Api\MediaController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\SupplierController;
use App\Models\Product;
use App\Models\Asset;
use App\Models\Import;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes - Auto Commerce OS
|--------------------------------------------------------------------------
*/

// Public routes
Route::post('/auth/login', [AuthController::class, 'login']);

// Protected routes (Bypassed)
Route::group([], function () {

    // Auth
    Route::get('/auth/me', [AuthController::class, 'me']);
    Route::post('/auth/logout', [AuthController::class, 'logout']);

    // Dashboard stats
    Route::get('/dashboard/stats', function () {
        return response()->json([
            'total_products' => Product::count(),
            'active_products' => Product::where('status', 'active')->count(),
            'draft_products' => Product::where('status', 'draft')->count(),
            'total_assets' => Asset::count(),
            'unmapped_assets' => Asset::doesntHave('products')->count(),
            'recent_imports' => Import::latest()->take(5)->get(),
        ]);
    });

    // Products
    Route::apiResource('products', ProductController::class);

    // Categories
    Route::get('categories', [CategoryController::class, 'index']);
    Route::post('categories', [CategoryController::class, 'store']);
    Route::put('categories/{category}', [CategoryController::class, 'update']);
    Route::delete('categories/{category}', [CategoryController::class, 'destroy']);

    // Brands
    Route::get('brands', [BrandController::class, 'index']);
    Route::post('brands', [BrandController::class, 'store']);
    Route::put('brands/{brand}', [BrandController::class, 'update']);
    Route::delete('brands/{brand}', [BrandController::class, 'destroy']);

    // Suppliers
    Route::get('suppliers', [SupplierController::class, 'index']);
    Route::post('suppliers', [SupplierController::class, 'store']);
    Route::put('suppliers/{supplier}', [SupplierController::class, 'update']);
    Route::delete('suppliers/{supplier}', [SupplierController::class, 'destroy']);

    // Media
    Route::get('media', [MediaController::class, 'index']);
    Route::post('media/upload', [MediaController::class, 'upload']);
    Route::post('media/upload-zip', [MediaController::class, 'uploadZip']);
    Route::post('media/auto-map', [MediaController::class, 'autoMap']);
    Route::delete('media/{asset}', [MediaController::class, 'destroy']);

    // Import / Export
    Route::get('imports', [ImportExportController::class, 'index']);
    Route::post('imports', [ImportExportController::class, 'import']);
    Route::get('exports/products', [ImportExportController::class, 'export']);
});
