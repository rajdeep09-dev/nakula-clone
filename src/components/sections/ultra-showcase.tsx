"use client";

import React, { 
  useRef
} from "react";
import { 
  motion, 
  useScroll, 
  useTransform
} from "framer-motion";
import Image from "next/image";
import { ArrowUpRight, Github, Globe, Code2, Layers } from "lucide-react";

// Internal Primitives
import { Reveal } from "@/components/motion/reveal";
import { 
  AdvancedSpotlightCard, 
  UltraButton, 
  GlassBadge,
  PremiumImage
} from "@/components/ui/premium-primitives";

/**
 * ============================================================================
 * TYPE DEFINITIONS & DATA
 * ============================================================================
 */

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  image: string;
  link: string;
  github?: string;
  stats: { label: string; value: string }[];
  stack: { name: string; icon: string }[];
  color: string;
}

const PROJECTS: Project[] = [
  {
    id: "rune",
    title: "Rune",
    category: "Productivity Toolkit",
    description: "All-in-one productivity suite with 145+ power tools.",
    longDescription: "Rune empowers creators and developers with a massive library of utilities ranging from AI content generators to advanced video processing pipelines. Built for speed and accessibility.",
    image: "/images/rune.png",
    link: "https://rune.codes",
    github: "https://github.com/ksparth12",
    color: "#10b981",
    stats: [
      { label: "Tools", value: "145+" },
      { label: "Uptime", value: "99.9%" },
      { label: "Users", value: "12k+" }
    ],
    stack: [
      { name: "Next.js", icon: "nextjs_icon_dark.svg" },
      { name: "TypeScript", icon: "typescript.svg" },
      { name: "Tailwind", icon: "tailwindcss.svg" }
    ]
  },
  {
    id: "runeai",
    title: "RuneAI",
    category: "Artificial Intelligence",
    description: "Advanced RAG system with deep research capabilities.",
    longDescription: "A powerful AI platform featuring three specialized models and a 500K context limit. Includes automated tool calling and high-precision web search integration.",
    image: "/images/1runeai.png",
    link: "https://ai.rune.codes",
    color: "#3b82f6",
    stats: [
      { label: "Context", value: "500k" },
      { label: "Models", value: "3" },
      { label: "Latency", value: "sub-1s" }
    ],
    stack: [
      { name: "LangGraph", icon: "langgraph.svg" },
      { name: "Appwrite", icon: "appwrite.svg" },
      { name: "Vercel", icon: "Vercel_dark.svg" }
    ]
  },
  {
    id: "runelearn",
    title: "RuneLearn",
    category: "EdTech Platform",
    description: "AI-powered study companion for intelligent learning.",
    longDescription: "Dynamic quiz generation, flashcards, and a deep-context doubt solver. Designed to turbocharge knowledge retention and personalized learning roadmaps.",
    image: "/images/runelearn.png",
    link: "https://rune.codes/learn",
    color: "#8b5cf6",
    stats: [
      { label: "Quizzes", value: "Infinite" },
      { label: "Accuracy", value: "98%" },
      { label: "Topics", value: "60+" }
    ],
    stack: [
      { name: "React", icon: "React_dark.svg" },
      { name: "Prisma", icon: "Prisma_dark.svg" },
      { name: "PostgreSQL", icon: "postgresql.svg" }
    ]
  }
];

/**
 * ============================================================================
 * SUB-COMPONENTS
 * ============================================================================
 */

/**
 * 1. Project Detail Sidebar
 * Displays metadata and stats for the active project.
 */
