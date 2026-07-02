import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Play, Eye, Heart, MessageCircle, Search, TrendingUp, ChevronRight, Bell, Video, ListVideo } from 'lucide-react';
import { VLOG_POSTS, VLOG_CATEGORIES, CREATORS, TRENDING_POSTS, FEATURED_POST, PLAYLISTS } from '@/constants/vlogData';
import SharedFooter from '@/components/SharedFooter';

function formatViews(n: number): string {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)}Tr`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const days = Math.floor((now.getTime() - date.getTime()) / 86400000);
  if (days === 0) return 'Hôm nay';
  if (days < 7) return `${days} ngày trước`;
  if (days < 30) return `${Math.floor(days / 7)} tuần trước`;
  return `${Math.floor(days / 30)} tháng trước`;
}

function VideoCard({ post, size = 'sm', index = 0 }: { post: typeof VLOG_POSTS[0]; size?: 'lg' | 'sm'; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.06, duration: 0.4 }}
    >
      <Link to={`/vlog/video/${post.slug}`} className="group block">
        {size === 'lg' ? (
          <div className="relative rounded-2xl overflow-hidden aspect-video">
            <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="w-16 h-16 bg-white/90 rounded-full flex items-center justify-center shadow-xl">
                <Play className="w-7 h-7 text-violet-600 fill-violet-600 ml-1" />
              </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <div className="flex items-center gap-2 mb-2">
                <img src={post.creator.avatar} alt={post.creator.name} className="w-8 h-8 rounded-full border-2 border-white/50 object-cover" />
                <span className="text-white/80 text-sm">{post.creator.name}</span>
                {post.creator.isVerified && <span className="w-4 h-4 bg-violet-500 rounded-full flex items-center justify-center text-white text-[8px]">✓</span>}
              </div>
              <h2 className="text-white font-black text-xl md:text-2xl leading-tight line-clamp-2">{post.title}</h2>
              <div className="flex items-center gap-4 mt-2 text-white/60 text-sm">
                <span className="flex items-center gap-1"><Eye className="w-3.5 h-3.5" />{formatViews(post.views)}</span>
                <span className="flex items-center gap-1"><Heart className="w-3.5 h-3.5" />{formatViews(post.likes)}</span>
                <span>{timeAgo(post.publishedAt)}</span>
                <span className="bg-black/50 text-white text-xs px-2 py-0.5 rounded ml-auto">{post.duration}</span>
              </div>
            </div>
            {post.isTrending && (
              <div className="absolute top-4 left-4 flex items-center gap-1 bg-orange-500 text-white text-xs font-bold px-2.5 py-1 rounded-full">
                <TrendingUp className="w-3 h-3" /> Trending
              </div>
            )}
          </div>
        ) : (
          <div className="flex gap-3">
            <div className="relative w-40 h-24 flex-shrink-0 rounded-xl overflow-hidden">
              <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <Play className="w-6 h-6 text-white fill-white" />
              </div>
              <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">{post.duration}</span>
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <h3 className="font-bold text-sm leading-snug line-clamp-2 text-slate-800 group-hover:text-violet-600 transition-colors">{post.title}</h3>
              <div className="flex items-center gap-1.5">
                <img src={post.creator.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                <span className="text-slate-500 text-xs">{post.creator.name}</span>
              </div>
              <div className="flex items-center gap-2 text-slate-400 text-xs">
                <span>{formatViews(post.views)} lượt xem</span>
                <span>·</span>
                <span>{timeAgo(post.publishedAt)}</span>
              </div>
            </div>
          </div>
        )}
      </Link>
    </motion.div>
  );
}

const SHORTS_MOCK = [
  { id: 's1', title: 'Review nhanh bàn phím cơ quang học mới cực êm ⌨️', views: '230K', img: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&q=80' },
  { id: 's2', title: 'Một ngày làm việc của lập trình viên tại Hà Nội ☕', views: '1.2M', img: 'https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=400&q=80' },
  { id: 's3', title: 'Mẹo thiết kế Figma Auto-Layout đỉnh cao trong 60s 💡', views: '450K', img: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80' },
  { id: 's4', title: 'Thử thách code 1 trang web trong 10 phút ⏱️', views: '95K', img: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=400&q=80' },
  { id: 's5', title: 'Top 3 ứng dụng hữu ích mà sinh viên CNTT phải biết 🚀', views: '380K', img: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=400&q=80' }
];

export default function VlogHomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = VLOG_POSTS.filter(p => {
    const matchCat = activeCategory === 'all' || p.category === activeCategory;
    const matchSearch = !searchQuery || p.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0F0A1A] text-white">
      {/* ── Navbar ── */}
      <nav className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/vlog" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-violet-600 to-pink-500 rounded-lg flex items-center justify-center">
              <Video className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-white text-lg">CreatorSpace</span>
          </Link>

          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
            <input
              type="text"
              placeholder="Tìm video, creator..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-full pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/40 outline-none focus:border-violet-400 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin/vlog" className="text-white/50 hover:text-violet-400 transition-colors text-sm hidden md:block">Admin</Link>
            <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
              <Bell className="w-5 h-5 text-white/70" />
            </button>
          </div>
        </div>
      </nav>

      {/* ── Featured Hero ── */}
      <div className="max-w-7xl mx-auto px-6 pt-8 pb-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <VideoCard post={FEATURED_POST} size="lg" />
          </div>
          <div className="space-y-4">
            <h3 className="font-bold text-white/70 text-sm uppercase tracking-wider flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-orange-400" /> Trending
            </h3>
            {TRENDING_POSTS.slice(0, 3).map(post => (
              <VideoCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {VLOG_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/30'
                  : 'bg-white/10 text-white/70 hover:bg-white/15 border border-white/10'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Creators Spotlight ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-black text-lg text-white">🌟 Creator nổi bật</h2>
          <Link to="/vlog/creators" className="text-violet-400 text-sm hover:text-violet-300 flex items-center gap-1">Xem tất cả <ChevronRight className="w-4 h-4" /></Link>
        </div>
        <div className="flex gap-5 overflow-x-auto pb-2 scrollbar-hide">
          {CREATORS.map((creator, idx) => {
            const isLive = idx === 0 || idx === 2; // Make some channels live
            return (
              <Link key={creator.id} to={`/vlog/creator/${creator.handle}`} className="flex-shrink-0 group relative text-decoration-none">
                <div className="relative">
                  <div className={`w-20 h-20 rounded-full overflow-hidden transition-all ${
                    isLive 
                      ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-[#0F0A1A] animate-pulse' 
                      : 'ring-2 ring-violet-500/50 group-hover:ring-violet-400'
                  }`}>
                    <img src={creator.avatar} alt={creator.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                  </div>
                  {isLive ? (
                    <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 bg-red-600 text-white text-[8px] font-black px-1.5 py-0.5 rounded uppercase tracking-wider shadow-md">LIVE</span>
                  ) : creator.isVerified ? (
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-violet-500 rounded-full flex items-center justify-center border-2 border-[#0F0A1A] text-white text-[10px] font-bold">✓</div>
                  ) : null}
                </div>
                <p className="text-center text-xs text-white/70 mt-2 max-w-[80px] truncate group-hover:text-white transition-colors">{creator.name.split(' ').slice(-1)[0]}</p>
                <p className="text-center text-[10px] text-violet-400">{(creator.subscribers / 1000).toFixed(0)}K phụ</p>
              </Link>
            );
          })}
        </div>
      </div>

      {/* ── YouTube-Style Shorts Section ── */}
      <div className="max-w-7xl mx-auto px-6 py-6 border-t border-white/5 bg-black/10">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-red-500 text-lg">⚡</span>
          <h2 className="font-black text-lg text-white">Shorts</h2>
        </div>
        <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide">
          {SHORTS_MOCK.map((short) => (
            <div key={short.id} className="flex-shrink-0 w-36 sm:w-40 group cursor-pointer">
              <div className="relative aspect-[9/16] rounded-2xl overflow-hidden mb-2 bg-zinc-950">
                <img src={short.img} alt={short.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-85" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <span className="absolute bottom-2 left-2 text-[10px] text-white/80 font-medium">👁️ {short.views} lượt xem</span>
              </div>
              <h3 className="text-white text-xs font-bold leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors">
                {short.title}
              </h3>
            </div>
          ))}
        </div>
      </div>

      {/* ── Video Grid ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-lg text-white">
            {activeCategory === 'all' ? '🎬 Tất cả video' : VLOG_CATEGORIES.find(c => c.id === activeCategory)?.label}
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((post, i) => (
            <Link key={post.id} to={`/vlog/video/${post.slug}`} className="group block bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-[0_0_20px_rgba(139,92,246,0.25)] hover:border-violet-500/40">
              <div className="relative aspect-video overflow-hidden">
                <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                    <Play className="w-5 h-5 text-violet-600 fill-violet-600 ml-0.5" />
                  </div>
                </div>
                <span className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-0.5 rounded font-mono">{post.duration}</span>
                {post.isTrending && (
                  <span className="absolute top-2 left-2 bg-orange-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <TrendingUp className="w-3 h-3" /> Hot
                  </span>
                )}
              </div>
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <img src={post.creator.avatar} alt="" className="w-7 h-7 rounded-full object-cover flex-shrink-0" />
                  <span className="text-white/60 text-xs">{post.creator.name}</span>
                </div>
                <h3 className="font-bold text-white text-sm leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors">{post.title}</h3>
                <div className="flex items-center gap-3 text-white/40 text-xs">
                  <span className="flex items-center gap-1"><Eye className="w-3 h-3" />{formatViews(post.views)}</span>
                  <span className="flex items-center gap-1"><Heart className="w-3 h-3" />{formatViews(post.likes)}</span>
                  <span className="flex items-center gap-1"><MessageCircle className="w-3 h-3" />{formatViews(post.comments)}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* ── Playlists Section ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-xl text-white flex items-center gap-2">
            <ListVideo className="w-5 h-5 text-violet-400" /> Playlist nổi bật
          </h2>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {PLAYLISTS.map((pl, i) => (
            <motion.div key={pl.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}>
              <Link to={`/vlog/playlist/${pl.id}`} className="group block">
                <div className="relative aspect-video rounded-2xl overflow-hidden mb-3">
                  <img src={pl.thumbnail} alt={pl.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-black/40" />
                  <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded font-semibold">{pl.videoCount} video</div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-violet-600 fill-violet-600 ml-0.5" />
                    </div>
                  </div>
                </div>
                <h3 className="font-bold text-white text-sm group-hover:text-violet-300 transition-colors">{pl.title}</h3>
                <p className="text-white/50 text-xs mt-0.5">{pl.description}</p>
                <div className="flex items-center gap-1.5 mt-1.5">
                  <img src={pl.creator.avatar} alt="" className="w-5 h-5 rounded-full object-cover" />
                  <span className="text-white/40 text-xs">{pl.creator.name}</span>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Back */}
      <SharedFooter theme="dark" accentColor="#7C3AED" platformName="CreatorSpace" />
    </div>
  );
}
