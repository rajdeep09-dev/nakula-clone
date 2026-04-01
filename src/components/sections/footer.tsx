"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const LINKS = {
  EXPLORE: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Work", href: "/projects" },
    { label: "Blogs", href: "/blogs" },
  ],
  MORE: [
    { label: "Labs", href: "/labs" },
    { label: "Links", href: "/links" },
    { label: "Uses", href: "/uses" },
    { label: "Guestbook", href: "/guestbook" },
  ],
  SOCIAL: [
    { label: "Twitter", href: "https://twitter.com" },
    { label: "Github", href: "https://github.com/ksparth12" },
    { label: "LinkedIn", href: "https://linkedin.com" },
    { label: "Dribbble", href: "https://dribbble.com" },
  ]
};

export function Footer(): React.JSX.Element {
  return (
    <footer className="relative border-t border-white/10 bg-black pt-24 pb-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-24 mb-24">
          <div className="md:col-span-1 flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <div className="relative h-12 w-12 overflow-hidden rounded-full border border-white/10">
                <Image src="/logos/PS-transparent-darkmode.svg" alt="Parth Sharma" fill className="object-contain p-1" />
              </div>
              <span className="text-xl font-black tracking-tighter text-white">Parth Sharma</span>
            </div>
            <p className="text-sm text-white/40 leading-relaxed">
              Problem Solver, Creative Engineer building the future. 
              Always open for interesting projects and collaborations.
            </p>
          </div>

          {Object.entries(LINKS).map(([cat, links]) => (
            <div key={cat} className="flex flex-col gap-6">
              <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/20">{cat}</span>
              <div className="flex flex-col gap-4">
                {links.map((l) => (
                  <motion.a key={l.label} href={l.href} target={l.href.startsWith('http') ? "_blank" : undefined}
                    className="text-sm font-medium text-white/60 hover:text-white transition-colors"
                    whileHover={{ x: 4 }}>
                    {l.label}
                  </motion.a>
                ))}
              </div>
            </div>
          ))}
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-t border-white/5 pt-12">
          <p className="text-xs text-white/20">© {new Date().getFullYear()} Parth Sharma. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">Crafted with ❤️ using Next.js</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
