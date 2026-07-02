import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Star, Users, Film, BookOpen, ChevronRight } from 'lucide-react';
import SharedFooter from '@/components/SharedFooter';

const PLATFORMS = [
  {
    id: 'fashion',
    name: 'ATELIER',
    label: 'Fashion & Luxury',
    description: 'Bộ sưu tập thời trang cao cấp. Phong cách tối giản, chất liệu thượng hạng.',
    path: '/fashion',
    color: '#E61919',
    bg: 'from-zinc-950 to-zinc-900',
    accent: 'border-red-600/40',
    textAccent: 'text-red-500',
    icon: '👗',
    preview: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&q=85',
    stats: '200+ sản phẩm',
  },
  {
    id: 'film',
    name: 'CINEVAULT',
    label: 'Streaming Films',
    description: 'Xem phim không giới hạn. Thư viện phim quốc tế và Việt Nam chọn lọc.',
    path: '/film',
    color: '#E50914',
    bg: 'from-red-950 to-zinc-950',
    accent: 'border-red-500/40',
    textAccent: 'text-red-400',
    icon: '🎬',
    preview: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=700&q=85',
    stats: '500+ bộ phim',
  },
  {
    id: 'education',
    name: 'EDUHUB',
    label: 'Online Learning',
    description: 'Học từ chuyên gia hàng đầu. Khóa học thiết kế, lập trình, kinh doanh.',
    path: '/education',
    color: '#6366F1',
    bg: 'from-indigo-950 to-zinc-950',
    accent: 'border-indigo-500/40',
    textAccent: 'text-indigo-400',
    icon: '🎓',
    preview: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=700&q=85',
    stats: '50+ khóa học',
  },
  {
    id: 'news',
    name: 'PULSENEWS',
    label: 'Tin tức 24/7',
    description: 'Tin tức nhanh, chính xác. Công nghệ, kinh tế, thể thao, giải trí.',
    path: '/news',
    color: '#DC2626',
    bg: 'from-slate-950 to-slate-900',
    accent: 'border-rose-500/40',
    textAccent: 'text-rose-400',
    icon: '📰',
    preview: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=700&q=85',
    stats: '100+ bài/ngày',
  },
  {
    id: 'booking',
    name: 'BOOKIT',
    label: 'Đặt chỗ & Du lịch',
    description: 'Khách sạn, nhà hàng, spa, tour. Đặt ngay, xác nhận tức thì.',
    path: '/booking',
    color: '#059669',
    bg: 'from-emerald-950 to-zinc-950',
    accent: 'border-emerald-500/40',
    textAccent: 'text-emerald-400',
    icon: '📅',
    preview: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=700&q=85',
    stats: '300+ địa điểm',
  },
  {
    id: 'vlog',
    name: 'CREATORSPACE',
    label: 'Vlog & Video',
    description: 'Khám phá vlog du lịch, ẩm thực, lifestyle từ creator Việt Nam.',
    path: '/vlog',
    color: '#7C3AED',
    bg: 'from-violet-950 to-zinc-950',
    accent: 'border-violet-500/40',
    textAccent: 'text-violet-400',
    icon: '🎥',
    preview: 'https://images.unsplash.com/photo-1598550476439-6847785fcea6?w=700&q=85',
    stats: '1000+ video',
  },
];

