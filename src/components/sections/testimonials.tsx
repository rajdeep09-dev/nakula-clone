"use client";

import { motion } from "framer-motion";
import { Reveal, StaggerReveal, staggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { TiltCard } from "@/components/motion/tilt-card";

const TESTIMONIALS = [
  { text: "Parth is an exceptional engineer with a keen eye for detail. His ability to translate complex designs into fluid, high-performance code is unmatched.", author: "Arjun Mehta", role: "Product Manager, TechFlow", avatar: "AM" },
  { text: "Working with Parth was a breeze. He took our project from a simple concept to a polished, world-class product in record time.", author: "Sarah Jenkins", role: "Founder, Spark AI", avatar: "SJ" },
  { text: "The motion-first approach Parth brings to development truly sets his work apart. Our users love the interactive feel of our new dashboard.", author: "David Chen", role: "CTO, Zenith Solutions", avatar: "DC" },
];

export function Testimonials(): React.JSX.Element {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col gap-4 mb-16">
          <Reveal blur><p className="text-sm font-bold uppercase tracking-[0.3em] text-accent text-center">What Others Say</p></Reveal>
          <Reveal delay={0.1} direction="down">
            <h2 className="text-5xl md:text-7xl font-black text-white text-center">The Voices Behind</h2>
          </Reveal>
        </div>

        <StaggerReveal className="grid gap-6 md:grid-cols-3" staggerDelay={0.08}>
          {TESTIMONIALS.map((t) => (
            <motion.div key={t.author} variants={staggerItem}>
              <TiltCard maxTilt={5} className="h-full">
                <SpotlightCard className="h-full flex flex-col gap-6 border-white/5 bg-white/[0.02]">
                  <p className="text-lg text-white/80 leading-relaxed italic">&ldquo;{t.text}&rdquo;</p>
                  <div className="mt-auto flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20 border border-accent/30 text-accent font-black">{t.avatar}</div>
                    <div className="flex flex-col">
                      <span className="font-bold text-white">{t.author}</span>
                      <span className="text-xs uppercase tracking-widest text-white/40">{t.role}</span>
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
