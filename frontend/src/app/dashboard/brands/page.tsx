'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Brand } from '@/types';
import { Plus, Trash2, Building2, Save, X, Loader2 } from 'lucide-react';

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '' });
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);
    const res = await api.get('/brands');
    setBrands(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    await api.post('/brands', form);
    setForm({ name: '', description: '' });
    setShowForm(false);
    fetchBrands();
    setSaving(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa thương hiệu này?')) return;
    await api.delete(`/brands/${id}`);
    fetchBrands();
  };

  return (
    <div className="space-y-5 max-w-2xl">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Thương hiệu</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Quản lý danh sách thương hiệu</p>
        </div>
        <button onClick={() => setShowForm(true)} className="btn-primary"><Plus size={14} /> Thêm thương hiệu</button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="glass-card p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">Thêm thương hiệu</h3>
            <button type="button" onClick={() => setShowForm(false)} style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Tên thương hiệu *</label>
            <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nike, Adidas..." required />
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setShowForm(false)} className="btn-ghost">Hủy</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />} Lưu
            </button>
          </div>
        </form>
      )}

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-10"><div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" /></div>
        ) : brands.length === 0 ? (
          <p className="text-center py-10 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Chưa có thương hiệu nào.</p>
        ) : (
          <table className="data-table">
            <thead><tr><th>Thương hiệu</th><th>Slug</th><th style={{ width: '60px' }}></th></tr></thead>
            <tbody>
              {brands.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'rgba(99,102,241,0.15)' }}>
                        <Building2 size={14} style={{ color: '#818cf8' }} />
                      </div>
                      <span className="font-medium text-white">{b.name}</span>
                    </div>
                  </td>
                  <td className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{b.slug}</td>
                  <td>
                    <button onClick={() => handleDelete(b.id)} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }}><Trash2 size={14} /></button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
