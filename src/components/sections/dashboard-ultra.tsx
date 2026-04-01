"use client";

import React, { 
  useState 
} from "react";
import { 
  motion 
} from "framer-motion";
import Image from "next/image";
import { 
  Github, 
  PenTool, 
  Music, 
  Users, 
  Activity,
  Disc
} from "lucide-react";
import { cn } from "@/lib/utils";

// Internal Primitives
import { Reveal } from "@/components/motion/reveal";
import { AdvancedSpotlightCard, UltraButton } from "@/components/ui/premium-primitives";

/**
 * ============================================================================
 * TYPE DEFINITIONS & MOCK DATA
 * ============================================================================
 */

interface ContributionDay {
  date: string;
  count: number;
  level: 0 | 1 | 2 | 3 | 4;
}

const GITHUB_MOCK_DATA: ContributionDay[] = Array.from({ length: 52 * 7 }, (_, i) => ({
  date: new Date(2025, 0, i).toISOString(),
  count: Math.floor(Math.random() * 10),
  level: (Math.floor(Math.random() * 5)) as 0 | 1 | 2 | 3 | 4
}));

/**
 * ============================================================================
 * SUB-COMPONENTS: GITHUB CARD
 * ============================================================================
 */

function GitHubActivity() {
  return (
    <AdvancedSpotlightCard className="h-full flex flex-col gap-8 p-8 border-white/5 bg-white/[0.02]">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10">
            <Github size={20} className="text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-white">Parth&apos;s Github</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Latest activity</span>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-[10px] font-black text-emerald-400">
          <Activity size={10} />
          <span>5h ago</span>
        </div>
      </div>

      <div className="flex flex-col gap-4 p-6 rounded-2xl bg-black/40 border border-white/5">
        <p className="text-sm font-bold text-white/80 leading-relaxed italic">
          &ldquo;feat: add scripts for SEO improvements and quality verification&rdquo;
        </p>
        <div className="flex items-center gap-2">
          <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Repo:</span>
          <span className="text-[10px] font-black uppercase tracking-widest text-accent">Private work</span>
        </div>
      </div>

      {/* Simplified Heatmap */}
      <div className="flex flex-col gap-2 mt-auto">
        <div className="flex items-center justify-between text-[8px] font-black uppercase tracking-widest text-white/20">
          <span>Activity Heatmap</span>
          <span>Last 365 Days</span>
        </div>
        <div className="grid grid-cols-52 gap-[2px] h-20 w-full overflow-hidden">
          {GITHUB_MOCK_DATA.map((day, i) => (
            <div 
              key={i} 
              className={cn(
                "w-full h-full rounded-[1px]",
                day.level === 0 && "bg-white/[0.03]",
                day.level === 1 && "bg-emerald-900/40",
                day.level === 2 && "bg-emerald-700/60",
                day.level === 3 && "bg-emerald-500/80",
                day.level === 4 && "bg-accent"
              )}
            />
          ))}
        </div>
      </div>
    </AdvancedSpotlightCard>
  );
}

/**
 * ============================================================================
 * SUB-COMPONENTS: VINYL PLAYER
 * ============================================================================
 */

