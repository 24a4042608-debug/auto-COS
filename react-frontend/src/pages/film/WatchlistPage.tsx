import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Bookmark, Play, Trash2, Star } from "lucide-react";
import { MOVIES } from "@/constants/filmData";
import { useFilm } from "@/contexts/FilmContext";

export default function WatchlistPage() {
  const { bookmarks, toggleBookmark, isAuthenticated } = useFilm();
  const watchlistMovies = MOVIES.filter((m) => bookmarks.includes(m.id));

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#0A0A0F] flex items-center justify-center">
        <div className="text-center space-y-4">
          <Bookmark className="w-16 h-16 text-zinc-700 mx-auto" />
          <h2 className="text-white text-xl font-bold">Sign in to view your Watchlist</h2>
          <p className="text-zinc-500 text-sm">Save your favourite films and series here.</p>
          <Link to="/film/auth">
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
            <h1 className="text-white text-3xl font-black tracking-tight">My Watchlist</h1>
            <p className="text-zinc-500 text-sm mt-1">{watchlistMovies.length} saved title{watchlistMovies.length !== 1 ? "s" : ""}</p>
          </div>
        </div>

        {watchlistMovies.length === 0 ? (
          <div className="text-center py-24 space-y-4">
            <Bookmark className="w-16 h-16 text-zinc-800 mx-auto" />
            <p className="text-zinc-400 text-lg font-medium">Your watchlist is empty</p>
            <p className="text-zinc-600 text-sm">Add films by clicking the + button on any title.</p>
            <Link to="/film/browse">
              <button className="mt-4 bg-[#E50914] hover:bg-[#f40612] text-white px-8 py-3 rounded-sm text-sm font-bold transition-colors cursor-pointer">
                Browse Films
              </button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
            {watchlistMovies.map((movie, i) => (
              <motion.div
                key={movie.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: i * 0.05 }}
                className="group relative"
              >
                <Link href={`/film/movie/${movie.slug}`} className="block relative aspect-[2/3] rounded-sm overflow-hidden bg-zinc-900">
                  <img src={movie.poster} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center">
                    <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center">
                      <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                    </div>
                  </div>
                  {/* Rating */}
                  <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-sm px-1.5 py-0.5 rounded-sm">
                    <Star className="w-2.5 h-2.5 text-yellow-400 fill-yellow-400" />
                    <span className="text-white text-[10px] font-semibold">{movie.rating}</span>
                  </div>
                </Link>
                <div className="mt-2 flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <Link href={`/film/movie/${movie.slug}`}>
                      <h3 className="text-zinc-200 text-sm font-medium truncate hover:text-white transition-colors cursor-pointer">{movie.title}</h3>
                    </Link>
                    <p className="text-zinc-600 text-xs mt-0.5">{movie.year} · {movie.genres[0]}</p>
                  </div>
                  <button
                    onClick={() => toggleBookmark(movie.id)}
                    title="Remove from Watchlist"
                    className="flex-shrink-0 text-zinc-600 hover:text-red-400 transition-colors cursor-pointer mt-0.5"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
