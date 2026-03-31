'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { NakulaLogo } from "./icons";

export function ContactSection() {
  return (
    <section className="relative bg-background pt-32 pb-10 px-6 md:px-10 border-t border-border/50">
      <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="font-anton text-[15vw] md:text-[10vw] leading-[0.8] uppercase text-foreground mb-8"
        >
          LET’S WORK <br /> TOGETHER
        </motion.h2>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="font-geist text-lg md:text-2xl text-muted-foreground max-w-2xl mb-12"
        >
          Have a project in mind? We’d love to hear about it. Let’s create something great together!
        </motion.p>

        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          className="bg-white text-black px-10 py-5 rounded-full text-sm font-bold uppercase tracking-[0.2em] hover:bg-primary hover:text-white transition-all duration-300"
        >
          GET IN TOUCH
        </motion.button>

        <div className="w-full mt-32 pt-10 border-t border-border/30 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-8">
            <NakulaLogo className="w-24 text-white/50" />
            <span className="text-xs font-medium text-muted uppercase tracking-widest">
              © 2026 NAKULA STUDIO. ALL RIGHTS RESERVED.
            </span>
          </div>
          
          <div className="flex gap-6">
            {['Instagram', 'Dribbble', 'LinkedIn'].map((social) => (
              <a
                key={social}
                href="#"
                className="text-xs font-bold uppercase tracking-widest text-muted hover:text-primary transition-colors"
              >
                {social}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
