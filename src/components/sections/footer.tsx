"use client";

import React, { useMemo } from "react";
import { motion, type Variants } from "framer-motion";
import Image from "next/image";
import { 
  ArrowUpRight,
  Mail,
  Phone,
  Globe,
  Zap,
  ShieldCheck,
  Award
} from "lucide-react";
import { UltraButton, GlassBadge } from "@/components/ui/premium-primitives";

/**
 * ============================================================================
 * TYPE DEFINITIONS & DATA
 * ============================================================================
 */

interface FooterLink {
  label: string;
  href: string;
  isExternal?: boolean;
}

interface FooterCategory {
  title: string;
  links: FooterLink[];
}

const FOOTER_DATA: FooterCategory[] = [
  {
    title: "Explore",
    links: [
      { label: "Home", href: "/" },
      { label: "About Me", href: "/about" },
      { label: "Work Archive", href: "/projects" },
      { label: "Latest Blogs", href: "/blogs" },
      { label: "Labs & Experiments", href: "/labs" },
    ]
  },
  {
    title: "Platform",
    links: [
      { label: "Links & Socials", href: "/links" },
      { label: "Hardware & Soft", href: "/uses" },
      { label: "Public Guestbook", href: "/guestbook" },
      { label: "Privacy Policy", href: "/privacy" },
      { label: "Terms of Service", href: "/terms" },
    ]
  },
  {
    title: "Connect",
    links: [
      { label: "Twitter (X)", href: "https://twitter.com", isExternal: true },
      { label: "GitHub Profile", href: "https://github.com/ksparth12", isExternal: true },
      { label: "LinkedIn", href: "https://linkedin.com", isExternal: true },
      { label: "Dribbble", href: "https://dribbble.com", isExternal: true },
      { label: "Instagram", href: "https://instagram.com", isExternal: true },
    ]
  }
];

/**
 * ============================================================================
 * ANIMATION VARIANTS
 * ============================================================================
 */

const linkVariants: Variants = {
  initial: { x: 0 },
  hover: { 
    x: 6, 
    transition: { type: "spring", stiffness: 400, damping: 10 } 
  }
};

/**
 * ============================================================================
 * MAIN COMPONENT: ULTRA FOOTER
 * Features: High-fidelity layout, Interactive link physics, Brand recognition
 * area, Social verification badges, Performance-optimized mobile stacks.
 * ============================================================================
 */

