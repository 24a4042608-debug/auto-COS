'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  Zap, LayoutDashboard, Package, Image, Upload, Tag,
  Building2, Truck, LogOut, ChevronRight, Bell, User, Menu, X,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
  { href: '/dashboard/products', label: 'Sản phẩm', icon: Package },
  { href: '/dashboard/media', label: 'Media Center', icon: Image },
  { href: '/dashboard/import-export', label: 'Import / Export', icon: Upload },
  { href: '/dashboard/categories', label: 'Danh mục', icon: Tag },
  { href: '/dashboard/brands', label: 'Thương hiệu', icon: Building2 },
  { href: '/dashboard/suppliers', label: 'Nhà cung cấp', icon: Truck },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('acos_token');
    if (!token) {
      router.replace('/login');
      return;
    }
    const u = localStorage.getItem('acos_user');
    if (u) setUser(JSON.parse(u));
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('acos_token');
    localStorage.removeItem('acos_user');
    router.replace('/login');
  };

  return (
    <div className="flex min-h-screen" style={{ background: '#0a0a0f' }}>
      {/* Sidebar */}
      <aside className={`sidebar fixed lg:relative z-40 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        {/* Logo */}
        <div className="flex items-center gap-3 px-5 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: 'linear-gradient(135deg, #6366f1, #8b5cf6)' }}>
            <Zap size={16} className="text-white" />
          </div>
          <div>
            <div className="font-bold text-sm gradient-text">ACOS</div>
            <div className="text-xs" style={{ color: 'rgba(255,255,255,0.35)' }}>Auto Commerce OS</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 group"
                style={{
                  background: isActive ? 'rgba(99,102,241,0.15)' : 'transparent',
                  color: isActive ? '#818cf8' : 'rgba(255,255,255,0.55)',
                  border: isActive ? '1px solid rgba(99,102,241,0.2)' : '1px solid transparent',
                }}
              >
                <Icon size={16} />
                <span className="flex-1">{item.label}</span>
                {isActive && <ChevronRight size={12} />}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="p-3 border-t" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg" style={{ background: 'rgba(255,255,255,0.03)' }}>
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)' }}>
              {user?.name?.[0] ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium text-white truncate">{user?.name ?? '...'}</div>
              <div className="text-xs truncate" style={{ color: 'rgba(255,255,255,0.35)' }}>{user?.email ?? ''}</div>
            </div>
            <button onClick={handleLogout} className="transition-colors" style={{ color: 'rgba(255,255,255,0.35)', background: 'none', border: 'none', cursor: 'pointer' }} title="Đăng xuất">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden" style={{ background: 'rgba(0,0,0,0.5)' }} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Header */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-4" style={{ background: 'rgba(10,10,15,0.8)', borderBottom: '1px solid rgba(255,255,255,0.06)', backdropFilter: 'blur(12px)' }}>
          <button className="lg:hidden" style={{ color: 'rgba(255,255,255,0.6)', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setSidebarOpen(!sidebarOpen)}>
            {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
          <div className="flex-1" />
          <div className="flex items-center gap-3">
            <button className="w-9 h-9 rounded-lg flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.5)', cursor: 'pointer' }}>
              <Bell size={16} />
            </button>
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold" style={{ background: 'linear-gradient(135deg, #6366f1, #a78bfa)' }}>
              {user?.name?.[0] ?? 'A'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 animate-fade-in">
          {children}
        </main>
      </div>
    </div>
  );
}
