"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { LUXURY_COLLECTIONS } from "@/constants/mockData";
import ParallaxImage from "@/components/ui/luxury/ParallaxImage";

export default function CollectionsPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-28 md:pt-36 pb-12 md:pb-24 space-y-24 md:space-y-36">
      
      {/* Page Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-gold block font-sans">
          The Campaigns
        </span>
        <h1 className="font-serif text-luxury-heading text-luxury-text-primary tracking-wide uppercase">
          Curated Collections
        </h1>
        <p className="text-sm text-luxury-text-secondary leading-relaxed font-sans max-w-xl">
          Discover our design stories. Each collection represents an exploration of garment structure, fiber origins, and seasonal geometry.
        </p>
      </div>

      {/* Collections list with alternating layouts */}
      <div className="space-y-32">
        {LUXURY_COLLECTIONS.map((collection, index) => {
          const isEven = index % 2 === 0;
          return (
            <div
              key={collection.id}
              className={`flex flex-col lg:flex-row items-stretch gap-12 lg:gap-20 ${
                isEven ? "" : "lg:flex-row-reverse"
              }`}
            >
              {/* Campaign Image (Large) */}
              <div className="w-full lg:w-3/5 aspect-[3/4] md:aspect-[16/10] lg:aspect-[4/3] relative overflow-hidden rounded-sm group border border-luxury-border/30">
                <Link href={`/collection/${collection.slug}`}>
                  <ParallaxImage src={collection.coverImage} alt={collection.name} />
                  <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
                </Link>
              </div>

              {/* Campaign details */}
              <div className="w-full lg:w-2/5 flex flex-col justify-center space-y-6">
                <div className="space-y-2">
                  <span className="text-[10px] tracking-widest text-luxury-gold uppercase block font-sans">
                    {collection.season} &bull; {collection.year}
                  </span>
                  <h2 className="font-serif text-luxury-subheading text-luxury-text-primary tracking-wide hover:text-luxury-gold transition-colors">
                    <Link href={`/collection/${collection.slug}`}>{collection.name}</Link>
                  </h2>
                </div>

                <p className="text-xs text-luxury-text-secondary leading-relaxed font-sans">
                  {collection.description}
                </p>

                <div className="pt-4">
                  <Link href={`/collection/${collection.slug}`}>
                    <button className="border border-luxury-text-primary hover:border-luxury-gold hover:text-luxury-gold text-luxury-text-primary px-8 py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 font-sans">
                      Explore Collection
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
