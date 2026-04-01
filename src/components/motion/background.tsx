"use client";

import { useRef, useMemo, useCallback, useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Aurora Background ───────────────────────────────────── */

export function AuroraBackground({ className }: { className?: string }): React.JSX.Element {
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <div className="absolute -top-1/2 -left-1/4 h-[80vh] w-[60vw] rounded-full opacity-30 blur-[120px] animate-aurora" style={{ background: "radial-gradient(circle, hsl(262 83% 58%/0.4) 0%, transparent 70%)" }} />
      <div className="absolute -top-1/4 -right-1/4 h-[70vh] w-[50vw] rounded-full opacity-25 blur-[120px] animate-aurora" style={{ background: "radial-gradient(circle, hsl(189 94% 43%/0.35) 0%, transparent 70%)", animationDelay: "5s" }} />
      <div className="absolute -bottom-1/4 left-1/4 h-[60vh] w-[45vw] rounded-full opacity-20 blur-[120px] animate-aurora" style={{ background: "radial-gradient(circle, hsl(152 76% 46%/0.3) 0%, transparent 70%)", animationDelay: "10s" }} />
    </div>
  );
}

/* ── Interactive Dot Grid (PREMIUM — dots brighten near cursor) ──── */

export function InteractiveDotGrid({ className }: { className?: string }): React.JSX.Element {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  }, []);

  const handleMouseLeave = useCallback((): void => {
    setMousePos({ x: -1000, y: -1000 });
  }, []);

  const dots = useMemo(() => {
    const arr: Array<{ id: string; cx: number; cy: number }> = [];
    const gap = 24;
    const cols = 60;
    const rows = 40;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({ id: `d-${r}-${c}`, cx: c * gap + gap / 2, cy: r * gap + gap / 2 });
      }
    }
    return arr;
  }, []);

  return (
    <div ref={containerRef} className={cn("absolute inset-0 overflow-hidden", className)}
      onMouseMove={handleMouseMove} onMouseLeave={handleMouseLeave} aria-hidden="true"
      style={{ maskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)", WebkitMaskImage: "radial-gradient(ellipse at center, black 20%, transparent 70%)" }}>
      <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
        {dots.map((dot) => {
          const dx = dot.cx - mousePos.x;
          const dy = dot.cy - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 150;
          const opacity = dist < maxDist ? 0.08 + (1 - dist / maxDist) * 0.5 : 0.08;
          const radius = dist < maxDist ? 1 + (1 - dist / maxDist) * 1.5 : 1;
          return (
            <circle key={dot.id} cx={dot.cx} cy={dot.cy} r={radius}
              fill="currentColor" className="text-foreground transition-all duration-150"
              style={{ opacity }} />
          );
        })}
      </svg>
    </div>
  );
}

/* ── Gradient Mesh ───────────────────────────────────────── */

export function GradientMeshBackground({ className, interactive = true }: {
  className?: string; interactive?: boolean;
}): React.JSX.Element {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 50, damping: 20 });
  const sy = useSpring(my, { stiffness: 50, damping: 20 });

  function handleMove(e: React.MouseEvent<HTMLDivElement>): void {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set(e.clientX - r.left); my.set(e.clientY - r.top);
  }

  return (
    <div className={cn("absolute inset-0 overflow-hidden mesh-gradient", className)}
      onMouseMove={interactive ? handleMove : undefined} aria-hidden="true">
      {interactive && (
        <motion.div className="absolute h-[50vw] w-[50vw] rounded-full opacity-20 blur-[120px]"
          style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%", background: "radial-gradient(circle, hsl(var(--accent)/0.4) 0%, transparent 70%)" }} />
      )}
    </div>
  );
}

/* ── Particles ───────────────────────────────────────────── */

export function ParticlesBackground({ count = 30, className }: {
  count?: number; className?: string;
}): React.JSX.Element {
  const p = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: `p-${i}`, x: Math.random() * 100, y: Math.random() * 100,
      sz: Math.random() * 3 + 1, dur: Math.random() * 10 + 8,
      del: Math.random() * 5, op: Math.random() * 0.3 + 0.1, dr: Math.random() * 20 - 10,
    })), [count]);
  return (
    <div className={cn("absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      {p.map((d) => (
        <motion.div key={d.id} className="absolute rounded-full bg-foreground/20"
          style={{ left: `${d.x}%`, top: `${d.y}%`, width: d.sz, height: d.sz }}
          animate={{ y: [0, -30, 0], x: [0, d.dr, 0], opacity: [d.op, d.op * 1.5, d.op] }}
          transition={{ duration: d.dur, delay: d.del, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

/* ── Ambient Glow ────────────────────────────────────────── */

export function AmbientGlow({ color = "hsl(var(--accent)/0.15)", size = "60vw", className }: {
  color?: string; size?: string; className?: string;
}): React.JSX.Element {
  return (
    <div className={cn("absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-[60px] animate-pulse-glow pointer-events-none", className)}
      style={{ width: size, height: size, background: `radial-gradient(circle, ${color} 0%, transparent 70%)` }} aria-hidden="true" />
  );
}
