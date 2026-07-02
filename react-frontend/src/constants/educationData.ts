// ══════════════════════════════════════════
// EDUCATION PLATFORM — Mock Data
// ══════════════════════════════════════════

export interface Course {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  thumbnail: string;
  instructor: string;
  instructorAvatar: string;
  instructorBio: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  price: number;
  originalPrice: number;
  rating: number;
  reviewCount: number;
  studentCount: number;
  duration: string;
  lessons: number;
  language: string;
  tags: string[];
  curriculum: CourseSection[];
  isNew?: boolean;
  isBestseller?: boolean;
  isFeatured?: boolean;
}

export interface CourseSection {
  id: string;
  title: string;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id: string;
  title: string;
  duration: string;
  isFree?: boolean;
  type: 'video' | 'quiz' | 'reading';
}

export const EDUCATION_CATEGORIES = [
  { id: 'all', label: 'Tất cả', icon: '🎓' },
  { id: 'design', label: 'Thiết kế', icon: '🎨' },
  { id: 'dev', label: 'Lập trình', icon: '💻' },
  { id: 'business', label: 'Kinh doanh', icon: '💼' },
  { id: 'marketing', label: 'Marketing', icon: '📣' },
  { id: 'photo', label: 'Nhiếp ảnh', icon: '📷' },
  { id: 'music', label: 'Âm nhạc', icon: '🎵' },
  { id: 'lang', label: 'Ngoại ngữ', icon: '🌐' },
];

