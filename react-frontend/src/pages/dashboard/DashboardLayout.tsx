import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { platforms, detectPlatformFromPath } from './config/navConfig';
import PlatformRail from './components/PlatformRail';
import SidebarPanel from './components/SidebarPanel';
import AdminHeader from './components/AdminHeader';

export default function DashboardLayout() {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState<{ name: string; email: string } | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activePlatformId, setActivePlatformId] = useState<string>(() => {
    return localStorage.getItem('acos_platform') || detectPlatformFromPath(pathname);
  });

  // Sync platform with current route
  useEffect(() => {
    const detected = detectPlatformFromPath(pathname);
    setActivePlatformId(detected);
    localStorage.setItem('acos_platform', detected);
  }, [pathname]);

  useEffect(() => {
    setUser({ name: 'Admin ACOS', email: 'admin@acos.vn' });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('acos_token');
    localStorage.removeItem('acos_user');
    navigate('/login');
  };

  const handlePlatformSelect = (id: string) => {
    setActivePlatformId(id);
    localStorage.setItem('acos_platform', id);

    // Navigate to the first nav item of the selected platform
    const platform = platforms.find(p => p.id === id);
    if (platform?.navGroups?.[0]?.items?.[0]) {
      navigate(platform.navGroups[0].items[0].href);
    }
  };

  const activePlatform = platforms.find(p => p.id === activePlatformId) ?? platforms[0];

  return (
    <div style={{ display: 'flex', height: '100vh', width: '100%', overflow: 'hidden', background: '#07070c' }}>

      {/* ── Sidebar (Rail + Panel) ─────────────────────────────── */}
      <aside
        style={{
          display: 'flex',
          height: '100%',
          flexShrink: 0,
          position: 'fixed',
          top: 0,
          left: 0,
          zIndex: 40,
          transform: sidebarOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.25s cubic-bezier(0.4,0,0.2,1)',
        }}
        className="lg:!transform-none lg:!position-relative lg:static"
      >
        {/* Platform Rail */}
        <PlatformRail
          activePlatformId={activePlatformId}
          onSelect={handlePlatformSelect}
        />

        {/* Nav Panel */}
        <SidebarPanel
          platform={activePlatform}
          onNavClick={() => setSidebarOpen(false)}
        />

      </aside>


      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          style={{ position: 'fixed', inset: 0, zIndex: 30, background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(2px)' }}
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden"
        />
      )}

      {/* ── Main Content ───────────────────────────────────────── */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          // On desktop, offset for sidebar width (64px rail + 216px panel)
        }}
        className="lg:ml-[280px]"
      >
        {/* Header */}
        <AdminHeader
          user={user}
          sidebarOpen={sidebarOpen}
          onToggleSidebar={() => setSidebarOpen(s => !s)}
          onLogout={handleLogout}
        />

        {/* Page Content */}
        <main
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px',
          }}
          className="sidebar-scrollbar"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
