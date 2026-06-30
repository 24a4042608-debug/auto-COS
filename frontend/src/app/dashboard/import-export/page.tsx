'use client';

import { useEffect, useRef, useState } from 'react';
import api from '@/lib/api';
import { Import, PaginatedResponse } from '@/types';
import { formatDate, importStatusConfig } from '@/lib/utils';
import { Upload, Download, FileSpreadsheet, Loader2, CheckCircle2, AlertCircle, RefreshCw, X } from 'lucide-react';

export default function ImportExportPage() {
  const [imports, setImports] = useState<PaginatedResponse<Import> | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [exporting, setExporting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const fetchImports = async () => {
    setLoading(true);
    try {
      const res = await api.get('/imports');
      setImports(res.data);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchImports(); }, []);

  const handleImport = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await api.post('/imports', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setSelectedFile(null);
      fetchImports();
    } finally {
      setUploading(false);
    }
  };

  const handleExport = async () => {
    setExporting(true);
    try {
      const res = await api.get('/exports/products', { responseType: 'blob' });
      const url = URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = `products_${Date.now()}.xlsx`;
      a.click();
      URL.revokeObjectURL(url);
    } finally {
      setExporting(false);
    }
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv'))) {
      setSelectedFile(file);
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-white">Import / Export</h1>
        <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Nhập liệu hàng loạt từ Excel/CSV hoặc xuất danh sách sản phẩm
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {/* Import card */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Upload size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Import sản phẩm</h2>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Hỗ trợ: .xlsx, .xls, .csv</p>
            </div>
          </div>

          {/* Drop zone */}
          <div
            onDrop={onDrop}
            onDragOver={e => { e.preventDefault(); setDragOver(true); }}
            onDragLeave={() => setDragOver(false)}
            onClick={() => !selectedFile && fileRef.current?.click()}
            className="p-6 rounded-xl text-center transition-all cursor-pointer"
            style={{
              border: dragOver ? '2px dashed #6366f1' : '2px dashed rgba(255,255,255,0.1)',
              background: dragOver ? 'rgba(99,102,241,0.06)' : 'rgba(255,255,255,0.02)',
            }}
          >
            {selectedFile ? (
              <div className="flex items-center justify-center gap-3">
                <FileSpreadsheet size={24} style={{ color: '#818cf8' }} />
                <div className="text-left">
                  <p className="text-sm font-medium text-white">{selectedFile.name}</p>
                  <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
                    {(selectedFile.size / 1024).toFixed(1)} KB
                  </p>
                </div>
                <button onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }} className="ml-auto" style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}>
                  <X size={16} />
                </button>
              </div>
            ) : (
              <>
                <FileSpreadsheet size={28} className="mx-auto mb-2 opacity-40" />
                <p className="text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>Kéo file vào đây hoặc nhấp để chọn</p>
                <p className="text-xs mt-1" style={{ color: 'rgba(255,255,255,0.3)' }}>
                  Cột bắt buộc: <code className="px-1 rounded" style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>sku</code>, <code className="px-1 rounded" style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>name</code>, <code className="px-1 rounded" style={{ background: 'rgba(99,102,241,0.2)', color: '#818cf8' }}>price</code>
                </p>
              </>
            )}
          </div>
          <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={e => setSelectedFile(e.target.files?.[0] || null)} />

          <button onClick={handleImport} disabled={!selectedFile || uploading} className="btn-primary w-full justify-center">
            {uploading ? <><Loader2 size={15} className="animate-spin" /> Đang xử lý...</> : <><Upload size={15} /> Bắt đầu Import</>}
          </button>

          {/* Column guide */}
          <div className="p-3 rounded-lg text-xs space-y-1" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="font-medium text-white/70 mb-2">Các cột được hỗ trợ:</p>
            {['sku *', 'name *', 'price *', 'cost_price', 'sale_price', 'stock', 'description'].map(col => (
              <span key={col} className="inline-block mr-1 mb-1 px-2 py-0.5 rounded" style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>{col}</span>
            ))}
          </div>
        </div>

        {/* Export card */}
        <div className="glass-card p-6 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              <Download size={18} className="text-white" />
            </div>
            <div>
              <h2 className="font-semibold text-white">Export sản phẩm</h2>
              <p className="text-xs" style={{ color: 'rgba(255,255,255,0.45)' }}>Xuất toàn bộ danh sách ra file Excel</p>
            </div>
          </div>

          <div className="p-4 rounded-xl space-y-2" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-sm font-medium text-white">File Excel bao gồm:</p>
            {['SKU', 'Tên sản phẩm', 'Danh mục', 'Thương hiệu', 'Giá vốn', 'Giá bán', 'Giá KM', 'Tồn kho', 'Trạng thái'].map(col => (
              <div key={col} className="flex items-center gap-2 text-sm" style={{ color: 'rgba(255,255,255,0.6)' }}>
                <CheckCircle2 size={12} style={{ color: '#10b981' }} /> {col}
              </div>
            ))}
          </div>

          <button onClick={handleExport} disabled={exporting} className="btn-primary w-full justify-center" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
            {exporting ? <><Loader2 size={15} className="animate-spin" /> Đang xuất...</> : <><Download size={15} /> Xuất file Excel</>}
          </button>
        </div>
      </div>

      {/* Import history */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
          <h3 className="font-semibold text-white">Lịch sử Import</h3>
          <button onClick={fetchImports} className="btn-ghost text-xs"><RefreshCw size={13} /> Làm mới</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" /></div>
        ) : !imports?.data?.length ? (
          <div className="text-center py-12" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Upload size={32} className="mx-auto mb-2 opacity-30" />
            <p className="text-sm">Chưa có phiên import nào</p>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>Tên file</th>
                <th>Tổng dòng</th>
                <th>Thành công</th>
                <th>Lỗi</th>
                <th>Trạng thái</th>
                <th>Thời gian</th>
              </tr>
            </thead>
            <tbody>
              {imports.data.map((imp) => {
                const cfg = importStatusConfig[imp.status];
                return (
                  <tr key={imp.id}>
                    <td>
                      <div className="flex items-center gap-2">
                        <FileSpreadsheet size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                        <span className="text-white">{imp.original_filename}</span>
                      </div>
                    </td>
                    <td style={{ color: 'rgba(255,255,255,0.6)' }}>{imp.total_rows}</td>
                    <td><span style={{ color: '#34d399' }}>{imp.success_rows}</span></td>
                    <td>
                      {imp.failed_rows > 0 ? (
                        <span className="flex items-center gap-1" style={{ color: '#f87171' }}>
                          <AlertCircle size={12} /> {imp.failed_rows}
                        </span>
                      ) : <span style={{ color: 'rgba(255,255,255,0.3)' }}>0</span>}
                    </td>
                    <td><span className={`badge ${cfg.color}`}>{cfg.label}</span></td>
                    <td style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.75rem' }}>{formatDate(imp.created_at)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
