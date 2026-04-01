"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Reveal, StaggerReveal, staggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";

const SKILLS = [
  { name: "ReactJS", icon: "React_dark.svg" },
  { name: "NextJS", icon: "nextjs_icon_dark.svg" },
  { name: "TypeScript", icon: "typescript.svg" },
  { name: "Tailwind CSS", icon: "tailwindcss.svg" },
  { name: "Motion", icon: "Motion_dark.svg" },
  { name: "NodeJS", icon: "nodejs.svg" },
  { name: "PostgreSQL", icon: "postgresql.svg" },
  { name: "MongoDB", icon: "MongoDB_dark.svg" },
  { name: "Prisma", icon: "Prisma_dark.svg" },
  { name: "Vercel", icon: "Vercel_dark.svg" },
  { name: "AWS", icon: "Amazon Web Services_dark.svg" },
  { name: "Docker", icon: "docker.svg" },
];

export function Skillset(): React.JSX.Element {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Rotating Image Side */}
          <div className="relative flex-1 flex justify-center">
            <Reveal direction="none" delay={0.2} className="relative h-[300px] w-[300px] md:h-[500px] md:w-[500px]">
              <div className="absolute inset-0 bg-accent/20 blur-[100px] rounded-full animate-pulse" />
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="relative h-full w-full"
              >
                <Image src="/images/steel-flower.webp" alt="" fill className="object-contain" />
              </motion.div>
            </Reveal>
          </div>

          {/* Text & Grid Side */}
          <div className="flex-1 flex flex-col gap-8">
            <div className="flex flex-col gap-4">
              <Reveal blur><p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">My Skillset</p></Reveal>
              <Reveal delay={0.1} direction="left">
                <h2 className="text-5xl md:text-7xl font-black text-white">The Magic Behind</h2>
              </Reveal>
            </div>

            <StaggerReveal className="grid grid-cols-3 sm:grid-cols-4 gap-4" staggerDelay={0.05}>
              {SKILLS.map((s) => (
                <motion.div key={s.name} variants={staggerItem}>
                  <SpotlightCard className="p-4 flex flex-col items-center gap-3 border-white/5 bg-white/[0.02] hover:bg-white/[0.05] transition-colors group">
                    <div className="relative h-10 w-10 grayscale group-hover:grayscale-0 transition-all duration-500">
                      <Image src={`/icons/${s.icon}`} alt={s.name} fill className="object-contain" />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-white/40 group-hover:text-white transition-colors">{s.name}</span>
                  </SpotlightCard>
                </motion.div>
              ))}
            </StaggerReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
