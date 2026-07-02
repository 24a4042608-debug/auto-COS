import { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Command, Menu, X, Bell, HelpCircle,
  CheckCircle, AlertTriangle, Sparkles,
  LayoutDashboard, Package, Image, Upload, Settings, LogOut, ChevronRight,
} from 'lucide-react';

interface AdminHeaderProps {
  user: { name: string; email: string } | null;
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  onLogout: () => void;
}

export default function AdminHeader({ user, sidebarOpen, onToggleSidebar, onLogout }: AdminHeaderProps) {
  const navigate = useNavigate();
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isGuideOpen, setIsGuideOpen] = useState(false);
  const [commandSearch, setCommandSearch] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(0);

  const commandInputRef = useRef<HTMLInputElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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

  const allCommands = [
    { label: 'Tổng quan hệ thống',   action: () => navigate('/admin'),              icon: LayoutDashboard, category: 'Điều hướng' },
    { label: 'Sản phẩm Fashion',      action: () => navigate('/admin/products'),     icon: Package,         category: 'Điều hướng' },
    { label: 'Media Center',          action: () => navigate('/admin/media'),         icon: Image,           category: 'Điều hướng' },
    { label: 'Import / Export',       action: () => navigate('/admin/import-export'), icon: Upload,          category: 'Điều hướng' },
    { label: 'Cài đặt hệ thống',     action: () => navigate('/admin/settings'),      icon: Settings,        category: 'Hệ thống' },
    { label: 'Đăng xuất',            action: onLogout,                               icon: LogOut,          category: 'Hệ thống' },
  ];

  const filteredCommands = allCommands.filter(cmd =>
    cmd.label.toLowerCase().includes(commandSearch.toLowerCase())
  );

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
    { id: 1, title: 'Import hoàn thành',   desc: 'Đã nhập thành công 50 sản phẩm.', time: '10 phút trước', type: 'success', icon: CheckCircle },
    { id: 2, title: 'Đồng bộ lỗi',        desc: 'SKU TS-ACTIVE-BLK-M lỗi giá bán.', time: '1 giờ trước',  type: 'error',   icon: AlertTriangle },
    { id: 3, title: 'Ảnh chưa liên kết',  desc: '12 file media chưa được map.',      time: 'Hôm qua',       type: 'warning', icon: Sparkles },
  ];

  return (
    <>
      <header
        style={{
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 20px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          background: 'rgba(7,7,12,0.97)',
          backdropFilter: 'blur(12px)',
          position: 'sticky',
          top: 0,
          zIndex: 20,
          flexShrink: 0,
        }}
      >
        {/* Left: mobile menu toggle */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
            className="lg:hidden"
            onClick={onToggleSidebar}
            style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.5)', padding: '4px' }}
          >
            {sidebarOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {/* Center: Command search */}
        <div
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%,-50%)',
            width: '100%',
            maxWidth: '420px',
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Search size={12} style={{ position: 'absolute', left: '12px', color: 'rgba(255,255,255,0.25)', pointerEvents: 'none' }} />
          <button
            onClick={() => setIsCommandOpen(true)}
            style={{
              width: '100%',
              height: '30px',
              paddingLeft: '32px',
              paddingRight: '12px',
              borderRadius: '8px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              color: 'rgba(255,255,255,0.3)',
              fontSize: '12px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '8px',
              transition: 'all 0.15s',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.04)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.02)';
              (e.currentTarget as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.05)';
            }}
          >
            <span>Tìm tác vụ... (Ctrl+K)</span>
            <kbd style={{ fontSize: '9px', padding: '1px 5px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.06)', fontFamily: 'monospace', color: 'rgba(255,255,255,0.3)' }}>
              ⌃K
            </kbd>
          </button>
        </div>

        {/* Right: actions */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginLeft: 'auto' }}>
          {/* Help */}
          <button
            onClick={() => setIsGuideOpen(true)}
            style={iconBtnStyle}
            title="Hướng dẫn"
          >
            <HelpCircle size={14} />
          </button>

          {/* Notifications */}
          <div style={{ position: 'relative' }} ref={notificationRef}>
            <button
              onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
              style={{ ...iconBtnStyle, position: 'relative' }}
            >
              <Bell size={14} />
              <span style={{
                position: 'absolute', top: '6px', right: '6px',
                width: '6px', height: '6px', borderRadius: '50%',
                background: '#6366f1', boxShadow: '0 0 6px rgba(99,102,241,0.8)',
              }} />
            </button>

            {isNotificationsOpen && (
              <div style={{
                position: 'absolute', right: 0, top: 'calc(100% + 8px)',
                width: '300px', borderRadius: '12px',
                border: '1px solid rgba(255,255,255,0.06)',
                background: '#0c0c14', boxShadow: '0 20px 40px rgba(0,0,0,0.5)',
                zIndex: 50, overflow: 'hidden',
              }}>
                <div style={{ padding: '12px 16px', borderBottom: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontSize: '12px', fontWeight: 600, color: 'rgba(255,255,255,0.9)' }}>Thông báo</span>
                  <span style={{ fontSize: '10px', color: '#6366f1', cursor: 'pointer' }}>Đánh dấu đã đọc</span>
                </div>
                <div style={{ maxHeight: '240px', overflowY: 'auto' }}>
                  {notifications.map(n => {
                    const Icon = n.icon;
                    const color = n.type === 'success' ? '#10b981' : n.type === 'error' ? '#ef4444' : '#f59e0b';
                    return (
                      <div key={n.id} style={{ padding: '10px 16px', display: 'flex', gap: '10px', borderBottom: '1px solid rgba(255,255,255,0.03)' }}>
                        <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: `${color}15`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <Icon size={12} style={{ color }} />
                        </div>
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 500, color: 'rgba(255,255,255,0.85)' }}>{n.title}</div>
                          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.45)', marginTop: '2px' }}>{n.desc}</div>
                          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,0.25)', marginTop: '4px' }}>{n.time}</div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>

          {/* Avatar */}
          <div style={{
            width: '30px', height: '30px', borderRadius: '50%',
            background: 'linear-gradient(135deg,#4f46e5,#8b5cf6)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '11px', fontWeight: 700, color: 'white',
            border: '1px solid rgba(99,102,241,0.3)', cursor: 'pointer',
          }}>
            {user?.name?.[0] ?? 'A'}
          </div>
        </div>
      </header>

      {/* Command Palette */}
      {isCommandOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: '80px', padding: '80px 16px 16px' }}>
          <div
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
            onClick={() => setIsCommandOpen(false)}
          />
          <div style={{
            position: 'relative', width: '100%', maxWidth: '480px',
            background: '#09090f', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px', boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
            overflow: 'hidden', maxHeight: '380px', display: 'flex', flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '0 14px', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
              <Command size={13} style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
              <input
                ref={commandInputRef}
                type="text"
                placeholder="Tìm tác vụ hoặc nhập lệnh..."
                value={commandSearch}
                onChange={e => { setCommandSearch(e.target.value); setFocusedIndex(0); }}
                onKeyDown={handleCommandKeyDown}
                style={{
                  flex: 1, background: 'transparent', border: 'none', outline: 'none',
                  padding: '14px 0', fontSize: '13px', color: 'white',
                }}
                className="placeholder-white/30"
              />
              <kbd style={{ fontSize: '9px', padding: '2px 6px', borderRadius: '4px', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.07)', color: 'rgba(255,255,255,0.3)', fontFamily: 'monospace' }}>ESC</kbd>
            </div>
            <div style={{ flex: 1, overflowY: 'auto', padding: '8px' }}>
              {filteredCommands.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '32px', fontSize: '12px', color: 'rgba(255,255,255,0.3)' }}>Không tìm thấy tác vụ</div>
              ) : (
                Object.entries(
                  filteredCommands.reduce((acc, cmd) => {
                    (acc[cmd.category] = acc[cmd.category] || []).push(cmd);
                    return acc;
                  }, {} as Record<string, typeof filteredCommands>)
                ).map(([cat, cmds]) => (
                  <div key={cat} style={{ marginBottom: '8px' }}>
                    <div style={{ fontSize: '9px', fontWeight: 700, color: 'rgba(255,255,255,0.25)', textTransform: 'uppercase', letterSpacing: '0.1em', padding: '4px 10px 6px' }}>{cat}</div>
                    {cmds.map(cmd => {
                      const flatIdx = filteredCommands.findIndex(c => c.label === cmd.label);
                      const focused = flatIdx === focusedIndex;
                      const Icon = cmd.icon;
                      return (
                        <button
                          key={cmd.label}
                          onClick={() => { cmd.action(); setIsCommandOpen(false); }}
                          onMouseEnter={() => setFocusedIndex(flatIdx)}
                          style={{
                            width: '100%', textAlign: 'left', padding: '7px 10px',
                            borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '10px',
                            fontSize: '12px', fontWeight: 500,
                            background: focused ? 'rgba(255,255,255,0.04)' : 'transparent',
                            border: `1px solid ${focused ? 'rgba(255,255,255,0.06)' : 'transparent'}`,
                            color: focused ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.5)',
                            cursor: 'pointer', transition: 'all 0.1s',
                          }}
                        >
                          <Icon size={13} style={{ color: focused ? '#6366f1' : 'rgba(255,255,255,0.3)', flexShrink: 0 }} />
                          <span style={{ flex: 1 }}>{cmd.label}</span>
                          {focused && <ChevronRight size={12} style={{ color: '#6366f1' }} />}
                        </button>
                      );
                    })}
                  </div>
                ))
              )}
            </div>
            <div style={{ padding: '8px 14px', borderTop: '1px solid rgba(255,255,255,0.04)', display: 'flex', justifyContent: 'space-between', fontSize: '9px', color: 'rgba(255,255,255,0.25)', background: 'rgba(255,255,255,0.01)' }}>
              <span>↑↓ điều hướng · Enter chọn</span>
              <span>ACOS Admin</span>
            </div>
          </div>
        </div>
      )}

      {/* Guide Modal */}
      {isGuideOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 60, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '16px' }}>
          <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} onClick={() => setIsGuideOpen(false)} />
          <div style={{
            position: 'relative', width: '100%', maxWidth: '420px',
            background: '#09090f', border: '1px solid rgba(255,255,255,0.08)',
            borderRadius: '14px', padding: '20px', boxShadow: '0 40px 80px rgba(0,0,0,0.6)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <HelpCircle size={15} style={{ color: '#6366f1' }} />
                <span style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.9)' }}>Hướng dẫn sử dụng</span>
              </div>
              <button onClick={() => setIsGuideOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'rgba(255,255,255,0.4)' }}>
                <X size={16} />
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                'Chọn nền tảng (platform) bằng cột icon bên trái — mỗi platform có menu riêng.',
                'Sidebar panel hiển thị điều hướng tương ứng với platform đang chọn.',
                'Nhấn Ctrl+K để mở Command Palette tìm kiếm nhanh.',
                'Click chuột vào phần tử trên Rail để chuyển đổi workspace.',
              ].map((step, idx) => (
                <div key={idx} style={{ display: 'flex', gap: '10px', fontSize: '12px', color: 'rgba(255,255,255,0.6)' }}>
                  <span style={{
                    width: '20px', height: '20px', borderRadius: '50%',
                    background: 'rgba(99,102,241,0.1)', border: '1px solid rgba(99,102,241,0.2)',
                    color: '#6366f1', display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '10px', fontWeight: 700, flexShrink: 0,
                  }}>{idx + 1}</span>
                  <p style={{ lineHeight: 1.6, paddingTop: '2px' }}>{step}</p>
                </div>
              ))}
            </div>
            <button
              onClick={() => setIsGuideOpen(false)}
              style={{
                marginTop: '16px', width: '100%', padding: '8px',
                borderRadius: '8px', background: '#6366f1', border: 'none',
                color: 'white', fontSize: '12px', fontWeight: 600, cursor: 'pointer',
              }}
            >
              Đã hiểu
            </button>
          </div>
        </div>
      )}
    </>
  );
}

const iconBtnStyle: React.CSSProperties = {
  width: '30px', height: '30px', borderRadius: '8px',
  display: 'flex', alignItems: 'center', justifyContent: 'center',
  background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.05)',
  color: 'rgba(255,255,255,0.45)', cursor: 'pointer', transition: 'all 0.15s',
};
