"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { History, Play, Trash2, Clock, X } from "lucide-react";
import { MOVIES } from "@/constants/filmData";
import { useFilm } from "@/contexts/FilmContext";

export default function HistoryPage() {
  const { history, clearHistory, addToHistory, isAuthenticated } = useFilm();

  const historyMovies = history
    .map((h) => ({
      ...h,
      movie: MOVIES.find((m) => m.id === h.movieId),
    }))
    .filter((h) => h.movie !== undefined) as Array<{
    movieId: string;
    watchedAt: Date;
    progress: number;
    movie: (typeof MOVIES)[0];
  }>;

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center space-y-4">
          <History className="w-16 h-16 text-zinc-700 mx-auto" />
          <h2 className="text-white text-xl font-bold">Sign in to see your watch history</h2>
          <Link href="/film/auth">
            <button className="bg-[#E50914] hover:bg-[#f40612] text-white px-8 py-3 rounded-sm text-sm font-bold transition-colors cursor-pointer mt-2">
              Sign In
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#0A0A0F] min-h-screen pt-28 pb-20">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12">
        
        <div className="mb-8 flex items-end justify-between">
          <div>
            <h1 className="text-white text-3xl font-black tracking-tight">Watch History</h1>
            <p className="text-zinc-500 text-sm mt-1">{historyMovies.length} watched title{historyMovies.length !== 1 ? "s" : ""}</p>
          </div>
          {historyMovies.length > 0 && (
            <button
              onClick={clearHistory}
              className="flex items-center gap-2 text-zinc-500 hover:text-red-400 text-sm transition-colors cursor-pointer"
            >
              <Trash2 className="w-4 h-4" />
              Clear All
            </button>
          )}
        </div>

        {historyMovies.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <History className="w-16 h-16 text-zinc-800 mx-auto" />
            <p className="text-zinc-400 text-lg font-medium">No watch history yet</p>
            <p className="text-zinc-600 text-sm">Start watching films and they'll appear here.</p>
            <Link href="/film/browse">
              <button className="mt-4 bg-[#E50914] hover:bg-[#f40612] text-white px-8 py-3 rounded-sm text-sm font-bold transition-colors cursor-pointer">
                Browse Films
              </button>
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {historyMovies.map(({ movie, watchedAt, progress }, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center gap-4 bg-zinc-900/60 border border-white/[0.06] rounded-sm p-3 group hover:border-white/10 transition-colors"
              >
                {/* Thumbnail */}
                <Link href={`/film/movie/${movie.slug}`} className="relative flex-shrink-0 w-16 h-24 rounded-sm overflow-hidden bg-zinc-800">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </Link>

                {/* Info */}
                <div className="flex-1 min-w-0 space-y-1.5">
                  <Link href={`/film/movie/${movie.slug}`}>
                    <h3 className="text-white text-sm font-semibold hover:text-zinc-200 transition-colors truncate cursor-pointer">
                      {movie.title}
                    </h3>
                  </Link>
                  <div className="flex items-center gap-2 text-zinc-500 text-xs">
                    <Clock className="w-3 h-3" />
                    <span>{watchedAt.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}</span>
                    <span>·</span>
                    <span>{movie.genres[0]}</span>
                    <span>·</span>
                    <span>{movie.year}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="space-y-1">
                    <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden max-w-xs">
                      <div
                        className="h-full bg-[#E50914] rounded-full"
                        style={{ width: `${progress}%` }}
                      />
                    </div>
                    <span className="text-zinc-600 text-[10px]">{progress}% watched</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <Link href={`/film/movie/${movie.slug}`}>
                    <button className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-2 rounded-sm transition-colors cursor-pointer">
                      <Play className="w-3 h-3 fill-white" />
                      {progress > 0 && progress < 100 ? "Continue" : "Watch"}
                    </button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
