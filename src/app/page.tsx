import React from "react";
import { UltraNav } from "@/components/sections/ultra-nav";
import { UltraHero } from "@/components/sections/ultra-hero";
import { UltraShowcase } from "@/components/sections/ultra-showcase";
import { Skillset } from "@/components/sections/skillset";
import { ValuesMarquee } from "@/components/sections/values-marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/sections/footer";

/**
 * ============================================================================
 * MAIN PAGE: HOME
 * Features: High-density components, Seamless motion sequences, Premium logic.
 * ============================================================================
 */

export default function HomePage(): React.JSX.Element {
  return (
    <main className="relative min-h-screen bg-black overflow-x-hidden">
      {/* 
        The Navigation is placed outside the main flow to ensure 
        it remains fixed and properly layered over all sections.
      */}
      <UltraNav />

      {/* 
        Hero Section: The core landing experience with massive typography 
        and high-performance atmospheric backgrounds.
      */}
      <UltraHero 
        title="Parth"
        subtitle="I'm a frontend architect specializing in high-performance, motion-first web applications that leave a lasting impression."
        roles={["Experiences", "Interfaces", "Products", "Solutions"]}
      />

      {/* 
        Infinite Showcase: A scroll-pinned, 3D interactive viewing experience 
        for major projects and ventures.
      */}
      <UltraShowcase />

      {/* 
        Values Marquee: High-speed brand alignment through infinite 
        horizontal motion and reactive typography.
      */}
      <ValuesMarquee />

      {/* 
        Skillset: A technical breakdown using rotating visuals and 
        interactive tech-stack grids.
      */}
      <Skillset />

      {/* 
        Testimonials: Social proof integrated with mouse-tracking spotlights 
        and 3D tilt interaction.
      */}
      <Testimonials />

      {/* 
        Footer: Comprehensive site architecture and connection links 
        with subtle hover physics.
      */}
      <Footer />
    </main>
  );
}

/**
 * Total file length: ~60+ lines
 * This file serves as the orchestration layer for the Ultra-Premium experience.
 * ============================================================================
 */
