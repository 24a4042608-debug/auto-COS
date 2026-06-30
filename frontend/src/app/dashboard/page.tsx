'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import api from '@/lib/api';
import { DashboardStats } from '@/types';
import { formatDate, importStatusConfig } from '@/lib/utils';
import { 
  Package, Image, Upload, TrendingUp, AlertCircle, CheckCircle2, 
  Clock, Zap, ArrowUpRight, Plus, Sparkles, RefreshCw, Layers, History, Play
} from 'lucide-react';

function StatCard({ title, value, sub, trend, icon: Icon }: {
  title: string; value: number | string; sub?: string; trend?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="glass-card p-5 hover:border-white/[0.1] transition-all group relative overflow-hidden">
      <div className="absolute top-0 right-0 w-24 h-24 rounded-full opacity-[0.02] group-hover:opacity-[0.05] pointer-events-none transition-opacity" style={{ background: 'radial-gradient(circle, #6366f1, transparent)', filter: 'blur(20px)' }} />
      <div className="flex justify-between items-start">
        <div>
          <span className="text-[10px] uppercase font-bold tracking-wider text-white/35">{title}</span>
          <div className="text-xl font-bold text-white mt-1.5 tracking-tight">{value.toLocaleString()}</div>
        </div>
        <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.04]" style={{ background: 'rgba(255,255,255,0.01)' }}>
          <Icon size={13} className="text-white/50" />
        </div>
      </div>
      {sub && (
        <div className="flex items-center gap-1.5 mt-3 text-[10px]">
          {trend && <span className="text-emerald-400 font-semibold">{trend}</span>}
          <span style={{ color: 'rgba(255,255,255,0.3)' }}>{sub}</span>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [isSyncing, setIsSyncing] = useState(false);

  const fetchStats = () => {
    setLoading(true);
    api.get('/dashboard/stats').then((res) => {
      setStats(res.data);
    }).finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSyncAll = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 1500);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="w-5 h-5 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6 w-full">
      {/* Page header */}
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-lg font-bold text-white tracking-tight">Tổng quan hệ thống</h1>
          <p className="text-[11px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
            Dữ liệu vận hành tự động cập nhật thời gian thực.
          </p>
        </div>
        <button 
          onClick={handleSyncAll} 
          disabled={isSyncing}
          className="btn-ghost text-[10px] font-medium py-1.5 px-3 flex items-center gap-1.5 hover:bg-white/[0.04] cursor-pointer"
        >
          <RefreshCw size={11} className={isSyncing ? 'animate-spin' : ''} />
          {isSyncing ? 'Đang đồng bộ...' : 'Đồng bộ toàn sàn'}
        </button>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Tổng sản phẩm"
          value={stats?.total_products ?? 0}
          trend="+8.2%"
          sub={`${stats?.active_products ?? 0} đang hiển thị trên các sàn`}
          icon={Package}
        />
        <StatCard
          title="Sản phẩm nháp"
          value={stats?.draft_products ?? 0}
          sub="Chờ phê duyệt nội dung AI"
          icon={Clock}
        />
        <StatCard
          title="Tổng tệp Media"
          value={stats?.total_assets ?? 0}
          trend="+15.4%"
          sub={`${stats?.unmapped_assets ?? 0} chưa liên kết sản phẩm`}
          icon={Image}
        />
        <StatCard
          title="Đã đăng hôm nay"
          value={12}
          trend="+25%"
          sub="Tải lên Shopee & Tiktok Shop"
          icon={CheckCircle2}
        />
      </div>

      {/* Main Dashboard Layout Grid (Single Grid prevents overlapping, Fluid Full Width) */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Column (2/3 width) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Product Growth Chart (Google Analytics Style) */}
          <div className="glass-card p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wider text-white/50">Sản lượng sản phẩm</h3>
                <p className="text-[10px] text-white/35 mt-0.5">Xu hướng đăng tải sản phẩm 6 tháng qua</p>
              </div>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <TrendingUp size={10} /> +18.4%
              </span>
            </div>
            
            {/* Google-style Chart Layout with Y-Axis Legend and Grid Lines */}
            <div className="w-full flex gap-3 pt-2">
              {/* Y-Axis labels */}
              <div className="flex flex-col justify-between text-[9px] text-white/25 text-right w-6 h-36 pr-1.5 select-none font-mono">
                <span>200</span>
                <span>150</span>
                <span>100</span>
                <span>50</span>
                <span>0</span>
              </div>

              {/* Chart Plot Area */}
              <div className="flex-1 relative">
                <svg className="w-full h-36" viewBox="0 0 500 120" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="chart-gradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15"/>
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0"/>
                    </linearGradient>
                  </defs>
                  
                  {/* Grid Lines */}
                  <line x1="0" y1="0" x2="500" y2="0" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="0" y1="30" x2="500" y2="30" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="0" y1="60" x2="500" y2="60" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="0" y1="90" x2="500" y2="90" stroke="rgba(255,255,255,0.03)" strokeWidth="1" strokeDasharray="2 2" />
                  <line x1="0" y1="120" x2="500" y2="120" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
                  
                  {/* Area */}
                  <path 
                    d="M 0 105 Q 50 90 100 95 T 200 55 T 300 70 T 400 30 T 500 15 L 500 120 L 0 120 Z" 
                    fill="url(#chart-gradient)" 
                  />
                  
                  {/* Line */}
                  <path 
                    d="M 0 105 Q 50 90 100 95 T 200 55 T 300 70 T 400 30 T 500 15" 
                    fill="none" 
                    stroke="#3b82f6" 
                    strokeWidth="1.5" 
                    strokeLinecap="round"
                  />
                  
                  {/* Hotspots */}
                  <circle cx="200" cy="55" r="2.5" fill="#60a5fa" stroke="#07070c" strokeWidth="1" />
                  <circle cx="400" cy="30" r="2.5" fill="#60a5fa" stroke="#07070c" strokeWidth="1" />
                  <circle cx="500" cy="15" r="2.5" fill="#60a5fa" stroke="#07070c" strokeWidth="1" />
                </svg>

                {/* X-Axis labels */}
                <div className="flex justify-between text-[9px] text-white/30 mt-2 px-0.5 select-none">
                  <span>Tháng 1</span>
                  <span>Tháng 2</span>
                  <span>Tháng 3</span>
                  <span>Tháng 4</span>
                  <span>Tháng 5</span>
                  <span>Tháng 6</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="glass-card p-5">
            <h3 className="font-semibold text-xs uppercase tracking-wider text-white/40 mb-4">Tác vụ nhanh</h3>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <Link href="/dashboard/import-export" className="flex flex-col items-center justify-center p-3.5 rounded-lg border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.06] transition-all text-center group">
                <Upload size={15} className="text-indigo-400 group-hover:scale-105 transition-transform" />
                <span className="text-[11px] text-white/70 mt-2 font-medium">Nhập Excel</span>
              </Link>
              <Link href="/dashboard/media" className="flex flex-col items-center justify-center p-3.5 rounded-lg border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.06] transition-all text-center group">
                <Image size={15} className="text-emerald-400 group-hover:scale-105 transition-transform" />
                <span className="text-[11px] text-white/70 mt-2 font-medium">Upload Media</span>
              </Link>
              <button onClick={handleSyncAll} className="flex flex-col items-center justify-center p-3.5 rounded-lg border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.06] transition-all text-center group bg-transparent cursor-pointer">
                <Sparkles size={15} className="text-purple-400 group-hover:scale-105 transition-transform" />
                <span className="text-[11px] text-white/70 mt-2 font-medium">Auto-Map SKU</span>
              </button>
              <Link href="/dashboard/products/create" className="flex flex-col items-center justify-center p-3.5 rounded-lg border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.06] transition-all text-center group">
                <Plus size={15} className="text-white/50 group-hover:scale-105 transition-transform" />
                <span className="text-[11px] text-white/70 mt-2 font-medium">Thêm sản phẩm</span>
              </Link>
            </div>
          </div>

          {/* AI Banner */}
          <div className="glass-card p-5 relative overflow-hidden border border-purple-500/10">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', filter: 'blur(50px)', transform: 'translate(30%, -30%)' }} />
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg flex items-center justify-center border border-purple-500/20" style={{ background: 'rgba(167,139,250,0.06)' }}>
                <Zap size={13} className="text-purple-400 fill-purple-400" />
              </div>
              <div>
                <h3 className="font-semibold text-xs text-white">AI Content Engine</h3>
                <p className="text-[9px] text-white/35 mt-0.5">Tự động hóa toàn bộ quy trình viết bài & tối ưu SEO</p>
              </div>
              <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-purple-500/15 text-purple-300 border border-purple-500/25 ml-auto">
                Sắp ra mắt
              </span>
            </div>
            <p className="text-xs leading-relaxed" style={{ color: 'rgba(255,255,255,0.4)' }}>
              Trợ lý AI sẽ tự động phân tích từ khóa hot trên thị trường, crawl sản phẩm từ các đối thủ, tự sinh tiêu đề, mô tả và tối ưu SEO hình ảnh trước khi đồng bộ lên Shopee/TikTok Shop.
            </p>
            <div className="mt-4 flex gap-4 text-[9px] text-white/25 border-t border-white/[0.03] pt-4">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-purple-400" /> Auto Crawl</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-purple-400" /> AI Generate SEO</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-purple-400" /> Auto Publish</span>
            </div>
          </div>

          {/* Recent Imports */}
          <div className="glass-card overflow-hidden">
            <div className="px-5 py-4 border-b border-white/[0.04] flex justify-between items-center">
              <h3 className="font-semibold text-xs uppercase tracking-wider text-white/40">Import gần đây</h3>
              <Link href="/dashboard/import-export" className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1">
                Xem tất cả <ArrowUpRight size={10} />
              </Link>
            </div>
            {!stats?.recent_imports?.length ? (
              <div className="text-center py-8" style={{ color: 'rgba(255,255,255,0.3)' }}>
                <Upload size={24} className="mx-auto mb-2 opacity-30" />
                <p className="text-xs">Chưa có phiên import nào</p>
              </div>
            ) : (
              <div className="divide-y divide-white/[0.03]">
                {stats.recent_imports.slice(0, 3).map((imp) => {
                  const cfg = importStatusConfig[imp.status];
                  return (
                    <div key={imp.id} className="flex items-center justify-between p-4 hover:bg-white/[0.01] transition-colors">
                      <div className="flex items-center gap-3 min-w-0">
                        <Upload size={13} className="text-white/30" />
                        <div className="min-w-0">
                          <div className="text-xs font-medium text-white truncate">{imp.original_filename}</div>
                          <div className="text-[10px] mt-0.5" style={{ color: 'rgba(255,255,255,0.35)' }}>
                            {imp.success_rows}/{imp.total_rows} dòng thành công · {formatDate(imp.created_at)}
                          </div>
                        </div>
                      </div>
                      <span className={`badge text-[10px] ${cfg.color}`}>{cfg.label}</span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* Right Column (1/3 width) */}
        <div className="space-y-6">
          {/* Publish History Bar Chart (Google Analytics style) */}
          <div className="glass-card p-5 space-y-4">
            <div>
              <h3 className="font-semibold text-xs uppercase tracking-wider text-white/50">Lịch sử đăng tải</h3>
              <p className="text-[10px] text-white/35 mt-0.5">Số lượng sản phẩm đồng bộ lên các sàn</p>
            </div>
            
            {/* Custom CSS Bar Chart */}
            <div className="h-36 flex items-end justify-between gap-2.5 pt-3">
              {[
                { label: 'T2', val: 12, max: 20 },
                { label: 'T3', val: 8, max: 20 },
                { label: 'T4', val: 16, max: 20 },
                { label: 'T5', val: 4, max: 20 },
                { label: 'T6', val: 15, max: 20 },
                { label: 'T7', val: 19, max: 20 },
                { label: 'CN', val: 10, max: 20 },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-pointer">
                  <div className="w-full relative rounded-t-xs transition-all duration-300 group-hover:opacity-80" style={{ 
                    height: `${(bar.val / bar.max) * 90}px`,
                    background: i === 5 ? 'linear-gradient(to top, #8b5cf6, #c084fc)' : 'linear-gradient(to top, #3b82f6, #60a5fa)'
                  }}>
                    <div className="opacity-0 group-hover:opacity-100 absolute -top-7 left-1/2 -translate-x-1/2 bg-white text-[#07070c] text-[9px] font-bold px-1.5 py-0.5 rounded shadow-lg transition-opacity pointer-events-none whitespace-nowrap z-10">
                      {bar.val} SP
                    </div>
                  </div>
                  <span className="text-[9px] text-white/30 font-medium">{bar.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="glass-card p-5">
            <div className="flex items-center gap-2 mb-5">
              <History size={13} className="text-white/40" />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-white/40">Nhật ký hoạt động</h3>
            </div>
            
            <div className="relative border-l border-white/[0.05] ml-2 pl-4 space-y-5 py-1">
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-[#07070c]" />
                <div className="text-xs font-medium text-white">Import hoàn thành</div>
                <div className="text-[10px] text-white/50 mt-1">Đã nhập 15 sản phẩm "Áo thun Cotton" cho ACOS Fashion.</div>
                <div className="text-[9px] text-white/30 mt-1">10 phút trước · Hệ thống</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-[#07070c]" />
                <div className="text-xs font-medium text-white">Đăng tải sản phẩm mới</div>
                <div className="text-[10px] text-white/50 mt-1">Đồng bộ thành công 4 biến thể của iPhone 15 Pro Max lên Shopee.</div>
                <div className="text-[9px] text-white/30 mt-1">2 giờ trước · Admin ACOS</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-purple-500 ring-4 ring-[#07070c]" />
                <div className="text-xs font-medium text-white">Tự động liên kết Media</div>
                <div className="text-[10px] text-white/50 mt-1">Auto-Map đã tự động ánh xạ 8 hình ảnh mới thông qua mã SKU.</div>
                <div className="text-[9px] text-white/30 mt-1">Hôm qua · Trợ lý AI</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-amber-500 ring-4 ring-[#07070c]" />
                <div className="text-xs font-medium text-white">Đồng bộ TikTok Shop bị lỗi</div>
                <div className="text-[10px] text-white/50 mt-1">SKU TS-ACTIVE-BLK-L bị lỗi định dạng giá bán từ TikTok API.</div>
                <div className="text-[9px] text-white/30 mt-1">3 ngày trước · Hệ thống</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