export const COURSES: Course[] = [
  {
    id: 'c1',
    slug: 'ui-ux-design-master',
    title: 'UI/UX Design Toàn Diện 2025',
    subtitle: 'Từ Figma cơ bản đến thiết kế sản phẩm thực chiến',
    description: 'Khóa học UI/UX Design toàn diện nhất, từ tư duy thiết kế đến Figma nâng cao. Bạn sẽ xây dựng portfolio chuyên nghiệp và sẵn sàng cho công việc thực tế.',
    thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    instructor: 'Nguyễn Minh Tú',
    instructorAvatar: 'https://i.pravatar.cc/150?img=32',
    instructorBio: 'Senior Product Designer tại Google. 8 năm kinh nghiệm thiết kế sản phẩm.',
    category: 'design',
    level: 'Beginner',
    price: 599000,
    originalPrice: 1299000,
    rating: 4.9,
    reviewCount: 2847,
    studentCount: 18420,
    duration: '42 giờ',
    lessons: 156,
    language: 'Tiếng Việt',
    tags: ['Figma', 'UI Design', 'UX Research', 'Prototyping'],
    isBestseller: true,
    isFeatured: true,
    curriculum: [
      { id: 's1', title: 'Tư duy thiết kế & UX cơ bản', lessons: [
        { id: 'l1', title: 'Giới thiệu khóa học', duration: '5:30', isFree: true, type: 'video' },
        { id: 'l2', title: 'Design Thinking là gì?', duration: '12:45', isFree: true, type: 'video' },
        { id: 'l3', title: 'User Research cơ bản', duration: '18:20', type: 'video' },
        { id: 'l4', title: 'Quiz: Tư duy thiết kế', duration: '10 câu', type: 'quiz' },
      ]},
      { id: 's2', title: 'Figma từ A đến Z', lessons: [
        { id: 'l5', title: 'Làm quen giao diện Figma', duration: '15:00', isFree: true, type: 'video' },
        { id: 'l6', title: 'Components & Auto Layout', duration: '24:15', type: 'video' },
        { id: 'l7', title: 'Design System cơ bản', duration: '31:00', type: 'video' },
      ]},
    ],
  },
  {
    id: 'c2',
    slug: 'react-nextjs-fullstack',
    title: 'React & Next.js — Fullstack 2025',
    subtitle: 'Build sản phẩm thực tế với React, Next.js 15, TypeScript',
    description: 'Khóa học lập trình fullstack hiện đại. Từ React cơ bản đến deploy production với Next.js, Prisma, và PostgreSQL.',
    thumbnail: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&q=80',
    instructor: 'Trần Văn Hùng',
    instructorAvatar: 'https://i.pravatar.cc/150?img=12',
    instructorBio: 'Senior Frontend Engineer tại Shopee. Contributor của nhiều open-source projects.',
    category: 'dev',
    level: 'Intermediate',
    price: 799000,
    originalPrice: 1599000,
    rating: 4.8,
    reviewCount: 3421,
    studentCount: 22100,
    duration: '68 giờ',
    lessons: 240,
    language: 'Tiếng Việt',
    tags: ['React', 'Next.js', 'TypeScript', 'PostgreSQL'],
    isBestseller: true,
    isFeatured: true,
    curriculum: [
      { id: 's1', title: 'React Fundamentals', lessons: [
        { id: 'l1', title: 'JSX & Components', duration: '20:00', isFree: true, type: 'video' },
        { id: 'l2', title: 'State & Props', duration: '25:00', type: 'video' },
        { id: 'l3', title: 'Hooks sâu', duration: '45:00', type: 'video' },
      ]},
      { id: 's2', title: 'Next.js App Router', lessons: [
        { id: 'l4', title: 'Cài đặt & cấu trúc', duration: '15:00', isFree: true, type: 'video' },
        { id: 'l5', title: 'Server Components', duration: '30:00', type: 'video' },
      ]},
    ],
  },
  {
    id: 'c3',
    slug: 'digital-marketing-2025',
    title: 'Digital Marketing Thực Chiến',
    subtitle: 'Facebook Ads, Google Ads, SEO, Content Marketing',
    description: 'Toàn bộ kỹ năng Digital Marketing từ A-Z. Học từ các chuyên gia đang làm thực tế tại các công ty top Việt Nam.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
    instructor: 'Lê Thị Hoa',
    instructorAvatar: 'https://i.pravatar.cc/150?img=25',
    instructorBio: 'Head of Marketing tại một startup fintech. 10 năm kinh nghiệm digital marketing.',
    category: 'marketing',
    level: 'Beginner',
    price: 499000,
    originalPrice: 999000,
    rating: 4.7,
    reviewCount: 1892,
    studentCount: 14500,
    duration: '35 giờ',
    lessons: 128,
    language: 'Tiếng Việt',
    tags: ['Facebook Ads', 'Google Ads', 'SEO', 'Content'],
    isNew: true,
    curriculum: [
      { id: 's1', title: 'Tư duy Marketing hiện đại', lessons: [
        { id: 'l1', title: 'Marketing Funnel', duration: '15:00', isFree: true, type: 'video' },
        { id: 'l2', title: 'Target Audience', duration: '20:00', type: 'video' },
      ]},
    ],
  },
  {
    id: 'c4',
    slug: 'photography-pro',
    title: 'Nhiếp ảnh Chuyên Nghiệp',
    subtitle: 'Từ Auto mode đến chụp ảnh nghệ thuật',
    description: 'Khóa học nhiếp ảnh toàn diện. Kỹ thuật chụp ảnh, hậu kỳ Lightroom/Photoshop, và xây dựng phong cách cá nhân.',
    thumbnail: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=800&q=80',
    instructor: 'Phạm Quang Vinh',
    instructorAvatar: 'https://i.pravatar.cc/150?img=15',
    instructorBio: 'Nhiếp ảnh gia thương mại. Đã làm việc cho các thương hiệu lớn như Samsung, Vinfast.',
    category: 'photo',
    level: 'Beginner',
    price: 449000,
    originalPrice: 899000,
    rating: 4.8,
    reviewCount: 986,
    studentCount: 7200,
    duration: '28 giờ',
    lessons: 95,
    language: 'Tiếng Việt',
    tags: ['Lightroom', 'Photography', 'Portrait', 'Landscape'],
    curriculum: [],
  },
  {
    id: 'c5',
    slug: 'english-communication',
    title: 'Tiếng Anh Giao Tiếp Tự Tin',
    subtitle: 'IELTS, Business English, và phát âm chuẩn',
    description: 'Học tiếng Anh giao tiếp thực tế với người bản ngữ. Phương pháp học hiệu quả, luyện tập hàng ngày.',
    thumbnail: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
    instructor: 'Sarah Johnson',
    instructorAvatar: 'https://i.pravatar.cc/150?img=45',
    instructorBio: 'Native English speaker. Giảng viên tại British Council 5 năm.',
    category: 'lang',
    level: 'Intermediate',
    price: 699000,
    originalPrice: 1399000,
    rating: 4.9,
    reviewCount: 4120,
    studentCount: 31000,
    duration: '55 giờ',
    lessons: 200,
    language: 'Tiếng Anh',
    tags: ['IELTS', 'Speaking', 'Grammar', 'Pronunciation'],
    isBestseller: true,
    curriculum: [],
  },
  {
    id: 'c6',
    slug: 'startup-business',
    title: 'Khởi nghiệp từ con số 0',
    subtitle: 'Business Model, Pitch deck, Gọi vốn đầu tư',
    description: 'Hướng dẫn thực chiến từ các founder thành công. Từ ý tưởng đến MVP, từ MVP đến scale.',
    thumbnail: 'https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80',
    instructor: 'Đặng Hữu Nam',
    instructorAvatar: 'https://i.pravatar.cc/150?img=55',
    instructorBio: 'Serial entrepreneur. Founder của 3 startup, 1 đã exit thành công.',
    category: 'business',
    level: 'Beginner',
    price: 899000,
    originalPrice: 1999000,
    rating: 4.7,
    reviewCount: 758,
    studentCount: 5400,
    duration: '30 giờ',
    lessons: 110,
    language: 'Tiếng Việt',
    tags: ['Startup', 'Business Model', 'Fundraising', 'MVP'],
    isNew: true,
    curriculum: [],
  },
];

