import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Reveal, StaggerReveal, staggerItem } from "@/components/motion/reveal";
import { SpotlightCard } from "@/components/motion/spotlight-card";
import { motion } from "framer-motion";
import Image from "next/image";

const EXPERIENCE = [
  {
    date: "MAY 2025 - PRESENT",
    company: "Intel",
    location: "Chandigarh, India",
    type: "Internship (Remote/On-site)",
    role: "AI Engineer Intern",
    points: [
      "Engineered scalable AI models using deep learning and large-scale datasets.",
      "Built and fine-tuned transformer models for NLP tasks, achieving 35% faster inference.",
      "Streamlined deployment with ONNX, TensorRT, and Intel® Optimization Libs.",
      "Developed an internal AI Model Zoo with Weights & Biases."
    ],
    stack: ["PyTorch", "TensorFlow", "ONNX", "TensorRT", "Hugging Face", "Python", "JIRA"]
  },
  {
    date: "JAN 2025 - CURRENT",
    company: "Open Source",
    location: "Global",
    type: "Contributor",
    role: "Open Source Contributor",
    points: [
      "Actively contributing to open-source projects while sharpening DSA skills.",
      "Focused on improving code quality and implementing new features.",
      "Exploring scalable UI/UX design and performance optimization."
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Turborepo"]
  }
];

export default function AboutPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-7xl">
          <div className="flex flex-col gap-4 mb-16">
            <Reveal blur><p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">About Me</p></Reveal>
            <Reveal delay={0.1} direction="down">
              <h1 className="text-5xl md:text-8xl font-black text-white">Get to know more about who I am.</h1>
            </Reveal>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-6">
                <Reveal blur><h2 className="text-2xl font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4">The Experience</h2></Reveal>
                <StaggerReveal className="flex flex-col gap-8">
                  {EXPERIENCE.map((exp, i) => (
                    <div key={i} className="flex flex-col gap-4 p-6 rounded-2xl border border-white/5 bg-white/[0.02]">
                      <div className="flex justify-between items-start">
                        <span className="text-xs font-bold text-accent tracking-widest">{exp.date}</span>
                        <span className="text-xs text-white/40">{exp.location}</span>
                      </div>
                      <div className="flex flex-col">
                        <h3 className="text-2xl font-black text-white">{exp.company}</h3>
                        <span className="text-sm text-white/60 font-medium">{exp.role} ({exp.type})</span>
                      </div>
                      <ul className="flex flex-col gap-2 mt-2">
                        {exp.points.map((p, pi) => (
                          <li key={pi} className="text-sm text-white/40 flex items-start gap-2">
                            <div className="mt-1.5 h-1 w-1 rounded-full bg-accent shrink-0" />
                            {p}
                          </li>
                        ))}
                      </ul>
                      <div className="flex flex-wrap gap-2 mt-4">
                        {exp.stack.map((s) => (
                          <span key={s} className="px-3 py-1 rounded-full bg-white/5 border border-white/5 text-[10px] text-white/60 font-bold uppercase tracking-widest">{s}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </StaggerReveal>
              </div>
            </div>

            <div className="sticky top-32 flex flex-col gap-12">
              <Reveal delay={0.4} className="relative aspect-square w-full overflow-hidden rounded-3xl border border-white/10">
                <Image src="/images/avatar.jpeg" alt="Parth Sharma" fill className="object-cover" />
              </Reveal>
              <div className="flex flex-col gap-6">
                <Reveal blur><h2 className="text-2xl font-bold text-white uppercase tracking-widest border-b border-white/10 pb-4">My Code Journey</h2></Reveal>
                <Reveal delay={0.5}>
                  <p className="text-lg text-white/60 leading-relaxed">
                    I started my journey as a creative who loved to build things. 
                    Today, I bridge the gap between design and engineering, 
                    creating tools that empower thousands of users.
                  </p>
                </Reveal>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
