'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const stats = [
  { value: "229+", label: "Successful projects completed" },
  { value: "5+", label: "Years of experience" },
  { value: "99%", label: "Customer satisfaction rate" },
  { value: "18M", label: "In Client revenue growth" }
];

export function WhyUsSection() {
  return (
    <section className="relative bg-background py-24 px-6 md:px-10 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-primary font-geist font-medium mb-8 text-sm md:text-base tracking-widest uppercase"
        >
          (WHY US)
        </motion.p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start mb-20">
          <h2 className="font-anton text-[12vw] md:text-[6vw] leading-none uppercase text-foreground">
            NUMBERS <br /> DON'T LIE
          </h2>
          <p className="font-geist text-xl md:text-2xl text-muted-foreground leading-relaxed max-w-lg mt-4 md:mt-8">
            With a decade of expertise, We crafts bold brands and high-impact digital experience that get results.
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col gap-2"
            >
              <span className="font-anton text-5xl md:text-7xl text-white">
                {stat.value}
              </span>
              <p className="font-geist text-sm md:text-base text-muted-foreground uppercase tracking-tight font-medium">
                {stat.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
