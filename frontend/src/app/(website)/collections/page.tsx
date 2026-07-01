"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useDbData } from "@/hooks/useDbData";
import ParallaxImage from "@/components/ui/luxury/ParallaxImage";

export default function CollectionsPage() {
  const { collections } = useDbData();
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-12 md:pb-24 space-y-24 md:space-y-36">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <span className="font-mono text-[9px] tracking-[0.2em] text-[#E61919] uppercase block">
          [ SECTION 01 // ARCHIVES ]
        </span>
        <h1 className="font-sans font-black text-3xl md:text-5xl uppercase tracking-tighter text-[#050505]">
          Curated Collections
        </h1>
        <p className="text-sm text-luxury-text-secondary leading-relaxed font-sans max-w-xl">
          Discover our design stories. Each collection represents an exploration of garment structure, fiber origins, and seasonal geometry.
        </p>
      </div>

      {/* Collections list with alternating layouts */}
      <div className="space-y-32">
        {collections.map((collection, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={collection.id}
              className={`flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20 ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Campaign Image (Large) */}
              <div className="w-full lg:w-3/5 aspect-[3/4] md:aspect-[16/10] lg:aspect-[4/3] relative overflow-hidden group border border-[#050505]">
                <Link href={`/collection/${collection.slug}`}>
                  <ParallaxImage src={collection.coverImage} alt={collection.name} />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                </Link>
              </div>

              {/* Campaign details */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <span className="font-mono text-[9px] tracking-widest text-[#E61919] uppercase block">
                    [ {collection.season} // {collection.year} ]
                  </span>
                  <h2 className="font-sans font-extrabold text-2xl uppercase tracking-tight text-luxury-text-primary hover:text-[#E61919] transition-colors">
                    <Link href={`/collection/${collection.slug}`}>{collection.name}</Link>
                  </h2>
                </div>

                <p className="text-xs text-luxury-text-secondary leading-relaxed font-sans">
                  {collection.description}
                </p>

                <div className="pt-4">
                  <Link href={`/collection/${collection.slug}`}>
                    <button className="border border-[#050505] hover:bg-[#050505] hover:text-[#F4F4F0] text-luxury-text-primary px-8 py-4 text-xs font-mono uppercase tracking-[0.2em] transition-all duration-300 rounded-none cursor-pointer">
                      [ Explore Collection ]
                    </button>
                  </Link>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
