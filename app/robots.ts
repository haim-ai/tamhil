import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: "/tamhil/admin/" },
    sitemap: "https://haim-ai.github.io/tamhil/sitemap.xml",
  };
}
