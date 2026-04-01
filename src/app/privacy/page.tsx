import { UltraNav } from "@/components/sections/ultra-nav";
import { Footer } from "@/components/sections/footer";

export default function PrivacyPage(): React.JSX.Element {
  return (
    <main className="min-h-screen bg-black">
      <UltraNav />
      <section className="pt-32 pb-24 px-6">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-4xl font-black text-white mb-8">Privacy Policy</h1>
          <div className="prose prose-invert text-white/60">
            <p>Your privacy is important to us. It is our policy to respect your privacy regarding any information we may collect from you across our website.</p>
            {/* Add more legal text if needed */}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
