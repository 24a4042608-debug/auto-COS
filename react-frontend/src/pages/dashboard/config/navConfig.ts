import {
  LayoutDashboard, Package, Tag, Building2, Truck,
  Globe, Image, Upload, Settings,
  Film, GraduationCap, Newspaper, CalendarDays, Video,
  type LucideIcon,
} from 'lucide-react';

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
  badge?: string;
}

export interface NavGroup {
  title: string;
  items: NavItem[];
}

export interface Platform {
  id: string;
  label: string;
  icon: LucideIcon;
  color: string;       // accent color for active state
  bgColor: string;     // subtle bg for icon
  navGroups: NavGroup[];
}

// ── Shared nav groups dùng chung nhiều platform ──────────────────────
const sharedGroups: NavGroup[] = [
  {
    title: 'Tiện ích',
    items: [
      { href: '/admin/media',         label: 'Media Center',   icon: Image },
      { href: '/admin/import-export', label: 'Import / Export', icon: Upload },
      { href: '/admin/publisher',     label: 'Publisher',       icon: Globe },
    ],
  },
  {
    title: 'Hệ thống',
    items: [
      { href: '/admin/settings', label: 'Cài đặt', icon: Settings },
    ],
  },
];

// ── Platform definitions ─────────────────────────────────────────────
export const platforms: Platform[] = [
  {
    id: 'global',
    label: 'Tổng quan',
    icon: LayoutDashboard,
    color: '#6366f1',
    bgColor: 'rgba(99,102,241,0.12)',
    navGroups: [
      {
        title: 'Bảng điều khiển',
        items: [
          { href: '/admin', label: 'Tổng quan hệ thống', icon: LayoutDashboard },
        ],
      },
      ...sharedGroups,
    ],
  },
  {
    id: 'fashion',
    label: 'Fashion',
    icon: Package,
    color: '#8b5cf6',
    bgColor: 'rgba(139,92,246,0.12)',
    navGroups: [
      {
        title: 'Quản lý sản phẩm',
        items: [
          { href: '/admin/products',   label: 'Sản phẩm',       icon: Package },
          { href: '/admin/categories', label: 'Danh mục',        icon: Tag },
          { href: '/admin/brands',     label: 'Thương hiệu',     icon: Building2 },
          { href: '/admin/suppliers',  label: 'Nhà cung cấp',    icon: Truck },
        ],
      },
      ...sharedGroups,
    ],
  },
  {
    id: 'film',
    label: 'Film',
    icon: Film,
    color: '#ef4444',
    bgColor: 'rgba(239,68,68,0.12)',
    navGroups: [
      {
        title: 'Quản lý nội dung',
        items: [
          { href: '/admin/film',              label: 'Tổng quan Film',  icon: Film },
          { href: '/admin/film/movies',       label: 'Phim & Series',   icon: Film },
          { href: '/admin/film/categories',   label: 'Thể loại',        icon: Tag },
        ],
      },
      ...sharedGroups,
    ],
  },
  {
    id: 'education',
    label: 'Education',
    icon: GraduationCap,
    color: '#10b981',
    bgColor: 'rgba(16,185,129,0.12)',
    navGroups: [
      {
        title: 'Quản lý khóa học',
        items: [
          { href: '/admin/education',            label: 'Tổng quan',      icon: GraduationCap },
          { href: '/admin/education/courses',    label: 'Khóa học',       icon: GraduationCap },
          { href: '/admin/education/categories', label: 'Danh mục',       icon: Tag },
        ],
      },
      ...sharedGroups,
    ],
  },
  {
    id: 'news',
    label: 'News',
    icon: Newspaper,
    color: '#f59e0b',
    bgColor: 'rgba(245,158,11,0.12)',
    navGroups: [
      {
        title: 'Quản lý bài viết',
        items: [
          { href: '/admin/news',            label: 'Tổng quan',    icon: Newspaper },
          { href: '/admin/news/articles',   label: 'Bài viết',     icon: Newspaper },
          { href: '/admin/news/categories', label: 'Danh mục',     icon: Tag },
        ],
      },
      ...sharedGroups,
    ],
  },
  {
    id: 'booking',
    label: 'Booking',
    icon: CalendarDays,
    color: '#06b6d4',
    bgColor: 'rgba(6,182,212,0.12)',
    navGroups: [
      {
        title: 'Quản lý đặt lịch',
        items: [
          { href: '/admin/booking',          label: 'Tổng quan',    icon: CalendarDays },
          { href: '/admin/booking/services', label: 'Dịch vụ',      icon: CalendarDays },
          { href: '/admin/booking/orders',   label: 'Lịch đặt',     icon: Tag },
        ],
      },
      ...sharedGroups,
    ],
  },
  {
    id: 'vlog',
    label: 'Vlog',
    icon: Video,
    color: '#f97316',
    bgColor: 'rgba(249,115,22,0.12)',
    navGroups: [
      {
        title: 'Quản lý video',
        items: [
          { href: '/admin/vlog',           label: 'Tổng quan',    icon: Video },
          { href: '/admin/vlog/videos',    label: 'Video',         icon: Video },
          { href: '/admin/vlog/creators',  label: 'Creator',       icon: Building2 },
        ],
      },
      ...sharedGroups,
    ],
  },
];

// ── Helper: detect active platform from pathname ─────────────────────
export function detectPlatformFromPath(pathname: string): string {
  if (pathname.startsWith('/admin/film'))      return 'film';
  if (pathname.startsWith('/admin/education')) return 'education';
  if (pathname.startsWith('/admin/news'))      return 'news';
  if (pathname.startsWith('/admin/booking'))   return 'booking';
  if (pathname.startsWith('/admin/vlog'))      return 'vlog';
  if (
    pathname.startsWith('/admin/products') ||
    pathname.startsWith('/admin/categories') ||
    pathname.startsWith('/admin/brands') ||
    pathname.startsWith('/admin/suppliers')
  ) return 'fashion';
  return 'global';
}
