-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Máy chủ: 127.0.0.1
-- Thời gian đã tạo: Th6 30, 2026 lúc 06:03 PM
-- Phiên bản máy phục vụ: 10.4.32-MariaDB
-- Phiên bản PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Cơ sở dữ liệu: `vhsm_acos`
--

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `assets`
--

CREATE TABLE `assets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tenant_id` bigint(20) UNSIGNED NOT NULL,
  `filename` varchar(255) NOT NULL,
  `original_name` varchar(255) NOT NULL,
  `disk` varchar(255) NOT NULL DEFAULT 'local',
  `path` varchar(255) NOT NULL,
  `url` varchar(255) NOT NULL,
  `mime_type` varchar(255) NOT NULL,
  `type` enum('image','video') NOT NULL DEFAULT 'image',
  `size` bigint(20) UNSIGNED NOT NULL DEFAULT 0,
  `width` int(11) DEFAULT NULL,
  `height` int(11) DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `alt_text` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `assets`
--

INSERT INTO `assets` (`id`, `tenant_id`, `filename`, `original_name`, `disk`, `path`, `url`, `mime_type`, `type`, `size`, `width`, `height`, `tags`, `alt_text`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, '51570814-8989-4b8b-8a59-39e829a5ad61.jpg', 'z7915091252857_2238463d9e4eb571f013fe183adb58cc.jpg', 'local_public', 'uploads/products/51570814-8989-4b8b-8a59-39e829a5ad61.jpg', 'http://localhost:8000/uploads/products/51570814-8989-4b8b-8a59-39e829a5ad61.jpg', 'image/jpeg', 'image', 76591, 759, 655, NULL, NULL, '2026-06-30 05:36:01', '2026-06-30 05:36:01', NULL),
(2, 1, '646f5244-d12e-4ba9-b3cb-8e7ec987f509.jpg', 'z7992483197102_8edd85be51df9a27aaeb158ba660e7ec.jpg', 'local_public', 'uploads/products/646f5244-d12e-4ba9-b3cb-8e7ec987f509.jpg', 'http://localhost:8000/uploads/products/646f5244-d12e-4ba9-b3cb-8e7ec987f509.jpg', 'image/jpeg', 'image', 476243, 1024, 1280, NULL, NULL, '2026-06-30 05:36:08', '2026-06-30 05:36:08', NULL),
(3, 1, 'f8703bee-b454-4dac-8b7b-daf2af74ed07.jpg', 'z7992483206599_d7c4e6c689e026179004648ad5b30764.jpg', 'local_public', 'uploads/products/f8703bee-b454-4dac-8b7b-daf2af74ed07.jpg', 'http://localhost:8000/uploads/products/f8703bee-b454-4dac-8b7b-daf2af74ed07.jpg', 'image/jpeg', 'image', 395662, 1024, 1280, NULL, NULL, '2026-06-30 05:36:12', '2026-06-30 05:36:12', NULL),
(4, 1, 'e9f2c3d4-d782-4b8e-bc17-eb28fa0de3a8.jpg', 'z7992483199074_2a1326bd0e1b6b52ddfab82c0422b389.jpg', 'local_public', 'uploads/products/e9f2c3d4-d782-4b8e-bc17-eb28fa0de3a8.jpg', 'http://localhost:8000/uploads/products/e9f2c3d4-d782-4b8e-bc17-eb28fa0de3a8.jpg', 'image/jpeg', 'image', 491364, 1024, 1280, NULL, NULL, '2026-06-30 05:36:19', '2026-06-30 05:36:19', NULL),
(5, 1, '64969e8f-c97a-4555-b25a-7dbe9a0ee86f.webp', 'share_fb_home.webp', 'local_public', 'uploads/brands/64969e8f-c97a-4555-b25a-7dbe9a0ee86f.webp', 'http://localhost:8000/uploads/brands/64969e8f-c97a-4555-b25a-7dbe9a0ee86f.webp', 'image/webp', 'image', 8496, 500, 500, NULL, NULL, '2026-06-30 06:35:47', '2026-06-30 06:35:47', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `attributes`
--

CREATE TABLE `attributes` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tenant_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) NOT NULL,
  `type` varchar(255) NOT NULL,
  `options` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`options`)),
  `is_variant` tinyint(1) NOT NULL DEFAULT 0,
  `is_filterable` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `attributes`
--

