"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { Reveal } from "@/components/motion/reveal";
import { AuroraBackground } from "@/components/motion/background";
import { Badge } from "@/components/ui/badge";

export function Hero(): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.9]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, 100]);

  return (
    <section ref={ref} className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 pt-20">
      <AuroraBackground className="opacity-40" />
      
      <motion.div className="relative z-10 flex w-full max-w-7xl flex-col items-start" style={{ opacity, scale, y }}>
        <div className="flex w-full flex-col md:flex-row md:items-end md:justify-between gap-8">
          <div className="flex flex-col gap-4">
            <Reveal direction="down" delay={0.1}>
              <div className="flex items-center gap-2">
                <Image src="/icons/emerald.svg" alt="" width={16} height={16} className="animate-pulse" />
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-accent">Creative Engineer</span>
              </div>
            </Reveal>
            <Reveal direction="none" delay={0.2}>
              <h1 className="text-display-hero text-white select-none">Parth</h1>
            </Reveal>
          </div>
          
          <div className="flex flex-col gap-6 md:text-right md:items-end max-w-md">
            <Reveal delay={0.4}>
              <p className="text-xl md:text-2xl font-medium leading-tight text-white/90">
                I design and build products that <span className="text-white font-bold">deliver real impact.</span>
              </p>
            </Reveal>
            <div className="flex flex-wrap gap-3 md:justify-end">
              <Reveal delay={0.5} direction="right">
                <Badge variant="outline" className="bg-white/5 border-white/10 py-2 px-4">
                  BASED IN Noida, INDIA
                </Badge>
              </Reveal>
              <Reveal delay={0.6} direction="right">
                <Badge variant="outline" className="bg-white/5 border-white/10 py-2 px-4">
                  Full Stack Dev, & DESIGNER
                </Badge>
              </Reveal>
            </div>
          </div>
        </div>

        <div className="mt-20 flex w-full flex-col md:flex-row items-center justify-between gap-12">
          <Reveal delay={0.8} className="relative aspect-square w-full max-w-[400px] overflow-hidden rounded-2xl border border-white/10 grayscale hover:grayscale-0 transition-all duration-700">
            <Image src="/images/avatar.jpeg" alt="Parth Sharma" fill className="object-cover" priority />
          </Reveal>
          
          <div className="flex flex-1 flex-col gap-4 md:items-start text-left">
            <Reveal delay={1.0}>
              <h2 className="text-sm font-bold uppercase tracking-widest text-white/40">Crafting modern experiences</h2>
            </Reveal>
            <div className="flex flex-col gap-2">
              <Reveal delay={1.1} direction="left"><h3 className="text-display-xl text-white">VENTURE</h3></Reveal>
              <Reveal delay={1.2} direction="left"><h3 className="text-display-xl text-white/20">SHOWCASE</h3></Reveal>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
