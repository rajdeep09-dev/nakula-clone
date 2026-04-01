import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { VentureShowcase } from "@/components/sections/venture-showcase";
import { Reveal } from "@/components/motion/reveal";

export default function ProjectsPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      
      <section className="pt-32 pb-12 px-6">
        <div className="mx-auto max-w-7xl text-center">
          <div className="flex flex-col gap-4 mb-16">
            <Reveal blur><p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">My Works</p></Reveal>
            <Reveal delay={0.1} direction="down">
              <h1 className="text-5xl md:text-8xl font-black text-white">Crafting digital experiences with passion & code.</h1>
            </Reveal>
          </div>
        </div>
      </section>

      <VentureShowcase />

      <Footer />
    </main>
  );
}
