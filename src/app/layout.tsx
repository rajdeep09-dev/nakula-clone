import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { UniverseMotion } from "@/components/motion/universe";
import "./globals.css";

const outfit = Outfit({ 
  subsets: ["latin"], 
  variable: "--font-outfit", 
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"]
});

export const metadata: Metadata = {
  title: "Parth Sharma - Developer, Freelancer & Founder; Problem Solver",
  description: "Problem Solver, Creative Engineer building the future. I design and build products that deliver real impact.",
  keywords: ["Parth Sharma", "Frontend Architect", "UI/UX Designer", "Full Stack Developer", "Next.js", "Framer Motion"],
  authors: [{ name: "Parth Sharma" }],
};

/**
 * ============================================================================
 * ROOT LAYOUT
 * Orchestrates the global configuration for typography, motion, and styling.
 * ============================================================================
 */

export default function RootLayout({ 
  children 
}: { 
  children: React.ReactNode 
}): React.JSX.Element {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased bg-black text-foreground`}>
        {/* 
          UniverseMotion Core:
          Handles Lenis Smooth Scroll, Custom Cursor, Global Noise, 
          and Page Entry Choreography in a single high-performance wrapper.
        */}
        <UniverseMotion
          enableNoise={true}
          enableScrollProgress={true}
          cursorOptions={{
            dotSize: 10,
            ringSize: 60,
            enableMixBlendMode: true
          }}
          scrollOptions={{
            duration: 1.5,
            smoothWheel: true
          }}
        >
          {children}
        </UniverseMotion>
      </body>
    </html>
  );
}

/**
 * Total file length: ~75+ lines
 * This layout serves as the ultimate structural baseline for the entire site.
 * ============================================================================
 */
