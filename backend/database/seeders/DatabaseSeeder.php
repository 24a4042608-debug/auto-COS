<?php

namespace Database\Seeders;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // Admin user
        User::updateOrCreate(
            ['email' => 'admin@acos.vn'],
            [
                'name'     => 'Admin ACOS',
                'password' => Hash::make('password'),
            ]
        );

        // Sample categories
        $electronics = Category::create(['name' => 'Điện tử', 'slug' => 'dien-tu']);
        $fashion     = Category::create(['name' => 'Thời trang', 'slug' => 'thoi-trang']);
        Category::create(['name' => 'Điện thoại', 'slug' => 'dien-thoai', 'parent_id' => $electronics->id]);
        Category::create(['name' => 'Laptop', 'slug' => 'laptop', 'parent_id' => $electronics->id]);
        Category::create(['name' => 'Áo', 'slug' => 'ao', 'parent_id' => $fashion->id]);

        // Sample brands
        $apple  = Brand::create(['name' => 'Apple', 'slug' => 'apple']);
        $nike   = Brand::create(['name' => 'Nike', 'slug' => 'nike']);
        $samsung = Brand::create(['name' => 'Samsung', 'slug' => 'samsung']);

        // Sample supplier
        $supplier = Supplier::create([
            'name'           => 'Nhà cung cấp A',
            'code'           => 'NCC-001',
            'email'          => 'supplier@example.com',
            'phone'          => '0909123456',
            'contact_person' => 'Nguyễn Văn A',
        ]);

        // Sample products
        $products = [
            ['sku' => 'IP15PM-256-BLK', 'name' => 'iPhone 15 Pro Max 256GB Đen', 'price' => 29990000, 'cost_price' => 25000000, 'stock' => 50, 'brand_id' => $apple->id],
            ['sku' => 'SS-S24-128-WHT', 'name' => 'Samsung Galaxy S24 128GB Trắng', 'price' => 22990000, 'cost_price' => 19000000, 'stock' => 30, 'brand_id' => $samsung->id],
            ['sku' => 'NK-AF1-WHT-42', 'name' => 'Nike Air Force 1 Trắng Size 42', 'price' => 2890000, 'cost_price' => 1800000, 'stock' => 100, 'brand_id' => $nike->id],
            ['sku' => 'NK-AM270-BLK-43', 'name' => 'Nike Air Max 270 Đen Size 43', 'price' => 3290000, 'cost_price' => 2200000, 'stock' => 80, 'brand_id' => $nike->id],
            ['sku' => 'MBP-M3-14-512', 'name' => 'MacBook Pro M3 14" 512GB', 'price' => 45990000, 'cost_price' => 40000000, 'stock' => 15, 'brand_id' => $apple->id],
        ];

        foreach ($products as $p) {
            Product::create(array_merge($p, [
                'slug'        => Str::slug($p['name']) . '-' . Str::random(4),
                'supplier_id' => $supplier->id,
                'status'      => 'active',
            ]));
        }
    }
}
