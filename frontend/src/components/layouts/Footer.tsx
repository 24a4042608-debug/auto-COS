"use client";

import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/ui/luxury/MagneticButton";

export default function Footer() {
  const scrollUp = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="bg-white border-t border-luxury-border pt-20 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-16">
          
          {/* Brand Manifesto Column */}
          <div className="lg:col-span-4 space-y-6">
            <span className="font-serif text-lg tracking-[0.2em] uppercase text-luxury-text-primary">
              VHSM ATELIER
            </span>
            <p className="text-sm text-luxury-text-secondary leading-relaxed font-sans max-w-xs">
              Designing structural narratives. We create garment silhouettes that challenge the boundaries of tailored volume, craftsmanship, and raw materials.
            </p>
          </div>

          {/* Navigation Links Column */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-[10px] uppercase tracking-widest text-luxury-text-secondary">
              Navigation
            </h5>
            <ul className="space-y-2.5 text-xs">
              {["Collections", "Products", "Lookbook", "Journal", "About", "Contact"].map((item) => (
                <li key={item}>
                  <Link
                    href={`/${item.toLowerCase()}`}
                    className="text-luxury-text-primary hover:text-luxury-gold transition-colors duration-300 focus:outline-none"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Column */}
          <div className="lg:col-span-2 space-y-4">
            <h5 className="text-[10px] uppercase tracking-widest text-luxury-text-secondary">
              Connect
            </h5>
            <ul className="space-y-2.5 text-xs">
              {[
                { name: "Instagram", href: "https://instagram.com" },
                { name: "Pinterest", href: "https://pinterest.com" },
                { name: "Vimeo", href: "https://vimeo.com" },
                { name: "Journal RSS", href: "#" },
              ].map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center text-luxury-text-primary hover:text-luxury-gold transition-colors duration-300 group focus:outline-none"
                  >
                    {item.name}
                    <ArrowUpRight className="w-3 h-3 ml-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 stroke-[1.5]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4 space-y-6">
            <h5 className="text-[10px] uppercase tracking-widest text-luxury-text-secondary">
              Atelier Correspondence
            </h5>
            <p className="text-xs text-luxury-text-secondary leading-relaxed">
              Subscribe to receive notification of new seasonal campaigns, lookbooks, and private viewings.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex items-center border-b border-luxury-text-primary pb-1 group focus-within:border-luxury-gold transition-colors duration-300">
              <input
                type="email"
                placeholder="Enter email address"
                className="w-full bg-transparent text-xs text-luxury-text-primary placeholder:text-luxury-text-secondary/50 focus:outline-none py-1"
                required
              />
              <button
                type="submit"
                className="text-xs tracking-wider uppercase text-luxury-text-primary hover:text-luxury-gold transition-colors ml-2 focus:outline-none"
              >
                Subscribe
              </button>
            </form>
          </div>

        </div>

        {/* Big Text branding */}
        <div className="border-t border-luxury-border/60 pt-12 flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="text-[10px] text-luxury-text-secondary tracking-widest uppercase">
            © 2026 VHSM ATELIER. All rights reserved.
          </span>
          
          {/* Scroll to Top */}
          <button
            onClick={scrollUp}
            className="text-[10px] tracking-widest uppercase text-luxury-text-secondary hover:text-luxury-gold transition-colors focus:outline-none flex items-center gap-1 group"
          >
            Scroll to Top
            <span className="block translate-y-0 group-hover:-translate-y-0.5 transition-transform duration-300">
              ↑
            </span>
          </button>
        </div>

        <div className="mt-12 text-center select-none opacity-[0.02]">
          <span className="font-serif text-[12vw] tracking-[0.2em] text-black leading-none block uppercase">
            ATELIER
          </span>
        </div>
      </div>
    </footer>
  );
}
