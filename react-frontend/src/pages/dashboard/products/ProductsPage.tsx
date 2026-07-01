import { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '@/lib/api';
import type { Product, PaginatedResponse, ProductVariant } from '@/types';
import { formatCurrency, statusConfig } from '@/lib/utils';
import {
  Plus, Search, Filter, Download, RefreshCw,
  Package, Edit, Trash2, ChevronLeft, ChevronRight,
  Eye, X, Settings2, Globe, ShieldAlert, CheckCircle2, ChevronDown
} from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState<number | null>(null);

  // Selection & Bulk Actions
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // Column Visibility
  const [visibleColumns, setVisibleColumns] = useState({
    sku: true,
    name: true,
    category: true,
    price: true,
    stock: true,
    status: true,
  });
  const [showColumnDropdown, setShowColumnDropdown] = useState(false);

  // Detail Drawer
  const [activeDrawerId, setActiveDrawerId] = useState<number | null>(null);
  const [drawerProduct, setDrawerProduct] = useState<Product | null>(null);
  const [drawerLoading, setDrawerLoading] = useState(false);
  const [drawerTab, setDrawerTab] = useState<'general' | 'variants' | 'seo'>('general');
  const [activeImageUrl, setActiveImageUrl] = useState<string>('');

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await api.get('/products', {
        params: { search, status: statusFilter || undefined, page, per_page: 20 },
      });
      setProducts(res.data);
    } finally {
      setLoading(false);
    }
  }, [search, statusFilter, page]);

  useEffect(() => { fetchProducts(); }, [fetchProducts]);

  const handleDelete = async (id: number, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    setDeleting(id);
    try {
      await api.delete(`/products/${id}`);
      if (activeDrawerId === id) setActiveDrawerId(null);
      fetchProducts();
    } finally {
      setDeleting(null);
    }
  };

  const handleExport = async () => {
    const res = await api.get('/exports/products', { responseType: 'blob' });
    const url = URL.createObjectURL(res.data);
    const a = document.createElement('a');
    a.href = url;
    a.download = `products_${Date.now()}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Drawer Fetching
  const openDrawer = async (product: Product) => {
    setActiveDrawerId(product.id);
    setDrawerLoading(true);
    setDrawerTab('general');
    setActiveImageUrl('');
    try {
      const res = await api.get(`/products/${product.id}`);
      const p = res.data;
      setDrawerProduct(p);
      // Set initial active image
      const primary = p.assets?.find((a: any) => a.pivot?.is_primary) ?? p.assets?.[0];
      if (primary) setActiveImageUrl(primary.url);
    } catch (err) {
      setDrawerProduct(product);
    } finally {
      setDrawerLoading(false);
    }
  };

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked && products?.data) {
      setSelectedIds(products.data.map(p => p.id));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectRow = (id: number, e: React.MouseEvent) => {
    e.stopPropagation(); // Avoid opening drawer when checking box
    setSelectedIds(prev =>
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = async () => {
    if (!confirm(`Xóa ${selectedIds.length} sản phẩm đã chọn?`)) return;
    setLoading(true);
    try {
      await Promise.all(selectedIds.map(id => api.delete(`/products/${id}`)));
      setSelectedIds([]);
      fetchProducts();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-5 relative">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Sản phẩm</h1>
          <p className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Quản lý danh mục sản phẩm, biến thể và thuộc tính thông số kỹ thuật.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="btn-ghost text-xs cursor-pointer">
            <Download size={13} /> Export
          </button>
          <Link href="/dashboard/products/create" className="btn-primary text-xs">
            <Plus size={13} /> Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* Filters & Column Config */}
      <div className="glass-card p-4 flex flex-wrap gap-3 items-center border-none">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input
            type="text"
            placeholder="Tìm theo tên, SKU..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="input-field text-xs"
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="input-field text-xs"
          style={{ width: 'auto', minWidth: '150px' }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang bán</option>
          <option value="draft">Nháp</option>
          <option value="inactive">Ngừng bán</option>
        </select>

        {/* Column Visibility Selector */}
        <div className="relative z-30">
          <button
            onClick={() => setShowColumnDropdown(!showColumnDropdown)}
            className="btn-ghost text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Settings2 size={13} /> Cột hiển thị <ChevronDown size={12} />
          </button>
          {showColumnDropdown && (
            <div className="absolute right-0 mt-2 w-48 rounded-xl p-3 z-50 space-y-2 shadow-2xl column-dropdown">
              <p className="text-[10px] uppercase font-bold tracking-wider mb-2 opacity-50">Ẩn/Hiện Cột</p>
              {Object.entries(visibleColumns).map(([col, val]) => (
                <label key={col} className="flex items-center gap-2 text-xs cursor-pointer hover:opacity-80 transition-opacity py-[5px]">
                  <input
                    type="checkbox"
                    checked={val}
                    onChange={(e) => setVisibleColumns(prev => ({ ...prev, [col]: e.target.checked }))}
                    className="rounded border-white/10 text-indigo-500 bg-transparent"
                  />
                  {col === 'sku' ? 'Mã SKU' : col === 'name' ? 'Tên sản phẩm' : col === 'category' ? 'Danh mục' : col === 'price' ? 'Giá bán' : col === 'stock' ? 'Tồn kho' : 'Trạng thái'}
                </label>
              ))}
            </div>
          )}
        </div>

        <button onClick={fetchProducts} className="btn-ghost text-xs cursor-pointer">
          <RefreshCw size={13} /> Làm mới
        </button>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-56">
            <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          </div>
        ) : !products?.data?.length ? (
          <div className="text-center py-16" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Package size={36} className="mx-auto mb-3 opacity-30" />
            <p className="text-sm font-medium text-white/60">Chưa có sản phẩm nào</p>
            <p className="text-xs mt-1">Hãy thêm sản phẩm đầu tiên hoặc import từ Excel.</p>
            <Link href="/dashboard/products/create" className="btn-primary inline-flex mt-4 text-xs">
              <Plus size={13} /> Thêm sản phẩm
            </Link>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="data-table">
              <thead>
                <tr>
                  <th style={{ width: '40px', paddingLeft: '1.25rem' }}>
                    <input
                      type="checkbox"
                      onChange={handleSelectAll}
                      checked={selectedIds.length === products.data.length}
                      className="rounded border-white/10 bg-transparent"
                    />
                  </th>
                  {visibleColumns.sku && <th>SKU</th>}
                  {visibleColumns.name && <th>Tên sản phẩm</th>}
                  {visibleColumns.category && <th>Danh mục</th>}
                  {visibleColumns.price && <th>Giá bán</th>}
                  {visibleColumns.stock && <th>Tồn kho</th>}
                  {visibleColumns.status && <th>Trạng thái</th>}
                  <th style={{ width: '100px', textAlign: 'right', paddingRight: '1.5rem' }}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {products.data.map((p) => {
                  const st = statusConfig[p.status];
                  const isSelected = selectedIds.includes(p.id);
                  return (
                    <tr
                      key={p.id}
                      onClick={() => openDrawer(p)}
                      className="cursor-pointer group hover:bg-white/[0.01]"
                      style={{ background: isSelected ? 'rgba(99,102,241,0.03)' : undefined }}
                    >
                      <td style={{ paddingLeft: '1.25rem' }} onClick={(e) => e.stopPropagation()}>
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(p.id, e as any)}
                          className="rounded border-white/10 bg-transparent"
                        />
                      </td>
                      {visibleColumns.sku && (
                        <td>
                          <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.04] text-white/70">
                            {p.sku}
                          </span>
                        </td>
                      )}
                      {visibleColumns.name && (
                        <td>
                          <div className="font-medium text-white text-xs">{p.name}</div>
                          {(p.variants_count ?? 0) > 0 && (
                            <span className="text-[10px] text-indigo-400 mt-1 inline-flex items-center gap-1">
                              {p.variants_count} phiên bản
                            </span>
                          )}
                        </td>
                      )}
                      {visibleColumns.category && (
                        <td className="text-xs text-white/50">
                          {p.category?.name ?? <span className="text-white/20">—</span>}
                        </td>
                      )}
                      {visibleColumns.price && (
                        <td className="font-semibold text-xs text-[#818cf8]">
                          {formatCurrency(p.price)}
                        </td>
                      )}
                      {visibleColumns.stock && (
                        <td className="text-xs">
                          <span className="font-medium" style={{ color: p.stock <= (p.min_stock || 0) ? '#f87171' : 'rgba(255,255,255,0.7)' }}>
                            {p.stock}
                          </span>
                        </td>
                      )}
                      {visibleColumns.status && (
                        <td>
                          <span className={`badge text-[10px] ${st.color}`}>{st.label}</span>
                        </td>
                      )}
                      <td onClick={(e) => e.stopPropagation()} style={{ paddingRight: '1.5rem' }}>
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => openDrawer(p)}
                            className="w-7 h-7 rounded flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] transition-all bg-transparent border-none cursor-pointer"
                            title="Xem nhanh"
                          >
                            <Eye size={13} />
                          </button>
                          <Link href={`/dashboard/products/${p.id}/edit`}
                            className="w-7 h-7 rounded flex items-center justify-center text-white/40 hover:text-white hover:bg-white/[0.05] transition-all"
                            title="Chỉnh sửa"
                          >
                            <Edit size={13} />
                          </Link>
                          <button
                            onClick={(e) => handleDelete(p.id, e)}
                            disabled={deleting === p.id}
                            className="w-7 h-7 rounded flex items-center justify-center text-white/40 hover:text-red-400 hover:bg-red-500/10 transition-all bg-transparent border-none cursor-pointer"
                            title="Xóa"
                          >
                            <Trash2 size={13} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Pagination */}
        {products && products.last_page > 1 && (
          <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.04)' }}>
            <p className="text-[10px]" style={{ color: 'rgba(255,255,255,0.35)' }}>
              Hiển thị {products.from}–{products.to} của {products.total} sản phẩm
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-ghost" style={{ padding: '0.4rem 0.6rem' }}>
                <ChevronLeft size={13} />
              </button>
              <span className="text-xs px-3" style={{ color: 'rgba(255,255,255,0.5)' }}>{page} / {products.last_page}</span>
              <button onClick={() => setPage(p => Math.min(products.last_page, p + 1))} disabled={page === products.last_page} className="btn-ghost" style={{ padding: '0.4rem 0.6rem' }}>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Floating Bulk Action Bar */}
      {selectedIds.length > 0 && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 px-4 py-3 rounded-xl border border-white/[0.08] shadow-2xl z-40 flex items-center gap-4 animate-fade-in bg-[#0d0d15]/95 backdrop-blur-md">
          <span className="text-xs font-medium text-white">Đã chọn {selectedIds.length} sản phẩm</span>
          <div className="h-4 w-px bg-white/[0.08]" />
          <button className="btn-ghost text-[11px] py-1 px-2.5 hover:bg-white/[0.04] cursor-pointer">Đồng bộ sàn</button>
          <button onClick={handleBulkDelete} className="btn-primary text-[11px] py-1 px-2.5 bg-red-600 hover:bg-red-500 cursor-pointer">Xóa đã chọn</button>
          <button onClick={() => setSelectedIds([])} className="text-white/40 hover:text-white text-[11px] bg-transparent border-none cursor-pointer">Hủy</button>
        </div>
      )}

      {/* Product Detail Drawer */}
      {activeDrawerId && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div className="fixed inset-0 bg-black/60 backdrop-blur-xs" onClick={() => setActiveDrawerId(null)} />

          {/* Drawer Panel */}
          <div className="relative bg-[#0c0c14] border-l border-white/[0.06] w-full max-w-lg h-full shadow-2xl flex flex-col z-50 animate-fade-in">
            {/* Header */}
            <div className="px-6 py-5 border-b border-white/[0.04] flex items-center justify-between gap-3">
              <div className="flex items-center gap-3 min-w-0">
                {/* Thumbnail */}
                {(() => {
                  const primaryAsset = drawerProduct?.assets?.find((a: any) => a.pivot?.is_primary) ?? drawerProduct?.assets?.[0];
                  return primaryAsset ? (
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-white border border-white/10 flex-shrink-0">
                      <img src={primaryAsset.url} alt="thumb" className="w-full h-full object-contain p-0.5" />
                    </div>
                  ) : null;
                })()}
                <div className="min-w-0">
                  <span className="text-[9px] uppercase font-bold text-indigo-400 tracking-wider">Chi tiết sản phẩm</span>
                  <h2 className="text-base font-bold text-white truncate mt-0.5">{drawerProduct?.name ?? 'Đang tải...'}</h2>
                  {drawerProduct && (
                    <span className="font-mono text-[9px] text-white/35 mt-1 block">SKU: {drawerProduct.sku}</span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setActiveDrawerId(null)}
                className="w-7 h-7 rounded-lg flex items-center justify-center border border-white/[0.04] text-white/45 hover:text-white hover:bg-white/[0.03] transition-all bg-transparent cursor-pointer flex-shrink-0"
              >
                <X size={14} />
              </button>
            </div>

            {/* Tab Navigation */}
            <div className="flex border-b border-white/[0.04] bg-white/[0.01]">
              {[
                { id: 'general', label: 'Thông tin chung' },
                { id: 'variants', label: 'Biến thể' },
                { id: 'seo', label: 'SEO & Tồn kho' },
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setDrawerTab(t.id as any)}
                  className="flex-1 py-3 text-xs font-medium border-b-2 transition-all cursor-pointer bg-transparent text-center"
                  style={{
                    borderColor: drawerTab === t.id ? '#6366f1' : 'transparent',
                    color: drawerTab === t.id ? 'white' : 'rgba(255,255,255,0.45)'
                  }}
                >
                  {t.label}
                </button>
              ))}
            </div>

            {/* Drawer Body */}
            <div className="flex-1 overflow-y-auto">
              {drawerLoading ? (
                <div className="flex items-center justify-center h-64">
                  <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
                </div>
              ) : drawerProduct ? (
                <>
                  {/* TAB 1: General Info */}
                  {drawerTab === 'general' && (
                    <div className="space-y-0">

                      {/* Images — edge to edge */}
                      {drawerProduct.assets && drawerProduct.assets.length > 0 && (
                        <div>
                          {/* Main image */}
                          <div
                            className="w-full overflow-hidden"
                            style={{ aspectRatio: '4/3', background: '#0d0d14' }}
                          >
                            <img
                              src={activeImageUrl || (drawerProduct.assets.find((a: any) => a.pivot?.is_primary) ?? drawerProduct.assets[0])?.url}
                              alt="product"
                              className="w-full h-full object-cover transition-all duration-300"
                              onError={(e) => { (e.target as HTMLImageElement).style.opacity = '0.2'; }}
                            />
                          </div>
                          {/* Thumbnails */}
                          {drawerProduct?.assets && drawerProduct.assets.length > 1 && (
                            <div className="flex gap-2 px-4 py-2.5 overflow-x-auto" style={{ background: '#0c0c14', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                              {drawerProduct.assets.map((a: any) => {
                                const fallback = (drawerProduct?.assets?.find((x: any) => x.pivot?.is_primary) ?? drawerProduct?.assets?.[0])?.url;
                                const isActive = (activeImageUrl || fallback) === a.url;
                                return (
                                  <button
                                    key={a.id}
                                    onClick={() => setActiveImageUrl(a.url)}
                                    className="flex-shrink-0 rounded-lg overflow-hidden transition-all duration-150 cursor-pointer"
                                    style={{
                                      width: 52, height: 52,
                                      background: '#0d0d14',
                                      border: isActive ? '2px solid #6366f1' : '2px solid rgba(255,255,255,0.07)',
                                      padding: 0,
                                      boxShadow: isActive ? '0 0 0 3px rgba(99,102,241,0.2)' : 'none',
                                    }}
                                  >
                                    <img src={a.url} alt={a.original_name} className="w-full h-full object-cover" />
                                  </button>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Rest of content — padded */}
                      <div className="p-6 space-y-6">


                        {/* Price & Cost */}
                        <div className="grid grid-cols-3 gap-4">
                          <div className="p-3 rounded-lg border border-white/[0.03]" style={{ background: 'rgba(255,255,255,0.01)' }}>
                            <span className="text-[9px] text-white/35 uppercase font-semibold">Giá bán lẻ</span>
                            <div className="text-sm font-semibold text-[#818cf8] mt-1">{formatCurrency(drawerProduct.price)}</div>
                          </div>
                          <div className="p-3 rounded-lg border border-white/[0.03]" style={{ background: 'rgba(255,255,255,0.01)' }}>
                            <span className="text-[9px] text-white/35 uppercase font-semibold">Giá vốn</span>
                            <div className="text-sm font-semibold text-white/70 mt-1">{formatCurrency(drawerProduct.cost_price)}</div>
                          </div>
                          <div className="p-3 rounded-lg border border-white/[0.03]" style={{ background: 'rgba(255,255,255,0.01)' }}>
                            <span className="text-[9px] text-white/35 uppercase font-semibold">Khuyến mãi</span>
                            <div className="text-sm font-semibold text-emerald-400 mt-1">
                              {drawerProduct.sale_price ? formatCurrency(drawerProduct.sale_price) : 'Không'}
                            </div>
                          </div>
                        </div>

                        {/* Details list */}
                        <div className="space-y-3.5">
                          <h4 className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Mối quan hệ</h4>
                          <div className="grid grid-cols-2 gap-4 text-xs">
                            <div>
                              <span className="text-white/35 block">Danh mục:</span>
                              <span className="text-white font-medium mt-1 block">{drawerProduct.category?.name ?? '—'}</span>
                            </div>
                            <div>
                              <span className="text-white/35 block">Thương hiệu:</span>
                              <span className="text-white font-medium mt-1 block">{drawerProduct.brand?.name ?? '—'}</span>
                            </div>
                            <div>
                              <span className="text-white/35 block">Nhà cung cấp:</span>
                              <span className="text-white font-medium mt-1 block">{drawerProduct.supplier?.name ?? '—'}</span>
                            </div>
                            <div>
                              <span className="text-white/35 block">Trạng thái:</span>
                              <span className={`badge text-[10px] mt-1 ${statusConfig[drawerProduct.status].color}`}>
                                {statusConfig[drawerProduct.status].label}
                              </span>
                            </div>
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                          <h4 className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Mô tả sản phẩm</h4>
                          <p className="text-xs text-white/60 leading-relaxed bg-white/[0.01] p-3 rounded-lg border border-white/[0.03]">
                            {drawerProduct.description || 'Chưa có mô tả sản phẩm.'}
                          </p>
                        </div>

                        {/* Dynamic Attributes */}
                        <div className="space-y-3">
                          <h4 className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Thông số kỹ thuật (Ngành hàng)</h4>
                          {drawerProduct.attributes && Object.keys(drawerProduct.attributes).length > 0 ? (
                            <div className="border border-white/[0.04] rounded-lg overflow-hidden">
                              {Object.entries(drawerProduct.attributes).map(([key, val], idx) => (
                                <div key={key} className="flex justify-between items-center p-3 text-xs border-b border-white/[0.03] last:border-0" style={{ background: idx % 2 === 0 ? 'rgba(255,255,255,0.01)' : 'transparent' }}>
                                  <span className="text-white/45 capitalize font-medium">{key}</span>
                                  <span className="text-white font-semibold">{String(val)}</span>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-xs text-white/35 italic">Không có thông số kỹ thuật riêng.</p>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* TAB 2: Variants */}
                  {drawerTab === 'variants' && (
                    <div className="p-6 space-y-4">
                      <h4 className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Danh sách phiên bản biến thể</h4>
                      {drawerProduct.variants && drawerProduct.variants.length > 0 ? (
                        <div className="border border-white/[0.04] rounded-lg overflow-hidden divide-y divide-white/[0.04]">
                          {drawerProduct.variants.map((v: ProductVariant) => (
                            <div key={v.id} className="p-3.5 hover:bg-white/[0.01] transition-colors">
                              <div className="flex justify-between items-start">
                                <div>
                                  <span className="font-mono text-[10px] px-1.5 py-0.2 rounded bg-indigo-500/10 text-indigo-300 border border-indigo-500/20">
                                    {v.sku}
                                  </span>
                                  <div className="flex flex-wrap gap-1.5 mt-2">
                                    {v.attribute_values && Object.entries(v.attribute_values).map(([k, val]) => (
                                      <span key={k} className="text-[9px] px-2 py-0.5 rounded bg-white/[0.03] border border-white/[0.04] text-white/50">
                                        <strong className="capitalize text-white/30 mr-1">{k}:</strong> {String(val)}
                                      </span>
                                    ))}
                                  </div>
                                </div>
                                <div className="text-right">
                                  <div className="text-xs font-semibold text-white">{formatCurrency(v.price ?? drawerProduct.price)}</div>
                                  <div className="text-[10px] text-white/40 mt-1">Tồn kho: {v.stock}</div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 border border-dashed border-white/10 rounded-lg">
                          <Package size={24} className="mx-auto opacity-20 mb-2" />
                          <p className="text-xs text-white/45">Sản phẩm này không có biến thể.</p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* TAB 3: SEO & Inventory */}
                  {drawerTab === 'seo' && (
                    <div className="p-6 space-y-6">
                      {/* Inventory limits */}
                      <div className="space-y-3.5">
                        <h4 className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Giới hạn tồn kho</h4>
                        <div className="grid grid-cols-2 gap-4 text-xs">
                          <div className="p-3 rounded-lg border border-white/[0.03]" style={{ background: 'rgba(255,255,255,0.01)' }}>
                            <span className="text-white/40 block">Tồn kho hiện tại:</span>
                            <span className="text-white font-bold text-base mt-1.5 block">{drawerProduct.stock}</span>
                          </div>
                          <div className="p-3 rounded-lg border border-white/[0.03]" style={{ background: 'rgba(255,255,255,0.01)' }}>
                            <span className="text-white/40 block">Tồn kho tối thiểu (Cảnh báo):</span>
                            <span className="text-white font-bold text-base mt-1.5 block">{drawerProduct.min_stock || 0}</span>
                          </div>
                        </div>
                      </div>

                      {/* SEO Section */}
                      <div className="space-y-4">
                        <h4 className="text-[10px] uppercase font-bold text-white/30 tracking-wider">Cấu hình SEO sàn thương mại</h4>
                        <div className="space-y-3 text-xs">
                          <div className="p-3 rounded-lg border border-white/[0.03] space-y-1.5" style={{ background: 'rgba(255,255,255,0.01)' }}>
                            <span className="text-white/40 flex items-center gap-1"><Globe size={11} /> Đường dẫn Slug:</span>
                            <span className="font-mono text-indigo-400 select-all block truncate mt-1">{drawerProduct.slug}</span>
                          </div>
                          <div className="p-3 rounded-lg border border-white/[0.03] space-y-1.5" style={{ background: 'rgba(255,255,255,0.01)' }}>
                            <span className="text-white/40 block">SEO Title:</span>
                            <span className="text-white font-medium block mt-1">{drawerProduct.seo_title || 'Mặc định theo tên sản phẩm'}</span>
                          </div>
                          <div className="p-3 rounded-lg border border-white/[0.03] space-y-1.5" style={{ background: 'rgba(255,255,255,0.01)' }}>
                            <span className="text-white/40 block">SEO Description:</span>
                            <span className="text-white/60 block leading-normal mt-1">{drawerProduct.seo_description || 'Mặc định theo mô tả sản phẩm'}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : null}
            </div>

            {/* Footer */}
            {drawerProduct && (
              <div className="px-6 py-4 border-t border-white/[0.04] bg-white/[0.01] flex items-center gap-2">
                <Link
                  href={`/dashboard/products/${drawerProduct.id}/edit`}
                  className="btn-primary text-xs flex-1 justify-center py-2"
                >
                  <Edit size={13} /> Chỉnh sửa sản phẩm
                </Link>
                <button
                  onClick={() => handleDelete(drawerProduct.id)}
                  className="btn-ghost text-xs py-2 px-3 hover:bg-red-500/15 hover:text-red-400 hover:border-red-500/20 cursor-pointer border border-white/[0.06] text-white/50 bg-transparent"
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
