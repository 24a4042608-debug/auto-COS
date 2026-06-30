'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Supplier } from '@/types';
import { Plus, Trash2, Edit, Truck, Save, X, Loader2 } from 'lucide-react';

export default function SuppliersPage() {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', code: '', email: '', phone: '', contact_person: '' });

  const fetchSuppliers = async () => {
    setLoading(true);
    const res = await api.get('/suppliers');
    setSuppliers(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchSuppliers(); }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      if (editingId) {
        await api.put(`/suppliers/${editingId}`, form);
      } else {
        await api.post('/suppliers', form);
      }
      setForm({ name: '', code: '', email: '', phone: '', contact_person: '' });
      setEditingId(null);
      setShowForm(false);
      fetchSuppliers();
    } catch (err: any) {
      alert(err.response?.data?.message || 'Có lỗi xảy ra.');
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (supplier: Supplier) => {
    setForm({
      name: supplier.name,
      code: supplier.code || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      contact_person: supplier.contact_person || '',
    });
    setEditingId(supplier.id);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa nhà cung cấp này?')) return;
    await api.delete(`/suppliers/${id}`);
    fetchSuppliers();
  };

  const handleCancel = () => {
    setForm({ name: '', code: '', email: '', phone: '', contact_person: '' });
    setEditingId(null);
    setShowForm(false);
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Nhà cung cấp</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Quản lý thông tin nhà cung cấp hàng hóa</p>
        </div>
        <button onClick={() => { setEditingId(null); setForm({ name: '', code: '', email: '', phone: '', contact_person: '' }); setShowForm(true); }} className="btn-primary">
          <Plus size={14} /> Thêm NCC
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="glass-card p-5 space-y-4 max-w-2xl">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold text-white">{editingId ? 'Chỉnh sửa nhà cung cấp' : 'Thêm nhà cung cấp mới'}</h3>
            <button type="button" onClick={handleCancel} style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={16} /></button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Tên NCC *</label>
              <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Mã NCC</label>
              <input className="input-field" value={form.code} onChange={e => setForm({ ...form, code: e.target.value })} placeholder="NCC-001" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Email</label>
              <input type="email" className="input-field" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Điện thoại</label>
              <input className="input-field" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1.5" style={{ color: 'rgba(255,255,255,0.7)' }}>Người liên hệ</label>
              <input className="input-field" value={form.contact_person} onChange={e => setForm({ ...form, contact_person: e.target.value })} />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={handleCancel} className="btn-ghost">Hủy</button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? <Loader2 size={13} className="animate-spin" /> : <Save size={13} />} Lưu
            </button>
          </div>
        </form>
      )}

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-10"><div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" /></div>
        ) : suppliers.length === 0 ? (
          <p className="text-center py-10 text-sm" style={{ color: 'rgba(255,255,255,0.35)' }}>Chưa có nhà cung cấp nào.</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Tên nhà cung cấp</th>
                <th>Mã</th>
                <th>Người liên hệ</th>
                <th>Email / SĐT</th>
                <th style={{ width: '100px' }}></th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map(s => (
                <tr key={s.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 rounded-lg flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20">
                        <Truck size={14} className="text-indigo-400" />
                      </div>
                      <span className="font-medium text-white">{s.name}</span>
                    </div>
                  </td>
                  <td className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>{s.code || '—'}</td>
                  <td className="text-xs text-white/70">{s.contact_person || '—'}</td>
                  <td className="text-xs text-white/50">
                    <div>{s.email || '—'}</div>
                    <div className="text-[10px] text-white/30">{s.phone}</div>
                  </td>
                  <td>
                    <div className="flex items-center gap-3">
                      <button onClick={() => handleEdit(s)} style={{ color: '#818cf8', background: 'none', border: 'none', cursor: 'pointer' }} title="Chỉnh sửa"><Edit size={14} /></button>
                      <button onClick={() => handleDelete(s.id)} style={{ color: '#f87171', background: 'none', border: 'none', cursor: 'pointer' }} title="Xóa"><Trash2 size={14} /></button>
                    </div>
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
