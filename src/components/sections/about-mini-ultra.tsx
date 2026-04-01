"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import Image from "next/image";
import { 
  Github, 
  Linkedin, 
  Twitter, 
  ArrowRight,
  Sparkles
} from "lucide-react";
// Internal Primitives
import { Reveal } from "@/components/motion/reveal";

/**
 * ============================================================================
 * MAIN COMPONENT: ABOUT MINI ULTRA
 * Features: Cascading photo stack, Narrative-driven bio, 
 * Parallax depth layers, and interactive social connectors.
 * ============================================================================
 */

export function AboutMiniUltra(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll for the photo stack parallax
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  // Photo translations
  const photo1Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig);
  const photo2Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -150]), springConfig);
  const photo3Y = useSpring(useTransform(scrollYProgress, [0, 1], [0, -50]), springConfig);

  return (
    <section 
      ref={containerRef}
      className="relative py-32 md:py-48 bg-black overflow-hidden"
    >
      <div className="mx-auto max-w-7xl px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-20">
          
          {/* 1. LEFT SIDE: CONTENT */}
          <div className="flex-1 flex flex-col gap-12">
            <div className="flex flex-col gap-6">
              <Reveal blur>
                <div className="flex items-center gap-3">
                  <div className="h-px w-8 bg-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40 italic">A Quick Glance</span>
                </div>
              </Reveal>
              
              <Reveal delay={0.1} direction="down">
                <h2 className="text-5xl md:text-8xl font-black text-white leading-tight tracking-tighter">
                  Building the bridge between <span className="text-accent italic">ideas</span> and <span className="text-white/20">experiences</span>
                </h2>
              </Reveal>
            </div>

            <div className="flex flex-col gap-8">
              <Reveal delay={0.2}>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                  I&apos;m Parth Sharma, an engineering-driven developer who turns 
                  complex technical challenges into high-speed web products. I 
                  manage the entire stack with a focus on clean, reusable code 
                  and seamless performance. I excel in Next.js and full-stack 
                  architecture, always delivering modern solutions that actually 
                  solve problems for every user.
                </p>
              </Reveal>

              <Reveal delay={0.3}>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                  As the founder of Rune, I manage platforms like Rune AI and 
                  Rune Hub. Building a startup ecosystem has taught me how to 
                  ship products that scale.
                </p>
              </Reveal>

              <Reveal delay={0.4}>
                <p className="text-lg md:text-xl text-white/60 leading-relaxed font-medium">
                  My code is built to last, helping your startup reach the next 
                  level !
                </p>
              </Reveal>
            </div>

            <div className="flex items-center gap-8">
              <div className="flex items-center gap-4">
                {[Linkedin, Github, Twitter].map((Icon, i) => (
                  <Reveal key={i} delay={0.5 + (i * 0.1)} direction="up">
                    <a href="#" className="text-white/20 hover:text-white transition-colors">
                      <Icon size={20} strokeWidth={2.5} />
                    </a>
                  </Reveal>
                ))}
              </div>
              <Reveal delay={0.8}>
                <button className="flex items-center gap-2 group text-sm font-black text-white uppercase tracking-widest hover:text-accent transition-colors">
                  Dive deeper <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Reveal>
            </div>
          </div>

          {/* 2. RIGHT SIDE: PHOTO STACK */}
          <div className="relative flex-1 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[500px] aspect-[4/5]">
              
              {/* Photo 1 (Back) */}
              <motion.div 
                style={{ y: photo1Y }}
                className="absolute top-0 left-0 w-[70%] aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-[-6deg] z-0"
              >
                <Image src="/images/avatar.jpeg" alt="Journey" fill className="object-cover grayscale" />
              </motion.div>

              {/* Photo 2 (Middle) */}
              <motion.div 
                style={{ y: photo2Y }}
                className="absolute top-10 right-0 w-[75%] aspect-[3/4] rounded-3xl overflow-hidden border border-white/10 shadow-2xl rotate-[4deg] z-10"
              >
                <Image src="/images/avatar.jpeg" alt="Creation" fill className="object-cover grayscale hover:grayscale-0 transition-all duration-700" />
              </motion.div>

              {/* Photo 3 (Front) */}
              <motion.div 
                style={{ y: photo3Y }}
                className="absolute -bottom-10 left-1/4 w-[80%] aspect-[3/4] rounded-[40px] overflow-hidden border-2 border-white/5 shadow-2xl rotate-[-2deg] z-20"
              >
                <Image src="/images/avatar.jpeg" alt="Vision" fill className="object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Micro info on photo */}
                <div className="absolute bottom-8 left-8 flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full glass flex items-center justify-center border-white/20">
                    <Sparkles size={16} className="text-accent" />
                  </div>
                  <span className="text-xs font-black text-white uppercase tracking-widest drop-shadow-lg">Captured Journey</span>
                </div>
              </motion.div>

            </div>
          </div>

        </div>
      </div>

      {/* Decorative background visual */}
      <div className="absolute top-1/2 right-0 -translate-y-1/2 w-[40%] h-[40%] bg-accent/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
}

/**
 * End of File: about-mini-ultra.tsx
 * Total anticipated length: ~150+ lines focusing on high-end visual layering.
 * ============================================================================
 */
