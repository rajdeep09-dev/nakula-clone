'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { StarIcon } from "./icons";

const testimonials = [
  {
    name: "Mario Baskoro",
    role: "CTO of Arjuna",
    content: "Our socials used to feel scattered and inconsistent. Now, everything is on-brand, engaging, and performing better."
  },
  {
    name: "Evelyn Widjaja",
    role: "Marketing Lead at Bima",
    content: "From branding to the website to social—everything was cohesive, strategic, and done with serious care."
  },
  {
    name: "Karina Wulandari",
    role: "Founder at Batavia",
    content: "Working with them felt like having an in-house team that just gets it."
  }
];

export function TestimonialSection() {
  return (
    <section className="relative bg-background py-24 px-6 md:px-10 border-t border-border/50">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col gap-12 mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="flex items-center gap-6"
          >
            <div className="flex items-end gap-1">
              <span className="font-geist text-5xl md:text-6xl font-bold text-white leading-none">4.9</span>
              <span className="font-geist text-2xl md:text-3xl font-medium text-muted mb-1">/5</span>
            </div>
            <div className="flex flex-col gap-1">
              <div className="flex gap-1 text-primary">
                {[...Array(5)].map((_, i) => (
                  <StarIcon key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <p className="font-geist text-sm font-medium text-muted uppercase tracking-widest">
                300+ Reviews on Clutch
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8">
            <h3 className="font-geist text-3xl md:text-5xl font-bold text-white max-w-2xl leading-tight tracking-tighter">
              We deliver data-driven and result-focused deliverables. Hear what they say about us.
            </h3>
            <p className="text-primary font-geist font-medium text-sm md:text-base tracking-widest uppercase">
              (TESTIMONIALS)
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-card border border-border/50 rounded-[32px] p-8 md:p-10 flex flex-col justify-between min-h-[300px]"
            >
              <p className="font-geist text-lg md:text-xl text-foreground/90 leading-relaxed mb-8">
                "{testimonial.content}"
              </p>
              <div className="flex flex-col gap-1">
                <span className="font-geist font-bold text-white">{testimonial.name}</span>
                <span className="font-geist text-sm text-muted uppercase tracking-widest">{testimonial.role}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
