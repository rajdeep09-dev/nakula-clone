"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, useScroll, useSpring, useMotionValue } from "framer-motion";

export function SmoothScrollProvider({ children }: { children: ReactNode }): React.JSX.Element {
  useEffect(() => {
    let inst: { raf: (t: number) => void; destroy: () => void } | null = null;
    let id = 0;
    async function init(): Promise<void> {
      const Lenis = (await import("@studio-freight/lenis")).default;
      inst = new Lenis({ duration: 1.2, easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), orientation: "vertical" as const, gestureOrientation: "vertical" as const, smoothWheel: true });
      function raf(time: number): void { inst?.raf(time); id = requestAnimationFrame(raf); }
      id = requestAnimationFrame(raf);
    }
    init();
    return () => { cancelAnimationFrame(id); inst?.destroy(); };
  }, []);
  return <>{children}</>;
}

export function ScrollProgress(): React.JSX.Element {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30, restDelta: 0.001 });
  return <motion.div className="scroll-progress" style={{ scaleX }} aria-hidden="true" />;
}

export function CustomCursor(): React.JSX.Element | null {
  const cx = useMotionValue(-100);
  const cy = useMotionValue(-100);
  const [hov, setHov] = useState(false);
  const [touch, setTouch] = useState(true);
  const ds = { damping: 25, stiffness: 300, mass: 0.5 };
  const dx = useSpring(cx, ds);
  const dy = useSpring(cy, ds);
  const rs = { damping: 20, stiffness: 200, mass: 0.8 };
  const rx = useSpring(cx, rs);
  const ry = useSpring(cy, rs);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const t = window.matchMedia("(pointer: coarse)").matches;
    setTouch(t);
    if (t) return;
    const sel = "a,button,[role='button'],input,textarea,select,label[for]";
    const onM = (e: MouseEvent): void => { cx.set(e.clientX); cy.set(e.clientY); };
    const onO = (e: MouseEvent): void => { if ((e.target as HTMLElement).closest(sel)) setHov(true); };
    const onL = (e: MouseEvent): void => { if ((e.target as HTMLElement).closest(sel)) setHov(false); };
    window.addEventListener("mousemove", onM, { passive: true });
    document.addEventListener("mouseover", onO, { passive: true });
    document.addEventListener("mouseout", onL, { passive: true });
    return () => { window.removeEventListener("mousemove", onM); document.removeEventListener("mouseover", onO); document.removeEventListener("mouseout", onL); };
  }, [cx, cy]);

  if (touch) return null;
  const sz = hov ? 60 : 40;
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[9999]">
      <motion.div className="fixed left-0 top-0 h-2 w-2 rounded-full bg-foreground" style={{ x: dx, y: dy, translateX: "-50%", translateY: "-50%", mixBlendMode: "difference" }} />
      <motion.div className="fixed left-0 top-0 rounded-full border border-foreground/50" animate={{ width: sz, height: sz }} style={{ x: rx, y: ry, translateX: "-50%", translateY: "-50%", mixBlendMode: "difference" }} transition={{ type: "spring", stiffness: 300, damping: 20 }} />
    </div>
  );
}

export function MotionProviders({ children }: { children: ReactNode }): React.JSX.Element {
  return <SmoothScrollProvider><ScrollProgress /><CustomCursor />{children}</SmoothScrollProvider>;
}
