import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Play, Sparkles, Star, Users, Film, BookOpen } from 'lucide-react';
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
    <div className="min-h-screen bg-[#050508] text-white overflow-x-hidden">

      {/* ── Hero ── */}
      <div className="relative min-h-screen flex flex-col items-center justify-center px-6 pt-20 pb-16">
        {/* Background glow orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px]" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/5 rounded-full blur-[180px]" />
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

      {/* ── Platform Grid ── */}
      <div className="max-w-7xl mx-auto px-6 pb-24">
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
                    {/* Icon */}
                    <div className="absolute top-4 left-4 text-3xl">{platform.icon}</div>
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
