import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, Star, Users, Clock, BookOpen, TrendingUp, Award, ChevronRight, Play } from 'lucide-react';
import { COURSES, EDUCATION_CATEGORIES, FEATURED_COURSE, EDUCATION_BLOG_POSTS } from '@/constants/educationData';
import SharedFooter from '@/components/SharedFooter';

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

function CourseCard({ course, index }: { course: typeof COURSES[0]; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: (index || 0) * 0.07, duration: 0.4 }}
    >
      <Link to={`/education/course/${course.slug}`} className="group block bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-100 hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="relative aspect-video overflow-hidden">
          <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
              <Play className="w-5 h-5 text-indigo-600 fill-indigo-600 ml-0.5" />
            </div>
          </div>
          {course.isBestseller && (
            <span className="absolute top-2 left-2 bg-yellow-400 text-yellow-900 text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Bestseller</span>
          )}
          {course.isNew && (
            <span className="absolute top-2 left-2 bg-indigo-600 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">Mới</span>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-bold text-slate-800 text-sm leading-snug line-clamp-2 group-hover:text-indigo-600 transition-colors">{course.title}</h3>
          <p className="text-slate-500 text-xs">{course.instructor}</p>

          <div className="flex items-center gap-1.5">
            <span className="text-yellow-500 font-bold text-xs">{course.rating}</span>
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`w-3 h-3 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
              ))}
            </div>
            <span className="text-slate-400 text-[11px]">({course.reviewCount.toLocaleString()})</span>
          </div>

          <div className="flex items-center gap-3 text-[11px] text-slate-400">
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" />{course.duration}</span>
            <span className="flex items-center gap-1"><BookOpen className="w-3 h-3" />{course.lessons} bài</span>
            <span className="flex items-center gap-1"><Users className="w-3 h-3" />{(course.studentCount / 1000).toFixed(1)}k</span>
          </div>

          <div className="flex items-center gap-2 pt-1">
            <span className="font-black text-slate-800">{formatPrice(course.price)}</span>
            <span className="text-slate-400 text-xs line-through">{formatPrice(course.originalPrice)}</span>
            <span className="text-emerald-600 text-xs font-bold">-{Math.round((1 - course.price / course.originalPrice) * 100)}%</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function EducationHomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = COURSES.filter(c => {
    const matchCat = activeCategory === 'all' || c.category === activeCategory;
    const matchSearch = !searchQuery || c.title.toLowerCase().includes(searchQuery.toLowerCase()) || c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800">
      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/education" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-600 to-violet-600 rounded-lg flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-slate-800 text-lg tracking-tight">EduHub</span>
          </Link>

          {/* Search */}
          <div className="flex-1 max-w-lg relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              placeholder="Tìm khóa học, chủ đề..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-100 border border-slate-200 rounded-full pl-10 pr-4 py-2 text-sm text-slate-700 outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 transition-all"
            />
          </div>

          <div className="flex items-center gap-3">
            <Link to="/admin/education" className="text-sm text-slate-500 hover:text-indigo-600 transition-colors hidden md:block">Admin</Link>
            <Link to="/education/my-courses" className="bg-indigo-600 text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-indigo-700 transition-colors">
              Khóa học của tôi
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <div className="bg-gradient-to-br from-indigo-950 via-indigo-900 to-violet-950 text-white py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }} className="space-y-6">
            <span className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs text-indigo-200">
              <TrendingUp className="w-3.5 h-3.5" /> 50,000+ học viên đang học
            </span>
            <h1 className="font-black leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
              Học kỹ năng mới,
              <br />
              <span className="text-indigo-300">thay đổi sự nghiệp.</span>
            </h1>
            <p className="text-indigo-200 text-lg leading-relaxed max-w-md">
              Khóa học từ chuyên gia hàng đầu. Thiết kế, lập trình, kinh doanh, marketing và hơn thế nữa.
            </p>
            <div className="flex items-center gap-3 flex-wrap">
              <Link to="/education/courses" className="bg-white text-indigo-900 px-6 py-3 rounded-full font-bold text-sm hover:bg-indigo-50 transition-colors flex items-center gap-2">
                Xem tất cả khóa học <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="flex items-center gap-6 text-sm text-indigo-300 pt-2">
              <div className="flex items-center gap-1.5"><Award className="w-4 h-4 text-yellow-400" /><span>Chứng chỉ hoàn thành</span></div>
              <div className="flex items-center gap-1.5"><Star className="w-4 h-4 text-yellow-400 fill-yellow-400" /><span>4.8/5 đánh giá trung bình</span></div>
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="relative">
              <img src={FEATURED_COURSE.thumbnail} alt={FEATURED_COURSE.title} className="w-full rounded-2xl shadow-2xl object-cover aspect-video" />
              <div className="absolute -bottom-4 -left-4 bg-white rounded-xl p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <img src={FEATURED_COURSE.instructorAvatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-bold text-slate-800 text-sm">{FEATURED_COURSE.title.slice(0, 28)}...</p>
                    <p className="text-slate-500 text-xs">{FEATURED_COURSE.instructor}</p>
                  </div>
                </div>
              </div>
              <div className="absolute -top-4 -right-4 bg-indigo-600 text-white rounded-xl p-3 text-center shadow-xl">
                <p className="font-black text-lg">{formatPrice(FEATURED_COURSE.price)}</p>
                <p className="text-indigo-200 text-[10px]">Học trọn đời</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Stats ── */}
      <div className="bg-white border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Học viên', value: '50,000+', icon: Users },
            { label: 'Khóa học', value: '200+', icon: BookOpen },
            { label: 'Chuyên gia', value: '80+', icon: Award },
            { label: 'Đánh giá TB', value: '4.8★', icon: Star },
          ].map(({ label, value, icon: Icon }) => (
            <div key={label} className="text-center">
              <Icon className="w-6 h-6 text-indigo-500 mx-auto mb-2" />
              <p className="font-black text-2xl text-slate-800">{value}</p>
              <p className="text-slate-400 text-sm">{label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Why Choose EduHub ── */}
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-indigo-900 to-slate-900 rounded-2xl p-8 text-white">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="text-yellow-400 text-xs font-bold tracking-widest uppercase">ƯU ĐIỂM VƯỢT TRỘI</span>
              <h3 className="text-2xl font-black">Tại sao nên chọn học cùng EduHub?</h3>
              <p className="text-indigo-200 text-sm leading-relaxed">
                Chúng tôi cung cấp chương trình đào tạo chuẩn quốc tế với học phí phù hợp cho mọi học viên Việt Nam.
              </p>
            </div>
            <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {[
                { title: 'Chương trình thực chiến', desc: 'Học qua dự án thực tế, cung cấp kiến thức áp dụng ngay vào công việc thực tế.' },
                { title: 'Hỗ trợ 1-1 từ Mentor', desc: 'Giải đáp thắc mắc, sửa bài tập trực tiếp từ các giảng viên giàu kinh nghiệm.' },
                { title: 'Chứng chỉ có giá trị', desc: 'Nhận chứng chỉ tốt nghiệp từ EduHub được các doanh nghiệp tuyển dụng công nhận.' },
                { title: 'Cộng đồng năng động', desc: 'Tham gia mạng lưới hơn 50.000 học viên, kết nối cơ hội việc làm nhanh chóng.' },
              ].map((item, idx) => (
                <div key={idx} className="bg-white/5 border border-white/10 rounded-xl p-5 hover:bg-white/10 transition-all">
                  <h4 className="font-bold text-white mb-2">{item.title}</h4>
                  <p className="text-indigo-200 text-xs leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Categories ── */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {EDUCATION_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-indigo-300'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* ── Courses Grid ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-black text-slate-800">
            {activeCategory === 'all' ? 'Tất cả khóa học' : EDUCATION_CATEGORIES.find(c => c.id === activeCategory)?.label}
            <span className="text-slate-400 text-base font-normal ml-2">({filtered.length})</span>
          </h2>
          <Link to="/education/courses" className="text-indigo-600 text-sm font-medium hover:underline flex items-center gap-1">
            Xem tất cả <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20 text-slate-400">
            <BookOpen className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Không tìm thấy khóa học phù hợp</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((course, i) => (
              <CourseCard key={course.id} course={course} index={i} />
            ))}
          </div>
        )}
      </div>

      {/* ── Blog & Insights Section ── */}
      <div className="bg-white border-t border-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <span className="text-indigo-600 text-xs font-bold uppercase tracking-wider block mb-1">Cẩm nang & Kiến thức</span>
              <h2 className="text-2xl md:text-3xl font-black text-slate-800 tracking-tight">Góc chia sẻ từ các chuyên gia EduHub</h2>
            </div>
            <p className="text-slate-500 text-sm max-w-md">Cập nhật xu hướng công nghệ mới nhất, cẩm nang lập trình, thiết kế UI/UX và các bí quyết phát triển bản thân hữu ích.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {EDUCATION_BLOG_POSTS.map((post, i) => (
              <motion.article 
                key={post.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
                className="group flex flex-col bg-slate-50 rounded-2xl border border-slate-100 overflow-hidden hover:shadow-xl hover:border-indigo-100 transition-all duration-300"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-slate-200">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" />
                  <span className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm text-indigo-700 text-[10px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <span className="text-[10px] text-slate-400 font-medium block">{post.date} • {post.readTime}</span>
                    <h3 className="font-bold text-slate-800 text-base leading-snug group-hover:text-indigo-600 transition-colors line-clamp-2">
                      {post.title}
                    </h3>
                    <p className="text-slate-500 text-xs leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                    <span className="text-[11px] font-semibold text-slate-700">Tác giả: {post.author}</span>
                    <span className="text-indigo-600 text-xs font-bold group-hover:translate-x-1 transition-transform flex items-center gap-0.5">
                      Đọc thêm <ChevronRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>

      <SharedFooter theme="dark" accentColor="#6366F1" platformName="EduHub" />
    </div>
  );
}
