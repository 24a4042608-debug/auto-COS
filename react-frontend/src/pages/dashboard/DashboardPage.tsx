import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '@/lib/api';
import type { DashboardStats } from '@/types';
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
    <div className="glass-card p-5 hover:border-white/[0.1] transition-all group relative overflow-hidden glass-card-dashboard">
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
          {isSyncing ? 'Đang đồng bộ...' : 'Đòng bộ toàn sàn'}
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

      {/* Dashboard Grid - Three Balanced Rows */}
      <div className="space-y-6">

        {/* ROW 1: Analytics & Quick Actions (Height balanced ~260px) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left: Line Chart (2/3 width) */}
          <div className="glass-card p-5 flex flex-col justify-between lg:col-span-2 glass-card-dashboard">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wider text-white/50">Sản lượng sản phẩm</h3>
                <p className="text-[10px] text-white/35 mt-0.5">Xu hướng đăng tải sản phẩm 6 tháng qua</p>
              </div>
              <span className="text-[9px] font-semibold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 flex items-center gap-1">
                <TrendingUp size={10} /> +18.4%
              </span>
            </div>

            <div className="w-full flex gap-3 pt-4">
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
                      <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
                      <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.0" />
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

          {/* Right: Quick Actions (1/3 width, styled as premium cards to match chart height) */}
          <div className="glass-card p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-xs uppercase tracking-wider text-white/40">Tác vụ nhanh</h3>
              <p className="text-[10px] text-white/35 mt-0.5">Thực hiện nhanh các tác vụ hệ thống</p>
            </div>

            <div className="grid grid-cols-2 gap-2.5 mt-4 flex-1 justify-center">
              <Link href="/dashboard/import-export" className="flex flex-col items-start p-3 rounded-lg border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.06] transition-all group">
                <Upload size={14} className="text-indigo-400 mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-[11px] text-white font-medium">Nhập Excel</span>
                <span className="text-[8px] text-white/35 mt-0.5 line-clamp-1">Tải tệp sản phẩm</span>
              </Link>
              <Link href="/dashboard/media" className="flex flex-col items-start p-3 rounded-lg border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.06] transition-all group">
                <Image size={14} className="text-emerald-400 mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-[11px] text-white font-medium">Kho ảnh</span>
                <span className="text-[8px] text-white/35 mt-0.5 line-clamp-1">Quản lý hình ảnh</span>
              </Link>
              <button onClick={handleSyncAll} className="flex flex-col items-start p-3 rounded-lg border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.06] transition-all group text-left w-full bg-transparent cursor-pointer">
                <Sparkles size={14} className="text-purple-400 mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-[11px] text-white font-medium">Auto-Map</span>
                <span className="text-[8px] text-white/35 mt-0.5 line-clamp-1">Ánh xạ SKU ảnh</span>
              </button>
              <Link href="/dashboard/products/create" className="flex flex-col items-start p-3 rounded-lg border border-white/[0.03] bg-white/[0.01] hover:bg-white/[0.03] hover:border-white/[0.06] transition-all group">
                <Plus size={14} className="text-white/60 mb-2 group-hover:scale-105 transition-transform" />
                <span className="text-[11px] text-white font-medium">Thêm hàng</span>
                <span className="text-[8px] text-white/35 mt-0.5 line-clamp-1">Tạo sản phẩm mới</span>
              </Link>
            </div>
          </div>
        </div>

        {/* ROW 2: Recent Data & Operational Logs (Height balanced ~310px) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left: Recent Imports Table (2/3 width) */}
          <div className="glass-card overflow-hidden lg:col-span-2 flex flex-col justify-between">
            <div className="px-5 py-4 border-b border-white/[0.04] flex justify-between items-center bg-white/[0.01]">
              <div>
                <h3 className="font-semibold text-xs uppercase tracking-wider text-white/40">Lịch sử Nhập Excel (Import) gần đây</h3>
                <p className="text-[9px] text-white/30 mt-0.5">Danh sách các tệp dữ liệu đã tải lên hệ thống</p>
              </div>
              <Link href="/dashboard/import-export" className="text-[10px] text-indigo-400 hover:underline flex items-center gap-1">
                Xem tất cả <ArrowUpRight size={10} />
              </Link>
            </div>

            <div className="flex-1 min-h-[220px]">
              {!stats?.recent_imports?.length ? (
                <div className="flex flex-col items-center justify-center h-full py-12 text-white/30">
                  <Upload size={24} className="opacity-30 mb-2" />
                  <p className="text-xs">Chưa có phiên import nào</p>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="data-table">
                    <thead>
                      <tr>
                        <th className="text-[9px]">Tên tệp</th>
                        <th className="text-[9px]">Tổng dòng</th>
                        <th className="text-[9px]">Thành công</th>
                        <th className="text-[9px]">Trạng thái</th>
                        <th className="text-[9px]">Thời gian</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/[0.02]">
                      {stats.recent_imports.slice(0, 4).map((imp) => {
                        const cfg = importStatusConfig[imp.status];
                        return (
                          <tr key={imp.id} className="hover:bg-white/[0.01] transition-colors">
                            <td className="text-xs text-white font-medium max-w-[180px] truncate">{imp.original_filename}</td>
                            <td className="text-xs text-white/60">{imp.total_rows} dòng</td>
                            <td className="text-xs text-emerald-400 font-medium">{imp.success_rows} dòng</td>
                            <td><span className={`badge text-[9px] py-0.5 px-2 ${cfg.color}`}>{cfg.label}</span></td>
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

          {/* Right: Activity Timeline (1/3 width, height matching the table) */}
          <div className="glass-card p-5 flex flex-col justify-between">
            <div className="flex items-center gap-2 mb-4">
              <History size={13} className="text-white/40" />
              <h3 className="font-semibold text-xs uppercase tracking-wider text-white/40">Nhật ký hoạt động</h3>
            </div>

            <div className="flex-1 relative border-l border-white/[0.05] ml-2 pl-4 space-y-4 py-1 overflow-hidden">
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-emerald-500 ring-4 ring-[#07070c]" />
                <div className="text-xs font-medium text-white">Import hoàn thành</div>
                <div className="text-[9px] text-white/40 mt-0.5">Đã nhập 15 sản phẩm "Áo thun Cotton" cho ACOS Fashion.</div>
                <div className="text-[8px] text-white/25 mt-0.5">10 phút trước · Hệ thống</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-indigo-500 ring-4 ring-[#07070c]" />
                <div className="text-xs font-medium text-white">Đăng tải sản phẩm mới</div>
                <div className="text-[9px] text-white/40 mt-0.5">Đồng bộ thành công 4 biến thể của iPhone 15 Pro Max lên Shopee.</div>
                <div className="text-[8px] text-white/25 mt-0.5">2 giờ trước · Admin ACOS</div>
              </div>
              <div className="relative">
                <span className="absolute -left-[21px] top-1 w-2 h-2 rounded-full bg-purple-500 ring-4 ring-[#07070c]" />
                <div className="text-xs font-medium text-white">Tự động liên kết Media</div>
                <div className="text-[9px] text-white/40 mt-0.5">Auto-Map đã tự động ánh xạ 8 hình ảnh mới thông qua SKU.</div>
                <div className="text-[8px] text-white/25 mt-0.5">Hôm qua · Trợ lý AI</div>
              </div>
            </div>
          </div>
        </div>

        {/* ROW 3: AI Engine & Publishing Channel Statistics (Height balanced ~220px) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Left: AI Banner (2/3 width) */}
          <div className="glass-card p-5 relative overflow-hidden border border-purple-500/10 lg:col-span-2 flex flex-col justify-between">
            <div className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-5 pointer-events-none" style={{ background: 'radial-gradient(circle, #a78bfa, transparent)', filter: 'blur(50px)', transform: 'translate(30%, -30%)' }} />
            <div>
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
            </div>
            <div className="mt-4 flex gap-4 text-[9px] text-white/25 border-t border-white/[0.03] pt-3">
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-purple-400" /> Auto Crawl</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-purple-400" /> AI Generate SEO</span>
              <span className="flex items-center gap-1.5"><CheckCircle2 size={11} className="text-purple-400" /> Auto Publish</span>
            </div>
          </div>

          {/* Right: Publish History Bar Chart (1/3 width, height matching the AI card) */}
          <div className="glass-card p-5 flex flex-col justify-between">
            <div>
              <h3 className="font-semibold text-xs uppercase tracking-wider text-white/50">Lịch sử đăng tải</h3>
              <p className="text-[10px] text-white/35 mt-0.5">Số lượng sản phẩm đồng bộ lên các sàn</p>
            </div>

            {/* Custom CSS Bar Chart */}
            <div className="h-28 flex items-end justify-between gap-2 pt-2">
              {[
                { label: 'T2', val: 12, max: 20 },
                { label: 'T3', val: 8, max: 20 },
                { label: 'T4', val: 16, max: 20 },
                { label: 'T5', val: 4, max: 20 },
                { label: 'T6', val: 15, max: 20 },
                { label: 'T7', val: 19, max: 20 },
                { label: 'CN', val: 10, max: 20 },
              ].map((bar, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1.5 group cursor-pointer">
                  <div className="w-full relative rounded-t-xs transition-all duration-300 group-hover:opacity-80" style={{
                    height: `${(bar.val / bar.max) * 60}px`,
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
        </div>

      </div>
    </div>
  );
}
