import React from "react";
import { UltraNav } from "@/components/sections/ultra-nav";
import { Footer } from "@/components/sections/footer";
import { Reveal, StaggerReveal } from "@/components/motion/reveal";
import { GlassBadge, PremiumImage, UltraButton } from "@/components/ui/premium-primitives";
import { 
  Target, 
  Clock, 
  ArrowRight,
  ShieldCheck,
  Star,
  MapPin
} from "lucide-react";

/**
 * ============================================================================
 * TYPE DEFINITIONS & DATA
 * ============================================================================
 */

const EXPERIENCE = [
  {
    date: "MAY 2025 - PRESENT",
    company: "Intel",
    location: "Chandigarh, India",
    type: "Internship (Remote/On-site)",
    role: "AI Engineer Intern",
    desc: "Spearheading the development of next-generation AI interfaces and high-performance model deployments.",
    points: [
      "Engineered scalable AI models using deep learning and large-scale datasets.",
      "Built and fine-tuned transformer models for NLP tasks, achieving 35% faster inference.",
      "Streamlined deployment with ONNX, TensorRT, and Intel® Optimization Libs.",
      "Developed an internal AI Model Zoo with Weights & Biases."
    ],
    stack: ["PyTorch", "TensorFlow", "ONNX", "TensorRT", "Hugging Face"]
  },
  {
    date: "JAN 2025 - CURRENT",
    company: "Open Source",
    location: "Global",
    type: "Contributor",
    role: "Core Contributor",
    desc: "Actively shaping the future of web infrastructure and design systems through community involvement.",
    points: [
      "Actively contributing to open-source projects while sharpening DSA skills.",
      "Focused on improving code quality and implementing new features.",
      "Exploring scalable UI/UX design and performance optimization."
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Turborepo"]
  }
];

/**
 * ============================================================================
 * ABOUT PAGE
 * Features: High-density storytelling, Experience timelines, Interactive 
 * visual layers, and seamless layout transitions.
 * ============================================================================
 */

export default function AboutPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-black overflow-x-hidden">
      {/* Premium Navigation */}
      <UltraNav />
      
      {/* 1. HERO SECTION: GET TO KNOW */}
      <section className="pt-48 pb-24 px-6 relative">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-6 mb-24">
            <Reveal blur>
              <div className="flex items-center gap-3">
                <div className="h-px w-8 bg-accent" />
                <span className="text-sm font-bold uppercase tracking-[0.4em] text-accent">The Human Behind</span>
              </div>
            </Reveal>
            
            <Reveal delay={0.1} direction="down">
              <h1 className="text-6xl md:text-9xl font-black text-white leading-none tracking-tighter max-w-4xl">
                Creative Engineer <br /> <span className="text-white/20">Building the Future.</span>
              </h1>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
            
            {/* Left Content: Journey & Experience */}
            <div className="lg:col-span-7 flex flex-col gap-24">
              
              {/* Core Philosophy Section */}
              <div className="flex flex-col gap-10">
                <div className="flex items-center gap-4">
                  <Target className="text-accent" size={24} />
                  <h2 className="text-3xl font-black text-white tracking-tight">Mission & Vision</h2>
                </div>
                <div className="flex flex-col gap-6">
                  <Reveal delay={0.2}>
                    <p className="text-2xl text-white/80 leading-relaxed font-medium">
                      I don&apos;t just build websites. I craft <span className="text-white font-black underline decoration-accent decoration-4 underline-offset-8">digital ecosystems</span> that combine aesthetic excellence with technical precision.
                    </p>
                  </Reveal>
                  <Reveal delay={0.3}>
                    <p className="text-lg text-white/40 leading-relaxed max-w-2xl">
                      My journey began at the intersection of curiosity and creation. 
                      Today, I work with startups and established enterprises to bridge 
                      the gap between vision and production-ready reality.
                    </p>
                  </Reveal>
                </div>
              </div>

              {/* Professional Experience Section */}
              <div className="flex flex-col gap-12">
                <div className="flex items-center gap-4">
                  <Clock className="text-accent" size={24} />
                  <h2 className="text-3xl font-black text-white tracking-tight">Career Milestones</h2>
                </div>
                
                <StaggerReveal className="flex flex-col gap-12">
                  {EXPERIENCE.map((exp, i) => (
                    <div key={i} className="group relative flex flex-col gap-6 p-10 rounded-[32px] border border-white/5 bg-white/[0.02] hover:bg-white/[0.04] transition-all duration-500">
                      {/* Interactive Accent Line */}
                      <div className="absolute top-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                      
                      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                        <GlassBadge variant="accent" className="px-4 py-1.5">
                          {exp.date}
                        </GlassBadge>
                        <div className="flex items-center gap-3 text-white/40 text-xs font-bold uppercase tracking-widest">
                          <MapPin size={12} />
                          {exp.location}
                        </div>
                      </div>

                      <div className="flex flex-col gap-2">
                        <h3 className="text-3xl font-black text-white tracking-tighter group-hover:text-accent transition-colors">
                          {exp.company}
                        </h3>
                        <span className="text-lg text-white/60 font-bold italic">
                          {exp.role} <span className="text-white/20 not-italic font-normal">— {exp.type}</span>
                        </span>
                      </div>

                      <p className="text-lg text-white/40 leading-relaxed font-medium">
                        {exp.desc}
                      </p>

                      <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {exp.points.map((p, pi) => (
                          <li key={pi} className="flex items-start gap-3 text-sm text-white/60 leading-relaxed">
                            <ShieldCheck size={14} className="text-accent mt-1 shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>

                      <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                        {exp.stack.map((s) => (
                          <span key={s} className="px-3 py-1 rounded-xl bg-white/5 border border-white/5 text-[10px] text-white/40 font-black uppercase tracking-widest group-hover:border-white/10 group-hover:text-white transition-all">
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </StaggerReveal>
              </div>
            </div>

            {/* Right Sidebar: Visuals & Recognition */}
            <div className="lg:col-span-5 sticky top-32 flex flex-col gap-12">
              <Reveal delay={0.4} direction="none">
                <div className="relative group">
                  {/* Outer glowing frame */}
                  <div className="absolute -inset-4 bg-accent/10 blur-3xl rounded-[48px] opacity-0 group-hover:opacity-100 transition-opacity duration-1000" />
                  
                  <div className="relative aspect-square w-full overflow-hidden rounded-[48px] border border-white/10 p-4 bg-white/5">
                    <PremiumImage 
                      src="/images/avatar.jpeg" 
                      alt="Parth Sharma" 
                      className="rounded-[32px] grayscale group-hover:grayscale-0 transition-all duration-700"
                      containerClassName="h-full w-full rounded-[32px]"
                    />
                    
                    {/* Floating Overlay Badge */}
                    <div className="absolute top-10 left-10 p-4 rounded-2xl glass border-white/20 shadow-2xl">
                      <Star className="text-accent fill-accent animate-spin-slow" size={24} />
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* Core Values / Summary List */}
              <div className="flex flex-col gap-8 p-10 rounded-[40px] border border-white/5 bg-white/[0.02]">
                <h3 className="text-xl font-black text-white tracking-tight uppercase tracking-[0.2em] border-b border-white/5 pb-6">
                  Technical DNA
                </h3>
                <div className="flex flex-col gap-6">
                  <RecognitionItem 
                    label="Fluid Interactions" 
                    desc="Mastering Framer Motion & GSAP for high-end web motion." 
                  />
                  <RecognitionItem 
                    label="Architectural Depth" 
                    desc="Focusing on scalable Next.js App Router patterns." 
                  />
                  <RecognitionItem 
                    label="AI First Approach" 
                    desc="Integrating RAG and LLM systems into modern UIs." 
                  />
                </div>
                
                <UltraButton 
                  variant="neon" 
                  size="lg" 
                  className="mt-4 w-full"
                  icon={<ArrowRight size={16} />}
                >
                  Download Resume
                </UltraButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Global Footer */}
      <Footer />
    </main>
  );
}

/**
 * Internal Helper: Recognition Item
 */
function RecognitionItem({ label, desc }: { label: string; desc: string }) {
  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center gap-2">
        <div className="h-1.5 w-1.5 rounded-full bg-accent" />
        <span className="text-sm font-black text-white uppercase tracking-widest">{label}</span>
      </div>
      <p className="text-xs text-white/40 leading-relaxed font-medium ml-3.5">{desc}</p>
    </div>
  );
}

/**
 * Total file length: ~300+ lines including structured data and high-density layouts.
 * ============================================================================
 */
