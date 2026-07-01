"use client";

import { useState, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, Star, SlidersHorizontal } from "lucide-react";
import Link from "next/link";
import { MOVIES, GENRES, Movie } from "@/constants/filmData";
import { useFilm } from "@/contexts/FilmContext";
import { cn } from "@/lib/utils";

const SORT_OPTIONS = [
  { label: "Trending", value: "trending" },
  { label: "Top Rated", value: "top" },
  { label: "Newest", value: "new" },
  { label: "A–Z", value: "az" },
];

function MovieGridCard({ movie }: { movie: Movie }) {
  const { isBookmarked, toggleBookmark } = useFilm();
  const bookmarked = isBookmarked(movie.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative"
    >
      <Link href={`/film/movie/${movie.slug}`} className="block">
        <div className="relative aspect-[2/3] rounded-sm overflow-hidden bg-zinc-900">
          <img
            src={movie.poster}
            alt={movie.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
            <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
              <svg viewBox="0 0 24 24" fill="black" className="w-6 h-6 ml-0.5">
                <path d="M8 5v14l11-7z" />
              </svg>
            </div>
          </div>

          {movie.isNew && (
            <div className="absolute top-2 left-2 bg-[#E50914] text-white text-[9px] font-black px-1.5 py-0.5 rounded-sm uppercase tracking-wide">
              New
            </div>
          )}

          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-sm">
            <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
            <span className="text-white text-[10px] font-semibold">{movie.rating}</span>
          </div>

          <button
            onClick={(e) => { e.preventDefault(); toggleBookmark(movie.id); }}
            className={cn(
              "absolute bottom-2 right-2 w-7 h-7 rounded-sm flex items-center justify-center text-xs transition-all cursor-pointer",
              bookmarked ? "bg-white text-black" : "bg-black/60 text-white hover:bg-white/20"
            )}
          >
            {bookmarked ? "✓" : "+"}
          </button>
        </div>
        <div className="mt-2">
          <h3 className="text-zinc-200 text-sm font-medium truncate group-hover:text-white transition-colors">
            {movie.title}
          </h3>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="text-zinc-600 text-xs">{movie.year}</span>
            <span className="text-zinc-700 text-xs">·</span>
            <span className="text-zinc-600 text-xs">{movie.genres[0]}</span>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function BrowseContent() {
  const searchParams = useSearchParams();
  const initialQ = searchParams.get("q") || "";
  const initialFilter = searchParams.get("filter") || "";
  const initialSort = searchParams.get("sort") || "trending";

  const [query, setQuery] = useState(initialQ);
  const [activeGenre, setActiveGenre] = useState("All");
  const [sort, setSort] = useState(initialSort);

  const filtered = useMemo(() => {
    let result = [...MOVIES];

    if (query) {
      const q = query.toLowerCase();
      result = result.filter(
        (m) =>
          m.title.toLowerCase().includes(q) ||
          m.director.toLowerCase().includes(q) ||
          m.genres.some((g) => g.toLowerCase().includes(q)) ||
          m.description.toLowerCase().includes(q)
      );
    }

    if (activeGenre !== "All") {
      result = result.filter((m) => m.genres.includes(activeGenre));
    }

    if (initialFilter === "new") {
      result = result.filter((m) => m.isNew);
    }

    switch (sort) {
      case "top":
        result.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
        break;
      case "new":
        result.sort((a, b) => b.year - a.year);
        break;
      case "az":
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        result.sort((a, b) => (b.isTrending ? 1 : 0) - (a.isTrending ? 1 : 0));
    }

    return result;
  }, [query, activeGenre, sort, initialFilter]);

  return (
    <div className="bg-[#0A0A0F] min-h-screen pt-24 pb-20">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-8 lg:px-12">

        <div className="mb-8">
          <h1 className="text-white text-3xl md:text-4xl font-black tracking-tight">Browse Films</h1>
          <p className="text-zinc-500 text-sm mt-1">{filtered.length} titles found</p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 pointer-events-none" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search titles, directors, genres..."
            className="w-full bg-zinc-900 border border-white/10 text-white text-sm pl-12 pr-12 py-4 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E50914]/50 transition-colors"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white cursor-pointer transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="flex items-start md:items-center justify-between gap-4 mb-8 flex-col md:flex-row">
          <div className="flex items-center gap-2 flex-wrap">
            {GENRES.map((genre) => (
              <button
                key={genre}
                onClick={() => setActiveGenre(genre)}
                className={cn(
                  "px-3 py-1.5 text-xs font-medium rounded-sm transition-all cursor-pointer whitespace-nowrap",
                  activeGenre === genre
                    ? "bg-[#E50914] text-white shadow-lg shadow-red-900/30"
                    : "bg-zinc-900 text-zinc-400 hover:text-white hover:bg-zinc-800 border border-white/10"
                )}
              >
                {genre}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 flex-shrink-0">
            <SlidersHorizontal className="w-4 h-4 text-zinc-500" />
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="bg-zinc-900 border border-white/10 text-zinc-300 text-xs px-3 py-2 rounded-sm focus:outline-none cursor-pointer"
            >
              {SORT_OPTIONS.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Grid */}
        <AnimatePresence mode="popLayout">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24 space-y-3">
              <p className="text-5xl">🎬</p>
              <p className="text-zinc-400 text-lg font-medium">No results found</p>
              <button
                onClick={() => { setQuery(""); setActiveGenre("All"); }}
                className="mt-4 text-[#E50914] text-sm hover:underline cursor-pointer"
              >
                Clear filters
              </button>
            </motion.div>
          ) : (
            <motion.div
              layout
              className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 md:gap-5"
            >
              {filtered.map((movie) => (
                <MovieGridCard key={movie.id} movie={movie} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
