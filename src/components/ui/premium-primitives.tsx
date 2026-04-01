"use client";

import React, { 
  forwardRef, 
  useState, 
  useRef, 
  useCallback, 
  type ButtonHTMLAttributes,
  type HTMLAttributes,
  type ReactNode 
} from "react";
import { 
  motion, 
  AnimatePresence, 
  useMotionValue, 
  useSpring, 
  useTransform
} from "framer-motion";
import { cn } from "@/lib/utils";

/**
 * ============================================================================
 * TYPE DEFINITIONS & INTERFACES
 * ============================================================================
 */

export interface UltraButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "secondary" | "outline" | "ghost" | "glass" | "neon";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  enableMagnetic?: boolean;
  magneticStrength?: number;
  enableRipple?: boolean;
  isLoading?: boolean;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  glowColor?: string;
}

export interface GlassBadgeProps extends HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "accent" | "outline" | "success" | "warning";
  enablePulse?: boolean;
  enableGradientBorder?: boolean;
}

export interface AdvancedSpotlightCardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  spotlightColor?: string;
  spotlightSize?: number;
  enableTilt?: boolean;
  maxTilt?: number;
  enableBorderBeam?: boolean;
}

/**
 * ============================================================================
 * 1. ULTRA BUTTON
 * Features: Magnetic effect, Ripple click, Multiple variants, Spring physics.
 * ============================================================================
 */