const BUSINESS_ARTICLES = [
  {
    id: 'ba1',
    title: 'Hệ sinh thái Số hóa & Tương lai Vận hành Doanh nghiệp Việt',
    excerpt: 'Làm thế nào để tích hợp 6 nền tảng kinh doanh thiết yếu giúp cắt giảm tới 40% chi phí hạ tầng và tối ưu hóa trải nghiệm khách hàng đa kênh.',
    category: 'Chuyển đổi số',
    date: '28 Tháng 6, 2025',
    author: 'CEO VHSM Group',
  },
  {
    id: 'ba2',
    title: 'Atelier và Chiến lược Thời trang Bền vững 2026',
    excerpt: 'Ứng dụng các vật liệu sinh học tự phân hủy và tối ưu hóa chuỗi cung ứng sản xuất xanh để đáp ứng tiêu chuẩn bền vững khắt khe từ Châu Âu.',
    category: 'Phát triển bền vững',
    date: '22 Tháng 6, 2025',
    author: 'Director of Atelier',
  },
  {
    id: 'ba3',
    title: 'EduHub Đạt Mốc 10.000 Học Viên Chuyên Ngành Kỹ Thuật Số',
    excerpt: 'Chương trình đào tạo công nghệ hợp tác với các tập đoàn đa quốc gia nhằm nâng cao chất lượng nguồn nhân lực trẻ trong kỷ nguyên AI.',
    category: 'Giáo dục',
    date: '15 Tháng 6, 2025',
    author: 'Dean of EduHub',
  },
  {
    id: 'ba4',
    title: 'ACOS Admin: Tự động hóa Logistics với Giải pháp Trí tuệ Nhân tạo',
    excerpt: 'Hệ thống quản trị đa website tích hợp mô hình dự báo nhu cầu thị trường tự động giúp tối ưu 50% tồn kho cho các đối tác bán lẻ.',
    category: 'Giải pháp Công nghệ',
    date: '10 Tháng 6, 2025',
    author: 'CTO VHSM Tech',
  },
];

const FAQS = [
  { question: 'Hệ sinh thái VHSM có thể chạy riêng lẻ từng nền tảng được không?', answer: 'Có, các nền tảng (Fashion, Film, Education, News, Booking, Vlog) đều được thiết kế độc lập. Doanh nghiệp có thể lựa chọn kích hoạt chỉ một hoặc tất cả các kênh tùy theo nhu cầu.' },
  { question: 'Làm thế nào để phân quyền quản trị đa kênh?', answer: 'ACOS Admin tích hợp hệ thống phân quyền (RBAC) chi tiết. Bạn có thể phân quyền cộng tác viên viết bài tin tức, quản trị viên quản lý sản phẩm, hoặc hỗ trợ kỹ thuật mà không sợ ảnh hưởng đến dữ liệu toàn hệ thống.' },
  { question: 'Thời gian triển khai và khả năng mở rộng như thế nào?', answer: 'Nhờ cấu trúc mã nguồn mở gọn gàng bằng React 19 và Vite, hệ thống có khả năng deploy tức thì lên Vercel và mở rộng quy mô linh hoạt mà không gặp trở ngại về hạ tầng.' },
  { question: 'Dữ liệu giữa các nền tảng được đồng bộ ra sao?', answer: 'Mọi dữ liệu từ sản phẩm (Fashion) đến bài học (Education) đều kết nối thông qua hệ thống API backend tập trung, giúp tự động hiển thị chéo và đồng nhất trên toàn bộ website.' }
];

function FaqAccordionItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="border-b border-white/[0.05] py-4">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between text-left text-sm font-bold text-white hover:text-violet-400 transition-colors py-2 focus:outline-none"
      >
        <span>{question}</span>
        <span className={`text-xs transform transition-transform duration-250 ${isOpen ? 'rotate-180 text-violet-400' : 'text-white/40'}`}>
          ▼
        </span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden"
          >
            <p className="text-white/40 text-xs leading-relaxed pt-2 pb-4">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' } },
};

