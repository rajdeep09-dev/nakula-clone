"use client";

import React, { 
  useRef, 
  useMemo, 
  useCallback, 
  useEffect, 
  useState 
} from "react";
import { 
  motion
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * TYPE DEFINITIONS & INTERFACES
 * ============================================================================
 */

interface AuroraBlobProps {
  color: string;
  size?: string;
  initialPos?: { x: string; y: string };
  duration?: number;
  delay?: number;
  opacity?: number;
}

interface ParticleProps {
  count?: number;
  color?: string;
  minSize?: number;
  maxSize?: number;
  minSpeed?: number;
  maxSpeed?: number;
}

/**
 * ============================================================================
 * 1. ULTRA AURORA BACKGROUND
 * Features: Multi-layered blob animation with deep blur and parallax.
 * ============================================================================
 */

function AuroraBlob({ 
  color, 
  size = "60vw", 
  initialPos = { x: "0%", y: "0%" },
  duration = 20,
  delay = 0,
  opacity = 0.3
}: AuroraBlobProps) {
  return (
    <motion.div
      initial={{ ...initialPos, scale: 1 }}
      animate={{
        x: ["-10%", "10%", "5%", "-5%", "-10%"],
        y: ["-5%", "15%", "-10%", "10%", "-5%"],
        scale: [1, 1.1, 0.9, 1.05, 1],
        rotate: [0, 45, -45, 90, 0]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut"
      }}
      className="absolute rounded-full mix-blend-screen transform-gpu"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
        filter: "blur(120px)",
        opacity
      }}
    />
  );
}

export function UltraAurora({ className }: { className?: string }): React.JSX.Element {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden="true">
      <AuroraBlob color="rgba(16, 185, 129, 0.4)" size="70vw" initialPos={{ x: "-20%", y: "-20%" }} duration={25} />
      <AuroraBlob color="rgba(59, 130, 246, 0.3)" size="60vw" initialPos={{ x: "40%", y: "-10%" }} duration={30} delay={2} />
      <AuroraBlob color="rgba(139, 92, 246, 0.2)" size="80vw" initialPos={{ x: "10%", y: "40%" }} duration={35} delay={5} />
      <AuroraBlob color="rgba(236, 72, 153, 0.1)" size="50vw" initialPos={{ x: "-10%", y: "60%" }} duration={20} delay={8} />
    </div>
  );
}

/**
 * ============================================================================
 * 2. RETRO GRID
 * Features: Perspective-based scrolling grid with neon accents.
 * ============================================================================
 */

export function RetroGrid({
  className,
  angle = 65,
  cellSize = 60,
  opacity = 0.3,
  color = "rgba(255, 255, 255, 0.1)"
}: {
  className?: string;
  angle?: number;
  cellSize?: number;
  opacity?: number;
  color?: string;
}): React.JSX.Element {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 overflow-hidden [perspective:300px]",
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      <div
        className="absolute inset-0 [transform:rotateX(var(--grid-angle))]"
        style={
          {
            "--grid-angle": `${angle}deg`,
            backgroundImage: `
              linear-gradient(to right, ${color} 1px, transparent 0), 
              linear-gradient(to bottom, ${color} 1px, transparent 0)
            `,
            backgroundSize: `${cellSize}px ${cellSize}px`,
            backgroundRepeat: "repeat",
            transformOrigin: "center center",
            animation: "retro-grid-scroll 30s linear infinite",
          } as React.CSSProperties
        }
      />
      
      {/* Fade overlay to hide the horizon */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />

      <style>{`
        @keyframes retro-grid-scroll {
          0% { background-position: 0 0; }
          100% { background-position: 0 ${cellSize}px; }
        }
      `}</style>
    </div>
  );
}

/**
 * ============================================================================
 * 3. INTERACTIVE DOT GRID
 * Features: Dynamic scaling and brightening based on cursor distance.
 * ============================================================================
 */

