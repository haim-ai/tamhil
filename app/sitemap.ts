import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://haim-ai.github.io/tamhil";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/questionnaire/`, changeFrequency: "yearly", priority: 0.8 },
  ];
}
