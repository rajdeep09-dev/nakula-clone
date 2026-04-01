import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";
import { Reveal } from "@/components/motion/reveal";

export default function UsesPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-7xl">
          <Reveal blur><p className="text-sm font-bold uppercase tracking-[0.3em] text-accent mb-4">Uses</p></Reveal>
          <h1 className="text-5xl md:text-8xl font-black text-white">My gear & software</h1>
          <p className="text-xl text-white/40 mt-8">Coming soon...</p>
        </div>
      </section>
      <Footer />
    </main>
  );
}
