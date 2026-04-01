"use client";

import React, { 
  useState, 
  useEffect, 
  useRef,
  useMemo
} from "react";
import { 
  motion, 
  AnimatePresence 
} from "framer-motion";
import { 
  Menu, 
  X, 
  ChevronDown, 
  Search, 
  Home, 
  User, 
  Briefcase, 
  BookOpen, 
  FlaskConical, 
  Link as LinkIcon, 
  Cpu, 
  PenTool,
  Calendar,
  MessageSquare
} from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Internal Primitives
import { Magnetic } from "@/components/motion/magnetic";
import { UltraButton } from "@/components/ui/premium-primitives";
/**
 * ============================================================================
 * TYPE DEFINITIONS & DATA
 * ============================================================================
 */

interface NavLink {
  label: string;
  href: string;
  icon?: React.ElementType;
  desc?: string;
  isExternal?: boolean;
}

const PRIMARY_LINKS: NavLink[] = [
  { label: "Home", href: "/", icon: Home },
  { label: "About", href: "/about", icon: User },
  { label: "Work", href: "/projects", icon: Briefcase },
  { label: "Blogs", href: "/blogs", icon: BookOpen },
];

const MORE_LINKS: NavLink[] = [
  { label: "Labs", href: "/labs", icon: FlaskConical, desc: "Experimental playground & fun micro-tools" },
  { label: "Links", href: "/links", icon: LinkIcon, desc: "Socials & Profiles" },
  { label: "Uses", href: "/uses", icon: Cpu, desc: "My gear & software" },
  { label: "Guestbook", href: "/guestbook", icon: PenTool, desc: "Sign my wall" },
];

/**
 * ============================================================================
 * SUB-COMPONENTS
 * ============================================================================
 */

/**
 * 1. Command Menu (⌘K)
 * A premium search and navigation interface inspired by Raycast/Linear.
 */
