<?php

namespace Database\Seeders;

use App\Models\Tenant;
use App\Models\Attribute;
use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use App\Models\ProductVariant;
use App\Models\Supplier;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        // 1. Seed Tenants (Stores)
        $fashionTenant = Tenant::create([
            'name'          => 'ACOS Fashion',
            'subdomain'     => 'fashion',
            'domain'        => 'acos-fashion.vn',
            'industry_type' => 'fashion',
            'status'        => 'active',
            'settings'      => ['theme' => 'light', 'currency' => 'VND'],
        ]);

        $techTenant = Tenant::create([
            'name'          => 'ACOS Tech',
            'subdomain'     => 'tech',
            'domain'        => 'acos-tech.vn',
            'industry_type' => 'electronics',
            'status'        => 'active',
            'settings'      => ['theme' => 'dark', 'currency' => 'VND'],
        ]);

        // 2. Seed Users
        // Super Admin (no tenant)
        User::updateOrCreate(
            ['email' => 'admin@acos.vn'],
            [
                'tenant_id' => null,
                'name'      => 'Admin ACOS System',
                'password'  => Hash::make('password'),
            ]
        );

        // Fashion Store Admin
        User::updateOrCreate(
            ['email' => 'fashion@acos.vn'],
            [
                'tenant_id' => $fashionTenant->id,
                'name'      => 'Fashion Manager',
                'password'  => Hash::make('password'),
            ]
        );

        // Tech Store Admin
        User::updateOrCreate(
            ['email' => 'tech@acos.vn'],
            [
                'tenant_id' => $techTenant->id,
                'name'      => 'Tech Manager',
                'password'  => Hash::make('password'),
            ]
        );

        // ==========================================
        // 3. SEED FASHION TENANT DATA
        // ==========================================

        // Attributes for Fashion
        $colorAttr = Attribute::create([
            'tenant_id'     => $fashionTenant->id,
            'name'          => 'Màu sắc',
            'code'          => 'color',
            'type'          => 'select',
            'options'       => ['Đỏ', 'Xanh', 'Đen', 'Trắng', 'Xám'],
            'is_variant'    => true,
            'is_filterable' => true,
        ]);

        $sizeAttr = Attribute::create([
            'tenant_id'     => $fashionTenant->id,
            'name'          => 'Kích cỡ',
            'code'          => 'size',
            'type'          => 'select',
            'options'       => ['S', 'M', 'L', 'XL', 'XXL'],
            'is_variant'    => true,
            'is_filterable' => true,
        ]);

        $materialAttr = Attribute::create([
            'tenant_id'     => $fashionTenant->id,
            'name'          => 'Chất liệu',
            'code'          => 'material',
            'type'          => 'text',
            'is_variant'    => false,
            'is_filterable' => true,
        ]);

        $originAttr = Attribute::create([
            'tenant_id'     => $fashionTenant->id,
            'name'          => 'Xuất xứ',
            'code'          => 'origin',
            'type'          => 'select',
            'options'       => ['Việt Nam', 'Hàn Quốc', 'Mỹ', 'Trung Quốc'],
            'is_variant'    => false,
            'is_filterable' => true,
        ]);

        // Categories for Fashion
        $fashionCat = Category::create([
            'tenant_id' => $fashionTenant->id,
            'name'      => 'Thời trang Nam',
            'slug'      => 'thoi-trang-nam',
        ]);

        $shirtCat = Category::create([
            'tenant_id' => $fashionTenant->id,
            'name'      => 'Áo thun Nam',
            'slug'      => 'ao-thun-nam',
            'parent_id' => $fashionCat->id,
        ]);

        $pantsCat = Category::create([
            'tenant_id' => $fashionTenant->id,
            'name'      => 'Quần Jean Nam',
            'slug'      => 'quan-jean-nam',
            'parent_id' => $fashionCat->id,
        ]);

        // Brands for Fashion
        $coolmate = Brand::create([
            'tenant_id' => $fashionTenant->id,
            'name'      => 'Coolmate',
            'slug'      => 'coolmate',
        ]);

        $levis = Brand::create([
            'tenant_id' => $fashionTenant->id,
            'name'      => 'Levi\'s',
            'slug'      => 'levis',
        ]);

        // Supplier for Fashion
        $fashionSupplier = Supplier::create([
            'tenant_id'      => $fashionTenant->id,
            'name'           => 'Tổng kho May mặc Hà Nội',
            'code'           => 'SUP-FASHION-01',
            'email'          => 'contact@detmayhn.vn',
            'phone'          => '0243999888',
            'contact_person' => 'Nguyễn Văn Hùng',
        ]);

        // Products for Fashion
        // Product 1: T-Shirt (Has Variants)
        $tshirtProduct = Product::create([
            'tenant_id'         => $fashionTenant->id,
            'sku'               => 'TS-COTTON-ACTIVE',
            'name'              => 'Áo Thun Cotton Active',
            'slug'              => 'ao-thun-cotton-active',
            'short_description' => 'Áo thun thể thao chất liệu 100% cotton co giãn cực tốt.',
            'description'       => 'Áo thun năng động phù hợp mọi hoạt động thể thao và dạo phố.',
            'attributes'        => [
                'material' => '100% Cotton Premium',
                'origin'   => 'Việt Nam',
            ],
            'category_id'       => $shirtCat->id,
            'brand_id'          => $coolmate->id,
            'supplier_id'       => $fashionSupplier->id,
            'cost_price'        => 120000,
            'price'             => 249000,
            'has_variants'      => true,
            'status'            => 'active',
        ]);

        // Variants for T-Shirt
        ProductVariant::create([
            'tenant_id'        => $fashionTenant->id,
            'product_id'       => $tshirtProduct->id,
            'sku'              => 'TS-ACTIVE-BLK-M',
            'attribute_values' => ['color' => 'Đen', 'size' => 'M'],
            'price'            => 249000,
            'cost_price'       => 120000,
            'stock'            => 50,
            'is_active'        => true,
        ]);

        ProductVariant::create([
            'tenant_id'        => $fashionTenant->id,
            'product_id'       => $tshirtProduct->id,
            'sku'              => 'TS-ACTIVE-BLK-L',
            'attribute_values' => ['color' => 'Đen', 'size' => 'L'],
            'price'            => 249000,
            'cost_price'       => 120000,
            'stock'            => 45,
            'is_active'        => true,
        ]);

        ProductVariant::create([
            'tenant_id'        => $fashionTenant->id,
            'product_id'       => $tshirtProduct->id,
            'sku'              => 'TS-ACTIVE-WHT-M',
            'attribute_values' => ['color' => 'Trắng', 'size' => 'M'],
            'price'            => 249000,
            'cost_price'       => 120000,
            'stock'            => 30,
            'is_active'        => true,
        ]);

        ProductVariant::create([
            'tenant_id'        => $fashionTenant->id,
            'product_id'       => $tshirtProduct->id,
            'sku'              => 'TS-ACTIVE-WHT-L',
            'attribute_values' => ['color' => 'Trắng', 'size' => 'L'],
            'price'            => 249000,
            'cost_price'       => 120000,
            'stock'            => 25,
            'is_active'        => true,
        ]);

        // Product 2: Jeans (No Variants)
        Product::create([
            'tenant_id'         => $fashionTenant->id,
            'sku'               => 'JEAN-SLIM-BLUE',
            'name'              => 'Quần Jean Slimfit Levi\'s 511',
            'slug'              => 'quan-jean-slimfit-levis-511',
            'short_description' => 'Quần bò dáng ôm nhẹ, trẻ trung năng động.',
            'description'       => 'Chất liệu denim cao cấp co giãn 2%, giữ form tốt sau nhiều lần giặt.',
            'attributes'        => [
                'material' => '98% Cotton, 2% Elastane',
                'origin'   => 'Mỹ',
            ],
            'category_id'       => $pantsCat->id,
            'brand_id'          => $levis->id,
            'supplier_id'       => $fashionSupplier->id,
            'cost_price'        => 800000,
            'price'             => 1450000,
            'stock'             => 40,
            'has_variants'      => false,
            'status'            => 'active',
        ]);


        // ==========================================
        // 4. SEED TECH TENANT DATA
        // ==========================================

        // Attributes for Tech
        $techColorAttr = Attribute::create([
            'tenant_id'     => $techTenant->id,
            'name'          => 'Màu sắc',
            'code'          => 'color',
            'type'          => 'select',
            'options'       => ['Titan Tự Nhiên', 'Titan Đen', 'Titan Trắng', 'Xám Không Gian'],
            'is_variant'    => true,
            'is_filterable' => true,
        ]);

        $storageAttr = Attribute::create([
            'tenant_id'     => $techTenant->id,
            'name'          => 'Dung lượng',
            'code'          => 'storage',
            'type'          => 'select',
            'options'       => ['128GB', '256GB', '512GB', '1TB'],
            'is_variant'    => true,
            'is_filterable' => true,
        ]);

        $batteryAttr = Attribute::create([
            'tenant_id'     => $techTenant->id,
            'name'          => 'Dung lượng Pin',
            'code'          => 'battery',
            'type'          => 'text',
            'is_variant'    => false,
            'is_filterable' => false,
        ]);

        $osAttr = Attribute::create([
            'tenant_id'     => $techTenant->id,
            'name'          => 'Hệ điều hành',
            'code'          => 'os',
            'type'          => 'select',
            'options'       => ['iOS', 'Android', 'macOS', 'Windows'],
            'is_variant'    => false,
            'is_filterable' => true,
        ]);

        // Categories for Tech
        $mobileCat = Category::create([
            'tenant_id' => $techTenant->id,
            'name'      => 'Điện thoại di động',
            'slug'      => 'dien-thoai-di-dong',
        ]);

        $laptopCat = Category::create([
            'tenant_id' => $techTenant->id,
            'name'      => 'Máy tính xách tay',
            'slug'      => 'may-tinh-xach-tay',
        ]);

        // Brands for Tech
        $appleTech = Brand::create([
            'tenant_id' => $techTenant->id,
            'name'      => 'Apple',
            'slug'      => 'apple-tech',
        ]);

        $samsungTech = Brand::create([
            'tenant_id' => $techTenant->id,
            'name'      => 'Samsung',
            'slug'      => 'samsung-tech',
        ]);

        // Supplier for Tech
        $techSupplier = Supplier::create([
            'tenant_id'      => $techTenant->id,
            'name'           => 'Nhà phân phối Digiworld',
            'code'           => 'SUP-TECH-DGW',
            'email'          => 'info@digiworld.com.vn',
            'phone'          => '02839112233',
            'contact_person' => 'Lê Minh Triết',
        ]);

        // Products for Tech
        // Product 1: iPhone 15 Pro Max (Has Variants)
        $iphoneProduct = Product::create([
            'tenant_id'         => $techTenant->id,
            'sku'               => 'IP15-PROMAX',
            'name'              => 'iPhone 15 Pro Max',
            'slug'              => 'iphone-15-pro-max',
            'short_description' => 'Siêu phẩm mới nhất từ Apple với khung sườn Titan.',
            'description'       => 'Trang bị chip A17 Pro mạnh mẽ nhất, camera zoom quang học 5x.',
            'attributes'        => [
                'battery' => '4441 mAh',
                'os'      => 'iOS',
            ],
            'category_id'       => $mobileCat->id,
            'brand_id'          => $appleTech->id,
            'supplier_id'       => $techSupplier->id,
            'cost_price'        => 26000000,
            'price'             => 32990000,
            'has_variants'      => true,
            'status'            => 'active',
        ]);

        // Variants for iPhone
        ProductVariant::create([
            'tenant_id'        => $techTenant->id,
            'product_id'       => $iphoneProduct->id,
            'sku'              => 'IP15PM-TITAN-256',
            'attribute_values' => ['color' => 'Titan Tự Nhiên', 'storage' => '256GB'],
            'price'            => 32990000,
            'cost_price'       => 26000000,
            'stock'            => 15,
            'is_active'        => true,
        ]);

        ProductVariant::create([
            'tenant_id'        => $techTenant->id,
            'product_id'       => $iphoneProduct->id,
            'sku'              => 'IP15PM-TITAN-512',
            'attribute_values' => ['color' => 'Titan Tự Nhiên', 'storage' => '512GB'],
            'price'            => 38990000,
            'cost_price'       => 31000000,
            'stock'            => 8,
            'is_active'        => true,
        ]);

        ProductVariant::create([
            'tenant_id'        => $techTenant->id,
            'product_id'       => $iphoneProduct->id,
            'sku'              => 'IP15PM-BLK-256',
            'attribute_values' => ['color' => 'Titan Đen', 'storage' => '256GB'],
            'price'            => 32990000,
            'cost_price'       => 26000000,
            'stock'            => 20,
            'is_active'        => true,
        ]);

        // Product 2: MacBook Air M3 (No Variants)
        Product::create([
            'tenant_id'         => $techTenant->id,
            'sku'               => 'MBA-M3-2024-8-256',
            'name'              => 'MacBook Air 13" M3 2024 (8GB RAM / 256GB SSD)',
            'slug'              => 'macbook-air-13-m3-2024-8-256',
            'short_description' => 'Máy tính xách tay siêu mỏng nhẹ chip M3.',
            'description'       => 'Thiết kế không quạt, yên tĩnh tuyệt đối, thời lượng pin lên đến 18 tiếng.',
            'attributes'        => [
                'battery' => 'Pin Li-Po 52.6 watt-giờ',
                'os'      => 'macOS',
            ],
            'category_id'       => $laptopCat->id,
            'brand_id'          => $appleTech->id,
            'supplier_id'       => $techSupplier->id,
            'cost_price'        => 23500000,
            'price'             => 27990000,
            'stock'             => 12,
            'has_variants'      => false,
            'status'            => 'active',
        ]);
    }
}

