import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Pause, Eye, Heart, MessageCircle, Share2, ChevronLeft, ThumbsUp, Bookmark, Volume2, VolumeX, Maximize2, SkipBack, SkipForward, X } from 'lucide-react';
import { VLOG_POSTS } from '@/constants/vlogData';

function formatViews(n: number) {
  if (n >= 1000000) return `${(n / 1000000).toFixed(1)} triệu`;
  if (n >= 1000) return `${(n / 1000).toFixed(0)}K`;
  return n.toString();
}

export default function VideoDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = VLOG_POSTS.find(p => p.slug === slug);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [liked, setLiked] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [playerOpen, setPlayerOpen] = useState(false);

  if (!post) return <Navigate to="/vlog" replace />;

  const related = VLOG_POSTS.filter(p => p.id !== post.id && p.category === post.category);

  return (
    <div className="min-h-screen bg-[#0F0A1A] text-white">
      <nav className="bg-black/50 backdrop-blur-xl border-b border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link to="/vlog" className="flex items-center gap-2 text-white/60 hover:text-violet-400 text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> CreatorSpace
          </Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">

            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-2xl overflow-hidden group cursor-pointer" onClick={() => setPlayerOpen(true)}>
              <img src={post.thumbnail} alt={post.title} className="w-full h-full object-cover opacity-80" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div whileHover={{ scale: 1.1 }} className="w-20 h-20 bg-white/90 rounded-full flex items-center justify-center shadow-2xl">
                  <Play className="w-9 h-9 text-violet-600 fill-violet-600 ml-1" />
                </motion.div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                <div className="w-full h-1 bg-white/20 rounded-full">
                  <div className="h-full bg-violet-500 rounded-full" style={{ width: `${progress}%` }} />
                </div>
              </div>
            </div>

            {/* Info */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(t => <span key={t} className="bg-violet-900/40 text-violet-300 text-xs px-2.5 py-1 rounded-full">{t}</span>)}
              </div>
              <h1 className="font-black text-white text-2xl md:text-3xl leading-tight">{post.title}</h1>

              <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <img src={post.creator.avatar} alt={post.creator.name} className="w-12 h-12 rounded-full object-cover ring-2 ring-violet-500/50" />
                    {post.creator.isVerified && <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-violet-500 rounded-full flex items-center justify-center text-white text-[9px] font-bold border-2 border-[#0F0A1A]">✓</div>}
                  </div>
                  <div>
                    <p className="font-bold text-white">{post.creator.name}</p>
                    <p className="text-white/50 text-xs">{(post.creator.subscribers / 1000).toFixed(0)}K subscribers</p>
                  </div>
                  <button className="bg-violet-600 hover:bg-violet-700 text-white text-sm px-4 py-2 rounded-full font-medium transition-colors ml-2">
                    Theo dõi
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button onClick={() => setLiked(!liked)} className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all border ${liked ? 'bg-violet-600/20 border-violet-500 text-violet-300' : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'}`}>
                    <ThumbsUp className={`w-4 h-4 ${liked ? 'fill-current' : ''}`} /> {formatViews(post.likes + (liked ? 1 : 0))}
                  </button>
                  <button onClick={() => setBookmarked(!bookmarked)} className={`p-2.5 rounded-full transition-all border ${bookmarked ? 'bg-violet-600/20 border-violet-500 text-violet-300' : 'bg-white/10 border-white/20 text-white/70 hover:bg-white/15'}`}>
                    <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
                  </button>
                  <button className="p-2.5 rounded-full bg-white/10 border border-white/20 text-white/70 hover:bg-white/15 transition-all">
                    <Share2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 text-white/40 text-sm border-t border-white/10 pt-4">
                <span className="flex items-center gap-1.5"><Eye className="w-4 h-4" />{formatViews(post.views)} lượt xem</span>
                <span className="flex items-center gap-1.5"><MessageCircle className="w-4 h-4" />{post.comments} bình luận</span>
              </div>

              <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                <p className="text-white/70 text-sm leading-relaxed">{post.description}</p>
              </div>
            </motion.div>

            {/* Comments (mock) */}
            <div className="space-y-4">
              <h2 className="font-bold text-white text-lg">{post.comments} bình luận</h2>
              {[
                { name: 'Nguyễn Minh An', text: 'Video quá hay! Cảm ơn bạn đã chia sẻ 🔥', time: '2 giờ trước', likes: 124 },
                { name: 'Trần Thị Lan', text: 'Mình đã đến nơi này rồi, đúng y như video mô tả. Recommend 100%!', time: '5 giờ trước', likes: 87 },
                { name: 'Lê Văn Hùng', text: 'Chi phí bao nhiêu vậy bạn? Muốn đi quá mà chưa biết cần chuẩn bị budget như nào', time: '1 ngày trước', likes: 45 },
              ].map((c, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-violet-500 to-pink-500 flex items-center justify-center text-sm font-bold text-white flex-shrink-0">{c.name[0]}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-white font-medium text-sm">{c.name}</span>
                      <span className="text-white/40 text-xs">{c.time}</span>
                    </div>
                    <p className="text-white/70 text-sm">{c.text}</p>
                    <button className="flex items-center gap-1.5 text-white/40 text-xs mt-2 hover:text-white/70 transition-colors">
                      <ThumbsUp className="w-3.5 h-3.5" />{c.likes}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right: Related */}
          <div className="space-y-4">
            <h3 className="font-bold text-white/70 text-sm uppercase tracking-wider">Xem thêm</h3>
            {related.map(p => (
              <Link key={p.id} to={`/vlog/video/${p.slug}`} className="group flex gap-3 hover:bg-white/5 rounded-xl p-2 transition-colors">
                <div className="relative w-36 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                  <img src={p.thumbnail} alt={p.title} className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" />
                  <span className="absolute bottom-1 right-1 bg-black/70 text-white text-[10px] px-1.5 py-0.5 rounded font-mono">{p.duration}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white/90 text-sm leading-snug line-clamp-2 group-hover:text-violet-300 transition-colors">{p.title}</h4>
                  <p className="text-white/50 text-xs mt-1">{p.creator.name}</p>
                  <p className="text-white/40 text-xs">{formatViews(p.views)} · {p.duration}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Full Player Modal */}
      <AnimatePresence>
        {playerOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black flex flex-col">
            <div className="flex items-center justify-between p-4 bg-black/80">
              <p className="text-white font-bold text-sm">{post.title}</p>
              <button onClick={() => { setPlayerOpen(false); setPlaying(false); }} className="p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="flex-1 flex items-center justify-center relative bg-black cursor-pointer" onClick={() => setPlaying(!playing)}>
              <img src={post.thumbnail} alt={post.title} className="max-w-full max-h-full object-contain opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <motion.div animate={{ scale: playing ? [1, 0.9, 1] : 1 }} className="w-20 h-20 bg-white/10 rounded-full flex items-center justify-center">
                  {playing ? <Pause className="w-9 h-9 text-white fill-white" /> : <Play className="w-9 h-9 text-white fill-white ml-1" />}
                </motion.div>
              </div>
            </div>
            <div className="p-6 bg-black/80 space-y-3">
              <div className="w-full h-1.5 bg-white/20 rounded-full cursor-pointer" onClick={e => { const r = e.currentTarget.getBoundingClientRect(); setProgress(Math.round(((e.clientX - r.left) / r.width) * 100)); }}>
                <div className="h-full bg-violet-500 rounded-full transition-all" style={{ width: `${progress}%` }} />
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <button className="text-white/70 hover:text-white"><SkipBack className="w-5 h-5" /></button>
                  <button onClick={() => setPlaying(!playing)} className="text-white">{playing ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}</button>
                  <button className="text-white/70 hover:text-white"><SkipForward className="w-5 h-5" /></button>
                  <button onClick={() => setMuted(!muted)} className="text-white/70 hover:text-white">
                    {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                  </button>
                </div>
                <button className="text-white/70 hover:text-white"><Maximize2 className="w-5 h-5" /></button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
