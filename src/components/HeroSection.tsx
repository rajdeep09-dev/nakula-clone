'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function HeroSection() {
  const words = "Beyond Visuals. Built with Vision.".split(" ");
  
  return (
    <section className="relative w-full h-screen overflow-hidden bg-background flex flex-col justify-end items-end p-6 md:p-10">
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-60 grayscale"
      >
        <source src="/videos/Qc6dhglAiYjaI04EEF5RsqHBU.mp4" type="video/mp4" />
      </video>
      
      <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent z-10" />

      <div className="relative z-20 flex flex-col items-end text-right max-w-4xl">
        <h1 className="font-anton text-[12vw] md:text-[8vw] leading-[0.9] uppercase text-white mb-6 overflow-hidden">
          {words.map((word, i) => (
            <motion.span
              key={i}
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{
                duration: 1,
                delay: i * 0.1,
                ease: [0.16, 1, 0.3, 1]
              }}
              className="inline-block mr-[0.2em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>
        
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="font-geist text-lg md:text-2xl font-semibold text-foreground max-w-[500px] text-balance"
        >
          We build brands, websites, and digital experiences with intention, clarity and care.
        </motion.p>
      </div>
    </section>
  );
}
