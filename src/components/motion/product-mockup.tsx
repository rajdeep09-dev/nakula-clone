"use client";

import { type ReactNode } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { TiltCard } from "@/components/motion/tilt-card";

/* ── Browser Window Mockup (Linear/Stripe/Vercel style) ──── */

export function BrowserMockup({ children, url = "app.yourbrand.com", className, glow = true }: {
  children: ReactNode; url?: string; className?: string; glow?: boolean;
}): React.JSX.Element {
  return (
    <TiltCard maxTilt={4} className={cn("w-full", className)}>
      <motion.div className={cn("browser-chrome relative", glow && "glow-lg animate-glow-pulse")}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-64px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        {/* Chrome bar */}
        <div className="browser-chrome-bar">
          <div className="browser-dot browser-dot-red" />
          <div className="browser-dot browser-dot-yellow" />
          <div className="browser-dot browser-dot-green" />
          <div className="browser-url">{url}</div>
        </div>
        {/* Content area */}
        <div className="relative aspect-[16/10] overflow-hidden bg-background">
          {children}
        </div>
      </motion.div>
    </TiltCard>
  );
}

/* ── Phone Mockup ────────────────────────────────────────── */

export function PhoneMockup({ children, className, glow = true }: {
  children: ReactNode; className?: string; glow?: boolean;
}): React.JSX.Element {
  return (
    <TiltCard maxTilt={6} className={cn("mx-auto w-[280px]", className)}>
      <motion.div
        className={cn("relative rounded-[40px] border-[6px] border-foreground/10 bg-card p-2", glow && "glow-lg")}
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-64px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
        {/* Notch */}
        <div className="absolute left-1/2 top-2 z-20 h-6 w-24 -translate-x-1/2 rounded-full bg-foreground/10" />
        {/* Screen */}
        <div className="relative aspect-[9/19] overflow-hidden rounded-[32px] bg-background">
          {children}
        </div>
      </motion.div>
    </TiltCard>
  );
}
