import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useEffect, useState, useRef } from 'react';

import {
  Zap, LayoutDashboard, Package, Image, Upload, Tag,
  Building2, Truck, LogOut, ChevronRight, Bell, User, Menu, X,
  Search, Command, Sparkles, Settings, HelpCircle, CheckCircle, AlertTriangle, Globe
} from 'lucide-react';

const navGroups = [
  {
    title: 'Bảng điều khiển',
    items: [
      { href: '/dashboard', label: 'Tổng quan', icon: LayoutDashboard },
    ],
  },
  {
    title: 'Quản lý sản phẩm',
    items: [
      { href: '/dashboard/products', label: 'Sản phẩm', icon: Package },
      { href: '/dashboard/categories', label: 'Danh mục', icon: Tag },
      { href: '/dashboard/brands', label: 'Thương hiệu', icon: Building2 },
      { href: '/dashboard/suppliers', label: 'Nhà cung cấp', icon: Truck },
    ],
  },
  {
    title: 'Kênh đăng & Tiện ích',
    items: [
      { href: '/dashboard/publisher', label: 'Đăng tải', icon: Globe },
      { href: '/dashboard/media', label: 'Media Center', icon: Image },
      { href: '/dashboard/import-export', label: 'Import / Export', icon: Upload },
    ],
  },
  {
    title: 'Hệ thống',
    items: [
      { href: '/dashboard/settings', label: 'Cài đặt', icon: Settings },
    ],
  },
];

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);

  const commandInputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setUser({ name: 'Admin ACOS', email: 'admin@acos.vn' });

    // Initialize Theme
    const savedTheme = localStorage.getItem('acos_theme') || 'dark';
    const html = document.documentElement;
    if (savedTheme === 'light') {
      html.classList.remove('dark');
      html.classList.add('light');
    } else {
      html.classList.remove('light');
      html.classList.add('dark');
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'k') {
        e.preventDefault();
        setIsCommandOpen(open => !open);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(e.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (isCommandOpen) {
      setTimeout(() => commandInputRef.current?.focus(), 50);
      setCommandSearch('');
      setFocusedIndex(0);
    }
  }, [isCommandOpen]);

  const handleLogout = () => {
    localStorage.removeItem('acos_token');
    localStorage.removeItem('acos_user');
    navigate('/login');
  };

  const filteredCommands = [
    { label: 'Đi tới Tổng quan', action: () => navigate('/dashboard'), icon: LayoutDashboard, category: 'Điều hướng' },
    { label: 'Đi tới Sản phẩm', action: () => navigate('/dashboard/products'), icon: Package, category: 'Điều hướng' },
    { label: 'Đi tới Media Center', action: () => navigate('/dashboard/media'), icon: Image, category: 'Điều hướng' },
    { label: 'Đi tới Import / Export', action: () => navigate('/dashboard/import-export'), icon: Upload, category: 'Điều hướng' },
    { label: 'Thêm sản phẩm mới', action: () => navigate('/dashboard/products/create'), icon: Zap, category: 'Tác vụ nhanh' },
    { label: 'Tự động liên kết ảnh (Auto-map)', action: () => { navigate('/dashboard/media'); }, icon: Sparkles, category: 'Tác vụ nhanh' },
    { label: 'Cài đặt hệ thống', action: () => navigate('/dashboard/settings'), icon: Settings, category: 'Hệ thống' },
    { label: 'Đăng xuất tài khoản', action: handleLogout, icon: LogOut, category: 'Hệ thống' },
  ].filter(cmd => cmd.label.toLowerCase().includes(commandSearch.toLowerCase()));

  const handleCommandKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setFocusedIndex(prev => (prev + 1) % filteredCommands.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setFocusedIndex(prev => (prev - 1 + filteredCommands.length) % filteredCommands.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      if (filteredCommands[focusedIndex]) {
        filteredCommands[focusedIndex].action();
        setIsCommandOpen(false);
      }
    } else if (e.key === 'Escape') {
      setIsCommandOpen(false);
    }
  };

  const notifications = [
    { id: 1, title: 'Import hoàn thành', desc: 'Đã nhập thành công 50 sản phẩm thời trang.', time: '10 phút trước', type: 'success', icon: CheckCircle },
    { id: 2, title: 'Đồng bộ Shopee lỗi', desc: 'Sản phẩm SKU TS-ACTIVE-BLK-M lỗi giá bán.', time: '1 giờ trước', type: 'error', icon: AlertTriangle },
    { id: 3, title: 'Ảnh chưa liên kết', desc: 'Có 12 tệp tin phương tiện mới chưa được map.', time: 'Hôm qua', type: 'warning', icon: Sparkles },
  ];

  const getGuideContent = (path: string) => {
    if (path === '/dashboard') {
      return {
        title: 'Hướng dẫn: Tổng quan hệ thống',
        steps: [
          'Bảng điều khiển cung cấp thống kê nhanh về Sản phẩm, Tài nguyên và lịch sử Nhập hàng.',
          'Biểu đồ và các con số giúp bạn theo dõi nhanh trạng thái của kho hàng.',
          'Nhấn nút "Tác vụ nhanh" ở góc hoặc phím tắt Ctrl+K để mở nhanh công cụ tìm kiếm lệnh.'
        ]
      };
    }
    if (path === '/dashboard/products') {
      return {
        title: 'Hướng dẫn: Quản lý Sản phẩm',
        steps: [
          'Danh sách hiển thị toàn bộ sản phẩm trong hệ thống với SKU, Giá bán và Tồn kho.',
          'Bạn có thể lọc sản phẩm theo trạng thái (Đang bán, Nháp, Ngừng bán).',
          'Nhấp vào biểu tượng con mắt để xem chi tiết, nhấp Chỉnh sửa để sửa hoặc Xóa để xóa.',
          'Nhấn "Thêm sản phẩm" ở góc trên để tạo sản phẩm mới.'
        ]
      };
    }
    if (path === '/dashboard/products/create' || path.includes('/edit')) {
      return {
        title: 'Hướng dẫn: Thêm & Sửa sản phẩm',
        steps: [
          'Điền đầy đủ các thông tin bắt buộc (SKU, Tên sản phẩm, Giá bán).',
          'Khu vực Hình ảnh cho phép tải lên 1 ảnh chính và nhiều ảnh phụ. Ảnh sẽ được tự động lưu vào dự án.',
          'Gộp phần Mô tả (ngắn & chi tiết) và SEO dưới dạng các ô nhập liệu trực quan.',
          'Thêm biến thể nếu sản phẩm có nhiều phân loại (Màu sắc, Kích thước).',
          'Thanh chức năng Lưu/Hủy luôn được cố định ở chân trang để tiện thao tác.'
        ]
      };
    }
    if (path === '/dashboard/categories') {
      return {
        title: 'Hướng dẫn: Quản lý Danh mục',
        steps: [
          'Trang này quản lý cây danh mục sản phẩm theo dạng phân cấp.',
          'Khi thêm danh mục mới, bạn có thể chọn "Danh mục cha" được hiển thị dạng cây thụt lề.',
          'Để xóa danh mục, di chuột vào tên danh mục và click nút Xóa (màu đỏ).'
        ]
      };
    }
    if (path === '/dashboard/brands') {
      return {
        title: 'Hướng dẫn: Quản lý Thương hiệu',
        steps: [
          'Quản lý danh sách các thương hiệu sản phẩm của bạn.',
          'Cho phép Thêm mới thương hiệu kèm Logo và Mô tả ngắn.',
          'Hỗ trợ Sửa trực tiếp thông tin thương hiệu (bao gồm cả thay đổi logo) và Xóa.'
        ]
      };
    }
    if (path === '/dashboard/suppliers') {
      return {
        title: 'Hướng dẫn: Quản lý Nhà cung cấp',
        steps: [
          'Quản lý thông tin các đối tác cung cấp hàng hóa.',
          'Bao gồm các thông tin liên hệ: Email, Điện thoại, Người đại diện.',
          'Hỗ trợ đầy đủ các tính năng Thêm mới, Chỉnh sửa thông tin và Xóa nhà cung cấp.'
        ]
      };
    }
    if (path === '/dashboard/media') {
      return {
        title: 'Hướng dẫn: Media Center',
        steps: [
          'Kho lưu trữ tập trung toàn bộ hình ảnh và video sản phẩm.',
          'Bạn có thể tải lên tệp tin lẻ hoặc tải lên file ZIP chứa hàng loạt hình ảnh.',
          'Sử dụng tính năng "Tự động liên kết (Auto-map)" để hệ thống tự động tìm và gán ảnh vào sản phẩm dựa trên SKU trùng khớp với tên file.'
        ]
      };
    }
    if (path === '/dashboard/import-export') {
      return {
        title: 'Hướng dẫn: Import / Export dữ liệu',
        steps: [
          'Hỗ trợ nhập (Import) sản phẩm hàng loạt bằng cách tải lên file Excel/CSV mẫu.',
          'Hỗ trợ xuất (Export) toàn bộ danh sách sản phẩm hiện tại ra file Excel để lưu trữ hoặc chỉnh sửa thủ công.'
        ]
      };
    }
    if (path === '/dashboard/settings') {
      return {
        title: 'Hướng dẫn: Cài đặt hệ thống',
        steps: [
          'Cấu hình thông tin cửa hàng, kho lưu trữ đám mây và tích hợp bot Telegram thông báo.',
          'Mục "Kho lưu trữ": Cung cấp thông tin DB chính của máy chủ và cho phép cấu hình thông tin DB phụ của khách hàng.',
          'Mục "Giao diện": Cho phép thay đổi chủ đề Sáng (Trắng-Xanh) hoặc Tối (Dark mode).'
        ]
      };
    }
    return {
      title: 'Hướng dẫn sử dụng hệ thống',
      steps: [
        'Sử dụng menu bên trái để điều hướng giữa các chức năng.',
        'Nhấn Ctrl+K tại bất kỳ đâu để mở nhanh ô tìm kiếm tác vụ.',
        'Nếu gặp khó khăn, hãy nhấn biểu tượng "?" trên thanh tiêu đề để xem hướng dẫn của trang hiện tại.'
      ]
    };
  };

  const guide = getGuideContent(pathname);

  return (
    <div className="flex min-h-screen w-full overflow-x-hidden" style={{ background: '#07070c' }}>
      {/* Sidebar - Vercel/Linear Style */}
      <aside
        className={`fixed inset-y-0 left-0 z-40 w-64 bg-[#09090f] border-r border-white/[0.04] flex flex-col transition-transform duration-300 lg:translate-x-0 lg:sticky lg:top-0 h-screen lg:flex-shrink-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
      >
        {/* Logo - Perfectly Aligned */}
        <div className="flex items-center justify-center gap-3 px-6 border-b h-14" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          <img
            src="/logo.png"
            alt="ACOS Logo"
            className="w-9 h-9 object-cover rounded-lg shadow-[0_0_15px_rgba(255,255,255,0.05)]"
          />
          <div>
            <div className="font-bold text-[15px] tracking-wide text-white flex items-center gap-1.5">
              ACOS <span className="text-[8px] font-bold px-1.5 py-0.2 rounded bg-white/[0.06] text-white/70 border border-white/[0.08]">SaaS</span>
            </div>
            <div className="text-[11px] font-medium" style={{ color: 'rgba(255,255,255,0.3)' }}>Auto Commerce OS</div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-7 overflow-y-auto sidebar-scrollbar">
          {navGroups.map((group, groupIdx) => (
            <div key={groupIdx} className="space-y-2" style={{ padding: '8px 4px' }}>
              <div className="px-3.5 font-extrabold text-white/70 uppercase tracking-widest" style={{ fontSize: '13px' }}>
                {group.title}
              </div>
              <div className="space-y-1">
                {group.items.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`sidebar-link ${isActive ? 'active' : ''}`}
                    >
                      <Icon size={20} />
                      <span className="flex-1 tracking-wide">{item.label}</span>
                      {isActive && (
                        <div className="w-1.5 h-1.5 rounded-full bg-white/85 shadow-[0_0_8px_rgba(255,255,255,0.6)]" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* User footer */}
        <div className="mt-auto p-4 border-t pb-8 bg-[#09090f]" style={{ borderColor: 'rgba(255,255,255,0.04)' }}>
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-xl border border-white/[0.04] bg-white/[0.015] shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white shadow-inner flex-shrink-0" style={{ background: 'linear-gradient(135deg, #4f46e5, #a78bfa)' }}>
              {user?.name?.[0] ?? 'A'}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-[13px] font-semibold text-white truncate">{user?.name ?? '...'}</div>
              <div className="text-[11px] truncate" style={{ color: 'rgba(255,255,255,0.3)' }}>{user?.email ?? ''}</div>
            </div>
            <button onClick={handleLogout} className="text-white/30 hover:text-white/70 transition-colors bg-transparent border-none cursor-pointer p-1 rounded hover:bg-white/5" title="Đăng xuất">
              <LogOut size={14} />
            </button>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-30 lg:hidden backdrop-blur-xs" style={{ background: 'rgba(0,0,0,0.6)' }} onClick={() => setSidebarOpen(false)} />
      )}

      {/* Main content wrapper */}
      <div className="flex-1 flex flex-col min-w-0 w-full relative">
        {/* Header - Solid background prevents scroll overlap */}
        <header className="sticky top-0 z-20 flex items-center justify-between px-6 py-3 border-b border-white/[0.04] bg-[#07070c]/95 backdrop-blur-md h-[56px] relative">
          {/* Left section spacer */}
          <div className="flex items-center z-20">
            <button className="lg:hidden text-white/60 hover:text-white bg-none border-none cursor-pointer" onClick={() => setSidebarOpen(!sidebarOpen)}>
              {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>

          {/* Center Section: Search Bar (Perfect Absolute Center, Wider: max-w-lg) */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 hidden md:block max-w-lg w-full h-[30px] search z-10">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/30" />
            <button
              onClick={() => setIsCommandOpen(true)}
              className="w-full h-full text-left pl-10 pr-4 rounded-lg bg-white/[0.02] border border-white/[0.04] text-xs text-white/35 flex items-center justify-between hover:bg-white/[0.04] hover:border-white/[0.08] transition-all cursor-pointer"
              style={{ paddingLeft: '34px' }}
            >
              <span>Tìm kiếm tác vụ, sản phẩm (Ctrl+K)...</span>
              <kbd className="px-1.5 py-0.5 rounded bg-white/[0.06] border border-white/[0.08] text-[9px] font-mono text-white/40">Ctrl K</kbd>
            </button>
          </div>

          {/* Right section */}
          <div className="flex items-center gap-3 ml-auto z-20">
            {/* Help/Guide Button */}
            <button
              onClick={() => setIsGuideOpen(true)}
              className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.03] transition-all cursor-pointer bg-transparent"
              title="Hướng dẫn sử dụng trang này"
            >
              <HelpCircle size={14} />
            </button>

            {/* Notification Bell */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="w-8 h-8 rounded-lg flex items-center justify-center border border-white/[0.04] text-white/50 hover:text-white hover:bg-white/[0.03] transition-all cursor-pointer bg-transparent"
              >
                <Bell size={14} />
                <span className="absolute top-1 right-1 w-1.5 h-1.5 rounded-full bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.8)]" />
              </button>

              {/* Notifications Dropdown */}
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-2 w-80 rounded-xl border border-white/[0.06] shadow-2xl overflow-hidden z-50 animate-fade-in" style={{ background: '#0c0c14' }}>
                  <div className="px-4 py-3 border-b border-white/[0.04] flex items-center justify-between">
                    <span className="text-xs font-semibold text-white">Thông báo</span>
                    <span className="text-[10px] text-indigo-400 cursor-pointer hover:underline">Đánh dấu đã đọc</span>
                  </div>
                  <div className="max-h-64 overflow-y-auto divide-y divide-white/[0.03]">
                    {notifications.map((n) => {
                      const Icon = n.icon;
                      const iconColor = n.type === 'success' ? '#10b981' : n.type === 'error' ? '#ef4444' : '#f59e0b';
                      return (
                        <div key={n.id} className="p-3 hover:bg-white/[0.02] transition-colors flex gap-3">
                          <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: `${iconColor}15` }}>
                            <Icon size={12} style={{ color: iconColor }} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-xs font-medium text-white truncate">{n.title}</div>
                            <div className="text-[10px] text-white/55 mt-0.5 leading-normal">{n.desc}</div>
                            <div className="text-[9px] text-white/30 mt-1">{n.time}</div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-white border border-indigo-500/20" style={{ background: 'linear-gradient(135deg, #4f46e5, #8b5cf6)' }}>
              {user?.name?.[0] ?? 'A'}
            </div>
          </div>
        </header>

        {/* Page content - Full width fluid layout with padding aligning with header */}
        <main className="flex-1 p-6 overflow-y-auto w-full animate-fade-in" style={{ padding: '24px' }}>
          <Outlet />
        </main>
      </div>

      {/* Command Palette Modal */}
      {isCommandOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-24 px-4">
          <div className="fixed inset-0 bg-black/70 backdrop-blur-xs" onClick={() => setIsCommandOpen(false)} />
          <div className="relative bg-[#09090f] border border-white/[0.08] w-full max-w-lg rounded-xl shadow-2xl overflow-hidden animate-fade-in flex flex-col max-h-[420px]">
            <div className="flex items-center gap-3 px-4 border-b border-white/[0.05]" style={{ display: 'flex', alignItems: 'center', gap: '24px', paddingLeft: '16px', paddingRight: '16px' }}>
              <Command size={14} className="text-white/40" />
              <input
                ref={commandInputRef}
                type="text"
                placeholder="Tìm tác vụ hoặc nhập lệnh..."
                value={commandSearch}
                onChange={(e) => { setCommandSearch(e.target.value); setFocusedIndex(0); }}
                onKeyDown={handleCommandKeyDown}
                className="w-full bg-transparent py-3.5 text-sm text-white placeholder-white/30 outline-none"
              />
              <span className="text-[10px] text-white/30 px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.05]">ESC</span>
            </div>

            <div className="flex-1 overflow-y-auto p-2 space-y-2">
              {filteredCommands.length === 0 ? (
                <div className="text-center py-8 text-xs text-white/40">Không tìm thấy tác vụ phù hợp</div>
              ) : (
                <div>
                  {Object.entries(
                    filteredCommands.reduce((acc, cmd) => {
                      (acc[cmd.category] = acc[cmd.category] || []).push(cmd);
                      return acc;
                    }, {} as Record<string, typeof filteredCommands>)
                  ).map(([category, cmds]) => (
                    <div key={category} className="space-y-1">
                      <div className="text-[10px] font-semibold text-white/30 px-3 py-1.5 uppercase tracking-wider">{category}</div>
                      {cmds.map((cmd) => {
                        const Icon = cmd.icon;
                        const flatIndex = filteredCommands.findIndex(c => c.label === cmd.label);
                        const isFocused = flatIndex === focusedIndex;
                        return (
                          <button
                            key={cmd.label}
                            onClick={() => { cmd.action(); setIsCommandOpen(false); }}
                            onMouseEnter={() => setFocusedIndex(flatIndex)}
                            className="w-full text-left px-3 py-2 rounded-lg flex items-center gap-3 text-xs font-medium transition-colors border"
                            style={{
                              background: isFocused ? 'rgba(255,255,255,0.03)' : 'transparent',
                              borderColor: isFocused ? 'rgba(255,255,255,0.05)' : 'transparent',
                              color: isFocused ? 'white' : 'rgba(255,255,255,0.55)',
                            }}
                          >
                            <Icon size={13} className={isFocused ? 'text-indigo-400' : 'text-white/40'} />
                            <span className="flex-1">{cmd.label}</span>
                            {isFocused && <ChevronRight size={12} className="text-indigo-400" />}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="px-4 py-2 border-t border-white/[0.05] flex items-center justify-between text-[10px] text-white/30 bg-white/[0.01]">
              <span>Sử dụng phím mũi tên ↑↓ và Enter để chọn</span>
              <span>Trợ lý ACOS</span>
            </div>
          </div>
        </div>
      )}

      {/* Help Guide Modal */}
      {isGuideOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/75 backdrop-blur-xs" onClick={() => setIsGuideOpen(false)} />
          <div className="relative bg-[#09090f] border border-white/[0.08] w-full max-w-md rounded-xl shadow-2xl overflow-hidden animate-fade-in p-6 space-y-4 glass-card">
            <div className="flex items-center justify-between border-b border-white/[0.05] pb-3">
              <div className="flex items-center gap-2">
                <HelpCircle size={16} className="text-indigo-400" />
                <h3 className="font-bold text-sm text-white">{guide.title}</h3>
              </div>
              <button onClick={() => setIsGuideOpen(false)} style={{ color: 'rgba(255,255,255,0.4)', background: 'none', border: 'none', cursor: 'pointer' }}><X size={18} /></button>
            </div>
            <div className="space-y-3 py-2">
              {guide.steps.map((step, idx) => (
                <div key={idx} className="flex gap-3 text-xs leading-relaxed text-white/70">
                  <span className="w-5 h-5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center flex-shrink-0 font-bold">{idx + 1}</span>
                  <p className="flex-1 pt-0.5">{step}</p>
                </div>
              ))}
            </div>
            <div className="flex justify-end pt-2">
              <button onClick={() => setIsGuideOpen(false)} className="btn-primary text-xs px-4 py-2">Đã hiểu</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
