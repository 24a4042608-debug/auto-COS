import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Play, Plus, Check, Star, Clock, Globe, User, ChevronLeft,
  Share2, ThumbsUp, X, Volume2, VolumeX, Maximize2,
  SkipBack, SkipForward, Pause
} from "lucide-react";
import { MOVIES } from "@/constants/filmData";
import { useFilm } from "@/contexts/FilmContext";
import MovieRow from "@/components/film/MovieRow";
import { cn } from "@/lib/utils";

export default function MovieDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const movie = MOVIES.find((m) => m.slug === slug) || MOVIES[0];
  const related = MOVIES.filter((m) => m.id !== movie.id && m.genres.some((g) => movie.genres.includes(g))).slice(0, 8);

  const { isBookmarked, toggleBookmark, addToHistory } = useFilm();
  const bookmarked = isBookmarked(movie.id);

  const [playerOpen, setPlayerOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [progress, setProgress] = useState(23);
  const [liked, setLiked] = useState(false);

  const handleWatch = () => {
    setPlayerOpen(true);
    setPlaying(true);
    addToHistory(movie.id, progress);
  };

  return (
    <div className="bg-[#0A0A0F] min-h-screen pb-20">
      {/* BACKDROP HERO */}
      <div className="relative w-full h-[70vh] min-h-[480px] max-h-[700px] overflow-hidden">
        <img src={movie.backdrop} alt={movie.title} className="w-full h-full object-cover object-top" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0F] via-[#0A0A0F]/70 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-transparent to-black/30" />

        <Link to="/film" className="absolute top-24 left-4 md:left-12 flex items-center gap-1.5 text-zinc-400 hover:text-white text-sm transition-colors group">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
          Back
        </Link>

        <div className="absolute bottom-0 left-0 right-0 px-4 md:px-12 pb-10 max-w-screen-2xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }} className="max-w-2xl">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-yellow-400">
                <Star className="w-4 h-4 fill-yellow-400" />
                <span className="text-white text-lg font-black">{movie.rating}</span>
                <span className="text-zinc-500 text-sm">/10</span>
              </div>
              <span className="border border-zinc-600 text-zinc-400 text-xs px-2 py-0.5 rounded-sm font-mono">{movie.maturityRating}</span>
              {movie.isTrending && (
                <span className="text-[#E50914] text-xs font-bold tracking-wider uppercase border border-[#E50914]/40 px-2 py-0.5 rounded-sm">Trending</span>
              )}
            </div>

            <h1 className="text-white font-black text-4xl md:text-6xl tracking-tight leading-tight mb-2">{movie.title}</h1>
            {movie.originalTitle && <p className="text-zinc-500 text-sm italic mb-3">{movie.originalTitle}</p>}

            <div className="flex items-center gap-3 text-zinc-400 text-sm flex-wrap mb-6">
              <span>{movie.year}</span><span>·</span>
              <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" />{movie.duration}</span><span>·</span>
              <span className="flex items-center gap-1"><Globe className="w-3.5 h-3.5" />{movie.language}</span>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <button onClick={handleWatch} className="flex items-center gap-3 bg-white hover:bg-zinc-200 text-black px-8 py-3.5 font-bold text-sm rounded-sm transition-all cursor-pointer hover:shadow-xl">
                <Play className="w-5 h-5 fill-black" /> Watch Now
              </button>
              <button onClick={() => toggleBookmark(movie.id)} className={cn("w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer", bookmarked ? "bg-white border-white text-black" : "border-zinc-500 text-white hover:border-white")}>
                {bookmarked ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
              </button>
              <button onClick={() => setLiked(!liked)} className={cn("w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer", liked ? "bg-[#E50914]/20 border-[#E50914] text-[#E50914]" : "border-zinc-500 text-white hover:border-white")}>
                <ThumbsUp className="w-5 h-5" />
              </button>
              <button className="w-12 h-12 rounded-full border-2 border-zinc-500 text-white hover:border-white flex items-center justify-center transition-all cursor-pointer">
                <Share2 className="w-5 h-5" />
              </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* DETAILS */}
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-2 flex-wrap">
              {movie.genres.map((g) => (
                <Link key={g} to={`/film/browse?genre=${g}`}>
                  <span className="bg-zinc-900 hover:bg-zinc-800 border border-white/10 text-zinc-300 text-xs px-3 py-1.5 rounded-sm cursor-pointer transition-colors">{g}</span>
                </Link>
              ))}
            </div>

            <div className="space-y-3">
              <h2 className="text-white text-lg font-bold">Synopsis</h2>
              <p className="text-zinc-400 text-sm leading-relaxed">{movie.longDescription}</p>
            </div>

            <div className="space-y-3">
              <h2 className="text-white text-lg font-bold">Cast</h2>
              <div className="flex items-center gap-3 flex-wrap">
                {movie.cast.map((actor) => (
                  <div key={actor} className="flex items-center gap-2 bg-zinc-900/60 border border-white/10 rounded-sm px-3 py-2">
                    <div className="w-7 h-7 bg-zinc-800 rounded-full flex items-center justify-center text-zinc-400"><User className="w-3.5 h-3.5" /></div>
                    <span className="text-zinc-300 text-sm">{actor}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs text-zinc-500">
                <span>Your Progress</span><span>{progress}% watched</span>
              </div>
              <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                <div className="h-full bg-[#E50914] rounded-full transition-all duration-500" style={{ width: `${progress}%` }} />
              </div>
              <button onClick={handleWatch} className="text-[#E50914] text-xs hover:text-red-300 cursor-pointer">Continue watching →</button>
            </div>
          </div>

          <div className="space-y-5">
            {[
              { label: "Director", value: movie.director },
              { label: "Country", value: movie.country },
              { label: "Language", value: movie.language },
              { label: "Release Year", value: String(movie.year) },
              { label: "Duration", value: movie.duration },
              { label: "Rating", value: `${movie.rating} / 10 ⭐` },
              { label: "Maturity", value: movie.maturityRating },
            ].map(({ label, value }) => (
              <div key={label} className="border-b border-white/[0.06] pb-4">
                <p className="text-zinc-600 text-xs uppercase tracking-wider mb-1">{label}</p>
                <p className="text-zinc-200 text-sm">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {related.length > 0 && (
          <div className="mt-16">
            <MovieRow title="More Like This" movies={related} />
          </div>
        )}
      </div>

      {/* VIDEO PLAYER MODAL */}
      <AnimatePresence>
        {playerOpen && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[200] bg-black">
            <button onClick={() => { setPlayerOpen(false); setPlaying(false); }} className="absolute top-5 right-5 w-10 h-10 bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 rounded-full flex items-center justify-center text-white cursor-pointer z-10 transition-colors">
              <X className="w-5 h-5" />
            </button>

            <div className="relative w-full h-full flex items-center justify-center">
              <img src={movie.backdrop} alt={movie.title} className="absolute inset-0 w-full h-full object-cover opacity-25" />
              <div className="absolute inset-0 bg-black/40" />

              <div className="relative z-10 flex flex-col items-center gap-4">
                <motion.button initial={{ scale: 0.8 }} animate={{ scale: 1 }} onClick={() => setPlaying(!playing)} className="w-20 h-20 bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer transition-all">
                  {playing ? <Pause className="w-9 h-9 text-white fill-white" /> : <Play className="w-9 h-9 text-white fill-white ml-1" />}
                </motion.button>
                <p className="text-white/60 text-sm">{movie.title} — {movie.year}</p>
              </div>

              <div className="absolute bottom-0 left-0 right-0 px-6 pb-6 pt-16 bg-gradient-to-t from-black to-transparent">
                <div className="max-w-4xl mx-auto space-y-3">
                  <div className="space-y-1">
                    <div className="w-full h-1.5 bg-zinc-700/80 rounded-full cursor-pointer group" onClick={(e) => { const rect = e.currentTarget.getBoundingClientRect(); const newPct = Math.round(((e.clientX - rect.left) / rect.width) * 100); setProgress(newPct); addToHistory(movie.id, newPct); }}>
                      <div className="h-full bg-[#E50914] rounded-full relative transition-all duration-100" style={{ width: `${progress}%` }}>
                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3.5 h-3.5 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity shadow-lg" />
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-zinc-500 text-[10px]">
                      <span>0:{String(Math.round(progress * 0.72)).padStart(2,"0")} min</span>
                      <span>{movie.duration}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-5">
                      <button className="text-white/70 hover:text-white cursor-pointer transition-colors"><SkipBack className="w-5 h-5" /></button>
                      <button onClick={() => setPlaying(!playing)} className="text-white cursor-pointer">
                        {playing ? <Pause className="w-6 h-6 fill-white" /> : <Play className="w-6 h-6 fill-white ml-0.5" />}
                      </button>
                      <button className="text-white/70 hover:text-white cursor-pointer transition-colors"><SkipForward className="w-5 h-5" /></button>
                      <button onClick={() => setMuted(!muted)} className="text-white/70 hover:text-white cursor-pointer transition-colors">
                        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      <span className="text-white/60 text-xs hidden sm:block">{movie.title}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="text-white/50 text-xs hidden sm:block">HD · {movie.language}</span>
                      <button className="text-white/70 hover:text-white cursor-pointer"><Maximize2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
