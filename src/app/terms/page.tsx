import { Navbar } from "@/components/sections/navbar";
import { Footer } from "@/components/sections/footer";

export default function TermsPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-black">
      <Navbar />
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black text-white mb-8">Terms of Service</h1>
          <div className="prose prose-invert text-white/60">
            <p>By accessing our website, you are agreeing to be bound by these terms of service, all applicable laws and regulations, and agree that you are responsible for compliance with any applicable local laws.</p>
            {/* Add more legal text if needed */}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
