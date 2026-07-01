import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, Users, Clock, BookOpen, Award, ChevronDown, Play, CheckCircle, Lock, FileText } from 'lucide-react';
import { COURSES } from '@/constants/educationData';

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

export default function CourseDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const course = COURSES.find(c => c.slug === slug);
  const [openSection, setOpenSection] = useState<string | null>('s1');
  const [enrolled, setEnrolled] = useState(false);

  if (!course) return <Navigate to="/education" replace />;

  const discount = Math.round((1 - course.price / course.originalPrice) * 100);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Navbar */}
      <nav className="bg-indigo-950 text-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center gap-4">
          <Link to="/education" className="font-black text-white hover:text-indigo-300 transition-colors">EduHub</Link>
          <ChevronDown className="w-4 h-4 text-indigo-400 rotate-[-90deg]" />
          <span className="text-indigo-300 text-sm truncate max-w-xs">{course.title}</span>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* ── Left: Main content ── */}
          <div className="lg:col-span-2 space-y-8">

            {/* Header */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="flex items-center gap-2 text-xs text-indigo-600 font-medium uppercase tracking-wider">
                <span>{COURSES.findIndex(c => c.id === course.id) > -1 ? course.category.toUpperCase() : ''}</span>
                <span>•</span>
                <span>{course.level}</span>
              </div>
              <h1 className="text-3xl font-black text-slate-800 leading-tight">{course.title}</h1>
              <p className="text-slate-500 text-lg">{course.subtitle}</p>

              <div className="flex items-center gap-4 flex-wrap text-sm">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-yellow-500">{course.rating}</span>
                  <div className="flex">{[...Array(5)].map((_, i) => <Star key={i} className={`w-4 h-4 ${i < Math.floor(course.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />)}</div>
                  <span className="text-slate-400">({course.reviewCount.toLocaleString()} đánh giá)</span>
                </div>
                <span className="flex items-center gap-1 text-slate-500"><Users className="w-4 h-4" />{course.studentCount.toLocaleString()} học viên</span>
              </div>

              {/* Instructor */}
              <div className="flex items-center gap-3 bg-white rounded-xl p-4 border border-slate-100">
                <img src={course.instructorAvatar} alt={course.instructor} className="w-12 h-12 rounded-full object-cover" />
                <div>
                  <p className="font-bold text-slate-800">{course.instructor}</p>
                  <p className="text-slate-500 text-sm">{course.instructorBio}</p>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <div className="bg-white rounded-xl p-6 border border-slate-100 space-y-3">
              <h2 className="font-bold text-slate-800 text-lg">Mô tả khóa học</h2>
              <p className="text-slate-600 leading-relaxed">{course.description}</p>
              <div className="flex flex-wrap gap-2 pt-2">
                {course.tags.map(tag => (
                  <span key={tag} className="bg-indigo-50 text-indigo-600 text-xs px-3 py-1 rounded-full font-medium">{tag}</span>
                ))}
              </div>
            </div>

            {/* Curriculum */}
            <div className="bg-white rounded-xl border border-slate-100 overflow-hidden">
              <div className="p-6 border-b border-slate-100">
                <h2 className="font-bold text-slate-800 text-lg">Nội dung khóa học</h2>
                <p className="text-slate-400 text-sm mt-1">{course.lessons} bài học · {course.duration} tổng thời gian</p>
              </div>
              <div>
                {course.curriculum.map(section => (
                  <div key={section.id} className="border-b border-slate-50 last:border-0">
                    <button
                      onClick={() => setOpenSection(openSection === section.id ? null : section.id)}
                      className="w-full flex items-center justify-between p-5 hover:bg-slate-50 transition-colors text-left"
                    >
                      <span className="font-semibold text-slate-700 text-sm">{section.title}</span>
                      <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${openSection === section.id ? 'rotate-180' : ''}`} />
                    </button>
                    {openSection === section.id && (
                      <div className="bg-slate-50/50">
                        {section.lessons.map(lesson => (
                          <div key={lesson.id} className="flex items-center justify-between px-5 py-3 hover:bg-white transition-colors">
                            <div className="flex items-center gap-3">
                              {lesson.isFree ? (
                                <Play className="w-4 h-4 text-indigo-500" />
                              ) : lesson.type === 'quiz' ? (
                                <FileText className="w-4 h-4 text-amber-500" />
                              ) : (
                                <Lock className="w-4 h-4 text-slate-300" />
                              )}
                              <span className={`text-sm ${lesson.isFree ? 'text-indigo-600 font-medium' : 'text-slate-600'}`}>
                                {lesson.title}
                              </span>
                              {lesson.isFree && <span className="bg-indigo-100 text-indigo-600 text-[10px] px-2 py-0.5 rounded font-bold">Xem thử</span>}
                            </div>
                            <span className="text-slate-400 text-xs">{lesson.duration}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
                {course.curriculum.length === 0 && (
                  <div className="p-6 text-center text-slate-400 text-sm">Nội dung đang được cập nhật...</div>
                )}
              </div>
            </div>
          </div>

          {/* ── Right: Sticky Purchase Card ── */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
                {/* Video Preview */}
                <div className="relative aspect-video bg-slate-900">
                  <img src={course.thumbnail} alt={course.title} className="w-full h-full object-cover opacity-70" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center shadow-lg cursor-pointer hover:bg-white transition-colors">
                      <Play className="w-6 h-6 text-indigo-600 fill-indigo-600 ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-3 left-0 right-0 text-center text-white/80 text-xs">Xem thử miễn phí</div>
                </div>

                <div className="p-6 space-y-5">
                  {/* Price */}
                  <div className="flex items-baseline gap-3">
                    <span className="font-black text-3xl text-slate-800">{formatPrice(course.price)}</span>
                    <span className="text-slate-400 line-through text-base">{formatPrice(course.originalPrice)}</span>
                    <span className="bg-rose-100 text-rose-600 text-xs font-bold px-2 py-0.5 rounded">-{discount}%</span>
                  </div>

                  <p className="text-rose-500 text-xs font-medium">⏰ Ưu đãi kết thúc sau 2 ngày!</p>

                  {/* CTA */}
                  <button
                    onClick={() => setEnrolled(true)}
                    className={`w-full py-4 rounded-xl font-bold text-sm transition-all ${enrolled ? 'bg-emerald-500 text-white cursor-default' : 'bg-indigo-600 hover:bg-indigo-700 text-white hover:shadow-lg hover:shadow-indigo-200'}`}
                  >
                    {enrolled ? (
                      <span className="flex items-center justify-center gap-2"><CheckCircle className="w-5 h-5" /> Đã đăng ký!</span>
                    ) : 'Đăng ký ngay'}
                  </button>

                  <p className="text-slate-400 text-xs text-center">Hoàn tiền 30 ngày nếu không hài lòng</p>

                  {/* Course info */}
                  <div className="space-y-3 border-t border-slate-100 pt-4 text-sm">
                    {[
                      { icon: Clock, label: 'Thời lượng', value: course.duration },
                      { icon: BookOpen, label: 'Số bài học', value: `${course.lessons} bài` },
                      { icon: Users, label: 'Học viên', value: course.studentCount.toLocaleString() },
                      { icon: Award, label: 'Trình độ', value: course.level },
                      { icon: CheckCircle, label: 'Ngôn ngữ', value: course.language },
                    ].map(({ icon: Icon, label, value }) => (
                      <div key={label} className="flex items-center justify-between">
                        <span className="flex items-center gap-2 text-slate-500"><Icon className="w-4 h-4" />{label}</span>
                        <span className="font-medium text-slate-700">{value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
