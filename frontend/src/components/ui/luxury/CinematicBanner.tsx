"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Play, Info, X, Volume2, VolumeX } from "lucide-react";

interface CinematicBannerProps {
  title: string;
  subtitle?: string;
  description: string;
  image: string;
  href: string;
  year?: string;
  genre?: string[];
  rating?: string;
}

export default function CinematicBanner({
  title,
  subtitle,
  description,
  image,
  href,
  year = "2026",
  genre = ["Fashion", "Cinematic", "Atelier"],
  rating = "ATL-17",
}: CinematicBannerProps) {
  const [trailerOpen, setTrailerOpen] = useState(false);
  const [muted, setMuted] = useState(true);

  return (
    <>
      {/* Hero Banner */}
      <section className="relative w-full h-[92vh] min-h-[600px] overflow-hidden">
        
        {/* Background Image with Ken Burns subtle effect */}
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 8, ease: "easeOut" }}
        >
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Multi-layer gradient overlays for cinematic depth */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#08080C] via-transparent to-black/30" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-transparent" />

        {/* Content */}
        <div className="relative z-10 h-full flex items-center">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-12 w-full">
            <div className="max-w-2xl">
              
              {/* Meta row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="flex items-center gap-3 mb-5"
              >
                <span className="text-[#E50914] text-xs font-bold tracking-widest uppercase">
                  ▶ Now Showing
                </span>
                <span className="w-1 h-1 rounded-full bg-zinc-500" />
                <span className="text-zinc-400 text-xs">{year}</span>
                <span className="w-1 h-1 rounded-full bg-zinc-500" />
                <span className="border border-zinc-600 text-zinc-400 text-[10px] px-1.5 py-0.5 rounded-sm font-mono">
                  {rating}
                </span>
              </motion.div>

              {/* Title */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-white font-black text-4xl md:text-6xl lg:text-7xl leading-none tracking-tight mb-4"
              >
                {title}
              </motion.h1>

              {subtitle && (
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  className="text-zinc-300 text-sm md:text-base italic mb-3"
                >
                  {subtitle}
                </motion.p>
              )}

              {/* Genre tags */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.45 }}
                className="flex items-center gap-2 mb-5"
              >
                {genre.map((g, i) => (
                  <span key={g} className="flex items-center gap-2">
                    <span className="text-zinc-400 text-xs">{g}</span>
                    {i < genre.length - 1 && <span className="text-zinc-700 text-xs">•</span>}
                  </span>
                ))}
              </motion.div>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.5 }}
                className="text-zinc-300 text-sm md:text-base leading-relaxed max-w-lg mb-8 line-clamp-3"
              >
                {description}
              </motion.p>

              {/* Action Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex items-center gap-4 flex-wrap"
              >
                {/* Play button */}
                <button
                  onClick={() => setTrailerOpen(true)}
                  className="flex items-center gap-3 bg-white hover:bg-zinc-200 text-black px-7 py-3.5 rounded-sm font-bold text-sm transition-all duration-200 cursor-pointer hover:shadow-xl active:scale-[0.98]"
                >
                  <Play className="w-5 h-5 fill-black" />
                  Play Trailer
                </button>

                {/* Info button */}
                <Link href={href}>
                  <button className="flex items-center gap-3 bg-zinc-700/70 hover:bg-zinc-600/80 text-white px-7 py-3.5 rounded-sm font-semibold text-sm transition-all duration-200 cursor-pointer backdrop-blur-sm">
                    <Info className="w-5 h-5" />
                    More Info
                  </button>
                </Link>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Mute toggle */}
        <button
          onClick={() => setMuted(!muted)}
          className="absolute bottom-16 right-8 w-10 h-10 border border-white/30 rounded-full flex items-center justify-center text-white hover:bg-white/10 transition-all cursor-pointer z-10"
        >
          {muted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
        </button>

        {/* Bottom fade into page */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#08080C] to-transparent" />
      </section>

      {/* Trailer Modal */}
      <AnimatePresence>
        {trailerOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 md:p-12"
            onClick={() => setTrailerOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="relative w-full max-w-5xl aspect-video bg-zinc-900 rounded-sm overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Fake video player — in real use replace with an actual <video> or YouTube embed */}
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <img
                  src={image}
                  alt={title}
                  className="absolute inset-0 w-full h-full object-cover opacity-40"
                />
                <div className="relative z-10 text-center space-y-3">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center mx-auto border border-white/20">
                    <Play className="w-8 h-8 text-white fill-white ml-1" />
                  </div>
                  <p className="text-white/70 text-sm">{title} — Campaign Film</p>
                  <p className="text-zinc-500 text-xs">Trailer preview</p>
                </div>
              </div>

              {/* Close button */}
              <button
                onClick={() => setTrailerOpen(false)}
                className="absolute top-4 right-4 w-9 h-9 bg-black/60 hover:bg-black/80 text-white rounded-full flex items-center justify-center transition-colors cursor-pointer z-20"
              >
                <X className="w-4 h-4" />
              </button>

              {/* Bottom info bar */}
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black to-transparent z-10">
                <p className="text-white font-bold text-lg">{title}</p>
                <p className="text-zinc-400 text-sm">{year} · {genre.join(" · ")}</p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
