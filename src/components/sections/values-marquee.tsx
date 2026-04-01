"use client";

import React, { useMemo, useState, useCallback } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Internal Primitives
import { Marquee } from "@/components/motion/marquee";
import { Reveal } from "@/components/motion/reveal";

/**
 * ============================================================================
 * TYPE DEFINITIONS & DATA
 * ============================================================================
 */

interface Value {
  id: string;
  label: string;
  description: string;
  icon: string;
  accent: string;
}

const VALUES: Value[] = [
  { 
    id: "user-friendly", 
    label: "User-Friendly", 
    description: "Intuitive interfaces designed for seamless human interaction.",
    icon: "/star.svg",
    accent: "#10b981"
  },
  { 
    id: "adaptive", 
    label: "Adaptive", 
    description: "Fluid layouts that respond perfectly to any screen size.",
    icon: "/star.svg",
    accent: "#3b82f6"
  },
  { 
    id: "fluid", 
    label: "Fluid", 
    description: "Motion sequences that feel natural and highly responsive.",
    icon: "/star.svg",
    accent: "#8b5cf6"
  },
  { 
    id: "future-proof", 
    label: "Future-Proof", 
    description: "Built with the latest stack to stand the test of time.",
    icon: "/star.svg",
    accent: "#f43f5e"
  },
  { 
    id: "seo-ready", 
    label: "SEO-Ready", 
    description: "Optimized for search engines from the semantic roots.",
    icon: "/star.svg",
    accent: "#fbbf24"
  },
  { 
    id: "immersive", 
    label: "Immersive", 
    description: "Experiences that draw users in with depth and texture.",
    icon: "/star.svg",
    accent: "#06b6d4"
  },
  { 
    id: "protected", 
    label: "Protected", 
    description: "Secure-by-design architecture for ultimate peace of mind.",
    icon: "/star.svg",
    accent: "#10b981"
  },
  { 
    id: "dependable", 
    label: "Dependable", 
    description: "99.9% uptime and robust error handling logic.",
    icon: "/star.svg",
    accent: "#3b82f6"
  },
  { 
    id: "captivating", 
    label: "Captivating", 
    description: "Visual storytelling that leaves a lasting impression.",
    icon: "/star.svg",
    accent: "#8b5cf6"
  }
];

/**
 * ============================================================================
 * ANIMATION VARIANTS
 * ============================================================================
 */

const infoVariants: Variants = {
  initial: { opacity: 0, scale: 0.9, y: 10, filter: "blur(4px)" },
  animate: { 
    opacity: 1, 
    scale: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 300, damping: 20 } 
  },
  exit: { 
    opacity: 0, 
    scale: 0.9, 
    y: -10, 
    filter: "blur(4px)",
    transition: { duration: 0.2 } 
  }
};

/**
 * ============================================================================
 * MAIN COMPONENT: ULTRA VALUES MARQUEE
 * Features: Interactive text tracking, Dynamic hover info panels, 
 * Color-shifting typography, Performance-optimized infinite loops.
 * ============================================================================
 */

export function ValuesMarquee(): React.JSX.Element {
  const [activeValue, setActiveValue] = useState<Value | null>(null);
  
  /**
   * We double the values array to ensure a truly seamless 
   * infinite loop without visual jumps or resets.
   */
  const displayValues = useMemo(() => [...VALUES, ...VALUES], []);

  const handleMouseEnter = useCallback((val: Value) => {
    setActiveValue(val);
  }, []);

  const handleMouseLeave = useCallback(() => {
    setActiveValue(null);
  }, []);

  return (
    <section className="relative py-24 border-y border-white/5 bg-black overflow-visible group">
      {/* ── BACKGROUND GLOW LAYER ─────────────────────────── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {activeValue && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.15 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 transition-colors duration-1000"
              style={{ background: `radial-gradient(circle at center, ${activeValue.accent} 0%, transparent 70%)` }}
            />
          )}
        </AnimatePresence>
      </div>

      {/* ── HEADER LABEL ──────────────────────────────────── */}
      <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
        <Reveal blur direction="down">
          <div className="px-4 py-1 rounded-full bg-black border border-white/10 text-[10px] font-black uppercase tracking-[0.5em] text-white/40">
            Core Philosophy
          </div>
        </Reveal>
      </div>

      {/* ── INTERACTIVE MARQUEE ───────────────────────────── */}
      <div className="relative overflow-hidden">
        <Marquee speed="slow" fade={false} pauseOnHover={true}>
          <div className="flex items-center">
            {displayValues.map((v, i) => (
              <ValueItem 
                key={`${v.id}-${i}`} 
                value={v} 
                onEnter={() => handleMouseEnter(v)}
                onLeave={handleMouseLeave}
                isActive={activeValue?.id === v.id}
              />
            ))}
          </div>
        </Marquee>
      </div>

      {/* ── DYNAMIC INFO PANEL (DESKTOP ONLY) ──────────────── */}
      <div className="hidden lg:block absolute bottom-4 left-1/2 -translate-x-1/2 h-12 z-20">
        <AnimatePresence mode="wait">
          {activeValue && (
            <motion.div
              key={activeValue.id}
              variants={infoVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              className="flex items-center gap-3"
            >
              <div 
                className="h-1.5 w-1.5 rounded-full" 
                style={{ backgroundColor: activeValue.accent }} 
              />
              <span className="text-xs font-bold text-white/60 tracking-wider">
                {activeValue.description}
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ── SIDE OVERLAY GRADIENTS ────────────────────────── */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-40 bg-gradient-to-r from-black to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-40 bg-gradient-to-l from-black to-transparent z-10" />
    </section>
  );
}

/**
 * Individual Value Item Component
 * Handles the high-fidelity hover interactions and visual states.
 */
function ValueItem({ 
  value, 
  onEnter, 
  onLeave,
  isActive 
}: { 
  value: Value; 
  onEnter: () => void; 
  onLeave: () => void;
  isActive: boolean;
}) {
  return (
    <motion.div 
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="flex items-center gap-8 px-12 group/item cursor-pointer"
    >
      <span 
        className={cn(
          "text-5xl md:text-8xl font-black uppercase tracking-tighter transition-all duration-700",
          isActive ? "text-white scale-105" : "text-white/10 group-hover/item:text-white/40"
        )}
        style={{ 
          textShadow: isActive ? `0 0 40px ${value.accent}44` : 'none'
        }}
      >
        {value.label}
      </span>
      
      <div className="relative h-8 w-8 md:h-12 md:w-12">
        <motion.div
          animate={{ 
            rotate: isActive ? 180 : 0,
            scale: isActive ? 1.2 : 1
          }}
          transition={{ type: "spring", stiffness: 200 }}
          className="relative h-full w-full"
        >
          <Image src={value.icon} alt="" fill className="object-contain" />
        </motion.div>
        
        {/* Glow effect under the icon */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 2 }}
              exit={{ opacity: 0, scale: 0 }}
              className="absolute inset-0 -z-10 blur-xl"
              style={{ backgroundColor: value.accent }}
            />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

/**
 * End of File: values-marquee.tsx
 * Total anticipated length: ~300+ lines including complex interaction logic.
 * ============================================================================
 */
