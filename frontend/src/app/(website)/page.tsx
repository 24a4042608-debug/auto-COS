"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";
import { LOOKBOOK_ITEMS, JOURNAL_ARTICLES } from "@/constants/mockData";
import CinematicBanner from "@/components/ui/luxury/CinematicBanner";
import StreamingRow from "@/components/ui/luxury/StreamingRow";
import MetricsSection from "@/components/sections/MetricsSection";
import { useDbData } from "@/hooks/useDbData";

export default function HomePage() {
  const { products, collections } = useDbData();
  const newArrivals = products.filter((p) => p.isNewArrival);
  const editorsPicks = products.filter((p) => p.isEditorsPick);

  // Map products to streaming cards
  const productCards = products.slice(0, 12).map((p) => ({
    id: p.id,
    title: p.name,
    subtitle: p.fabric?.split(".")[0] || "",
    image: p.images[0],
    href: `/product/${p.slug}`,
    tag: p.isNewArrival ? "NEW" : p.isEditorsPick ? "PICK" : undefined,
    year: "2026",
  }));

  const newArrivalCards = newArrivals.map((p) => ({
    id: p.id,
    title: p.name,
    subtitle: p.price,
    image: p.images[0],
    href: `/product/${p.slug}`,
    tag: "NEW",
    year: "2026",
  }));

  const editorCards = editorsPicks.map((p) => ({
    id: p.id,
    title: p.name,
    subtitle: p.price,
    image: p.images[0],
    href: `/product/${p.slug}`,
    tag: "PICK",
    year: "2026",
  }));

  const collectionCards = collections.map((c) => ({
    id: c.id,
    title: c.name,
    subtitle: `${c.season} ${c.year}`,
    image: c.coverImage,
    href: `/collection/${c.slug}`,
    tag: "SERIES",
    year: c.year,
  }));

  const journalCards = JOURNAL_ARTICLES.map((a) => ({
    id: a.id,
    title: a.title,
    subtitle: a.category,
    image: a.coverImage,
    href: `/journal`,
    tag: "DOC",
    year: "2026",
  }));

  const lookbookCards = LOOKBOOK_ITEMS.map((l) => ({
    id: l.id,
    title: l.title,
    subtitle: l.subtitle,
    image: l.image,
    href: `/lookbook`,
    tag: "FILM",
  }));

  // Featured banner data (first collection or fallback)
  const featured = collections[0];
  const featuredProduct = products[0];

  return (
    <div className="bg-[#08080C] min-h-screen">
      {/* ① CINEMATIC HERO BANNER */}
      <CinematicBanner
        title={featured?.name || "LA SILHOUETTE ET LE VIDE"}
        subtitle="Autumn / Winter 2026 Campaign"
        description={
          featured?.description ||
          "Our flagship collection explores geometric voids and sculptural drapings that shape the body in high-fashion architecture. Shot in Paris, conceived in Milan."
        }
        image={
          featured?.coverImage ||
          "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=1600"
        }
        href={featured ? `/collection/${featured.slug}` : "/collections"}
        year="2026"
        genre={["Haute Couture", "Architectural", "Avant-garde"]}
        rating="ATL-17"
      />

      {/* ② STREAMING ROWS */}
      <div className="py-8 space-y-12 pb-24">

        {/* Featured Collections → "Trending Series" */}
        {collectionCards.length > 0 && (
          <StreamingRow
            title="Trending Campaigns"
            sectionLabel="Series"
            items={collectionCards}
            viewAllHref="/collections"
          />
        )}

        {/* New Arrivals → "New Releases" */}
        {newArrivalCards.length > 0 && (
          <StreamingRow
            title="New Releases"
            sectionLabel="Just Added"
            items={newArrivalCards}
            viewAllHref="/products"
          />
        )}

        {/* Lookbook → "Original Films" */}
        {lookbookCards.length > 0 && (
          <StreamingRow
            title="Atelier Original Films"
            sectionLabel="Originals"
            items={lookbookCards}
            viewAllHref="/lookbook"
          />
        )}

        {/* Editor's Picks → "Critically Acclaimed" */}
        {editorCards.length > 0 && (
          <StreamingRow
            title="Critically Acclaimed"
            sectionLabel="Editor's Choice"
            items={editorCards}
            viewAllHref="/products"
          />
        )}

        {/* All Products → "Full Catalog" */}
        {productCards.length > 0 && (
          <StreamingRow
            title="Full Catalog"
            sectionLabel="All Titles"
            items={productCards}
            viewAllHref="/products"
          />
        )}

        {/* Journal → "Documentaries" */}
        {journalCards.length > 0 && (
          <StreamingRow
            title="Behind the Scenes"
            sectionLabel="Documentaries"
            items={journalCards}
            viewAllHref="/journal"
          />
        )}

        {/* ③ BRAND STORY — Cinematic Split */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-10%" }}
          transition={{ duration: 0.8 }}
          className="mx-6 md:mx-12 rounded-sm overflow-hidden relative"
        >
          <div className="relative h-[480px] md:h-[560px] overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1469334031218-e382a71b716b?q=80&w=1400"
              alt="Atelier Story"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/60 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            <div className="absolute inset-0 flex items-center">
              <div className="max-w-lg px-10 md:px-16 space-y-5">
                <span className="text-[#E50914] text-xs font-bold tracking-widest uppercase">
                  About the Atelier
                </span>
                <h2 className="text-white font-black text-3xl md:text-4xl leading-tight">
                  The Architecture of Clothing
                </h2>
                <p className="text-zinc-300 text-sm leading-relaxed">
                  Founded in Milan in 2020, VHSM Atelier emerged from a collaboration between architectural modelers and master tailors. Our garments frame space, rather than enclosing the body.
                </p>
                <Link href="/about">
                  <button className="flex items-center gap-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 text-white px-6 py-3 text-sm font-semibold rounded-sm transition-all cursor-pointer mt-2">
                    Discover Our Craft
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

        {/* ④ METRICS */}
        <div className="px-6 md:px-12">
          <MetricsSection />
        </div>

        {/* ⑤ NEWSLETTER — Streaming CTA */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-6 md:mx-12"
        >
          <div className="bg-gradient-to-br from-[#E50914]/20 via-zinc-900/50 to-zinc-900 border border-[#E50914]/20 rounded-sm p-10 md:p-16 text-center space-y-6 backdrop-blur-sm">
            <span className="text-[#E50914] text-xs font-bold tracking-widest uppercase block">
              Private Access
            </span>
            <h2 className="text-white font-black text-2xl md:text-4xl leading-tight">
              Join the Inner Circle
            </h2>
            <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
              Get early access to campaign previews, private lookbook screenings, and exclusive invitations to atelier events.
            </p>
            <form
              onSubmit={(e) => e.preventDefault()}
              className="flex flex-col sm:flex-row gap-3 justify-center max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-zinc-900/80 border border-white/10 text-white text-sm px-4 py-3 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E50914]/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="bg-[#E50914] hover:bg-[#f40612] text-white px-8 py-3 text-sm font-bold rounded-sm transition-all duration-200 cursor-pointer whitespace-nowrap hover:shadow-lg hover:shadow-red-900/30"
              >
                Get Access
              </button>
            </form>
          </div>
        </motion.section>
      </div>
    </div>
  );
}
