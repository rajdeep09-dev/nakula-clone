"use client";

import React, { 
  useEffect, 
  useState, 
  useRef, 
  useMemo, 
  useCallback 
} from "react";
import { 
  motion, 
  useScroll, 
  useTransform, 
  useSpring
} from "framer-motion";
import Image from "next/image";
import { 
  Linkedin, 
  Github, 
  Twitter, 
  ArrowUpRight, 
  Copy, 
  Check,
  Globe
} from "lucide-react";
import { cn } from "@/lib/utils";

// Internal Primitives
import { Reveal } from "@/components/motion/reveal";
import { UltraAurora } from "@/components/motion/atmospheres";
import { UltraButton } from "@/components/ui/premium-primitives";

/**
 * ============================================================================
 * TYPE DEFINITIONS
 * ============================================================================
 */

type TimeZone = "GB" | "IN" | "US";

interface TimeZoneConfig {
  id: TimeZone;
  label: string;
  subLabel: string;
  offset: number; // in hours from UTC
}

const TIMEZONES: TimeZoneConfig[] = [
  { id: "GB", label: "GB UK", subLabel: "London", offset: 0 },
  { id: "IN", label: "IN India", subLabel: "New Delhi", offset: 5.5 },
  { id: "US", label: "US USA", subLabel: "New York", offset: -5 },
];

/**
 * ============================================================================
 * SUB-COMPONENTS: INTERACTIVE CLOCK
 * ============================================================================
 */

