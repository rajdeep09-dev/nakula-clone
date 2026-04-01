"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Command } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Magnetic } from "@/components/motion/magnetic";

const LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Work", href: "/projects" },
  { label: "Blogs", href: "/blogs" },
];

export function Navbar(): React.JSX.Element {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = (): void => { setScrolled(window.scrollY > 20); };
    window.addEventListener("scroll", fn, { passive: true });
    return () => { window.removeEventListener("scroll", fn); };
  }, []);

  return (
    <>
      <motion.nav className={cn("fixed top-0 left-0 right-0 z-50 transition-all duration-500 py-4", scrolled ? "glass-strong border-b border-white/10" : "bg-transparent")}
        initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}>
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
          <div className="flex items-center gap-8">
            <a href="/" className="flex items-center gap-2 group">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/10 group-hover:border-white/30 transition-colors">
                <Image src="/logos/PS-transparent-darkmode.svg" alt="Parth Sharma" fill className="object-contain p-1" />
              </div>
              <span className="text-sm font-medium tracking-tight text-white/80 group-hover:text-white transition-colors hidden sm:inline-block">Parth Sharma</span>
            </a>
            <div className="hidden items-center gap-1 md:flex rounded-full bg-white/5 p-1 border border-white/5">
              {LINKS.map((l) => (
                <a key={l.href} href={l.href} className="px-4 py-1.5 text-sm text-white/60 transition-all hover:text-white hover:bg-white/10 rounded-full">{l.label}</a>
              ))}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/5 text-xs text-white/40">
              <Command size={12} />
              <span>Command Menu</span>
            </div>
            <Magnetic strength={0.15}>
              <a href="/book-call" className="inline-flex h-10 items-center rounded-full bg-white px-6 text-sm font-bold text-black transition-transform hover:scale-105 active:scale-95">Book a Call</a>
            </Magnetic>
            <button className="md:hidden text-foreground" onClick={() => setOpen(!open)} aria-label="Toggle menu">
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-black/95 backdrop-blur-xl md:hidden"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}>
            {LINKS.map((l, i) => (
              <motion.a key={l.href} href={l.href} className="py-4 text-3xl font-bold text-white"
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 20 }}
                transition={{ delay: i * 0.08, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                onClick={() => setOpen(false)}>{l.label}</motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
