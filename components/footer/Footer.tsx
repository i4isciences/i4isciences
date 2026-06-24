"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight, Smile, Sparkles, Languages, Compass } from "lucide-react";

export default function Footer() {
  return (
    <footer className="relative bg-[#0F1922] text-[#E2E8F0] font-sans antialiased selection:bg-amber-400 selection:text-slate-900 border-t border-slate-800">
      
      {/* HUMAN DESIGN ELEMENTS (Hand-drawn feel, crisp vectors instead of glowing tech meshes) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        <svg className="absolute top-0 left-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle geometric grid background mirroring vintage learning blueprints */}
          <defs>
            <pattern id="footer-grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#334155" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#footer-grid)" />
        </svg>
      </div>

      <div className="relative z-10 mx-auto max-w-[1400px] px-6 pt-20 pb-12 md:px-12">
        
        {/* MAIN ASYMMETRICAL EDITORIAL GRID */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8 pb-16 border-b border-slate-800">
          
          {/* COLUMN 1: THE BRAND STORY (Spans 5 blocks) */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="space-y-6">
              {/* Premium Wordmark - Clean, structural type */}
              <div className="flex items-center gap-3">
  <Image
    src="/images/favicon.png"
    alt="i4iSciences Logo"
    width={60}
    height={60}
    className="h-12 w-auto object-contain"
  />

  <span className="text-3xl font-bold tracking-tight text-[#ffffff]">
    i4i Sciences
  </span>

  <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-[11px] font-bold tracking-widest uppercase px-2.5 py-0.5 rounded">
    Est. 2026
  </span>
</div>
              <h3 className="text-2xl md:text-3xl font-normal leading-tight text-slate-100 font-serif max-w-md">
                Where global learning meets <span className="underline decoration-amber-400 decoration-2 underline-offset-4 font-sans font-semibold">human mentorship</span>.
              </h3>
              
              <p className="text-base leading-relaxed text-slate-400 max-w-lg">
                We design comprehensive learning networks for children, immigrant families, 
                and educators worldwide. Our focus isn't on maximizing automation—it's on 
                deepening human capability, cultural transition, and authentic academic success.
              </p>
            </div>

            {/* Wholesome badges instead of abstract AI chips */}
            <div className="flex flex-wrap gap-2.5 pt-4">
              <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-300">
                <Languages size={14} className="text-amber-400" />
                <span>Multilingual Support</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-300">
                <Smile size={14} className="text-emerald-400" />
                <span>Human-Led Tutoring</span>
              </div>
              <div className="inline-flex items-center gap-2 bg-slate-800/60 border border-slate-700/50 rounded-lg px-3.5 py-2 text-xs font-medium text-slate-300">
                <Compass size={14} className="text-blue-400" />
                <span>Global Curriculum</span>
              </div>
            </div>
          </div>

          {/* COLUMN 2 & 3: CLEAN NAVIGATION LINK BLOCKS (Spans 4 blocks) */}
          <div className="lg:col-span-4 grid grid-cols-2 gap-8 md:gap-12">
            
            {/* LINK BLOCK: STUDY */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-6 font-mono">
                Education
              </p>
              <ul className="space-y-4">
                {[
                  { label: "Learning Hub", href: "#" },
                  { label: "1-on-1 Tutoring", href: "#" },
                  { label: "Family Onboarding", href: "#" },
                  { label: "Teacher Pathways", href: "#" },
                  { label: "Success Stories", href: "#" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href} 
                      className="text-[15px] font-medium text-slate-400 hover:text-white transition-colors duration-150 block group"
                    >
                      <span className="border-b border-transparent group-hover:border-slate-400 pb-0.5">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* LINK BLOCK: COMPANY */}
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-amber-400 mb-6 font-mono">
                Collective
              </p>
              <ul className="space-y-4">
                {[
                  { label: "Our Philosophy", href: "#" },
                  { label: "Active Careers", href: "#" },
                  { label: "University Partners", href: "#" },
                  { label: "Impact & Research", href: "#" },
                  { label: "Contact Hub", href: "#" },
                ].map((link, idx) => (
                  <li key={idx}>
                    <Link 
                      href={link.href} 
                      className="text-[15px] font-medium text-slate-400 hover:text-white transition-colors duration-150 block group"
                    >
                      <span className="border-b border-transparent group-hover:border-slate-400 pb-0.5">
                        {link.label}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

          </div>

          {/* COLUMN 4: THE NEWSLETTER BOARD (Spans 3 blocks) */}
          <div className="lg:col-span-3">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 relative overflow-hidden group">
              
              {/* Playful hand-drawn aesthetic badge layout */}
              <div className="absolute top-0 right-0 transform translate-x-2 -translate-y-2 w-12 h-12 bg-amber-400/10 rounded-full flex items-center justify-center text-amber-400">
                <Sparkles size={16} />
              </div>

              <h4 className="text-base font-bold text-white font-geist">
                The Learning Letter
              </h4>
              <p className="mt-2 text-xs leading-relaxed text-slate-400">
                No spam or marketing jargon. Just raw educational research, onboarding tricks for new immigrant families, and global system insights.
              </p>

              <form className="mt-5 space-y-2.5" onSubmit={(e) => e.preventDefault()}>
                <div className="relative">
                  <input
                    type="email"
                    required
                    placeholder="your.email@domain.com"
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-xs text-white outline-none placeholder:text-slate-600 focus:border-slate-600 focus:ring-1 focus:ring-slate-600 transition-all"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-slate-100 hover:bg-white text-slate-950 font-bold text-xs rounded-xl py-3 px-4 transition-all duration-150 flex items-center justify-center gap-1.5 active:scale-[0.99]"
                >
                  <span>Join Our Community</span>
                  <ArrowUpRight size={14} strokeWidth={2.5} />
                </button>
              </form>
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA BAR */}
        <div className="mt-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-500 font-medium">
          
          {/* BRAND LEGAL */}
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="text-slate-400 font-semibold">© 2026 WingsUP Org.</span>
            <span className="hidden sm:inline text-slate-700">|</span>
            <Link href="#" className="hover:text-slate-300 transition-colors">Privacy Charter</Link>
            <span className="text-slate-800">•</span>
            <Link href="#" className="hover:text-slate-300 transition-colors">Terms of Service</Link>
            <span className="text-slate-800">•</span>
            <Link href="#" className="hover:text-slate-300 transition-colors">Accessibility Code</Link>
          </div>

          {/* SOCIAL HANDLES (Clean typography instead of box shapes) */}
          <div className="flex items-center gap-6">
            {[
              { name: "𝕏", url: "#" },
              { name: "LinkedIn", url: "#" },
              { name: "Instagram", url: "#" },
              { name: "Substack", url: "#" },
            ].map((social, idx) => (
              <a 
                key={idx} 
                href={social.url}
                className="text-slate-500 hover:text-amber-400 font-mono tracking-tight transition-colors"
              >
                [{social.name}]
              </a>
            ))}
          </div>

        </div>

      </div>
    </footer>
  );
}