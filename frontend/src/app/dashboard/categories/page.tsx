'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Category } from '@/types';
import { Plus, Edit, Trash2, Tag, Loader2, Save, X } from 'lucide-react';

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', parent_id: '' });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    const res = await api.get('/categories');
    setCategories(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchCategories(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await api.post('/categories', { name: form.name, parent_id: form.parent_id || undefined });
    setForm({ name: '', parent_id: '' });
    setShowForm(false);
    fetchCategories();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa danh mục này?')) return;
    await api.delete(`/categories/${id}`);
    fetchCategories();
  };

  const renderCategory = (cat: Category, depth = 0) => (
    <div key={cat.id}>
      <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-colors group">
        <div className="w-5 h-5 flex items-center justify-center">
          {depth > 0 ? <span style={{ color: 'rgba(255,255,255,0.2)' }}>└</span> : <Tag size={14} style={{ color: '#6366f1' }} />}
        </div>
        <span className="flex-1 text-sm text-white" style={{ paddingLeft: depth * 12 }}>{cat.name}</span>
        <button onClick={() => handleDelete(cat.id)} className="opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }}>
          <Trash2 size={13} />
        </button>
      </div>
      {cat.children?.map(child => renderCategory(child, depth + 1))}
    </div>
  );

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Danh mục</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Quản lý cây danh mục sản phẩm</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary"><Plus size={14} /> Thêm danh mục</button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Thêm danh mục mới</h3>
            <button type="button" onClick={() => setShowForm(false)} style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Tên danh mục *</label>
            <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Điện tử, Thời trang..." required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Danh mục cha (tùy chọn)</label>
            <select className="input-field" value={form.parent_id} onChange={e => setForm({ ...form, parent_id: e.target.value })}>
              <option value="">— Danh mục gốc —</option>
              {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Hủy</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />} Lưu
            </button>
          </div>
        </form>
      )}

      <div className="glass-card p-4">
        {loading ? (
          <div className="flex justify-center py-8"><div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" /></div>
        ) : categories.length === 0 ? (
          <p className="text-center py-8 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Chưa có danh mục nào.</p>
        ) : (
          <div className="space-y-0.5">{categories.map(c => renderCategory(c))}</div>
        )}
      </div>
    </div>
  );
}
