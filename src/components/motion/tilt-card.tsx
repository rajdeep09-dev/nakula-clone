"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

export function TiltCard({ children, className, maxTilt = 10 }: {
  children: ReactNode; className?: string; maxTilt?: number;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0.5); const y = useMotionValue(0.5);
  const cfg = { stiffness: 300, damping: 30, restDelta: 0.001 };
  const rX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), cfg);
  const rY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), cfg);
  function onM(e: React.MouseEvent<HTMLDivElement>): void {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width);
    y.set((e.clientY - r.top) / r.height);
  }
  function onL(): void { x.set(0.5); y.set(0.5); }
  return (
    <motion.div ref={ref} className={cn("relative", className)}
      style={{ perspective: 800, rotateX: rX, rotateY: rY, transformStyle: "preserve-3d" }}
      onMouseMove={onM} onMouseLeave={onL}
      whileHover={{ scale: 1.02, transition: { type: "spring", stiffness: 300, damping: 20 } }}>
      {children}
    </motion.div>
  );
}