export const FEATURED_COURSE = COURSES[0];

export interface EducationPost {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  category: string;
  readTime: string;
  author: string;
}

export const EDUCATION_BLOG_POSTS: EducationPost[] = [
  {
    id: 'p1',
    title: 'Lộ Trình Học Trí Tuệ Nhân Tạo (AI) Từ Con Số 0 Năm 2026',
    excerpt: 'Làm thế nào để bước vào thế giới Trí Tuệ Nhân Tạo (AI) khi không có nền tảng toán học hay CNTT quá chuyên sâu? Hãy bắt đầu từ lộ trình bài bản này.',
    image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80',
    date: '12 Tháng 06, 2026',
    category: 'Công nghệ / AI',
    readTime: '6 phút đọc',
    author: 'Dr. Lê Thế Hùng'
  },
  {
    id: 'p2',
    title: '10 Xu Hướng Thiết Kế UI/UX Hàng Đầu Bạn Cần Biết',
    excerpt: 'Khám phá các thiết kế giao diện mang tính đột phá của năm nay từ Glassmorphism thế hệ mới đến tối giản kết hợp vi mô 3D.',
    image: 'https://images.unsplash.com/photo-1581291518655-9523c932bfcf?w=500&q=80',
    date: '10 Tháng 06, 2026',
    category: 'UI/UX Design',
    readTime: '4 phút đọc',
    author: 'Nguyễn Minh Tú'
  },
  {
    id: 'p3',
    title: 'Tại Sao Lập Trình Viên Fullstack Cần Học Next.js 15?',
    excerpt: 'Next.js 15 đem lại sự đột phá vượt trội về tốc độ tải trang, SEO tối ưu và cơ chế Server Action cải tiến. Đọc để tìm hiểu lợi ích thực tiễn.',
    image: 'https://images.unsplash.com/photo-1618401471353-b98aedd07871?w=500&q=80',
    date: '08 Tháng 06, 2026',
    category: 'Lập trình / Web',
    readTime: '5 phút đọc',
    author: 'Trần Văn Hoàng'
  },
  {
    id: 'p4',
    title: 'Kỹ Năng Quản Trị Tài Chính Doanh Nghiệp Cho Startup',
    excerpt: 'Kiểm soát dòng tiền tốt là huyết mạch của sự sống còn của doanh nghiệp mới. Xem ngay các mẹo quản trị tài chính thiết thực.',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=500&q=80',
    date: '05 Tháng 06, 2026',
    category: 'Kinh doanh',
    readTime: '8 phút đọc',
    author: 'Đặng Hữu Nam'
  },
  {
    id: 'p5',
    title: 'Nghệ Thuật Sắp Đặt Bố Cục Trong Nhiếp Ảnh Hiện Đại',
    excerpt: 'Tìm hiểu quy tắc một phần ba nâng cao, góc nhìn tương phản và kỹ thuật chụp bóng sáng tạo giúp nâng tầm bức hình của bạn.',
    image: 'https://images.unsplash.com/photo-1452780212940-6f5c0d14d848?w=500&q=80',
    date: '01 Tháng 06, 2026',
    category: 'Nhiếp ảnh',
    readTime: '5 phút đọc',
    author: 'Hoàng Thế Mỹ'
  },
  {
    id: 'p6',
    title: 'Xây Dựng Thương Hiệu Cá Nhân Trên Mạng Xã Hội',
    excerpt: 'Học cách thiết lập profile uy tín, định hình nội dung chia sẻ giá trị và tiếp cận thị trường tiềm năng để phát triển sự nghiệp cá nhân.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&q=80',
    date: '28 Tháng 05, 2026',
    category: 'Marketing',
    readTime: '7 phút đọc',
    author: 'Lê Khánh Hà'
  }
];
