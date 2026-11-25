import type { NextConfig } from "next";

// GITHUB_PAGES=1 builds a static site under /tamhil for GitHub Pages; otherwise the normal Next app.
const pages = process.env.GITHUB_PAGES === "1";
const base = pages ? "/tamhil" : "";

const nextConfig: NextConfig = {
  ...(pages ? { output: "export" as const, basePath: base, trailingSlash: true } : {}),
  env: { NEXT_PUBLIC_BASE_PATH: base },
  images: { unoptimized: true },
};

export default nextConfig;
