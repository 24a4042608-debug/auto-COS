'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { Product, PaginatedResponse } from '@/types';
import { formatCurrency, statusConfig } from '@/lib/utils';
import {
  Plus, Search, Filter, Download, RefreshCw,
  Package, Edit, Trash2, ChevronLeft, ChevronRight,
} from 'lucide-react';

export default function ProductsPage() {
  const [products, setProducts] = useState<PaginatedResponse<Product> | null>(null);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [page, setPage] = useState(1);
  const [deleting, setDeleting] = useState<number | null>(null);

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

  const handleDelete = async (id: number) => {
    if (!confirm('Bạn có chắc muốn xóa sản phẩm này?')) return;
    setDeleting(id);
    try {
      await api.delete(`/products/${id}`);
      fetchProducts();
    } finally {
      setDeleting(null);
    }
  };

  const handleExport = async () => {
    const res = await api.get('/exports/products', { responseType: 'blob' });
    const url  = URL.createObjectURL(res.data);
    const a    = document.createElement('a');
    a.href     = url;
    a.download = `products_${Date.now()}.xlsx`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Sản phẩm</h1>
          <p className="text-sm mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Quản lý toàn bộ danh mục sản phẩm của bạn
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={handleExport} className="btn-ghost">
            <Download size={15} /> Export
          </button>
          <Link href="/dashboard/products/create" className="btn-primary">
            <Plus size={15} /> Thêm sản phẩm
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="glass-card p-4 flex flex-wrap gap-3">
        <div className="relative flex-1 min-w-48">
          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: 'rgba(255,255,255,0.3)' }} />
          <input
            type="text"
            placeholder="Tìm theo tên, SKU..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(1); }}
            className="input-field"
            style={{ paddingLeft: '2.25rem' }}
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
          className="input-field"
          style={{ width: 'auto', minWidth: '160px' }}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="active">Đang bán</option>
          <option value="draft">Nháp</option>
          <option value="inactive">Ngừng bán</option>
        </select>
        <button onClick={fetchProducts} className="btn-ghost">
          <RefreshCw size={14} /> Làm mới
        </button>
      </div>

      {/* Table */}
      <div className="glass-card overflow-hidden">
        {loading ? (
          <div className="flex items-center justify-center h-48">
            <div className="w-6 h-6 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
          </div>
        ) : !products?.data?.length ? (
          <div className="text-center py-16" style={{ color: 'rgba(255,255,255,0.35)' }}>
            <Package size={40} className="mx-auto mb-3 opacity-30" />
            <p className="text-base font-medium text-white/60">Chưa có sản phẩm nào</p>
            <p className="text-sm mt-1">Hãy thêm sản phẩm đầu tiên hoặc import từ Excel.</p>
            <Link href="/dashboard/products/create" className="btn-primary inline-flex mt-4">
              <Plus size={15} /> Thêm sản phẩm
            </Link>
          </div>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                <th>SKU</th>
                <th>Tên sản phẩm</th>
                <th>Danh mục</th>
                <th>Giá bán</th>
                <th>Tồn kho</th>
                <th>Trạng thái</th>
                <th style={{ width: '80px' }}>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {products.data.map((p) => {
                const st = statusConfig[p.status];
                return (
                  <tr key={p.id}>
                    <td>
                      <span className="font-mono text-xs px-2 py-1 rounded" style={{ background: 'rgba(99,102,241,0.12)', color: '#818cf8' }}>
                        {p.sku}
                      </span>
                    </td>
                    <td>
                      <div className="font-medium text-white">{p.name}</div>
                      {(p.variants_count ?? 0) > 0 && (
                        <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                          {p.variants_count} biến thể
                        </div>
                      )}
                    </td>
                    <td style={{ color: 'rgba(255,255,255,0.55)' }}>
                      {p.category?.name ?? <span style={{ color: 'rgba(255,255,255,0.25)' }}>—</span>}
                    </td>
                    <td className="font-medium" style={{ color: '#818cf8' }}>{formatCurrency(p.price)}</td>
                    <td>
                      <span style={{ color: p.stock <= (p.min_stock || 0) ? '#f87171' : 'rgba(255,255,255,0.7)' }}>
                        {p.stock}
                      </span>
                    </td>
                    <td>
                      <span className={`badge ${st.color}`}>{st.label}</span>
                    </td>
                    <td>
                      <div className="flex items-center gap-1">
                        <Link href={`/dashboard/products/${p.id}/edit`}
                          className="w-7 h-7 rounded flex items-center justify-center transition-colors"
                          style={{ color: 'rgba(255,255,255,0.4)', background: 'transparent' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(99,102,241,0.15)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
                        >
                          <Edit size={13} />
                        </Link>
                        <button
                          onClick={() => handleDelete(p.id)}
                          disabled={deleting === p.id}
                          className="w-7 h-7 rounded flex items-center justify-center transition-colors"
                          style={{ color: 'rgba(255,255,255,0.4)', background: 'transparent', border: 'none', cursor: 'pointer' }}
                          onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(239,68,68,0.15)')}
                          onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}
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
        )}

        {/* Pagination */}
        {products && products.last_page > 1 && (
          <div className="flex items-center justify-between px-4 py-3" style={{ borderTop: '1px solid rgba(255,255,255,0.06)' }}>
            <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
              {products.from}–{products.to} / {products.total} sản phẩm
            </p>
            <div className="flex items-center gap-1">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="btn-ghost" style={{ padding: '0.4rem 0.6rem' }}>
                <ChevronLeft size={14} />
              </button>
              <span className="text-sm px-3" style={{ color: 'rgba(255,255,255,0.6)' }}>{page} / {products.last_page}</span>
              <button onClick={() => setPage(p => Math.min(products.last_page, p + 1))} disabled={page === products.last_page} className="btn-ghost" style={{ padding: '0.4rem 0.6rem' }}>
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
