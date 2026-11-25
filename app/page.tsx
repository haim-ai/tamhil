import Shell from "@/components/Shell";
import Hero from "@/components/Hero";
import Mixer from "@/components/Mixer";
import { About, Faq, Final, How, ServicesTeaser, Voices, Why } from "@/components/Sections";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "FinancialService",
  name: "תמהיל · מיכל שגיא, ייעוץ משכנתאות",
  description: "ייעוץ משכנתאות: בניית תמהיל מסלולים ומכרז בין בנקים.",
  url: "https://haim-ai.github.io/tamhil/",
  areaServed: "IL",
  address: { "@type": "PostalAddress", streetAddress: "דרך מנחם בגין 132", addressLocality: "תל אביב", addressCountry: "IL" },
};

/* the lobby: a taste of every page, each with a door to the full one */
export default function Home() {
  return (
    <Shell>
      <Hero />
      <ServicesTeaser />
      <Mixer eyebrow="02 · התמהיל" />
      <How />
      <Why />
      <About />
      <Voices />
      <Faq />
      <Final />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </Shell>
  );
}
