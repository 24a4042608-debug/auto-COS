import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Clock, Eye, TrendingUp, ChevronRight, Sun, Moon, Menu, X, Radio } from 'lucide-react';
import { ARTICLES, NEWS_CATEGORIES, BREAKING_NEWS, FEATURED_ARTICLES } from '@/constants/newsData';
import SharedFooter from '@/components/SharedFooter';

function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = (now.getTime() - date.getTime()) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
}

const categoryColorMap: Record<string, string> = {
  tech: 'bg-indigo-100 text-indigo-700',
  economy: 'bg-emerald-100 text-emerald-700',
  sport: 'bg-amber-100 text-amber-700',
  entertainment: 'bg-pink-100 text-pink-700',
  world: 'bg-sky-100 text-sky-700',
  society: 'bg-violet-100 text-violet-700',
};

function ArticleCard({ article, size = 'sm' }: { article: typeof ARTICLES[0]; size?: 'lg' | 'sm' }) {
  const catLabel = NEWS_CATEGORIES.find(c => c.id === article.category)?.label || article.category;
  return (
    <Link to={`/news/article/${article.slug}`} className="group block">
      {size === 'lg' ? (
        <div className="relative rounded-2xl overflow-hidden">
          <img src={article.thumbnail} alt={article.title} className="w-full h-80 md:h-96 object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-6 space-y-3">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded ${categoryColorMap[article.category] || 'bg-white/20 text-white'}`}>{catLabel}</span>
            <h2 className="text-white font-black text-xl md:text-2xl leading-tight line-clamp-2 group-hover:text-rose-300 transition-colors">{article.title}</h2>
            <div className="flex items-center gap-3 text-white/60 text-xs">
              <span>{article.author}</span>
              <span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{article.readingTime} phút đọc</span>
              <span>·</span>
              <span>{timeAgo(article.publishedAt)}</span>
            </div>
          </div>
          {article.isBreaking && (
            <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-full">
              <Radio className="w-3 h-3 animate-pulse" /> BREAKING
            </div>
          )}
        </div>
      ) : (
        <div className="flex gap-4 items-start p-4 rounded-xl hover:bg-slate-50 transition-colors">
          <img src={article.thumbnail} alt={article.title} className="w-24 h-20 object-cover rounded-lg flex-shrink-0 transition-transform duration-300 group-hover:scale-105" />
          <div className="flex-1 min-w-0 space-y-1.5">
            <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${categoryColorMap[article.category] || 'bg-slate-100 text-slate-500'}`}>{catLabel}</span>
            <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-rose-600 transition-colors">{article.title}</h3>
            <div className="flex items-center gap-2 text-slate-400 text-[11px]">
              <Clock className="w-3 h-3" />{article.readingTime} phút
              <Eye className="w-3 h-3 ml-1" />{(article.views / 1000).toFixed(1)}k
              <span>· {timeAgo(article.publishedAt)}</span>
            </div>
          </div>
        </div>
      )}
    </Link>
  );
}

