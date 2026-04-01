"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

export function Parallax({ children, speed = 0.5, direction = "up", className }: {
  children: ReactNode; speed?: number; direction?: "up" | "down"; className?: string;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const f = direction === "up" ? -1 : 1;
  const y = useTransform(scrollYProgress, [0, 1], [0, 200 * speed * f]);
  const sy = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div ref={ref} className={cn(className)} style={{ y: sy }}>{children}</motion.div>;
}

export function ParallaxSection({ bgElement, children, fgElement, className }: {
  bgElement?: ReactNode; children: ReactNode; fgElement?: ReactNode; className?: string;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const cY = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const fgY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const op = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.4, 1, 1, 0.4]);
  return (
    <motion.div ref={ref} className={cn("relative overflow-hidden", className)} style={{ opacity: op }}>
      {bgElement && <motion.div className="absolute inset-0 z-0" style={{ y: bgY }} aria-hidden="true">{bgElement}</motion.div>}
      <motion.div className="relative z-10" style={{ y: cY }}>{children}</motion.div>
      {fgElement && <motion.div className="absolute inset-0 z-20 pointer-events-none" style={{ y: fgY }} aria-hidden="true">{fgElement}</motion.div>}
    </motion.div>
  );
}