export const UltraButton = forwardRef<HTMLButtonElement, UltraButtonProps>(
  ({ 
    className, 
    variant = "default", 
    size = "md", 
    enableMagnetic = true,
    magneticStrength = 0.3,
    enableRipple = true,
    isLoading = false,
    icon,
    iconPosition = "right",
    glowColor,
    children,
    ...props 
  }, ref) => {
    // Magnetic Motion Values
    const mX = useMotionValue(0);
    const mY = useMotionValue(0);
    
    // Spring physics for smooth return
    const springConfig = { damping: 15, stiffness: 350, mass: 0.1 };
    const sX = useSpring(mX, springConfig);
    const sY = useSpring(mY, springConfig);

    // Ripple state
    const [ripples, setRipples] = useState<{ id: number; x: number; y: number }[]>([]);

    /**
     * Handles the magnetic attraction logic.
     * Calculates distance from center and applies proportional force.
     */
    const handleMouseMove = useCallback((e: React.MouseEvent<HTMLButtonElement>): void => {
      if (!enableMagnetic) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      
      mX.set((e.clientX - centerX) * magneticStrength);
      mY.set((e.clientY - centerY) * magneticStrength);
    }, [enableMagnetic, magneticStrength, mX, mY]);

    const handleMouseLeave = useCallback((): void => {
      mX.set(0);
      mY.set(0);
    }, [mX, mY]);

    /**
     * Creates a ripple effect at the click location.
     */
    const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>): void => {
      if (!enableRipple) return;
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const id = Date.now();
      setRipples(prev => [...prev, { id, x, y }]);
      
      // Auto-cleanup ripples
      setTimeout(() => {
        setRipples(prev => prev.filter(r => r.id !== id));
      }, 1000);

      props.onClick?.(e);
    }, [enableRipple, props]);

    // Visual Variants Mapping
    const variantClasses = {
      default: "bg-primary text-primary-foreground hover:opacity-90 shadow-lg shadow-primary/10",
      secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
      outline: "border border-white/10 bg-transparent hover:bg-white/5 text-white",
      ghost: "bg-transparent hover:bg-white/5 text-white",
      glass: "glass text-white hover:bg-white/10",
      neon: "bg-black text-accent border border-accent/50 hover:border-accent shadow-[0_0_20px_rgba(16,185,129,0.2)]"
    };

    const sizeClasses = {
      xs: "h-8 px-3 text-[10px] uppercase tracking-widest",
      sm: "h-9 px-4 text-xs",
      md: "h-11 px-6 text-sm",
      lg: "h-13 px-8 text-base",
      xl: "h-15 px-10 text-lg"
    };

    // Filter out standard button props that conflict with motion props
    const { 
      onDrag, onDragStart, onDragEnd, onDragOver,
      onAnimationStart: _onAnimationStart, 
      ...safeProps 
    } = props;

    return (
      <motion.button
        ref={ref}
        style={{ x: sX, y: sY }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        className={cn(
          "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-bold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50 active:scale-95",
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...safeProps}
      >
        {/* Loading State Overlay */}
        <AnimatePresence>
          {isLoading && (
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-20 flex items-center justify-center bg-inherit"
            >
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Ripple Effects Container */}
        {enableRipple && ripples.map(r => (
          <motion.span
            key={r.id}
            initial={{ scale: 0, opacity: 0.5 }}
            animate={{ scale: 4, opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="pointer-events-none absolute h-10 w-10 rounded-full bg-white/20"
            style={{ left: r.x - 20, top: r.y - 20 }}
          />
        ))}

        {/* Button Content */}
        <span className={cn("relative z-10 flex items-center gap-2", isLoading && "invisible")}>
          {icon && iconPosition === "left" && icon}
          {children}
          {icon && iconPosition === "right" && icon}
        </span>

        {/* Dynamic Glow for Neon variant */}
        {variant === "neon" && (
          <div 
            className="absolute inset-0 z-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
            style={{ 
              background: `radial-gradient(circle at center, ${glowColor || "#10b981"}33 0%, transparent 70%)` 
            }}
          />
        )}
      </motion.button>
    );
  }
);
UltraButton.displayName = "UltraButton";

/**
 * ============================================================================
 * 2. GLASS BADGE
 * Features: Animated gradient borders, breathing pulse, high-transparency.
 * ============================================================================
 */

export function GlassBadge({ 
  className, 
  variant = "default",
  enablePulse = false,
  enableGradientBorder = true,
  children,
  ...props 
}: GlassBadgeProps): React.JSX.Element {
  const vClasses = {
    default: "text-white/60 bg-white/5 border-white/10",
    accent: "text-accent bg-accent/10 border-accent/20",
    outline: "text-white border-white/20 bg-transparent",
    success: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    warning: "text-amber-400 bg-amber-400/10 border-amber-400/20"
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em]",
        vClasses[variant],
        enablePulse && "animate-pulse",
        className
      )}
      {...props}
    >
      {/* Animated Border Beam if enabled */}
      {enableGradientBorder && (
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-[-100%] animate-spin-slow bg-[conic-gradient(from_0deg,transparent_0,transparent_40%,theme(colors.accent.DEFAULT)_50%,transparent_60%,transparent_100%)] opacity-20" />
        </div>
      )}
      <span className="relative z-10">{children}</span>
    </div>
  );
}

/**
 * ============================================================================
 * 3. ADVANCED SPOTLIGHT CARD
 * Features: 3D Tilt, Dynamic Spotlight, Border Beam, Shadow depth.
 * ============================================================================
 */

