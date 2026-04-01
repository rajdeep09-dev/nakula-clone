"use client";

import { useRef, type ReactNode } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
};

export function Reveal({ children, direction = "up", blur = false, delay = 0, duration = 0.6, className, once = true }: {
  children: ReactNode; direction?: "up" | "down" | "left" | "right" | "none"; blur?: boolean;
  delay?: number; duration?: number; className?: string; once?: boolean;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-64px" });
  const m = { up: { x: 0, y: 32 }, down: { x: 0, y: -32 }, left: { x: 32, y: 0 }, right: { x: -32, y: 0 }, none: { x: 0, y: 0 } } as const;
  const o = m[direction];
  return (
    <motion.div ref={ref} className={cn(className)}
      initial={{ opacity: 0, x: o.x, y: o.y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      animate={inView ? { opacity: 1, x: 0, y: 0, filter: "blur(0px)" } : { opacity: 0, x: o.x, y: o.y, filter: blur ? "blur(8px)" : "blur(0px)" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

export function StaggerReveal({ children, className, staggerDelay = 0.06, once = true }: {
  children: ReactNode; className?: string; staggerDelay?: number; once?: boolean;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-64px" });
  return (
    <motion.div ref={ref} className={cn(className)}
      variants={{ hidden: { opacity: 1 }, visible: { opacity: 1, transition: { staggerChildren: staggerDelay, delayChildren: 0.1 } } }}
      initial="hidden" animate={inView ? "visible" : "hidden"}>
      {children}
    </motion.div>
  );
}

export function ScaleReveal({ children, className, delay = 0, once = true }: {
  children: ReactNode; className?: string; delay?: number; once?: boolean;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-64px" });
  return (
    <motion.div ref={ref} className={cn(className)}
      initial={{ opacity: 0, scale: 0.9, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, scale: 1, filter: "blur(0px)" } : { opacity: 0, scale: 0.9, filter: "blur(8px)" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}
