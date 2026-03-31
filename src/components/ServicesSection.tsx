'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useState } from "react";

const services = [
  {
    number: "01",
    title: "Web Design & Development",
    description: "Logos, colors, type, your brand, fully alive.",
    tags: ["Responsive Design", "Interaction Design", "CMS Integration", "SEO Optimization"]
  },
  {
    number: "02",
    title: "Branding",
    description: "Crafting visual identities that feel clear, timeless, and true to your brand.",
    tags: ["Logo Design", "Color System", "Typography", "Brand Direction"]
  },
  {
    number: "03",
    title: "Social Media",
    description: "Branded templates and content systems to help you stay consistent and scroll-worthy.",
    tags: ["Instagram Design", "Story Kits", "Content Templates", "Visual Consistency"]
  },
  {
    number: "04",
    title: "Motion Design",
    description: "Thoughtful animations that add rhythm, clarity, and life to your interface.",
    tags: ["Micro-interactions", "Scroll Effects", "Hover States", "Framer Motion"]
  }
];

export function ServicesSection() {
  return (
    <section className="relative bg-background py-24 px-6 md:px-10">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 md:mb-24 gap-8">
          <h2 className="font-anton text-[12vw] md:text-[8vw] leading-[0.8] uppercase text-foreground">
            HOW WE <br /> CAN HELP
          </h2>
          <p className="text-primary font-geist font-medium text-sm md:text-base tracking-widest uppercase">
            (SERVICES)
          </p>
        </div>

        <div className="flex flex-col">
          {services.map((service, i) => (
            <ServiceItem key={i} {...service} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceItem({ number, title, description, tags, index }: any) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative border-t border-border/50 py-10 md:py-16 cursor-pointer overflow-hidden"
    >
      <motion.div
        initial={false}
        animate={{
          backgroundColor: isHovered ? "rgba(255, 74, 37, 0.05)" : "transparent",
        }}
        className="absolute inset-0 -z-10"
      />

      <div className="flex flex-col md:flex-row gap-8 md:gap-20 items-start">
        <div className="flex items-center gap-2">
          <span className="font-geist text-2xl font-bold text-muted transition-colors group-hover:text-foreground">
            {number}
          </span>
          <span className="font-geist text-2xl font-bold text-primary">
            .
          </span>
        </div>

        <div className="flex-1 flex flex-col md:flex-row justify-between items-start gap-8 w-full">
          <div className="flex flex-col gap-4 max-w-md">
            <h3 className="font-geist text-3xl md:text-5xl font-bold text-white transition-transform duration-500 group-hover:translate-x-2">
              {title}
            </h3>
            <p className="font-geist text-lg text-muted-foreground">
              {description}
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:max-w-xs justify-end">
            {tags.map((tag: string, j: number) => (
              <span
                key={j}
                className="px-4 py-2 rounded-full border border-border/50 text-xs font-bold uppercase tracking-widest text-muted transition-all duration-300 group-hover:border-primary/50 group-hover:text-foreground"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
