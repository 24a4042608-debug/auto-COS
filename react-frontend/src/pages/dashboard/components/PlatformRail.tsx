import { platforms, type Platform } from '../config/navConfig';

interface PlatformRailProps {
  activePlatformId: string;
  onSelect: (id: string) => void;
}

export default function PlatformRail({ activePlatformId, onSelect }: PlatformRailProps) {
  const mainPlatforms = platforms.filter(p => p.id !== 'global');
  const globalPlatform = platforms.find(p => p.id === 'global')!;

  return (
    <div
      className="flex flex-col items-center py-3 gap-1 flex-shrink-0"
      style={{
        width: '64px',
        background: '#07070c',
        borderRight: '1px solid rgba(255,255,255,0.04)',
        height: '100%',
      }}
    >
      {/* Brand Logo */}
      <div style={{ width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '8px' }}>
        <img src="/logo.png" alt="VHSM" style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain' }} />
      </div>

      {/* Global / Home */}
      <RailButton
        platform={globalPlatform}
        isActive={activePlatformId === 'global'}
        onSelect={onSelect}
      />

      {/* Divider */}
      <div style={{ width: '32px', height: '1px', background: 'rgba(255,255,255,0.06)', margin: '4px 0' }} />

      {/* Platform icons */}
      {mainPlatforms.map((platform) => (
        <RailButton
          key={platform.id}
          platform={platform}
          isActive={activePlatformId === platform.id}
          onSelect={onSelect}
        />
      ))}
    </div>
  );
}

function RailButton({
  platform,
  isActive,
  onSelect,
}: {
  platform: Platform;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const Icon = platform.icon;

  return (
    <button
      onClick={() => onSelect(platform.id)}
      title={platform.label}
      style={{
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        border: 'none',
        cursor: 'pointer',
        position: 'relative',
        transition: 'all 0.15s ease',
        background: isActive ? platform.bgColor : 'transparent',
        outline: 'none',
      }}
      onMouseEnter={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = 'rgba(255,255,255,0.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!isActive) {
          (e.currentTarget as HTMLButtonElement).style.background = 'transparent';
        }
      }}
    >
      {/* Active indicator bar */}
      {isActive && (
        <span
          style={{
            position: 'absolute',
            left: '-12px',
            top: '50%',
            transform: 'translateY(-50%)',
            width: '3px',
            height: '18px',
            borderRadius: '0 2px 2px 0',
            background: platform.color,
            boxShadow: `0 0 8px ${platform.color}80`,
          }}
        />
      )}
      <Icon
        size={17}
        style={{
          color: isActive ? platform.color : 'rgba(255,255,255,0.35)',
          transition: 'color 0.15s ease',
        }}
      />
    </button>
  );
}
