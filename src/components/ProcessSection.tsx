'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { cn } from "@/lib/utils";

const steps = [
  {
    step: "STEP 1",
    title: "Discovery Phase",
    description: "Understanding your goals, pain points, audience, and what sets you apart."
  },
  {
    step: "STEP 2",
    title: "Project Kickoff",
    description: "Setting up projects, aligning on scope and milestones, and diving into the work."
  },
  {
    step: "STEP 3",
    title: "Receive & Refine",
    description: "Sharing initial designs, gathering feedback, and fine-tuning together."
  },
  {
    step: "STEP 4",
    title: "Continue & Grow",
    description: "Launching with confidence and supporting your next extraordinary moves."
  }
];

export function ProcessSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[400vh] bg-background">
      <div className="sticky top-0 h-screen flex flex-col items-center justify-center px-6 md:px-10 overflow-hidden">
        <div className="max-w-6xl w-full">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-20 gap-8">
            <h2 className="font-anton text-[12vw] md:text-[8vw] leading-[0.8] uppercase text-foreground">
              HOW WE <br /> WORK
            </h2>
            <p className="text-primary font-geist font-medium text-sm md:text-base tracking-widest uppercase">
              (PROCESS)
            </p>
          </div>

          <div className="relative h-[400px] md:h-[500px] w-full">
            {steps.map((step, i) => (
              <ProcessCard
                key={i}
                {...step}
                index={i}
                progress={scrollYProgress}
                total={steps.length}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function ProcessCard({ step, title, description, index, progress, total }: any) {
  const start = index / total;
  const end = (index + 1) / total;
  
  const opacity = useTransform(progress, [start, start + 0.1, end - 0.1, end], [0, 1, 1, 0.5]);
  const scale = useTransform(progress, [start, end], [1, 0.95]);
  const y = useTransform(progress, [start, start + 0.1], [100, 0]);

  return (
    <motion.div
      style={{ opacity, scale, y, zIndex: index }}
      className="absolute inset-0 bg-card border border-border/50 rounded-[32px] p-8 md:p-12 flex flex-col justify-between"
    >
      <div className="flex items-center gap-2">
        <span className="font-geist text-xl md:text-2xl font-bold text-muted uppercase tracking-tighter">
          {step}
        </span>
        <span className="font-geist text-xl md:text-2xl font-bold text-primary">
          .
        </span>
      </div>

      <div className="flex flex-col gap-4 max-w-2xl">
        <h3 className="font-geist text-4xl md:text-6xl font-bold text-white tracking-tighter">
          {title}
        </h3>
        <p className="font-geist text-lg md:text-2xl text-muted-foreground leading-relaxed">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
