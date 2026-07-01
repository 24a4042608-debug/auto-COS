"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Play, Info } from "lucide-react";

interface StreamingCard {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  href: string;
  tag?: string;
  year?: string;
  rating?: string;
}

interface StreamingRowProps {
  title: string;
  sectionLabel?: string;
  items: StreamingCard[];
  viewAllHref?: string;
}

export default function StreamingRow({ title, sectionLabel, items, viewAllHref }: StreamingRowProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (dir: "left" | "right") => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.75;
    scrollRef.current.scrollBy({ left: dir === "right" ? amount : -amount, behavior: "smooth" });
  };

  return (
    <section className="relative">
      {/* Section header */}
      <div className="flex items-end justify-between mb-4 px-6 md:px-12">
        <div>
          {sectionLabel && (
            <span className="text-[#E50914] text-xs font-semibold tracking-widest uppercase block mb-1">
              {sectionLabel}
            </span>
          )}
          <h2 className="text-white text-xl md:text-2xl font-bold tracking-tight">{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          {viewAllHref && (
            <Link
              href={viewAllHref}
              className="text-zinc-400 text-xs font-medium hover:text-white transition-colors"
            >
              View All
            </Link>
          )}
          {/* Scroll buttons */}
          <div className="hidden md:flex items-center gap-1">
            <button
              onClick={() => scroll("left")}
              className="w-8 h-8 bg-zinc-800/80 hover:bg-zinc-700 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer rounded-sm"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => scroll("right")}
              className="w-8 h-8 bg-zinc-800/80 hover:bg-zinc-700 border border-white/10 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer rounded-sm"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Horizontal scrolling cards */}
      <div
        ref={scrollRef}
        className="horizontal-scroll flex gap-3 px-6 md:px-12 pb-4"
      >
        {items.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.05 }}
            className="flex-shrink-0 w-48 md:w-56 group relative"
          >
            {/* Card Image */}
            <Link href={item.href} className="block relative aspect-[2/3] overflow-hidden rounded-sm bg-zinc-900">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                <div className="w-12 h-12 bg-white/90 rounded-full flex items-center justify-center hover:bg-white transition-colors">
                  <Play className="w-5 h-5 text-black fill-black ml-0.5" />
                </div>
              </div>

              {/* Tag badge */}
              {item.tag && (
                <div className="absolute top-2 left-2 bg-[#E50914] text-white text-[10px] font-bold px-2 py-0.5 uppercase tracking-wider rounded-sm">
                  {item.tag}
                </div>
              )}

              {/* Bottom gradient info bar */}
              <div className="absolute bottom-0 left-0 right-0 movie-card-overlay p-3 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-white text-xs font-semibold line-clamp-1">{item.title}</p>
                {item.year && (
                  <p className="text-zinc-400 text-[10px] mt-0.5">{item.year}</p>
                )}
              </div>
            </Link>

            {/* Card info below */}
            <div className="mt-2 space-y-0.5">
              <Link href={item.href}>
                <h3 className="text-zinc-200 text-sm font-medium truncate hover:text-white transition-colors cursor-pointer">
                  {item.title}
                </h3>
              </Link>
              {item.subtitle && (
                <p className="text-zinc-600 text-xs truncate">{item.subtitle}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
