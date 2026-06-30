'use client';

import { useEffect, useState, useRef } from 'react';
import api from '@/lib/api';
import { Asset, PaginatedResponse, Product } from '@/types';
import { formatFileSize, formatDate } from '@/lib/utils';
import {
  Upload, Zap, Search, Image as ImageIcon, Video, Trash2,
  FolderInput, RefreshCw, Link2, AlertCircle, Loader2, CheckCircle2,
  X, Eye, Info, Copy, Check, Tags, Plus
} from 'lucide-react';

export default function MediaPage() {
  const [assets, setAssets] = useState<PaginatedResponse<Asset> | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);
  const [autoMapping, setAutoMapping] = useState(false);
  const [mapResult, setMapResult] = useState('');
  const [filter, setFilter] = useState<{ type: string; unmapped: boolean; search: string }>({ type: '', unmapped: false, search: '' });
  const [page, setPage] = useState(1);
  const [dragOver, setDragOver] = useState(false);

  // Preview Modal
  const [previewAsset, setPreviewAsset] = useState<Asset | null>(null);

  // Info Panel / Drawer
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);
  const [infoAsset, setInfoAsset] = useState<Asset & { products?: Product[] } | null>(null);
  const [infoLoading, setInfoLoading] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [copiedId, setCopiedId] = useState<number | null>(null);

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
    setUploadProgress(10); // Initial progress
    const formData = new FormData();
    files.forEach(f => formData.append('files[]', f));
    try {
      setUploadProgress(40);
      await api.post('/media/upload', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setUploadProgress(80);
      fetchAssets();
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(null), 800);
    } catch (err) {
      setUploadProgress(null);
      alert('Tải lên thất bại. Vui lòng kiểm tra định dạng hoặc dung lượng file.');
    } finally {
      setUploading(false);
    }
  };

  const handleZipUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadProgress(25);
    const formData = new FormData();
    formData.append('zip', file);
    try {
      setUploadProgress(60);
      await api.post('/media/upload-zip', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setUploadProgress(90);
      fetchAssets();
      setUploadProgress(100);
      setTimeout(() => setUploadProgress(null), 800);
    } catch (err) {
      setUploadProgress(null);
      alert('Giải nén ZIP thất bại.');
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

  const handleDelete = async (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm('Xóa tài nguyên này khỏi hệ thống? Các liên kết sản phẩm sẽ bị gỡ.')) return;
    await api.delete(`/media/${id}`);
    if (selectedAssetId === id) setSelectedAssetId(null);
    fetchAssets();
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileUpload(files);
  };

  // Drawer Fetching
  const openInfoPanel = async (asset: Asset) => {
    setSelectedAssetId(asset.id);
    setInfoLoading(true);
    try {
      // In a real app, fetch details including linked products
      const res = await api.get(`/media/${asset.id}`);
      setInfoAsset(res.data);
    } catch (err) {
      setInfoAsset(asset);
    } finally {
      setInfoLoading(false);
    }
  };

  const handleCopyLink = (asset: Asset, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    navigator.clipboard.writeText(asset.url);
    setCopiedId(asset.id);
    setTimeout(() => setCopiedId(null), 1500);
  };

  const handleAddTag = async () => {
    if (!newTag.trim() || !infoAsset) return;
    const currentTags = infoAsset.tags || [];
    if (currentTags.includes(newTag.trim())) return;
    const updatedTags = [...currentTags, newTag.trim()];
    
    // Update locally first
    setInfoAsset(prev => prev ? { ...prev, tags: updatedTags } : null);
    setNewTag('');

    try {
      await api.put(`/media/${infoAsset.id}`, { tags: updatedTags });
      fetchAssets();
    } catch (err) {
      console.error('Failed to update tags on server');
    }
  };

  const handleRemoveTag = async (tagToRemove: string) => {
    if (!infoAsset) return;
    const updatedTags = (infoAsset.tags || []).filter(t => t !== tagToRemove);
    
    setInfoAsset(prev => prev ? { ...prev, tags: updatedTags } : null);

    try {
      await api.put(`/media/${infoAsset.id}`, { tags: updatedTags });
      fetchAssets();
    } catch (err) {
      console.error('Failed to update tags on server');
    }
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Media Center</h1>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Quản lý tệp đa phương tiện sản phẩm, tự động liên kết bằng SKU.
          </p>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button onClick={() => zipRef.current?.click()} className="btn-ghost text-xs cursor-pointer" disabled={uploading}>
            <FolderInput size={13} /> Upload ZIP
          </button>
          <input ref={zipRef} type="file" accept=".zip" className="hidden" onChange={handleZipUpload} />
          <button onClick={handleAutoMap} disabled={autoMapping} className="btn-ghost text-xs cursor-pointer">
            {autoMapping ? <Loader2 size={13} className="animate-spin" /> : <Zap size={13} />}
            Auto-Map SKU
          </button>
          <button onClick={() => fileRef.current?.click()} className="btn-primary text-xs cursor-pointer" disabled={uploading}>
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <Upload size={13} />}
            Upload file
          </button>
          <input ref={fileRef} type="file" multiple accept="image/*,video/mp4,video/mov,video/webm" className="hidden"
            onChange={e => handleFileUpload(Array.from(e.target.files || []))} />
        </div>
      </div>

      {/* Auto-map result alert */}
      {mapResult && (
        <div className="flex items-center gap-2.5 p-3 rounded-lg text-xs" style={{ background: 'rgba(16,185,129,0.08)', border: '1px solid rgba(16,185,129,0.15)', color: '#34d399' }}>
          <CheckCircle2 size={14} /> {mapResult}
        </div>
      )}

      {/* Upload Progress Bar */}
      {uploadProgress !== null && (
        <div className="glass-card p-4 space-y-2 animate-fade-in">
          <div className="flex justify-between text-xs font-medium text-white/70">
            <span className="flex items-center gap-1.5"><Loader2 size={12} className="animate-spin" /> Đang tải file lên hệ thống...</span>
            <span>{uploadProgress}%</span>
          </div>
          <div className="w-full h-1 bg-white/[0.04] rounded-full overflow-hidden">
            <div className="h-full bg-indigo-500 transition-all duration-300" style={{ width: `${uploadProgress}%` }} />
          </div>
        </div>
      )}

      {/* Drop zone */}
      <div
        onDrop={onDrop}
        onDragOver={e => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onClick={() => fileRef.current?.click()}
        className="glass-card p-8 text-center cursor-pointer transition-all border-dashed hover:border-white/25"
        style={{
          borderWidth: '2px',
          borderColor: dragOver ? '#6366f1' : 'rgba(255,255,255,0.06)',
          background: dragOver ? 'rgba(99,102,241,0.04)' : undefined,
        }}
      >
        <Upload size={24} className="mx-auto mb-2 opacity-40" style={{ color: dragOver ? '#818cf8' : undefined }} />
        <p className="text-xs font-semibold" style={{ color: dragOver ? '#818cf8' : 'rgba(255,255,255,0.5)' }}>
          {dragOver ? 'Thả file vào đây' : 'Kéo & thả ảnh/video hoặc nhấp để chọn'}
        </p>
        <p className="text-[10px] mt-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
          Định dạng: JPG, PNG, WEBP, MP4, MOV, WEBM (Tối đa 100MB)
        </p>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-3 items-center">
        <div className="relative flex-1 min-w-[180px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input placeholder="Tìm theo tên file..." value={filter.search} onChange={e => setFilter(f => ({ ...f, search: e.target.value }))}
            className="input-field text-xs" style={{ paddingLeft: '2.25rem' }} />
        </div>
        <select className="input-field text-xs" style={{ width: 'auto', minWidth: '130px' }} value={filter.type} onChange={e => setFilter(f => ({ ...f, type: e.target.value }))}>
          <option value="">Tất cả loại</option>
          <option value="image">Hình ảnh</option>
          <option value="video">Video</option>
        </select>
        <label className="flex items-center gap-2 text-xs cursor-pointer text-white/60 hover:text-white select-none">
          <input type="checkbox" checked={filter.unmapped} onChange={e => setFilter(f => ({ ...f, unmapped: e.target.checked }))} className="rounded border-white/10 text-indigo-500 bg-transparent" />
          Chỉ hiện chưa liên kết
        </label>
        <button onClick={fetchAssets} className="btn-ghost text-xs cursor-pointer"><RefreshCw size={13} /></button>
      </div>

      {/* Media Grid */}
      {loading ? (
        <div className="flex justify-center py-16"><div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" /></div>
      ) : !assets?.data?.length ? (
        <div className="text-center py-16 glass-card" style={{ color: 'rgba(255,255,255,0.35)' }}>
          <ImageIcon size={36} className="mx-auto mb-3 opacity-30" />
          <p className="font-medium text-white/60 text-sm">Không tìm thấy phương tiện nào</p>
          <p className="text-xs mt-1">Hãy tải ảnh hoặc video sản phẩm lên kho.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-3">
          {assets.data.map((asset) => (
            <div 
              key={asset.id} 
              onClick={() => openInfoPanel(asset)}
              className="group relative glass-card overflow-hidden aspect-square cursor-pointer hover:border-white/15 transition-all"
            >
              {asset.type === 'image' ? (
                <img src={asset.url} alt={asset.original_name} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              ) : (
                <div className="w-full h-full flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.02)' }}>
                  <Video size={24} style={{ color: 'rgba(255,255,255,0.35)' }} />
                </div>
              )}

              {/* Badges */}
              <div className="absolute top-2 left-2 flex gap-1">
                <span className="w-4 h-4 rounded bg-black/40 backdrop-blur-md flex items-center justify-center">
                  {asset.type === 'image' ? (
                    <ImageIcon size={9} className="text-white/70" />
                  ) : (
                    <Video size={9} className="text-white/70" />
                  )}
                </span>
                {(!asset.tags || asset.tags.length === 0) && (
                  <span className="text-[8px] px-1 py-0.2 rounded bg-amber-500/10 text-amber-400 border border-amber-500/20 backdrop-blur-md font-medium">No Tags</span>
                )}
              </div>

              {/* Hover Overlay */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-200 flex flex-col justify-between p-2.5" style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.4) 60%, transparent 100%)' }}>
                <div className="flex justify-end gap-1.5">
                  <button 
                    onClick={(e) => handleCopyLink(asset, e)}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all bg-black/40 border-none cursor-pointer"
                    title="Copy Link URL"
                  >
                    {copiedId === asset.id ? <Check size={10} className="text-emerald-400" /> : <Link2 size={10} />}
                  </button>
                  <button 
                    onClick={(e) => { e.stopPropagation(); setPreviewAsset(asset); }}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-all bg-black/40 border-none cursor-pointer"
                    title="Xem chi tiết"
                  >
                    <Eye size={10} />
                  </button>
                  <button 
                    onClick={(e) => handleDelete(asset.id, e)}
                    className="w-6 h-6 rounded-md flex items-center justify-center text-white/50 hover:text-red-400 hover:bg-red-500/20 transition-all bg-black/40 border-none cursor-pointer"
                    title="Xóa"
                  >
                    <Trash2 size={10} />
                  </button>
                </div>
                <div>
                  <p className="text-[10px] text-white truncate font-medium">{asset.original_name}</p>
                  <p className="text-[9px] mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>{formatFileSize(asset.size)}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Pagination */}
      {assets && assets.last_page > 1 && (
        <div className="flex justify-center items-center gap-1 mt-4">
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-ghost text-xs" style={{ padding: '0.4rem 0.6rem' }}>
            <ChevronLeft size={13} />
          </button>
          <span className="text-xs px-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{page} / {assets.last_page}</span>
          <button onClick={() => setPage(p => Math.min(assets.last_page, p + 1))} disabled={page === assets.last_page} className="btn-ghost text-xs" style={{ padding: '0.4rem 0.6rem' }}>
            <ChevronRight size={13} />
          </button>
        </div>
      )}

      {/* Preview Modal */}
      {previewAsset && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/90 backdrop-blur-xs" onClick={() => setPreviewAsset(null)} />
          <div className="relative max-w-4xl w-full max-h-[85vh] flex flex-col items-center z-50 animate-fade-in">
            <button 
              onClick={() => setPreviewAsset(null)} 
              className="absolute -top-10 right-0 w-8 h-8 rounded-lg flex items-center justify-center bg-white/5 hover:bg-white/15 text-white border-none cursor-pointer"
            >
              <X size={16} />
            </button>
            <div className="w-full bg-[#09090f]/40 border border-white/[0.05] rounded-xl overflow-hidden p-2 flex items-center justify-center" style={{ minHeight: '300px' }}>
              {previewAsset.type === 'image' ? (
                <img src={previewAsset.url} alt={previewAsset.original_name} className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl" />
              ) : (
                <video src={previewAsset.url} controls autoPlay className="max-w-full max-h-[70vh] rounded-lg shadow-2xl" />
              )}
            </div>
            <div className="text-center mt-3">
              <p className="text-xs font-semibold text-white">{previewAsset.original_name}</p>
              <p className="text-[10px] text-white/40 mt-1">{formatFileSize(previewAsset.size)} · {formatDate(previewAsset.created_at)}</p>
            </div>
          </div>
        </div>
      )}

      {/* Asset Information Drawer */}
      {selectedAssetId && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setSelectedAssetId(null)} />

          <div className="relative bg-[#0c0c14] border-l border-white/[0.06] w-full max-w-sm h-full shadow-2xl flex flex-col z-50 animate-fade-in">
            {/* Header */}
            <div className="px-5 py-4 border-b border-white/[0.04] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Info size={13} className="text-indigo-400" />
                <h3 className="text-xs uppercase font-bold text-white tracking-wider">Thông tin tệp tin</h3>
              </div>
              <button 
                onClick={() => setSelectedAssetId(null)} 
                className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/[0.04] text-white/45 hover:text-white hover:bg-white/[0.03] transition-all bg-transparent cursor-pointer"
              >
                <X size={14} />
              </button>
            </div>

            {/* Body */}
            <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {infoLoading ? (
                <div className="flex items-center justify-center h-48">
                  <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                </div>
              ) : infoAsset ? (
                <>
                  {/* Thumbnail */}
                  <div className="aspect-square w-full rounded-lg overflow-hidden border border-white/[0.05] relative group" style={{ background: 'rgba(255,255,255,0.01)' }}>
                    {infoAsset.type === 'image' ? (
                      <img src={infoAsset.url} alt={infoAsset.original_name} className="w-full h-full object-contain p-2" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center">
                        <Video size={48} className="text-white/20" />
                      </div>
                    )}
                    <button 
                      onClick={() => setPreviewAsset(infoAsset)}
                      className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/60 hover:bg-black/80 text-[10px] text-white flex items-center gap-1 border-none cursor-pointer"
                    >
                      <Eye size={10} /> Xem lớn
                    </button>
                  </div>

                  {/* Tags Manager */}
                  <div className="space-y-3">
                    <div className="flex items-center gap-1.5 text-[10px] uppercase font-bold text-white/30 tracking-wider">
                      <Tags size={11} /> Thẻ từ khóa (Tags)
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {(infoAsset.tags || []).map(t => (
                        <span key={t} className="inline-flex items-center gap-1 text-[10px] px-2 py-0.5 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                          {t}
                          <button onClick={() => handleRemoveTag(t)} className="text-indigo-400 hover:text-indigo-200 bg-transparent border-none cursor-pointer">
                            <X size={9} />
                          </button>
                        </span>
                      ))}
                      <div className="flex items-center gap-1 max-w-[120px]">
                        <input 
                          type="text" 
                          placeholder="Tag mới..." 
                          value={newTag} 
                          onChange={e => setNewTag(e.target.value)}
                          onKeyDown={e => e.key === 'Enter' && handleAddTag()}
                          className="input-field text-[10px] py-0.5 px-1.5"
                        />
                        <button onClick={handleAddTag} className="w-5 h-5 rounded bg-indigo-600 hover:bg-indigo-500 flex items-center justify-center text-white border-none cursor-pointer">
                          <Plus size={10} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Metadata List */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Thông số kỹ thuật</h4>
                    <div className="border border-white/[0.04] rounded-lg overflow-hidden divide-y divide-white/[0.03] text-xs">
                      <div className="flex justify-between p-2.5">
                        <span className="text-white/40">Tên gốc:</span>
                        <span className="text-white font-medium max-w-[180px] truncate" title={infoAsset.original_name}>{infoAsset.original_name}</span>
                      </div>
                      <div className="flex justify-between p-2.5">
                        <span className="text-white/40">Kích thước file:</span>
                        <span className="text-white font-medium">{formatFileSize(infoAsset.size)}</span>
                      </div>
                      <div className="flex justify-between p-2.5">
                        <span className="text-white/40">Định dạng:</span>
                        <span className="text-white font-medium font-mono text-[10px]">{infoAsset.mime_type}</span>
                      </div>
                      <div className="flex justify-between p-2.5">
                        <span className="text-white/40">Lưu trữ:</span>
                        <span className="text-white font-medium capitalize">{infoAsset.disk}</span>
                      </div>
                      <div className="flex justify-between p-2.5">
                        <span className="text-white/40">Đường dẫn tương đối:</span>
                        <span className="text-white font-medium max-w-[160px] truncate font-mono text-[10px]" title={infoAsset.path}>{infoAsset.path}</span>
                      </div>
                      <div className="flex justify-between p-2.5">
                        <span className="text-white/40">Ngày tải lên:</span>
                        <span className="text-white font-medium">{formatDate(infoAsset.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Linked Products */}
                  <div className="space-y-3">
                    <h4 className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Sản phẩm liên kết</h4>
                    {infoAsset.products && infoAsset.products.length > 0 ? (
                      <div className="space-y-1.5">
                        {infoAsset.products.map(p => (
                          <Link 
                            key={p.id} 
                            href={`/dashboard/products`}
                            className="flex items-center justify-between p-2 rounded-lg border border-white/[0.03] hover:bg-white/[0.02] hover:border-white/[0.06] transition-all text-xs"
                          >
                            <span className="text-white font-medium truncate max-w-[180px]">{p.name}</span>
                            <span className="font-mono text-[9px] text-indigo-300">{p.sku}</span>
                          </Link>
                        ))}
                      </div>
                    ) : (
                      <div className="p-3 rounded-lg border border-dashed border-white/10 text-center">
                        <AlertCircle size={14} className="mx-auto text-amber-400 opacity-60 mb-1" />
                        <p className="text-[10px] text-white/35">Chưa được liên kết với sản phẩm nào.</p>
                      </div>
                    )}
                  </div>
                </>
              ) : null}
            </div>

            {/* Footer */}
            {infoAsset && (
              <div className="p-4 border-t border-white/[0.04] bg-white/[0.01] flex items-center gap-2">
                <button 
                  onClick={() => handleCopyLink(infoAsset)}
                  className="btn-ghost text-xs flex-1 justify-center py-2 cursor-pointer border border-white/[0.06] bg-transparent text-white/70"
                >
                  {copiedId === infoAsset.id ? <><CheckCircle2 size={13} className="text-emerald-400" /> Đã copy</> : <><Copy size={13} /> Sao chép URL</>}
                </button>
                <button 
                  onClick={() => handleDelete(infoAsset.id)}
                  className="btn-ghost text-xs py-2 px-3 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/20 cursor-pointer border border-white/[0.06] text-white/50 bg-transparent"
                  title="Xóa tệp tin"
                >
                  <Trash2 size={13} />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
