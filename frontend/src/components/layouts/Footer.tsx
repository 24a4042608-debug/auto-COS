"use client";

import Link from "next/link";
import { Play, ArrowUp, Globe, MessageCircle, Video } from "lucide-react";


const footerLinks = {
  browse: [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/products" },
    { name: "Series", href: "/collections" },
    { name: "Lookbook", href: "/lookbook" },
    { name: "Journal", href: "/journal" },
  ],
  company: [
    { name: "About VHSM", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Careers", href: "#" },
    { name: "Press Kit", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Settings", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#05050A] border-t border-white/[0.06] mt-24 md:mt-36">
      <div className="max-w-screen-2xl mx-auto px-6 md:px-12">
        
        {/* Top Section */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand */}
          <div className="lg:col-span-2 space-y-5">
            <Link href="/" className="flex items-center gap-2 group w-fit">
              <div className="w-9 h-9 bg-[#E50914] flex items-center justify-center rounded-sm">
                <Play className="w-4 h-4 text-white fill-white" />
              </div>
              <span className="text-white font-bold text-2xl tracking-tight group-hover:text-[#E50914] transition-colors">
                VHSM<span className="text-[#E50914]">.</span>PLAY
              </span>
            </Link>
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
              A cinematic atelier. We design garment silhouettes that challenge the boundaries of tailored volume, craftsmanship, and raw material origins — presented as seasonal campaigns.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4 pt-2">
              {[
                { Icon: Globe, href: "https://instagram.com", label: "Instagram" },
                { Icon: MessageCircle, href: "https://twitter.com", label: "Twitter" },
                { Icon: Video, href: "https://youtube.com", label: "YouTube" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="w-9 h-9 border border-white/10 flex items-center justify-center text-zinc-500 hover:text-white hover:border-[#E50914]/60 transition-all rounded-sm"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Browse */}
          <div className="space-y-4">
            <h5 className="text-zinc-300 text-xs font-semibold tracking-widest uppercase">Browse</h5>
            <ul className="space-y-3">
              {footerLinks.browse.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company */}
          <div className="space-y-4">
            <h5 className="text-zinc-300 text-xs font-semibold tracking-widest uppercase">Company</h5>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-zinc-500 text-sm hover:text-white transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h5 className="text-zinc-300 text-xs font-semibold tracking-widest uppercase">Stay Updated</h5>
            <p className="text-zinc-500 text-sm leading-relaxed">Get notified when new campaigns and releases drop.</p>
            <form onSubmit={(e) => e.preventDefault()} className="space-y-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="w-full bg-zinc-900 border border-white/10 text-white text-sm px-4 py-2.5 rounded-sm placeholder:text-zinc-600 focus:outline-none focus:border-[#E50914]/50 transition-colors"
                required
              />
              <button
                type="submit"
                className="w-full bg-[#E50914] hover:bg-[#f40612] text-white text-sm font-medium py-2.5 rounded-sm transition-colors cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/[0.06] py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6">
            <span className="text-zinc-600 text-xs">
              © 2026 VHSM Atelier. All rights reserved.
            </span>
            {footerLinks.legal.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-zinc-600 text-xs hover:text-zinc-400 transition-colors"
              >
                {link.name}
              </Link>
            ))}
          </div>
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="flex items-center gap-1.5 text-xs text-zinc-600 hover:text-white transition-colors cursor-pointer group"
          >
            Back to Top
            <ArrowUp className="w-3.5 h-3.5 group-hover:-translate-y-0.5 transition-transform duration-300" />
          </button>
        </div>

        {/* Giant watermark */}
        <div className="py-8 text-center select-none overflow-hidden">
          <span className="text-[8vw] font-black text-white/[0.025] tracking-tight leading-none block uppercase">
            VHSM PLAY
          </span>
        </div>
      </div>
    </footer>
  );
}