export function Footer(): React.JSX.Element {
  const currentYear = useMemo(() => new Date().getFullYear(), []);

  return (
    <footer className="relative border-t border-white/5 bg-black pt-32 pb-12 overflow-hidden">
      
      {/* ── BACKGROUND DECORATION ─────────────────────────── */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-accent/50 to-transparent opacity-20" />
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-accent/5 blur-[120px] rounded-full" />

      <div className="mx-auto max-w-7xl px-6 relative z-10">
        
        {/* 1. TOP AREA: BRAND & CTAs */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-32">
          
          {/* Brand Info */}
          <div className="lg:col-span-5 flex flex-col gap-10">
            <div className="flex flex-col gap-6">
              <div className="flex items-center gap-4">
                <div className="relative h-16 w-16 overflow-hidden rounded-[20px] border border-white/10 bg-white/5 p-1">
                  <Image 
                    src="/logos/PS-transparent-darkmode.svg" 
                    alt="Parth Sharma" 
                    fill 
                    className="object-contain p-3" 
                  />
                </div>
                <div className="flex flex-col">
                  <span className="text-2xl font-black tracking-tighter text-white">Parth Sharma</span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-accent">Problem Solver & Founder</span>
                </div>
              </div>
              <p className="text-lg text-white/40 leading-relaxed max-w-md font-medium italic">
                &ldquo;Design is not just what it looks like and feels like. Design is how it works.&rdquo;
              </p>
            </div>

            {/* Social Verification Badges */}
            <div className="flex flex-wrap gap-3">
              <GlassBadge variant="default" className="bg-white/[0.03]">
                <ShieldCheck size={10} className="text-emerald-400" />
                Verified Identity
              </GlassBadge>
              <GlassBadge variant="default" className="bg-white/[0.03]">
                <Award size={10} className="text-amber-400" />
                Award Winning Dev
              </GlassBadge>
              <GlassBadge variant="default" className="bg-white/[0.03]">
                <Zap size={10} className="text-blue-400" />
                Top 1% React
              </GlassBadge>
            </div>

            {/* Newsletter / Stay in touch */}
            <div className="flex flex-col gap-4">
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Subscribe to my thoughts</span>
              <div className="flex gap-2 p-1.5 rounded-2xl bg-white/5 border border-white/10 focus-within:border-accent transition-all duration-500 max-w-sm">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 bg-transparent px-4 text-sm outline-none text-white placeholder:text-white/10" 
                />
                <UltraButton size="sm" variant="neon">Join</UltraButton>
              </div>
            </div>
          </div>

          {/* Nav Categories */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-3 gap-12">
            {FOOTER_DATA.map((cat) => (
              <div key={cat.title} className="flex flex-col gap-8">
                <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">
                  {cat.title}
                </span>
                <ul className="flex flex-col gap-4">
                  {cat.links.map((link) => (
                    <motion.li 
                      key={link.label}
                      initial="initial"
                      whileHover="hover"
                    >
                      <motion.a 
                        href={link.href}
                        target={link.isExternal ? "_blank" : undefined}
                        variants={linkVariants}
                        className="group flex items-center gap-2 text-sm font-bold text-white/40 hover:text-white transition-colors"
                      >
                        {link.label}
                        {link.isExternal && <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-opacity" />}
                      </motion.a>
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 2. MIDDLE AREA: CONTACT BAR */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 p-10 rounded-[32px] border border-white/5 bg-white/[0.02] mb-24 relative overflow-hidden group/bar">
          <div className="absolute inset-0 bg-gradient-to-r from-accent/5 via-transparent to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity duration-1000" />
          
          <ContactItem 
            icon={Mail} 
            label="Email Me" 
            value="hello@parthh.in" 
            href="mailto:hello@parthh.in"
          />
          <ContactItem 
            icon={Phone} 
            label="Call Me" 
            value="+91 ••• ••• ••••" 
            href="tel:#"
          />
          <ContactItem 
            icon={Globe} 
            label="Work Inquiry" 
            value="Book a Strategy Session" 
            href="/book-call"
          />
        </div>

        {/* 3. BOTTOM AREA: COPYRIGHT & LEGAL */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-8 border-t border-white/5 pt-12">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <p className="text-xs font-bold text-white/20 tracking-wide">
              © {currentYear} Parth Sharma. All Rights Reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacy" className="text-[10px] font-black uppercase tracking-widest text-white/10 hover:text-white transition-colors">Privacy</a>
              <a href="/terms" className="text-[10px] font-black uppercase tracking-widest text-white/10 hover:text-white transition-colors">Terms</a>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
              Hand-coded with 
            </span>
            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10">
              <Zap size={10} className="text-accent fill-accent" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/40">Next.js 14</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── MASSIVE WATERMARK ───────────────────────────────── */}
      <div className="absolute -bottom-24 left-1/2 -translate-x-1/2 pointer-events-none select-none overflow-hidden w-full text-center">
        <span className="text-[20vw] font-black text-white/[0.02] tracking-[-0.1em] whitespace-nowrap">
          PARTH SHARMA
        </span>
      </div>
    </footer>
  );
}

/**
 * Internal Helper: Contact Item
 * Modular component for the contact bar.
 */
function ContactItem({ 
  icon: Icon, 
  label, 
  value, 
  href 
}: { 
  icon: React.ElementType; 
  label: string; 
  value: string; 
  href: string;
}) {
  return (
    <a href={href} className="flex items-center gap-5 group">
      <div className="h-14 w-14 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 group-hover:bg-accent/20 group-hover:border-accent/30 transition-all duration-500">
        <Icon size={24} className="text-white/20 group-hover:text-accent transition-colors" />
      </div>
      <div className="flex flex-col">
        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">{label}</span>
        <span className="text-sm font-bold text-white group-hover:text-accent transition-colors tracking-tight">{value}</span>
      </div>
    </a>
  );
}

/**
 * End of File: footer.tsx
 * Total anticipated length: ~300+ lines including structured data and styles.
 * ============================================================================
 */
