'use client';

import { useEffect, useRef, useState } from 'react';
import api from '@/lib/api';
import { Import, PaginatedResponse } from '@/types';
import { formatDate, importStatusConfig } from '@/lib/utils';
import {
  Upload, Download, FileSpreadsheet, Loader2, CheckCircle2,
  AlertCircle, RefreshCw, X, ChevronRight, ChevronLeft, ArrowRight,
  Database, AlertTriangle, Table, Sparkles
} from 'lucide-react';
import Link from 'next/link';

export default function ImportExportPage() {
  const [imports, setImports] = useState<PaginatedResponse<Import> | null>(null);
  const [loading, setLoading] = useState(true);
  const [exporting, setExporting] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  // Import Wizard State
  const [wizardStep, setWizardStep] = useState(1); // 1: Upload, 2: Map, 3: Validate, 4: Preview, 5: Success
  const [uploading, setUploading] = useState(false);

  // Mock excel columns parsed
  const [excelColumns, setExcelColumns] = useState<string[]>([]);
  const [mappings, setMappings] = useState<Record<string, string>>({
    sku: 'Mã sản phẩm (SKU)',
    name: 'Tên sản phẩm',
    price: 'Giá bán lẻ',
    cost_price: 'Giá vốn',
    stock: 'Số lượng tồn kho',
    description: 'Mô tả chi tiết'
  });

  const downloadTemplate = () => {
    const headers = ['sku', 'name', 'price', 'cost_price', 'stock', 'description', 'barcode', 'seo_title', 'seo_description'];
    const row = ['PROD-001', 'Áo Thun Cotton Basic', '150000', '90000', '100', 'Áo thun 100% cotton thoáng mát', '8930000001', 'Áo thun cotton', 'Mô tả SEO áo thun'];
    
    // Add BOM character so Excel parses Vietnamese Unicode characters correctly
    const csvContent = "\uFEFF" + [headers.join(','), row.join(',')].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "acos_product_template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    // Mock parsing excel columns
    setExcelColumns([
      'Mã sản phẩm (SKU)',
      'Tên sản phẩm',
      'Giá bán lẻ',
      'Giá vốn',
      'Số lượng tồn kho',
      'Mô tả chi tiết',
      'Thương hiệu',
      'Danh mục'
    ]);
  };

  const onDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file && (file.name.endsWith('.xlsx') || file.name.endsWith('.xls') || file.name.endsWith('.csv'))) {
      handleFileSelect(file);
    }
  };

  const handleNextStep = () => {
    if (wizardStep === 2) {
      // Advance to validation step (Step 3)
      setWizardStep(3);
      // Simulate validation after 1.5s
      setTimeout(() => {
        setWizardStep(4);
      }, 1500);
    } else if (wizardStep === 4) {
      // Perform the actual import upload in Step 4 -> 5
      handleImport();
    } else {
      setWizardStep(prev => Math.min(5, prev + 1));
    }
  };

  const handlePrevStep = () => {
    setWizardStep(prev => Math.max(1, prev - 1));
  };

  const handleImport = async () => {
    if (!selectedFile) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', selectedFile);
    try {
      await api.post('/imports', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
      setWizardStep(5);
      setSelectedFile(null);
      fetchImports();
    } catch (err) {
      alert('Đã có lỗi xảy ra khi tải file lên.');
      setWizardStep(4);
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

  const resetWizard = () => {
    setSelectedFile(null);
    setWizardStep(1);
  };

  // Steps breadcrumb styles
  const getStepClass = (stepNum: number) => {
    if (wizardStep === stepNum) return 'text-indigo-400 font-semibold border-indigo-500/30 bg-indigo-500/5';
    if (wizardStep > stepNum) return 'text-emerald-400 font-medium border-emerald-500/20 bg-emerald-500/5';
    return 'text-white/30 border-transparent';
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-white tracking-tight">Import / Export</h1>
        <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
          Nhập liệu sản phẩm hàng loạt bằng Excel hoặc xuất dữ liệu bán hàng.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Import Wizard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Wizard Container */}
          <div className="glass-card p-6 space-y-6">
            {/* Step Indicators */}
            <div className="flex items-center justify-between rounded-lg p-2 bg-white/[0.01] overflow-x-auto gap-2">
              {[
                { step: 1, label: 'Tải lên' },
                { step: 2, label: 'Tham chiếu' },
                { step: 3, label: 'Xác thực' },
                { step: 4, label: 'Xem trước' },
                { step: 5, label: 'Hoàn thành' }
              ].map((s, idx) => (
                <div key={s.step} className="flex items-center gap-2 flex-shrink-0">
                  <span className={`text-[10px] px-2.5 py-1 rounded-md  flex items-center gap-1.5 ${getStepClass(s.step)}`}>
                    {wizardStep > s.step ? <CheckCircle2 size={10} /> : <span>0{s.step}</span>}
                    {s.label}
                  </span>
                  {idx < 4 && <ChevronRight size={10} className="text-white/20" />}
                </div>
              ))}
            </div>

            {/* Step 1: File Upload */}
            {wizardStep === 1 && (
              <div className="space-y-4 pd">
                <div className="flex items-center gap-3  mt-import-export">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center " style={{ background: 'rgba(99,102,241,0.08)' }}>
                    <Upload size={14} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Bước 1: Chọn tệp tin nguồn</h3>
                    <p className="text-[10px] text-white/40 mt-0.5">Tải lên tệp Excel (.xlsx, .xls) hoặc CSV chứa sản phẩm.</p>
                  </div>
                </div>

                <div
                  onDrop={onDrop}
                  onDragOver={e => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onClick={() => !selectedFile && fileRef.current?.click()}
                  className="p-6 rounded-xl text-center transition-all cursor-pointer border-dashed border-white/5 hover:border-white/20"
                  style={{
                    borderWidth: '2px',
                    borderColor: dragOver ? '#6366f1' : 'rgba(255,255,255,0.06)',
                    background: dragOver ? 'rgba(99,102,241,0.04)' : 'rgba(255,255,255,0.01)',
                  }}
                >
                  {selectedFile ? (
                    <div className="flex items-center justify-center gap-3">
                      <FileSpreadsheet size={24} className="text-indigo-400" />
                      <div className="text-left">
                        <p className="text-xs font-medium text-white">{selectedFile.name}</p>
                        <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {(selectedFile.size / 1024).toFixed(1)} KB
                        </p>
                      </div>
                      <button onClick={(e) => { e.stopPropagation(); setSelectedFile(null); }} className="ml-auto text-white/40 hover:text-white bg-transparent border-none cursor-pointer">
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <FileSpreadsheet size={24} className="mx-auto mb-2 opacity-40 text-white p-[5px]" />
                      <p className="text-xs font-medium text-white/50">Kéo file vào đây hoặc nhấp để chọn</p>
                      <p className="text-[10px] mt-1.5" style={{ color: 'rgba(255,255,255,0.3)' }}>
                        Các cột bắt buộc: <code className="px-1 py-0.2 rounded bg-white/[0.05] text-indigo-300">sku</code>, <code className="px-1 py-0.2 rounded bg-white/[0.05] text-indigo-300">name</code>, <code className="px-1 py-0.2 rounded bg-white/[0.05] text-indigo-300">price</code>
                      </p>
                      <button
                        type="button"
                        onClick={(e) => { e.stopPropagation(); downloadTemplate(); }}
                        className="mt-3 text-[11px] text-indigo-400 hover:text-indigo-300 hover:underline flex items-center gap-1 mx-auto bg-transparent border-none cursor-pointer"
                      >
                        <Download size={11} /> Tải file CSV mẫu (.csv)
                      </button>
                    </>
                  )}
                </div>
                <input ref={fileRef} type="file" accept=".xlsx,.xls,.csv" className="hidden" onChange={e => e.target.files?.[0] && handleFileSelect(e.target.files[0])} />

                <div className="flex justify-end pt-2">
                  <button onClick={handleNextStep} disabled={!selectedFile} className="btn-primary text-xs cursor-pointer">
                    Tiếp tục <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Column Mapping */}
            {wizardStep === 2 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-indigo-500/20" style={{ background: 'rgba(99,102,241,0.08)' }}>
                    <Database size={14} className="text-indigo-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Bước 2: Ánh xạ cột dữ liệu</h3>
                    <p className="text-[10px] text-white/40 mt-0.5">Khớp tiêu đề cột trong file Excel của bạn với trường dữ liệu hệ thống.</p>
                  </div>
                </div>

                <div className="border border-white/[0.04] rounded-lg overflow-hidden divide-y divide-white/[0.03]">
                  {[
                    { field: 'sku', label: 'Mã SKU (*)', desc: 'Mã định danh sản phẩm', required: true },
                    { field: 'name', label: 'Tên sản phẩm (*)', desc: 'Tên hiển thị trên các sàn', required: true },
                    { field: 'price', label: 'Giá bán lẻ (*)', desc: 'Giá bán cho khách hàng', required: true },
                    { field: 'cost_price', label: 'Giá vốn', desc: 'Giá nhập kho gốc', required: false },
                    { field: 'stock', label: 'Số lượng tồn kho', desc: 'Số lượng hàng hiện có', required: false },
                    { field: 'description', label: 'Mô tả', desc: 'Thông tin chi tiết sản phẩm', required: false },
                  ].map(row => (
                    <div key={row.field} className="p-3 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                      <div className="min-w-0">
                        <span className="font-semibold text-white flex items-center gap-1.5">
                          {row.label}
                        </span>
                        <span className="text-[10px] text-white/45 block mt-0.5">{row.desc}</span>
                      </div>
                      <select
                        value={mappings[row.field]}
                        onChange={e => setMappings(prev => ({ ...prev, [row.field]: e.target.value }))}
                        className="input-field py-1 px-2 text-xs sm:max-w-xs"
                      >
                        <option value="">-- Không nhập cột này --</option>
                        {excelColumns.map(col => (
                          <option key={col} value={col}>{col}</option>
                        ))}
                      </select>
                    </div>
                  ))}
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={handlePrevStep} className="btn-ghost text-xs cursor-pointer">
                    Quay lại
                  </button>
                  <button onClick={handleNextStep} className="btn-primary text-xs cursor-pointer">
                    Xác thực dữ liệu <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Validating */}
            {wizardStep === 3 && (
              <div className="py-12 flex flex-col items-center justify-center space-y-4">
                <Loader2 size={32} className="text-indigo-400 animate-spin" />
                <div className="text-center">
                  <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Đang xác thực dữ liệu...</h3>
                  <p className="text-[10px] text-white/40 mt-1">Hệ thống đang kiểm tra logic SKU trùng lặp, định dạng giá và tồn kho.</p>
                </div>
              </div>
            )}

            {/* Step 4: Preview & Inline Errors */}
            {wizardStep === 4 && (
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-amber-500/20" style={{ background: 'rgba(245,158,11,0.08)' }}>
                    <AlertTriangle size={14} className="text-amber-400" />
                  </div>
                  <div>
                    <h3 className="text-xs font-semibold text-white uppercase tracking-wider">Bước 4: Xem trước & Xác thực</h3>
                    <p className="text-[10px] text-white/40 mt-0.5">Xác nhận dữ liệu hợp lệ trước khi chính thức nhập kho.</p>
                  </div>
                </div>

                {/* Inline Errors Box */}
                <div className="p-3.5 rounded-lg border border-amber-500/15 text-xs space-y-2" style={{ background: 'rgba(245,158,11,0.04)' }}>
                  <div className="font-semibold text-amber-400 flex items-center gap-1.5">
                    <AlertCircle size={13} /> Phát hiện 2 dòng lỗi logic (Sẽ được bỏ qua khi Import)
                  </div>
                  <div className="space-y-1.5 pl-5 text-[10px] text-white/65 list-disc">
                    <div>• <strong>Dòng 5:</strong> Mã SKU <code className="px-1 rounded bg-white/[0.04] text-amber-300">TS-ACTIVE-BLK-M</code> đã tồn tại trong hệ thống.</div>
                    <div>• <strong>Dòng 12:</strong> Giá bán lẻ trống hoặc không phải là số hợp lệ.</div>
                  </div>
                </div>

                {/* Preview Table */}
                <div className="border border-white/[0.04] rounded-lg overflow-hidden">
                  <div className="px-3 py-2 bg-white/[0.01] border-b border-white/[0.04] flex items-center gap-1.5">
                    <Table size={12} className="text-white/40" />
                    <span className="text-[10px] font-semibold text-white/40 uppercase tracking-wider">Xem trước 3 hàng hợp lệ đầu tiên</span>
                  </div>
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th>SKU</th>
                        <th>Tên sản phẩm</th>
                        <th>Giá bán lẻ</th>
                        <th>Giá vốn</th>
                        <th>Tồn kho</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td><span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-white/[0.04] text-white/60">TS-ACTIVE-WHT-M</span></td>
                        <td className="text-xs text-white">Áo Thun Cotton Active - Trắng - M</td>
                        <td className="text-xs font-medium text-indigo-400">249,000đ</td>
                        <td className="text-xs text-white/50">120,000đ</td>
                        <td className="text-xs text-white/70">50</td>
                      </tr>
                      <tr>
                        <td><span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-white/[0.04] text-white/60">TS-ACTIVE-WHT-L</span></td>
                        <td className="text-xs text-white">Áo Thun Cotton Active - Trắng - L</td>
                        <td className="text-xs font-medium text-indigo-400">249,000đ</td>
                        <td className="text-xs text-white/50">120,000đ</td>
                        <td className="text-xs text-white/70">45</td>
                      </tr>
                      <tr>
                        <td><span className="font-mono text-[9px] px-1.5 py-0.2 rounded bg-white/[0.04] text-white/60">JEAN-SLIM-BLU</span></td>
                        <td className="text-xs text-white">Quần Jean Slimfit Levi's 511 - Xanh</td>
                        <td className="text-xs font-medium text-indigo-400">1,450,000đ</td>
                        <td className="text-xs text-white/50">800,000đ</td>
                        <td className="text-xs text-white/70">40</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div className="flex justify-between pt-2">
                  <button onClick={handlePrevStep} className="btn-ghost text-xs cursor-pointer">
                    Quay lại
                  </button>
                  <button onClick={handleNextStep} disabled={uploading} className="btn-primary text-xs cursor-pointer">
                    {uploading ? <><Loader2 size={12} className="animate-spin" /> Đang import...</> : <><CheckCircle2 size={12} /> Xác nhận Import</>}
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Success */}
            {wizardStep === 5 && (
              <div className="py-8 flex flex-col items-center justify-center space-y-4 text-center">
                <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                  <CheckCircle2 size={24} className="animate-bounce" />
                </div>
                <div className="space-y-1">
                  <h3 className="text-sm font-bold text-white">Import sản phẩm thành công!</h3>
                  <p className="text-xs text-white/50 max-w-sm">Hệ thống đã nhập thành công 48 dòng sản phẩm hợp lệ vào kho hàng của bạn.</p>
                </div>
                <div className="flex gap-2.5 pt-4">
                  <button onClick={resetWizard} className="btn-ghost text-xs cursor-pointer">
                    Nhập thêm file khác
                  </button>
                  <Link href="/dashboard/products" className="btn-primary text-xs">
                    Xem danh sách sản phẩm
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Column: Export & Guidelines */}
        <div className="space-y-6">
          {/* Export Card */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg flex items-center justify-center border border-emerald-500/20" style={{ background: 'rgba(16,185,129,0.08)' }}>
                <Download size={14} className="text-emerald-400" />
              </div>
              <div>
                <h2 className="text-xs font-semibold text-white uppercase tracking-wider">Xuất dữ liệu Excel</h2>
                <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.45)' }}>Tải xuống toàn bộ sản phẩm hiện có.</p>
              </div>
            </div>

            <div className="p-3.5 rounded-lg space-y-2 border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.01)' }}>
              <p className="text-[10px] uppercase font-bold text-white/35 tracking-wider">Cấu trúc file xuất ra:</p>
              {['Mã SKU', 'Tên sản phẩm', 'Danh mục', 'Thương hiệu', 'Giá bán lẻ', 'Giá vốn', 'Tồn kho', 'Thông số JSON'].map(col => (
                <div key={col} className="flex items-center gap-2 text-xs text-white/60">
                  <CheckCircle2 size={11} className="text-emerald-400" /> {col}
                </div>
              ))}
            </div>

            <button onClick={handleExport} disabled={exporting} className="btn-primary w-full justify-center text-xs cursor-pointer" style={{ background: 'linear-gradient(135deg, #10b981, #059669)' }}>
              {exporting ? <><Loader2 size={13} className="animate-spin" /> Đang xuất...</> : <><Download size={13} /> Tải file Excel</>}
            </button>
          </div>
        </div>
      </div>

      {/* Import history */}
      <div className="glass-card overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4" style={{ borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
          <h3 className="font-semibold text-xs uppercase tracking-wider text-white/40">Lịch sử các phiên Import</h3>
          <button onClick={fetchImports} className="btn-ghost text-xs cursor-pointer"><RefreshCw size={12} /> Làm mới</button>
        </div>

        {loading ? (
          <div className="flex justify-center py-10"><div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" /></div>
        ) : !imports?.data?.length ? (
          <div className="text-center py-12" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Upload size={28} className="mx-auto mb-2 opacity-30" />
            <p className="text-xs">Chưa có lịch sử nhập dữ liệu</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Tên tệp tin</th>
                  <th>Tổng dòng</th>
                  <th>Thành công</th>
                  <th>Số dòng lỗi</th>
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
                        <div className="flex items-center gap-2 text-xs">
                          <FileSpreadsheet size={13} className="text-white/30" />
                          <span className="text-white font-medium">{imp.original_filename}</span>
                        </div>
                      </td>
                      <td className="text-xs text-white/60">{imp.total_rows}</td>
                      <td className="text-xs text-emerald-400 font-medium">{imp.success_rows}</td>
                      <td className="text-xs">
                        {imp.failed_rows > 0 ? (
                          <span className="flex items-center gap-1 text-red-400 font-medium">
                            <AlertCircle size={11} /> {imp.failed_rows}
                          </span>
                        ) : <span className="text-white/20">0</span>}
                      </td>
                      <td><span className={`badge text-[10px] ${cfg.color}`}>{cfg.label}</span></td>
                      <td className="text-[10px] text-white/35" suppressHydrationWarning>{formatDate(imp.created_at)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
