'use client';

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Image from "next/image";

const projects = [
  {
    title: "Arjuna",
    description: "Personal Portfolio Website for talented design engineer",
    image: "/images/O9GTVSOp5qfdcnPZ0RpGBtAKd4.png",
    link: "#"
  },
  {
    title: "Bima",
    description: "Website and branding for AI Automation Company",
    image: "/images/x1W4oQBvmcvuOt4GlWOEKQMUUOc.jpg",
    link: "#"
  },
  {
    title: "Mandala",
    description: "Website and branding for Design Agency",
    image: "/images/x0UofRTrUvAlzREUlGFku7Owqc.jpg",
    link: "#"
  }
];

export function WorkSection() {
  return (
    <section className="relative bg-background py-20 px-6 md:px-10">
      <div className="max-w-[1400px] mx-auto">
        <div className="flex justify-between items-end mb-12 md:mb-20">
          <h2 className="font-anton text-[15vw] md:text-[10vw] leading-[0.8] uppercase text-white">
            Latest <br /> work
          </h2>
          <div className="hidden md:block bg-card px-4 py-2 rounded-full border border-border text-xs font-bold text-muted">
            (04)
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10">
          {projects.map((project, i) => (
            <ProjectCard key={i} {...project} index={i} />
          ))}
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col items-center justify-center bg-primary rounded-[32px] p-10 min-h-[400px] text-center"
          >
            <h3 className="font-anton text-4xl md:text-6xl uppercase text-white mb-6">
              More <br /> Projects
            </h3>
            <button className="bg-white text-black px-8 py-4 rounded-full font-bold uppercase tracking-widest hover:bg-black hover:text-white transition-all duration-300">
              VIEW ALL
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ title, description, image, index }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: index * 0.1 }}
      className="group relative flex flex-col gap-6"
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-[32px] bg-card border border-border">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700 ease-out"
        />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-2xl md:text-3xl font-bold text-white uppercase tracking-tight font-geist">
          {title}
        </h3>
        <p className="text-muted text-sm md:text-lg max-w-[400px]">
          {description}
        </p>
      </div>
    </motion.div>
  );
}
