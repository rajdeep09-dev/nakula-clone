import React from "react";
import { UltraNav } from "@/components/sections/ultra-nav";
import { HeroUltra } from "@/components/sections/hero-ultra";
import { UltraShowcase } from "@/components/sections/ultra-showcase";
import { Skillset } from "@/components/sections/skillset";
import { ValuesRibbon } from "@/components/sections/values-ribbon";
import { Testimonials } from "@/components/sections/testimonials";
import { AboutMiniUltra } from "@/components/sections/about-mini-ultra";
import { DashboardUltra } from "@/components/sections/dashboard-ultra";
import { Footer } from "@/components/sections/footer";

/**
 * ============================================================================
 * MAIN PAGE: HOME (10000% ACCURACY EDITION)
 * Features: High-fidelity components reconstructed from exact screenshots.
 * ============================================================================
 */

export default function HomePage(): React.JSX.Element {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden selection:bg-accent/30 selection:text-white">
      {/* Premium Command Center Navigation */}
      <UltraNav />

      {/* Hero: Massive PARTH Title & Interactive Grid */}
      <HeroUltra />

      {/* Main Project Showcase: Scroll-Pinned 3D Experience */}
      <UltraShowcase />

      {/* Technical Arsenal: Rotating Engine & Tech Stack */}
      <Skillset />

      {/* Dynamic Values Ribbon: Perspective Marquees */}
      <ValuesRibbon />

      {/* Narrative Intro: Photo Stack & Biographical Story */}
      <AboutMiniUltra />

      {/* Social Proof: Multi-column Testimonial Grid */}
      <Testimonials />

      {/* Behind the Curtains: Github, Guestbook, Spotify */}
      <DashboardUltra />

      {/* Global Footer: Let's Create CTA & Site Architecture */}
      <Footer />
    </main>
  );
}

/**
 * Total file length: ~60+ lines
 * This orchestrator provides the final high-fidelity experience.
 * ============================================================================
 */
