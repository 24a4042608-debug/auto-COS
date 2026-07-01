import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Menu, X, Grid2X2, Layers, BookOpen, ChevronDown, Scissors } from "lucide-react";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const { pathname } = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
    setSearchOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: "Home", href: "/fashion" },
    { name: "Products", href: "/fashion/products" },
    { name: "Collections", href: "/fashion/collections" },
    { name: "Lookbook", href: "/fashion/lookbook" },
    { name: "Journal", href: "/fashion/journal" },
    { name: "About", href: "/fashion/about" },
    { name: "Contact", href: "/fashion/contact" },
  ];

  return (
    <>
      {/* Main Header */}
      <header
        className={cn(
          "fixed top-0 left-0 w-full z-50 transition-all duration-500",
          scrolled
            ? "glass-luxury py-3"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5"
        )}
        style={{ width: "100%" }}
      >
        <div className="max-w-screen-2xl mx-auto px-6 md:px-12 flex items-center justify-between gap-8">
          
          {/* Logo */}
          <Link to="/fashion" className="flex-shrink-0 group focus:outline-none">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-white flex items-center justify-center rounded-sm">
                <Scissors className="w-4 h-4 text-zinc-950" />
              </div>
              <span className="text-white font-black text-xl tracking-[0.15em] uppercase group-hover:text-zinc-300 transition-colors duration-300">
                ATELIER
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 hover:text-white relative group",
                    isActive ? "text-white" : "text-zinc-400"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="activeStreamingLine"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-white"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {/* Search */}
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer focus:outline-none"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* CTA */}
            <Link to="/fashion/products">
              <button className="bg-white hover:bg-zinc-200 text-zinc-900 px-5 py-2 text-sm font-bold rounded-sm transition-all duration-200 cursor-pointer flex items-center gap-2 tracking-wide uppercase">
                <Grid2X2 className="w-4 h-4" />
                Xem bộ sưu tập
              </button>
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center gap-3 lg:hidden">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-zinc-400 hover:text-white transition-colors cursor-pointer"
            >
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-zinc-300 hover:text-white transition-colors cursor-pointer focus:outline-none"
              aria-label="Toggle Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar Drop-down */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-white/10 overflow-hidden"
            >
              <div className="max-w-screen-2xl mx-auto px-6 md:px-12 py-4">
                <div className="flex items-center gap-3 bg-zinc-900/80 border border-white/10 rounded-sm px-4 py-3">
                  <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <input
                    type="text"
                    placeholder="Search titles, collections, seasons..."
                    autoFocus
                    className="w-full bg-transparent text-white text-sm placeholder:text-zinc-500 focus:outline-none"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/60 z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-72 bg-zinc-950 border-r border-white/10 z-50 flex flex-col lg:hidden"
            >
              {/* Mobile header */}
              <div className="flex items-center justify-between p-6 border-b border-white/10">
                <Link to="/" className="flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <div className="w-7 h-7 bg-[#E50914] flex items-center justify-center rounded-sm">
                    <Play className="w-3.5 h-3.5 text-white fill-white" />
                  </div>
                  <span className="text-white font-bold text-lg tracking-tight">VHSM<span className="text-[#E50914]">.</span>PLAY</span>
                </Link>
                <button onClick={() => setMobileMenuOpen(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Mobile nav links */}
              <nav className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                {navLinks.map((link) => {
                  const isActive = pathname === link.href || (link.href !== "/" && pathname.startsWith(link.href));
                  const Icon = link.icon;
                  return (
                    <Link
                      key={link.name}
                      to={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-4 py-3 rounded-sm text-sm font-medium transition-all",
                        isActive
                          ? "bg-[#E50914]/15 text-white border-l-2 border-[#E50914]"
                          : "text-zinc-400 hover:text-white hover:bg-white/5"
                      )}
                    >
                      {Icon && <Icon className="w-4 h-4 flex-shrink-0" />}
                      {link.name}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile footer */}
              <div className="p-6 border-t border-white/10">
                <Link to="/products" onClick={() => setMobileMenuOpen(false)}>
                  <button className="w-full bg-[#E50914] hover:bg-[#f40612] text-white py-3 text-sm font-semibold rounded-sm transition-colors cursor-pointer flex items-center justify-center gap-2">
                    <Play className="w-4 h-4 fill-white" />
                    Browse All Titles
                  </button>
                </Link>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}

