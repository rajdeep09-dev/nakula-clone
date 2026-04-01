"use client";

import Image from "next/image";
import { Marquee } from "@/components/motion/marquee";

const VALUES = [
  "User-Friendly", "Adaptive", "Fluid", "Future-Proof", "SEO-Ready", "Immersive", "Protected", "Dependable", "Captivating"
];

export function ValuesMarquee(): React.JSX.Element {
  return (
    <section className="py-12 border-y border-white/10 bg-black overflow-hidden">
      <Marquee speed="slow" fade={false}>
        {VALUES.concat(VALUES).map((v, i) => (
          <div key={i} className="flex items-center gap-4 px-8">
            <span className="text-4xl md:text-6xl font-black uppercase tracking-tighter text-white/20 hover:text-white/80 transition-colors cursor-default select-none">{v}</span>
            <div className="relative h-6 w-6">
              <Image src="/star.svg" alt="" fill className="object-contain" />
            </div>
          </div>
        ))}
      </Marquee>
    </section>
  );
}