function InteractiveClock() {
  const [selectedZone, setSelectedZone] = useState<TimeZone>("IN");
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const zoneTime = useMemo(() => {
    const config = TIMEZONES.find(z => z.id === selectedZone)!;
    const utc = time.getTime() + (time.getTimezoneOffset() * 60000);
    return new Date(utc + (3600000 * config.offset));
  }, [time, selectedZone]);

  const seconds = zoneTime.getSeconds();
  const minutes = zoneTime.getMinutes();
  const hours = zoneTime.getHours() % 12;

  // Hand rotations
  const sRotate = (seconds / 60) * 360;
  const mRotate = ((minutes + seconds / 60) / 60) * 360;
  const hRotate = ((hours + minutes / 60) / 12) * 360;

  return (
    <div className="flex flex-col gap-8 w-full max-w-sm">
      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Detail-Driven UI</span>
          <h4 className="text-2xl font-black text-white italic">Interfaces <br /> <span className="text-white/40">you can feel.</span></h4>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          {["MOTION", "TYPE", "FEEDBACK", "CRAFT"].map(tag => (
            <span key={tag} className="px-2 py-0.5 rounded-full border border-white/5 bg-white/5 text-[8px] font-bold text-white/40">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Clock Face */}
      <div className="relative aspect-square w-full rounded-full border border-white/10 bg-black shadow-[0_0_100px_rgba(255,255,255,0.05)] flex items-center justify-center p-12">
        <div className="relative h-full w-full rounded-full border-[0.5px] border-white/5">
          {/* Numbers / Markers */}
          {[...Array(12)].map((_, i) => (
            <div 
              key={i} 
              className="absolute inset-0 flex justify-center pt-2"
              style={{ transform: `rotate(${i * 30}deg)` }}
            >
              <div className="h-2 w-[1px] bg-white/20" />
            </div>
          ))}

          {/* Hands */}
          <motion.div 
            className="absolute top-1/2 left-1/2 h-1/3 w-1 bg-white origin-bottom -translate-x-1/2 -translate-y-full rounded-full"
            style={{ rotate: hRotate }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 h-1/2 w-0.5 bg-white/60 origin-bottom -translate-x-1/2 -translate-y-full rounded-full"
            style={{ rotate: mRotate }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 h-[55%] w-[1px] bg-accent origin-bottom -translate-x-1/2 -translate-y-full"
            style={{ rotate: sRotate }}
          />
          {/* Center Pin */}
          <div className="absolute top-1/2 left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black border-2 border-white z-10" />
        </div>
      </div>

      {/* TimeZone Selector */}
      <div className="grid grid-cols-3 gap-2">
        {TIMEZONES.map(tz => (
          <button
            key={tz.id}
            onClick={() => setSelectedZone(tz.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-3 rounded-xl border transition-all duration-500",
              selectedZone === tz.id 
                ? "bg-accent/10 border-accent text-accent" 
                : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
            )}
          >
            <span className="text-[10px] font-black">{tz.label}</span>
            <span className="text-[8px] font-bold opacity-60 uppercase">{tz.subLabel}</span>
          </button>
        ))}
      </div>
      
      <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
        <Globe size={10} />
        <span>Remote India</span>
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * MAIN COMPONENT: HERO ULTRA
 * ============================================================================
 */

export function HeroUltra(): React.JSX.Element {
  const [copied, setCopied] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax orchestration
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  const yTranslate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 200]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("hello@parthh.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-black px-6 pt-32 pb-24"
    >
      <UltraAurora className="opacity-20" />
      
      {/* ── HEADER ROW ────────────────────────────────────── */}
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-12">
        
        <div className="flex w-full flex-col md:flex-row items-center justify-between gap-12">
          <Reveal direction="down" delay={0.1} className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Based in Noida, India</span>
            </div>
          </Reveal>

          <Reveal direction="down" delay={0.2} className="flex flex-col items-end gap-2 text-right">
            <div className="flex items-center gap-2">
              <span className="text-xs font-black uppercase tracking-[0.3em] text-white/40">Full Stack Dev, & Designer</span>
              <div className="h-2 w-2 rounded-full bg-blue-500 animate-pulse" />
            </div>
          </Reveal>
        </div>

        {/* ── MASSIVE DISPLAY TITLE ─────────────────────────── */}
        <motion.div 
          style={{ y: yTranslate, opacity }}
          className="relative flex flex-col items-center text-center"
        >
          <h1 className="text-[25vw] md:text-[20vw] font-black leading-[0.8] text-white tracking-[-0.08em] select-none transform-gpu">
            PARTH
          </h1>
          <div className="mt-8 flex flex-col items-center gap-4">
            <p className="text-sm md:text-lg font-bold uppercase tracking-[0.4em] text-white/40">
              I design and build products that
            </p>
            <h2 className="text-4xl md:text-7xl font-black italic text-white tracking-tight">
              deliver real impact.
            </h2>
          </div>
        </motion.div>

        {/* ── INTERACTIVE GRID ──────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-24">
          
          {/* 1. Identity Card */}
          <div className="md:col-span-3">
            <Reveal delay={0.4} direction="right" className="h-full">
              <div className="group relative flex h-full flex-col gap-8 p-10 rounded-[40px] border border-white/5 bg-white/[0.02] overflow-hidden">
                <div className="flex flex-col gap-2">
                  <h3 className="text-3xl font-black text-white">Parth <span className="text-white/20">Sharma</span></h3>
                  <div className="flex items-center gap-2 text-xs font-bold text-white/40">
                    <MapPin size={12} />
                    <span>Noida, IN • 03:35 AM</span>
                  </div>
                </div>

                <div className="relative aspect-square w-full rounded-3xl overflow-hidden border border-white/10 transform-gpu transition-transform duration-700 group-hover:scale-[1.02]">
                  <Image src="/images/avatar.jpeg" alt="Parth" fill className="object-cover grayscale" />
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  {[Linkedin, Github, Twitter].map((Icon, i) => (
                    <a key={i} href="#" className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/5 text-white/20 hover:text-white hover:bg-accent/20 hover:border-accent/30 transition-all">
                      <Icon size={18} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* 2. Clock Section */}
          <div className="md:col-span-6">
            <Reveal delay={0.5} direction="none" className="h-full">
              <div className="flex h-full items-center justify-center p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
                <InteractiveClock />
              </div>
            </Reveal>
          </div>

          {/* 3. CTA Card */}
          <div className="md:col-span-3 flex flex-col gap-6">
            <Reveal delay={0.6} direction="left" className="flex-1">
              <div className="flex h-full flex-col gap-8 p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Available for work</span>
                </div>
                
                <h3 className="text-3xl font-black text-white leading-none">LET&apos;S BUILD <br /> SOMETHING <br /> <span className="text-white/20 font-medium italic">that actually works.</span></h3>

                <div className="flex flex-col gap-4 mt-auto">
                  <button 
                    onClick={copyEmail}
                    className="flex items-center justify-between p-4 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group"
                  >
                    <span className="text-sm font-bold text-white/60 group-hover:text-white">hello@parthh.in</span>
                    {copied ? <Check size={14} className="text-accent" /> : <Copy size={14} className="text-white/20" />}
                  </button>
                  
                  <UltraButton variant="default" size="lg" className="w-full h-14 rounded-2xl shadow-2xl" icon={<ArrowUpRight size={18} />}>
                    CONNECT NOW
                  </UltraButton>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* ── ADAPTABLE SECTION ─────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 w-full mt-6">
          <div className="md:col-span-4">
            <Reveal delay={0.7} direction="up" className="h-full">
              <div className="flex h-full flex-col gap-12 p-10 rounded-[40px] border border-white/5 bg-white/[0.02] overflow-hidden relative group">
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Available Globally</span>
                  <h3 className="text-4xl font-black text-white leading-tight">Adaptable <br /> across time <br /> zones</h3>
                </div>
                
                <div className="absolute -bottom-10 -right-10 w-64 h-64 bg-accent/10 blur-3xl rounded-full transition-all duration-1000 group-hover:bg-accent/20" />
                
                <div className="mt-auto relative z-10 flex items-center gap-2 text-xs font-bold text-white/40">
                  <Globe size={14} />
                  <span>Working with teams across 12 countries.</span>
                </div>
              </div>
            </Reveal>
          </div>

          <div className="md:col-span-8">
            <Reveal delay={0.8} direction="up" className="h-full">
              <div className="relative h-full min-h-[300px] overflow-hidden rounded-[40px] border border-white/5 bg-white/[0.02] group">
                <Image src="/images/rune.png" alt="Project Rune" fill className="object-cover opacity-40 grayscale group-hover:opacity-60 group-hover:grayscale-0 transition-all duration-1000" />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 flex flex-col gap-4">
                  <h4 className="text-5xl font-black text-white italic tracking-tighter">Rune<span className="text-white/20 not-italic">Hub</span></h4>
                  <div className="flex items-center gap-4">
                    <UltraButton variant="glass" size="sm">Explore Platform</UltraButton>
                    <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white/40">Featured Venture</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>
        </div>

      </div>
    </section>
  );
}

function MapPin({ size, className }: { size?: number; className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width={size || 24} 
      height={size || 24} 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path>
      <circle cx="12" cy="10" r="3"></circle>
    </svg>
  );
}

/**
 * End of File: hero-ultra.tsx
 * Total anticipated length: ~500+ lines including complex clock logic and grid layout.
 * ============================================================================
 */
