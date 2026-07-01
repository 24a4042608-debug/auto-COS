import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useDbData } from "@/hooks/useDbData";

export default function ProductsPage() {
  const { products, collections, loading } = useDbData();
  const [selectedCollection, setSelectedCollection] = useState<string>("all");
  const [selectedSize, setSelectedSize] = useState<string>("all");

  // Get all sizes dynamically
  const allSizes = Array.from(
    new Set(products.flatMap((p) => p.sizes))
  ).sort();

  // Filter products based on state
  const filteredProducts = products.filter((product) => {
    const matchesCollection =
      selectedCollection === "all" ||
      product.collectionSlug === selectedCollection;
    const matchesSize =
      selectedSize === "all" || product.sizes.includes(selectedSize);
    return matchesCollection && matchesSize;
  });

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-12 md:pb-24 space-y-16">
      
      {/* Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-gold block font-sans">
          The Catalogue
        </span>
        <h1 className="font-serif text-luxury-heading text-luxury-text-primary tracking-wide uppercase">
          Atelier Silhouettes
        </h1>
        <p className="text-sm text-luxury-text-secondary leading-relaxed font-sans max-w-xl">
          Browse our collection archives. Every silhouette represents an architectural draft, crafted in limited numbers from custom-spun natural fibers.
        </p>
      </div>

      {/* Filter Panels */}
      <div className="border-y border-[#050505] py-6 flex flex-col md:flex-row justify-between gap-6 items-baseline font-mono text-[10px]">
        
        {/* Collection Filter */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="text-luxury-text-secondary uppercase tracking-widest">
            [ CAMPAIGN ]:
          </span>
          <button
            onClick={() => setSelectedCollection("all")}
            className={`uppercase tracking-wider transition-colors duration-300 focus:outline-none cursor-pointer ${
              selectedCollection === "all"
                ? "text-[#E61919] font-bold"
                : "text-luxury-text-secondary hover:text-[#050505]"
            }`}
          >
            [ ALL ]
          </button>
          {collections.map((c) => (
            <button
              key={c.slug}
              onClick={() => setSelectedCollection(c.slug)}
              className={`uppercase tracking-wider transition-colors duration-300 focus:outline-none cursor-pointer ${
                selectedCollection === c.slug
                  ? "text-[#E61919] font-bold"
                  : "text-luxury-text-secondary hover:text-[#050505]"
              }`}
            >
              [ {c.name.split(" ")[0]} ]
            </button>
          ))}
        </div>

        {/* Size Filter */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
          <span className="text-luxury-text-secondary uppercase tracking-widest">
            [ SIZE ]:
          </span>
          <button
            onClick={() => setSelectedSize("all")}
            className={`uppercase tracking-wider transition-colors duration-300 focus:outline-none cursor-pointer ${
              selectedSize === "all"
                ? "text-[#E61919] font-bold"
                : "text-luxury-text-secondary hover:text-[#050505]"
            }`}
          >
            [ ALL ]
          </button>
          {allSizes.map((size) => (
            <button
              key={size}
              onClick={() => setSelectedSize(size)}
              className={`uppercase tracking-wider transition-colors duration-300 focus:outline-none cursor-pointer ${
                selectedSize === size
                  ? "text-[#E61919] font-bold"
                  : "text-luxury-text-secondary hover:text-[#050505]"
              }`}
            >
              [ {size} ]
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
                    className="block relative aspect-[3/4] overflow-hidden mb-6 bg-white border border-[#050505]"
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
                    <h3 className="font-sans font-bold text-base text-luxury-text-primary tracking-tight uppercase group-hover:text-[#E61919] transition-colors duration-300">
                      <Link href={`/product/${product.slug}`}>{product.name}</Link>
                    </h3>
                    <span className="text-xs text-luxury-text-secondary font-mono">
                      [ {product.price} ]
                    </span>
                  </div>

                  <span className="text-[9px] text-luxury-text-secondary tracking-widest mt-1.5 font-mono">
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
