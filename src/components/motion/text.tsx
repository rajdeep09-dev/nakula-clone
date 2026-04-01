"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import { motion, useInView, AnimatePresence, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

/* ── Word-by-word headline reveal ─────────────────────────── */

export function TextReveal({ text, className, delay = 0, staggerSpeed = 0.04, as: Tag = "h1" }: {
  text: string; className?: string; delay?: number; staggerSpeed?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  const words = text.split(" ");
  const cont: Variants = { hidden: {}, visible: { transition: { staggerChildren: staggerSpeed, delayChildren: delay } } };
  const word: Variants = { hidden: { y: "110%", rotateX: -80, opacity: 0 }, visible: { y: "0%", rotateX: 0, opacity: 1, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } } };

  return (
    <motion.div ref={ref} variants={cont} initial="hidden" animate={inView ? "visible" : "hidden"} style={{ perspective: 400 }} aria-label={text}>
      <Tag className={cn(className)}>
        {words.map((w, i) => (
          <span key={`${w}-${i}`} className="inline-block overflow-hidden" style={{ marginRight: "0.25em" }}>
            <motion.span className="inline-block" variants={word} style={{ transformOrigin: "center top" }}>{w}</motion.span>
          </span>
        ))}
      </Tag>
    </motion.div>
  );
}

/* ── Blur dissolve reveal ─────────────────────────────────── */

export function BlurReveal({ children, className, delay = 0, duration = 0.8 }: {
  children: React.ReactNode; className?: string; delay?: number; duration?: number;
}): React.JSX.Element {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  return (
    <motion.div ref={ref} className={cn(className)}
      initial={{ opacity: 0, y: 8, filter: "blur(12px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : { opacity: 0, y: 8, filter: "blur(12px)" }}
      transition={{ duration, delay, ease: [0.16, 1, 0.3, 1] }}>
      {children}
    </motion.div>
  );
}

/* ── Animated number counter ──────────────────────────────── */

export function CountUp({ target, duration = 2, prefix = "", suffix = "", className }: {
  target: number; duration?: number; prefix?: string; suffix?: string; className?: string;
}): React.JSX.Element {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-64px" });
  const [count, setCount] = useState(0);
  const ran = useRef(false);
  const raf = useRef(0);
  const ease = useCallback((t: number): number => 1 - Math.pow(1 - t, 3), []);

  useEffect(() => {
    if (!inView || ran.current) return;
    ran.current = true;
    let start: number | null = null;
    const ms = duration * 1000;
    function tick(ts: number): void {
      if (start === null) start = ts;
      const p = Math.min((ts - start) / ms, 1);
      setCount(Math.round(ease(p) * target));
      if (p < 1) raf.current = requestAnimationFrame(tick);
    }
    raf.current = requestAnimationFrame(tick);
    return () => { cancelAnimationFrame(raf.current); };
  }, [inView, target, duration, ease]);

  return <span ref={ref} className={cn(className)}>{prefix}{count}{suffix}</span>;
}

/* ── Text Cycler (rotating words with AnimatePresence) ────── */

export function TextCycler({ words, className, interval = 3000 }: {
  words: string[]; className?: string; interval?: number;
}): React.JSX.Element {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, interval);
    return () => { clearInterval(timer); };
  }, [words.length, interval]);

  return (
    <span className={cn("relative inline-block overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[index]}
          className="inline-block"
          initial={{ y: "100%", opacity: 0, filter: "blur(8px)" }}
          animate={{ y: "0%", opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-100%", opacity: 0, filter: "blur(8px)" }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {words[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}
