import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Search, MapPin, Calendar, Users, Star, SlidersHorizontal, X, ChevronRight, Zap, DollarSign } from 'lucide-react';
import { SERVICES, BOOKING_CATEGORIES, FEATURED_SERVICES } from '@/constants/bookingData';
import SharedFooter from '@/components/SharedFooter';

function formatPrice(price: number) {
  if (price >= 1000000) return `${(price / 1000000).toFixed(1)}M`;
  return `${(price / 1000).toFixed(0)}K`;
}

function ServiceCard({ service, index = 0 }: { service: typeof SERVICES[0]; index?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.4 }}
    >
      <Link to={`/booking/service/${service.slug}`} className="group block bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1">
        <div className="relative aspect-[4/3] overflow-hidden">
          <img src={service.thumbnail} alt={service.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          <div className="absolute top-3 left-3 flex gap-2">
            {service.isInstantBook && (
              <span className="flex items-center gap-1 bg-emerald-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-full">
                <Zap className="w-3 h-3" /> Đặt ngay
              </span>
            )}
          </div>
          <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1.5 shadow">
            <div className="flex items-center gap-1">
              <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-slate-800 text-sm">{service.rating}</span>
              <span className="text-slate-400 text-xs">({service.reviewCount})</span>
            </div>
          </div>
        </div>

        <div className="p-4 space-y-2">
          <p className="text-slate-400 text-xs flex items-center gap-1"><MapPin className="w-3 h-3" />{service.location}</p>
          <h3 className="font-bold text-slate-800 leading-snug group-hover:text-emerald-600 transition-colors">{service.title}</h3>
          <p className="text-slate-500 text-sm line-clamp-1">{service.subtitle}</p>

          <div className="flex items-center justify-between pt-2 border-t border-slate-50">
            <div>
              <span className="font-black text-slate-800">{formatPrice(service.priceFrom)}đ</span>
              <span className="text-slate-400 text-xs ml-1">{service.priceUnit}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <img src={service.hostAvatar} alt={service.host} className="w-6 h-6 rounded-full object-cover" />
              <span className="text-slate-400 text-xs">{service.host.split(' ').slice(-2).join(' ')}</span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BookingHomePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [checkInDate, setCheckInDate] = useState('');
  const [checkOutDate, setCheckOutDate] = useState('');
  const [guests, setGuests] = useState(0);
  const [priceMin, setPriceMin] = useState(0);
  const [priceMax, setPriceMax] = useState(15000000);
  const [instantOnly, setInstantOnly] = useState(false);
  const [sortBy, setSortBy] = useState<'rating' | 'price_asc' | 'price_desc'>('rating');

  const filtered = SERVICES
    .filter(s => {
      const matchCat = activeCategory === 'all' || s.category === activeCategory;
      const matchSearch = !searchQuery || s.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchLoc = !location || s.location.toLowerCase().includes(location.toLowerCase());
      const matchPrice = s.priceFrom >= priceMin && s.priceFrom <= priceMax;
      const matchInstant = !instantOnly || s.isInstantBook;
      const matchGuests = guests === 0 || true; // guests filter applied on detail page
      return matchCat && matchSearch && matchLoc && matchPrice && matchInstant && matchGuests;
    })
    .sort((a, b) => {
      if (sortBy === 'price_asc') return a.priceFrom - b.priceFrom;
      if (sortBy === 'price_desc') return b.priceFrom - a.priceFrom;
      return b.rating - a.rating;
    });

  const activeFilterCount = [checkInDate, location, guests > 0, instantOnly, priceMin > 0, priceMax < 15000000].filter(Boolean).length;

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ── Navbar ── */}
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between gap-4">
          <Link to="/booking" className="flex items-center gap-2 flex-shrink-0">
            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center">
              <Calendar className="w-4 h-4 text-white" />
            </div>
            <span className="font-black text-slate-800 text-lg">BookIt</span>
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/admin/booking" className="text-sm text-slate-500 hover:text-emerald-600 transition-colors hidden md:block">Admin</Link>
            <Link to="/booking/my-bookings" className="bg-emerald-600 text-white text-sm px-4 py-2 rounded-full font-medium hover:bg-emerald-700 transition-colors">
              Đặt của tôi
            </Link>
          </div>
        </div>
      </nav>

      {/* ── Hero Search ── */}
      <div className="bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900 text-white py-16 px-6">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center space-y-6">
          <h1 className="font-black text-white leading-tight" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}>
            Đặt chỗ dễ dàng,<br />
            <span className="text-emerald-300">trải nghiệm tuyệt vời.</span>
          </h1>
          <p className="text-emerald-200 text-lg">Khách sạn, nhà hàng, spa, tour và hơn thế nữa.</p>

          {/* Search box */}
          <div className="bg-white rounded-2xl p-2 shadow-2xl flex flex-col md:flex-row gap-2">
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <Search className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Tìm dịch vụ, địa điểm..."
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className="w-full text-slate-700 outline-none text-sm"
              />
            </div>
            <div className="w-px bg-slate-100 hidden md:block" />
            <div className="flex-1 flex items-center gap-3 px-4 py-2">
              <MapPin className="w-5 h-5 text-slate-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Địa điểm (Hà Nội, Đà Lạt...)"
                value={location}
                onChange={e => setLocation(e.target.value)}
                className="w-full text-slate-700 outline-none text-sm"
              />
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-bold text-sm transition-colors flex items-center justify-center gap-2">
              <Search className="w-4 h-4" /> Tìm kiếm
            </button>
          </div>

          {/* Quick tags */}
          <div className="flex items-center justify-center gap-2 flex-wrap">
            {['Hà Nội', 'Đà Lạt', 'Hội An', 'Đà Nẵng', 'Nha Trang'].map(city => (
              <button key={city} onClick={() => setLocation(city)} className="bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 text-xs px-3 py-1.5 rounded-full transition-colors">
                📍 {city}
              </button>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Categories ── */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="flex items-center gap-3 overflow-x-auto pb-2 scrollbar-hide">
          {BOOKING_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium transition-all ${
                activeCategory === cat.id
                  ? 'bg-emerald-600 text-white shadow-md shadow-emerald-200'
                  : 'bg-white text-slate-600 border border-slate-200 hover:border-emerald-300'
              }`}
            >
              {cat.icon} {cat.label}
            </button>
          ))}
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`flex-shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border ml-auto transition-all ${
              showFilters ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 bg-white text-slate-600 hover:border-slate-400'
            }`}
          >
            <SlidersHorizontal className="w-4 h-4" /> Bộ lọc
            {activeFilterCount > 0 && <span className="bg-white text-emerald-700 text-xs font-bold w-5 h-5 rounded-full flex items-center justify-center ml-1">{activeFilterCount}</span>}
          </button>
        </div>

        {/* ── Advanced Filter Panel ── */}
        <AnimatePresence>
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="bg-white border border-slate-200 rounded-2xl p-6 mt-3 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                  {/* Date Range */}
                  <div className="space-y-2">
                    <label className="text-slate-600 text-sm font-semibold flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-500" /> Ngày nhận</label>
                    <input type="date" value={checkInDate} onChange={e => setCheckInDate(e.target.value)}
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-slate-600 text-sm font-semibold flex items-center gap-1.5"><Calendar className="w-4 h-4 text-emerald-500" /> Ngày trả</label>
                    <input type="date" value={checkOutDate} onChange={e => setCheckOutDate(e.target.value)}
                      min={checkInDate || new Date().toISOString().split('T')[0]}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 text-sm focus:outline-none focus:border-emerald-400 transition-colors" />
                  </div>

                  {/* Guests */}
                  <div className="space-y-2">
                    <label className="text-slate-600 text-sm font-semibold flex items-center gap-1.5"><Users className="w-4 h-4 text-emerald-500" /> Số người</label>
                    <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-3 py-2">
                      <button onClick={() => setGuests(Math.max(0, guests - 1))} className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-lg transition-colors">-</button>
                      <span className="flex-1 text-center font-bold text-slate-800">{guests === 0 ? 'Bất kỳ' : `${guests} người`}</span>
                      <button onClick={() => setGuests(guests + 1)} className="w-7 h-7 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-100 font-bold text-lg transition-colors">+</button>
                    </div>
                  </div>

                  {/* Sort */}
                  <div className="space-y-2">
                    <label className="text-slate-600 text-sm font-semibold">Sắp xếp</label>
                    <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
                      className="w-full border border-slate-200 rounded-xl px-3 py-2.5 text-slate-700 text-sm focus:outline-none focus:border-emerald-400 transition-colors">
                      <option value="rating">★ Đánh giá cao nhất</option>
                      <option value="price_asc">⬆️ Giá thấp → cao</option>
                      <option value="price_desc">⬇️ Giá cao → thấp</option>
                    </select>
                  </div>

                  {/* Price Range */}
                  <div className="space-y-3 md:col-span-2">
                    <label className="text-slate-600 text-sm font-semibold flex items-center gap-1.5">
                      <DollarSign className="w-4 h-4 text-emerald-500" /> Khoảng giá: <span className="text-emerald-600 font-bold">{formatPrice(priceMin)}đ — {formatPrice(priceMax)}đ</span>
                    </label>
                    <div className="space-y-2">
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 w-12">Từ:</span>
                        <input type="range" min={0} max={15000000} step={100000} value={priceMin}
                          onChange={e => setPriceMin(Math.min(Number(e.target.value), priceMax - 100000))}
                          className="flex-1 accent-emerald-500" />
                        <span className="text-xs font-semibold text-emerald-600 w-16 text-right">{formatPrice(priceMin)}đ</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-xs text-slate-400 w-12">Đến:</span>
                        <input type="range" min={0} max={15000000} step={100000} value={priceMax}
                          onChange={e => setPriceMax(Math.max(Number(e.target.value), priceMin + 100000))}
                          className="flex-1 accent-emerald-500" />
                        <span className="text-xs font-semibold text-emerald-600 w-16 text-right">{formatPrice(priceMax)}đ</span>
                      </div>
                    </div>
                  </div>

                  {/* Instant Book */}
                  <div className="space-y-2">
                    <label className="text-slate-600 text-sm font-semibold">Tuỳ chọn</label>
                    <button onClick={() => setInstantOnly(!instantOnly)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium border transition-all ${
                        instantOnly ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-300'
                      }`}>
                      <Zap className="w-4 h-4" /> Chỉ xác nhận ngay
                    </button>
                  </div>

                  {/* Reset */}
                  <div className="flex items-end">
                    <button onClick={() => { setCheckInDate(''); setCheckOutDate(''); setGuests(0); setPriceMin(0); setPriceMax(15000000); setInstantOnly(false); setSortBy('rating'); }}
                      className="text-slate-500 text-sm hover:text-red-500 transition-colors flex items-center gap-1.5 font-medium">
                      <X className="w-4 h-4" /> Xóa bộ lọc
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── Featured ── */}
      {activeCategory === 'all' && !searchQuery && !location && (
        <div className="max-w-7xl mx-auto px-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-black text-xl text-slate-800">⭐ Nổi bật & Được yêu thích</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {FEATURED_SERVICES.map((service, i) => <ServiceCard key={service.id} service={service} index={i} />)}
          </div>
        </div>
      )}

      {/* ── All Services ── */}
      <div className="max-w-7xl mx-auto px-6 pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="font-black text-xl text-slate-800">
            {activeCategory === 'all' ? 'Tất cả dịch vụ' : BOOKING_CATEGORIES.find(c => c.id === activeCategory)?.label}
            <span className="text-slate-400 text-base font-normal ml-2">({filtered.length})</span>
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((service, i) => <ServiceCard key={service.id} service={service} index={i} />)}
        </div>
        {filtered.length === 0 && (
          <div className="text-center py-20 text-slate-400">
            <Calendar className="w-12 h-12 mx-auto mb-3 opacity-30" />
            <p>Không tìm thấy dịch vụ phù hợp</p>
            <button onClick={() => { setSearchQuery(''); setLocation(''); setActiveCategory('all'); }} className="mt-3 text-emerald-600 text-sm font-medium hover:underline">
              Xóa bộ lọc
            </button>
          </div>
        )}
      </div>

      {/* Back */}
      <SharedFooter theme="light" accentColor="#059669" platformName="BookIt" />
    </div>
  );
}
