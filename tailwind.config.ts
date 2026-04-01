import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{ts,tsx}",
    "./src/components/**/*.{ts,tsx}",
    "./src/app/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "#000000",
        foreground: "#ededed",
        primary: { DEFAULT: "#ffffff", foreground: "#000000" },
        secondary: { DEFAULT: "rgba(255, 255, 255, 0.1)", foreground: "#ffffff" },
        muted: { DEFAULT: "rgba(255, 255, 255, 0.05)", foreground: "#a1a1aa" },
        accent: { DEFAULT: "#10b981", foreground: "#ffffff" },
        card: { DEFAULT: "rgba(255, 255, 255, 0.05)", foreground: "#ffffff" },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      fontSize: {
        "display-hero": ["clamp(4rem, 12vw, 10rem)", { lineHeight: "0.9", letterSpacing: "-0.05em", fontWeight: "900" }],
        "display-xl": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "1.0", letterSpacing: "-0.03em", fontWeight: "800" }],
        "display-lg": ["clamp(2.5rem, 6vw, 4rem)", { lineHeight: "1.1", letterSpacing: "-0.02em", fontWeight: "700" }],
      },
      keyframes: {
        "marquee-left": { "0%": { transform: "translateX(0%)" }, "100%": { transform: "translateX(-100%)" } },
        "spin-slow": { "0%": { transform: "rotate(0deg)" }, "100%": { transform: "rotate(360deg)" } },
        aurora: { "0%, 100%": { transform: "translate(0,0) scale(1)" }, "50%": { transform: "translate(20px,-30px) scale(1.1)" } },
      },
      animation: {
        "marquee-left": "marquee-left var(--duration, 30s) linear infinite",
        "spin-slow": "spin-slow 20s linear infinite",
        aurora: "aurora 15s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
