'use client';

import { useEffect, useState } from 'react';
import api from '@/lib/api';
import { DashboardStats } from '@/types';
import { formatDate, importStatusConfig } from '@/lib/utils';
import { Package, Image, Upload, TrendingUp, AlertCircle, CheckCircle2, Clock, Zap } from 'lucide-react';

function StatCard({ title, value, sub, icon: Icon, color }: {
  title: string; value: number | string; sub?: string;
  icon: React.ElementType; color: string;
}) {
  return (
    <div className="glass-card p-5 flex items-start gap-4">
      <div className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0" style={{ background: color }}>
        <Icon size={18} className="text-white" />
      </div>
      <div>
        <div className="text-2xl font-bold text-white">{value.toLocaleString()}</div>
        <div className="text-sm font-medium text-white/80">{title}</div>
        {sub && <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>{sub}</div>}
      </div>
    </div>
  );
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get('/dashboard/stats').then((res) => {
      setStats(res.data);
    }).finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 rounded-full border-2 border-indigo-500 border-t-transparent animate-spin" />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div>
        <h1 className="text-2xl font-bold text-white">Tổng quan</h1>
        <p className="text-sm mt-1" style={{ color: 'rgba(255,255,255,0.45)' }}>
          Xin chào! Đây là tóm tắt hoạt động của hệ thống hôm nay.
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        <StatCard
          title="Tổng sản phẩm"
          value={stats?.total_products ?? 0}
          sub={`${stats?.active_products ?? 0} đang bán`}
          icon={Package}
          color="linear-gradient(135deg, #6366f1, #8b5cf6)"
        />
        <StatCard
          title="Sản phẩm nháp"
          value={stats?.draft_products ?? 0}
          sub="Chờ xem xét & kích hoạt"
          icon={Clock}
          color="linear-gradient(135deg, #f59e0b, #d97706)"
        />
        <StatCard
          title="Tổng Media"
          value={stats?.total_assets ?? 0}
          sub={`${stats?.unmapped_assets ?? 0} chưa liên kết`}
          icon={Image}
          color="linear-gradient(135deg, #10b981, #059669)"
        />
        <StatCard
          title="Lần Import gần nhất"
          value={stats?.recent_imports?.length ?? 0}
          sub="Phiên import gần đây"
          icon={Upload}
          color="linear-gradient(135deg, #ec4899, #db2777)"
        />
      </div>

      {/* Quick overview cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI banner */}
        <div className="glass-card p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-48 h-48 rounded-full opacity-10 pointer-events-none" style={{ background: 'radial-gradient(circle, #6366f1, transparent)', filter: 'blur(40px)', transform: 'translate(30%, -30%)' }} />
          <div className="flex items-center gap-3 mb-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
              <Zap size={16} className="text-white" />
            </div>
            <h3 className="font-semibold text-white">AI Content Engine</h3>
            <span className="badge ml-auto" style={{ background: 'rgba(99,102,241,0.15)', color: '#818cf8', border: '1px solid rgba(99,102,241,0.3)' }}>
              Sắp ra mắt
            </span>
          </div>
          <p className="text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.55)' }}>
            Hệ thống AI sẽ tự động cào dữ liệu đối thủ, tự tạo tiêu đề & mô tả chuẩn SEO,
            tối ưu hóa từ khóa và tự động đăng lên các sàn TMĐT mà không cần can thiệp thủ công.
          </p>
          <div className="mt-4 flex gap-4 text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} style={{ color: '#6366f1' }} /> Auto Crawl</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} style={{ color: '#6366f1' }} /> AI Generate SEO</span>
            <span className="flex items-center gap-1.5"><CheckCircle2 size={12} style={{ color: '#6366f1' }} /> Auto Publish</span>
          </div>
        </div>

        {/* Recent imports */}
        <div className="glass-card p-6">
          <h3 className="font-semibold text-white mb-4">Import gần đây</h3>
          {!stats?.recent_imports?.length ? (
            <div className="text-center py-8" style={{ color: 'rgba(255,255,255,0.35)' }}>
              <Upload size={32} className="mx-auto mb-2 opacity-40" />
              <p className="text-sm">Chưa có phiên import nào</p>
            </div>
          ) : (
            <div className="space-y-2">
              {stats.recent_imports.map((imp) => {
                const cfg = importStatusConfig[imp.status];
                return (
                  <div key={imp.id} className="flex items-center gap-3 p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
                    <Upload size={14} style={{ color: 'rgba(255,255,255,0.4)' }} />
                    <div className="flex-1 min-w-0">
                      <div className="text-sm text-white truncate">{imp.original_filename}</div>
                      <div className="text-xs mt-0.5" style={{ color: 'rgba(255,255,255,0.4)' }}>
                        {imp.success_rows}/{imp.total_rows} dòng · {formatDate(imp.created_at)}
                      </div>
                    </div>
                    <span className={`badge text-xs ${cfg.color}`}>{cfg.label}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
