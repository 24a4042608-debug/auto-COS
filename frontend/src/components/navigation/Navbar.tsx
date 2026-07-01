"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { LUXURY_COLLECTIONS } from "@/constants/mockData";
import MagneticButton from "@/components/ui/luxury/MagneticButton";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menus on path change
  useEffect(() => {
    setMegaMenuOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Collections", href: "/collections", hasMegaMenu: true },
    { name: "Products", href: "/products" },
    { name: "Lookbook", href: "/lookbook" },
    { name: "Journal", href: "/journal" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500 ease-in-out border-b",
          scrolled
            ? "bg-white/85 backdrop-blur-md border-luxury-border/80 py-4 shadow-sm"
            : "bg-transparent border-transparent py-6"
        )}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="group focus:outline-none">
            <span className={cn(
              "font-serif text-xl md:text-2xl tracking-[0.25em] uppercase transition-colors duration-300 group-hover:text-luxury-gold",
              scrolled ? "text-luxury-text-primary" : "text-white"
            )}>
              VHSM
            </span>
            <span className={cn(
              "block text-[8px] tracking-[0.4em] uppercase -mt-0.5 ml-0.5 transition-colors duration-300",
              scrolled ? "text-luxury-text-secondary" : "text-white/70"
            )}>
              Atelier
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-10">
            {navLinks.map((link) => (
              <div
                key={link.name}
                onMouseEnter={() => link.hasMegaMenu && setMegaMenuOpen(true)}
                onMouseLeave={() => link.hasMegaMenu && setMegaMenuOpen(false)}
                className="relative py-2"
              >
                <Link
                  href={link.href}
                  className={cn(
                    "font-sans text-xs tracking-[0.15em] uppercase transition-colors duration-300 hover:text-luxury-gold focus:outline-none",
                    scrolled
                      ? (pathname === link.href || pathname.startsWith(link.href + "/") ? "text-luxury-gold" : "text-luxury-text-primary")
                      : (pathname === link.href || pathname.startsWith(link.href + "/") ? "text-luxury-gold" : "text-white")
                  )}
                >
                  {link.name}
                </Link>
                {/* Active line animation */}
                {(pathname === link.href || pathname.startsWith(link.href + "/")) && (
                  <motion.div
                    layoutId="activeNavLine"
                    className="absolute bottom-0 left-0 right-0 h-[1px] bg-luxury-gold"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </div>
            ))}
          </nav>

          {/* Search and Utility */}
          <div className="hidden lg:flex items-center space-x-6">
            <button className={cn(
              "transition-colors duration-300 focus:outline-none bg-transparent border-none cursor-pointer",
              scrolled ? "text-luxury-text-primary hover:text-luxury-gold" : "text-white hover:text-luxury-gold"
            )}>
              <Search className="w-4 h-4 stroke-[1.5]" />
            </button>
            <div className={cn("h-4 w-[1px]", scrolled ? "bg-luxury-border" : "bg-white/25")} />
            <Link href="/collections">
              <MagneticButton className={cn(
                "border px-5 py-2 text-[10px] uppercase tracking-[0.2em] transition-all duration-300 rounded-none bg-transparent",
                scrolled
                  ? "border-luxury-text-primary text-luxury-text-primary hover:border-luxury-gold hover:text-luxury-gold"
                  : "border-white text-white hover:border-luxury-gold hover:text-luxury-gold"
              )}>
                Explore Campaign
              </MagneticButton>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center space-x-4 lg:hidden">
            <button className={cn(
              "focus:outline-none bg-transparent border-none cursor-pointer",
              scrolled ? "text-luxury-text-primary" : "text-white"
            )}>
              <Search className="w-4 h-4 stroke-[1.5]" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className={cn(
                "transition-colors focus:outline-none bg-transparent border-none cursor-pointer",
                scrolled ? "text-luxury-text-primary hover:text-luxury-gold" : "text-white hover:text-luxury-gold"
              )}
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 stroke-[1.5]" />
              ) : (
                <Menu className="w-6 h-6 stroke-[1.5]" />
              )}
            </button>
          </div>
        </div>

        {/* Mega Menu Dropdown */}
        <AnimatePresence>
          {megaMenuOpen && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3, ease: [0.19, 1, 0.22, 1] }}
              onMouseEnter={() => setMegaMenuOpen(true)}
              onMouseLeave={() => setMegaMenuOpen(false)}
              className="absolute top-full left-0 w-full bg-white border-b border-luxury-border shadow-md z-40 hidden lg:block"
            >
              <div className="max-w-7xl mx-auto px-12 py-10 grid grid-cols-12 gap-8">
                {/* Column 1: collections list */}
                <div className="col-span-4 border-r border-luxury-border pr-8">
                  <h4 className="font-serif text-xs tracking-[0.2em] uppercase text-luxury-text-secondary mb-6">
                    Curated Campaigns
                  </h4>
                  <ul className="space-y-4">
                    {LUXURY_COLLECTIONS.map((c) => (
                      <li key={c.id}>
                        <Link
                          href={`/collection/${c.slug}`}
                          className="group flex items-center justify-between text-luxury-text-primary hover:text-luxury-gold transition-colors focus:outline-none"
                        >
                          <div>
                            <span className="font-serif text-lg block">{c.name}</span>
                            <span className="text-[10px] text-luxury-text-secondary tracking-wider block">
                              {c.season} &apos;{c.year.slice(2)}
                            </span>
                          </div>
                          <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300 stroke-[1.5]" />
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Column 2: Editor Picks / Links */}
                <div className="col-span-4 pl-4 border-r border-luxury-border pr-8">
                  <h4 className="font-serif text-xs tracking-[0.2em] uppercase text-luxury-text-secondary mb-6">
                    Design House
                  </h4>
                  <div className="space-y-4 text-sm font-sans">
                    <p className="text-luxury-text-secondary text-xs leading-relaxed">
                      Every collection represents a design thesis exploring architectural forms, zero-dye eco finishes, and Biella organic textiles.
                    </p>
                    <Link
                      href="/about"
                      className="inline-flex items-center text-xs tracking-wider uppercase text-luxury-text-primary hover:text-luxury-gold transition-colors group pt-2"
                    >
                      Our Manifesto
                      <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform duration-300 stroke-[1.5]" />
                    </Link>
                  </div>
                </div>

                {/* Column 3: Featured collection Image card */}
                <div className="col-span-4 relative h-[200px] overflow-hidden rounded-sm group">
                  <img
                    src="https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=600&auto=format&fit=crop"
                    alt="Featured Campaign"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex flex-col justify-end p-4">
                    <span className="text-[10px] text-white/70 tracking-widest uppercase mb-1">
                      Latest Release
                    </span>
                    <h5 className="font-serif text-white text-lg tracking-wide">
                      La Silhouette et le Vide
                    </h5>
                    <Link
                      href="/collection/la-silhouette-et-le-vide"
                      className="text-[10px] text-luxury-gold tracking-widest uppercase mt-2 hover:underline focus:outline-none"
                    >
                      View Campaign
                    </Link>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.5 }}
            className="fixed inset-y-0 right-0 w-full max-w-sm bg-white border-l border-luxury-border shadow-2xl z-40 p-8 flex flex-col justify-between lg:hidden"
          >
            <div className="pt-16">
              <ul className="space-y-6">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "font-serif text-2xl tracking-wide block hover:text-luxury-gold transition-colors focus:outline-none",
                        pathname === link.href ? "text-luxury-gold" : "text-luxury-text-primary"
                      )}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="border-t border-luxury-border pt-8 space-y-4">
              <span className="text-[10px] uppercase tracking-widest text-luxury-text-secondary block">
                ATELIER VHSM
              </span>
              <p className="text-xs text-luxury-text-secondary leading-relaxed">
                42 Rue de Sévigné, Paris<br />
                Via della Spiga, 15, Milan
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
