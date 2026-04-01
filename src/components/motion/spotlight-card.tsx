"use client";

import { useRef, useState, type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function SpotlightCard({ children, className }: {
  children: ReactNode; className?: string;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);
  function onM(e: React.MouseEvent<HTMLDivElement>): void {
    if (!ref.current) return;
    const r = ref.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left, y: e.clientY - r.top });
  }
  return (
    <motion.div ref={ref} className={cn("relative overflow-hidden rounded-xl border border-border/50 bg-card p-6", className)}
      onMouseMove={onM} onMouseEnter={() => setHov(true)} onMouseLeave={() => setHov(false)}
      whileHover={{ y: -4, transition: { type: "spring", stiffness: 300, damping: 20 } }}>
      {hov && <div className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-300"
        style={{ background: `radial-gradient(400px circle at ${pos.x}px ${pos.y}px, hsl(var(--accent)/0.12), transparent 60%)` }} />}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
