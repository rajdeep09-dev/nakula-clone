import React from "react";
import { UltraNav } from "@/components/sections/ultra-nav";
import { Footer } from "@/components/sections/footer";
import { UltraShowcase } from "@/components/sections/ultra-showcase";
import { Reveal } from "@/components/motion/reveal";

/**
 * ============================================================================
 * PROJECTS PAGE
 * Features: High-fidelity project grid, Interactive 3D showcases,
 * Seamless navigation, and premium typography.
 * ============================================================================
 */

export default function ProjectsPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-black">
      {/* Premium Navigation */}
      <UltraNav />
      
      {/* Page Header */}
      <section className="pt-48 pb-12 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <div className="flex flex-col gap-6 mb-16">
            <Reveal blur>
              <div className="flex items-center justify-center gap-3">
                <div className="h-px w-8 bg-accent" />
                <span className="text-sm font-bold uppercase tracking-[0.4em] text-accent">Selected Ventures</span>
                <div className="h-px w-8 bg-accent" />
              </div>
            </Reveal>
            
            <Reveal delay={0.1} direction="down">
              <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter">
                Crafting Digital <br /> <span className="text-white/20">Excellence.</span>
              </h1>
            </Reveal>

            <Reveal delay={0.2}>
              <p className="text-xl text-white/40 max-w-2xl mx-auto leading-relaxed font-medium">
                A curated archive of high-performance applications, experimental 
                interfaces, and AI-powered solutions built with precision and passion.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Main Project Showcase */}
      <UltraShowcase />

      {/* Global Footer */}
      <Footer />
    </main>
  );
}

/**
 * Total file length: ~60+ lines
 * This page serves as the high-fidelity archive for all professional work.
 * ============================================================================
 */
