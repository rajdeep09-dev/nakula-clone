"use client";

import { Reveal } from "@/components/motion/reveal";
import { Marquee } from "@/components/motion/marquee";

const LOGOS = ["React", "Next.js", "TypeScript", "Tailwind", "Framer Motion", "Node.js", "PostgreSQL", "Prisma", "Vercel", "AWS"];

export function LogoBar(): React.JSX.Element {
  return (
    <section className="border-y border-border/50 py-10">
      <Reveal className="mb-6 text-center">
        <p className="text-sm text-muted-foreground uppercase tracking-widest">Expertise & Tech Stack</p>
      </Reveal>
      <Marquee speed="slow" pauseOnHover fade>
        {LOGOS.map((n) => (
          <div key={n} className="flex h-8 items-center gap-2 px-6 text-sm font-medium text-muted-foreground/50">
            <div className="h-5 w-5 rounded bg-muted-foreground/10" />{n}
          </div>
        ))}
      </Marquee>
    </section>
  );
}
