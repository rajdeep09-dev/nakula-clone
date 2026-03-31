'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

export function AboutSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const text = "We combines years of web design and branding expertise to craft meaningful, story-driven experiences.";
  const words = text.split(" ");

  return (
    <section ref={containerRef} className="relative h-[200vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-10 overflow-hidden">
        <div className="max-w-5xl w-full text-left md:text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="text-primary font-geist font-medium mb-8 text-sm md:text-base tracking-widest uppercase"
          >
            (ABOUT)
          </motion.p>
          
          <h2 className="font-geist text-[8vw] md:text-[5vw] font-bold leading-[1.1] tracking-tighter text-muted">
            {words.map((word, i) => {
              const start = i / words.length;
              const end = (i + 1) / words.length;
              return (
                <Word key={i} progress={scrollYProgress} range={[start, end]}>
                  {word}
                </Word>
              );
            })}
          </h2>
        </div>
      </div>
    </section>
  );
}

function Word({ children, progress, range }: { children: string, progress: any, range: [number, number] }) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  const color = useTransform(progress, range, ["#555555", "#CACACA"]);
  
  return (
    <motion.span
      style={{ opacity, color }}
      className="inline-block mr-[0.2em] transition-colors"
    >
      {children}
    </motion.span>
  );
}
