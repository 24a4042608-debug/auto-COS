import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Clock, Eye, ChevronLeft, Share2, Bookmark } from 'lucide-react';
import { ARTICLES, NEWS_CATEGORIES } from '@/constants/newsData';


function timeAgo(dateStr: string): string {
  const now = new Date();
  const date = new Date(dateStr);
  const diff = (now.getTime() - date.getTime()) / 1000;
  if (diff < 3600) return `${Math.floor(diff / 60)} phút trước`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} giờ trước`;
  return `${Math.floor(diff / 86400)} ngày trước`;
}

export default function ArticleDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const article = ARTICLES.find(a => a.slug === slug);
  if (!article) return <Navigate to="/news" replace />;

  const related = ARTICLES.filter(a => a.id !== article.id && a.category === article.category).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/news" className="flex items-center gap-2 text-slate-600 hover:text-red-600 transition-colors text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> PulseNews
          </Link>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Bookmark className="w-4 h-4 text-slate-600" /></button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Share2 className="w-4 h-4 text-slate-600" /></button>
          </div>
        </div>
      </nav>

      <article className="max-w-3xl mx-auto px-6 py-12">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
          {/* Category + meta */}
          <div className="flex items-center gap-3 flex-wrap">
            <Link to={`/news/category/${article.category}`} className="bg-red-600 text-white text-xs font-bold uppercase tracking-wide px-3 py-1.5 rounded-full hover:bg-red-700 transition-colors">
              {NEWS_CATEGORIES.find(c => c.id === article.category)?.label}
            </Link>
            <span className="flex items-center gap-1.5 text-slate-400 text-sm"><Clock className="w-3.5 h-3.5" />{article.readingTime} phút đọc</span>
            <span className="flex items-center gap-1.5 text-slate-400 text-sm"><Eye className="w-3.5 h-3.5" />{article.views.toLocaleString()} lượt xem</span>
          </div>

          {/* Headline */}
          <h1 className="text-3xl md:text-4xl font-black text-slate-900 leading-tight">{article.title}</h1>
          <p className="text-slate-500 text-lg leading-relaxed border-l-4 border-red-500 pl-4">{article.excerpt}</p>

          {/* Author */}
          <div className="flex items-center gap-3 border-y border-slate-100 py-4">
            <img src={article.authorAvatar} alt={article.author} className="w-10 h-10 rounded-full object-cover" />
            <div>
              <p className="font-bold text-slate-800 text-sm">{article.author}</p>
              <p className="text-slate-400 text-xs">{timeAgo(article.publishedAt)}</p>
            </div>
            <div className="ml-auto flex gap-2">
              <button className="flex items-center gap-1.5 bg-blue-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-600 transition-colors">
                <Share2 className="w-3 h-3" /> Twitter
              </button>
              <button className="flex items-center gap-1.5 bg-blue-700 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-blue-800 transition-colors">
                <Share2 className="w-3 h-3" /> Facebook
              </button>
            </div>
          </div>

          {/* Hero image */}
          <div className="rounded-2xl overflow-hidden">
            <img src={article.thumbnail} alt={article.title} className="w-full h-64 md:h-80 object-cover" />
            <p className="text-slate-400 text-xs mt-2 text-center italic">Ảnh minh họa</p>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none text-slate-700 leading-relaxed text-base">
            <p>{article.content}</p>
            <p className="mt-4">
              Theo các chuyên gia trong lĩnh vực, đây là một trong những sự kiện quan trọng nhất trong năm 2025. Các diễn biến tiếp theo sẽ được PulseNews cập nhật liên tục.
            </p>
            <p className="mt-4">
              Cộng đồng và dư luận đang theo dõi sát sao tình hình. Nhiều ý kiến đã được đưa ra từ các chuyên gia hàng đầu, với đa số nhận định rằng đây là bước ngoặt quan trọng.
            </p>
            <blockquote className="border-l-4 border-red-500 pl-6 py-2 bg-red-50 rounded-r-xl my-6">
              "Đây là thời điểm quan trọng đòi hỏi sự phản ứng kịp thời và chính xác từ tất cả các bên liên quan."
              <footer className="text-slate-500 text-sm mt-2">— Chuyên gia phân tích</footer>
            </blockquote>
            <p>
              Sự kiện này được dự kiến sẽ tiếp tục phát triển trong những ngày tới. PulseNews sẽ liên tục cập nhật những thông tin mới nhất và chính xác nhất đến bạn đọc.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 pt-4 border-t border-slate-100">
            {article.tags.map(tag => (
              <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-3 py-1.5 rounded-full hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors">{tag}</span>
            ))}
          </div>
        </motion.div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <div className="bg-slate-50 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="font-black text-2xl text-slate-800 mb-6">Tin liên quan</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map(a => (
                <Link key={a.id} to={`/news/article/${a.slug}`} className="group bg-white rounded-xl overflow-hidden border border-slate-100 hover:shadow-md transition-shadow">
                  <img src={a.thumbnail} alt={a.title} className="w-full h-40 object-cover transition-transform duration-300 group-hover:scale-105" />
                  <div className="p-4">
                    <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-red-600 transition-colors">{a.title}</h3>
                    <p className="text-slate-400 text-xs mt-2">{timeAgo(a.publishedAt)}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
