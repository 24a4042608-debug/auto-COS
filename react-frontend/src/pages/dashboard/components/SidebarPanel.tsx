import { Link, useLocation } from 'react-router-dom';
import { type Platform } from '../config/navConfig';

interface SidebarPanelProps {
  platform: Platform;
  onNavClick?: () => void;
}

export default function SidebarPanel({ platform, onNavClick }: SidebarPanelProps) {
  const { pathname } = useLocation();

  return (
    <div
      className="flex flex-col h-full"
      style={{
        width: '216px',
        background: '#09090f',
        borderRight: '1px solid rgba(255,255,255,0.04)',
        flexShrink: 0,
      }}
    >
      {/* Platform Header */}
      <div
        style={{
          height: '56px',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '0 16px',
          borderBottom: '1px solid rgba(255,255,255,0.04)',
          flexShrink: 0,
        }}
      >
        <div
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: platform.bgColor,
            flexShrink: 0,
          }}
        >
          <platform.icon size={14} style={{ color: platform.color }} />
        </div>
        <div>
          <div style={{ fontSize: '13px', fontWeight: 700, color: 'rgba(255,255,255,0.92)', lineHeight: 1.2 }}>
            {platform.label}
          </div>
          <div style={{ fontSize: '10px', color: 'rgba(255,255,255,0.3)', lineHeight: 1.2 }}>
            ACOS Admin
          </div>
        </div>
      </div>

      {/* Nav Groups */}
      <nav
        className="sidebar-scrollbar"
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '12px 8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
        }}
      >
        {platform.navGroups.map((group, idx) => (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
            <div
              style={{
                fontSize: '10px',
                fontWeight: 700,
                color: 'rgba(255,255,255,0.3)',
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                padding: '0 10px',
                marginBottom: '4px',
              }}
            >
              {group.title}
            </div>
            {group.items.map((item) => {
              const isActive =
                item.href === '/admin'
                  ? pathname === '/admin'
                  : pathname === item.href || pathname.startsWith(item.href + '/');

              return (
                <Link
                  key={item.href}
                  to={item.href}
                  onClick={onNavClick}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '9px',
                    padding: '6px 10px',
                    borderRadius: '8px',
                    fontSize: '13px',
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? 'rgba(255,255,255,0.92)' : 'rgba(255,255,255,0.45)',
                    background: isActive ? 'rgba(255,255,255,0.05)' : 'transparent',
                    textDecoration: 'none',
                    transition: 'all 0.12s ease',
                    border: '1px solid',
                    borderColor: isActive ? 'rgba(255,255,255,0.06)' : 'transparent',
                    position: 'relative',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.7)';
                      (e.currentTarget as HTMLAnchorElement).style.background = 'rgba(255,255,255,0.025)';
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLAnchorElement).style.color = 'rgba(255,255,255,0.45)';
                      (e.currentTarget as HTMLAnchorElement).style.background = 'transparent';
                    }
                  }}
                >
                  <item.icon
                    size={14}
                    style={{ color: isActive ? platform.color : 'rgba(255,255,255,0.3)', flexShrink: 0 }}
                  />
                  <span style={{ flex: 1, letterSpacing: '0.01em' }}>{item.label}</span>
                  {item.badge && (
                    <span
                      style={{
                        fontSize: '9px',
                        fontWeight: 700,
                        padding: '1px 5px',
                        borderRadius: '4px',
                        background: platform.bgColor,
                        color: platform.color,
                      }}
                    >
                      {item.badge}
                    </span>
                  )}
                  {isActive && (
                    <span
                      style={{
                        position: 'absolute',
                        left: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '2px',
                        height: '14px',
                        borderRadius: '0 2px 2px 0',
                        background: platform.color,
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </div>
        ))}
      </nav>
    </div>
  );
}
