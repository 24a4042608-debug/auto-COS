import FilmHeroBanner from "@/components/film/FilmHeroBanner";
import MovieRow from "@/components/film/MovieRow";
import { MOVIES, FEATURED_MOVIE, TRENDING, NEW_RELEASES, TOP_10 } from "@/constants/filmData";

export default function FilmHomePage() {
  const dramas = MOVIES.filter((m) => m.genres.includes("Drama"));
  const thrillers = MOVIES.filter((m) => m.genres.includes("Thriller"));
  const scifi = MOVIES.filter((m) => m.genres.includes("Sci-Fi"));

  return (
    <div className="bg-[#0A0A0F] pb-20">
      {/* ① Hero Banner */}
      <FilmHeroBanner movie={FEATURED_MOVIE} />

      {/* ② Movie Rows */}
      <div className="space-y-10 -mt-4 relative z-10">

        <MovieRow
          title="Trending Now"
          badge="🔥 Hot"
          movies={TRENDING}
        />

        <MovieRow
          title="Top 10 This Week"
          badge="Top 10"
          movies={TOP_10}
          showRank
        />

        <MovieRow
          title="New & Fresh"
          badge="New"
          movies={NEW_RELEASES}
        />

        <MovieRow
          title="Critically Acclaimed Dramas"
          movies={dramas}
        />

        <MovieRow
          title="Edge-of-Your-Seat Thrillers"
          movies={thrillers}
        />

        <MovieRow
          title="Sci-Fi Universe"
          movies={scifi}
        />

        <MovieRow
          title="Full Library"
          movies={MOVIES}
          size="sm"
        />

        {/* ③ Genre Banner CTA */}
        <div className="px-4 md:px-8 lg:px-12">
          <div className="relative rounded-sm overflow-hidden h-52 md:h-64">
            <img
              src="https://images.unsplash.com/photo-1518281420975-50db6e5d0a97?q=80&w=1400"
              alt="Browse all genres"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center px-8 md:px-12">
              <div className="space-y-3">
                <span className="text-[#E50914] text-xs font-black tracking-widest uppercase">Browse Genres</span>
                <h3 className="text-white text-2xl md:text-3xl font-black leading-tight">
                  Find Your Next<br />Favorite Film
                </h3>
                <a href="/film/browse">
                  <button className="flex items-center gap-2 bg-[#E50914] hover:bg-[#f40612] text-white px-6 py-2.5 text-sm font-bold rounded-sm transition-all cursor-pointer mt-2">
                    Browse All
                  </button>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* ④ Coming Soon Section */}
        <div className="px-4 md:px-8 lg:px-12 py-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-white text-lg font-bold flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#E50914] animate-pulse"></span>
              Phim Sắp Chiếu (Coming Soon 2026)
            </h3>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { title: 'The Chronos Paradox', date: 'Tháng 10, 2026', type: 'Sci-Fi / Thriller', img: 'https://images.unsplash.com/photo-1534447677768-be436bb09401?w=500&q=80' },
              { title: 'Neon Nights: Neo-Tokyo', date: 'Tháng 11, 2026', type: 'Cyberpunk Action', img: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?w=500&q=80' },
              { title: 'Silent Whispers', date: 'Tháng 12, 2026', type: 'Horror / Mystery', img: 'https://images.unsplash.com/photo-1509248961158-e54f6934749c?w=500&q=80' },
              { title: 'Beyond the Horizon', date: 'Tháng 01, 2027', type: 'Space Adventure', img: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80' }
            ].map((movie, idx) => (
              <div key={idx} className="group relative rounded overflow-hidden aspect-[16/10] bg-zinc-900 border border-white/[0.05]">
                <img src={movie.img} alt={movie.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-300" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-3">
                  <span className="text-[#E50914] text-[9px] font-bold uppercase tracking-wider block">{movie.type}</span>
                  <h4 className="text-white text-xs font-bold truncate mt-0.5">{movie.title}</h4>
                  <span className="text-white/40 text-[9px] mt-1 block">Khởi chiếu: {movie.date}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ⑤ Cinema Insights / News Section */}
        <div className="px-4 md:px-8 lg:px-12 py-10 border-t border-white/[0.04] bg-[#07070a]/50">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-[#E50914] text-xs font-bold uppercase tracking-wider block mb-1">Tin Tức & Tiêu Điểm</span>
              <h3 className="text-white text-xl md:text-2xl font-bold tracking-tight">Điểm Tin Điện Ảnh CineVault</h3>
            </div>
            <p className="text-zinc-400 text-xs max-w-sm">Cập nhật tin hậu trường, bảng doanh thu phòng vé, và đánh giá phân tích chuyên sâu các bom tấn điện ảnh thế giới.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                title: "Hậu trường VFX hoành tráng của dự án bom tấn giả tưởng 'The Chronos Paradox'",
                excerpt: "Để tạo nên những dòng thời gian đan xen chân thực nhất, đội ngũ sản xuất đã dành hơn 18 tháng dựng hình 3D và kết hợp kỹ xảo cơ học đột phá.",
                img: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=500&q=80",
                date: "01 Tháng 07, 2026",
                tag: "Hậu Trường"
              },
              {
                title: "Phỏng vấn độc quyền đạo diễn Christopher Vance: 'Điện ảnh cần sự nguyên bản'",
                excerpt: "Vance chia sẻ về triết lý làm phim tối giản CGI, ưu tiên quay phim định dạng lớn 70mm và cách ông khơi gợi cảm xúc chân thật nhất từ các diễn viên.",
                img: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=500&q=80",
                date: "28 Tháng 06, 2026",
                tag: "Tiêu Điểm"
              },
              {
                title: "Top 5 bộ phim khoa học viễn tưởng hứa hẹn bùng nổ phòng vé nửa cuối 2026",
                excerpt: "Cùng điểm mặt các dự án đầy tham vọng từ các hãng phim lớn, hứa hẹn sẽ định hình lại xu hướng và mang tới trải nghiệm nghe nhìn choáng ngợp.",
                img: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&q=80",
                date: "25 Tháng 06, 2026",
                tag: "Xu Hướng"
              }
            ].map((insight, idx) => (
              <div key={idx} className="group bg-zinc-900/40 border border-white/[0.04] rounded-sm overflow-hidden hover:border-white/[0.1] hover:bg-zinc-900/80 transition-all duration-300">
                <div className="relative aspect-[16/9] overflow-hidden bg-zinc-950">
                  <img src={insight.img} alt={insight.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 opacity-70 group-hover:opacity-90" />
                  <span className="absolute top-2 left-2 bg-[#E50914] text-white text-[8px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-widest">
                    {insight.tag}
                  </span>
                </div>
                <div className="p-4 space-y-2">
                  <span className="text-[9px] text-zinc-500 font-mono">{insight.date}</span>
                  <h4 className="text-white text-sm font-bold line-clamp-2 leading-snug group-hover:text-[#E50914] transition-colors">{insight.title}</h4>
                  <p className="text-zinc-400 text-xs line-clamp-3 leading-relaxed">{insight.excerpt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

