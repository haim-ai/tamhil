import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Mixer from "@/components/Mixer";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";
import { About, Faq, Final, How, MobileBar, Voices, Why } from "@/components/Sections";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "תמהיל · מיכל שגיא, ייעוץ משכנתאות",
  description: "ייעוץ משכנתאות: בניית תמהיל מסלולים ומכרז בין בנקים.",
  url: "https://haim-ai.github.io/tamhil/",
  areaServed: "IL",
  address: { "@type": "PostalAddress", streetAddress: "דרך מנחם בגין 132", addressLocality: "תל אביב", addressCountry: "IL" },
};

export default function Home() {
  return (
    <>
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:right-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-[var(--on-ink)]">
        דלגו לתוכן
      </a>
      <Header />
      <main id="main" className="pb-20 md:pb-0">
        <Hero />
        <Mixer />
        <How />
        <Why />
        <About />
        <Voices />
        <Faq />
        <Final />
      </main>
      <Footer />
      <MobileBar />
      <Reveal />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </>
  );
}
