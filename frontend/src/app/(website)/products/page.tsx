"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { LUXURY_PRODUCTS, LUXURY_COLLECTIONS } from "@/constants/mockData";

export default function ProductsPage() {
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");

  // Get all sizes dynamically
  const allSizes = Array.from(
    new Set(LUXURY_PRODUCTS.flatMap((p) => p.sizes))
  ).sort();

  // Filter products based on state
  const filteredProducts = LUXURY_PRODUCTS.filter((product) => {
    const matchesCollection =
      selectedCollection === "all" ||
      product.collectionSlug === selectedCollection;
    const matchesSize =
      selectedSize === "all" || product.sizes.includes(selectedSize);
    return matchesCollection && matchesSize;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 py-12 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-gold block font-sans">
          The Catalogue
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-luxury-text-primary tracking-wide leading-none uppercase">
          Atelier Silhouettes
        </h1>
        <p className="text-sm text-luxury-text-secondary leading-relaxed font-sans max-w-xl">
          Browse our collection archives. Every silhouette represents an architectural draft, crafted in limited numbers from custom-spun natural fibers.
        </p>
      </div>

      {/* Filter Panels */}
      <div className="border-y border-luxury-border py-6 flex flex-col md:flex-row justify-between gap-6 items-baseline font-sans text-xs">
        
        {/* Collection Filter */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="text-luxury-text-secondary uppercase tracking-widest text-[10px]">
            Campaign:
          </span>
          <button
            onClick={() => setSelectedCollection("all")}
            className={`uppercase tracking-wider pb-1 transition-all duration-300 focus:outline-none ${
              selectedCollection === "all"
                ? "border-b border-luxury-text-primary text-luxury-text-primary font-medium"
                : "text-luxury-text-secondary hover:text-luxury-text-primary"
            }`}
          >
            All
          </button>
          {LUXURY_COLLECTIONS.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelectedCollection(c.slug)}
              className={`uppercase tracking-wider pb-1 transition-all duration-300 focus:outline-none ${
                selectedCollection === c.slug
                  ? "border-b border-luxury-text-primary text-luxury-text-primary font-medium"
                  : "text-luxury-text-secondary hover:text-luxury-text-primary"
              }`}
            >
              {c.name.split(" ")[0]} {/* Shortened names for space */}
            </button>
          ))}
        </div>

        {/* Size Filter */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <span className="text-luxury-text-secondary uppercase tracking-widest text-[10px]">
            Sizes:
          </span>
          <button
            onClick={() => setSelectedSize("all")}
            className={`uppercase tracking-wider pb-1 transition-all duration-300 focus:outline-none ${
              selectedSize === "all"
                ? "border-b border-luxury-text-primary text-luxury-text-primary font-medium"
                : "text-luxury-text-secondary hover:text-luxury-text-primary"
            }`}
          >
            All
          </button>
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`uppercase tracking-wider pb-1 transition-all duration-300 focus:outline-none ${
                selectedSize === size
                  ? "border-b border-luxury-text-primary text-luxury-text-primary font-medium"
                  : "text-luxury-text-secondary hover:text-luxury-text-primary"
              }`}
            >
              {size}
            </button>
          ))}
        </div>

      </div>

      {/* Grid of Products */}
      <div>
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 font-sans text-sm text-luxury-text-secondary">
            No matching shapes are currently in active archive.
          </div>
        ) : (
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12"
          >
            <AnimatePresence mode="popLayout">
              {filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.4 }}
                  className="group flex flex-col"
                >
                  <Link
                    href={`/product/${product.slug}`}
                    className="block relative aspect-[3/4] overflow-hidden mb-6 bg-white border border-luxury-border/60 rounded-sm"
                  >
                    <img
                      src={product.images[0]}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    {product.images[1] && (
                      <img
                        src={product.images[1]}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-700"
                      />
                    )}
                  </Link>

                  <div className="flex justify-between items-baseline gap-2">
                    <h3 className="font-serif text-lg text-luxury-text-primary tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                      <Link href={`/product/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <span className="text-xs text-luxury-text-secondary font-sans">
                      {product.price}
                    </span>
                  </div>

                  <span className="text-[10px] text-luxury-text-secondary tracking-wider mt-1.5 font-sans">
                    {product.fabric.split(".")[0]}
                  </span>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

    </div>
  );
}
