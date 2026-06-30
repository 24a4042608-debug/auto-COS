export interface User {
  id: number;
  name: string;
  email: string;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  parent_id: number | null;
  children?: Category[];
}

export interface Brand {
  id: number;
  name: string;
  slug: string;
}

export interface Supplier {
  id: number;
  name: string;
  code: string;
  email: string;
  phone: string;
}

export interface ProductVariant {
  id: number;
  product_id: number;
  sku: string;
  attributes: Record<string, string>;
  attribute_values?: Record<string, any> | null;
  price: number | null;
  sale_price: number | null;
  cost_price: number | null;
  stock: number;
  is_active: boolean;
}

export interface Asset {
  id: number;
  filename: string;
  original_name: string;
  url: string;
  type: 'image' | 'video';
  size: number;
  width: number | null;
  height: number | null;
  mime_type: string;
  created_at: string;
  path?: string;
  disk?: string;
  tags?: string[] | null;
}

export interface Product {
  id: number;
  sku: string;
  barcode: string | null;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  category_id: number | null;
  brand_id: number | null;
  supplier_id: number | null;
  category?: Category;
  brand?: Brand;
  supplier?: Supplier;
  cost_price: number;
  price: number;
  sale_price: number | null;
  stock: number;
  min_stock: number;
  seo_title: string | null;
  seo_description: string | null;
  tags: string[] | null;
  has_variants: boolean;
  status: 'draft' | 'active' | 'inactive';
  attributes?: Record<string, any> | null;
  variants?: ProductVariant[];
  assets?: Asset[];
  variants_count?: number;
  created_at: string;
  updated_at: string;
}

export interface Import {
  id: number;
  original_filename: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  total_rows: number;
  success_rows: number;
  failed_rows: number;
  errors: Array<{ row: number; error: string }> | null;
  created_at: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  current_page: number;
  last_page: number;
  per_page: number;
  total: number;
  from: number;
  to: number;
}

export interface DashboardStats {
  total_products: number;
  active_products: number;
  draft_products: number;
  total_assets: number;
  unmapped_assets: number;
  recent_imports: Import[];
}
