import { Navigation } from "@/components/Navigation";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { WorkSection } from "@/components/WorkSection";
import { WhyUsSection } from "@/components/WhyUsSection";
import { ServicesSection } from "@/components/ServicesSection";
import { ProcessSection } from "@/components/ProcessSection";
import { TestimonialSection } from "@/components/TestimonialSection";
import { ContactSection } from "@/components/ContactSection";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navigation />
      <HeroSection />
      <AboutSection />
      <WorkSection />
      <WhyUsSection />
      <ServicesSection />
      <ProcessSection />
      <TestimonialSection />
      <ContactSection />
    </main>
  );
}
