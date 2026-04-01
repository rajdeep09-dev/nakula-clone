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
  title: "Parth Sharma — Frontend Architect & Problem Solver",
  description: "High-performance, motion-first web applications and digital experiences that leave a lasting impression.",
  keywords: ["Next.js", "React", "Framer Motion", "UI/UX Design", "Frontend Engineering"],
  authors: [{ name: "Parth Sharma" }],
  openGraph: {
    title: "Parth Sharma — Frontend Architect",
    description: "Building the future of the web, one interaction at a time.",
    url: "https://parthh.in",
    siteName: "Parth Sharma Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Parth Sharma — Frontend Architect",
    description: "Building the future of the web.",
    creator: "@ksparth12",
  },
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
