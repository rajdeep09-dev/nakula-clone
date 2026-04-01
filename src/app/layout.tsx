import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { MotionProviders } from "@/components/motion/providers";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });

export const metadata: Metadata = {
  title: "Parth Sharma - Developer, Freelancer & Founder",
  description: "Problem Solver, Creative Engineer building the future.",
};

export default function RootLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased bg-black text-foreground`}>
        <MotionProviders>{children}</MotionProviders>
      </body>
    </html>
  );
}
