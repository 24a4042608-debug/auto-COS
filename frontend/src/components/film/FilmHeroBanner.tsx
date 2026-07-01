"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Play, Plus, ThumbsUp, Info, X, Volume2, VolumeX, Star, Check } from "lucide-react";
import { Movie } from "@/constants/filmData";
import { useFilm } from "@/contexts/FilmContext";
import { cn } from "@/lib/utils";

interface FilmHeroBannerProps {
  movie: Movie;
}

export default function FilmHeroBanner({ movie }: FilmHeroBannerProps) {
  const [playerOpen, setPlayerOpen] = useState(false);
  const [muted, setMuted] = useState(true);
  const { isBookmarked, toggleBookmark } = useFilm();
  const bookmarked = isBookmarked(movie.id);

  return (
    <>
      {/* Hero */}
      <section className="relative w-full h-screen min-h-[680px] max-h-[900px] overflow-hidden">
        {/* Backdrop Image */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <img
            src={movie.backdrop}
            alt={movie.title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Gradient overlays for depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/60 to-black/10" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/20 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="px-4 md:px-8 lg:px-12 max-w-screen-2xl mx-auto w-full">
            <div className="max-w-xl">
              
              {/* Logo / Title treatment */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="mb-3 flex items-center gap-2"
              >
                <span className="text-[#E50914] text-xs font-black tracking-widest uppercase border border-[#E50914]/40 px-2 py-0.5 rounded-sm">
                  #1 in Films
                </span>
                {movie.isTrending && (
                  <span className="text-zinc-300 text-xs font-medium">🔥 Trending</span>
                )}
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                className="text-white font-black text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] tracking-tight mb-4"
              >
                {movie.title}
              </motion.h1>

              {/* Rating + meta */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex items-center gap-3 mb-4 flex-wrap"
              >
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-3.5 h-3.5 fill-yellow-400" />
                  <span className="text-white text-sm font-semibold">{movie.rating}</span>
                  <span className="text-zinc-500 text-xs">/10</span>
                </div>
                <span className="text-zinc-500 text-xs">•</span>
                <span className="text-zinc-300 text-xs">{movie.year}</span>
                <span className="text-zinc-500 text-xs">•</span>
                <span className="text-zinc-300 text-xs">{movie.duration}</span>
                <span className="text-zinc-500 text-xs">•</span>
                <span className="border border-zinc-600 text-zinc-400 text-[10px] px-1.5 py-0.5 rounded-sm font-mono">
                  {movie.maturityRating}
                </span>
              </motion.div>

              {/* Genre tags */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex items-center gap-1.5 mb-4 flex-wrap"
              >
                {movie.genres.map((g, i) => (
                  <span key={g} className="flex items-center gap-1.5">
                    <span className="text-zinc-400 text-xs">{g}</span>
                    {i < movie.genres.length - 1 && <span className="text-zinc-700">·</span>}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-md mb-7 line-clamp-3"
              >
                {movie.description}
              </motion.p>

              {/* CTA buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-3 flex-wrap"
              >
                <button
                  onClick={() => setPlayerOpen(true)}
                  className="flex items-center gap-3 bg-white hover:bg-zinc-200 text-black px-8 py-3.5 font-bold text-sm rounded-sm transition-all cursor-pointer hover:shadow-xl active:scale-[0.98]"
                >
                  <Play className="w-5 h-5 fill-black" />
                  Watch Now
                </button>

                <Link href={`/film/movie/${movie.slug}`}>
                  <button className="flex items-center gap-3 bg-zinc-700/70 hover:bg-zinc-600/80 text-white px-6 py-3.5 font-semibold text-sm rounded-sm transition-all cursor-pointer backdrop-blur-sm">
                    <Info className="w-5 h-5" />
                    Details
                  </button>
                </Link>

                <button
                  onClick={() => toggleBookmark(movie.id)}
                  title={bookmarked ? "Remove from Watchlist" : "Add to Watchlist"}
                  className={cn(
                    "w-12 h-12 rounded-full border-2 flex items-center justify-center transition-all cursor-pointer",
                    bookmarked
                      ? "bg-white border-white text-black"
                      : "border-zinc-500 text-white hover:border-white"
                  )}
                >
                  {bookmarked ? <Check className="w-5 h-5" /> : <Plus className="w-5 h-5" />}
                </button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mute button */}
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-20 right-6 md:right-12 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer z-10"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Bottom fade into content */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0A0A0F] to-transparent pointer-events-none" />
      </section>

      {/* Video Player Modal */}
      <AnimatePresence>
        {playerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[200] bg-black flex items-center justify-center"
          >
            {/* Close */}
            <button
              onClick={() => setPlayerOpen(false)}
              className="absolute top-5 right-5 w-10 h-10 bg-zinc-900 hover:bg-zinc-800 border border-white/10 rounded-full flex items-center justify-center text-white cursor-pointer z-10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Video area */}
            <motion.div
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.95 }}
              className="w-full h-full relative flex items-center justify-center"
            >
              {/* Backdrop as fake video background */}
              <img
                src={movie.backdrop}
                alt={movie.title}
                className="absolute inset-0 w-full h-full object-cover opacity-30"
              />

              {/* Player UI overlay */}
              <div className="relative z-10 text-center space-y-6">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: 0.1 }}
                  className="w-24 h-24 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full flex items-center justify-center mx-auto cursor-pointer hover:bg-white/20 transition-colors"
                >
                  <Play className="w-10 h-10 text-white fill-white ml-1.5" />
                </motion.div>
                <div>
                  <h2 className="text-white text-2xl font-bold">{movie.title}</h2>
                  <p className="text-zinc-400 text-sm mt-1">{movie.year} · {movie.duration} · {movie.language}</p>
                </div>
                <p className="text-zinc-500 text-sm italic max-w-sm mx-auto">
                  Connect a video source to enable playback
                </p>
              </div>

              {/* Fake bottom player controls */}
              <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black to-transparent">
                <div className="max-w-3xl mx-auto space-y-3">
                  {/* Progress bar */}
                  <div className="w-full h-1 bg-zinc-700 rounded-full cursor-pointer group">
                    <div className="h-full w-[23%] bg-[#E50914] rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  </div>

                  {/* Controls row */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="text-white/70 hover:text-white cursor-pointer">
                        <Play className="w-5 h-5 fill-white" />
                      </button>
                      <button
                        onClick={() => setMuted(!muted)}
                        className="text-white/70 hover:text-white cursor-pointer"
                      >
                        {muted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                      </button>
                      <span className="text-white/70 text-xs">0:14 / {movie.duration}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-white/50 text-xs">HD</span>
                      <button className="text-white/70 hover:text-white cursor-pointer text-xs">⛶</button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
