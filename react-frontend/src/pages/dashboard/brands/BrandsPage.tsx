import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { Plus, Trash2, Edit, Building2, Save, X, Loader2, Upload, ImageIcon } from 'lucide-react';

interface Brand {
  id: number;
  name: string;
  slug: string;
  description?: string;
  logo?: string;
  is_active?: boolean;
}

export default function BrandsPage() {
  const [brands, setBrands] = useState<Brand[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState({ name: '', description: '', logo: '' });
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [editingId, setEditingId] = useState<number | null>(null);
  const [saving, setSaving] = useState(false);
  const [showForm, setShowForm] = useState(false);

  const fetchBrands = async () => {
    setLoading(true);
    const res = await api.get('/brands');
    setBrands(res.data);
    setLoading(false);
  };

  useEffect(() => { fetchBrands(); }, []);

  const handleLogoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const file = e.target.files[0];
    setLogoFile(file);
    setLogoPreview(URL.createObjectURL(file));
  };

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      formData.append('name', form.name);
      if (form.description) formData.append('description', form.description);
      if (form.logo && !logoFile) formData.append('logo', form.logo);
      if (logoFile) formData.append('logo_file', logoFile);

      if (editingId) {
        await api.post(`/brands/${editingId}/update`, formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      } else {
        await api.post('/brands', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }
      handleCancel();
      fetchBrands();
    } catch (err: any) {
      const msg = err.response?.data?.message || err.response?.data?.errors?.name?.[0] || 'Có lỗi xảy ra.';
      alert(msg);
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (brand: Brand) => {
    setForm({ name: brand.name, description: brand.description || '', logo: brand.logo || '' });
    setLogoFile(null);
    setLogoPreview(brand.logo || '');
    setEditingId(brand.id);
    setShowForm(true);
  };

  const handleCancel = () => {
    setForm({ name: '', description: '', logo: '' });
    setLogoFile(null);
    setLogoPreview('');
    setEditingId(null);
    setShowForm(false);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa thương hiệu này?')) return;
    await api.delete(`/brands/${id}`);
    fetchBrands();
  };

  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Thương hiệu</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>Quản lý thương hiệu sản phẩm và logo</p>
        </div>
        <button
          onClick={() => { setEditingId(null); setForm({ name: '', description: '', logo: '' }); setLogoFile(null); setLogoPreview(''); setShowForm(true); }}
          className="btn-primary"
        >
          <Plus size={14} /> Thêm thương hiệu
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSave} className="glass-card p-5 animate-fade-scale max-w-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold text-white text-sm">{editingId ? 'Chỉnh sửa thương hiệu' : 'Thêm thương hiệu mới'}</h3>
            <button type="button" onClick={handleCancel} className="text-white/40 hover:text-white/70 transition-colors cursor-pointer" style={{ background: 'none', border: 'none' }}>
              <X size={16} />
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4">
            {/* Logo upload */}
            <div>
              <label className="block text-xs font-semibold mb-2" style={{ color: 'rgba(255,255,255,0.6)' }}>Logo thương hiệu</label>
              <div className="flex items-center gap-3">
                {logoPreview ? (
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-white/10 bg-white flex-shrink-0">
                    <img src={logoPreview} alt="logo preview" className="w-full h-full object-contain p-1" />
                    <button
                      type="button"
                      onClick={() => { setLogoFile(null); setLogoPreview(''); setForm(f => ({ ...f, logo: '' })); }}
                      className="absolute top-0.5 right-0.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center cursor-pointer"
                      style={{ border: 'none' }}
                    >
                      <X size={9} className="text-white" />
                    </button>
                  </div>
                ) : (
                  <div className="w-16 h-16 rounded-lg border border-dashed border-white/15 bg-white/[0.02] flex items-center justify-center flex-shrink-0">
                    <ImageIcon size={20} className="text-white/20" />
                  </div>
                )}
                <label className="btn-ghost text-xs cursor-pointer">
                  <Upload size={12} />
                  {logoPreview ? 'Đổi logo' : 'Tải logo lên'}
                  <input type="file" accept="image/*" onChange={handleLogoSelect} className="hidden" />
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Tên thương hiệu *</label>
              <input className="input-field" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Nike, Adidas, Coolmate..." required />
            </div>

            <div>
              <label className="block text-xs font-semibold mb-1.5" style={{ color: 'rgba(255,255,255,0.6)' }}>Mô tả</label>
              <textarea className="input-field" rows={2} value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} placeholder="Mô tả ngắn về thương hiệu..." style={{ resize: 'none' }} />
            </div>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <button type="button" onClick={handleCancel} className="btn-ghost text-xs">Hủy</button>
            <button type="submit" disabled={saving} className="btn-primary text-xs">
              {saving ? <Loader2 size={12} className="animate-spin" /> : <Save size={12} />}
              {editingId ? 'Cập nhật' : 'Thêm mới'}
            </button>
          </div>
        </form>
      )}

      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex justify-center py-10"><div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" /></div>
        ) : brands.length === 0 ? (
          <div className="text-center py-14">
            <Building2 size={32} className="mx-auto mb-3 text-white/15" />
            <p className="text-sm text-white/30">Chưa có thương hiệu nào. Nhấn "+ Thêm thương hiệu" để bắt đầu.</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Thương hiệu</th>
                <th>Slug</th>
                <th>Mô tả</th>
                <th style={{ width: '90px', textAlign: 'right' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {brands.map(b => (
                <tr key={b.id}>
                  <td>
                    <div className="flex items-center gap-3">
                      {b.logo ? (
                        <div className="w-9 h-9 rounded-lg overflow-hidden bg-white border border-white/10 flex-shrink-0">
                          <img src={b.logo} alt={b.name} className="w-full h-full object-contain p-1" />
                        </div>
                      ) : (
                        <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-indigo-500/10 border border-indigo-500/20 flex-shrink-0">
                          <Building2 size={14} className="text-indigo-400" />
                        </div>
                      )}
                      <span className="font-medium text-white">{b.name}</span>
                    </div>
                  </td>
                  <td className="font-mono text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>{b.slug}</td>
                  <td className="text-xs" style={{ color: 'rgba(255,255,255,0.5)', maxWidth: '260px' }}>
                    <span className="line-clamp-1">{b.description || '—'}</span>
                  </td>
                  <td>
                    <div className="flex items-center justify-end gap-2.5">
                      <button onClick={() => handleEdit(b)} className="text-indigo-400 hover:text-indigo-300 transition-colors cursor-pointer" style={{ background: 'none', border: 'none' }} title="Chỉnh sửa">
                        <Edit size={14} />
                      </button>
                      <button onClick={() => handleDelete(b.id)} className="text-red-400/70 hover:text-red-400 transition-colors cursor-pointer" style={{ background: 'none', border: 'none' }} title="Xóa">
                        <Trash2 size={14} />
                      </button>
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
