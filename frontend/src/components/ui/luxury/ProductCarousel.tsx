"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Product } from "@/constants/mockData";
import { cn } from "@/lib/utils";

interface ProductCarouselProps {
  products: Product[];
}

export default function ProductCarousel({ products }: ProductCarouselProps) {
  const [current, setCurrent] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);
  const autoPlayTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!isAutoPlay || products.length === 0) return;

    autoPlayTimer.current = setInterval(() => {
      setCurrent((prev) => (prev + 1) % products.length);
    }, 6000);

    return () => {
      if (autoPlayTimer.current) clearInterval(autoPlayTimer.current);
    };
  }, [isAutoPlay, products.length]);

  const goToPrevious = () => {
    setCurrent((prev) => (prev - 1 + products.length) % products.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrent((prev) => (prev + 1) % products.length);
    setIsAutoPlay(false);
  };

  if (products.length === 0) return null;

  return (
    <div className="w-full bg-[#FAFAFA] py-12 px-4 relative overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Carousel Container */}
        <div className="relative flex items-center justify-center min-h-[420px] md:min-h-[500px]">
          
          {/* Left Arrow Button */}
          <button
            onClick={goToPrevious}
            className="absolute left-0 lg:-left-6 z-20 p-3 bg-white hover:bg-luxury-gold hover:text-white text-luxury-text-primary border border-luxury-border shadow-sm rounded-none transition-all duration-300 focus:outline-none cursor-pointer"
            aria-label="Previous Campaign Silhouette"
          >
            <ChevronLeft className="w-5 h-5 stroke-[1.5]" />
          </button>

          {/* Sliding Cards Deck */}
          <div className="relative flex items-center justify-center w-full max-w-4xl h-[420px] md:h-[480px]">
            {products.map((product, index) => {
              const offset = (index - current + products.length) % products.length;
              const isCenter = offset === 0;
              const isAdjacentLeft = offset === products.length - 1;
              const isAdjacentRight = offset === 1;

              // Hide other cards to prevent unnecessary DOM clutter and layout shifts
              const isVisible = isCenter || isAdjacentLeft || isAdjacentRight;

              if (!isVisible) return null;

              return (
                <motion.div
                  key={product.id}
                  className={cn(
                    "absolute top-0 flex-shrink-0 transition-all duration-500 rounded-none",
                    isCenter
                      ? "z-10 w-[240px] h-[340px] md:w-[320px] md:h-[420px] cursor-pointer"
                      : "w-[180px] h-[260px] md:w-[220px] md:h-[300px] opacity-40 pointer-events-none"
                  )}
                  style={{
                    x: isCenter
                      ? "0%"
                      : isAdjacentLeft
                      ? "-75%"
                      : "75%",
                    y: isCenter ? "0%" : "20%",
                    scale: isCenter ? 1 : 0.88,
                  }}
                  layout
                >
                  <div className="relative w-full h-full border border-luxury-border/60 bg-white group shadow-sm overflow-hidden flex flex-col justify-end">
                    
                    {/* Next.js Image Element */}
                    <div className="absolute inset-0 z-0">
                      <Image
                        src={product.images[0]}
                        alt={product.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 33vw"
                        className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
                    </div>

                    {/* Meta/Action Overlay (Visible only when Center & Active) */}
                    {isCenter && (
                      <div className="absolute bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm p-4 border-t border-luxury-border/40 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500 z-10 flex flex-col gap-1.5">
                        <div className="flex justify-between items-baseline">
                          <span className="font-serif text-sm text-luxury-text-primary tracking-wide">
                            {product.name}
                          </span>
                          <span className="text-[10px] text-luxury-gold tracking-widest uppercase font-semibold">
                            {product.price}
                          </span>
                        </div>
                        <span className="text-[9px] text-luxury-text-secondary uppercase tracking-widest font-sans">
                          {product.fabric}
                        </span>
                        
                        <Link href={`/product/${product.slug}`} className="mt-2 block">
                          <span className="inline-block text-[9px] uppercase tracking-[0.2em] font-sans font-medium text-luxury-text-primary hover:text-luxury-gold transition-colors duration-300">
                            Explore Silhouette &rarr;
                          </span>
                        </Link>
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Right Arrow Button */}
          <button
            onClick={goToNext}
            className="absolute right-0 lg:-right-6 z-20 p-3 bg-white hover:bg-luxury-gold hover:text-white text-luxury-text-primary border border-luxury-border shadow-sm rounded-none transition-all duration-300 focus:outline-none cursor-pointer"
            aria-label="Next Campaign Silhouette"
          >
            <ChevronRight className="w-5 h-5 stroke-[1.5]" />
          </button>
        </div>

        {/* Carousel Indicators */}
        <div className="flex justify-center items-center gap-3.5 mt-8">
          {products.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setCurrent(index);
                setIsAutoPlay(false);
              }}
              className={cn(
                "transition-all duration-300 focus:outline-none cursor-pointer",
                index === current
                  ? "w-2.5 h-2.5 bg-luxury-gold"
                  : "w-1.5 h-1.5 bg-luxury-border hover:bg-luxury-gold/50"
              )}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
