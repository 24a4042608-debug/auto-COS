'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import api from '@/lib/api';
import { Brand, Category, Supplier } from '@/types';
import { Plus, Minus, Save, ArrowLeft, Loader2 } from 'lucide-react';
import Link from 'next/link';

interface VariantForm {
  sku: string;
  attributes: Record<string, string>;
  price: string;
  cost_price: string;
  stock: string;
}

export default function CreateProductPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [brands, setBrands] = useState<Brand[]>([]);
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [variants, setVariants] = useState<VariantForm[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [form, setForm] = useState({
    sku: '', name: '', barcode: '', short_description: '', description: '',
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
    ]).then(([cats, brds, sups]) => {
      setCategories(cats.data);
      setBrands(brds.data);
      setSuppliers(sups.data);
    });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});
    try {
      const payload = {
        ...form,
        category_id: form.category_id || undefined,
        brand_id: form.brand_id || undefined,
        supplier_id: form.supplier_id || undefined,
        tags: form.tags ? form.tags.split(',').map(t => t.trim()) : [],
        variants: variants.map(v => ({
          ...v,
          price: v.price ? parseFloat(v.price) : undefined,
          cost_price: v.cost_price ? parseFloat(v.cost_price) : undefined,
          stock: parseInt(v.stock) || 0,
        })),
      };
      await api.post('/products', payload);
      router.push('/dashboard/products');
    } catch (err: any) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      }
    } finally {
      setLoading(false);
    }
  };

  const addVariant = () => {
    setVariants([...variants, { sku: '', attributes: { 'Màu sắc': '', 'Kích thước': '' }, price: '', cost_price: '', stock: '0' }]);
  };

  const removeVariant = (i: number) => {
    setVariants(variants.filter((_, idx) => idx !== i));
  };

  const updateVariant = (i: number, field: string, value: string) => {
    const updated = [...variants];
    if (field.startsWith('attr.')) {
      const key = field.replace('attr.', '');
      updated[i] = { ...updated[i], attributes: { ...updated[i].attributes, [key]: value } };
    } else {
      updated[i] = { ...updated[i], [field]: value };
    }
    setVariants(updated);
  };

  const inputClass = 'input-field';
  const labelClass = 'block text-sm font-medium mb-1.5';
  const labelStyle = { color: 'rgba(255,255,255,0.7)' };
  const sectionClass = 'glass-card p-6 space-y-4';

  return (
    <div className="max-w-4xl mx-auto space-y-5">
      <div className="flex items-center gap-4">
        <Link href="/dashboard/products" className="btn-ghost" style={{ padding: '0.5rem' }}>
          <ArrowLeft size={16} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-white">Thêm sản phẩm mới</h1>
          <p className="text-sm" style={{ color: 'rgba(255,255,255,0.45)' }}>Điền thông tin để tạo sản phẩm mới trong hệ thống</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Basic Info */}
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-white">Thông tin cơ bản</h2>
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
          <div>
            <label className={labelClass} style={labelStyle}>Mô tả ngắn</label>
            <input className={inputClass} value={form.short_description} onChange={e => setForm({...form, short_description: e.target.value})} placeholder="Mô tả ngắn gọn..." />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>Mô tả chi tiết</label>
            <textarea
              className={inputClass}
              value={form.description}
              onChange={e => setForm({...form, description: e.target.value})}
              placeholder="Mô tả chi tiết sản phẩm..."
              rows={4}
              style={{ resize: 'vertical' }}
            />
          </div>
        </div>

        {/* Classification */}
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-white">Phân loại</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className={labelClass} style={labelStyle}>Danh mục</label>
              <select className={inputClass} value={form.category_id} onChange={e => setForm({...form, category_id: e.target.value})}>
                <option value="">Chọn danh mục</option>
                {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
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
          <h2 className="text-base font-semibold text-white">Giá cả & Tồn kho</h2>
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

        {/* SEO */}
        <div className={sectionClass}>
          <h2 className="text-base font-semibold text-white">SEO</h2>
          <div>
            <label className={labelClass} style={labelStyle}>SEO Title</label>
            <input className={inputClass} value={form.seo_title} onChange={e => setForm({...form, seo_title: e.target.value})} placeholder="Tiêu đề tối ưu cho công cụ tìm kiếm..." />
          </div>
          <div>
            <label className={labelClass} style={labelStyle}>SEO Description</label>
            <textarea className={inputClass} value={form.seo_description} onChange={e => setForm({...form, seo_description: e.target.value})} placeholder="Mô tả tối ưu cho công cụ tìm kiếm..." rows={3} />
          </div>
        </div>

        {/* Variants */}
        <div className={sectionClass}>
          <div className="flex items-center justify-between">
            <h2 className="text-base font-semibold text-white">Biến thể sản phẩm</h2>
            <button type="button" onClick={addVariant} className="btn-ghost text-xs">
              <Plus size={13} /> Thêm biến thể
            </button>
          </div>
          {variants.length === 0 ? (
            <p className="text-sm text-center py-4" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Không có biến thể – sản phẩm đơn. Nhấn "+ Thêm biến thể" nếu có Size/Màu.
            </p>
          ) : (
            <div className="space-y-4">
              {variants.map((v, i) => (
                <div key={i} className="p-4 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)' }}>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-white">Biến thể #{i + 1}</span>
                    <button type="button" onClick={() => removeVariant(i)} className="btn-ghost text-xs" style={{ color: '#f87171', border: '1px solid rgba(239,68,68,0.2)' }}>
                      <Minus size={12} /> Xóa
                    </button>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div>
                      <label className={labelClass} style={labelStyle}>SKU</label>
                      <input className={inputClass} value={v.sku} onChange={e => updateVariant(i, 'sku', e.target.value)} placeholder="SP-001-RED-M" />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Màu sắc</label>
                      <input className={inputClass} value={v.attributes['Màu sắc']} onChange={e => updateVariant(i, 'attr.Màu sắc', e.target.value)} placeholder="Đỏ, Xanh..." />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Kích thước</label>
                      <input className={inputClass} value={v.attributes['Kích thước']} onChange={e => updateVariant(i, 'attr.Kích thước', e.target.value)} placeholder="S, M, L, XL..." />
                    </div>
                    <div>
                      <label className={labelClass} style={labelStyle}>Tồn kho</label>
                      <input type="number" className={inputClass} value={v.stock} onChange={e => updateVariant(i, 'stock', e.target.value)} min="0" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between glass-card p-4">
          <div className="flex items-center gap-3">
            <label className="text-sm font-medium" style={{ color: 'rgba(255,255,255,0.7)' }}>Trạng thái:</label>
            <select className={inputClass} style={{ width: 'auto' }} value={form.status} onChange={e => setForm({...form, status: e.target.value})}>
              <option value="draft">Nháp</option>
              <option value="active">Đang bán</option>
              <option value="inactive">Ngừng bán</option>
            </select>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/dashboard/products" className="btn-ghost">Hủy</Link>
            <button type="submit" disabled={loading} className="btn-primary">
              {loading ? <><Loader2 size={14} className="animate-spin" /> Đang lưu...</> : <><Save size={14} /> Lưu sản phẩm</>}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