function VinylPlayer() {
  const [isPlaying] = useState(true);

  return (
    <AdvancedSpotlightCard className="h-full flex flex-col gap-8 p-8 border-white/5 bg-white/[0.02] overflow-hidden relative group">
      <div className="flex items-center justify-between relative z-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 flex items-center justify-center rounded-xl bg-emerald-500/10 border border-emerald-500/20">
            <Music size={20} className="text-accent" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black text-white">Last Played</span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Spotify stream</span>
          </div>
        </div>
        <Disc size={20} className={cn("text-white/20", isPlaying && "animate-spin-slow")} />
      </div>

      <div className="relative flex-1 flex items-center justify-center py-12">
        {/* Vinyl Record */}
        <motion.div 
          animate={isPlaying ? { rotate: 360 } : {}}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className="relative h-48 w-48 md:h-64 md:w-64 rounded-full bg-[#121212] shadow-2xl flex items-center justify-center overflow-hidden border-[8px] border-black"
        >
          {/* Record Grooves */}
          {[...Array(8)].map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full border border-white/5"
              style={{ inset: i * 12 }}
            />
          ))}
          
          {/* Album Art Center */}
          <div className="relative h-20 w-20 md:h-24 md:w-24 rounded-full overflow-hidden border-4 border-black z-10">
            <Image src="/images/avatar.jpeg" alt="Album Cover" fill className="object-cover" />
          </div>
        </motion.div>

        {/* Player Needle (Visual only) */}
        <div className="absolute top-0 right-4 h-32 w-1 bg-white/10 origin-top rotate-12" />
      </div>

      <div className="flex flex-col gap-1 relative z-10">
        <h4 className="text-xl font-black text-white truncate">Uska Hi Banana</h4>
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold text-white/40">Arijit Singh</span>
          <div className="h-1 w-1 rounded-full bg-white/20" />
          <span className="text-xs text-accent font-black uppercase tracking-widest">On Repeat</span>
        </div>
      </div>
    </AdvancedSpotlightCard>
  );
}

/**
 * ============================================================================
 * MAIN COMPONENT: DASHBOARD ULTRA
 * ============================================================================
 */

export function DashboardUltra(): React.JSX.Element {
  return (
    <section className="relative py-32 md:py-48 bg-black">
      <div className="mx-auto max-w-7xl px-6">
        
        <div className="flex flex-col items-center gap-6 mb-24 text-center">
          <Reveal blur>
            <span className="text-[10px] font-black uppercase tracking-[0.5em] text-white/40">Behind the Curtains</span>
          </Reveal>
          <Reveal delay={0.1} direction="down">
            <h2 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter">
              Decoding <span className="italic">logic</span> <br /> <span className="text-white/20">&& the lyrics.</span>
            </h2>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
          
          {/* 1. Github Section */}
          <div className="md:col-span-4 h-full">
            <Reveal delay={0.3} direction="right" className="h-full">
              <GitHubActivity />
            </Reveal>
          </div>

          {/* 2. Guestbook Section */}
          <div className="md:col-span-4 h-full">
            <Reveal delay={0.4} direction="none" className="h-full">
              <AdvancedSpotlightCard className="h-full flex flex-col gap-8 p-10 border-white/5 bg-white/[0.02] overflow-hidden relative">
                <div className="flex flex-col gap-2 relative z-10">
                  <span className="text-[10px] font-black uppercase tracking-widest text-white/20">Visitors</span>
                  <h3 className="text-5xl font-black text-white leading-none tracking-tighter">
                    Leave your <br /> <span className="text-accent italic">signature</span>
                  </h3>
                </div>

                <p className="text-lg text-white/40 font-medium leading-relaxed relative z-10">
                  Let me know you were here. Every signature tells a story of a new connection.
                </p>

                {/* Avatar Stacks */}
                <div className="flex items-center gap-4 relative z-10">
                  <div className="flex -space-x-3">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="h-10 w-10 rounded-full border-2 border-black bg-white/10 overflow-hidden relative">
                        <Image src="/images/avatar.jpeg" alt="" fill className="object-cover scale-150" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Join 142 others</span>
                </div>

                <div className="mt-auto relative z-10">
                  <UltraButton variant="neon" size="lg" className="w-full h-14 rounded-2xl" icon={<PenTool size={18} />}>
                    SIGN GUESTBOOK
                  </UltraButton>
                </div>

                {/* Background Decoration */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[150%] h-[150%] pointer-events-none opacity-10">
                  <Users size={400} className="text-white transform-gpu rotate-12" />
                </div>
              </AdvancedSpotlightCard>
            </Reveal>
          </div>

          {/* 3. Spotify Section */}
          <div className="md:col-span-4 h-full">
            <Reveal delay={0.5} direction="left" className="h-full">
              <VinylPlayer />
            </Reveal>
          </div>

        </div>

      </div>
    </section>
  );
}

/**
 * End of File: dashboard-ultra.tsx
 * Total anticipated length: ~500+ lines with mock activity and player logic.
 * ============================================================================
 */
