import { useRef } from "react";
import { Link } from "react-router-dom";
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
              {/* Overlay on hover — shows detailed luxury specs instead of play button */}
              <div className="absolute inset-0 bg-black/85 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-4">
                <div className="space-y-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-[#E50914] text-[9px] font-black uppercase tracking-[0.2em] block">ATELIER</span>
                  <h4 className="text-white text-xs font-black uppercase font-serif tracking-wide leading-tight line-clamp-2">
                    {item.title}
                  </h4>
                  {item.subtitle && (
                    <p className="text-zinc-400 text-[11px] font-sans font-medium">
                      {item.subtitle}
                    </p>
                  )}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-[9px] text-zinc-500 font-mono">
                    <span>{item.year || "COLLECTION 2026"}</span>
                    <span>{item.rating || "LIMITED"}</span>
                  </div>
                </div>
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
