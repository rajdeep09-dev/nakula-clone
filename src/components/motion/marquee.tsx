"use client";

import { type ReactNode } from "react";
import { cn } from "@/lib/utils";

const SPD = { slow: "45s", normal: "30s", fast: "18s" } as const;

export function Marquee({ children, direction = "left", speed = "normal", pauseOnHover = true, fade = true, className }: {
  children: ReactNode; direction?: "left" | "right"; speed?: "slow" | "normal" | "fast";
  pauseOnHover?: boolean; fade?: boolean; className?: string;
}): React.JSX.Element {
  const a = direction === "left" ? "animate-marquee-left" : "animate-marquee-right";
  const f = fade ? "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)] [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]" : "";
  const p = pauseOnHover ? "group-hover:[animation-play-state:paused]" : "";
  const d = { "--duration": SPD[speed] } as React.CSSProperties;
  return (
    <div className={cn("group relative flex overflow-hidden", f, className)}>
      <div className={cn("flex shrink-0 items-center gap-8", a, p)} style={d}>{children}</div>
      <div className={cn("flex shrink-0 items-center gap-8", a, p)} style={d} aria-hidden="true">{children}</div>
    </div>
  );
}
