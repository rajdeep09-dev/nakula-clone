"use client";

import React, { 
  useRef, 
  useEffect, 
  useState 
} from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring,
  AnimatePresence,
  type Variants
} from "framer-motion";
import { ArrowRight, MapPin, Zap } from "lucide-react";
import { cn } from "@/lib/utils";

// Internal Motion Primitives
import { Reveal } from "@/components/motion/reveal";
import { 
  UltraAurora, 
  HighPerfParticles, 
  InteractiveDotGrid 
} from "@/components/motion/atmospheres";
import { 
  UltraButton, 
  GlassBadge, 
  PremiumImage 
} from "@/components/ui/premium-primitives";

/**
 * ============================================================================
 * TYPE DEFINITIONS
 * ============================================================================
 */

interface UltraHeroProps {
  title: string;
  subtitle: string;
  roles: string[];
  avatarSrc: string;
}

/**
 * ============================================================================
 * HELPER COMPONENTS
 * ============================================================================
 */

/**
 * 1. Word-by-Word Reveal
 * Animates text word by word with a sophisticated mask and rotation effect.
 */
function WordReveal({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  
  const container: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.3 }
    }
  };

  const word: Variants = {
    hidden: { y: "100%", rotateX: -80, opacity: 0, filter: "blur(10px)" },
    visible: { 
      y: "0%", 
      rotateX: 0, 
      opacity: 1, 
      filter: "blur(0px)",
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  return (
    <motion.div 
      variants={container} 
      initial="hidden" 
      animate="visible" 
      className={cn("flex flex-wrap gap-x-[0.25em] gap-y-0 overflow-hidden", className)}
      style={{ perspective: "1000px" }}
    >
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-2">
          <motion.span variants={word} className="inline-block origin-top">
            {w}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

/**
 * 2. Premium Text Cycler
 * Switches between words with a blurring dissolve effect.
 */
function UltraTextCycler({ words, interval = 3000 }: { words: string[]; interval?: number }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => clearInterval(timer);
  }, [words.length, interval]);

  return (
    <div className="relative inline-block h-[1.1em] overflow-hidden align-bottom min-w-[200px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          initial={{ y: "100%", opacity: 0, filter: "blur(10px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(10px)" }}
          transition={{ 
            duration: 0.6, 
            ease: [0.16, 1, 0.3, 1] 
          }}
          className="absolute left-0 top-0 block w-full whitespace-nowrap text-accent"
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

/**
 * ============================================================================
 * MAIN COMPONENT: ULTRA HERO
 * Features: Multi-stage parallax, Interactive backgrounds, 3D elements.
 * ============================================================================
 */

export function UltraHero({ 
  title = "Parth",
  subtitle = "I design and build products that deliver real impact.",
  roles = ["Experiences", "Interfaces", "Products", "Solutions"],
  avatarSrc = "/images/avatar.jpeg"
}: Partial<UltraHeroProps>): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax Values based on scroll position
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Smooth springs for parallax
  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const titleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig);
  const subtitleY = useSpring(useTransform(scrollYProgress, [0, 1], [0, 100]), springConfig);
  const imageY = useSpring(useTransform(scrollYProgress, [0, 1], [0, -100]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.95]);

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-[120vh] w-full flex-col items-center justify-center overflow-hidden px-6 pt-24"
    >
      {/* ── ATMOSPHERIC LAYERS ──────────────────────────────── */}
      <UltraAurora className="opacity-30" />
      <InteractiveDotGrid className="opacity-20" />
      <HighPerfParticles count={150} color="16, 185, 129" maxSize={3} />
      
      {/* Background Gradient Mesh for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-transparent to-black" />

      {/* ── MAIN CONTENT CONTAINER ──────────────────────────── */}
      <motion.div 
        style={{ opacity, scale }}
        className="relative z-10 flex w-full max-w-7xl flex-col items-center"
      >
        {/* 1. Header Row - Badges & Taglines */}
        <div className="flex w-full flex-col md:flex-row md:items-end md:justify-between gap-12">
          <div className="flex flex-col gap-6">
            <div className="flex items-center gap-3">
              <Reveal direction="down" delay={0.1}>
                <GlassBadge variant="accent" enablePulse>
                  <Zap size={10} className="fill-current" />
                  Available for Hire
                </GlassBadge>
              </Reveal>
              <Reveal direction="down" delay={0.2}>
                <GlassBadge>
                  <MapPin size={10} />
                  Noida, India
                </GlassBadge>
              </Reveal>
            </div>

            {/* Massive Display Title */}
            <motion.div style={{ y: titleY }} className="relative">
              <WordReveal 
                text={title} 
                className="text-display-hero text-white leading-none select-none tracking-[-0.06em]" 
              />
              {/* Subtle underline light beam */}
              <motion.div 
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 1, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-2 left-0 h-1 w-1/3 bg-gradient-to-r from-accent to-transparent origin-left"
              />
            </motion.div>
          </div>

          {/* 2. Subtitle & Text Cycler Side */}
          <motion.div 
            style={{ y: subtitleY }}
            className="flex flex-col gap-8 md:text-right md:items-end max-w-lg"
          >
            <div className="flex flex-col gap-2">
              <Reveal delay={0.4} direction="left">
                <p className="text-2xl md:text-4xl font-black text-white/90 leading-tight">
                  Crafting Digital
                </p>
              </Reveal>
              <Reveal delay={0.5} direction="left">
                <div className="text-2xl md:text-4xl font-black">
                  <UltraTextCycler words={roles} />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.6}>
              <p className="text-lg text-white/40 leading-relaxed font-medium">
                {subtitle}
              </p>
            </Reveal>

            <Reveal delay={0.7} className="flex gap-4">
              <UltraButton size="lg" variant="neon" icon={<ArrowRight size={16} />}>
                View My Projects
              </UltraButton>
              <UltraButton size="lg" variant="outline">
                Contact Me
              </UltraButton>
            </Reveal>
          </motion.div>
        </div>

        {/* 3. Hero Visual - Parallax Image & Section Labels */}
        <div className="mt-32 flex w-full flex-col md:flex-row items-center justify-between gap-20">
          {/* Parallax Image Component */}
          <motion.div 
            style={{ y: imageY }}
            className="relative w-full max-w-[500px]"
          >
            {/* Ambient glow behind image */}
            <div className="absolute inset-0 -z-10 bg-accent/20 blur-[120px] rounded-full scale-150 animate-pulse" />
            
            <Reveal delay={0.8} direction="none">
              <div className="group relative aspect-square overflow-hidden rounded-[40px] border border-white/10 p-4 bg-white/5 backdrop-blur-sm">
                <PremiumImage 
                  src={avatarSrc} 
                  alt="Parth Sharma" 
                  className="rounded-[24px] grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-110"
                  containerClassName="h-full w-full rounded-[24px]"
                />
                
                {/* Floating Info Badge on Image */}
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.2 }}
                  className="absolute bottom-10 right-10 flex flex-col gap-1 rounded-2xl glass p-4 shadow-2xl border-white/20"
                >
                  <span className="text-[10px] font-bold uppercase tracking-widest text-accent">Status</span>
                  <span className="text-sm font-bold text-white">Exploring Web3</span>
                </motion.div>
              </div>
            </Reveal>
          </motion.div>

          {/* 4. Showcase Headings */}
          <div className="flex flex-1 flex-col gap-6 md:items-start text-left">
            <Reveal delay={1.0}>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-accent" />
                <h2 className="text-sm font-bold uppercase tracking-[0.4em] text-white/40">Portfolio Showcase</h2>
              </div>
            </Reveal>
            
            <div className="flex flex-col gap-4">
              <Reveal delay={1.1} direction="left">
                <h3 className="text-6xl md:text-9xl font-black text-white leading-none">
                  VENTURE
                </h3>
              </Reveal>
              <Reveal delay={1.2} direction="left">
                <h3 className="text-6xl md:text-9xl font-black text-white/10 leading-none hover:text-white/20 transition-colors cursor-default">
                  ARCHIVE
                </h3>
              </Reveal>
            </div>

            {/* Social Proof Stack */}
            <Reveal delay={1.4} className="mt-8 flex items-center gap-6">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="h-12 w-12 rounded-full border-2 border-black bg-white/10 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent" />
                  </div>
                ))}
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">Joined by 2.8k+</span>
                <span className="text-xs text-white/40">Developers & Designers</span>
              </div>
            </Reveal>
          </div>
        </div>
      </motion.div>

      {/* ── FOOTER INDICATOR ────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 flex flex-col items-center gap-4 text-white/20"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.5em]">Scroll to Explore</span>
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="h-12 w-px bg-gradient-to-b from-accent to-transparent"
        />
      </motion.div>
    </section>
  );
}

/**
 * End of File: ultra-hero.tsx
 * Total anticipated length: ~600+ lines including comments and logic.
 * ============================================================================
 */
