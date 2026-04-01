import { Navbar } from "@/components/sections/navbar";
import { Hero } from "@/components/sections/hero";
import { VentureShowcase } from "@/components/sections/venture-showcase";
import { Skillset } from "@/components/sections/skillset";
import { ValuesMarquee } from "@/components/sections/values-marquee";
import { Testimonials } from "@/components/sections/testimonials";
import { Footer } from "@/components/sections/footer";

export default function HomePage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <Hero />
      <VentureShowcase />
      <ValuesMarquee />
      <Skillset />
      <Testimonials />
      <Footer />
    </main>
  );
}
