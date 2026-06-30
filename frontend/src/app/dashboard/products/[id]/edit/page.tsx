'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import api from '@/lib/api';
import { Category, Brand, Supplier, Product } from '@/types';
import { ArrowLeft, Save, Plus, Minus, Loader2, Upload, Image as ImageIcon } from 'lucide-react';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function EditProductPage({ params }: PageProps) {
  const router = useRouter();
  const { id } = use(params);
  const [fetching, setFetching] = useState(true);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Image assets state
  const [primaryAsset, setPrimaryAsset] = useState<any | null>(null);
  const [subAssets, setSubAssets] = useState<any[]>([]);
  const [uploadingPrimary, setUploadingPrimary] = useState(false);
  const [uploadingSub, setUploadingSub] = useState(false);

  const [form, setForm] = useState({
    sku: '', barcode: '', name: '',
    short_description: '', description: '',
    category_id: '', brand_id: '', supplier_id: '',
    cost_price: '0', price: '0', sale_price: '',
    stock: '0', min_stock: '0',
    seo_title: '', seo_description: '',
    tags: '', status: 'draft',
  });

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/brands'),
      api.get('/suppliers'),
      api.get(`/products/${id}`),
    ]).then(([cats, brds, sups, prodRes]) => {
      setCategories(cats.data);
      setBrands(brds.data);
      setSuppliers(sups.data);

      const prod: any = prodRes.data;
      setForm({
        sku: prod.sku,
        name: prod.name,
        barcode: prod.barcode || '',
        short_description: prod.short_description || '',
        description: prod.description || '',
        category_id: prod.category_id?.toString() || '',
        brand_id: prod.brand_id?.toString() || '',
        supplier_id: prod.supplier_id?.toString() || '',
        cost_price: prod.cost_price.toString(),
        price: prod.price.toString(),
        sale_price: prod.sale_price?.toString() || '',
        stock: prod.stock.toString(),
        min_stock: prod.min_stock.toString(),
        seo_title: prod.seo_title || '',
        seo_description: prod.seo_description || '',
        tags: prod.tags ? prod.tags.join(', ') : '',
        status: prod.status,
      });

      // Load existing assets
      if (prod.assets) {
        const primary = prod.assets.find((a: any) => a.pivot?.is_primary);
        const subs = prod.assets.filter((a: any) => !a.pivot?.is_primary);
        setPrimaryAsset(primary || null);
        setSubAssets(subs);
      }
      setFetching(false);
    }).catch(() => {
      router.push('/dashboard/products');
    });
  }, [id, router]);

  const handlePrimaryUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingPrimary(true);
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append('files[]', file);
    formData.append('model', 'products');
    try {
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data && res.data.length > 0) {
        setPrimaryAsset(res.data[0]);
      }
    } catch (err: any) {
      const msg = err.response?.data?.errors?.files?.[0] || err.response?.data?.message || err.message;
      alert('Kh\u00f4ng th\u1ec3 t\u1ea3i \u1ea3nh ch\u00ednh l\u00ean: ' + msg);
    } finally {
      setUploadingPrimary(false);
    }
  };

  const handleSubUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    setUploadingSub(true);
    const files = Array.from(e.target.files);
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files[]', file);
    });
    formData.append('model', 'products');
    try {
      const res = await api.post('/media/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (res.data && res.data.length > 0) {
        setSubAssets(prev => [...prev, ...res.data]);
      }
    } catch (err: any) {
      const msg = err.response?.data?.errors?.files?.[0] || err.response?.data?.message || err.message;
      alert('Kh\u00f4ng th\u1ec3 t\u1ea3i \u1ea3nh ph\u1ee5 l\u00ean: ' + msg);
    } finally {
      setUploadingSub(false);
    }
  };

  const removeSubAsset = (idx: number) => {
    setSubAssets(prev => prev.filter((_, i) => i !== idx));
  };

  const getFlattenedCategories = (cats: Category[], depth = 0): { id: number; name: string }[] => {
    let list: { id: number; name: string }[] = [];
    cats.forEach(c => {
      list.push({ id: c.id, name: '  '.repeat(depth) + (depth > 0 ? '└─ ' : '') + c.name });
      if (c.children && c.children.length > 0) {
        list = [...list, ...getFlattenedCategories(c.children, depth + 1)];
      }
    });
    return list;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    
    const assetIds = [
      ...(primaryAsset ? [primaryAsset.id] : []),
      ...subAssets.map(a => a.id)
    ];

    try {
      const payload = {
        ...form,
        category_id: form.category_id || null,
        brand_id: form.brand_id || null,
        supplier_id: form.supplier_id || null,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
        cost_price: parseFloat(form.cost_price) || 0,
        price: parseFloat(form.price) || 0,
        sale_price: form.sale_price ? parseFloat(form.sale_price) : null,
        stock: parseInt(form.stock) || 0,
        min_stock: parseInt(form.min_stock) || 0,
        asset_ids: assetIds,
        primary_asset_id: primaryAsset ? primaryAsset.id : null,
      };
      await api.put(`/products/${id}`, payload);
      router.push('/dashboard/products');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        alert(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật sản phẩm.');
      }
    } finally {
      setLoading(false);
    }
  };

  const inputClass = 'input-field';
  const labelClass = 'block text-sm font-medium mb-1.5';
  const labelStyle = { color: 'rgba(255,255,255,0.7)' };
  const sectionClass = 'glass-card p-6 space-y-4';

  if (fetching) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2 size={32} className="animate-spin text-indigo-500" />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-5 pb-32">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/products" className="btn-ghost" style={{ padding: '0.5rem' }}>
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Chỉnh sửa sản phẩm</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Cập nhật thông tin sản phẩm #{id}</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-white border-b border-white/[0.04] pb-2">Thông tin cơ bản</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>SKU <span style={{ color: '#f87171' }}>*</span></label>
              <input className={inputClass} value={form.sku} onChange={e => setForm({...form, sku: e.target.value})} placeholder="SP-001" required />
              {errors.sku && <p className="text-xs mt-1" style={{ color: '#f87171' }}>{errors.sku}</p>}
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Barcode</label>
              <input className={inputClass} value={form.barcode} onChange={e => setForm({...form, barcode: e.target.value})} placeholder="8936000000000" />
            </div>
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Tên sản phẩm <span style={{ color: '#f87171' }}>*</span></label>
            <input className={inputClass} value={form.name} onChange={e => setForm({...form, name: e.target.value})} placeholder="Nhập tên sản phẩm..." required />
          </div>
          
          {/* Combined Descriptions */}
          <div className="grid grid-cols-1 gap-4 pt-2">
            <div>
              <label className={labelClass} style={labelStyle}>Mô tả ngắn</label>
              <input className={inputClass} value={form.short_description} onChange={e => setForm({...form, short_description: e.target.value})} placeholder="Mô tả ngắn gọn về sản phẩm..." />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Mô tả chi tiết</label>
              <textarea
                className={inputClass}
                value={form.description}
                onChange={e => setForm({...form, description: e.target.value})}
                placeholder="Mô tả chi tiết đặc tính, chất liệu, hướng dẫn sử dụng sản phẩm..."
                rows={5}
                style={{ resize: 'vertical' }}
              />
            </div>
          </div>
        </div>

        {/* Product Images */}
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-white border-b border-white/[0.04] pb-2">Hình ảnh sản phẩm</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Primary Image */}
            <div className="md:col-span-1 space-y-2">
              <label className={labelClass} style={labelStyle}>Ảnh chính *</label>
              <div className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-lg p-4 bg-white/[0.01] min-h-[160px] relative">
                {primaryAsset ? (
                  <div className="relative group w-full h-36 rounded-lg overflow-hidden">
                    <img src={primaryAsset.url} alt="Primary Asset" className="w-full h-full object-cover bg-[#0d0d14]" />
                    <button 
                      type="button" 
                      onClick={() => setPrimaryAsset(null)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400 text-xs font-medium cursor-pointer"
                    >
                      Thay đổi ảnh
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center cursor-pointer text-center w-full h-full py-6">
                    {uploadingPrimary ? (
                      <Loader2 size={20} className="text-indigo-400 animate-spin" />
                    ) : (
                      <>
                        <Upload size={20} className="text-white/40 mb-2" />
                        <span className="text-xs text-white/60">Tải ảnh chính</span>
                        <span className="text-[9px] text-white/30 mt-1">Ảnh đại diện sản phẩm</span>
                      </>
                    )}
                    <input type="file" accept="image/*" onChange={handlePrimaryUpload} className="hidden" disabled={uploadingPrimary} />
                  </label>
                )}
              </div>
            </div>

            {/* Sub Images */}
            <div className="md:col-span-2 space-y-2">
              <label className={labelClass} style={labelStyle}>Ảnh phụ (Nhiều ảnh)</label>
              <div className="grid grid-cols-3 gap-3">
                {subAssets.map((asset, idx) => (
                  <div key={idx} className="relative group h-24 rounded-lg overflow-hidden border border-white/10">
                    <img src={asset.url} alt="Sub Asset" className="w-full h-full object-cover bg-[#0d0d14]" />
                    <button 
                      type="button" 
                      onClick={() => removeSubAsset(idx)}
                      className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-red-400 text-xs font-medium cursor-pointer"
                    >
                      Xóa
                    </button>
                  </div>
                ))}
                
                <label className="flex flex-col items-center justify-center border border-dashed border-white/10 rounded-lg h-24 bg-white/[0.01] cursor-pointer text-center hover:bg-white/[0.02] transition-colors">
                  {uploadingSub ? (
                    <Loader2 size={16} className="text-indigo-400 animate-spin" />
                  ) : (
                    <>
                      <Upload size={16} className="text-white/40 mb-1" />
                      <span className="text-[10px] text-white/50">Thêm ảnh</span>
                    </>
                  )}
                  <input type="file" accept="image/*" multiple onChange={handleSubUpload} className="hidden" disabled={uploadingSub} />
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Classification */}
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-white border-b border-white/[0.04] pb-2">Phân loại</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>Danh mục</label>
              <select className={inputClass} value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})}>
                <option value="">Chọn danh mục</option>
                {getFlattenedCategories(categories).map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Thương hiệu</label>
              <select className={inputClass} value={form.brand_id} onChange={e => setForm({...form, brand_id: e.target.value})}>
                <option value="">Chọn thương hiệu</option>
                {brands.map(b => <option key={b.id} value={b.id}>{b.name}</option>)}
              </select>
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Nhà cung cấp</label>
              <select className={inputClass} value={form.supplier_id} onChange={e => setForm({...form, supplier_id: e.target.value})}>
                <option value="">Chọn nhà cung cấp</option>
                {suppliers.map(s => <option key={s.id} value={s.id}>{s.name}</option>)}
              </select>
            </div>
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Tags (cách nhau bằng dấu phẩy)</label>
            <input className={inputClass} value={form.tags} onChange={e => setForm({...form, tags: e.target.value})} placeholder="giày, thể thao, nike" />
          </div>
        </div>

        {/* Pricing */}
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-white border-b border-white/[0.04] pb-2">Giá cả & Tồn kho</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>Giá vốn (₫)</label>
              <input type="number" className={inputClass} value={form.cost_price} onChange={e => setForm({...form, cost_price: e.target.value})} min="0" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Giá bán (₫) <span style={{ color: '#f87171' }}>*</span></label>
              <input type="number" className={inputClass} value={form.price} onChange={e => setForm({...form, price: e.target.value})} min="0" required />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Giá khuyến mãi (₫)</label>
              <input type="number" className={inputClass} value={form.sale_price} onChange={e => setForm({...form, sale_price: e.target.value})} min="0" />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>Tồn kho</label>
              <input type="number" className={inputClass} value={form.stock} onChange={e => setForm({...form, stock: e.target.value})} min="0" />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>Tồn kho tối thiểu</label>
              <input type="number" className={inputClass} value={form.min_stock} onChange={e => setForm({...form, min_stock: e.target.value})} min="0" />
            </div>
          </div>
        </div>

        {/* Combined SEO Section */}
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-white border-b border-white/[0.04] pb-2">Cấu hình SEO</h2>
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>SEO Title</label>
              <input className={inputClass} value={form.seo_title} onChange={e => setForm({...form, seo_title: e.target.value})} placeholder="Tiêu đề tối ưu cho công cụ tìm kiếm..." />
            </div>
            <div>
              <label className={labelClass} style={labelStyle}>SEO Description</label>
              <textarea className={inputClass} value={form.seo_description} onChange={e => setForm({...form, seo_description: e.target.value})} placeholder="Mô tả tối ưu cho công cụ tìm kiếm..." rows={3} />
            </div>
          </div>
        </div>

        {/* Status Selector - Placed above the save button */}
        <div className="flex justify-end items-center gap-3">
          <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Trạng thái sản phẩm:</label>
          <select 
            className={`${inputClass} text-xs`} 
            style={{ width: 'auto', minWidth: '150px', paddingRight: '2rem' }} 
            value={form.status} 
            onChange={e => setForm({...form, status: e.target.value})}
          >
            <option value="draft">Nháp</option>
            <option value="active">Đang bán</option>
            <option value="inactive">Ngừng bán</option>
          </select>
        </div>

        {/* Actions - Fixed Footer Bar */}
        <div className="fixed bottom-0 left-0 right-0 lg:left-64 z-30 border-t border-white/[0.04] bg-[#07070c]/95 backdrop-blur-md p-4 flex items-center justify-end shadow-[0_-4px_20px_rgba(0,0,0,0.4)] fixed-footer-bar">
          <div className="flex items-center gap-3">
            <Link href="/dashboard/products" className="btn-ghost">Hủy</Link>
            <button type="submit" disabled={loading || uploadingPrimary || uploadingSub} className="btn-primary">
              {loading ? <><Loader2 size={14} className="animate-spin" /> Đang lưu...</> : <><Save size={14} /> Lưu sản phẩm</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