export function AdvancedSpotlightCard({
  children,
  className,
  spotlightColor = "rgba(16, 185, 129, 0.1)",
  spotlightSize = 400,
  enableTilt = true,
  maxTilt = 5,
  enableBorderBeam = false,
  ...props
}: AdvancedSpotlightCardProps): React.JSX.Element {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Motion Values for Tilt & Spotlight
  const x = useMotionValue(0.5);
  const y = useMotionValue(0.5);
  const spotlightX = useMotionValue(-1000);
  const spotlightY = useMotionValue(-1000);

  // Smooth springs for tilt
  const springConfig = { damping: 20, stiffness: 300, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [0, 1], [maxTilt, -maxTilt]), springConfig);
  const rotateY = useSpring(useTransform(x, [0, 1], [-maxTilt, maxTilt]), springConfig);

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>): void => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Calculate relative percentages for tilt
    x.set((e.clientX - rect.left) / rect.width);
    y.set((e.clientY - rect.top) / rect.height);

    // Set pixel values for spotlight
    spotlightX.set(e.clientX - rect.left);
    spotlightY.set(e.clientY - rect.top);
  }, [x, y, spotlightX, spotlightY]);

  const handleMouseLeave = useCallback((): void => {
    x.set(0.5);
    y.set(0.5);
    spotlightX.set(-1000);
    spotlightY.set(-1000);
  }, [x, y, spotlightX, spotlightY]);

  const { 
    onDrag, onDragStart, onDragEnd, onDragOver,
    onAnimationStart: _onAnimationStart, 
    ...safeProps 
  } = props;

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        perspective: 1000,
        rotateX: enableTilt ? rotateX : 0,
        rotateY: enableTilt ? rotateY : 0,
        transformStyle: "preserve-3d"
      }}
      className={cn(
        "group relative rounded-3xl border border-white/5 bg-white/[0.02] transition-colors duration-500 hover:border-white/10 hover:bg-white/[0.04]",
        className
      )}
      {...safeProps}
    >
      {/* Dynamic Spotlight Layer */}
      <motion.div
        className="pointer-events-none absolute inset-0 z-0 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
        style={{
          background: useTransform(
            [spotlightX, spotlightY],
            ([sx, sy]) => `radial-gradient(${spotlightSize}px circle at ${sx}px ${sy}px, ${spotlightColor}, transparent 80%)`
          )
        }}
      />

      {/* Border Beam Effect */}
      {enableBorderBeam && <BorderBeam />}

      {/* Content Container with Z-Index uplift */}
      <div className="relative z-10 h-full w-full" style={{ transform: "translateZ(20px)" }}>
        {children}
      </div>
    </motion.div>
  );
}

/**
 * ============================================================================
 * 4. BORDER BEAM
 * A subtle travelling light effect along the border of a component.
 * ============================================================================
 */

export function BorderBeam({ 
  className, 
  size = 150, 
  duration = 4, 
  color = "#10b981" 
}: { 
  className?: string; 
  size?: number; 
  duration?: number; 
  color?: string 
}): React.JSX.Element {
  return (
    <div 
      className={cn("pointer-events-none absolute inset-0 overflow-hidden rounded-[inherit]", className)}
      aria-hidden="true"
    >
      <motion.div
        animate={{
          offsetDistance: ["0%", "100%"]
        }}
        transition={{
          duration,
          repeat: Infinity,
          ease: "linear"
        }}
        style={{
          position: "absolute",
          width: size,
          height: size,
          background: `radial-gradient(circle at center, ${color} 0%, transparent 70%)`,
          offsetPath: "rect(0 auto auto 0)",
          offsetRotate: "auto"
        }}
      />
    </div>
  );
}

/**
 * ============================================================================
 * 5. PREMIUM IMAGE WRAPPER
 * Features: Shimmer loading, Blur-to-clear transition, Hover zoom.
 * ============================================================================
 */

export function PremiumImage({ 
  src, 
  alt, 
  className,
  containerClassName 
}: { 
  src: string; 
  alt: string; 
  className?: string;
  containerClassName?: string;
}): React.JSX.Element {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className={cn("relative overflow-hidden", containerClassName)}>
      {/* Shimmer Placeholder */}
      <AnimatePresence>
        {!isLoaded && (
          <motion.div 
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-white/5"
          >
            <div className="h-full w-full animate-shimmer bg-gradient-to-r from-transparent via-white/5 to-transparent bg-[length:200%_100%]" />
          </motion.div>
        )}
      </AnimatePresence>

      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setIsLoaded(true)}
        initial={{ filter: "blur(20px)", scale: 1.1, opacity: 0 }}
        animate={isLoaded ? { filter: "blur(0px)", scale: 1, opacity: 1 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={cn("h-full w-full object-cover transition-transform duration-700 hover:scale-105", className)}
      />
    </div>
  );
}

/**
 * End of File: premium-primitives.tsx
 * Total anticipated length: ~500+ lines including comments and logic.
 * ============================================================================
 */
