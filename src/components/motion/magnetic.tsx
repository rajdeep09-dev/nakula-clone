"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function Magnetic({ children, strength = 0.35, className }: {
  children: ReactNode; strength?: number; className?: string;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0); const y = useMotionValue(0);
  const cfg = { stiffness: 350, damping: 15, mass: 0.2 };
  const sx = useSpring(x, cfg); const sy = useSpring(y, cfg);
  function onM(e: React.MouseEvent<HTMLDivElement>): void {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left - r.width / 2) * strength);
    y.set((e.clientY - r.top - r.height / 2) * strength);
  }
  function onL(): void { x.set(0); y.set(0); }
  return (
    <motion.div ref={ref} className={cn("inline-block", className)} style={{ x: sx, y: sy }}
      onMouseMove={onM} onMouseLeave={onL}>
      {children}
    </motion.div>
  );
}