INSERT INTO `attributes` (`id`, `tenant_id`, `name`, `code`, `type`, `options`, `is_variant`, `is_filterable`, `created_at`, `updated_at`) VALUES
(1, 1, 'Màu sắc', 'color', 'select', '[\"\\u0110\\u1ecf\",\"Xanh\",\"\\u0110en\",\"Tr\\u1eafng\",\"X\\u00e1m\"]', 1, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(2, 1, 'Kích cỡ', 'size', 'select', '[\"S\",\"M\",\"L\",\"XL\",\"XXL\"]', 1, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(3, 1, 'Chất liệu', 'material', 'text', NULL, 0, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(4, 1, 'Xuất xứ', 'origin', 'select', '[\"Vi\\u1ec7t Nam\",\"H\\u00e0n Qu\\u1ed1c\",\"M\\u1ef9\",\"Trung Qu\\u1ed1c\"]', 0, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(5, 2, 'Màu sắc', 'color', 'select', '[\"Titan T\\u1ef1 Nhi\\u00ean\",\"Titan \\u0110en\",\"Titan Tr\\u1eafng\",\"X\\u00e1m Kh\\u00f4ng Gian\"]', 1, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(6, 2, 'Dung lượng', 'storage', 'select', '[\"128GB\",\"256GB\",\"512GB\",\"1TB\"]', 1, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(7, 2, 'Dung lượng Pin', 'battery', 'text', NULL, 0, 0, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(8, 2, 'Hệ điều hành', 'os', 'select', '[\"iOS\",\"Android\",\"macOS\",\"Windows\"]', 0, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `brands`
--

CREATE TABLE `brands` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tenant_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `logo` varchar(255) DEFAULT NULL,
  `description` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `brands`
--

INSERT INTO `brands` (`id`, `tenant_id`, `name`, `slug`, `logo`, `description`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Coolmate', 'coolmate', NULL, 'absjdhaksdhjksa', 1, '2026-06-30 02:16:39', '2026-06-30 06:33:46'),
(2, 1, 'Levi\'s', 'levis', NULL, 'Levi mô tả', 1, '2026-06-30 02:16:39', '2026-06-30 06:33:56'),
(3, 2, 'Apple', 'apple-tech', NULL, NULL, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(4, 2, 'Samsung', 'samsung-tech', NULL, NULL, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(5, 1, 'Lining', 'lining', 'http://localhost:8000/uploads/brands/64969e8f-c97a-4555-b25a-7dbe9a0ee86f.webp', 'Trung Quốc', 1, '2026-06-30 06:35:47', '2026-06-30 06:35:47');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache`
--

CREATE TABLE `cache` (
  `key` varchar(255) NOT NULL,
  `value` mediumtext NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `cache_locks`
--

CREATE TABLE `cache_locks` (
  `key` varchar(255) NOT NULL,
  `owner` varchar(255) NOT NULL,
  `expiration` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `categories`
--

CREATE TABLE `categories` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tenant_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `parent_id` bigint(20) UNSIGNED DEFAULT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `categories`
--

INSERT INTO `categories` (`id`, `tenant_id`, `name`, `slug`, `description`, `parent_id`, `sort_order`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Thời trang Nam', 'thoi-trang-nam', NULL, NULL, 0, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(2, 1, 'Áo thun Nam', 'ao-thun-nam', NULL, 1, 0, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(3, 1, 'Quần Jean Nam', 'quan-jean-nam', NULL, 1, 0, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(4, 2, 'Điện thoại di động', 'dien-thoai-di-dong', NULL, NULL, 0, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(5, 2, 'Máy tính xách tay', 'may-tinh-xach-tay', NULL, NULL, 0, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `failed_jobs`
--

CREATE TABLE `failed_jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `connection` varchar(255) NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `exception` longtext NOT NULL,
  `failed_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `imports`
--

CREATE TABLE `imports` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tenant_id` bigint(20) UNSIGNED NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `original_filename` varchar(255) NOT NULL,
  `stored_path` varchar(255) NOT NULL,
  `status` enum('pending','processing','completed','failed') NOT NULL DEFAULT 'pending',
  `total_rows` int(11) NOT NULL DEFAULT 0,
  `processed_rows` int(11) NOT NULL DEFAULT 0,
  `success_rows` int(11) NOT NULL DEFAULT 0,
  `failed_rows` int(11) NOT NULL DEFAULT 0,
  `errors` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`errors`)),
  `result_path` varchar(255) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `jobs`
--

CREATE TABLE `jobs` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `queue` varchar(255) NOT NULL,
  `payload` longtext NOT NULL,
  `attempts` smallint(5) UNSIGNED NOT NULL,
  `reserved_at` int(10) UNSIGNED DEFAULT NULL,
  `available_at` int(10) UNSIGNED NOT NULL,
  `created_at` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `job_batches`
--

CREATE TABLE `job_batches` (
  `id` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `total_jobs` int(11) NOT NULL,
  `pending_jobs` int(11) NOT NULL,
  `failed_jobs` int(11) NOT NULL,
  `failed_job_ids` longtext NOT NULL,
  `options` mediumtext DEFAULT NULL,
  `cancelled_at` int(11) DEFAULT NULL,
  `created_at` int(11) NOT NULL,
  `finished_at` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(1, '0001_01_01_000000_create_tenants_table', 1),
(2, '0001_01_01_000000_create_users_table', 1),
(3, '0001_01_01_000001_create_cache_table', 1),
(4, '0001_01_01_000002_create_jobs_table', 1),
(5, '2026_06_30_075923_create_attributes_table', 1),
(6, '2026_06_30_075923_create_brands_table', 1),
(7, '2026_06_30_075923_create_categories_table', 1),
(8, '2026_06_30_075923_create_suppliers_table', 1),
(9, '2026_06_30_075924_create_assets_table', 1),
(10, '2026_06_30_075924_create_products_table', 1),
(11, '2026_06_30_075925_create_imports_table', 1),
(12, '2026_06_30_075925_create_product_assets_table', 1),
(13, '2026_06_30_080000_create_product_variants_table', 1),
(14, '2026_06_30_080044_create_personal_access_tokens_table', 1);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `password_reset_tokens`
--

CREATE TABLE `password_reset_tokens` (
  `email` varchar(255) NOT NULL,
  `token` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `personal_access_tokens`
--

CREATE TABLE `personal_access_tokens` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tokenable_type` varchar(255) NOT NULL,
  `tokenable_id` bigint(20) UNSIGNED NOT NULL,
  `name` text NOT NULL,
  `token` varchar(64) NOT NULL,
  `abilities` text DEFAULT NULL,
  `last_used_at` timestamp NULL DEFAULT NULL,
  `expires_at` timestamp NULL DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `products`
--

CREATE TABLE `products` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tenant_id` bigint(20) UNSIGNED NOT NULL,
  `sku` varchar(255) NOT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `slug` varchar(255) NOT NULL,
  `short_description` text DEFAULT NULL,
  `description` longtext DEFAULT NULL,
  `attributes` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`attributes`)),
  `category_id` bigint(20) UNSIGNED DEFAULT NULL,
  `brand_id` bigint(20) UNSIGNED DEFAULT NULL,
  `supplier_id` bigint(20) UNSIGNED DEFAULT NULL,
  `cost_price` decimal(15,2) NOT NULL DEFAULT 0.00,
  `price` decimal(15,2) NOT NULL DEFAULT 0.00,
  `sale_price` decimal(15,2) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `min_stock` int(11) NOT NULL DEFAULT 0,
  `seo_title` varchar(255) DEFAULT NULL,
  `seo_description` text DEFAULT NULL,
  `tags` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`tags`)),
  `has_variants` tinyint(1) NOT NULL DEFAULT 0,
  `status` enum('draft','active','inactive') NOT NULL DEFAULT 'draft',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `deleted_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `products`
--

INSERT INTO `products` (`id`, `tenant_id`, `sku`, `barcode`, `name`, `slug`, `short_description`, `description`, `attributes`, `category_id`, `brand_id`, `supplier_id`, `cost_price`, `price`, `sale_price`, `stock`, `min_stock`, `seo_title`, `seo_description`, `tags`, `has_variants`, `status`, `created_at`, `updated_at`, `deleted_at`) VALUES
(1, 1, 'TS-COTTON-ACTIVE', NULL, 'Áo Thun Cotton', 'ao-thun-cotton-SDqH7b', 'Áo thun thể thao chất liệu 100% cotton co giãn cực tốt.', 'Áo thun năng động phù hợp mọi hoạt động thể thao và dạo phố.', '{\"material\":\"100% Cotton Premium\",\"origin\":\"Vi\\u1ec7t Nam\"}', 2, 1, 1, 120000.00, 249000.00, NULL, 1, 0, NULL, NULL, '[]', 1, 'active', '2026-06-30 02:16:39', '2026-06-30 05:43:10', NULL),
(2, 1, 'JEAN-SLIM-BLUE', NULL, 'Quần Jean Slimfit Levi\'s 511', 'quan-jean-slimfit-levis-511', 'Quần bò dáng ôm nhẹ, trẻ trung năng động.', 'Chất liệu denim cao cấp co giãn 2%, giữ form tốt sau nhiều lần giặt.', '{\"material\":\"98% Cotton, 2% Elastane\",\"origin\":\"M\\u1ef9\"}', 3, 2, 1, 800000.00, 1450000.00, NULL, 40, 0, NULL, NULL, NULL, 0, 'active', '2026-06-30 02:16:39', '2026-06-30 02:16:39', NULL),
(3, 2, 'IP15-PROMAX', NULL, 'iPhone 15 Pro Max', 'iphone-15-pro-max', 'Siêu phẩm mới nhất từ Apple với khung sườn Titan.', 'Trang bị chip A17 Pro mạnh mẽ nhất, camera zoom quang học 5x.', '{\"battery\":\"4441 mAh\",\"os\":\"iOS\"}', 4, 3, 2, 26000000.00, 32990000.00, NULL, 0, 0, NULL, NULL, NULL, 1, 'active', '2026-06-30 02:16:39', '2026-06-30 02:16:39', NULL),
(4, 2, 'MBA-M3-2024-8-256', NULL, 'MacBook Air 13\" M3 2024 (8GB RAM / 256GB SSD)', 'macbook-air-13-m3-2024-8-256', 'Máy tính xách tay siêu mỏng nhẹ chip M3.', 'Thiết kế không quạt, yên tĩnh tuyệt đối, thời lượng pin lên đến 18 tiếng.', '{\"battery\":\"Pin Li-Po 52.6 watt-gi\\u1edd\",\"os\":\"macOS\"}', 5, 3, 2, 23500000.00, 27990000.00, NULL, 12, 0, NULL, NULL, NULL, 0, 'active', '2026-06-30 02:16:39', '2026-06-30 02:16:39', NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_assets`
--

CREATE TABLE `product_assets` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `asset_id` bigint(20) UNSIGNED NOT NULL,
  `sort_order` int(11) NOT NULL DEFAULT 0,
  `is_primary` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_assets`
--

INSERT INTO `product_assets` (`id`, `product_id`, `asset_id`, `sort_order`, `is_primary`, `created_at`, `updated_at`) VALUES
(1, 1, 4, 0, 1, NULL, NULL),
(2, 1, 2, 1, 0, NULL, NULL),
(3, 1, 3, 2, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `product_variants`
--

CREATE TABLE `product_variants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tenant_id` bigint(20) UNSIGNED NOT NULL,
  `product_id` bigint(20) UNSIGNED NOT NULL,
  `sku` varchar(255) NOT NULL,
  `barcode` varchar(255) DEFAULT NULL,
  `attribute_values` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin NOT NULL CHECK (json_valid(`attribute_values`)),
  `price` decimal(15,2) DEFAULT NULL,
  `sale_price` decimal(15,2) DEFAULT NULL,
  `cost_price` decimal(15,2) DEFAULT NULL,
  `stock` int(11) NOT NULL DEFAULT 0,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `product_variants`
--

INSERT INTO `product_variants` (`id`, `tenant_id`, `product_id`, `sku`, `barcode`, `attribute_values`, `price`, `sale_price`, `cost_price`, `stock`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 1, 'TS-ACTIVE-BLK-M', NULL, '{\"color\":\"\\u0110en\",\"size\":\"M\"}', 249000.00, NULL, 120000.00, 50, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(2, 1, 1, 'TS-ACTIVE-BLK-L', NULL, '{\"color\":\"\\u0110en\",\"size\":\"L\"}', 249000.00, NULL, 120000.00, 45, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(3, 1, 1, 'TS-ACTIVE-WHT-M', NULL, '{\"color\":\"Tr\\u1eafng\",\"size\":\"M\"}', 249000.00, NULL, 120000.00, 30, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(4, 1, 1, 'TS-ACTIVE-WHT-L', NULL, '{\"color\":\"Tr\\u1eafng\",\"size\":\"L\"}', 249000.00, NULL, 120000.00, 25, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(5, 2, 3, 'IP15PM-TITAN-256', NULL, '{\"color\":\"Titan T\\u1ef1 Nhi\\u00ean\",\"storage\":\"256GB\"}', 32990000.00, NULL, 26000000.00, 15, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(6, 2, 3, 'IP15PM-TITAN-512', NULL, '{\"color\":\"Titan T\\u1ef1 Nhi\\u00ean\",\"storage\":\"512GB\"}', 38990000.00, NULL, 31000000.00, 8, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(7, 2, 3, 'IP15PM-BLK-256', NULL, '{\"color\":\"Titan \\u0110en\",\"storage\":\"256GB\"}', 32990000.00, NULL, 26000000.00, 20, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) NOT NULL,
  `user_id` bigint(20) UNSIGNED DEFAULT NULL,
  `ip_address` varchar(45) DEFAULT NULL,
  `user_agent` text DEFAULT NULL,
  `payload` longtext NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0QEgEJJsAXdbD45ivkG0FeAsImR0J6bCx5qXmYwc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJURXYwZUF0UTR0SXBrTk1tWktnWnJqSTJscnpBNkZiWk94Z3VleGNPIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817925),
('0yLDBpw1G9gYk6q291s985YouXi926tUoYcme5ef', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJpT2dFUlQzbXlsZm9PbVhDWWQ4NlpvVDQ0MkJ0cVI5dVpwYXRldGxMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818048),
('14h1FGb1c6qfGtqBS0H7Jk5E1eKCIyTTsDOeNUAq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJka3B2eUNzbEJ3MDc3ZFBLQUV4SE56NGZVYmEwaEJkb2w3U2c5OFMzIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814282),
('1b3jhrpO1ArssLSPjBAtwf12Mg6csUaARkPSWHes', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJqUjJacFJoVkk4UEJDRUNSZkJ5UllLWUtVTjdPTWVlMVBOTHEzbW1lIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819209),
('1IghXqV4pyI8aF7VIswsihW8SrYMKiWDPr9C5gFd', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJWVmNaUzJJRExlekZIVFRDc0FzbEV1WEFjcnFtQlozNzBpbVdRcUFmIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813445),
('1jkvyxelivcmKEXfUeIEdBWeiAzi3YEtHEgUnofs', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJaUWMxNWlpcjRtMWxhcWxTQzFqbHBKbFJ2cUI3VDhac1hoMHJCMExkIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814812),
('1phYHlmUQlQCjefFJgREsPszENrnK7U0hshBRxAe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ5a1k2UzdUa0c3bWdkU2JJZDVhcUpXT3JFZTNleWpUM1hlbmVXNUpwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819260),
('1r8U51ukVsKz4PoOX5PnXfFgugEKRo2D50zM2sPP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJqdHVJNm45WGlqS09GV29TaHdXWE9kcDdVY1JEbjA1cFdIb0Y5MnJBIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818007),
('1rGieksWmOALEvcYtEZpAFMcekYrxg0kjILIfyoN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJhdVdnZmRUWFlnQndOYWRsYTJuRkdGWlJzMkRmSEM2c3RpWTdydVcyIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814665),
('1sRDaW0PPfXOhijnmqiImmskuzwl8EBspzqYB9aA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJmVGkyV2JoTjB0eGFNWnVFN0phTUtPY0NqTVkyc3dRSUxCUEYxZWp1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813768),
('27lCz9kqS6hHDSfAJuB3PTM9J8LkdsZMFTHRuAOC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJSend5T0syZ1FVY1hVMFBvT1NuYWZHQVU3bTByc0U3dVloUnNUMHNLIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813413),
('2J3mynfyi6XDiFBImJN1pNQJgaxsjEDVXcxvE7pF', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJGMTZRcWlVS2NCRDRBeFZqd3ppNUhNZm1CWlg4VzZ4YVIwc1U5bm9nIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819210),
('2jDpOV65u8ZSI2W3ilKNnv05OSkjiAYzEWs1BFoQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJPaDd1VmJtVWFVRnRHQWNkYXBaRGNVNW9jNEx1bjRUQktJSmU1R2FyIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782813435),
('305rsqyrPgyu3I1wY1JlktgkddSG4I5x8nHdasO3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJGMTg4SkJLc3FUMnFyVTVXZjNxQXI5NjRuNjFpRGxyM1lZS2N6S3E1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818047),
('3dIKrYDqzK4LyIbQBEs32nP3ZdyWvhWhlPMLu3T0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjSm1IRkJrS0o3NWFiSk9jUDluc3VXTkpHUG9veU9xd0s2dE9RYk9ZIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813414),
('3LdyjguUh6Vne8Lk5m1yale7n04xdTBK1uIC3vYc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJscFdKZVN3RHBvMDNwT2hidmZ3WUxOYnVJWVpoY2RHTU15bWJlQjhFIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2V4cG9ydHNcL3Byb2R1Y3RzIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782818042),
('3Q4OKNJPW4GGx7iO90ePInC8aJYS5nU9UaUs9PZk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJnaldRQ2JLMnpBMnhqanE5d2tRd3NOc3pRa3JnYjFnVE5DM3ZOMlVnIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819260),
('45amzjS8rAdp6TAul28wgvaqKxnyQDKjjGXx8zD4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ3N0lvU2dZRlpvcFRWc3BPdFpzN3l2dDZFUzdVbDNKeGswV25XV20yIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782815947),
('47h2zloK2e9DTAD9Rqoaqa3igyXqs4f49n8T4L6D', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJndzdtYUNIcHpUUjVlcVcyRWMxQWRFUkN5TWk2Rm82eFBOYUU3TWtuIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818048),
('4A1QbZdUQCleyDEwD3QoUPscpcxF4BKCC507lEqZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJxMU5RNk9RenVKSTd1OEFsQlpjdkZtb2lGNTd2cTBIQlhHbXJ0TU16IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813430),
('4EBuTWwMFkUFFdM7CVinRB4dfgU7DLgmJmnsYqAp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIyS3V6ODQyNm56SEtoVHBNRjR6NlhqQ2lqeHkyOWozdFA5NEFGQWFXIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782816010),
('4JaSx403nP0KwnwLQfswGRiExvssgOVwAqHHDioQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJoaXA5alZseU13WmxoYjVySXE0VW83S21zd09Nc0NCbkZUdzI2WkhpIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8xIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819456),
('4SqR4I95yVyllU8YxbhKcyiVsI7iLdeuIeLmQvUR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI3RnJmNmFZMkFUZjVLSlNDS0xRNzVSQzRyT2tCdkdSRXB5eGEzUTNCIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817925),
('53gOcDddUkEj1JipjUPcuFYFZyJfhi429jgquh4i', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJGcTRZSzlBajhycTA2Ykx4d2F4eTlqQXBWTTlhUjRIdnl1dkdTM2NoIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782816299),
('5gNhqDL3gxTMZeed983dGn9hv822fFEnSpAWrgUO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIwb05sVjBjTjVGOFpIM1FESHR2Yld3UXMwVnBnODVwQkUxRFhpb0JZIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819260),
('5kd5x0VGxjxJfzHWP6Pw4s8deOZkstqe9mGU68lz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJnTXZQcHM1M0VJa1RNMEZ4Mmh4eXRicm82RW51UGZQd1dyZDlWeDZEIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782813686),
('5oMEbsTuAXxrnX5savZptneX9txHuxe1h3MYxtUA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjMEwxWEQyZlprZEZCd1lFdTA4SzFkbDNZWmVXRkdiSHBxUjJVc1RFIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8xIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819648),
('5TZ9FRE56KZbGxqAchVvMIofE5CrckV11T3ecJkS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJGZzJYdXUzMFZRRHNVYTQ3a1U5NnVBNXdVM3RXOHQ0VHczWjFXRzh2IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819652),
('66EQiZD4EBx3qV2dP1Jdxje6BMgXQ5NqOGTCXTVq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJLUEJXSDk3a0hCMXdEZGlKTldHSGczSzZzWVB3WU9PQnVrNjJWZGRTIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813677),
('6i1oiiFmUJDJDuYetW5sZnVRcJPHoHkN5JuxbtPu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJwc3BRN1hTTEJRbGtrZjRoYkxId2VVeW1xZFl5M1Q1a2tLU0NRNUhhIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817994),
('6isgxZBsE1toFAPFBBp1JrxeEs4rDnlFXwPnx0WR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJMQjVIVU1zQ29odnZScnhORG5ORFM4SjJoNnFkSTlTVGhOVHlYZnprIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782818280),
('6RP4ENZj6hY4ibsVpY8EKYGpUUmFbigHkki2CnIY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ4WHlHYUJoRmE5RlpQN0VDTDFZSDM2MnZEaENLTkpQak5HUUVmOXNOIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782819647),
('6zcv6IISajj6nxf9phmGM04Xhg19CzoDaIR9aCW8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJaQnQ2ODIzUTFJdkZFZ2kwS1FmTmgyQUtBZjAzZWtSNVpLandISUxUIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813309),
('73NLsbJlQiPHrrcUiWHV2XQCtNMJiijZeRLui03w', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJKVlFZSDRKbjkxOWFSRUc0RmN4ejdBcXAzdmNiQjdlSVNHb3FnNXhCIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813316),
('7K1BdyRwZPaJ0hWobtDtiEEBNsyIYh1zvwPTW3Nq', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ6dVdENExHMFhxeDRJa2xxcGx0OUhPWGh6ZFJOZVJiZ0k1UUVzcW5qIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782814668),
('8FsvKxkD689mRRqWXUv7orPymucQwNlRiYSzC82Q', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ2blNJcnU0MWFrQlpXQnJtb0luQk0yQ1dERDZEaHBLcXJQYXlNWjB6IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817831),
('8JYkBoOJ11N0sLUHJJ1DXizpKYR1vS9AwEpoyU1z', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJPcFM1ZjY3VnNkV1d3dkZnQW1wRmQzWEdoR1VsalNicHo1YWtXY0VRIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813425),
('8SxNJX3AqqSLHFLwXnumJCoPBrmyPiu26cu2G3Lu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI2WlIwR254QnphckhGUDdxQ0hubHVxR091T1lWUWFZS3dTZE9ROXBaIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782814665),
('8y1PmZuMlUIoxLwbAtpW2rOJ0zgzEtluB54qVsgG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJJRDA2TkZId2lmdWNhWTk5cjU4TDhuQ2JLRkVGcmJTdnBRQ1J2WWhDIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8xIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819209),
('9enUXShAJkh93c3NblAkMKfTdjln3yZOetf0mc0d', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJsMFljWXM3SjdJcnU4SktDVGpHcXZJcGtoVkFxM05rS2xUbVRhZ0hlIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813313),
('9LdGQAvgjf8LC4SxppcxDy4t9itEwupIkWup7rGs', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJLSFhnQnlyMTVsbkZOOXRLV05EOG5uWFhoNDBubXlXNkJJN1U5aU1ZIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813309),
('9RgHvLu0UdfghuDlJYnoeUpk7BT1Xtd2g2XRmu3a', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJzMzdKcEZmUEVNVXVRWGs3YmNyamo3MVpCMk5hUTJMdHhlU2JSOUF0IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813002),
('9TGkW1fkMijmGUPhJxFq0T2vHSKJNzwa4aLN5uCV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJmQnJ2bG9qM2pmZ0ExQVhJRnNidURsWlNVdUYwR0VqZ0pvY2d3dUJUIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818047),
('9VMYCtpTwsKUJqfUiwD7f8IAYki5ehT4HjfYSIzQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJlM21NSFI2RkQ3Qk4ydHBHSUhlMlRMM05JckxUVXRiQTc0ZjFRSVhrIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814737),
('a0Tatuakw7n83rsY6A7MRW2RyMAVuL4uUz4bRVH3', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJKaTNza1l2QjdrSTE0RUI5bEJFRzlGT0Q1aFZtSHF3ckQ0bDhTb3d3IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819083),
('A23Ghnqxyzo5BSQskAGSFIf9n0eXjF7ELvpMTJAw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI1NVh2aHU1YnpOSTl4VDdLdmNqY1lCUVBaSFpvSzZvS0VWTHgwdkQwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817617),
('aCXaIrrLo8Jl9wfuKTYtoSn6l4IjPqgKthORNy2Z', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJNRVd3Y0pXRjNrY2xSQ2Y1UHlPdVNkV2dNc3FieUd4RmFPTHU4RG1QIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813429),
('aEGec8lDtCIBU9UvyPgQ8z1mC6nggfOyD86gSqsC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJBWTVBdk51bEdRWGZkNU1KVmhqdjluYlF2bkpsV2NGYU5zQWJXWFgzIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819652),
('Ag2n6Qzo5M2kDQ2ow1UoCEPkgn0zrkzmRTk2dHBK', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJrOXpqRGZSZU05RFY0aFcxSGVpaFFCcnd5TG9wYk9XZFE4dXhzVVlTIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817655),
('AIuxYusp5mpqkgqspT3K93OO4OksjRd74OyLLvFZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJyUTBaYnVwdHdqZTdZY0tlSkZzTHREcGVOOEF5SlJzcldDVWlLSDV5IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818451),
('AK2Ttz89ne1fR8cmnSUA5EG3UeXKOlxRb1iKv9ij', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJMZDg0OEF0UWF6UUhzWlpGTW9Ed2FvWUExak40SDVhQ2F0M3VidmtrIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813054),
('amjNHloPJWjQeLK2NQ2bdbQgj3vg2jLkEn3D4sxy', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJxNGZ4c0pRNXE1S1hXb2VVRW0yYWw1ZmNLbWY2UFc1MzIyTnVoTlQ3IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782814592),
('ao0WprRxaoLw1CfpiZofZnnMuEAbyQ3kVQW82xke', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJSN2FlUlZ5ZTdsOVlCTXZMUkZGZDE0b29paDhDdzBPQTIzekl5aFVOIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813763),
('au69Goa7vf4rgiEWoiTIrlcs0hl5MsNB6cypSDjD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJLM21YTWxmWmVNam9pajloZGZaVkZkY3pZdDc4ZER4WEM5TlJnaTU0IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813431),
('awSPUaFqXLCVLMD3TesdP5ePxPw649kot5aPKgpS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJITGljRWU0UkY2blZveEE3R3gwQ1dBM1I4eVJhdDJNb0JvOUVyVjlMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819210),
('b39wXX9vd9WgoRXQJViAR9esBkzp1OpD20j6FuFC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJXRllMd1hHZllza3NXa3JKOGZmaHdlRUpUYTdMZXdaMVRwYW90TlhSIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817422),
('B61t730psJBf9bb9kGpuz06ZjBulysmIVQ7pUh0J', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjSHlCMlRxbUhPS01xam1WeHFXWVpiR0lDMEQ3MFpYb3ZhcW5teFYxIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813446),
('BlsQccWKRBhRYw2RiaXSbg0O32PaB1KJkocMCnY5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI4b2lnUDJ3WHRqUmhyalV5WVdVOTExaE9HZm9JSUtGNXByWDZCcm1HIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818048),
('BQByM30Lob0mD0UVWq9fqH8JgwiJBiGAwlJgdGuV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ0VHVvS1M1NndPYTZtdGNuWXZJT3ozeENiWWhZY3FWMEtUTWlEbktqIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817922),
('bsEIWOT1U6CH82yRbas2SMYOe39hw2Ya86y6i98P', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ2TEN5dzhPaXhFNVViMmMyY0Z2dWJ4SlhrczBxNHNDWGEzZkZpSUxrIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817994),
('BXidtwGAGhczTFKULEKxzmxckOpamuI8RWtYjx40', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJIeDlDSWVISGFETElJSlpQdGRzakdSODlQR1NXZDlzZ3FjNDdvc0hHIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813417),
('BYWGQ1nBwld3NgRRogRsuBgq9T0Yyn9bwuMRo7A1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJSTFl0bEhDU0t0QlB6aVJ4SWNxWXpFUGhSSXBPU3I3R1ZhZU5RbTIwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814732),
('c7EOwhHwaUa3R5gFDowV5refTefJHTu0nvpwGLUr', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJuQjVPMTZLd0pDNjZXMEpxRDkxZG9ucHFvamFvWnJaNmxXeDhEc0poIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813680),
('CLMcRMREKoQpveFtCiZw8TZ2Qs7QFuhD7NQIF1hb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIwN1Bmc2RlU0tyM2FyQW5TbXhhVGVQN1d5djJ6bmY5TVlMdFhRQnhoIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814720),
('Coora5tYRyrQLWGdYPgH274st78rinwTtv9jTVa7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ2YjJYamdPYnhnWW9jdkNPT1NKQllOQ3RYdm9ad28zUlV3Z2Y5eXZVIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818327),
('Cr6QoEdfWA0cBzsHVhrOfrsezsvYskdc3ESebnO8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJsYndsZTU0Uk9STXVyUDZlbVVsbmdBWnlOSzBqQ0tablJUQ0UzQ2I4IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819210),
('CvLMt7DLG0ZpiJgBCbucAIVv5SoFOTmGflfCpkza', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJSQm1uaHpVN2t0VENab0RMMXZmVDFKS2lXVWx0cktBeTJPaHRFMG9nIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819585),
('cygULqBtXUMx84bNw2HoEloS6h2N8Ja8pKEojoxz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJSMUZTbHNjV2YyTWhuazAwUTk4bUY3Z0NyakQxaDU1RElNbDc3djB6IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813002),
('D0Cez6HvYbZSotuxp9BwqIASpapRT6pOzCoAajKv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJWdmNXNnlHTU5mVEoyWGhkSlozUllYeHpiZUUzSkc4SE9TeXhGaVBCIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817993),
('dHP68MW7qPiRQANhaAj2bv8lUX7ASo9R1nOoGmNC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJha3Z6ZE4wT2xMNWxDYXgxSndjUFZTTUlIbTBFaW1sR3Y3cE5RZk9xIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814735),
('dLgGKT15H8HN12ZB8D7amxZd58oxVnt3dNr6Z7Wf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJQZ3Q4R3VuVlBUOWgwbXhUQ05FTHIxQzRMTlVJZ3JMNVE2RlN1SjJrIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782818010),
('DmSBGrtZGz0FF6yIIUDhrXHCkqzl34dVSU63gMQg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJsWER1bjN6bk8yVG5odmNPU0oybXVaeW5zMGFxVGowQkZETGU2SUkwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817354),
('E2Tk1lOf6kpoyJZvy4cxtclJOV2q6y3hWHUhpzob', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJXRjZtU0VJaDFGdHdtcmFNREhxbWtjR2pjSlJLQ2pGT1hsRURTYTYwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782813815),
('e5kH1pnDGhyupjqRLWTpsCEbhvTnukQqzKytO6HR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJiNUIyODdZQWZFTnNJb1dITDJzZzEwcXM0MHViTkJrVGRxd0lZcTFyIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813320),
('eAmEZUiIbgA6o6DdB47ONlxUg2TLy9nfFuDwJPJU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJYSnhoUEVBbkNWMG1HbXhKMEIycmNnU01MTmRoVmZwM0s1M0NVRzN0IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814603),
('eEEIzdlivSkKx4P9pQeGBv6duKSP8iXiLfbuJrqe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJSVmI0MUJ1c0VMSEVJUGlTZGU4T0ZJYjc5VjJ2aGhsVWpHYTRZMTE1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814586),
('EhxierNuLpzNugjJWC4778UwutkQMkD7yiZrpPMb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjWmtSRm92MXZBT21la0pLTnI1aHF2U09Udmdxc0F6eFpRejRPbzRJIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813354),
('eI7GtYXdYEsir6ayPbXV0euuewWnqarjv9Zp0wfc', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI0WEVqczJ3UFF6aW1BbUNNakc5eHVZeUFscXNpYnlySVRPZjNodEZIIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817919),
('eJ5R8oqh3kDskYJ4WMPb83mjlhRd3PanITfigeUt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJqdmVVdFk5ZEN5TmNpRlFCUmlBakRKeE4wNE1XWTE5VURWa2ZoZkdyIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813288),
('EmdnDaz7wsHlkljRRr8wUIulf5lVnYpPrnZ7YsKo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjcE9rNDBnNjhaR0hFaWdGbVQ0cDJWVFNHNkUwTEt1UnpYbktHN3VrIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819209),
('eO8jFhaMsnZhyVAQMRiOuAzM8vSLNl5kvdiewTcZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ1c2JDc1ZvTWxxNlhidXVPdmtTQ2NqR0ZucnN5WVFmVHhTYnRuN3dVIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818378),
('es09K9YS6WQS0wfkqLAblQCxzVwZWa4qIZdiQMdR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJiZ0gwNm4wOTRaeERYUGQzRHhmQ1RURmZtdzBtYWRxVm1ndEp4aThaIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817828),
('EukyIZRdK2xoRrzkhoBCjkWy8S23kfthvkTTEpVQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ3bXdudzlIa0pFbFJwdTlMZjYwbTlnckI4b0NGaVBXQm5XWDFnVlN1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782818350),
('EWYDqkRmQUitCiI6Nmsj5LPpmRKQ5WCNzrHizqtv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI1VVpxa3U2eW5qc1Y3Y2NpWlZQZXl4MWxTNEdHTlFmMEdJS1dIZHZoIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782813686),
('EXlvnDiQaZPOMH7A2X5zuGdHFocTMcOJxRKpJyMe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJrMGc5MWZESm45c1hmWlc0b1VpTUNFZU50VllBckxFNTRxV1JVVGVVIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813307),
('EYGiorb53JznsIKECZQuU42jfUS0d5VzNldVr5yQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJMdGhadG5iUjJPekhhSEp5YUlPcGtGNFhTV1J4TlJuN1hNTlVrNDFtIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814586),
('eYtH2yf2Eh7MGekw1CsE1Suyo1Xm09UcgZujgeQ9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJKUXpmQ1dmNkxvcjZDa2tJTWlZYkNPN0RaOTJrdTJKNkxRdDhyQ3ppIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819456),
('eZlM55xIPyYbLO4CsgkSi2rJcnsXt8krQlaW7UBN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJrcmVubXNqeTU5RlA4cG1OUzF5VVQybXZ3OXRUMHhEdjRQNVlqVWlGIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814737),
('fbgXB8lt6zpIbjTMlXrxUyV2f43cyy5GgvJybl2n', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJUaVBEZlJBdUE3NXVnc1kzNFVYSzhPcng3Nk92N3dvdllWMGpKMGtsIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782813441),
('fL3WRWT8MaO5JQEXJLMdGg0PeidJP4f7btxoJAeA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJzQWV5OVpFeGxaelY1V0R4enVBSWVNMjBpZ0kxeU8zR3J6VEwyclZDIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813339),
('fWWVFfdWS5sh1efzOXYVbjSKj8MGtYE2Df5tRysn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJGamFlSmFXSnowRm9CeDZXaW5GMUZQUk43QXJtbWdZclVkUmdHR3pCIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818048),
('g1oCpzONmM2SPAP5OaSFXCp1OmM6rFcq1RWRTszy', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJRR2lzTFFSUTBXTzg0YkU1MVZHTU53WUlRRDM5YTg1QmVVOFM3aTFsIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813338),
('GaHmL9pJpcCEuMYREQyTKOBImdJMFNCHZVArGFJI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI0TE96ZkdPbUlUZThPQTJBeEdvNjZKZjlOU2w4ZkZ2OE1YUWJBbVJOIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813336),
('gk15i8kwTqMDhXAQ419n4la0w2gR9wt8uxWj1ZTh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJQY0dRSFJlWlJjdXpmRklXaERJaDNVVUw1bE9TVnVHVERucWNCVEhpIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813956),
('gKQ8v4qw2m2sEpmMM38Et555pgaUYf412Ub58rfM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJyQXV3amgzbDB5QUFDRVVVckF3TlFqclg0NDE2QWp2MXljaW1QZFI1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813413),
('GMEDA5RhdOxgxmymZHl65omusn87Q5PSJJxO8kR0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIwRGpJUjZpaHNGNjVaRWtFdTNqZVhkN3laTVoxVUJON1h5NDhXRXZkIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782814598),
('H17U0btWeqLKZ4OiktRb6RYmVi4hTs8RI4HYRKqt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJtZk5udXA5bk12cTZ0aWxWU1R6dXVHVUpmNVFPNDM3WlZhU29TcjRMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819397),
('HbhwH9m5ia21ReLoGnDyvjEPShK03J1o6g642qAL', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJzN21UWnc2anpYNjZLWmxSYWFEcDJUTEZvRkdFWnRPVzhlNW5JWEw5IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817925),
('hFD61qB33ggOOcoA2RlOiIvu5aBbZ7kdxt3h9IaI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJkUVFYbmNuMHVsT1IwYVBvcUROUDEwTmduU21RTnBteHJnWkVpRWJvIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814812),
('hfklfcfbstMKYDf8BXjZA5yjGL2Vd82GrvqOFyWo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJWS0FvcjVmck10N1JCMVE3am9nRmpUc3dpcHpRNHFTSmdYRExpUEpvIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8xIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819210),
('HG4svLsQNkQk5GkLMJvhPw3MauecZvpNTH5x1pgB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJRSllwY3hRa3puNEV1WWl4MjNJQnlyd1RFVTJTZGl4VWRPZ0FoMHZwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782816299),
('hK6COtO7YJWZvIV3hXtbPUZpJWPCSp47wWh9XQSj', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJwcW15dDZYeU9vRTdpRHJ0bHJSOVljQlpNYWRiQXNIeHVNbmRWRjJ6IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819260),
('HpCVJK9b0mhq3U1CXiANGwQPpySJSW2cG36mcvsX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJrTWU1U0FGbk1teTdyZmtlUUFmWGN4R0hHb0IxaHlVRmxoUzhZaENaIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819456),
('HuaiEXa6PlBBI33gxYIAz9a4onHy8q90c0O5mltm', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIxNlV5d1B3UFE0UGx3WWVTdDFMQU1BckJJZnp0eHNtVXNJUlM4M29sIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817391),
('hyJlvTxIf9gBguiULy57lFCoHleaRRRJbrISNQWw', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjZmJhWUdYd1BQUkFGQ2daams1UkV0a2YwemFxT1ZmeHR0SzZMMkl0IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814672),
('i01iHz8QujNDEtVpNOCqxMSUgSokG7yLpt2TW0Jl', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJCNW5RckVnVHo3MTRCdG1jeHZXSEsxTVZmaEREQTJ2Z3ppT0dkMjNsIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814719),
('iiGz5FcCcNSwAHCM4n92Bt23P3Wc02EGmikNLWRC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJyU0VGbjh5T1J5cUc4VFB2Zm9KUWUxR2pEYllFTlVBTlJqWFdJRkIyIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8yIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818295),
('ILPZO6dqysM95Y0Cs8JPlBzsQ33Cgw78ukdqSEUx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJNV3pGeDlBYmUyWmtxRzJNZHhsYVlHaVQyeVljWHdzeDBFbUVoeGR4IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813352),
('ITtPoTgzRIHzhtuowpiTE6WsVU7N5EjBzRFgMOly', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJYNUVKUkFpOFVPajVvQkd6RVdlN2Fiakg2Y0o1ZkQyMWZ5dTNjMjc3IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782819199),
('JDFxm0NPC7vPpVAGissv5i0pQHPvwQZAR4k3ZCJJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJwU1FBa2s4dlNVTEdyTk1WeUZGUjZOemlVNUh3U3J4V1dLVHB5bVFyIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782816557),
('JI8w1GVTv46vbpPoG0NIJYi9rAfUvZidBNUg57VJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJJUGE4d1hFR3lIM3hDVWtpeTR1VURyRkt0WG5lRDNFZGlxU1JyS0tCIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cLzEyNy4wLjAuMTo4MDAwIiwicm91dGUiOm51bGx9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782828896),
('JIMp5D7fb1Xb2ej4QCs6v4krj2yhjy4n7astRley', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJhaGpqb3BzSmpGTXlhaXRpZG1naTVaN1A3c0poQzJYQUdUaDhDdDZEIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817994),
('jIYRp9j9aWtP7nR9iKHy37NqlPE4GvVNIs5McMQ8', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJHdENVWjVhenJRWTgwY3ZqWkp5WVlWSjhpZ3pjMDE3ZFFyTzNaQ0d5IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817825),
('JNHayornaeA4DREcmYlNv5SJV6OUTWcWHvkavq6C', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJLbUhkdUxXUGZtcTRvMFBLQWRTRTE2cUhLUGRUTjFMdXl5Q21HalFuIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9JUMzJUExbyIsInJvdXRlIjoicHJvZHVjdHMuaW5kZXgifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813435),
('joHLO7mB3Y6QBNaV5AmUO5jwKZdkiFPvr2A2Rxoi', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJIVjVBQzdGU1ZSdHpzUUp1ZjdRaUVtZEU1clhXVnhHYmhLWE9VVW9sIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814665),
('jRwt2xLHXxXIvRYQnDg7FeSKRGwYwpo1eJ0AhcQS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJaS1IwOXBubFo1YXlLSDBuOHY3RmtySjc3WHFRRERzZFo1N3RyOU9FIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814601),
('JsffnUAayh65Vk0NQImMnbnyN7yuAkbsAXx7WScv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI1dmZmeTBRM0RhbGNVcTE4ZFgzWG5IeGMyUVNkakhpNEVVZG5nOTNvIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782814669),
('JWf4dyfBP269nme1tdgGRGygAggkj0rXmhksFteH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIyTmxEY0QyelNJTnBXNElzRjdhWEZjcWRIWnY5Qm1CQUtwOWxxZExkIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782815472),
('JXilfKPvbn7Qz7YX6Mxrjlh9OLflxD6SnnrxAWM4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJqQnVYNHFLWHpJRlFNZmRNa2VORnVROGd5bTBSbHoyQzNodUdwT2RqIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819237);
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('K1riJcpsleM6xar67kle3owt7ZB7Ez9YiaLhRIwQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI3c3MxMVA1Y21Ba3FkdDQxMWRwd3dGTzBTSnNLcVViR3VCcTc4QlRZIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782818279),
('KcWl9ldOi8CkDcLpHwNpVumwX24EE2LMPF8jpshp', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJydzRBRGxQdTRxRjdLcFJ0bDFNUmtiYTdNTWlWWlN2cnFXSTVkTlF0IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813309),
('ke0z6P14ESpy2UbobJaXNLrPu1Oi44alZl0jnhn0', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjdm1wbUdhNHNhMXpoZ1JOOThoUGNOcWtmUWRINDg0QXpCcTRJczFGIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817421),
('kFOyeMSdCOnbFWtB6mEZqxjgn7uG253HJ7fkSQUP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJCcmo2dTVNV3hWWk8yR0M1QW1tRjNsNFp6VXAzVnBsVjlGamJtQnJKIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782819199),
('KmsFLsb6fNyJmEVuIGt417a10fT6TKu7NU5imtQ1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIzbnhPVnJOOVJJcDNlTjZQZE12UFI2ZnZGNURKa3l5aDRob3ZtVmpmIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814671),
('kP10FptKeyw3SeVGRQzlSlwGPVlpVV9GT9epG1CN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ6VTgyclg0eW5xWUx2VldlQzhENjNtbUxMTjNZbzFxN2tpeURaSHBkIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813417),
('kyXmaMr4GxSHkrqt6WYGS0bAqldO6BWaJSBnHfFg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJuN21sZlpIWndJU0g4RGFrU2t3ODVmbzhxUjFlcG92ZWRrdklPbGZMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819259),
('L1jaIopeVEqacloSIEuEkLoj0zWgTLvr6AsVolRe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJVT0JHcm11RTgyWDBtVXM4S3VBb0lYelJpSjlqRE5IU1NXbXRsd2RtIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817985),
('LbRj6l812Xjtn1gFYRrXjvKxlQyl7SQkVHVhIULo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ6S3luUUJpNXFrUVlmcmlhajdQb0g1RDY1c2N4M0RRM0NoMFRVWExSIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814602),
('lEu3KufJwLPxgySCPl6DpaQvIne5HECNB6Rr4CYD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJXZDRmMUllSlBhMER5eUR5QU1YcGwyR3VLRkV5VWYzRTdvT29Dd2RSIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813413),
('lJGHxDZYDis9Rpjh66CpEyuLXIXiw5hmXATSJutU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjTDdFczlBZ3k4ZlVYcjFBSzNqRWdlWHRRMjZVM3Z2blpvRzI2RG1VIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818451),
('LMKmf2RqkN7LIcK2GXwooK0OoXXOdeQZ53n1OGXH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI3d1ZQMEdpME9XeHJZSEdqc1hlMzBnMzRVTUpITGh2SEhaOHhKUFg5IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814558),
('lnzfmpYcPKQxziWr1FrKJh0AQ3tz0TTP0nSS59kG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJoNVV6U3Y3YkNLRTZ2OUl4bkVrbFZLcjcxdTh4dGllVVhwdTVoZjcwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8xIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819586),
('lOAQPjP9TqtykP93TB9lgSfToVZjyCogw8DWSVNi', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ5Zng1eVRNZ1QxMmNBN1ZqS1VFbnFjM3JJQmRtUnVnMW5EN1pTZW5IIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782813431),
('lR9Kx8PQWJdktG27UKPGXDMLddUjnxcwwWjanCAZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI4WGpqOWw1Uzl4VFhiWGFTZHBCc3VJZldMeHMwejhsektDMzIwVDJHIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819586),
('lspNfLPFGmAnz8kS8aZ0vabBKxXB6NpOo2adFAdO', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJhQXk4c2dXdHU3MXNHY0RNYVI0UjFxQXM2aUFDSEl5ODFEcEdNOHpQIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817922),
('lXXxtrWEfYVJVdXyuBQGiGQBgUNNcyU3kfJS8JtA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJJeFlqc3hCZGYxdzlzRmVJRkFza2JKUDVRMFcxaVNodmJQdENHTEFDIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813336),
('LycOq2rN06IIlkjfn7LuAaaz2risjr2qI2xrk3ZX', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI3WHRNb2RMY3hsaFRYNGxFSDdkbklScUVjNVJtZnhIN1ZCZGZUWVVoIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818348),
('M8fo2nJfDAPoKegA8hbBnwtjl8TXuDeSYiMUuNDE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI0MEtjRXRYUU1sT3l2OFdPU2twUVU0U3pxZ3hjSkFqTFlQd0VPNkU1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814737),
('mB63DoHqCbSZu6YzAI7rVSEnEuxMQ7xR6ST3Di5Y', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJXSThyRmswdlI0VERrQzVZTjk3bFhsdk9WMko0eVNrc21zYWdsajBnIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819214),
('mdoIYOCohMVks1dhb00V0eI5izucJO8gRQbNnlkS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJReFdobm51dHN1VktIM1V2SVg5ZDFNVVZXZWQ3TXNWNGNLNVB0QVNYIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813429),
('MeO7Yhy7UgdTsY1dC6U9ZyjDWT52AMMTWEX2Ldct', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJWWXJXOGlUcW5wT0kybFFUZndSblI2aE9aSWJSdTV2Mzg1TktZNlpzIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817828),
('MfC3PGmRuOHv2f9WCLgIiQMGbDsvRqCOCIVyM8km', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJHTmo4QjJRckJGY2V1OUZrbzhLVnRIaG5GeUhDRkpFbUtKMEh6RGFiIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819405),
('MkXvZNTE71DNV9usTRLZwB2I42WtJCbezDkkRPCf', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJHQTUzTXZTc0JiU0xZbWlMdGpiTWg5cUZDT2NxaGc4YUpYaGg1Z1FvIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782818010),
('MLWBmQ1R0fxhy7JtFhNzu9K5LLPgARQiIpiGXpuB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJHbUg4ZHZubFRXMnRJd2VDQnlETzFKTFNaVTZIYU5MSVJPT1ZPTG1hIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8xIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819260),
('N2pEuTfr2bNmhhgiQiSm0nxgpsRfYCSzkaAdzKCY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJuZ2NRM2lFRXNxVUNobncyWElMYkEzTjE5TmpiZ2lmZGtDUVd1ZlZyIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818369),
('N41AdKl29wXy7ZvPvB5CyCDKCREzDhSCG3l4929u', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJSbmw2eVVyWWs0VXJSODIzMmJHUEJ6NXpjaW8xc0dEMWo0ZEE3RzlsIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814740),
('Nc9vrKOV9QUSOg999z5DGsERALol9dLMVIP45WXC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJzZGo4ZW1naEdiUUZJU2VqVXZGVE9WWFJSeGFJdGVCSEMwZzV5QXcxIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814677),
('NI5xArQo0HrH00Uoo76sFQKJ7xiUN2ir0jb6zKAs', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJsbmtIUU9NOUpGeWo3SkpvZ21wd29pYkwyZW16THY0WG9mNkNVOW02IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817994),
('nJPUG28VaV86OeMx0MmgFo3FZtHkmbYWtOgY22W7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ4T29zZzZxMzNZZGFUaG1YM0JJWEVWM3dBVU5CbzIxV0VuWkVoT01EIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817919),
('njxx3xHJ5FnOKe95hvS7cw25NafidsxV65smiW0w', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIyRXgwY0NuTk9FSTZ0WXJocE5IVGNKb3dyeEwwOFh4MUNEQzM2eUdoIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819456),
('nQnIvDDfAjrKHSq3gzDZEaisXobOwXMbIiIUiYAU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJuWFppclV5RHp5TVpYVGNuclFrTjlxN2Z0eE0xaEk0ZlhUdTlyd0FiIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819652),
('nsNINRu91v3Yrq2hfz2rxvhqZzgMb0yeDHk6mkeP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ2R2dLclBYbmdvWUlOa3JpZ0ZpUkx4VUZ0RjFVaVFFMHlJdHZOd2IwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9JUMzJUExIiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782813435),
('nU3XTYrtam9cAGDwyZcFw9picTj2r6LA7TgGao1i', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJEVUxxQlU2ZEVuZmpPWFVzTVdXTHR5Qmw0UXJ0a3lQYXR4RjhFaWVGIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813313),
('NVOkaiI7S6U1BKrRKUK6QxyFMajkOg177FBOcUSS', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJRYTJ1T3BrYnZ2aENMa1NSQ3pNVXZFNDhQS00ybGVsMmlVV1NWcjViIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813310),
('nVQ5FjfNXT4lhspIHRfssKiZiFAiEwAAcE1EzpI5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjV2JpcGNFd0pvRUJqak03Q0pXaUdhNUlCOEZINjdOTzNqMlVYUlpvIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817919),
('o0VvvWKgP61tHWHgCSni87ANZuwbGX5jCKNxDN8K', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIzN2gzUVIzQ1FLM0lHNzR1STBYcVZmUm5hc2UxZGtuUkJkZ3FvYW4wIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814285),
('OF8F672kn79VJey8btYIwQ0TCFCIG0YKgIny1HHh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ2bDVOa0tqbnBiZ1ZzUTFJWUdoSFZQN2RpM1pCZkZlQ1RGMWpwQnk3IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818422),
('OgTCQ4Lk8maRty8fF8k3wiWNTcvb1mDHiSoDESia', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI4OVJnaUd5YUszQVlXRUs1MUxFQnRadHhSOWRwODluelIyZmZxdGxMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813002),
('OHog7VjCqNgcyhIrRInQitYavqEycia3TlTXSsHB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJhbEQ1dEtHUHh2QVJJNHB6RjhVelFvQUhCS0pyMElkY3c1ZndFT1U4IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814586),
('ONOILU2ZbMy8F30rLxsX8daF3K4cNCAAyUs49Onh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJvUWhHVFg5dXZRMzhRM25ITmZUemtkSGFTajZOYVJjUHZ5QWh6OUJ1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814586),
('oPG0JpLeQoY4RTnOQgAZD30olC2AC5Fj0rV7J6Xx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJpOUpoRjQwazd1TDd1eXZiSHBRbDZsaUtMRmYxdzc3ZGRFekpTZEt3IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8zIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819202),
('oqdJJFSNWsdlFLTDKTPCzzucefmU6Gd97jFcziTn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJTS1Z3UjM0TDRaZ2s3UlkzVld6TnIxRzFwa3lvNjY1S1d2VG5uTmRnIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819109),
('oVNrfTLrMJAlvW0QygfDfwSdWjNzqF56gUxyI7wR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJyWGFxTlJKZHJFWmFSUW1ZM0Y0VGM4TDFSclp4NzlDbmVQekZKc3pMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817831),
('PaQPwzK6v0qgrq20BtcQKdKjDX0WTXyvtlgJCv7U', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJyN0czUWNWSVpsSEFTenMxVlloS281MmNpTDJHZ1E0STdhejM1bVZ3IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814602),
('PbgBuG41UP5m8c48lr3RMlU6RgG66UBhTKhjuXhb', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJsSmRTcUdhNmFqQmxPbDVpcHlMemgwbTFaa3NXZGI2VHA0THJzTVRPIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8xIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819260),
('Pbqqqc1dOzpy6IZxLNuhhaVI8mxGGy4Oqv4XakfP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJzWWZ6Vk1PeGFkSlhFdk9uQndvdDRMT1JQenF1QTJlMWg1U2JHeHZpIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819397),
('PG433gJr28qzjdssr6KwRvCtdq59Kw5ybQmchQN6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJZU2ZuVmJOeEIzUEh4RGM1TmRMMTZjWnRYUXdTY1U5T2ROQUVYcnhiIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817710),
('PqmvD3hCSj4KwlZMAXutp8btisr7Ztv5ZrikbWO4', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJvSUQ0eVk3akxoUlFhdVlOc2Q3T2N2TGdXV3k5aFRuTzhYWExmdXNWIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819538),
('PUaI9RTVlKDlpT1TtnfOd19V0eoyc0MzFOxWYm1i', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ1RHVhR2tYTGRLS1ZUSHczS25jdUlSU2l5Y1FPVzFxT0l5NjNYdUxQIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817925),
('Pvja2yUdihOPTvR8VFtxKiV1zUrzi8ZHS00KMKFE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIwNWZLQTlORmJHODlKOVF1dkxrZjhlbEJ2QzB2cVpFb3VNYU85N1lDIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817924),
('q37KAM8FDiRHsMWyoTHdhk8EcfVCQhGuqRJ904oH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJEUUlSRENXOHNaN0pJcXFkWnN5RHpQWlB4MUxQOVc0SW01VTBHUHA1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782819388),
('QaTK2w8bXAYTbdpk9bsjJ37Ec0qnsz7y7h6Ztmux', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJUeWQyMTZKdFNKRnlkendxTVo1SlpuQXB5bWthV0tUaVFqV2FmRjR4IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818421),
('qFjUHa5mY9WkVP8lQrn1kq4y8xW1MUnWBFhUyhEg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJJZEtvY2ZmelFkOFpweTJLQW1vWVNtUlFTeGlpdFFEWGdOcEF4Mlo1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818352),
('QPb5fOTyGrz22sNzuUEOT36nlPf8YF567WfSPBzk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJUTGVsNTBpTVN2bm5VbmNhamlJVnhYbm5sTnJQTk1UeEVXSnl2bGdHIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819081),
('qpbRr8eobXW3fWYKGyiM98mzJVi06AHOY9GnzcCI', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJZWDFsNmxnNzVMdmU1bVJSOHVvUGViNWE0VTNwMU5pZDQzSVExOHE2IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817919),
('QRnd11zY5TpjBT1p7414Fc11Wm8Obei4VfPDj1xo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIyVkxxblRxdVJyUXVxOVVMTDhBdGRmQXlNdjZDYlIxYzBPTWw3amdYIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819652),
('qsbtGk7I9W4a9Q45MgDSnl8avOmRrtakjkUBWE1P', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJiM1ZxSlBpU3BRZWNhamczNFM5T0tmV2RPbzh1UFVGM0VrNnJiUnY1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782814593),
('qvU2EfM5sHoihAi6N4O8ijnVJZJjzKFsUhXyeLfV', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJFYzYwTXR4SWtZYll1ZWt1NkNIVE9VeUJxM2RlZVB3ZFVzeDlTUmFXIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813353),
('QyiiVN4SRolmVrOeJILRTQXVnn9FJNOmkuMvDDwA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIyN1NOTFp6SUprUmdITzVMZTNsWk95bm9rYmk4UTdTMVNaVThZTms0IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813002),
('rGZBVi6zD1yhha3ht40gm6fTZhxKRAPbKiySQ8CU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJXMllxYzlhQzdNaERGZHhpOHNjYXNWVG10ZHM5aElNNjBnWjFzbFRUIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818352),
('rINfuN6iQRBwhG3amQGmS6oJdRImQmLimasY4OYH', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJCM3FNTVJvbHpOQkJycFBlSVhUNDRHM0lJR0Z0czZqRUVIb05iTkN3IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818007),
('Rup9TqBdKavhgXWgrP8XRGXUuMThgvyMWdLHcqiD', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJkMU9Dd3BOYmpJc3lJelhkd1ZjVzhoTDM1bmhpYUNNM1RVdUNjVmdJIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782816297),
('rvskTc5G7BZD7NlcCR0rvK2YYkyRJ03iyTLF5s2K', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJQVm9SbEVxOGdFaGtFTkhubmQxd2ROUklVaFlvRVlsSUpCcHdiOGtiIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814724),
('RyUaHPHIoowBk1KrHIHRRuaXU9UHvipb5l1TVqSJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJQUnhQMzA3dXZSZjFQUW01ekRZeXlxTGZXdFl3V2txUUNpM1B6VHdpIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814740),
('rYy0K01TTWiM0pl98P0uRnhBtXKrcQ3dzLCYx98V', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ2UFMxdWlRMWVMdzVDY0htZjB1d3E3eWxWOUl1S3VHU0xrblAxdFhhIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817363),
('S192MfAPUdsbREhDcQxkMEsG9gsncIuKR0m905Ry', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJqc09aR3NJa0ZMUUtDZzBDUWQxS29wYXRjUXA1bjFqeHRqeTQzRlRwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817894),
('sAmVH4SfsKoGnjUBTbCiFpbZHos3C0Qa94YTlZsg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ3VGZ1V05pSWRMMFNpZm9ONzkyTzdhOUhsZ01qQnRyczJ2MGRqSW1SIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782818325),
('SNStqaBWdMjh7nS3fgGhalzdYSUom59r8uRUlwh7', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJxOEljRndTU2hIQ2E1OU55VXBDcFlYRklTY0g0Sm9xR1BrU2l6ejlOIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813314),
('SnXNya29QQuN5AXfUURHeXbtCOolThuImVrMoHjM', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJPT2E0TGpVa0Y5NXh3eDlCRWl5R1hZajNXNGxlZTNFcThIU0hEOG94IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819538),
('sOk47y83Lg1fhG7Qbzn95ECLGKKpbohcp1AwXccx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJOQnVzeWFjRGkwWUt3Z2JrOHV0WTRRNGlpMzdPcTZnMTYyQVJUNUxPIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782815470),
('Sw5VhGXYhZwa33stWcEYNllmlPBC71NyBzlgTAGR', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI0WDV0dkhiT2h6V0xFUlVUQTdWUWdSYVJzY3FCcHZWdkFDaGsxa1NzIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782813815),
('sWeLcSz683utCUDvhrUJxJvflbhmNQwf4HRalgY2', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI1NkJib0xLUGphQlZnSEdHckdxelNRMXBVRWF4ZTdNNWdaWGpCWFphIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782819647),
('syw1VAEtKGzD3t38PC8B0tLUSV1UQ9cIP7solEE1', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ4bkNNNmV5TXV4V3dPTGFZc3RoS2h6cVc1a01kN1dBRzJKS25XQWNYIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817995),
('T1UqW549BhsjJKaggX8GOdY3LKsxk5laLPWimlG6', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJSY05ZSlRJeW04dDJrWFlzQ01HSXJjUXI2R1NDclozams3TG4ybjhwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814673),
('t9cXU0soQkcIyY5GbDUhP6EZy9tlOMPeNLi7n2Zg', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJETEplTnNCSk1mc3pETkRqYVpCbFZuMUMxZEd6OE56bFJqN0ZLbjd4IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814671),
('TCBRWBYO34UtFUIa1V1fsFurRur2Fae0ZdAl75bB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJBU0tmbFVhVVFtUHNNbGxsVzJoQm80Z21ZakRDSm5WOFhDM3F2MThzIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782819239),
('ToxvrF7SslFtx3WfJV3IohcIMOlajvmiFzeiHuJA', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJTTjdiUFEzcWcxR3Y0VlRlOXl4UUFKS3E4Rk1sbGVONW1ua1RMTVl5IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819652),
('tteZjC9DfcfEP19dJlT4Nqido8f1669PBUri2f17', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJYb1JrV1dUc1dpOGZLeEkwNGQ5dDlCVWtWUUZmZVZRSFlhbm5mRGJCIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817039),
('tZfbqX2igMMWn1I8jl2xm760N7sl2lWj8Kj4Imwj', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJNamdiTWtRaE9IWnZCUHVFN0I4Zm9wRlJmRWlWbHJUQUpHVzlkMlFKIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8xIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819652),
('u0MgCQwYvRkKWeF3XIJDo4bzJptzS72cdsFkdl1S', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJYV2ZVNWViR1JaNkpURzFqbTlaeWl1Q0psZE01aUZnRGUzMnRuVzhkIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814349),
('u4lD9yMOGX6qpe3X6IiCZsyLndGvqdATyGB4LWu2', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJDR1FZSXIyOE5mMU5PUWN4c0F5UW1idlNzalJnanVTcTE0V1VsVkJxIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782816637),
('uBWLOpT46kQQuxKqTU7Gl1JiHw7rodH91EMvwVZC', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJxcldGVTkzWnNzaldFd2h1SzlmeG5YOFRmQWFwMFVna1hMYUtZa2lDIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817392),
('Ufr2h0CVS6zXZEgZX8jiF5t0SU7YgeBudhUVxvHP', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJnQ0ZocEVtbWxaUkxjOGQwQmIyU25HempHcjBOYXJrdGxhYVJNWW9LIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782819239),
('uGGRZ4lk9BWqu7kBcvkMxSxDqnHOmwW60w0XkKRB', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJGTFE1cVVGTkdUdnJwblNZdWdWaXlQVWM5ZTNNcnNacm42ZFhUQkNyIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817924),
('UiFzHd58izdZd3wJ3Z7BH8AEKtQAGxg6DBEs3Mj9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJYRmVXa0ZxOW5rWDdBVm5DbEVLSzAyWkl6UmI5dGZwbW1JNkI2QnZ3IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813431),
('uJayf8LiI6bOqhppahPq6n7PX50C2T0sEqeUrJo9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJldWEzMkNEWEYzUWdRTnA2V1NpQ09NNGpuekZ1amQ0NWdGZExwTk9hIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9YSIsInJvdXRlIjoicHJvZHVjdHMuaW5kZXgifSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813435),
('UkmZqXNUYJGrxujpQyMzZkYV1l3SgyhjTLkWvmKo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJzdWttYXVXQWt2MTY5TlhIaGU2dUdXRW53aEJhZW12c0w2Zzk5WG1yIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782819388),
('urEgjB7PjrAXrnq2bIjMSD9jHS2gORsOTJ06OVAU', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJZN1k5WGM2WldMVW44R0NQM1BMTzZOSFV5SUxIdGkycjVQSXBkR3RCIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818454),
('usDJXPdvbjjLLFtRmYh3Zh4xWneapRlVW1Typ1gv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJmT2ZWNm9oWnVVcnBmZ1hlbE5GVXVFVXhSUWNqNXRoOVRVdmdYczdsIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814678),
('uuAWCO0k7Q5Exl2LTPOwDyaphw9l9fRxrSrvbKxx', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJyVjJ0UVpiajNLWFNLaDdYOGIzS2EwcjMycDl6UXJPQUx0cE54WFZMIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818327),
('uvcPyNd67vZtLDxxZ3ik25FgqLREFdmoyFnfVvRZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJoeVVma1JrMXc2NXZRWkVSWUtzVEdNVG01MmVkS2kzOThhbkhpdDh0IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817919),
('uvRyKrrJ5KcgjioGvDywgI8vBTpEsA8b18salYYz', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJTVWlOSWFzU2xxbVJLbk95N2k5NnFoVUhWT1pGS0puUWt2MXFEZjYxIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782814736),
('Ux1GS0augzPi3TQzDUW6yujckRTi9UcsZquGO3Sn', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJJRFY3c0ExeUd5QnpPWE9tMlBDcVc1Y2RPcXZPOGd1cW5QMTBBdTI1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813313),
('VetO8gk7TpOTTXwbBEShV6lc8JBC1Ig3iuKL4g2i', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiIxUUFPUzdGZzlCdXRCaFRKcnE5N2pORXBUZXg1cWl3bnp6d3pRYmllIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813763),
('vsFYJCQanobcc8tlbEDesy9E8ra233yBjY7KVhxY', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJQUWdlcEJINjQ0aWJlbW5LNTdEa3JGVDliRno2WE1YV001UmRZbU5hIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819538),
('vSKO0VmsTGBjsOawzNm8yCDBlgM0i7RgCK705fHQ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJqc2dvM1RISk13YXBlUmpraVl4dEMyWnR6R1B6NFkzanFTQUhhZ3FYIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782818350),
('vYEljhBKI6fH8JSreokk0lkz5vtSuUZ6yl5pTmUN', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJabGp4ZmdIWFIzT0E3c2FHZUV5V0FOanlpS0VHbFhCVGJ2dXlYbkhaIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782818453),
('vYNxACZtXkrM30r6wgmqUfwxmWF1wmAsneKijb3L', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ6blVZYUlnN2lOTFp1dldhYXlaRVRISm5Ba0x6NkN0WUpvMXFNenF6IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzXC8xIiwicm91dGUiOiJwcm9kdWN0cy5zaG93In0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819538),
('w4ObEMk2qNJxC0T5FpW1fRQtcq2xvwaMPrhWWm8W', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJYYjRyQTB2V2NBVmFGOTZ6VmxJbktuNzE2dWxXRGx4Z3kzOHRNeVZZIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782816267),
('waAnoyVYEYsxwZOBc5dek3z0watoeISRQLlRJuxe', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJMVGJ0aEFkSVZCM2dzaUt2Vm9YVVJ6YWJKQ3g5cHNEU2tnY3JnRWRjIiwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819266),
('wmOH1X59fkN3CUAIRnHPTvurmmxAVOX33seCke3E', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJFdzdibVk5ak4zeFk5Q3Q4cW16bm03bVJQcjFGYVZNajV1Szk1dUh2IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819237),
('Ww5SXOxIzR1lac37IB0H3l08yrcdrTJvZYKuaPBh', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ5aDVZZVU2UWJvVzlVSlQ0NWpFeGNLS2FtWjI5TExnZEQ2cnlQdHZFIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814665),
('X9i9HPAs5u36k9rFbxxwSwzeSNw1UU0Xdy4LhAxk', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJoWnBCeFg1cEN0Vm5IaHZkQVU5RzFaOWtPazhud2Fxbkd1MzREWW1EIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814586),
('xc8d3IXNWawvHuEKab6aXw1qsUZPCr0htSsmKubt', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ0MWxLMHVINmExVWh3U09OdTZaMEt2V1ZIOEVSckVNR3Q1TkFudXBEIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813320),
('XcgK9VoBSTVJKkdOtLY63iS8tJRwUv7tLWVm3gpZ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJzMkpiZFQ1RFhuc3ptM25IdVBqMFNQckR3RXVBdVVHU09menZLd2lDIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819586),
('xDoUuT7nN8jj9COX4wVZBeloDESqJdMmmWzjKKoJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJEZlFrNWZQaTJ1alc0OEhKbzBxajVRTkplV2QyamFFNkRlT2R2bXBGIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817766),
('XDP0QEWF07VRggHcqnqkUmeBBP1zVkfXYBwBvWaJ', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJUbjdEVzZPN0RqS2plS29yTUpBcEdkVzZ4VzYwdXFnWUZIYUVRdXIwIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL21lZGlhP3BhZ2U9MSIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782813445),
('xg4NMRHfBxjb5nY0gB9XR5zF4EsAgFbPRjp7TGtG', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJPSVlMeG5iRTJ2ZVJOY1I0Umw0SkdzcTZ4akFlb0hGdU40ZUFTN0xIIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782817918),
('XJKIpAquabTkiDbucibFWixvdlkPsvSZ1M7PwWuE', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJNdHVHOUNHZk1TN0xXOHFMd1VWZDBQODJzbjRMZmZlSTkzRzBDbXhjIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9Iiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782817423),
('Xkfm2iGmsk2K4Mcw6W2sTHB66pAcQeg1xv3aWDYo', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJCZ2loTFlBNmFDbmNVdWJkeDB4aXBaQVJIOWlxeUZLcVFKbkh0bEM4IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782819209),
('XnLzxTVlg41NYr2BGmXde4utx1bG4UVUx9q5RcXy', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJzNk5VQlhuRVZLYlo3V1d0dFFMRHdPYmFrTXVCRGdITEx3U0tUTHIzIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3Byb2R1Y3RzP3BhZ2U9MSZwZXJfcGFnZT0yMCZzZWFyY2g9JUMzJUExIiwicm91dGUiOiJwcm9kdWN0cy5pbmRleCJ9LCJfZmxhc2giOnsib2xkIjpbXSwibmV3IjpbXX19', 1782813440),
('xNst1h5HjyE8o49nafwvzLRbwjn1iCOCD7YXCr5b', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjaDhPcUMyNkRMd1c5Wm5xdUsyUzlxbGxTdGdBVHJMOG1EZzJOeW9YIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2ltcG9ydHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782815472),
('xnwDnaPbvWsDC00LdcnHDq9WqXYBRYVETQVOqPA9', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJjdzRlcHRVU3FMVjVUWmQxNHBXVkY0bVpTT0poSDQ4TnZTM0lrRlZzIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819652),
('XOyCA4AMX4v0gcFtUfmXmZIXYmWep8g9n5kaWrnW', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJxMHNEYWMyaVA2S3J1WTFMdXp3aThKeW9HTUJHS2lYZDlJSzBVQ3k1IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782818369),
('xPC8kXE2IMp58sDzmRWIHrqC9HxeJeGAvGqdwafu', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJhRHFNZVFWc1VpVkloYmxRMzBYTjVqaGh0VmhDM0RHT3JUd2RxaWJjIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2NhdGVnb3JpZXMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782814586),
('XqQ5d3XkllC0qvBo2e00z5UBI7Jl4jDRk0LyXVsv', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJDYm01QzRqeHlyVkx0SFZzYTl6WXZMaDBKeW5YTU44OUlYTUhKNldkIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2Rhc2hib2FyZFwvc3RhdHMiLCJyb3V0ZSI6bnVsbH0sIl9mbGFzaCI6eyJvbGQiOltdLCJuZXciOltdfX0=', 1782813446),
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('Y5uuewOw3uUzr19SkBrU7J5q9DzmSWG1nqMWI626', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJ3YkVLZmE1S3dHVndVcmJPT0Y0RFZ5YzN5d3Y5Nmp5WnVKOUZjMlNSIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782819260),
('yBSqjuztfJX25TRWuwDlw67kMxXzkWZziaMf6H7c', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiJHTkw1QnVHeVZUN1k4c0Yxc1lwNW1SRVlOZGM4akN4cU9Wc0Q3cElHIiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL3N1cHBsaWVycyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817984),
('zNcJB7VQgJpEhLXgbFKuLr7xkKFqDkRWSUkAJqY5', NULL, '127.0.0.1', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/149.0.0.0 Safari/537.36', 'eyJfdG9rZW4iOiI0eHkyVUlwMFpZWUMwekRDdzVjR0tJNW5MTDNvSEptdXFzTlhJcGV4IiwiX3ByZXZpb3VzIjp7InVybCI6Imh0dHA6XC9cL2xvY2FsaG9zdDo4MDAwXC9hcGlcL2JyYW5kcyIsInJvdXRlIjpudWxsfSwiX2ZsYXNoIjp7Im9sZCI6W10sIm5ldyI6W119fQ==', 1782817994),

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `suppliers`
--

CREATE TABLE `suppliers` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tenant_id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `code` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `contact_person` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `notes` text DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `suppliers`
--

INSERT INTO `suppliers` (`id`, `tenant_id`, `name`, `code`, `email`, `phone`, `contact_person`, `address`, `notes`, `is_active`, `created_at`, `updated_at`) VALUES
(1, 1, 'Tổng kho May mặc Hà Nội', 'SUP-FASHION-01', 'contact@detmayhn.vn', '0325277184', 'Nguyễn Văn Hùng', NULL, NULL, 1, '2026-06-30 02:16:39', '2026-06-30 06:34:08'),
(2, 2, 'Nhà phân phối Digiworld', 'SUP-TECH-DGW', 'info@digiworld.com.vn', '02839112233', 'Lê Minh Triết', NULL, NULL, 1, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(3, 1, 'SƠn đẹp trai', 'NCC-007', 'vanson21102003@gmail.com', '0325277185', 'Sơn đpẹ trai', NULL, NULL, 1, '2026-06-30 06:34:37', '2026-06-30 06:34:48');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `tenants`
--

CREATE TABLE `tenants` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `name` varchar(255) NOT NULL,
  `subdomain` varchar(255) NOT NULL,
  `domain` varchar(255) DEFAULT NULL,
  `logo_url` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `address` text DEFAULT NULL,
  `industry_type` varchar(255) NOT NULL DEFAULT 'general',
  `status` varchar(255) NOT NULL DEFAULT 'active',
  `settings` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin DEFAULT NULL CHECK (json_valid(`settings`)),
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `tenants`
--

INSERT INTO `tenants` (`id`, `name`, `subdomain`, `domain`, `logo_url`, `phone`, `email`, `address`, `industry_type`, `status`, `settings`, `created_at`, `updated_at`) VALUES
(1, 'ACOS Fashion', 'fashion', 'acos-fashion.vn', NULL, NULL, NULL, NULL, 'fashion', 'active', '{\"theme\":\"light\",\"currency\":\"VND\"}', '2026-06-30 02:16:38', '2026-06-30 02:16:38'),
(2, 'ACOS Tech', 'tech', 'acos-tech.vn', NULL, NULL, NULL, NULL, 'electronics', 'active', '{\"theme\":\"dark\",\"currency\":\"VND\"}', '2026-06-30 02:16:38', '2026-06-30 02:16:38');

-- --------------------------------------------------------

--
-- Cấu trúc bảng cho bảng `users`
--

CREATE TABLE `users` (
  `id` bigint(20) UNSIGNED NOT NULL,
  `tenant_id` bigint(20) UNSIGNED DEFAULT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `email_verified_at` timestamp NULL DEFAULT NULL,
  `password` varchar(255) NOT NULL,
  `remember_token` varchar(100) DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Đang đổ dữ liệu cho bảng `users`
--

INSERT INTO `users` (`id`, `tenant_id`, `name`, `email`, `email_verified_at`, `password`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, NULL, 'Admin ACOS System', 'admin@acos.vn', NULL, '$2y$12$UIbLZx.zcbpyVoqVR5Juiesaa6znrX3FvqkbkSRtUmRzr/CWxQyFe', NULL, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(2, 1, 'Fashion Manager', 'fashion@acos.vn', NULL, '$2y$12$VC6EIM5.2v6RCw9O7XCC7OpC/FLXEKjxLIoGUMnIUMxbvIJl1dkHO', NULL, '2026-06-30 02:16:39', '2026-06-30 02:16:39'),
(3, 2, 'Tech Manager', 'tech@acos.vn', NULL, '$2y$12$EHelLUe8WaMaxOS/fLJ86uQpVkEfc3c2fwu4tVUPkyh3f.c12wT/.', NULL, '2026-06-30 02:16:39', '2026-06-30 02:16:39');

--
-- Chỉ mục cho các bảng đã đổ
--

--
-- Chỉ mục cho bảng `assets`
--
ALTER TABLE `assets`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assets_tenant_id_foreign` (`tenant_id`);

--
-- Chỉ mục cho bảng `attributes`
--
ALTER TABLE `attributes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `attributes_tenant_id_code_unique` (`tenant_id`,`code`);

--
-- Chỉ mục cho bảng `brands`
--
ALTER TABLE `brands`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `brands_tenant_id_slug_unique` (`tenant_id`,`slug`);

--
-- Chỉ mục cho bảng `cache`
--
ALTER TABLE `cache`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_expiration_index` (`expiration`);

--
-- Chỉ mục cho bảng `cache_locks`
--
ALTER TABLE `cache_locks`
  ADD PRIMARY KEY (`key`),
  ADD KEY `cache_locks_expiration_index` (`expiration`);

--
-- Chỉ mục cho bảng `categories`
--
ALTER TABLE `categories`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `categories_tenant_id_slug_unique` (`tenant_id`,`slug`),
  ADD KEY `categories_parent_id_foreign` (`parent_id`);

--
-- Chỉ mục cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `failed_jobs_uuid_unique` (`uuid`),
  ADD KEY `failed_jobs_connection_queue_failed_at_index` (`connection`,`queue`,`failed_at`);

--
-- Chỉ mục cho bảng `imports`
--
ALTER TABLE `imports`
  ADD PRIMARY KEY (`id`),
  ADD KEY `imports_tenant_id_foreign` (`tenant_id`),
  ADD KEY `imports_user_id_foreign` (`user_id`);

--
-- Chỉ mục cho bảng `jobs`
--
ALTER TABLE `jobs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `jobs_queue_index` (`queue`);

--
-- Chỉ mục cho bảng `job_batches`
--
ALTER TABLE `job_batches`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Chỉ mục cho bảng `password_reset_tokens`
--
ALTER TABLE `password_reset_tokens`
  ADD PRIMARY KEY (`email`);

--
-- Chỉ mục cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `personal_access_tokens_token_unique` (`token`),
  ADD KEY `personal_access_tokens_tokenable_type_tokenable_id_index` (`tokenable_type`,`tokenable_id`),
  ADD KEY `personal_access_tokens_expires_at_index` (`expires_at`);

--
-- Chỉ mục cho bảng `products`
--
ALTER TABLE `products`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `products_tenant_id_sku_unique` (`tenant_id`,`sku`),
  ADD UNIQUE KEY `products_tenant_id_slug_unique` (`tenant_id`,`slug`),
  ADD KEY `products_category_id_foreign` (`category_id`),
  ADD KEY `products_brand_id_foreign` (`brand_id`),
  ADD KEY `products_supplier_id_foreign` (`supplier_id`);

--
-- Chỉ mục cho bảng `product_assets`
--
ALTER TABLE `product_assets`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_assets_product_id_asset_id_unique` (`product_id`,`asset_id`),
  ADD KEY `product_assets_asset_id_foreign` (`asset_id`);

--
-- Chỉ mục cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `product_variants_tenant_id_sku_unique` (`tenant_id`,`sku`),
  ADD KEY `product_variants_product_id_foreign` (`product_id`);

--
-- Chỉ mục cho bảng `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`id`),
  ADD KEY `sessions_user_id_index` (`user_id`),
  ADD KEY `sessions_last_activity_index` (`last_activity`);

--
-- Chỉ mục cho bảng `suppliers`
--
ALTER TABLE `suppliers`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `suppliers_tenant_id_code_unique` (`tenant_id`,`code`);

--
-- Chỉ mục cho bảng `tenants`
--
ALTER TABLE `tenants`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `tenants_subdomain_unique` (`subdomain`),
  ADD UNIQUE KEY `tenants_domain_unique` (`domain`);

--
-- Chỉ mục cho bảng `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`),
  ADD KEY `users_tenant_id_foreign` (`tenant_id`);

--
-- AUTO_INCREMENT cho các bảng đã đổ
--

--
-- AUTO_INCREMENT cho bảng `assets`
--
ALTER TABLE `assets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `attributes`
--
ALTER TABLE `attributes`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT cho bảng `brands`
--
ALTER TABLE `brands`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `categories`
--
ALTER TABLE `categories`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT cho bảng `failed_jobs`
--
ALTER TABLE `failed_jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `imports`
--
ALTER TABLE `imports`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `jobs`
--
ALTER TABLE `jobs`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=15;

--
-- AUTO_INCREMENT cho bảng `personal_access_tokens`
--
ALTER TABLE `personal_access_tokens`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT cho bảng `products`
--
ALTER TABLE `products`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT cho bảng `product_assets`
--
ALTER TABLE `product_assets`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT cho bảng `suppliers`
--
ALTER TABLE `suppliers`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT cho bảng `tenants`
--
ALTER TABLE `tenants`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT cho bảng `users`
--
ALTER TABLE `users`
  MODIFY `id` bigint(20) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Các ràng buộc cho các bảng đã đổ
--

--
-- Các ràng buộc cho bảng `assets`
--
ALTER TABLE `assets`
  ADD CONSTRAINT `assets_tenant_id_foreign` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `attributes`
--
ALTER TABLE `attributes`
  ADD CONSTRAINT `attributes_tenant_id_foreign` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `brands`
--
ALTER TABLE `brands`
  ADD CONSTRAINT `brands_tenant_id_foreign` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `categories`
--
ALTER TABLE `categories`
  ADD CONSTRAINT `categories_parent_id_foreign` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `categories_tenant_id_foreign` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `imports`
--
ALTER TABLE `imports`
  ADD CONSTRAINT `imports_tenant_id_foreign` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `imports_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE SET NULL;

--
-- Các ràng buộc cho bảng `products`
--
ALTER TABLE `products`
  ADD CONSTRAINT `products_brand_id_foreign` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_supplier_id_foreign` FOREIGN KEY (`supplier_id`) REFERENCES `suppliers` (`id`) ON DELETE SET NULL,
  ADD CONSTRAINT `products_tenant_id_foreign` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_assets`
--
ALTER TABLE `product_assets`
  ADD CONSTRAINT `product_assets_asset_id_foreign` FOREIGN KEY (`asset_id`) REFERENCES `assets` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_assets_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `product_variants`
--
ALTER TABLE `product_variants`
  ADD CONSTRAINT `product_variants_product_id_foreign` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `product_variants_tenant_id_foreign` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `suppliers`
--
ALTER TABLE `suppliers`
  ADD CONSTRAINT `suppliers_tenant_id_foreign` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE;

--
-- Các ràng buộc cho bảng `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_tenant_id_foreign` FOREIGN KEY (`tenant_id`) REFERENCES `tenants` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
