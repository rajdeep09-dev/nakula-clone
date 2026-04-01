"use client";

import React, { 
  useEffect, 
  useRef, 
  useState, 
  useCallback, 
  useMemo,
  type ReactNode
} from "react";
import { 
  motion, 
  useScroll, 
  useSpring, 
  useMotionValue, 
  useTransform,
  AnimatePresence,
  MotionConfig,
  type Variants
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * TYPE DEFINITIONS & INTERFACES
 * ============================================================================
 */

/**
 * Configuration for the Smooth Scroll system.
 * Based on Lenis (studio-freight).
 */
interface SmoothScrollOptions {
  duration?: number;
  easing?: (t: number) => number;
  orientation?: "vertical" | "horizontal";
  gestureOrientation?: "vertical" | "horizontal" | "both";
  smoothWheel?: boolean;
  wheelMultiplier?: number;
  touchMultiplier?: number;
  infinite?: boolean;
}

/**
 * Configuration for the Custom Physics Cursor.
 */
interface CursorOptions {
  dotSize?: number;
  ringSize?: number;
  springConfig?: {
    damping?: number;
    stiffness?: number;
    mass?: number;
  };
  enableMixBlendMode?: boolean;
}

/**
 * Props for the Universe Motion Core provider.
 */
interface UniverseMotionProps {
  children: ReactNode;
  scrollOptions?: SmoothScrollOptions;
  cursorOptions?: CursorOptions;
  enableNoise?: boolean;
  enableScrollProgress?: boolean;
}

/**
 * ============================================================================
 * UTILITY FUNCTIONS
 * ============================================================================
 */

/**
 * Cubic exponential easing function for smooth motion.
 * @param t - Current time (0-1)
 * @returns Eased value
 */
const expoEasing = (t: number): number => 
  t === 1 ? 1 : 1 - Math.pow(2, -10 * t);

/**
 * ============================================================================
 * CORE COMPONENTS
 * ============================================================================
 */

/**
 * 1. Smooth Scroll Provider
 * Integrates Lenis for high-performance inertial scrolling.
 */
export function SmoothScrollProvider({ 
  children, 
  options = {} 
}: { 
  children: ReactNode; 
  options?: SmoothScrollOptions 
}): React.JSX.Element {
  const lenisRef = useRef<{ 
    raf: (t: number) => void; 
    destroy: () => void;
    scrollTo: (target: string | number | HTMLElement) => void;
  } | null>(null);
  
  const rafId = useRef<number>(0);

  useEffect(() => {
    /**
     * Dynamically import Lenis to prevent SSR issues and 
     * ensure heavy animation logic only loads on the client.
     */
    async function initLenis(): Promise<void> {
      const { default: Lenis } = await import("@studio-freight/lenis");
      
      const lenis = new Lenis({
        duration: options.duration ?? 1.2,
        easing: options.easing ?? expoEasing,
        orientation: options.orientation ?? "vertical",
        gestureOrientation: options.gestureOrientation ?? "vertical",
        smoothWheel: options.smoothWheel ?? true,
        wheelMultiplier: options.wheelMultiplier ?? 1,
        touchMultiplier: options.touchMultiplier ?? 2,
        infinite: options.infinite ?? false,
      });

      lenisRef.current = lenis;

      function raf(time: number): void {
        lenis.raf(time);
        rafId.current = requestAnimationFrame(raf);
      }

      rafId.current = requestAnimationFrame(raf);
    }

    initLenis();

    return () => {
      cancelAnimationFrame(rafId.current);
      lenisRef.current?.destroy();
    };
  }, [options]);

  return <>{children}</>;
}

/**
 * 2. Physics-Based Custom Cursor
 * A sophisticated trailing cursor that responds to interactive elements.
 */
export function PhysicsCursor({ 
  options = {} 
}: { 
  options?: CursorOptions 
}): React.JSX.Element | null {
  // Motion values for raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Component state
  const [isHovering, setIsHovering] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);
  const [isVisible, setIsVisible] = useState(false);

  // Configuration
  const springConfig = options.springConfig ?? { 
    damping: 25, 
    stiffness: 300, 
    mass: 0.5 
  };

  // Trailing effect springs
  const trailingX = useSpring(mouseX, springConfig);
  const trailingY = useSpring(mouseY, springConfig);

  // Interaction handlers
  const handleMouseMove = useCallback((e: MouseEvent): void => {
    mouseX.set(e.clientX);
    mouseY.set(e.clientY);
    if (!isVisible) setIsVisible(true);
  }, [mouseX, mouseY, isVisible]);

  const handlePointerOver = useCallback((e: MouseEvent): void => {
    const target = e.target as HTMLElement;
    const isInteractive = target.closest("a, button, [role='button'], input, select, textarea");
    setIsHovering(!!isInteractive);
  }, []);

  useEffect(() => {
    // Detect touch devices to avoid ghost cursors
    const touchCheck = window.matchMedia("(pointer: coarse)").matches;
    setIsTouchDevice(touchCheck);

    if (touchCheck) return;

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseover", handlePointerOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseover", handlePointerOver);
    };
  }, [handleMouseMove, handlePointerOver]);

  if (isTouchDevice) return null;

  const dotSize = options.dotSize ?? 8;
  const ringSize = isHovering ? (options.ringSize ?? 64) : 40;

  return (
    <div 
      className="pointer-events-none fixed inset-0 z-[10000] overflow-hidden" 
      aria-hidden="true"
    >
      <AnimatePresence>
        {isVisible && (
          <>
            {/* Inner Dot - Precise Tracker */}
            <motion.div
              className="fixed left-0 top-0 h-2 w-2 rounded-full bg-primary"
              style={{
                x: mouseX,
                y: mouseY,
                translateX: "-50%",
                translateY: "-50%",
                width: dotSize,
                height: dotSize,
                mixBlendMode: options.enableMixBlendMode !== false ? "difference" : "normal"
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
            />

            {/* Outer Ring - Delayed Trailing Effect */}
            <motion.div
              className="fixed left-0 top-0 rounded-full border border-primary/50"
              animate={{ 
                width: ringSize, 
                height: ringSize,
                opacity: isHovering ? 0.8 : 0.4
              }}
              style={{
                x: trailingX,
                y: trailingY,
                translateX: "-50%",
                translateY: "-50%",
                mixBlendMode: options.enableMixBlendMode !== false ? "difference" : "normal"
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            />
          </>
        )}
      </AnimatePresence>
    </div>
  );
}

/**
 * 3. Advanced Scroll Progress
 * A premium scroll indicator with magnetic behavior and gradient fill.
 */
export function ScrollProgress(): React.JSX.Element {
  const { scrollYProgress } = useScroll();
  
  // Create a smoothed version of the progress
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Dynamic opacity based on scroll position
  const opacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <motion.div 
      className="fixed left-0 right-0 top-0 z-[9999] h-1 origin-left bg-gradient-to-r from-accent via-emerald-400 to-accent"
      style={{ scaleX, opacity }}
      aria-hidden="true"
    />
  );
}

/**
 * 4. Noise Texture Overlay
 * Adds a cinematic film grain texture to the entire application.
 */
export function NoiseTexture({ 
  opacity = 0.03, 
  className 
}: { 
  opacity?: number; 
  className?: string 
}): React.JSX.Element {
  return (
    <div 
      className={cn(
        "pointer-events-none fixed inset-0 z-[9998] transform-gpu", 
        className
      )}
      style={{ opacity }}
      aria-hidden="true"
    >
      <svg className="h-full w-full">
        <filter id="noiseFilter">
          <feTurbulence 
            type="fractalNoise" 
            baseFrequency="0.65" 
            numOctaves="3" 
            stitchTiles="stitch" 
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#noiseFilter)" />
      </svg>
    </div>
  );
}

/**
 * 5. Page Load Transition
 * Orchestrates the entry animation for the entire page.
 */
const pageTransitionVariants: Variants = {
  initial: { opacity: 0, y: 20, filter: "blur(10px)" },
  animate: { 
    opacity: 1, 
    y: 0, 
    filter: "blur(0px)",
    transition: {
      duration: 0.8,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1
    }
  }
};

/**
 * ============================================================================
 * MAIN EXPORT: Universe Motion Core
 * ============================================================================
 */

/**
 * The ultimate motion provider for high-end web applications.
 * Consolidates all core motion services into a single, highly-performant wrapper.
 */
export function UniverseMotion({ 
  children,
  scrollOptions,
  cursorOptions,
  enableNoise = true,
  enableScrollProgress = true
}: UniverseMotionProps): React.JSX.Element {
  /**
   * We use MotionConfig to provide a global baseline for 
   * transition settings, ensuring consistent behavior across all components.
   */
  const globalSpringConfig = useMemo(() => ({
    type: "spring" as const,
    stiffness: 300,
    damping: 30,
    mass: 1
  }), []);

  return (
    <MotionConfig transition={globalSpringConfig}>
      <SmoothScrollProvider options={scrollOptions}>
        {/* Core Visual Overlays */}
        {enableNoise && <NoiseTexture />}
        {enableScrollProgress && <ScrollProgress />}
        <PhysicsCursor options={cursorOptions} />

        {/* Global Page Entry Wrapper */}
        <motion.div
          variants={pageTransitionVariants}
          initial="initial"
          animate="animate"
          className="relative flex min-h-screen flex-col"
        >
          {children}
        </motion.div>
      </SmoothScrollProvider>
    </MotionConfig>
  );
}

/**
 * ============================================================================
 * REUSABLE ANIMATION CONSTANTS
 * ============================================================================
 */

/**
 * Standard staggered reveal variants for child elements.
 */
export const ultraStaggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

export const ultraStaggerItem: Variants = {
  hidden: { opacity: 0, y: 30, filter: "blur(10px)", scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 260,
      damping: 20
    }
  }
};

/**
 * Hover behavior for premium interactive cards.
 */
export const premiumCardHover = {
  y: -8,
  scale: 1.02,
  transition: {
    type: "spring",
    stiffness: 400,
    damping: 10
  }
};

/**
 * ============================================================================
 * CUSTOM HOOKS
 * ============================================================================
 */

/**
 * Hook to track mouse velocity and direction.
 * Useful for complex shaders or advanced particle interaction.
 */
export function useMouseVelocity() {
  const lastX = useRef(0);
  const lastY = useRef(0);
  const velocity = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const dx = e.clientX - lastX.current;
      const dy = e.clientY - lastY.current;
      velocity.current = { x: dx, y: dy };
      lastX.current = e.clientX;
      lastY.current = e.clientY;
    };

    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return velocity;
}

/**
 * End of File: universe.tsx
 * Total anticipated length: ~400+ lines including comments and logic.
 * ============================================================================
 */
