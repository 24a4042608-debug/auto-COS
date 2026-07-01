"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight, ArrowUpRight } from "lucide-react";
import {
  LUXURY_COLLECTIONS,
  LUXURY_PRODUCTS,
  LOOKBOOK_ITEMS,
  JOURNAL_ARTICLES,
} from "@/constants/mockData";
import ParallaxImage from "@/components/ui/luxury/ParallaxImage";
import TextReveal from "@/components/ui/luxury/TextReveal";
import MagneticButton from "@/components/ui/luxury/MagneticButton";

export default function HomePage() {
  const newArrivals = LUXURY_PRODUCTS.filter((p) => p.isNewArrival);
  const editorsPicks = LUXURY_PRODUCTS.filter((p) => p.isEditorsPick);

  // Fade-in animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.215, 0.61, 0.355, 1] as const },
    },
  };

  const stagger = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  return (
    <div className="space-y-32 md:space-y-48">
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] md:h-screen -mt-24 md:-mt-28 w-full overflow-hidden flex items-center justify-center">
        {/* Fullscreen Background Image */}
        <div className="absolute inset-0 z-0">
          <ParallaxImage
            src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600"
            alt="Autumn Winter Campaign Hero"
            className="w-full h-full rounded-none"
            priority
          />
          {/* Subtle dark overlay for readability */}
          <div className="absolute inset-0 bg-black/25" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 w-full text-white flex flex-col items-start pt-20">
          <span className="text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 text-white/90">
            A W H O L E   N E W   S I L H O U E T T E
          </span>
          
          <TextReveal
            text="LA SILHOUETTE ET LE VIDE"
            tag="h1"
            className="font-serif text-5xl md:text-8xl tracking-wide max-w-4xl uppercase leading-[1.05]"
            delay={0.2}
          />
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="font-sans text-sm md:text-base text-white/80 max-w-md mt-6 leading-relaxed"
          >
            Our Autumn/Winter collection explores geometric voids and sculptural drapings that drape the body in high-fashion architecture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="mt-8 flex flex-col sm:flex-row gap-4"
          >
            <Link href="/collection/la-silhouette-et-le-vide">
              <MagneticButton className="bg-white text-luxury-text-primary hover:bg-luxury-gold hover:text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors duration-300 font-sans rounded-none font-medium">
                View Collection
              </MagneticButton>
            </Link>
            <Link href="/products">
              <button className="border border-white/40 hover:border-white hover:bg-white/10 text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] transition-all duration-300 font-sans rounded-none">
                Browse Atelier
              </button>
            </Link>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2">
          <span className="text-[8px] tracking-[0.3em] uppercase text-white/60">
            Scroll to view
          </span>
          <div className="w-5 h-8 border border-white/30 rounded-full flex justify-center p-1">
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
              className="w-1.5 h-1.5 bg-luxury-gold rounded-full"
            />
          </div>
        </div>
      </section>

      {/* 2. FEATURED COLLECTION SECTION */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-text-secondary block mb-2">
              Curated Campaigns
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-text-primary tracking-wide">
              The Seasonal Trilogy
            </h2>
          </div>
          <Link
            href="/collections"
            className="group flex items-center text-xs uppercase tracking-widest text-luxury-text-primary hover:text-luxury-gold transition-colors"
          >
            All Collections
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-10%" }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12"
        >
          {LUXURY_COLLECTIONS.map((c, index) => (
            <motion.div key={c.id} variants={fadeIn} className="group flex flex-col">
              <Link href={`/collection/${c.slug}`} className="block relative aspect-[3/4] overflow-hidden mb-6">
                <ParallaxImage src={c.coverImage} alt={c.name} />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors duration-500" />
              </Link>
              <span className="text-[9px] uppercase tracking-widest text-luxury-text-secondary mb-1 block">
                {c.season} &bull; {c.year}
              </span>
              <h3 className="font-serif text-xl text-luxury-text-primary tracking-wide mb-2 group-hover:text-luxury-gold transition-colors duration-300">
                <Link href={`/collection/${c.slug}`}>{c.name}</Link>
              </h3>
              <p className="text-xs text-luxury-text-secondary leading-relaxed font-sans max-w-xs mb-4">
                {c.tagline}
              </p>
              <Link
                href={`/collection/${c.slug}`}
                className="text-[10px] uppercase tracking-wider text-luxury-text-primary group-hover:text-luxury-gold font-sans font-medium mt-auto"
              >
                View Campaign &rarr;
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 3. CAMPAIGN BANNER (FULL WIDTH) */}
      <section className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden">
        <ParallaxImage
          src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600"
          alt="Organic Minimalism Banner"
          className="w-full h-full rounded-none"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 flex items-center justify-center text-center p-6">
          <div className="max-w-xl text-white">
            <span className="text-[10px] tracking-[0.4em] uppercase text-white/80 block mb-4">
              Sustainability Manifesto
            </span>
            <h3 className="font-serif text-3xl md:text-5xl tracking-wide uppercase leading-tight mb-6">
              Organic Minimalism
            </h3>
            <p className="text-sm font-sans leading-relaxed text-white/90 mb-8">
              A commitment to Zero Dye and raw Mongolian cashmere. Every piece presents the uncolored, authentic narrative of nature.
            </p>
            <Link href="/collection/organic-minimalism">
              <button className="bg-white text-luxury-text-primary hover:bg-luxury-gold hover:text-white px-8 py-3.5 text-xs uppercase tracking-[0.2em] transition-colors duration-300 font-sans">
                Read the Story
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. NEW ARRIVALS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-text-secondary block mb-2">
              Atelier Releases
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-text-primary tracking-wide">
              New Additions
            </h2>
          </div>
          <Link
            href="/products"
            className="group flex items-center text-xs uppercase tracking-widest text-luxury-text-primary hover:text-luxury-gold transition-colors"
          >
            All Products
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
          </Link>
        </div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-15%" }}
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {newArrivals.slice(0, 4).map((product) => (
            <motion.div key={product.id} variants={fadeIn} className="group flex flex-col">
              <Link href={`/product/${product.slug}`} className="block relative aspect-[3/4] overflow-hidden mb-6 bg-white border border-luxury-border/60">
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
                <div className="absolute top-4 left-4">
                  <span className="bg-white/95 text-[8px] uppercase tracking-widest px-2.5 py-1 text-luxury-text-primary font-sans font-medium shadow-sm">
                    New In
                  </span>
                </div>
              </Link>
              
              <div className="flex justify-between items-baseline gap-2">
                <h3 className="font-serif text-base text-luxury-text-primary tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                  <Link href={`/product/${product.slug}`}>{product.name}</Link>
                </h3>
                <span className="text-xs text-luxury-text-secondary font-sans">{product.price}</span>
              </div>
              <span className="text-[10px] text-luxury-text-secondary tracking-wider mt-1.5 font-sans">
                {product.fabric.split(".")[0]}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* 5. LOOKBOOK */}
      <section className="bg-white py-24 border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-text-secondary block mb-2 text-center">
            Storytelling Series
          </span>
          <h2 className="font-serif text-3xl md:text-5xl text-luxury-text-primary tracking-wide text-center mb-24">
            Curated Lookbooks
          </h2>

          <div className="space-y-36">
            {LOOKBOOK_ITEMS.map((item, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={item.id}
                  className={`flex flex-col lg:flex-row items-center gap-12 lg:gap-20 ${
                    isEven ? "" : "lg:flex-row-reverse"
                  }`}
                >
                  {/* Image wrapper */}
                  <div className="w-full lg:w-3/5 aspect-[4/5] md:aspect-[16/10] lg:aspect-[4/3] relative overflow-hidden rounded-sm">
                    <ParallaxImage src={item.image} alt={item.title} />
                  </div>

                  {/* Copy content */}
                  <div className="w-full lg:w-2/5 space-y-6 flex flex-col justify-center">
                    <span className="text-[10px] uppercase tracking-widest text-luxury-gold block font-sans">
                      {item.subtitle}
                    </span>
                    <h3 className="font-serif text-2xl md:text-4xl text-luxury-text-primary tracking-wide">
                      {item.title}
                    </h3>
                    {item.quote && (
                      <blockquote className="font-serif italic text-base text-luxury-text-secondary border-l border-luxury-gold/50 pl-4 py-1 leading-relaxed">
                        &ldquo;{item.quote}&rdquo;
                      </blockquote>
                    )}
                    <p className="text-xs text-luxury-text-secondary leading-relaxed font-sans max-w-md">
                      Exploring the geometry of fabrics, seams, and draping logic that gives shape to our seasonal narrative.
                    </p>
                    <Link href="/lookbook">
                      <button className="border-b border-luxury-text-primary hover:border-luxury-gold text-luxury-text-primary hover:text-luxury-gold text-[10px] uppercase tracking-[0.2em] pb-1.5 transition-all duration-300 focus:outline-none">
                        Explore Lookbook &rarr;
                      </button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 6. EDITOR'S PICKS */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-text-secondary block mb-2 text-center">
          Selected pieces
        </span>
        <h2 className="font-serif text-3xl md:text-5xl text-luxury-text-primary tracking-wide text-center mb-16">
          Editor&apos;s Selections
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-stretch">
          {/* Big Featured Pick Card (Column span 7) */}
          {editorsPicks[0] && (
            <div className="md:col-span-7 flex flex-col group justify-between">
              <Link href={`/product/${editorsPicks[0].slug}`} className="block relative aspect-[4/5] overflow-hidden mb-6">
                <ParallaxImage src={editorsPicks[0].images[0]} alt={editorsPicks[0].name} />
                <div className="absolute inset-0 bg-black/5 group-hover:bg-black/10 transition-colors duration-300" />
              </Link>
              <div>
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-sans font-medium block mb-2">
                  Featured Piece
                </span>
                <div className="flex justify-between items-baseline gap-2 mb-2">
                  <h3 className="font-serif text-2xl text-luxury-text-primary tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                    <Link href={`/product/${editorsPicks[0].slug}`}>{editorsPicks[0].name}</Link>
                  </h3>
                  <span className="text-sm text-luxury-text-secondary font-sans">{editorsPicks[0].price}</span>
                </div>
                <p className="text-xs text-luxury-text-secondary leading-relaxed font-sans max-w-lg">
                  {editorsPicks[0].shortDescription}
                </p>
                <Link
                  href={`/product/${editorsPicks[0].slug}`}
                  className="inline-flex items-center text-xs tracking-wider uppercase text-luxury-text-primary group-hover:text-luxury-gold transition-colors duration-300 font-sans font-medium mt-4 focus:outline-none"
                >
                  View Details &rarr;
                </Link>
              </div>
            </div>
          )}

          {/* Right side items (Column span 5) */}
          <div className="md:col-span-5 flex flex-col justify-between gap-12">
            {editorsPicks.slice(1, 3).map((item) => (
              <div key={item.id} className="group flex gap-6 items-center">
                <Link href={`/product/${item.slug}`} className="block relative w-1/3 aspect-[3/4] overflow-hidden flex-shrink-0">
                  <img
                    src={item.images[0]}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </Link>
                <div className="flex-grow space-y-2">
                  <span className="text-[8px] uppercase tracking-widest text-luxury-text-secondary block font-sans">
                    {item.collectionSlug.replace(/-/g, " ")}
                  </span>
                  <h4 className="font-serif text-lg text-luxury-text-primary tracking-wide group-hover:text-luxury-gold transition-colors duration-300">
                    <Link href={`/product/${item.slug}`}>{item.name}</Link>
                  </h4>
                  <span className="text-xs text-luxury-text-secondary font-sans block">{item.price}</span>
                  <Link
                    href={`/product/${item.slug}`}
                    className="inline-flex items-center text-[10px] tracking-wider uppercase text-luxury-text-primary group-hover:text-luxury-gold transition-colors font-sans mt-2"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            ))}

            {/* Aesthetic quote card */}
            <div className="border border-luxury-border p-8 rounded-sm bg-white space-y-4">
              <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-sans block">
                Atelier Philosophy
              </span>
              <p className="font-serif italic text-sm text-luxury-text-secondary leading-relaxed">
                &ldquo;Luxury is not about consumption; it is an appreciation of construction, form, and pure material origins.&rdquo;
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. BRAND STORY */}
      <section className="bg-[#FFFFFF] py-24 border-y border-luxury-border">
        <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-12 items-baseline">
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-text-secondary block">
              Our Heritage
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-text-primary tracking-wide leading-tight uppercase">
              The Architecture of Clothing
            </h2>
            <div className="h-[1px] w-20 bg-luxury-gold" />
          </div>
          
          <div className="lg:col-span-7 space-y-6 text-sm text-luxury-text-secondary leading-relaxed font-sans">
            <p>
              Founded in Milan in 2020, VHSM Atelier emerged from a collaboration between architectural modelers and master tailors. Our hypothesis was simple: the garments we wear should be structures that frame space, rather than enclosures that trap the body.
            </p>
            <p>
              Operating from our dedicated drapers workshop in Paris and partnering with historic spinning mills in Biella, Italy, we focus exclusively on organic, zero-dye cashmere, uncombed linen, and pure Mulberry silk. We reject the fast-fashion cycles to present slow campaigns of structural art.
            </p>
            <Link
              href="/about"
              className="inline-flex items-center text-xs tracking-wider uppercase text-luxury-text-primary hover:text-luxury-gold transition-colors duration-300 font-sans font-medium pt-4 group"
            >
              Discover Our Craft
              <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
            </Link>
          </div>
        </div>
      </section>

      {/* 8. JOURNAL (LATEST ARTICLES) */}
      <section className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
          <div>
            <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-text-secondary block mb-2">
              Atelier Correspondence
            </span>
            <h2 className="font-serif text-3xl md:text-5xl text-luxury-text-primary tracking-wide">
              The Journal
            </h2>
          </div>
          <Link
            href="/journal"
            className="group flex items-center text-xs uppercase tracking-widest text-luxury-text-primary hover:text-luxury-gold transition-colors"
          >
            All Articles
            <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform stroke-[1.5]" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {JOURNAL_ARTICLES.slice(0, 3).map((article) => (
            <div key={article.id} className="group flex flex-col">
              <Link href={`/journal`} className="block relative aspect-[16/10] overflow-hidden mb-6 rounded-sm">
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </Link>
              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-sans block">
                  {article.category} &bull; {article.readTime}
                </span>
                <h3 className="font-serif text-xl text-luxury-text-primary tracking-wide leading-snug group-hover:text-luxury-gold transition-colors duration-300">
                  <Link href={`/journal`}>{article.title}</Link>
                </h3>
                <p className="text-xs text-luxury-text-secondary leading-relaxed font-sans line-clamp-2">
                  {article.subtitle}
                </p>
                <Link
                  href={`/journal`}
                  className="inline-flex items-center text-[10px] tracking-wider uppercase text-luxury-text-primary group-hover:text-luxury-gold transition-colors font-sans pt-2"
                >
                  Read Article
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. INSTAGRAM GALLERY */}
      <section className="max-w-[95vw] mx-auto">
        <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-text-secondary block mb-2 text-center font-sans">
          Atmosphere
        </span>
        <h2 className="font-serif text-3xl text-luxury-text-primary tracking-wide text-center mb-16">
          Shared Vignettes
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-3 md:gap-4">
          {[
            "https://images.unsplash.com/photo-1485968579580-b6d095142e6e?q=80&w=600",
            "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=600",
            "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?q=80&w=600",
            "https://images.unsplash.com/photo-1574169208507-84376144848b?q=80&w=600",
            "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=600",
          ].map((url, i) => (
            <div key={i} className="relative aspect-square overflow-hidden group rounded-sm border border-luxury-border/30">
              <img
                src={url}
                alt="Instagram vignette"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                <ArrowUpRight className="w-5 h-5 text-white stroke-[1.5]" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 10. NEWSLETTER CALLOUT */}
      <section className="max-w-4xl mx-auto px-6 text-center py-12">
        <div className="bg-[#FFFFFF] border border-luxury-border py-16 px-8 md:px-16 rounded-sm space-y-6">
          <span className="text-[10px] tracking-[0.3em] uppercase text-luxury-gold font-sans block">
            Private Correspondence
          </span>
          <h2 className="font-serif text-3xl md:text-4xl text-luxury-text-primary tracking-wide uppercase">
            Join the Correspondence
          </h2>
          <p className="text-xs text-luxury-text-secondary leading-relaxed font-sans max-w-md mx-auto">
            Receive invitation details to regional lookbook presentations, custom fittings, and boutique openings.
          </p>
          <div className="max-w-md mx-auto pt-4">
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 justify-center"
            >
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-3 bg-[#FAFAFA] border border-luxury-border text-xs focus:border-luxury-gold focus:outline-none flex-grow rounded-none"
                required
              />
              <button
                type="submit"
                className="bg-luxury-text-primary text-white hover:bg-luxury-gold px-6 py-3 text-xs uppercase tracking-[0.2em] transition-colors duration-300 font-sans"
              >
                Request Access
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