export default function PortalHub() {
  return (
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden relative">

      {/* ── Top Floating Header ── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[calc(100%-2rem)] max-w-7xl z-50 bg-black/40 border border-white/[0.08] backdrop-blur-md py-3 px-6 rounded-full flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <img src="/logo.png" alt="VHSM Logo" className="h-6 w-auto object-contain" />
          <span className="text-white font-black text-sm tracking-[0.2em] uppercase font-mono">VHSM</span>
        </div>
        <div className="flex items-center gap-4">
          <Link to="/admin" className="text-xs text-white/50 hover:text-white transition-colors font-medium">Admin</Link>
          <a href="#platforms" className="bg-white/10 hover:bg-white/15 text-white text-[11px] font-bold px-4 py-2 rounded-full border border-white/10 transition-all">
            Khám phá
          </a>
        </div>
      </header>

      {/* ── Tech Background Image ── */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-30">
        <img
          src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1920&q=80"
          alt="Tech Background"
          className="w-full h-full object-cover fixed top-0 left-0"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#050508]/80 via-[#050508]/90 to-[#050508]" />
      </div>

      {/* ── Hero ── */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16">
        {/* Background glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/15 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/15 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 rounded-full blur-[180px]" />
          {/* Floating particles */}
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-white/20 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: 3 + Math.random() * 4,
                delay: Math.random() * 3,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 text-xs text-white/60 mb-8 backdrop-blur-sm"
        >
          <Sparkles className="w-3.5 h-3.5 text-violet-400" />
          <span>VHSM Platform — 6 nền tảng trong 1 hệ sinh thái</span>
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-center font-black text-white leading-none mb-6"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 6rem)', letterSpacing: '-0.03em' }}
        >
          Một hệ sinh thái,
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-red-400 to-emerald-400 bg-clip-text text-transparent">
            vô hạn trải nghiệm.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-white/50 text-lg md:text-xl text-center max-w-2xl mb-12 leading-relaxed"
        >
          Từ thời trang đến phim ảnh, giáo dục đến tin tức — tất cả trong một nền tảng duy nhất.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="flex items-center gap-4 flex-wrap justify-center mb-20"
        >
          <Link
            to="/film"
            className="flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold text-sm hover:bg-zinc-100 transition-all hover:shadow-xl"
          >
            <Play className="w-4 h-4 fill-black" /> Xem phim ngay
          </Link>
          <Link
            to="/education"
            className="flex items-center gap-2 bg-white/10 border border-white/20 text-white px-6 py-3 rounded-full font-bold text-sm hover:bg-white/15 transition-all backdrop-blur-sm"
          >
            Khám phá tất cả <ArrowRight className="w-4 h-4" />
          </Link>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 flex flex-col items-center gap-2"
        >
          <span className="text-white/30 text-xs tracking-widest uppercase">Khám phá</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-0.5 h-8 bg-gradient-to-b from-white/30 to-transparent"
          />
        </motion.div>
      </div>

      {/* ── Core Ecosystem Features ── */}
      <div className="max-w-7xl mx-auto px-6 py-20 relative z-10 border-t border-white/[0.05]">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-mono tracking-[0.3em] uppercase text-violet-400">GIẢI PHÁP ĐỒNG BỘ</span>
            <h2 className="text-3xl md:text-4xl font-black text-white leading-tight">Sức mạnh của sự thống nhất</h2>
            <p className="text-white/50 text-sm leading-relaxed">
              Các nền tảng của VHSM kết nối chặt chẽ qua một tài khoản duy nhất (Single Sign-On), tự động đồng bộ hóa dữ liệu thời gian thực và quản lý tập trung từ hệ thống ACOS Admin.
            </p>
            <div className="space-y-3 pt-2">
              {[
                'Đồng bộ sản phẩm, nội dung và khách hàng trên 6 kênh',
                'Phân tích chỉ số tăng trưởng tự động bằng AI',
                'Bảo mật mã hóa đầu cuối chuẩn bảo mật quốc tế',
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-2.5 text-xs text-white/70">
                  <span className="w-5 h-5 bg-violet-500/15 border border-violet-500/30 rounded-full flex items-center justify-center text-violet-400 font-bold">✓</span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
          
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[
              { title: 'Tốc độ siêu việt', desc: 'Sử dụng công nghệ Vite/React thế hệ mới, tối ưu hóa kích thước gói tin giúp tải trang chỉ dưới 0.5s.', icon: '⚡' },
              { title: 'Đa kênh tập trung', desc: 'Không cần đăng nhập nhiều nơi. Quản trị bán hàng, viết bài, phát phim, tạo khóa học chung một bảng điều khiển.', icon: '🎯' },
              { title: 'Thiết kế tinh tế', desc: 'Giao diện phong cách tối giản sang trọng, tập trung tối đa vào trải nghiệm người dùng cuối.', icon: '🎨' },
              { title: 'Hỗ trợ 24/7', desc: 'Mọi thắc mắc và sự cố kỹ thuật đều được hỗ trợ xử lý tức thời bởi đội ngũ kỹ sư chuyên nghiệp.', icon: '💬' },
            ].map((feat, idx) => (
              <div key={idx} className="bg-white/[0.015] border border-white/[0.05] hover:border-white/[0.1] rounded-2xl p-6 transition-all duration-300">
                <div className="text-2xl mb-3">{feat.icon}</div>
                <h4 className="text-white font-bold text-base mb-2">{feat.title}</h4>
                <p className="text-white/40 text-xs leading-relaxed">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Platform Grid ── */}
      <div id="platforms" className="max-w-7xl mx-auto px-6 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-white/40 block mb-3">Các nền tảng</span>
          <h2 className="text-3xl md:text-4xl font-black text-white">Chọn hành trình của bạn</h2>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {PLATFORMS.map((platform) => (
            <motion.div key={platform.id} variants={cardVariants}>
              <Link to={platform.path} className="group block h-full">
                <div className={`relative h-full rounded-2xl border bg-gradient-to-br ${platform.bg} ${platform.accent} overflow-hidden transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-black/50`}>

                  {/* Preview image */}
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={platform.preview}
                      alt={platform.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-90"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/80" />
                    {/* Emojis removed */}
                    {/* Name */}
                    <div className="absolute bottom-4 left-4">
                      <span className={`text-xs font-mono tracking-[0.25em] uppercase ${platform.textAccent}`}>
                        {platform.stats}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 space-y-3">
                    <div>
                      <h3 className="text-white font-black text-xl tracking-tight">{platform.name}</h3>
                      <p className={`text-sm font-medium ${platform.textAccent}`}>{platform.label}</p>
                    </div>
                    <p className="text-white/50 text-sm leading-relaxed">{platform.description}</p>

                    <div className={`flex items-center gap-2 text-sm font-semibold ${platform.textAccent} pt-2 group-hover:gap-3 transition-all`}>
                      Khám phá <ArrowRight className="w-4 h-4" />
                    </div>
                  </div>

                  {/* Hover glow */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
                    style={{ boxShadow: `inset 0 0 80px ${platform.color}10` }}
                  />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ── Partner & Trust Banner ── */}
      <div className="border-t border-white/[0.05] bg-white/[0.01] py-12 px-6 overflow-hidden relative z-10">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-center md:text-left flex-shrink-0">
            <span className="text-[10px] tracking-[0.2em] uppercase text-white/30 block mb-1">ĐỐI TÁC CHIẾN LƯỢC</span>
            <h4 className="text-sm font-bold text-white/70">Đồng hành cùng sự phát triển của các thương hiệu hàng đầu</h4>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 opacity-30 grayscale hover:opacity-55 hover:grayscale-0 transition-all duration-500">
            {['Vercel', 'Stripe', 'React', 'Tailwind', 'NextJS', 'GoogleCloud'].map(brand => (
              <span key={brand} className="text-sm font-black text-white/80 font-mono tracking-wider">{brand}</span>
            ))}
          </div>
        </div>
      </div>

      {/* ── Stats Strip ── */}
      <div className="border-y border-white/[0.06] py-10 px-6">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { icon: Film, label: 'Nền tảng', value: '6', suffix: '+' },
            { icon: BookOpen, label: 'Nội dung', value: '1,000', suffix: '+' },
            { icon: Users, label: 'Người dùng', value: '50K', suffix: '+' },
            { icon: Star, label: 'Đánh giá TB', value: '4.9', suffix: '★' },
          ].map(({ icon: Icon, label, value, suffix }) => (
            <motion.div key={label} className="text-center"
              initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
              <Icon className="w-5 h-5 text-white/30 mx-auto mb-2" />
              <div className="text-3xl font-black text-white">{value}<span className="text-violet-400">{suffix}</span></div>
              <div className="text-white/40 text-xs mt-1 uppercase tracking-wider">{label}</div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Business Insights Section ── */}
      <div className="max-w-7xl mx-auto px-6 pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-xs tracking-[0.3em] uppercase text-violet-400 block mb-3">TIN TỨC & SỰ KIỆN</span>
          <h2 className="text-3xl md:text-4xl font-black text-white">Câu chuyện doanh nghiệp</h2>
          <p className="text-white/40 text-sm mt-3 max-w-lg mx-auto">Các bài phân tích sâu sắc, xu hướng công nghệ và giải pháp phát triển bền vững từ VHSM Group.</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {BUSINESS_ARTICLES.map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white/[0.02] hover:bg-white/[0.04] border border-white/[0.08] hover:border-violet-500/30 rounded-2xl p-6 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="text-[10px] font-mono tracking-wider text-violet-400 uppercase bg-violet-500/10 px-2.5 py-1 rounded">
                    {article.category}
                  </span>
                  <span className="text-[11px] text-white/30">{article.date}</span>
                </div>
                <h3 className="text-white font-bold text-base mb-2 group-hover:text-violet-300 transition-colors line-clamp-2">
                  {article.title}
                </h3>
                <p className="text-white/45 text-xs leading-relaxed line-clamp-4 mb-6">
                  {article.excerpt}
                </p>
              </div>
              <div className="flex items-center justify-between pt-4 border-t border-white/[0.04] text-[11px] text-white/30">
                <span>Tác giả: {article.author}</span>
                <span className="flex items-center gap-1 text-violet-400 group-hover:translate-x-1 transition-transform cursor-pointer font-semibold">
                  Đọc thêm <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── FAQ Section ── */}
      <div className="max-w-3xl mx-auto px-6 pb-24 relative z-10">
        <div className="text-center mb-12">
          <span className="text-xs tracking-[0.3em] uppercase text-violet-400 block mb-3">HỖ TRỢ KHÁCH HÀNG</span>
          <h2 className="text-3xl font-black text-white">Câu hỏi thường gặp</h2>
        </div>
        <div className="bg-white/[0.01] border border-white/[0.05] rounded-2xl p-6 md:p-8 backdrop-blur-sm">
          {FAQS.map((faq, idx) => (
            <FaqAccordionItem key={idx} question={faq.question} answer={faq.answer} />
          ))}
        </div>
      </div>

      {/* ── Admin CTA ── */}
      <div className="border-t border-white/[0.05] py-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-white/[0.03] border border-white/10 rounded-2xl p-10 backdrop-blur-sm"
          >
            <span className="text-xs tracking-[0.3em] uppercase text-white/30 block mb-4">Quản trị viên</span>
            <h3 className="text-2xl md:text-3xl font-black text-white mb-4">Quản lý toàn bộ nội dung</h3>
            <p className="text-white/40 text-sm mb-8 max-w-md mx-auto">
              Thêm, sửa, xóa nội dung cho tất cả 6 nền tảng từ một trang admin duy nhất.
            </p>
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 bg-white text-black px-8 py-3 rounded-full font-bold text-sm hover:bg-zinc-100 transition-all"
            >
              Vào trang Admin <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Footer */}
      <SharedFooter theme="dark" accentColor="#6366F1" platformName="VHSM Platform" />
    </div>
  );
}
