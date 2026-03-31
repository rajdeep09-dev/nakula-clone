'use client';

import { NakulaLogo } from "./icons";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export function Navigation() {
  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-0 left-0 w-full h-[75px] px-6 md:px-10 flex items-center justify-between z-50 mix-blend-difference"
    >
      <div className="flex items-center">
        <NakulaLogo className="w-[100px] md:w-[126px] text-white" />
      </div>
      <div className="flex items-center gap-4">
        <button className="hidden md:block text-xs font-bold tracking-widest uppercase hover:text-primary transition-colors">
          LET'S TALK
        </button>
        <button className="bg-white text-black px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-primary hover:text-white transition-all duration-300">
          START A PROJECT
        </button>
      </div>
    </motion.nav>
  );
}
