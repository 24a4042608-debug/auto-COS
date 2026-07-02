import { useRef } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Plus, ThumbsUp, Star, Check } from "lucide-react";
import type { Movie } from "@/constants/filmData";
import { useFilm } from "@/contexts/FilmContext";
import { cn } from "@/lib/utils";

interface MovieRowProps {
  title: string;
  badge?: string;
  movies: Movie[];
  showRank?: boolean;
  size?: "sm" | "md" | "lg";
}

function MovieCard({ movie, showRank, rank, size = "md" }: { movie: Movie; showRank?: boolean; rank?: number; size?: "sm" | "md" | "lg" }) {
  const { isBookmarked, toggleBookmark } = useFilm();
  const bookmarked = isBookmarked(movie.id);

  const widthClass = size === "sm" ? "w-36 md:w-44" : size === "lg" ? "w-56 md:w-64" : "w-44 md:w-52";

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className={cn("flex-shrink-0 group relative", widthClass, showRank && "ml-8 mt-4")}
    >
      {/* Rank number (Top 10) */}
      {showRank && rank && (
        <div className="absolute -left-10 bottom-6 z-0 text-[9rem] font-black leading-none text-[#0e0e15] select-none font-mono tracking-tighter"
          style={{ WebkitTextStroke: "2px rgba(255,255,255,0.15)", textShadow: "0 0 25px rgba(0,0,0,0.9)" }}
        >
          {rank}
        </div>
      )}

      <Link to={`/film/movie/${movie.slug}`} className="block relative aspect-[2/3] overflow-hidden rounded-sm bg-zinc-900">
        {/* Poster */}
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-between p-3">
          {/* Top details */}
          <div className="flex items-center justify-between">
            <span className="text-[9px] font-extrabold text-zinc-400 bg-zinc-900 border border-zinc-700 px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
              {movie.maturityRating || "16+"}
            </span>
            <span className="text-[9px] font-bold text-yellow-500 bg-yellow-500/10 px-1.5 py-0.5 rounded-sm uppercase">
              {Number(movie.rating) >= 8.5 ? "4K UHD" : "HDR"}
            </span>
          </div>

          {/* Middle Brief Description */}
          <div className="space-y-1 my-2">
            <p className="text-[10px] text-zinc-300 line-clamp-3 leading-relaxed italic">
              "{movie.description}"
            </p>
            <p className="text-[9px] text-zinc-400 font-medium">
              Đạo diễn: <span className="text-zinc-200">{movie.director}</span>
            </p>
          </div>

          {/* Bottom actions & stats */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center hover:bg-zinc-200 transition-colors">
                <Play className="w-3.5 h-3.5 text-black fill-black ml-0.5" />
              </div>
              <button
                onClick={(e) => { e.preventDefault(); toggleBookmark(movie.id); }}
                className={cn(
                  "w-8 h-8 rounded-full border flex items-center justify-center transition-all cursor-pointer",
                  bookmarked
                    ? "bg-white border-white text-black"
                    : "border-zinc-500 text-white hover:border-white"
                )}
              >
                {bookmarked ? <Check className="w-3 h-3" /> : <Plus className="w-3 h-3" />}
              </button>
              <div className="ml-auto flex items-center gap-0.5 text-yellow-400">
                <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                <span className="text-white text-xs font-bold">{movie.rating}</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 flex-wrap pt-1 border-t border-zinc-800">
              {movie.genres.slice(0, 2).map((g) => (
                <span key={g} className="text-[9px] text-zinc-400">
                  {g}
                </span>
              ))}
              <span className="text-[9px] text-zinc-500 ml-auto">{movie.duration}</span>
            </div>
          </div>
        </div>

        {/* New badge */}
        {movie.isNew && (
          <div className="absolute top-2 left-2 bg-[#E50914] text-white text-[9px] font-bold px-1.5 py-0.5 rounded-sm uppercase tracking-wider">
            New
          </div>
        )}
      </Link>

      {/* Card info */}
      <div className="mt-2 px-0.5">
        <Link href={`/film/movie/${movie.slug}`}>
          <h3 className="text-zinc-200 text-sm font-medium truncate hover:text-white transition-colors cursor-pointer">
            {movie.title}
          </h3>
        </Link>
        <p className="text-zinc-600 text-xs mt-0.5">{movie.year} · {movie.genres[0]}</p>
      </div>
    </motion.div>
  );
}

export default function MovieRow({ title, badge, movies, showRank, size = "md" }: MovieRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.7;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="relative overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between mb-4 px-4 md:px-8 lg:px-12">
        <div className="flex items-center gap-3">
          {badge && (
            <span className="text-[#E50914] text-[10px] font-black tracking-widest uppercase border border-[#E50914]/40 px-2 py-0.5 rounded-sm">
              {badge}
            </span>
          )}
          <h2 className="text-white text-lg md:text-xl font-bold tracking-tight">{title}</h2>
        </div>
        <div className="hidden md:flex items-center gap-1.5">
          <button
            onClick={() => scroll("left")}
            className="w-8 h-8 bg-zinc-800/80 hover:bg-zinc-700 rounded-sm flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer border border-white/10"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-8 h-8 bg-zinc-800/80 hover:bg-zinc-700 rounded-sm flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer border border-white/10"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Scrollable row */}
      <div
        ref={scrollRef}
        className="flex gap-3 px-4 md:px-8 lg:px-12 pb-4 overflow-x-auto"
        style={{ scrollbarWidth: "none" }}
      >
        {movies.map((movie, i) => (
          <MovieCard key={movie.id} movie={movie} showRank={showRank} rank={i + 1} size={size} />
        ))}
      </div>
    </section>
  );
}

