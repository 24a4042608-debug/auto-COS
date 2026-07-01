import { useState } from "react";
import { motion } from "framer-motion";
import type { JournalArticle } from "@/constants/mockData";
import { JOURNAL_ARTICLES } from "@/constants/mockData";
import Dialog from "@/components/ui/luxury/Dialog";
import ParallaxImage from "@/components/ui/luxury/ParallaxImage";

export default function JournalPage() {
  const [activeArticle, setActiveArticle] = useState<JournalArticle | null>(null);

  const featuredArticle = JOURNAL_ARTICLES[0];
  const listArticles = JOURNAL_ARTICLES.slice(1);

  return (
    <div className="max-w-7xl mx-auto px-6 md:px-12 pt-36 md:pt-44 pb-12 md:pb-24 space-y-24 font-sans">
      
      {/* Editorial Header */}
      <div className="max-w-3xl space-y-4">
        <span className="text-[10px] tracking-[0.4em] uppercase text-luxury-gold block">
          Atelier Journals
        </span>
        <h1 className="font-serif text-luxury-heading text-luxury-text-primary tracking-wide uppercase">
          The Journal
        </h1>
        <p className="text-sm text-luxury-text-secondary leading-relaxed max-w-xl">
          Essays on construction, regional history, and zero-dye sustainable initiatives. Documenting the drapers thesis.
        </p>
      </div>

      {/* Featured Article */}
      {featuredArticle && (
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12 items-center">
          <div className="lg:col-span-7 relative aspect-[16/10] overflow-hidden rounded-sm border border-luxury-border/30">
            <ParallaxImage src={featuredArticle.coverImage} alt={featuredArticle.title} />
          </div>
          <div className="lg:col-span-5 space-y-6">
            <span className="text-[10px] tracking-widest text-luxury-gold uppercase block">
              Featured Story &bull; {featuredArticle.category}
            </span>
            <h2 className="font-serif text-2xl md:text-3xl lg:text-4xl text-luxury-text-primary tracking-wide leading-tight uppercase hover:text-luxury-gold transition-colors cursor-pointer" onClick={() => setActiveArticle(featuredArticle)}>
              {featuredArticle.title}
            </h2>
            <p className="text-xs text-luxury-text-secondary leading-relaxed">
              {featuredArticle.subtitle}
            </p>
            <div className="flex items-center gap-4 text-[10px] text-luxury-text-secondary">
              <span>By {featuredArticle.author}</span>
              <span>&bull;</span>
              <span>{featuredArticle.date}</span>
            </div>
            <button
              onClick={() => setActiveArticle(featuredArticle)}
              className="border-b border-luxury-text-primary hover:border-luxury-gold text-luxury-text-primary hover:text-luxury-gold text-[10px] uppercase tracking-[0.2em] pb-1 transition-all duration-300 focus:outline-none"
            >
              Read Article &rarr;
            </button>
          </div>
        </section>
      )}

      {/* Grid of Other Articles */}
      <section className="space-y-12">
        <h3 className="font-serif text-xs uppercase tracking-[0.25em] text-luxury-text-secondary border-b border-luxury-border/60 pb-3">
          Design Notes & Regional Essays
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {listArticles.map((article) => (
            <div key={article.id} className="group flex flex-col space-y-6">
              <div
                className="relative aspect-[16/10] overflow-hidden rounded-sm border border-luxury-border/30 cursor-pointer"
                onClick={() => setActiveArticle(article)}
              >
                <img
                  src={article.coverImage}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>

              <div className="space-y-3">
                <span className="text-[9px] uppercase tracking-widest text-luxury-gold font-sans block">
                  {article.category} &bull; {article.readTime}
                </span>
                
                <h4
                  onClick={() => setActiveArticle(article)}
                  className="font-serif text-2xl text-luxury-text-primary tracking-wide leading-snug group-hover:text-luxury-gold transition-colors duration-300 cursor-pointer uppercase"
                >
                  {article.title}
                </h4>

                <p className="text-xs text-luxury-text-secondary leading-relaxed font-sans">
                  {article.subtitle}
                </p>

                <div className="flex items-center gap-4 text-[10px] text-luxury-text-secondary pt-1">
                  <span>By {article.author}</span>
                  <span>&bull;</span>
                  <span>{article.date}</span>
                </div>

                <button
                  onClick={() => setActiveArticle(article)}
                  className="inline-flex items-center text-[10px] tracking-wider uppercase text-luxury-text-primary group-hover:text-luxury-gold transition-colors font-sans pt-2 focus:outline-none"
                >
                  Read Article &rarr;
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Reader Modal */}
      <Dialog
        isOpen={!!activeArticle}
        onClose={() => setActiveArticle(null)}
        title={activeArticle?.title}
        className="max-w-2xl"
      >
        {activeArticle && (
          <div className="space-y-6 font-sans text-sm text-luxury-text-secondary leading-relaxed">
            <div className="flex justify-between text-[10px] uppercase tracking-wider border-b border-luxury-border pb-3">
              <span>{activeArticle.category}</span>
              <span>{activeArticle.date}</span>
            </div>
            
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-sm">
              <img
                src={activeArticle.coverImage}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
            </div>
            
            <p className="font-serif italic text-base text-luxury-text-primary leading-relaxed">
              {activeArticle.subtitle}
            </p>

            <div className="space-y-4">
              {activeArticle.content.map((paragraph, index) => (
                <p key={index}>{paragraph}</p>
              ))}
            </div>

            <div className="border-t border-luxury-border pt-4 text-[10px] text-luxury-text-secondary">
              <span>Written by <strong>{activeArticle.author}</strong>, drapers office.</span>
            </div>
          </div>
        )}
      </Dialog>

    </div>
  );
}
