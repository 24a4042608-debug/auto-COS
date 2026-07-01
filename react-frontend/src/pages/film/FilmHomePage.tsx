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
      </div>
    </div>
  );
}
