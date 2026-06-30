'use client';

import { useEffect, useState, useRef } from 'react';
import api from '@/lib/api';
import { Asset, PaginatedResponse } from '@/types';
import { formatFileSize, formatDate } from '@/lib/utils';
import {
  Upload, Zap, Search, Image as ImageIcon, Video, Trash2,
  FolderInput, RefreshCw, Link2, AlertCircle, Loader2, CheckCircle2,
} from 'lucide-react';

export default function MediaPage() {
  const [assets, setAssets] = useState<PaginatedResponse<Asset> | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [autoMapping, setAutoMapping] = useState(false);
  const [mapResult, setMapResult] = useState('');
  const [filter, setFilter] = useState<{ type: string; unmapped: boolean; search: string }>({ type: '', unmapped: false, search: '' });
  const [page, setPage] = useState(1);
  const [dragOver, setDragOver] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const zipRef = useRef<HTMLInputElement>(null);

  const fetchAssets = async () => {
    setLoading(true);
    try {
      const res = await api.get('/media', {
        params: {
          type: filter.type || undefined,
          unmapped: filter.unmapped ? 1 : undefined,
          search: filter.search || undefined,
          page,
        },
      });
      setAssets(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchAssets(); }, [filter, page]);

  const handleFileUpload = async (files: File[]) => {
    if (!files.length) return;
    setUploading(true);
    const formData = new FormData();
    files.forEach(f => formData.append('files[]', f));
    try {
      await api.post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchAssets();
    } finally {
      setUploading(false);
    }
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('zip', file);
    try {
      await api.post('/media/upload-zip', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      fetchAssets();
    } finally {
      setUploading(false);
      if (zipRef.current) zipRef.current.value = '';
    }
  };

  const handleAutoMap = async () => {
    setAutoMapping(true);
    setMapResult('');
    try {
      const res = await api.post('/media/auto-map');
      setMapResult(res.data.message);
      fetchAssets();
    } finally {
      setAutoMapping(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Xóa tài nguyên này?')) return;
    await api.delete(`/media/${id}`);
    fetchAssets();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-white">Media Center</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>Quản lý hình ảnh và video sản phẩm</p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => zipRef.current?.click()} className="btn-ghost" disabled={uploading}>
            <FolderInput size={14} /> Upload ZIP
          </button>
          <input ref={zipRef} type="file" accept=".zip" className="hidden" onChange={handleZipUpload} />
          <button onClick={handleAutoMap} disabled={autoMapping} className="btn-ghost">
            {autoMapping ? <Loader2 size={14} className="animate-spin" /> : <Zap size={14} />}
            Auto-Map SKU
          </button>
          <button onClick={() => fileRef.current?.click()} className="btn-primary" disabled={uploading}>
            {uploading ? <Loader2 size={14} className="animate-spin" /> : <Upload size={14} />}
            Upload ảnh/video
          </button>
          <input ref={fileRef} type="file" multiple accept="image/*,video/mp4,video/mov,video/webm" className="hidden"
            onChange={e => handleFileUpload(Array.from(e.target.files || []))} />
        </div>
      </div>

      {/* Auto-map result */}
      {mapResult && (
        <div className="flex items-center gap-2 p-3 rounded-lg text-sm" style={{ background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)', color: '#34d399' }}>
          <CheckCircle2 size={16} /> {mapResult}
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileRef.current?.click()}
        className="glass-card p-8 text-center cursor-pointer transition-all"
        style={{
          border: dragOver ? '2px dashed #6366f1' : '2px dashed rgba(255,255,255,0.1)',
          background: dragOver ? 'rgba(99,102,241,0.08)' : undefined,
        }}
      >
        <Upload size={28} className="mx-auto mb-2 opacity-40" style={{ color: dragOver ? '#818cf8' : undefined }} />
        <p className="text-sm font-medium" style={{ color: dragOver ? '#818cf8' : 'rgba(255,255,255,0.5)' }}>
          {dragOver ? 'Thả file vào đây' : 'Kéo & thả file ảnh/video hoặc nhấp để chọn'}
        </p>
        <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Hỗ trợ: JPG, PNG, WEBP, MP4, MOV, WEBM (tối đa 100MB/file)
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-40">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input placeholder="Tìm theo tên file..." value={filter.search} onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
            className="input-field" style={{ paddingLeft: '2.25rem' }} />
        </div>
        <select className="input-field" style={{ width: 'auto' }} value={filter.type} onChange={e => setFilter(f => ({ ...f, type: e.target.value }))}>
          <option value="">Tất cả loại</option>
          <option value="image">Hình ảnh</option>
          <option value="video">Video</option>
        </select>
        <label className="flex items-center gap-2 text-sm cursor-pointer" style={{ color: 'rgba(255,255,255,0.6)' }}>
          <input type="checkbox" checked={filter.unmapped} onChange={e => setFilter(f => ({ ...f, unmapped: e.target.checked }))} />
          Chỉ hiện chưa liên kết
        </label>
        <button onClick={fetchAssets} className="btn-ghost"><RefreshCw size={14} /></button>
      </div>

      {/* Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" /></div>
      ) : !assets?.data?.length ? (
        <div className="text-center py-16 glass-card" style={{ color: 'rgba(255,255,255,0.35)' }}>
          <ImageIcon size={40} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium text-white/60">Chưa có media nào</p>
          <p className="text-sm mt-1">Upload hình ảnh hoặc video sản phẩm để bắt đầu.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
          {assets.data.map((asset) => (
            <div key={asset.id} className="group relative glass-card overflow-hidden" style={{ aspectRatio: '1', cursor: 'pointer' }}>
              {asset.type === 'image' ? (
                <img src={asset.url} alt={asset.original_name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)' }}>
                  <Video size={28} style={{ color: 'rgba(255,255,255,0.4)' }} />
                </div>
              )}
              {/* Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-2" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)' }}>
                <button onClick={() => handleDelete(asset.id)} className="self-end w-7 h-7 rounded-lg flex items-center justify-center" style={{ background: 'rgba(239,68,68,0.7)', color: 'white', border: 'none', cursor: 'pointer' }}>
                  <Trash2 size={12} />
                </button>
                <div>
                  <p className="text-xs text-white truncate font-medium">{asset.original_name}</p>
                  <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.5)' }}>{formatFileSize(asset.size)}</p>
                </div>
              </div>
              {/* Type badge */}
              <div className="absolute top-1.5 left-1.5">
                {asset.type === 'image' ? (
                  <ImageIcon size={10} className="text-white opacity-70" />
                ) : (
                  <Video size={10} className="text-white opacity-70" />
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {assets && assets.last_page > 1 && (
        <div className="flex justify-center gap-2">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-ghost">Trước</button>
          <span className="px-4 py-2 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>{page} / {assets.last_page}</span>
          <button onClick={() => setPage(p => Math.min(assets.last_page, p + 1))} disabled={page === assets.last_page} className="btn-ghost">Tiếp</button>
        </div>
      )}
    </div>
  );
}
