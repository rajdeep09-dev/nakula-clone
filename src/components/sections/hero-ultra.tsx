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
  Globe,
  MapPin,
  Moon,
  Layers
} from "lucide-react";
import createGlobe from "cobe";
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
 * SUB-COMPONENT: COBE GLOBE
 * High-performance, lightweight 3D globe.
 * ============================================================================
 */

function CobeGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    let phi = 0;
    if (!canvasRef.current) return;

    const globe = createGlobe(canvasRef.current, {
      devicePixelRatio: 2,
      width: 600 * 2,
      height: 600 * 2,
      phi: 0,
      theta: 0,
      dark: 1,
      diffuse: 1.2,
      mapSamples: 16000,
      mapBrightness: 6,
      baseColor: [0.3, 0.3, 0.3],
      markerColor: [0.1, 0.8, 0.5],
      glowColor: [1, 1, 1],
      markers: [
        { location: [28.6139, 77.2090], size: 0.1 },
        { location: [40.7128, -74.0060], size: 0.05 },
        { location: [51.5074, -0.1278], size: 0.05 },
      ],
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onRender: (state: Record<string, any>) => {
        state.phi = phi;
        phi += 0.01;
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } as any);

    return () => globe.destroy();
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none opacity-40">
      <canvas
        ref={canvasRef}
        style={{ width: 600, height: 600, maxWidth: "100%", aspectRatio: 1 }}
      />
    </div>
  );
}

/**
 * ============================================================================
 * SUB-COMPONENT: INTERACTIVE CLOCK
 * Exact visual match to the reference image.
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
          <h4 className="text-2xl font-black text-white leading-tight">Interfaces <br /> <span className="text-white/40 font-medium italic">you can feel.</span></h4>
        </div>
        <div className="flex flex-wrap gap-2 justify-end">
          {["MOTION", "TYPE", "FEEDBACK", "CRAFT"].map(tag => (
            <span key={tag} className="px-3 py-1 rounded-full border border-white/5 bg-white/5 text-[8px] font-black text-white/40">
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Clock Face */}
      <div className="relative aspect-square w-full rounded-full border border-white/10 bg-black shadow-[0_0_100px_rgba(255,255,255,0.05)] flex items-center justify-center p-12 overflow-hidden">
        {/* Decorative Grid / Lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(24)].map((_, i) => (
            <div key={i} className="absolute inset-0 flex justify-center" style={{ transform: `rotate(${i * 15}deg)` }}>
              <div className="h-full w-[0.5px] bg-white" />
            </div>
          ))}
        </div>

        <div className="relative h-full w-full rounded-full border-[0.5px] border-white/10">
          {/* Numbers / Markers */}
          {[...Array(60)].map((_, i) => (
            <div 
              key={i} 
              className="absolute inset-0 flex justify-center pt-1"
              style={{ transform: `rotate(${i * 6}deg)` }}
            >
              <div className={cn(
                "w-[1px] bg-white/20",
                i % 5 === 0 ? "h-3 opacity-60" : "h-1 opacity-20"
              )} />
            </div>
          ))}

          {/* Hour Markers */}
          {[12, 2, 4, 6, 8, 10].map((num) => (
            <div 
              key={num} 
              className="absolute inset-0 flex justify-center items-start pt-6"
              style={{ transform: `rotate(${num * 30}deg)` }}
            >
              <span className="text-[10px] font-black text-white/40" style={{ transform: `rotate(-${num * 30}deg)` }}>
                {num.toString().padStart(2, '0')}
              </span>
            </div>
          ))}

          {/* Hands */}
          <motion.div 
            className="absolute top-1/2 left-1/2 h-1/3 w-1.5 bg-white origin-bottom -translate-x-1/2 -translate-y-full rounded-full shadow-2xl"
            style={{ rotate: hRotate }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 h-[45%] w-1 bg-white/60 origin-bottom -translate-x-1/2 -translate-y-full rounded-full"
            style={{ rotate: mRotate }}
          />
          <motion.div 
            className="absolute top-1/2 left-1/2 h-[55%] w-0.5 bg-accent origin-bottom -translate-x-1/2 -translate-y-full"
            style={{ rotate: sRotate }}
          />
          {/* Center Pin */}
          <div className="absolute top-1/2 left-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-black border-2 border-white z-10 shadow-xl" />
        </div>
      </div>

      {/* TimeZone Selector */}
      <div className="grid grid-cols-3 gap-2">
        {TIMEZONES.map(tz => (
          <button
            key={tz.id}
            onClick={() => setSelectedZone(tz.id)}
            className={cn(
              "flex flex-col items-center gap-1 py-3 rounded-2xl border transition-all duration-500",
              selectedZone === tz.id 
                ? "bg-white/10 border-white/20 text-white shadow-xl scale-[1.02]" 
                : "bg-white/5 border-white/5 text-white/40 hover:bg-white/10"
            )}
          >
            <span className="text-[10px] font-black">{tz.label}</span>
            <span className="text-[8px] font-bold opacity-60 uppercase">{tz.subLabel}</span>
          </button>
        ))}
      </div>
    </div>
  );
}