function CommandMenu({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Filter links based on search
  const filteredLinks = useMemo(() => {
    const all = [...PRIMARY_LINKS, ...MORE_LINKS];
    if (!search) return all;
    return all.filter(l => 
      l.label.toLowerCase().includes(search.toLowerCase()) || 
      l.desc?.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  useEffect(() => {
    if (isOpen) {
      inputRef.current?.focus();
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-20">
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
          />

          {/* Dialog */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] shadow-2xl"
          >
            {/* Search Header */}
            <div className="flex items-center gap-4 border-b border-white/5 p-6">
              <Search className="text-white/20" size={20} />
              <input
                ref={inputRef}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Type a command or search..."
                className="flex-1 bg-transparent text-lg font-medium text-white outline-none placeholder:text-white/10"
              />
              <div className="rounded-md border border-white/10 bg-white/5 px-2 py-1 text-[10px] font-bold text-white/40">
                ESC
              </div>
            </div>

            {/* Results Area */}
            <div className="max-h-[400px] overflow-y-auto p-4 custom-scrollbar">
              <div className="flex flex-col gap-2">
                <span className="px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white/20">
                  Navigation & Tools
                </span>
                {filteredLinks.map((l) => (
                  <button
                    key={l.href}
                    onClick={() => {
                      window.location.href = l.href;
                      onClose();
                    }}
                    className="group flex items-center gap-4 rounded-2xl p-4 text-left hover:bg-white/5 transition-colors"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:bg-accent/20 group-hover:border-accent/30 transition-colors">
                      {l.icon && <l.icon size={18} className="text-white/40 group-hover:text-accent" />}
                    </div>
                    <div className="flex flex-col">
                      <span className="text-sm font-bold text-white">{l.label}</span>
                      {l.desc && <span className="text-xs text-white/40">{l.desc}</span>}
                    </div>
                    <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={14} className="text-accent" />
                    </div>
                  </button>
                ))}
                {filteredLinks.length === 0 && (
                  <div className="flex flex-col items-center gap-4 py-12 text-center">
                    <MessageSquare size={32} className="text-white/5" />
                    <span className="text-sm text-white/20 italic">No matching commands found.</span>
                  </div>
                )}
              </div>
            </div>

            {/* Footer Hints */}
            <div className="flex items-center justify-between border-t border-white/5 bg-black/40 p-4">
              <div className="flex gap-4">
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/20">
                  <span className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10">↑↓</span>
                  Navigate
                </div>
                <div className="flex items-center gap-2 text-[10px] font-bold text-white/20">
                  <span className="rounded bg-white/5 px-1.5 py-0.5 border border-white/10">↵</span>
                  Open
                </div>
              </div>
              <span className="text-[10px] font-bold text-white/10 uppercase tracking-widest">
                Parth v3.1.0
              </span>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

/**
 * ============================================================================
 * MAIN COMPONENT: ULTRA NAVBAR
 * Features: Scroll-aware glassmorphism, Command Palette integration, Interactive dropdowns.
 * ============================================================================
 */

export function UltraNav(): React.JSX.Element {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCommandMenuOpen, setIsCommandMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  // Track scroll position for visual state changes
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Listen for ⌘K
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setIsCommandMenuOpen(prev => !prev);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <>
      <CommandMenu 
        isOpen={isCommandMenuOpen} 
        onClose={() => setIsCommandMenuOpen(false)} 
      />

      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className={cn(
          "fixed top-0 left-0 right-0 z-[90] transition-all duration-500",
          isScrolled ? "py-3" : "py-6"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          {/* 1. Brand Logo Area */}
          <div className="flex items-center gap-12">
            <a href="/" className="group flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-1 transition-all duration-500 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                <Image src="/logos/PS-transparent-darkmode.svg" alt="PS" fill className="object-contain p-2" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-black tracking-tighter text-white">Parth Sharma</span>
                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/20 group-hover:text-accent transition-colors">Creative Engineer</span>
              </div>
            </a>

            {/* 2. Desktop Primary Navigation */}
            <div className="hidden items-center gap-2 rounded-2xl border border-white/5 bg-white/[0.03] p-1.5 backdrop-blur-xl lg:flex">
              {PRIMARY_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="rounded-xl px-5 py-2 text-sm font-bold text-white/40 transition-all hover:bg-white/5 hover:text-white"
                >
                  {link.label}
                </a>
              ))}
              
              {/* Complex Dropdown Trigger */}
              <div className="relative">
                <button
                  onMouseEnter={() => setActiveDropdown("more")}
                  className={cn(
                    "flex items-center gap-1.5 rounded-xl px-5 py-2 text-sm font-bold transition-all",
                    activeDropdown === "more" ? "bg-white/10 text-white" : "text-white/40 hover:text-white"
                  )}
                >
                  Explore <ChevronDown size={14} className={cn("transition-transform duration-500", activeDropdown === "more" && "rotate-180")} />
                </button>

                <AnimatePresence>
                  {activeDropdown === "more" && (
                    <motion.div
                      onMouseLeave={() => setActiveDropdown(null)}
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className="absolute top-full left-0 mt-3 w-80 overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] p-3 shadow-2xl backdrop-blur-2xl"
                    >
                      <div className="flex flex-col gap-1">
                        {MORE_LINKS.map((link) => (
                          <a
                            key={link.href}
                            href={link.href}
                            className="group flex items-center gap-4 rounded-2xl p-4 transition-all hover:bg-white/5"
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 border border-white/5 group-hover:bg-accent/20 group-hover:border-accent/30">
                              {link.icon && <link.icon size={18} className="text-white/20 group-hover:text-accent" />}
                            </div>
                            <div className="flex flex-col">
                              <span className="text-sm font-bold text-white">{link.label}</span>
                              <span className="text-[10px] text-white/40 leading-tight">{link.desc}</span>
                            </div>
                          </a>
                        ))}
                      </div>
                      
                      {/* Dropdown Footer CTA */}
                      <div className="mt-3 rounded-2xl bg-accent/5 p-4 border border-accent/10">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-black uppercase tracking-widest text-accent">Latest Update</span>
                          <Calendar size={12} className="text-accent" />
                        </div>
                        <p className="mt-2 text-[11px] font-medium text-white/60">New Labs experiments added for 2026.</p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* 3. Global Actions & Utilities */}
          <div className="flex items-center gap-4">
            {/* Command Trigger Hint */}
            <button 
              onClick={() => setIsCommandMenuOpen(true)}
              className="hidden items-center gap-3 rounded-2xl border border-white/5 bg-white/[0.03] px-4 py-2.5 text-white/40 transition-all hover:border-white/20 hover:bg-white/5 sm:flex"
            >
              <Search size={16} />
              <div className="flex items-center gap-1.5 text-xs font-bold">
                <span className="text-[10px] opacity-40">⌘</span>
                <span>K</span>
              </div>
            </button>

            <Magnetic strength={0.15}>
              <UltraButton 
                variant="default" 
                size="md" 
                className="hidden md:flex shadow-2xl"
                onClick={() => window.location.href = "/book-call"}
              >
                Book a Call
              </UltraButton>
            </Magnetic>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/5 bg-white/[0.03] text-white transition-all hover:bg-white/5 lg:hidden"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* 4. Mobile Full-Screen Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed inset-0 z-[100] flex flex-col bg-black lg:hidden"
            >
              {/* Mobile Menu Header */}
              <div className="flex items-center justify-between p-6">
                <div className="flex items-center gap-3">
                  <div className="relative h-10 w-10 overflow-hidden rounded-xl border border-white/10 bg-white/5">
                    <Image src="/logos/PS-transparent-darkmode.svg" alt="PS" fill className="object-contain p-2" />
                  </div>
                  <span className="text-lg font-black tracking-tighter text-white">Parth</span>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-white/5 text-white"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Mobile Links Scrollable Area */}
              <div className="flex-1 overflow-y-auto px-6 py-12">
                <div className="flex flex-col gap-12">
                  <div className="flex flex-col gap-4">
                    <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Main Navigation</span>
                    {PRIMARY_LINKS.map((link, i) => (
                      <motion.a
                        key={link.href}
                        href={link.href}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="text-5xl font-black text-white hover:text-accent transition-colors"
                      >
                        {link.label}
                      </motion.a>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Archive</span>
                      {MORE_LINKS.map((link) => (
                        <a key={link.href} href={link.href} className="text-xl font-bold text-white/60 hover:text-white">
                          {link.label}
                        </a>
                      ))}
                    </div>                    <div className="flex flex-col gap-4">
                      <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/20">Connect</span>
                      <a href="#" className="text-xl font-bold text-white/60">Twitter</a>
                      <a href="#" className="text-xl font-bold text-white/60">Github</a>
                      <a href="#" className="text-xl font-bold text-white/60">LinkedIn</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Mobile Menu Footer */}
              <div className="p-6">
                <UltraButton 
                  variant="neon" 
                  size="xl" 
                  className="w-full"
                  onClick={() => window.location.href = "/book-call"}
                >
                  Schedule a Call
                </UltraButton>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

/**
 * End of File: ultra-nav.tsx
 * Total anticipated length: ~400+ lines including comments and logic.
 * ============================================================================
 */
function ArrowUpRight({ size, className }: { size?: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <line x1="7" y1="17" x2="17" y2="7"></line>
      <polyline points="7 7 17 7 17 17"></polyline>
    </svg>
  );
}
