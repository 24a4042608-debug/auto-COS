// ══════════════════════════════════════════
// NEWS PLATFORM — Mock Data
// ══════════════════════════════════════════

export interface Article {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  thumbnail: string;
  category: string;
  author: string;
  authorAvatar: string;
  publishedAt: string;
  readingTime: number;
  tags: string[];
  isBreaking?: boolean;
  isFeatured?: boolean;
  views: number;
}

export const NEWS_CATEGORIES = [
  { id: 'all', label: 'Tất cả', color: '#DC2626' },
  { id: 'tech', label: 'Công nghệ', color: '#6366F1' },
  { id: 'economy', label: 'Kinh tế', color: '#059669' },
  { id: 'sport', label: 'Thể thao', color: '#F59E0B' },
  { id: 'entertainment', label: 'Giải trí', color: '#EC4899' },
  { id: 'world', label: 'Thế giới', color: '#0EA5E9' },
  { id: 'society', label: 'Xã hội', color: '#8B5CF6' },
];

export const ARTICLES: Article[] = [
  {
    id: 'a1',
    slug: 'ai-revolution-2025',
    title: 'Cuộc cách mạng AI năm 2025: Những thay đổi làm rung chuyển thị trường lao động toàn cầu',
    excerpt: 'Trí tuệ nhân tạo không còn là tương lai xa — nó đang định hình lại mọi ngành nghề ngay hôm nay. Từ lập trình đến y tế, không lĩnh vực nào thoát khỏi làn sóng chuyển đổi mạnh mẽ này.',
    content: `Năm 2025 đánh dấu bước ngoặt quan trọng trong lịch sử phát triển của trí tuệ nhân tạo. Các mô hình ngôn ngữ lớn (LLM) không chỉ dừng lại ở việc trả lời câu hỏi mà đã bắt đầu tự chủ thực hiện các tác vụ phức tạp...`,
    thumbnail: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1200&q=80',
    category: 'tech',
    author: 'Trần Minh Khoa',
    authorAvatar: 'https://i.pravatar.cc/150?img=11',
    publishedAt: '2025-07-01T06:00:00Z',
    readingTime: 8,
    tags: ['AI', 'Công nghệ', 'Việc làm', 'Tương lai'],
    isBreaking: true,
    isFeatured: true,
    views: 42800,
  },
  {
    id: 'a2',
    slug: 'viet-stock-market-q2',
    title: 'VN-Index bứt phá 1,300 điểm: Dòng tiền ngoại đổ mạnh vào thị trường chứng khoán Việt Nam',
    excerpt: 'Thị trường chứng khoán Việt Nam ghi nhận mức tăng mạnh nhất trong 3 năm qua khi khối ngoại mua ròng liên tục 15 phiên giao dịch.',
    content: `Chỉ số VN-Index đã chính thức vượt ngưỡng 1,300 điểm trong phiên giao dịch sáng nay...`,
    thumbnail: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80',
    category: 'economy',
    author: 'Lê Thị Bích Ngọc',
    authorAvatar: 'https://i.pravatar.cc/150?img=23',
    publishedAt: '2025-07-01T05:30:00Z',
    readingTime: 5,
    tags: ['Chứng khoán', 'Kinh tế', 'VN-Index', 'Đầu tư'],
    isFeatured: true,
    views: 28500,
  },
  {
    id: 'a3',
    slug: 'vietnam-football-sea-games',
    title: 'Đội tuyển Việt Nam giành HCV SEA Games 33 sau loạt sút luân lưu nghẹt thở',
    excerpt: 'Chiến thắng lịch sử trước Thái Lan 4-3 sau loạt sút penalty đưa U23 Việt Nam lên đỉnh cao SEA Games lần thứ 3 liên tiếp.',
    content: `Trong trận chung kết đáng nhớ tại sân vận động quốc gia Campuchia...`,
    thumbnail: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?w=1200&q=80',
    category: 'sport',
    author: 'Nguyễn Văn Thành',
    authorAvatar: 'https://i.pravatar.cc/150?img=33',
    publishedAt: '2025-07-01T04:00:00Z',
    readingTime: 4,
    tags: ['Bóng đá', 'SEA Games', 'U23 Việt Nam'],
    isBreaking: true,
    views: 89200,
  },
  {
    id: 'a4',
    slug: 'kpop-blackpink-concert',
    title: 'BLACKPINK Born Pink World Tour: 60,000 vé Hà Nội cháy hàng trong 3 giờ',
    excerpt: 'Concert đầu tiên của BLACKPINK tại Việt Nam tạo cơn sốt chưa từng có. Ban tổ chức buộc phải mở thêm 2 đêm diễn để đáp ứng nhu cầu.',
    content: `Thông báo về concert BLACKPINK tại Hà Nội đã tạo ra làn sóng sôi động trong cộng đồng K-pop Việt Nam...`,
    thumbnail: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?w=1200&q=80',
    category: 'entertainment',
    author: 'Phạm Thị Lan',
    authorAvatar: 'https://i.pravatar.cc/150?img=44',
    publishedAt: '2025-06-30T14:00:00Z',
    readingTime: 3,
    tags: ['BLACKPINK', 'K-pop', 'Concert', 'Giải trí'],
    views: 112000,
  },
  {
    id: 'a5',
    slug: 'climate-change-mekong',
    title: 'Đồng bằng sông Cửu Long trước nguy cơ chìm dưới nước: Giải pháp nào cho 18 triệu dân?',
    excerpt: 'Báo cáo mới nhất của LHQ cảnh báo 40% diện tích ĐBSCL có thể bị ngập vào năm 2050 nếu không có hành động khẩn cấp.',
    content: `Biến đổi khí hậu đang tác động ngày càng nghiêm trọng đến vùng đồng bằng sông Cửu Long...`,
    thumbnail: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200&q=80',
    category: 'society',
    author: 'Hoàng Anh Tuấn',
    authorAvatar: 'https://i.pravatar.cc/150?img=55',
    publishedAt: '2025-06-30T08:00:00Z',
    readingTime: 10,
    tags: ['Khí hậu', 'ĐBSCL', 'Môi trường', 'Xã hội'],
    views: 34200,
  },
  {
    id: 'a6',
    slug: 'us-china-trade-deal',
    title: 'Mỹ-Trung đạt thỏa thuận thương mại mới: Cơ hội và thách thức cho xuất khẩu Việt Nam',
    excerpt: 'Hiệp định thương mại Mỹ-Trung vừa được ký kết sẽ tác động trực tiếp đến chiến lược xuất khẩu của Việt Nam trong 5 năm tới.',
    content: `Sau nhiều tháng đàm phán căng thẳng, Mỹ và Trung Quốc đã đạt được thỏa thuận thương mại toàn diện...`,
    thumbnail: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=80',
    category: 'world',
    author: 'Vũ Thị Hương',
    authorAvatar: 'https://i.pravatar.cc/150?img=66',
    publishedAt: '2025-06-29T10:00:00Z',
    readingTime: 7,
    tags: ['Mỹ', 'Trung Quốc', 'Thương mại', 'Thế giới'],
    views: 21700,
  },
  {
    id: 'a7',
    slug: 'apple-vision-pro-2',
    title: 'Apple Vision Pro 2 ra mắt: Mỏng hơn, nhẹ hơn và giá... vẫn gây sốc',
    excerpt: 'Apple công bố thế hệ headset thực tế hỗn hợp thứ hai với nhiều cải tiến đáng kể, nhưng mức giá 3,499 USD vẫn là rào cản lớn.',
    content: `Tại sự kiện WWDC 2025, Apple chính thức vén màn Apple Vision Pro 2...`,
    thumbnail: 'https://images.unsplash.com/photo-1592659762303-90081d34b277?w=1200&q=80',
    category: 'tech',
    author: 'Ngô Đức Minh',
    authorAvatar: 'https://i.pravatar.cc/150?img=77',
    publishedAt: '2025-06-29T06:00:00Z',
    readingTime: 6,
    tags: ['Apple', 'VR', 'Công nghệ', 'Gadget'],
    views: 67400,
  },
  {
    id: 'a8',
    slug: 'hanoi-metro-expansion',
    title: 'Hà Nội khởi công 3 tuyến metro mới: Kế hoạch phủ kín mạng lưới đến năm 2035',
    excerpt: 'Hà Nội chính thức khởi công xây dựng các tuyến metro 3, 4 và 5 với tổng vốn đầu tư 8 tỷ USD, mở ra kỷ nguyên giao thông mới.',
    content: `Lễ khởi công 3 tuyến metro mới diễn ra sáng nay tại Hà Nội...`,
    thumbnail: 'https://images.unsplash.com/photo-1517420704952-d9f39e95b43e?w=1200&q=80',
    category: 'society',
    author: 'Trần Quốc Huy',
    authorAvatar: 'https://i.pravatar.cc/150?img=88',
    publishedAt: '2025-06-28T07:00:00Z',
    readingTime: 5,
    tags: ['Hà Nội', 'Metro', 'Giao thông', 'Xã hội'],
    views: 45600,
  },
];

export const BREAKING_NEWS = ARTICLES.filter(a => a.isBreaking);
export const FEATURED_ARTICLES = ARTICLES.filter(a => a.isFeatured);
