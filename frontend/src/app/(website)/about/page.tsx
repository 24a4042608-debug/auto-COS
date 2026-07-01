"use client";

import { motion } from "framer-motion";
import { BRAND_TIMELINE } from "@/constants/mockData";
import ParallaxImage from "@/components/ui/luxury/ParallaxImage";

export default function AboutPage() {
  return (
    <div className="space-y-24 md:space-y-36 pb-24 md:pb-36 font-sans">
      
      {/* 1. Manifesto Section */}
      <section className="max-w-4xl mx-auto px-6 md:px-12 pt-12 text-center space-y-8">
        <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-gold block">
          Manifesto
        </span>
        <h1 className="font-serif text-4xl md:text-6xl text-luxury-text-primary tracking-wide leading-none uppercase">
          The Architecture of Cloth
        </h1>
        <p className="font-serif italic text-lg md:text-2xl text-luxury-text-secondary leading-relaxed max-w-2xl mx-auto pt-4">
          &ldquo;We do not dress the body. We create spatial frames that float around the form, giving volume, air, and structural balance to movement.&rdquo;
        </p>
      </section>

      {/* 2. Large Campaign Image */}
      <section className="relative h-[50vh] md:h-[70vh] w-full overflow-hidden border-y border-luxury-border">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1600"
          alt="Atelier workshop draping detail"
          className="rounded-none"
        />
        <div className="absolute inset-0 bg-black/5" />
      </section>

      {/* 3. Core Pillars Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
        <div className="space-y-4">
          <span className="text-2xl font-serif text-luxury-gold">01.</span>
          <h3 className="font-serif text-xl tracking-wide text-luxury-text-primary uppercase border-b border-luxury-border pb-2">
            Heritage Draping
          </h3>
          <p className="text-xs text-luxury-text-secondary leading-relaxed">
            All drafting happens in our Marais, Paris workshop, where silhouettes are draped directly on customized forms. Traditional floating canvas linings ensure jackets mold organically over time.
          </p>
        </div>

        <div className="space-y-4">
          <span className="text-2xl font-serif text-luxury-gold">02.</span>
          <h3 className="font-serif text-xl tracking-wide text-luxury-text-primary uppercase border-b border-luxury-border pb-2">
            Zero-Dye Textiles
          </h3>
          <p className="text-xs text-luxury-text-secondary leading-relaxed">
            To preserve water systems and show raw organic beauty, our core yarns (cashmere, cotton, wool) are completely undyed. Variations in shade represent nature&apos;s shifting regional signature.
          </p>
        </div>

        <div className="space-y-4">
          <span className="text-2xl font-serif text-luxury-gold">03.</span>
          <h3 className="font-serif text-xl tracking-wide text-luxury-text-primary uppercase border-b border-luxury-border pb-2">
            Slow Scale Craft
          </h3>
          <p className="text-xs text-luxury-text-secondary leading-relaxed">
            We reject seasonal commercial pressure. Every pattern is archived in limited quantities of 40 units per shape, preventing garment redundancy and honoring tailors&apos; focus.
          </p>
        </div>
      </section>

      {/* 4. Timeline Section */}
      <section className="max-w-5xl mx-auto px-6 md:px-12 space-y-16">
        <div className="text-center space-y-2">
          <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold block">
            Our Journey
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-text-primary tracking-wide uppercase">
            Timeline of Form
          </h2>
        </div>

        <div className="relative border-l border-luxury-border pl-8 md:pl-16 ml-4 md:ml-12 space-y-16 py-4">
          {BRAND_TIMELINE.map((item, index) => (
            <div key={item.year} className="relative group">
              {/* Gold dot anchor */}
              <div className="absolute -left-[41px] md:-left-[73px] top-1.5 w-6 h-6 rounded-full bg-white border border-luxury-gold flex items-center justify-center transition-all duration-500 group-hover:bg-luxury-gold">
                <span className="w-2.5 h-2.5 rounded-full bg-luxury-gold group-hover:bg-white transition-all duration-500" />
              </div>

              <div className="space-y-2">
                <span className="font-serif text-2xl md:text-3xl text-luxury-gold block font-medium">
                  {item.year}
                </span>
                <h3 className="font-serif text-lg tracking-wide text-luxury-text-primary uppercase">
                  {item.title}
                </h3>
                <p className="text-xs text-luxury-text-secondary leading-relaxed max-w-xl">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}
