// ══════════════════════════════════════════
// BOOKING PLATFORM — Mock Data
// ══════════════════════════════════════════

export interface Service {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  images: string[];
  category: string;
  location: string;
  priceFrom: number;
  priceTo?: number;
  priceUnit: string;
  rating: number;
  reviewCount: number;
  amenities: string[];
  tags: string[];
  host: string;
  hostAvatar: string;
  isInstantBook?: boolean;
  isFeatured?: boolean;
  availableSlots: TimeSlot[];
}

export interface TimeSlot {
  date: string;
  times: string[];
}

export interface Booking {
  id: string;
  serviceId: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  notes: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  totalPrice: number;
}

export const BOOKING_CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: '🏠' },
  { id: 'hotel', label: 'Khách sạn', icon: '🏨' },
  { id: 'restaurant', label: 'Nhà hàng', icon: '🍽️' },
  { id: 'spa', label: 'Spa & Wellness', icon: '💆' },
  { id: 'tour', label: 'Tour du lịch', icon: '🗺️' },
  { id: 'event', label: 'Sự kiện', icon: '🎉' },
  { id: 'sports', label: 'Thể thao', icon: '⚽' },
];

export const SERVICES: Service[] = [
  {
    id: 's1',
    slug: 'villa-da-lat-pine-view',
    title: 'Pine View Villa Đà Lạt',
    subtitle: 'Villa thông 4 phòng ngủ, view thung lũng tuyệt đẹp',
    description: 'Villa sang trọng giữa rừng thông Đà Lạt. 4 phòng ngủ, hồ bơi nước nóng, view toàn cảnh thung lũng. Hoàn hảo cho gia đình và nhóm bạn.',
    thumbnail: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
    ],
    category: 'hotel',
    location: 'Đà Lạt, Lâm Đồng',
    priceFrom: 3500000,
    priceTo: 5000000,
    priceUnit: '/đêm',
    rating: 4.95,
    reviewCount: 234,
    amenities: ['Hồ bơi', 'WiFi', 'Bếp đầy đủ', 'BBQ', 'Lò sưởi', 'Bãi đỗ xe', 'View núi'],
    tags: ['Villa', 'Đà Lạt', 'Gia đình', 'Thư giãn'],
    host: 'Nguyễn Gia Hào',
    hostAvatar: 'https://i.pravatar.cc/150?img=18',
    isInstantBook: true,
    isFeatured: true,
    availableSlots: [
      { date: '2025-07-05', times: ['14:00'] },
      { date: '2025-07-06', times: ['14:00'] },
      { date: '2025-07-10', times: ['14:00'] },
    ],
  },
  {
    id: 's2',
    slug: 'restaurant-pho-ba-hang',
    title: 'Phở Bà Hàng — Fine Dining',
    subtitle: 'Trải nghiệm ẩm thực Việt truyền thống theo phong cách hiện đại',
    description: 'Nhà hàng fine dining với thực đơn Việt Nam truyền thống được nâng cấp. Không gian ấm cúng, phục vụ chu đáo. Đặt bàn trước để được trải nghiệm tốt nhất.',
    thumbnail: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=800&q=80',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&q=80',
    ],
    category: 'restaurant',
    location: 'Hoàn Kiếm, Hà Nội',
    priceFrom: 350000,
    priceUnit: '/người',
    rating: 4.8,
    reviewCount: 567,
    amenities: ['Không gian riêng', 'Rượu vang', 'Menu cố định', 'Parking', 'WiFi'],
    tags: ['Fine Dining', 'Việt Nam', 'Hà Nội', 'Lãng mạn'],
    host: 'Chef Trần Thị Bà Hàng',
    hostAvatar: 'https://i.pravatar.cc/150?img=29',
    isFeatured: true,
    availableSlots: [
      { date: '2025-07-03', times: ['18:00', '19:00', '20:00'] },
      { date: '2025-07-04', times: ['11:30', '12:00', '18:00', '19:00'] },
      { date: '2025-07-05', times: ['18:00', '19:30'] },
    ],
  },
  {
    id: 's3',
    slug: 'spa-zen-garden-hoi-an',
    title: 'Zen Garden Spa — Hội An',
    subtitle: 'Spa truyền thống Việt giữa lòng phố cổ Hội An',
    description: 'Trải nghiệm spa truyền thống Việt Nam với các liệu pháp thảo dược địa phương. Không gian tĩnh lặng, thanh thản giữa lòng phố cổ.',
    thumbnail: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&q=80',
      'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&q=80',
    ],
    category: 'spa',
    location: 'Hội An, Quảng Nam',
    priceFrom: 450000,
    priceUnit: '/người/buổi',
    rating: 4.9,
    reviewCount: 892,
    amenities: ['Massage', 'Tắm thảo dược', 'Đá nóng', 'Trà thảo mộc', 'Thay đồ riêng'],
    tags: ['Spa', 'Wellness', 'Hội An', 'Thư giãn'],
    host: 'Võ Thị Lan Hương',
    hostAvatar: 'https://i.pravatar.cc/150?img=38',
    isInstantBook: true,
    availableSlots: [
      { date: '2025-07-03', times: ['09:00', '10:00', '11:00', '14:00', '15:00', '16:00'] },
      { date: '2025-07-04', times: ['09:00', '10:30', '14:00', '15:30'] },
    ],
  },
  {
    id: 's4',
    slug: 'tour-ha-long-2n1d',
    title: 'Tour Hạ Long 2N1Đ — Thuyền Luxury',
    subtitle: 'Cruise 5 sao khám phá vịnh Hạ Long huyền bí',
    description: 'Tour cruise 2 ngày 1 đêm trên du thuyền 5 sao. Thăm hang động, chèo kayak, xem mặt trời mọc trên vịnh. Bao gồm toàn bộ bữa ăn và hoạt động.',
    thumbnail: 'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
    images: [
      'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&q=80',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&q=80',
    ],
    category: 'tour',
    location: 'Hạ Long, Quảng Ninh',
    priceFrom: 2800000,
    priceUnit: '/người',
    rating: 4.85,
    reviewCount: 1240,
    amenities: ['Cabin riêng', 'Kayak', 'Lặn ngắm san hô', 'Bữa ăn 5 sao', 'Hướng dẫn viên', 'Bảo hiểm'],
    tags: ['Hạ Long', 'Cruise', 'Tour', 'Thiên nhiên'],
    host: 'Hạ Long Discovery Tours',
    hostAvatar: 'https://i.pravatar.cc/150?img=48',
    isFeatured: true,
    availableSlots: [
      { date: '2025-07-05', times: ['07:30'] },
      { date: '2025-07-08', times: ['07:30'] },
      { date: '2025-07-12', times: ['07:30'] },
    ],
  },
  {
    id: 's5',
    slug: 'tennis-court-sky-sports',
    title: 'Sky Sports Complex — Sân tennis mái vòm',
    subtitle: '4 sân tennis tiêu chuẩn ATP trong nhà, có HLV',
    description: 'Phức hợp thể thao hiện đại với 4 sân tennis trong nhà, có điều hòa. Đặt sân theo giờ, có HLV cá nhân theo yêu cầu.',
    thumbnail: 'https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=800&q=80'],
    category: 'sports',
    location: 'Cầu Giấy, Hà Nội',
    priceFrom: 200000,
    priceUnit: '/giờ/sân',
    rating: 4.7,
    reviewCount: 445,
    amenities: ['Phòng thay đồ', 'Giữ vợt', 'Thuê vợt', 'Nước miễn phí', 'Điều hòa', 'Camera'],
    tags: ['Tennis', 'Thể thao', 'Hà Nội', 'Trong nhà'],
    host: 'Sky Sports Management',
    hostAvatar: 'https://i.pravatar.cc/150?img=58',
    isInstantBook: true,
    availableSlots: [
      { date: '2025-07-03', times: ['06:00', '07:00', '08:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00'] },
      { date: '2025-07-04', times: ['06:00', '07:00', '17:00', '18:00', '19:00', '20:00'] },
    ],
  },
  {
    id: 's6',
    slug: 'event-rooftop-birthday',
    title: 'The Rooftop — Venue Tiệc trên cao',
    subtitle: 'Không gian tổ chức sự kiện 360° view Hồ Chí Minh city',
    description: 'Venue rooftop độc quyền tầng 40, sức chứa 150 khách. Phù hợp sinh nhật, tiệc cưới nhỏ, team building, ra mắt sản phẩm. Bao gồm setup và catering.',
    thumbnail: 'https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80',
    images: ['https://images.unsplash.com/photo-1478146896981-b80fe463b330?w=800&q=80'],
    category: 'event',
    location: 'Quận 1, TP. Hồ Chí Minh',
    priceFrom: 15000000,
    priceUnit: '/buổi',
    rating: 4.9,
    reviewCount: 128,
    amenities: ['Bar', 'DJ Setup', 'Âm thanh ánh sáng', 'Catering', 'Photo booth', 'Bãi đỗ xe VIP'],
    tags: ['Sự kiện', 'Rooftop', 'HCM', 'Tiệc'],
    host: 'The Rooftop Events',
    hostAvatar: 'https://i.pravatar.cc/150?img=68',
    availableSlots: [
      { date: '2025-07-06', times: ['18:00'] },
      { date: '2025-07-13', times: ['18:00'] },
      { date: '2025-07-20', times: ['18:00'] },
    ],
  },
];

export const FEATURED_SERVICES = SERVICES.filter(s => s.isFeatured);
