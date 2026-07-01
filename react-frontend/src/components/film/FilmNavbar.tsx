import { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { motion, AnimatePresence } from "framer-motion";
import {
  Search, Bell, User, Menu, X, Play, Clapperboard,
  Bookmark, History, LogOut, ChevronDown, Home,
  Compass, Star, Clock, Settings
} from "lucide-react";
import { useFilm } from "@/contexts/FilmContext";
import { cn } from "@/lib/utils";

export default function FilmNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [profileOpen, setProfileOpen] = useState(false);
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useFilm();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setProfileOpen(false);
  }, [pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/film/browse?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
      setSearchQuery("");
    }
  };

  const navLinks = [
    { name: "Home", href: "/film", icon: Home },
    { name: "Browse", href: "/film/browse", icon: Compass },
    { name: "Top Rated", href: "/film/browse?sort=top", icon: Star },
    { name: "New & Hot", href: "/film/browse?filter=new", icon: Play },
  ];

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
          scrolled
            ? "bg-[#0A0A0F]/95 backdrop-blur-xl border-b border-white/[0.06] py-3 shadow-2xl shadow-black/50"
            : "bg-gradient-to-b from-black/80 via-black/30 to-transparent py-5"
        )}
      >
        <div className="max-w-screen-2xl mx-auto px-4 md:px-8 flex items-center gap-6">

          {/* Logo */}
          <Link to="/film" className="flex-shrink-0 flex items-center gap-2 group">
            <div className="w-8 h-8 bg-[#E50914] rounded-sm flex items-center justify-center shadow-lg shadow-red-900/40">
              <Clapperboard className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-black text-xl tracking-tight hidden sm:block">
              CINE<span className="text-[#E50914]">VAULT</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6 flex-1">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={cn(
                    "text-sm font-medium transition-colors duration-200 relative whitespace-nowrap",
                    isActive ? "text-white" : "text-zinc-400 hover:text-white"
                  )}
                >
                  {link.name}
                  {isActive && (
                    <motion.div
                      layoutId="filmNavLine"
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-[#E50914]"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Right Controls */}
          <div className="flex items-center gap-3 ml-auto">
            {/* Search */}
            <AnimatePresence mode="wait">
              {searchOpen ? (
                <motion.form
                  key="search-form"
                  initial={{ width: 0, opacity: 0 }}
                  animate={{ width: 260, opacity: 1 }}
                  exit={{ width: 0, opacity: 0 }}
                  transition={{ duration: 0.25 }}
                  onSubmit={handleSearch}
                  className="flex items-center bg-zinc-900 border border-white/15 rounded-sm overflow-hidden"
                >
                  <Search className="w-4 h-4 text-zinc-500 ml-3 flex-shrink-0" />
                  <input
                    autoFocus
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Titles, genres, directors..."
                    className="flex-1 bg-transparent text-white text-sm px-3 py-2.5 focus:outline-none placeholder:text-zinc-600"
                  />
                  <button
                    type="button"
                    onClick={() => { setSearchOpen(false); setSearchQuery(""); }}
                    className="p-2.5 text-zinc-500 hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </motion.form>
              ) : (
                <motion.button
                  key="search-icon"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setSearchOpen(true)}
                  className="text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
                >
                  <Search className="w-5 h-5" />
                </motion.button>
              )}
            </AnimatePresence>

            {/* Notification bell (authenticated) */}
            {isAuthenticated && (
              <button className="relative text-zinc-400 hover:text-white transition-colors cursor-pointer hidden sm:block p-1">
                <Bell className="w-5 h-5" />
                <span className="absolute top-0.5 right-0.5 w-2 h-2 bg-[#E50914] rounded-full" />
              </button>
            )}

            {/* Auth */}
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setProfileOpen(!profileOpen)}
                  className="flex items-center gap-2 cursor-pointer focus:outline-none"
                >
                  <div className="w-8 h-8 bg-[#E50914] rounded-sm flex items-center justify-center text-white text-sm font-bold">
                    {user?.name?.[0]?.toUpperCase() || "U"}
                  </div>
                  <ChevronDown className={cn("w-3.5 h-3.5 text-zinc-400 transition-transform hidden sm:block", profileOpen && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 border border-white/10 rounded-sm shadow-2xl shadow-black/60 overflow-hidden z-50"
                    >
                      {/* Profile header */}
                      <div className="px-4 py-3 border-b border-white/10">
                        <p className="text-white text-sm font-semibold truncate">{user?.name}</p>
                        <p className="text-zinc-500 text-xs truncate">{user?.email}</p>
                      </div>

                      {/* Menu items */}
                      <div className="py-1">
                        {[
                          { icon: Bookmark, label: "My Watchlist", href: "/film/watchlist" },
                          { icon: History, label: "Watch History", href: "/film/history" },
                          { icon: Settings, label: "Settings", href: "/film/settings" },
                        ].map(({ icon: Icon, label, href }) => (
                          <Link
                            key={label}
                            href={href}
                            className="flex items-center gap-3 px-4 py-2.5 text-zinc-400 text-sm hover:bg-white/5 hover:text-white transition-colors"
                          >
                            <Icon className="w-4 h-4" />
                            {label}
                          </Link>
                        ))}
                      </div>

                      <div className="border-t border-white/10 py-1">
                        <button
                          onClick={logout}
                          className="w-full flex items-center gap-3 px-4 py-2.5 text-zinc-400 text-sm hover:bg-red-900/20 hover:text-red-400 transition-colors cursor-pointer"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link to="/film/auth">
                <button className="bg-[#E50914] hover:bg-[#f40612] text-white px-4 py-2 text-sm font-semibold rounded-sm transition-all cursor-pointer whitespace-nowrap">
                  Sign In
                </button>
              </Link>
            )}

            {/* Mobile toggle */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden text-zinc-400 hover:text-white transition-colors cursor-pointer p-1"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/70 z-40 md:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", ease: [0.16, 1, 0.3, 1], duration: 0.35 }}
              className="fixed inset-y-0 left-0 w-72 bg-zinc-950 border-r border-white/10 z-50 flex flex-col md:hidden"
            >
              <div className="flex items-center justify-between p-5 border-b border-white/10">
                <Link to="/film" className="flex items-center gap-2">
                  <div className="w-7 h-7 bg-[#E50914] rounded-sm flex items-center justify-center">
                    <Clapperboard className="w-3.5 h-3.5 text-white" />
                  </div>
                  <span className="text-white font-black text-lg">CINE<span className="text-[#E50914]">VAULT</span></span>
                </Link>
                <button onClick={() => setMobileOpen(false)} className="text-zinc-400 cursor-pointer">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Search mobile */}
              <div className="p-4 border-b border-white/10">
                <form onSubmit={handleSearch} className="flex items-center gap-2 bg-zinc-900 border border-white/10 rounded-sm px-3 py-2.5">
                  <Search className="w-4 h-4 text-zinc-500 flex-shrink-0" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="flex-1 bg-transparent text-white text-sm focus:outline-none placeholder:text-zinc-600"
                  />
                </form>
              </div>

              <nav className="flex-1 overflow-y-auto p-4 space-y-1">
                {navLinks.map(({ name, href, icon: Icon }) => (
                  <Link
                    key={name}
                    href={href}
                    className={cn(
                      "flex items-center gap-3 px-3 py-3 rounded-sm text-sm font-medium transition-all",
                      pathname === href
                        ? "bg-[#E50914]/15 text-white border-l-2 border-[#E50914]"
                        : "text-zinc-400 hover:text-white hover:bg-white/5"
                    )}
                  >
                    <Icon className="w-4 h-4" />
                    {name}
                  </Link>
                ))}

                {isAuthenticated && (
                  <>
                    <div className="pt-4 pb-2">
                      <span className="text-zinc-600 text-xs px-3 uppercase tracking-wider font-semibold">My Account</span>
                    </div>
                    {[
                      { icon: Bookmark, label: "Watchlist", href: "/film/watchlist" },
                      { icon: History, label: "History", href: "/film/history" },
                    ].map(({ icon: Icon, label, href }) => (
                      <Link key={label} href={href} className="flex items-center gap-3 px-3 py-3 text-zinc-400 text-sm hover:text-white hover:bg-white/5 rounded-sm transition-all">
                        <Icon className="w-4 h-4" />
                        {label}
                      </Link>
                    ))}
                  </>
                )}
              </nav>

              <div className="p-4 border-t border-white/10">
                {isAuthenticated ? (
                  <button
                    onClick={logout}
                    className="w-full flex items-center justify-center gap-2 border border-white/15 text-zinc-400 hover:text-white hover:border-red-500/50 py-2.5 text-sm rounded-sm transition-all cursor-pointer"
                  >
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </button>
                ) : (
                  <Link to="/film/auth">
                    <button className="w-full bg-[#E50914] text-white py-2.5 text-sm font-bold rounded-sm cursor-pointer">
                      Sign In / Register
                    </button>
                  </Link>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Backdrop for profile dropdown */}
      {profileOpen && (
        <div className="fixed inset-0 z-40" onClick={() => setProfileOpen(false)} />
      )}
    </>
  );
}

