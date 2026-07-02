import { Film, TrendingUp, Eye, Star, PlayCircle, Plus } from 'lucide-react';

const stats = [
  { label: 'Phim & Series',    value: '—',  icon: Film,        color: '#ef4444' },
  { label: 'Lượt xem tháng',  value: '—',  icon: Eye,         color: '#f97316' },
  { label: 'Đánh giá TB',     value: '—',  icon: Star,        color: '#f59e0b' },
  { label: 'Đang phát sóng',  value: '—',  icon: PlayCircle,  color: '#10b981' },
];

export default function FilmAdminPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>Film Admin</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Quản lý nội dung phim, series và danh mục.</p>
        </div>
        <button style={primaryBtnStyle('#ef4444')}>
          <Plus size={14} /> Thêm phim
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {stats.map(s => (
          <StatCard key={s.label} {...s} />
        ))}
      </div>

      {/* Coming Soon */}
      <ComingSoon
        icon={<Film size={40} style={{ color: '#ef4444' }} />}
        title="Quản lý Film"
        desc="Tính năng quản lý phim, series, thể loại và phụ đề đang được phát triển."
        color="#ef4444"
      />
    </div>
  );
}

// ── Education ──────────────────────────────────────────────────────────

import { GraduationCap, BookOpen, Users, Award } from 'lucide-react';

const eduStats = [
  { label: 'Khóa học',        value: '—', icon: GraduationCap, color: '#10b981' },
  { label: 'Học viên',        value: '—', icon: Users,         color: '#06b6d4' },
  { label: 'Bài học',         value: '—', icon: BookOpen,      color: '#8b5cf6' },
  { label: 'Hoàn thành',      value: '—', icon: Award,         color: '#f59e0b' },
];

export function EducationAdminPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>Education Admin</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Quản lý khóa học, học viên và nội dung giảng dạy.</p>
        </div>
        <button style={primaryBtnStyle('#10b981')}>
          <Plus size={14} /> Thêm khóa học
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {eduStats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <ComingSoon
        icon={<GraduationCap size={40} style={{ color: '#10b981' }} />}
        title="Quản lý Education"
        desc="Tính năng quản lý khóa học, bài giảng và học viên đang được phát triển."
        color="#10b981"
      />
    </div>
  );
}

// ── News ──────────────────────────────────────────────────────────────

import { Newspaper, FileText, MessageSquare, BarChart2 } from 'lucide-react';

const newsStats = [
  { label: 'Bài viết',        value: '—', icon: FileText,      color: '#f59e0b' },
  { label: 'Danh mục',        value: '—', icon: Newspaper,     color: '#f97316' },
  { label: 'Bình luận',       value: '—', icon: MessageSquare, color: '#6366f1' },
  { label: 'Lượt xem',        value: '—', icon: BarChart2,     color: '#10b981' },
];

export function NewsAdminPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>News Admin</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Quản lý bài viết, tin tức và danh mục nội dung.</p>
        </div>
        <button style={primaryBtnStyle('#f59e0b')}>
          <Plus size={14} /> Viết bài mới
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {newsStats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <ComingSoon
        icon={<Newspaper size={40} style={{ color: '#f59e0b' }} />}
        title="Quản lý News"
        desc="Tính năng quản lý bài viết, phân loại tin tức và xuất bản nội dung đang được phát triển."
        color="#f59e0b"
      />
    </div>
  );
}

// ── Booking ──────────────────────────────────────────────────────────

import { CalendarDays, Clock, CheckCircle2, XCircle } from 'lucide-react';

const bookingStats = [
  { label: 'Dịch vụ',         value: '—', icon: CalendarDays, color: '#06b6d4' },
  { label: 'Lịch hôm nay',    value: '—', icon: Clock,        color: '#8b5cf6' },
  { label: 'Đã xác nhận',     value: '—', icon: CheckCircle2, color: '#10b981' },
  { label: 'Đã hủy',          value: '—', icon: XCircle,      color: '#ef4444' },
];