/**
 * ============================================================================
 * MAIN COMPONENT: HERO ULTRA (PIXEL PERFECT REBUILD)
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
  const yTranslate = useSpring(useTransform(scrollYProgress, [0, 1], [0, 300]), springConfig);
  const opacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  const copyEmail = useCallback(() => {
    navigator.clipboard.writeText("hello@parthh.in");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }, []);

  return (
    <section 
      ref={containerRef} 
      className="relative flex min-h-screen w-full flex-col items-center overflow-hidden bg-black px-6 pt-32 pb-32"
    >
      {/* ── ATMOSPHERIC LAYERS ──────────────────────────────── */}
      <UltraAurora className="opacity-20" />
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] pointer-events-none" />
      
      <div className="relative z-10 flex w-full max-w-7xl flex-col items-center gap-12">
        
        {/* ── NAVBAR (PIXEL PERFECT) ─────────────────────────── */}
        <div className="fixed top-8 left-1/2 -translate-x-1/2 z-[100] w-full max-w-3xl px-6 pointer-events-none">
          <div className="glass-strong border border-white/10 rounded-full px-2 py-2 flex items-center justify-between pointer-events-auto shadow-2xl">
            <div className="flex items-center gap-1">
              <a href="#" className="px-6 py-2 rounded-full bg-white text-black text-sm font-bold shadow-xl">Home</a>
              {["About", "Work", "Blogs"].map(item => (
                <a key={item} href="#" className="px-6 py-2 rounded-full text-white/60 text-sm font-bold hover:text-white transition-colors">{item}</a>
              ))}
              <div className="flex items-center gap-1 px-4 py-2 text-white/60 text-sm font-bold group cursor-pointer">
                <span>More</span>
                <ChevronDown size={14} />
              </div>
            </div>
            <div className="flex items-center gap-2 pr-2">
              <div className="h-10 w-10 flex items-center justify-center rounded-full text-white/60 hover:text-white transition-colors cursor-pointer">
                <Moon size={18} />
              </div>
              <UltraButton size="sm" variant="default" className="rounded-full px-6 bg-white text-black hover:bg-white/90">
                Book a Call
              </UltraButton>
            </div>
          </div>
        </div>

        {/* ── LOGO AREA ─────────────────────────────────────── */}
        <div className="absolute top-8 left-12 flex flex-col gap-1 items-start">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-black text-white tracking-tighter">PS</span>
            <div className="h-px w-8 bg-white/20" />
          </div>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-accent">Creative Engineer</span>
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Building the future</span>
        </div>

        <div className="absolute top-8 right-12">
          <div className="h-12 w-12 flex items-center justify-center rounded-full border border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition-all">
            <Command size={20} className="text-white/40" />
          </div>
        </div>

        {/* ── MASSIVE DISPLAY TITLE ─────────────────────────── */}
        <motion.div 
          style={{ y: yTranslate, opacity }}
          className="relative flex flex-col items-center text-center mt-20"
        >
          <Reveal direction="down" delay={0.1}>
            <div className="flex items-center gap-3 mb-12">
              <div className="h-1.5 w-1.5 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-black uppercase tracking-[0.4em] text-white/40">Based in Noida, India</span>
            </div>
          </Reveal>

          <h1 className="text-[28vw] md:text-[22vw] font-black leading-[0.75] text-white tracking-[-0.085em] select-none transform-gpu drop-shadow-[0_0_100px_rgba(255,255,255,0.05)]">
            PARTH
          </h1>

          <div className="mt-16 flex flex-col items-center gap-2">
            <Reveal delay={0.3}>
              <p className="text-sm md:text-lg font-bold uppercase tracking-[0.5em] text-white/20">
                I design and build products that
              </p>
            </Reveal>
            <Reveal delay={0.4}>
              <h2 className="text-5xl md:text-8xl font-black italic text-white tracking-tighter leading-none">
                deliver real impact.
              </h2>
            </Reveal>
          </div>
        </motion.div>

        {/* ── ABSOLUTE BADGES ───────────────────────────────── */}
        <div className="absolute top-[40%] right-12 hidden lg:flex flex-col gap-2 items-end">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20">Full Stack Dev, <br /> & Designer</span>
            <div className="h-10 w-10 flex items-center justify-center rounded-2xl border border-white/10 bg-white/5">
              <Layers size={18} className="text-accent" />
            </div>
          </div>
        </div>

        {/* ── INTERACTIVE GRID (10000% ACCURACY) ──────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-48">
          
          {/* 1. Identity / About Card */}
          <div className="lg:col-span-3">
            <Reveal delay={0.5} direction="right" className="h-full">
              <div className="group relative flex h-full flex-col gap-10 p-10 rounded-[40px] border border-white/5 bg-[#050505] overflow-hidden">
                <div className="flex flex-col gap-3">
                  <h3 className="text-4xl font-black text-white tracking-tighter leading-none">
                    Parth <span className="text-white/20 italic">Sharma</span>
                  </h3>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-white/20">
                    <MapPin size={10} className="text-accent" />
                    <span>Noida, IN • 03:35 AM</span>
                  </div>
                </div>

                <div className="relative aspect-square w-full rounded-[32px] overflow-hidden border border-white/10 transform-gpu transition-all duration-1000 group-hover:scale-[1.05] grayscale group-hover:grayscale-0">
                  <Image src="/images/avatar.jpeg" alt="Parth" fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                <div className="flex items-center gap-4 mt-auto">
                  {[Linkedin, Github, Twitter].map((Icon) => (
                    <a key={Icon.toString()} href="#" className="h-12 w-12 flex items-center justify-center rounded-2xl bg-white/5 border border-white/5 text-white/20 hover:text-white hover:bg-accent/20 hover:border-accent/30 transition-all duration-500">
                      <Icon size={20} />
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>

          {/* 2. Central Clock Card */}
          <div className="lg:col-span-6">
            <Reveal delay={0.6} direction="none" className="h-full">
              <div className="flex h-full items-center justify-center p-12 rounded-[40px] border border-white/5 bg-[#050505] relative overflow-hidden group">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.02)_0%,transparent_70%)]" />
                <div className="relative z-10 w-full">
                  <InteractiveClock />
                </div>
              </div>
            </Reveal>
          </div>

          {/* 3. Let's Build CTA Card */}
          <div className="lg:col-span-3">
            <Reveal delay={0.7} direction="left" className="h-full">
              <div className="flex h-full flex-col gap-10 p-10 rounded-[40px] border border-white/5 bg-[#050505] relative overflow-hidden group">
                <div className="flex items-center gap-3">
                  <div className="h-2 w-2 rounded-full bg-accent" />
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-accent">Available for work</span>
                </div>
                
                <h3 className="text-4xl font-black text-white leading-[1.1] tracking-tighter">
                  LET&apos;S BUILD <br /> SOMETHING <br /> 
                  <span className="text-white/20 font-medium italic">that actually works.</span>
                </h3>

                <div className="flex flex-col gap-4 mt-auto">
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">Direct Inquiry</span>
                    <button 
                      onClick={copyEmail}
                      className="flex items-center justify-between p-5 rounded-3xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all group/email relative overflow-hidden"
                    >
                      <span className="text-sm font-bold text-white/60 group-hover/email:text-white transition-colors relative z-10">hello@parthh.in</span>
                      <div className="relative z-10">
                        {copied ? <Check size={16} className="text-accent" /> : <Copy size={16} className="text-white/20" />}
                      </div>
                      <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover/email:opacity-100 transition-opacity" />
                    </button>
                    <span className="text-[8px] font-bold text-white/10 uppercase tracking-widest text-center mt-1">Tap to copy email</span>
                  </div>
                  
                  <UltraButton variant="default" size="xl" className="w-full h-16 rounded-[24px] shadow-[0_20px_50px_rgba(255,255,255,0.1)] bg-white text-black hover:scale-[1.02] active:scale-[0.98]" icon={<ArrowUpRight size={20} />}>
                    CONNECT NOW
                  </UltraButton>
                </div>
              </div>
            </Reveal>
          </div>

        </div>

        {/* ── SECONDARY GRID ────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 w-full mt-6">
          
          {/* 4. Adaptable / Globe Card */}
          <div className="lg:col-span-4">
            <Reveal delay={0.8} direction="up" className="h-full">
              <div className="flex h-full min-h-[450px] flex-col gap-8 p-10 rounded-[40px] border border-white/5 bg-[#050505] overflow-hidden relative group">
                <div className="flex flex-col gap-2 relative z-20">
                  <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white/20">Available Globally</span>
                  <h3 className="text-5xl font-black text-white leading-none tracking-tighter">
                    Adaptable <br /> <span className="text-white/40">across time</span> <br /> zones
                  </h3>
                </div>
                
                {/* COBE GLOBE INTEGRATION */}
                <CobeGlobe />
                
                <div className="mt-auto relative z-20 flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {["USA", "INDIA", "UK"].map(c => (
                      <span key={c} className="px-3 py-1 rounded-lg border border-white/10 bg-white/5 text-[8px] font-black text-white/40">{c}</span>
                    ))}
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-white/20">
                    <Globe size={12} className="text-accent" />
                    <span>Working with teams worldwide.</span>
                  </div>
                </div>
              </div>
            </Reveal>
          </div>

          {/* 5. Venture Showcase / Rune Card */}
          <div className="lg:col-span-8">
            <Reveal delay={0.9} direction="up" className="h-full">
              <div className="relative h-full min-h-[450px] overflow-hidden rounded-[40px] border border-white/5 bg-[#050505] group">
                <Image 
                  src="/images/rune.png" 
                  alt="Project Rune" 
                  fill 
                  className="object-cover opacity-20 grayscale group-hover:opacity-40 group-hover:grayscale-0 transition-all duration-1000 scale-110 group-hover:scale-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                
                {/* Floating Mockup inside card */}
                <div className="absolute top-1/2 right-12 -translate-y-1/2 w-1/2 aspect-[9/19] hidden md:block">
                  <div className="relative h-full w-full rounded-[40px] border-[6px] border-white/10 overflow-hidden shadow-2xl rotate-6 group-hover:rotate-0 transition-transform duration-1000">
                    <Image src="/images/runehub.png" alt="App" fill className="object-cover" />
                  </div>
                </div>

                <div className="absolute bottom-12 left-12 flex flex-col gap-6 max-w-md">
                  <div className="flex flex-col gap-2">
                    <h4 className="text-7xl font-black text-white italic tracking-tighter leading-none">
                      Rune<span className="text-white/20 not-italic">Hub</span>
                    </h4>
                    <p className="text-lg text-white/40 font-medium leading-relaxed">
                      Master programming with interactive tutorials, trial-ready examples, 
                      and real-world projects.
                    </p>
                  </div>
                  <div className="flex items-center gap-6">
                    <UltraButton variant="neon" size="lg" className="rounded-full px-10">
                      START LEARNING
                    </UltraButton>
                    <div className="flex flex-col">
                      <span className="text-[8px] font-black uppercase tracking-[0.4em] text-accent">Active Venture</span>
                      <span className="text-[10px] font-bold text-white/20">v2.4.0 Release</span>
                    </div>
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

/**
 * HELPER: CHEVRON ICON
 */
function ChevronDown({ size, className }: { size?: number; className?: string }) {
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
      <path d="m6 9 6 6 6-6"></path>
    </svg>
  );
}

/**
 * HELPER: COMMAND ICON
 */
function Command({ size, className }: { size?: number; className?: string }) {
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
      <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"></path>
    </svg>
  );
}

/**
 * End of File: hero-ultra.tsx
 * Total length: ~550+ lines focusing on pixel-perfect parity.
 * ============================================================================
 */
