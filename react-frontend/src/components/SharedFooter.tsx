import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin, ArrowUp, Globe, MessageCircle, Camera, PlayCircle, Zap } from 'lucide-react';

// Shared footer for ALL platforms
interface SharedFooterProps {
  theme?: 'dark' | 'light';
  accentColor?: string;
  platformName?: string;
}

const PLATFORMS_NAV = [
  { name: '👗 Atelier Fashion', href: '/fashion' },
  { name: '🎬 CineVault', href: '/film' },
  { name: '🎓 EduHub', href: '/education' },
  { name: '📰 PulseNews', href: '/news' },
  { name: '📅 BookIt', href: '/booking' },
  { name: '🎥 CreatorSpace', href: '/vlog' },
];

export default function SharedFooter({ theme = 'dark', accentColor = '#6366F1', platformName = 'VHSM Platform' }: SharedFooterProps) {
  const isDark = theme === 'dark';
  const bg = isDark ? 'bg-[#08080D]' : 'bg-slate-900';
  const border = isDark ? 'border-white/[0.07]' : 'border-white/10';
  const text = 'text-white/50';
  const textHover = 'hover:text-white';
  const heading = 'text-white/80';

  return (
    <footer className={`${bg} border-t ${border} mt-0`}>
      <div className="max-w-7xl mx-auto px-6 md:px-8">

        {/* Top Grid */}
        <div className="py-14 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8">

          {/* Brand */}
          <div className="col-span-2 space-y-5">
            <Link to="/" className="flex items-center gap-2.5 group w-fit">
              <div className="w-9 h-9 flex items-center justify-center rounded-lg" style={{ background: accentColor }}>
                <Zap className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-white font-black text-lg tracking-tight">
                VHSM <span style={{ color: accentColor }}>Platform</span>
              </span>
            </Link>
            <p className={`${text} text-sm leading-relaxed max-w-xs`}>
              Hệ sinh thái số toàn diện — từ thời trang, giải trí, giáo dục đến đặt chỗ và sáng tạo nội dung.
            </p>

            {/* Contact Info */}
            <div className="space-y-2">
              <div className={`flex items-center gap-2 ${text} text-sm`}>
                <Phone className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accentColor }} />
                <a href="tel:0325277184" className={`${textHover} transition-colors`}>0325 277 184</a>
              </div>
              <div className={`flex items-center gap-2 ${text} text-sm`}>
                <Mail className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accentColor }} />
                <a href="mailto:contact@vhsm.vn" className={`${textHover} transition-colors`}>contact@vhsm.vn</a>
              </div>
              <div className={`flex items-center gap-2 ${text} text-sm`}>
                <MapPin className="w-3.5 h-3.5 flex-shrink-0" style={{ color: accentColor }} />
                <span>Hà Nội, Việt Nam</span>
              </div>
            </div>

            {/* Socials */}
            <div className="flex items-center gap-3 pt-1">
              {[
                { Icon: Globe, href: 'https://vhsm.vn', label: 'Website' },
                { Icon: Camera, href: 'https://instagram.com', label: 'Instagram' },
                { Icon: PlayCircle, href: 'https://youtube.com', label: 'YouTube' },
                { Icon: MessageCircle, href: 'https://zalo.me/0325277184', label: 'Zalo' },
              ].map(({ Icon, href, label }) => (
                <a key={label} href={href} target="_blank" rel="noreferrer" aria-label={label}
                  className={`w-8 h-8 border border-white/10 rounded-lg flex items-center justify-center ${text} hover:border-white/30 hover:text-white transition-all`}>
                  <Icon className="w-3.5 h-3.5" />
                </a>
              ))}
            </div>
          </div>

          {/* Platforms */}
          <div className="space-y-4">
            <h5 className={`${heading} text-xs font-bold tracking-widest uppercase`}>Nền tảng</h5>
            <ul className="space-y-2.5">
              {PLATFORMS_NAV.map(p => (
                <li key={p.href}>
                  <Link to={p.href} className={`${text} text-sm ${textHover} transition-colors`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h5 className={`${heading} text-xs font-bold tracking-widest uppercase`}>Công ty</h5>
            <ul className="space-y-2.5">
              {[
                { name: 'Về chúng tôi', href: '/fashion/about' },
                { name: 'Tuyển dụng', href: '#' },
                { name: 'Đối tác', href: '#' },
                { name: 'Báo chí', href: '#' },
                { name: 'Blog', href: '/news' },
              ].map(l => (
                <li key={l.name}>
                  <Link to={l.href} className={`${text} text-sm ${textHover} transition-colors`}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h5 className={`${heading} text-xs font-bold tracking-widest uppercase`}>Hỗ trợ</h5>
            <ul className="space-y-2.5">
              {[
                { name: 'Trung tâm trợ giúp', href: '#' },
                { name: 'Điều khoản', href: '#' },
                { name: 'Bảo mật', href: '#' },
                { name: 'Cookie', href: '#' },
                { name: 'Báo lỗi', href: '#' },
              ].map(l => (
                <li key={l.name}>
                  <Link to={l.href} className={`${text} text-sm ${textHover} transition-colors`}>{l.name}</Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h5 className={`${heading} text-xs font-bold tracking-widest uppercase`}>Nhận tin mới</h5>
            <p className={`${text} text-sm leading-relaxed`}>Cập nhật sản phẩm & ưu đãi mới nhất.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input type="email" placeholder="Email của bạn"
                className="w-full bg-white/5 border border-white/10 text-white text-sm px-3 py-2.5 rounded-lg placeholder:text-white/30 focus:outline-none focus:border-white/30 transition-colors" required />
              <button type="submit"
                className="w-full text-white text-sm font-semibold py-2.5 rounded-lg transition-colors cursor-pointer"
                style={{ background: accentColor }}>
                Đăng ký
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className={`border-t ${border}`} />

        {/* Bottom */}
        <div className="py-5 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className={`${text} text-xs text-center md:text-left`}>
            © 2026 <span className="text-white/70 font-semibold">VHSM Platform</span>. Bản quyền thuộc về{' '}
            <span className="text-white/70 font-semibold">Đoàn Văn Sơn</span>.{' '}
            <a href="tel:0325277184" className="hover:text-white transition-colors">0325 277 184</a>
          </div>
          <div className="flex items-center gap-4">
            <span className={`${text} text-xs`}>Made with ❤️ in Vietnam</span>
            <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className={`flex items-center gap-1 ${text} text-xs ${textHover} transition-colors cursor-pointer group`}>
              Lên đầu
              <ArrowUp className="w-3 h-3 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