export function BookingAdminPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>Booking Admin</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Quản lý dịch vụ, lịch đặt và xác nhận booking.</p>
        </div>
        <button style={primaryBtnStyle('#06b6d4')}>
          <Plus size={14} /> Thêm dịch vụ
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {bookingStats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <ComingSoon
        icon={<CalendarDays size={40} style={{ color: '#06b6d4' }} />}
        title="Quản lý Booking"
        desc="Tính năng quản lý dịch vụ, lịch đặt và xử lý booking đang được phát triển."
        color="#06b6d4"
      />
    </div>
  );
}

// ── Vlog ─────────────────────────────────────────────────────────────

import { Video, ThumbsUp, Share2 } from 'lucide-react';

const vlogStats = [
  { label: 'Video',            value: '—', icon: Video,        color: '#f97316' },
  { label: 'Lượt xem',        value: '—', icon: TrendingUp,   color: '#ef4444' },
  { label: 'Thích',           value: '—', icon: ThumbsUp,     color: '#f59e0b' },
  { label: 'Chia sẻ',         value: '—', icon: Share2,       color: '#10b981' },
];

export function VlogAdminPage() {
  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '28px' }}>
        <div>
          <h1 style={{ fontSize: '22px', fontWeight: 700, color: 'rgba(255,255,255,0.92)' }}>Vlog Admin</h1>
          <p style={{ fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '4px' }}>Quản lý video, creator và nội dung vlog.</p>
        </div>
        <button style={primaryBtnStyle('#f97316')}>
          <Plus size={14} /> Thêm video
        </button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '14px', marginBottom: '28px' }}>
        {vlogStats.map(s => <StatCard key={s.label} {...s} />)}
      </div>
      <ComingSoon
        icon={<Video size={40} style={{ color: '#f97316' }} />}
        title="Quản lý Vlog"
        desc="Tính năng quản lý video, kênh creator và phân tích nội dung đang được phát triển."
        color="#f97316"
      />
    </div>
  );
}

// ── Shared Sub-components ─────────────────────────────────────────────

function StatCard({ label, value, icon: Icon, color }: { label: string; value: string; icon: React.ElementType; color: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.015)', border: '1px solid rgba(255,255,255,0.06)',
      borderRadius: '12px', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: '10px', fontWeight: 700, color: 'rgba(255,255,255,0.35)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>{label}</span>
        <div style={{ width: '28px', height: '28px', borderRadius: '8px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Icon size={13} style={{ color }} />
        </div>
      </div>
      <div style={{ fontSize: '22px', fontWeight: 700, color: 'rgba(255,255,255,0.85)' }}>{value}</div>
    </div>
  );
}

function ComingSoon({ icon, title, desc, color }: { icon: React.ReactNode; title: string; desc: string; color: string }) {
  return (
    <div style={{
      background: 'rgba(255,255,255,0.01)', border: '1px dashed rgba(255,255,255,0.08)',
      borderRadius: '16px', padding: '60px 24px', textAlign: 'center',
      display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px',
    }}>
      <div style={{
        width: '72px', height: '72px', borderRadius: '20px',
        background: `${color}10`, border: `1px solid ${color}25`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        {icon}
      </div>
      <div>
        <div style={{ fontSize: '16px', fontWeight: 700, color: 'rgba(255,255,255,0.8)', marginBottom: '8px' }}>{title}</div>
        <div style={{ fontSize: '13px', color: 'rgba(255,255,255,0.35)', maxWidth: '380px', lineHeight: 1.6 }}>{desc}</div>
      </div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: '6px',
        padding: '5px 12px', borderRadius: '20px',
        background: `${color}10`, border: `1px solid ${color}20`,
        fontSize: '11px', fontWeight: 600, color,
      }}>
        🚧 Đang phát triển
      </div>
    </div>
  );
}

function primaryBtnStyle(color: string): React.CSSProperties {
  return {
    display: 'inline-flex', alignItems: 'center', gap: '6px',
    padding: '8px 16px', borderRadius: '8px',
    background: `${color}15`, border: `1px solid ${color}30`,
    color, fontSize: '12px', fontWeight: 600, cursor: 'pointer',
    transition: 'all 0.15s',
  };
}
