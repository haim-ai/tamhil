import type { MetadataRoute } from "next";
import { SERVICES } from "@/lib/content";

export const dynamic = "force-static";

const base = "https://haim-ai.github.io/tamhil";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages: [string, number][] = [
    ["/", 1],
    ["/services/", 0.9],
    ...SERVICES.map((s) => [`/services/${s.slug}/`, 0.9] as [string, number]),
    ["/calculator/", 0.8],
    ["/questionnaire/", 0.8],
    ["/process/", 0.7],
    ["/about/", 0.7],
    ["/faq/", 0.7],
    ["/contact/", 0.6],
    ["/privacy/", 0.2],
    ["/accessibility/", 0.2],
  ];
  return pages.map(([p, priority]) => ({ url: `${base}${p}`, changeFrequency: "monthly", priority }));
}
