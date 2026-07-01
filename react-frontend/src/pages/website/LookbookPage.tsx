import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { LOOKBOOK_ITEMS, LUXURY_PRODUCTS } from "@/constants/mockData";
import ParallaxImage from "@/components/ui/luxury/ParallaxImage";

export default function LookbookPage() {
  return (
    <div className="space-y-36 pt-36 md:pt-44 pb-24 md:pb-36 font-sans">
      
      {/* Editorial Header */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 space-y-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-gold block">
          Campaign Dailies
        </span>
        <h1 className="font-serif text-luxury-heading text-luxury-text-primary tracking-wide uppercase">
          Storytelling Lookbook
        </h1>
        <p className="text-sm text-luxury-text-secondary leading-relaxed max-w-xl">
          Visual essays documenting our structural garments in situ. Explore the intersection of Brutalist geometry, light, and natural drape.
        </p>
      </section>

      {/* Lookbook items list */}
      <div className="space-y-48">
        {LOOKBOOK_ITEMS.map((item, index) => {
          // Resolve product objects used in this look
          const resolvedProducts = LUXURY_PRODUCTS.filter((p) =>
            item.products.includes(p.slug)
          );

          // Alternating side-by-side structures or fullscreen centers
          const isCenter = item.align === "center";
          const isLeft = item.align === "left";

          return (
            <section key={item.id} className="w-full">
              {isCenter ? (
                /* Fullscreen style */
                <div className="space-y-8">
                  <div className="relative h-[80vh] w-full overflow-hidden">
                    <ParallaxImage src={item.image} alt={item.title} className="rounded-none h-full w-full" />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>
                  
                  <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col md:flex-row justify-between items-baseline gap-6">
                    <div className="space-y-2">
                      <span className="text-[10px] text-luxury-gold uppercase tracking-widest block">
                        {item.subtitle}
                      </span>
                      <h2 className="font-serif text-2xl md:text-3xl text-luxury-text-primary tracking-wide">
                        {item.title}
                      </h2>
                      {item.quote && (
                        <p className="font-serif italic text-sm text-luxury-text-secondary leading-relaxed max-w-lg mt-2">
                          &ldquo;{item.quote}&rdquo;
                        </p>
                      )}
                    </div>

                    <div className="space-y-3 min-w-[200px]">
                      <span className="text-[9px] uppercase tracking-widest text-luxury-text-secondary block">
                        Coordinates Shown:
                      </span>
                      <ul className="space-y-1.5">
                        {resolvedProducts.map((p) => (
                          <li key={p.id}>
                            <Link
                              href={`/product/${p.slug}`}
                              className="group inline-flex items-center text-xs text-luxury-text-primary hover:text-luxury-gold transition-colors focus:outline-none"
                            >
                              {p.name}
                              <ArrowRight className="w-3.5 h-3.5 ml-1 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all stroke-[1.5]" />
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ) : (
                /* Split layouts */
                <div className="max-w-7xl mx-auto px-6 md:px-12">
                  <div
                    className={`flex flex-col lg:flex-row gap-12 lg:gap-24 items-stretch ${
                      isLeft ? "" : "lg:flex-row-reverse"
                    }`}
                  >
                    {/* Image Block */}
                    <div className="w-full lg:w-3/5 aspect-[3/4] md:aspect-[16/10] lg:aspect-[4/3] relative overflow-hidden rounded-sm border border-luxury-border/30">
                      <ParallaxImage src={item.image} alt={item.title} />
                    </div>

                    {/* Content Block */}
                    <div className="w-full lg:w-2/5 flex flex-col justify-center space-y-6">
                      <div className="space-y-2">
                        <span className="text-[10px] text-luxury-gold uppercase tracking-widest block">
                          {item.subtitle}
                        </span>
                        <h2 className="font-serif text-3xl text-luxury-text-primary tracking-wide">
                          {item.title}
                        </h2>
                      </div>
                      
                      {item.quote && (
                        <blockquote className="font-serif italic text-sm text-luxury-text-secondary border-l border-luxury-gold/50 pl-4 py-1 leading-relaxed">
                          &ldquo;{item.quote}&rdquo;
                        </blockquote>
                      )}

                      <p className="text-xs text-luxury-text-secondary leading-relaxed">
                        A dynamic dialog between raw textile composition and architectural construction. Tailored seam structures are left soft to preserve shape memory.
                      </p>

                      <div className="border-t border-luxury-border/80 pt-6 space-y-3">
                        <span className="text-[9px] uppercase tracking-widest text-luxury-text-secondary block">
                          Featured in Campaign:
                        </span>
                        <div className="space-y-2">
                          {resolvedProducts.map((p) => (
                            <Link
                              key={p.id}
                              href={`/product/${p.slug}`}
                              className="group flex items-center justify-between text-xs text-luxury-text-primary hover:text-luxury-gold transition-colors focus:outline-none py-1"
                            >
                              <span>{p.name}</span>
                              <span className="text-[10px] text-luxury-text-secondary group-hover:text-luxury-gold transition-colors">
                                View Details &rarr;
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </section>
          );
        })}
      </div>

    </div>
  );
}
