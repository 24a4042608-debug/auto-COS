import { useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { MapPin, Star, ChevronLeft, CheckCircle, Users, Calendar, Clock, Zap, Share2, Heart } from 'lucide-react';
import { SERVICES } from '@/constants/bookingData';

function formatPrice(price: number) {
  return price.toLocaleString('vi-VN') + 'đ';
}

export default function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find(s => s.slug === slug);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [booked, setBooked] = useState(false);
  const [liked, setLiked] = useState(false);
  const [activeImg, setActiveImg] = useState(0);

  if (!service) return <Navigate to="/booking" replace />;

  const allTimes = service.availableSlots[0]?.times || [];

  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b border-slate-100 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link to="/booking" className="flex items-center gap-2 text-slate-600 hover:text-emerald-600 text-sm font-medium">
            <ChevronLeft className="w-4 h-4" /> BookIt
          </Link>
          <div className="flex gap-2">
            <button onClick={() => setLiked(!liked)} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
              <Heart className={`w-4 h-4 ${liked ? 'fill-red-500 text-red-500' : 'text-slate-600'}`} />
            </button>
            <button className="p-2 hover:bg-slate-100 rounded-full transition-colors"><Share2 className="w-4 h-4 text-slate-600" /></button>
          </div>
        </div>
      </nav>

      {/* Image Gallery */}
      <div className="max-w-7xl mx-auto px-6 pt-6">
        <div className="grid grid-cols-4 gap-2 rounded-2xl overflow-hidden h-72 md:h-96">
          <div className="col-span-3 relative cursor-pointer" onClick={() => setActiveImg(0)}>
            <img src={service.images[activeImg] || service.thumbnail} alt={service.title} className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col gap-2">
            {service.images.slice(1, 3).map((img, i) => (
              <div key={i} className="flex-1 relative cursor-pointer" onClick={() => setActiveImg(i + 1)}>
                <img src={img} alt="" className="w-full h-full object-cover hover:opacity-80 transition-opacity" />
              </div>
            ))}
            {service.images.length < 2 && (
              <div className="flex-1 bg-slate-100 flex items-center justify-center text-slate-300 text-xs">Thêm ảnh</div>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">

          {/* Left */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <p className="text-slate-400 text-sm flex items-center gap-1"><MapPin className="w-4 h-4" />{service.location}</p>
              <h1 className="text-2xl md:text-3xl font-black text-slate-800">{service.title}</h1>
              <p className="text-slate-500 text-lg">{service.subtitle}</p>
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-1.5">
                  <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-slate-800 text-lg">{service.rating}</span>
                  <span className="text-slate-400">· {service.reviewCount} đánh giá</span>
                </div>
                {service.isInstantBook && (
                  <span className="flex items-center gap-1 text-emerald-600 text-sm font-semibold">
                    <Zap className="w-4 h-4" /> Xác nhận ngay
                  </span>
                )}
              </div>
            </motion.div>

            {/* Host */}
            <div className="flex items-center gap-3 border-y border-slate-100 py-5">
              <img src={service.hostAvatar} alt={service.host} className="w-12 h-12 rounded-full object-cover" />
              <div>
                <p className="text-slate-400 text-xs">Chủ dịch vụ</p>
                <p className="font-bold text-slate-800">{service.host}</p>
              </div>
            </div>

            {/* Description */}
            <div>
              <h2 className="font-bold text-slate-800 text-lg mb-3">Mô tả</h2>
              <p className="text-slate-600 leading-relaxed">{service.description}</p>
            </div>

            {/* Amenities */}
            <div>
              <h2 className="font-bold text-slate-800 text-lg mb-3">Tiện nghi & Dịch vụ</h2>
              <div className="grid grid-cols-2 gap-2">
                {service.amenities.map(a => (
                  <div key={a} className="flex items-center gap-2 text-slate-600 text-sm">
                    <CheckCircle className="w-4 h-4 text-emerald-500" />{a}
                  </div>
                ))}
              </div>
            </div>

            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {service.tags.map(tag => (
                <span key={tag} className="bg-emerald-50 text-emerald-700 text-xs px-3 py-1.5 rounded-full">{tag}</span>
              ))}
            </div>
          </div>

          {/* Right: Booking Card */}
          <div>
            <div className="sticky top-20">
              <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="bg-white rounded-2xl border border-slate-200 shadow-xl p-6 space-y-5">
                <div>
                  <span className="font-black text-2xl text-slate-800">{formatPrice(service.priceFrom)}</span>
                  <span className="text-slate-400 text-sm ml-1">{service.priceUnit}</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-bold text-slate-800">{service.rating}</span>
                  <span className="text-slate-400 text-sm">· {service.reviewCount} đánh giá</span>
                </div>

                {!booked ? (
                  <>
                    {/* Date */}
                    <div className="space-y-2">
                      <label className="text-slate-600 text-sm font-semibold flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Chọn ngày</label>
                      <div className="flex flex-wrap gap-2">
                        {service.availableSlots.map(slot => (
                          <button
                            key={slot.date}
                            onClick={() => { setSelectedDate(slot.date); setSelectedTime(''); }}
                            className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${
                              selectedDate === slot.date ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-400'
                            }`}
                          >
                            {new Date(slot.date).toLocaleDateString('vi-VN', { day: '2-digit', month: '2-digit' })}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Time */}
                    {selectedDate && (
                      <div className="space-y-2">
                        <label className="text-slate-600 text-sm font-semibold flex items-center gap-1.5"><Clock className="w-4 h-4" /> Chọn giờ</label>
                        <div className="flex flex-wrap gap-2">
                          {service.availableSlots.find(s => s.date === selectedDate)?.times.map(time => (
                            <button key={time} onClick={() => setSelectedTime(time)} className={`px-3 py-2 rounded-lg text-sm font-medium border transition-all ${selectedTime === time ? 'bg-emerald-600 text-white border-emerald-600' : 'border-slate-200 text-slate-600 hover:border-emerald-400'}`}>
                              {time}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Guests */}
                    <div className="space-y-2">
                      <label className="text-slate-600 text-sm font-semibold flex items-center gap-1.5"><Users className="w-4 h-4" /> Số người</label>
                      <div className="flex items-center gap-3">
                        <button onClick={() => setGuests(Math.max(1, guests - 1))} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-400 font-bold">-</button>
                        <span className="font-bold text-slate-800 w-8 text-center">{guests}</span>
                        <button onClick={() => setGuests(guests + 1)} className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center text-slate-600 hover:border-slate-400 font-bold">+</button>
                      </div>
                    </div>

                    <button
                      onClick={() => selectedDate && selectedTime && setBooked(true)}
                      disabled={!selectedDate || !selectedTime}
                      className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-slate-200 disabled:text-slate-400 text-white py-4 rounded-xl font-bold text-sm transition-all"
                    >
                      {!selectedDate ? 'Chọn ngày để tiếp tục' : !selectedTime ? 'Chọn giờ để tiếp tục' : 'Đặt ngay'}
                    </button>
                    <p className="text-slate-400 text-xs text-center">Chưa bị trừ tiền · Xác nhận miễn phí</p>
                  </>
                ) : (
                  <div className="text-center py-6 space-y-4">
                    <CheckCircle className="w-16 h-16 text-emerald-500 mx-auto" />
                    <div>
                      <h3 className="font-black text-slate-800 text-lg">Đặt chỗ thành công!</h3>
                      <p className="text-slate-500 text-sm mt-1">{new Date(selectedDate).toLocaleDateString('vi-VN')} · {selectedTime} · {guests} người</p>
                    </div>
                    <Link to="/booking/my-bookings" className="inline-flex items-center gap-2 text-emerald-600 text-sm font-semibold hover:underline">
                      Xem lịch đặt của tôi <ChevronLeft className="w-4 h-4 rotate-180" />
                    </Link>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