export function InteractiveDotGrid({ 
  className,
  dotColor = "rgba(255, 255, 255, 0.2)",
  activeColor = "#10b981",
  gap = 24
}: { 
  className?: string;
  dotColor?: string;
  activeColor?: string;
  gap?: number;
}): React.JSX.Element {
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

  // Pre-calculate dot positions to avoid heavy render cycles
  const dots = useMemo(() => {
    const arr: Array<{ id: string; cx: number; cy: number }> = [];
    const cols = 80;
    const rows = 50;
    for (let r = 0; r < rows; r++) {
      for (let c = 0; c < cols; c++) {
        arr.push({ id: `d-${r}-${c}`, cx: c * gap + gap / 2, cy: r * gap + gap / 2 });
      }
    }
    return arr;
  }, [gap]);

  return (
    <div 
      ref={containerRef} 
      className={cn("absolute inset-0 overflow-hidden", className)}
      onMouseMove={handleMouseMove} 
      onMouseLeave={handleMouseLeave} 
      aria-hidden="true"
    >
      <svg className="h-full w-full opacity-40">
        {dots.map((dot) => {
          const dx = dot.cx - mousePos.x;
          const dy = dot.cy - mousePos.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 180;
          
          // Smooth interpolation for visual weight
          const factor = dist < maxDist ? (1 - dist / maxDist) : 0;
          const opacity = 0.1 + factor * 0.8;
          const radius = 1 + factor * 2;
          const fill = factor > 0.5 ? activeColor : dotColor;

          return (
            <circle 
              key={dot.id} 
              cx={dot.cx} 
              cy={dot.cy} 
              r={radius}
              fill={fill} 
              className="transition-all duration-300"
              style={{ opacity }} 
            />
          );
        })}
      </svg>
    </div>
  );
}

/**
 * ============================================================================
 * 4. HIGH-PERFORMANCE PARTICLES
 * Features: Canvas-based system, Mouse repulsion, Depth of field simulation.
 * ============================================================================
 */

export function HighPerfParticles({
  count = 100,
  color = "255, 255, 255",
  minSize = 0.5,
  maxSize = 2.5,
  minSpeed = 0.1,
  maxSpeed = 0.8
}: ParticleProps): React.JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let animationFrameId: number;
    let w: number, h: number;
    const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;

    // Internal Particle Class
    class Particle {
      x: number; y: number; vx: number; vy: number; size: number; alpha: number;
      baseX: number; baseY: number;

      constructor() {
        this.x = Math.random() * w;
        this.y = Math.random() * h;
        this.baseX = this.x;
        this.baseY = this.y;
        this.vx = (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed;
        this.vy = (Math.random() - 0.5) * (maxSpeed - minSpeed) + minSpeed;
        this.size = Math.random() * (maxSize - minSize) + minSize;
        this.alpha = Math.random() * 0.5 + 0.1;
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;

        // Wrap around screen
        if (this.x < 0) this.x = w;
        if (this.x > w) this.x = 0;
        if (this.y < 0) this.y = h;
        if (this.y > h) this.y = 0;

        // Mouse interaction logic
        const dx = mouseRef.current.x - this.x;
        const dy = mouseRef.current.y - this.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const forceThreshold = 100;

        if (distance < forceThreshold) {
          const force = (forceThreshold - distance) / forceThreshold;
          this.x -= dx * force * 0.1;
          this.y -= dy * force * 0.1;
        }
      }

      draw() {
        if (!ctx) return;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${color}, ${this.alpha})`;
        ctx.fill();
      }
    }

    const particles: Particle[] = [];

    const handleResize = () => {
      w = canvas.clientWidth;
      h = canvas.clientHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.scale(dpr, dpr);
      
      particles.length = 0;
      for (let i = 0; i < count; i++) {
        particles.push(new Particle());
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      };
    };

    const render = () => {
      ctx.clearRect(0, 0, w, h);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationFrameId = requestAnimationFrame(render);
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("mousemove", handleMouseMove);
    handleResize();
    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, [count, color, minSize, maxSize, minSpeed, maxSpeed]);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 h-full w-full pointer-events-none transform-gpu"
      aria-hidden="true"
    />
  );
}

/**
 * ============================================================================
 * 5. MESH GRADIENT
 * Features: High-quality blurred mesh points with randomized drifting.
 * ============================================================================
 */

export function PremiumMeshGradient({ className }: { className?: string }): React.JSX.Element {
  return (
    <div className={cn("absolute inset-0 -z-10 bg-black overflow-hidden", className)}>
      <div className="absolute inset-0 opacity-40">
        <div 
          className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full animate-aurora"
          style={{ background: "radial-gradient(circle, rgba(16, 185, 129, 0.2) 0%, transparent 70%)" }}
        />
        <div 
          className="absolute top-[10%] -right-[10%] w-[50%] h-[50%] rounded-full animate-aurora"
          style={{ background: "radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)", animationDelay: "2s" }}
        />
        <div 
          className="absolute -bottom-[20%] left-[20%] w-[70%] h-[70%] rounded-full animate-aurora"
          style={{ background: "radial-gradient(circle, rgba(139, 92, 246, 0.1) 0%, transparent 70%)", animationDelay: "4s" }}
        />
      </div>
      {/* Noise overlay for texture */}
      <div className="absolute inset-0 bg-[url('/noise.png')] opacity-[0.03] mix-blend-overlay" />
    </div>
  );
}

/**
 * End of File: atmospheres.tsx
 * Total anticipated length: ~450+ lines including comments and logic.
 * ============================================================================
 */