export default function NewsHomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  const filtered = ARTICLES.filter(a => {
    const matchCat = activeCategory === 'all' || a.category === activeCategory;
    const matchSearch = !searchQuery || a.title.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const featuredArticle = FEATURED_ARTICLES[0];
  const sideArticles = filtered.filter(a => a.id !== featuredArticle?.id).slice(0, 6);

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'bg-zinc-950 text-white' : 'bg-white text-slate-800'}`}>

      {/* ── Breaking News Ticker ── */}
      <div className="bg-red-600 text-white text-xs py-1.5 overflow-hidden">
        <div className="flex items-center gap-4 px-4 animate-scroll">
          <span className="font-black uppercase tracking-widest flex-shrink-0 bg-white text-red-600 px-2 py-0.5 rounded text-[10px]">NÓNG</span>
          <div className="flex gap-8">
            {BREAKING_NEWS.map(a => (
              <Link key={a.id} to={`/news/article/${a.slug}`} className="flex-shrink-0 hover:text-red-200 transition-colors">
                {a.title.slice(0, 70)}...
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── Navbar ── */}
      <nav className={`sticky top-0 z-50 border-b shadow-sm ${darkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-slate-100'}`}>
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/news" className="flex items-center gap-2.5 flex-shrink-0">
            <div className="w-8 h-8 bg-red-600 rounded flex items-center justify-center">
              <TrendingUp className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-xl tracking-tight">PulseNews</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {NEWS_CATEGORIES.slice(1).map(cat => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                  activeCategory === cat.id ? 'bg-red-50 text-red-600' : `${darkMode ? 'text-zinc-300 hover:bg-zinc-800' : 'text-slate-500 hover:bg-slate-50'}`
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button onClick={() => setSearchOpen(!searchOpen)} className={`p-2 rounded-full ${darkMode ? 'hover:bg-zinc-800' : 'hover:bg-slate-100'} transition-colors`}>
              <Search className="w-4 h-4" />
            </button>
            <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full ${darkMode ? 'hover:bg-zinc-800' : 'hover:bg-slate-100'} transition-colors`}>
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div initial={{ height: 0 }} animate={{ height: 'auto' }} exit={{ height: 0 }} className="overflow-hidden">
              <div className={`px-6 py-3 border-t ${darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-slate-100'}`}>
                <div className="relative max-w-2xl mx-auto">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                  <input
                    autoFocus
                    value={searchQuery}
                    onChange={e => setSearchQuery(e.target.value)}
                    placeholder="Tìm kiếm tin tức..."
                    className={`w-full pl-11 pr-4 py-3 rounded-xl text-sm outline-none border ${
                      darkMode ? 'bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500' : 'bg-slate-50 border-slate-200 text-slate-800'
                    } focus:border-red-400 transition-colors`}
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ── Main Content ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Category Quick Tabs on Main Page */}
        <div className="flex gap-2 overflow-x-auto pb-4 mb-6 border-b border-dashed border-slate-200/60 md:hidden scrollbar-hide">
          {NEWS_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                activeCategory === cat.id
                  ? 'bg-red-600 text-white shadow-md shadow-red-200'
                  : `bg-slate-100 text-slate-600 hover:bg-slate-200 ${darkMode ? 'bg-zinc-800 text-zinc-300 hover:bg-zinc-700' : ''}`
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Featured */}
          <div className="lg:col-span-2 space-y-6">
            {featuredArticle && <ArticleCard article={featuredArticle} size="lg" />}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {filtered.slice(1, 5).map(article => (
                <Link key={article.id} to={`/news/article/${article.slug}`} className="group">
                  <div className={`rounded-xl overflow-hidden border ${darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-slate-100 bg-white'} hover:shadow-md transition-shadow`}>
                    <img src={article.thumbnail} alt={article.title} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" />
                    <div className="p-4 space-y-2">
                      <span className={`text-[10px] font-bold uppercase tracking-wide px-2 py-0.5 rounded ${categoryColorMap[article.category] || 'bg-slate-100 text-slate-500'}`}>
                        {NEWS_CATEGORIES.find(c => c.id === article.category)?.label}
                      </span>
                      <h3 className={`font-bold text-sm leading-snug line-clamp-2 group-hover:text-red-600 transition-colors ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                        {article.title}
                      </h3>
                      <div className="flex items-center gap-2 text-slate-400 text-[11px]">
                        <Clock className="w-3 h-3" />{article.readingTime} phút · {timeAgo(article.publishedAt)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Right: Sidebar */}
          <div className="space-y-6">
            {/* Trending */}
            <div className={`rounded-xl border p-5 ${darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-slate-100 bg-white'}`}>
              <h3 className={`font-black text-base mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                <TrendingUp className="w-4 h-4 text-red-600" /> Đang hot
              </h3>
              <div className="space-y-1">
                {[...ARTICLES].sort((a, b) => b.views - a.views).slice(0, 5).map((article, i) => (
                  <Link key={article.id} to={`/news/article/${article.slug}`} className={`flex gap-3 items-start p-3 rounded-lg hover:bg-slate-50 transition-colors group ${darkMode ? 'hover:bg-zinc-800' : ''}`}>
                    <span className="text-2xl font-black text-slate-200 w-6 flex-shrink-0 leading-none">{i + 1}</span>
                    <p className={`text-sm font-medium leading-snug line-clamp-2 group-hover:text-red-600 transition-colors ${darkMode ? 'text-zinc-300' : 'text-slate-700'}`}>
                      {article.title}
                    </p>
                  </Link>
                ))}
              </div>
            </div>

            {/* Opinion Columns / Góc nhìn Chuyên gia */}
            <div className={`rounded-xl border p-5 ${darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-slate-100 bg-white'}`}>
              <h3 className={`font-black text-base mb-4 flex items-center gap-2 ${darkMode ? 'text-white' : 'text-slate-800'}`}>
                ✍️ Góc nhìn & Bình luận
              </h3>
              <div className="space-y-4">
                {[
                  {
                    title: "AI liệu có cướp đi công việc của giới thiết kế giao diện?",
                    author: "Phan Anh Vũ",
                    role: "Product Lead",
                    avatar: "https://i.pravatar.cc/150?img=33"
                  },
                  {
                    title: "Bong bóng xe điện và bài học kinh tế toàn cầu từ năm 2026",
                    author: "GS. Nguyễn Trí Dũng",
                    role: "Chuyên gia tài chính",
                    avatar: "https://i.pravatar.cc/150?img=60"
                  },
                  {
                    title: "Tương lai của làm việc từ xa (Remote Work) hậu biến đổi số",
                    author: "Lê Khánh Hà",
                    role: "HR Director",
                    avatar: "https://i.pravatar.cc/150?img=47"
                  }
                ].map((opinion, idx) => (
                  <div key={idx} className="flex gap-3 items-start group cursor-pointer">
                    <img src={opinion.avatar} alt={opinion.author} className="w-10 h-10 rounded-full object-cover border border-slate-100 flex-shrink-0" />
                    <div className="space-y-1">
                      <h4 className={`text-xs font-bold leading-snug group-hover:text-red-600 transition-colors ${darkMode ? 'text-zinc-200' : 'text-slate-800'}`}>
                        {opinion.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 font-medium">{opinion.author} · {opinion.role}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* More news */}
            <div className={`rounded-xl border p-5 ${darkMode ? 'border-zinc-800 bg-zinc-900' : 'border-slate-100 bg-white'}`}>
              <h3 className={`font-black text-base mb-4 ${darkMode ? 'text-white' : 'text-slate-800'}`}>Tin mới nhất</h3>
              <div className="space-y-1">
                {sideArticles.map(article => (
                  <ArticleCard key={article.id} article={article} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Photo Stories Section ── */}
      <div className={`py-12 border-t ${darkMode ? 'border-zinc-800 bg-zinc-950' : 'border-slate-100 bg-slate-50'}`}>
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex items-center justify-between mb-8">
            <h3 className={`text-xl font-black ${darkMode ? 'text-white' : 'text-slate-800'}`}>📸 Tin Ảnh Nổi Bật</h3>
            <span className="text-xs text-red-600 font-medium cursor-pointer hover:underline">Xem tất cả</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                title: "Thượng đỉnh G20 bàn về chính sách năng lượng xanh và chuyển đổi số",
                img: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?w=500&q=80",
                views: "15k"
              },
              {
                title: "Hàng triệu du khách đổ về lễ hội hóa trang Venice nổi tiếng nước Ý",
                img: "https://images.unsplash.com/photo-1527631746610-bca00a040d60?w=500&q=80",
                views: "34k"
              },
              {
                title: "Khởi động cuộc thi Robocon 2026 với chủ đề kiến tạo hành tinh xanh",
                img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=500&q=80",
                views: "22k"
              },
              {
                title: "NASA công bố hình ảnh mới nhất về vành đai sao Thổ qua kính viễn vọng không gian",
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
                views: "45k"
              }
            ].map((photo, i) => (
              <div key={i} className="group relative aspect-[16/10] rounded-xl overflow-hidden shadow-sm cursor-pointer">
                <img src={photo.img} alt={photo.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 space-y-1">
                  <h4 className="text-white text-xs font-bold leading-snug line-clamp-2 group-hover:text-red-300 transition-colors">
                    {photo.title}
                  </h4>
                  <div className="flex items-center justify-between text-[9px] text-white/50">
                    <span>Tin ảnh</span>
                    <span>👁️ {photo.views}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <SharedFooter theme={darkMode ? 'dark' : 'light'} accentColor="#DC2626" platformName="PulseNews" />
    </div>
  );
}