function ProjectDetails({ project, index }: { project: Project; index: number }) {
  return (
    <div className="flex flex-col gap-8 py-12">
      <div className="flex flex-col gap-4">
        <Reveal direction="down" delay={0.1}>
          <GlassBadge variant="accent" className="w-fit">
            Project 0{index + 1}
          </GlassBadge>
        </Reveal>
        
        <Reveal delay={0.2}>
          <h3 className="text-5xl md:text-7xl font-black text-white tracking-tighter">
            {project.title}
          </h3>
        </Reveal>
        
        <Reveal delay={0.3}>
          <span className="text-xs font-bold uppercase tracking-[0.4em] text-white/40">
            {project.category}
          </span>
        </Reveal>
      </div>

      <Reveal delay={0.4}>
        <p className="text-xl text-white/60 leading-relaxed max-w-md">
          {project.longDescription}
        </p>
      </Reveal>

      {/* Stats Grid */}
      <div className="grid grid-cols-3 gap-4 border-y border-white/5 py-8">
        {project.stats.map((stat, i) => (
          <div key={i} className="flex flex-col gap-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">
              {stat.label}
            </span>
            <span className="text-xl font-black text-white">{stat.value}</span>
          </div>
        ))}
      </div>

      {/* Tech Stack Horizontal Scroll */}
      <div className="flex flex-col gap-4">
        <span className="text-[10px] font-bold uppercase tracking-widest text-white/20">
          Technologies Used
        </span>
        <div className="flex gap-4">
          {project.stack.map((tech, i) => (
            <div key={i} className="group relative">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/5 grayscale hover:grayscale-0 hover:bg-white/10 transition-all duration-500">
                <Image src={`/icons/${tech.icon}`} alt={tech.name} width={24} height={24} className="object-contain" />
              </div>
              {/* Tooltip */}
              <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 whitespace-nowrap rounded bg-white px-2 py-1 text-[10px] font-bold text-black opacity-0 transition-opacity group-hover:opacity-100">
                {tech.name}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-4 flex gap-4">
        <UltraButton 
          variant="neon" 
          icon={<ArrowUpRight size={16} />}
          onClick={() => window.open(project.link, "_blank")}
        >
          Live Preview
        </UltraButton>
        {project.github && (
          <UltraButton 
            variant="outline" 
            icon={<Github size={16} />}
            onClick={() => window.open(project.github, "_blank")}
          >
            Source Code
          </UltraButton>
        )}
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * MAIN COMPONENT: ULTRA SHOWCASE
 * Features: Scroll-pinned layout, 3D interaction, High-density metadata.
 * ============================================================================
 */

export function UltraShowcase(): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll for pinning effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section 
      id="work" 
      ref={containerRef} 
      className="relative min-h-[400vh] bg-black"
    >
      {/* ── BACKGROUND ATMOSPHERE ───────────────────────────── */}
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* Dynamic mesh that changes color based on scroll */}
        <motion.div 
          className="absolute inset-0 opacity-20 blur-[150px]"
          style={{
            background: useTransform(
              scrollYProgress,
              [0, 0.33, 0.66, 1],
              ["radial-gradient(circle, #10b981 0%, transparent 70%)",
               "radial-gradient(circle, #3b82f6 0%, transparent 70%)",
               "radial-gradient(circle, #8b5cf6 0%, transparent 70%)",
               "radial-gradient(circle, #10b981 0%, transparent 70%)"]
            )
          }}
        />
        <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] [mask-image:radial-gradient(ellipse_at_center,black,transparent)]" />
      </div>

      {/* ── PROJECT SECTIONS ────────────────────────────────── */}
      <div className="relative z-10 mx-auto max-w-7xl px-6">
        {PROJECTS.map((project, i) => (
          <ProjectSection 
            key={project.id} 
            project={project} 
            index={i} 
            total={PROJECTS.length}
          />
        ))}
      </div>

      {/* ── ARCHIVE CTA ─────────────────────────────────────── */}
      <div className="relative h-screen flex items-center justify-center">
        <Reveal direction="down" className="flex flex-col items-center gap-12 text-center">
          <div className="flex flex-col gap-4">
            <h2 className="text-6xl md:text-9xl font-black text-white tracking-tighter">
              BEYOND THE <br /> <span className="text-white/10 hover:text-accent transition-colors duration-700">CORE</span>
            </h2>
            <p className="text-xl text-white/40 max-w-xl mx-auto">
              My journey doesn&apos;t end here. Explore 50+ experiments, open-source 
              contributions, and legacy projects in the archive.
            </p>
          </div>
          <UltraButton size="xl" variant="neon" icon={<Layers size={20} />}>
            Explore Full Archive
          </UltraButton>
        </Reveal>
      </div>
    </section>
  );
}

/**
 * Individual Project Section
 * Handles the internal pinning and reveal logic for each item.
 */
function ProjectSection({ 
  project, 
  index
}: { 
  project: Project; 
  index: number;
}) {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Local scroll tracking for this specific section
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  // 3D Motion values
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [20, 0, -20]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <div 
      ref={sectionRef} 
      className="relative flex min-h-screen flex-col md:flex-row items-center justify-between gap-20 py-24"
    >
      {/* 1. Left: Text Content */}
      <div className="flex flex-1 flex-col justify-center">
        <ProjectDetails project={project} index={index} />
      </div>

      {/* 2. Right: Visual Showcase */}
      <motion.div 
        style={{ rotateX, scale, opacity }}
        className="relative flex-1 w-full max-w-[600px] perspective-[2000px]"
      >
        <AdvancedSpotlightCard 
          enableTilt 
          maxTilt={8}
          enableBorderBeam
          spotlightColor={`${project.color}22`}
          className="aspect-[4/3] w-full overflow-hidden p-0 border-white/10 bg-white/[0.03]"
        >
          <div className="relative h-full w-full p-4 md:p-8">
            {/* Project Frame */}
            <div className="relative h-full w-full rounded-2xl overflow-hidden shadow-2xl border border-white/5 transform-gpu">
              <PremiumImage 
                src={project.image} 
                alt={project.title} 
                className="object-cover h-full w-full"
                containerClassName="h-full w-full"
              />
              
              {/* Overlay Label */}
              <div className="absolute top-6 right-6 z-20">
                <GlassBadge variant="default" className="backdrop-blur-xl border-white/20">
                  <Globe size={10} className="text-accent" />
                  Production Ready
                </GlassBadge>
              </div>

              {/* Interaction Hint */}
              <div className="absolute bottom-6 left-6 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex items-center gap-2 rounded-lg bg-black/60 backdrop-blur-md p-2 border border-white/10">
                  <Code2 size={12} className="text-white/60" />
                  <span className="text-[10px] font-bold text-white uppercase tracking-widest">
                    Interactive 3D Preview
                  </span>
                </div>
              </div>
            </div>
          </div>
        </AdvancedSpotlightCard>

        {/* Decorative background elements for each card */}
        <div 
          className="absolute -inset-20 -z-10 blur-[100px] opacity-20 transition-colors duration-1000"
          style={{ background: `radial-gradient(circle, ${project.color} 0%, transparent 70%)` }}
        />
      </motion.div>
    </div>
  );
}

/**
 * End of File: ultra-showcase.tsx
 * Total anticipated length: ~500+ lines including comments and logic.
 * ============================================================================
 */
