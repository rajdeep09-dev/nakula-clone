"use client";

import { motion } from "framer-motion";
import { ExternalLink, Github, Code, Layout, Smartphone, Sparkles } from "lucide-react";
import { StaggerReveal, staggerItem, Reveal } from "@/components/motion/reveal";
import { TextReveal } from "@/components/motion/text";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { cn } from "@/lib/utils";

const PROJECTS = [
  { icon: Layout, title: "SaaS Dashboard", desc: "A high-performance dashboard with real-time analytics and complex data visualizations.", span: "md:col-span-2", tall: true },
  { icon: Sparkles, title: "AI Content Platform", desc: "Generating high-quality marketing copy using GPT-4 and custom fine-tuned models.", span: "", tall: false },
  { icon: Smartphone, title: "Mobile Fitness App", desc: "Cross-platform mobile application built with React Native and integrated with HealthKit.", span: "", tall: false },
  { icon: Code, title: "Open Source Library", desc: "A collection of reusable React components and hooks for building motion-first UIs.", span: "", tall: false },
  { icon: Github, title: "Developer Portfolio", desc: "The very site you are looking at — built with Next.js, Tailwind, and Framer Motion.", span: "md:col-span-2", tall: true },
];

export function BentoFeatures(): React.JSX.Element {
  return (
    <section id="projects" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <Reveal blur><p className="text-sm font-medium uppercase tracking-widest text-accent">Projects</p></Reveal>
          <TextReveal text="Selected Work" as="h2" className="mt-4 text-display-lg text-foreground" delay={0.1} />
          <Reveal delay={0.3} blur><p className="mt-4 text-lg text-muted-foreground">A collection of my recent projects and contributions.</p></Reveal>
        </div>

        <StaggerReveal className="mt-16 grid gap-4 md:grid-cols-3" staggerDelay={0.06}>
          {PROJECTS.map((p) => (
            <motion.div key={p.title} variants={staggerItem} className={cn(p.span)}>
              <SpotlightCard className={cn("h-full group", p.tall && "min-h-[220px]")}>
                <div className="flex justify-between items-start">
                  <div className="mb-4 inline-flex rounded-lg bg-accent/10 p-2.5">
                    <p.icon className="h-5 w-5 text-accent" />
                  </div>
                  <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                    <Github className="h-4 w-4 text-muted-foreground cursor-pointer hover:text-foreground" />
                  </div>
                </div>
                <h3 className="text-lg font-semibold text-card-foreground">{p.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                {p.tall && (
                  <div className="mt-4 flex gap-2">
                    {[1, 2, 3, 4].map((n) => (
                      <motion.div key={n} className="h-16 flex-1 rounded-md bg-accent/5"
                        initial={{ scaleY: 0 }} whileInView={{ scaleY: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 + n * 0.1, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                        style={{ transformOrigin: "bottom" }} />
                    ))}
                  </div>
                )}
              </SpotlightCard>
            </motion.div>
          ))}
        </StaggerReveal>
      </div>
    </section>
  );
}
