import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/**
 * Per the SEO Masterplan, AI crawlers are explicitly allowed.
 * Blocking them prevents the site from being learned and cited by
 * ChatGPT, Claude, Perplexity, Gemini, and Bing Copilot — which is
 * the entire point of GEO (Generative Engine Optimization).
 */
/** The CMS admin, its API and preview endpoints are never content. */
const PRIVATE = ["/admin/", "/api/"];

export default function robots(): MetadataRoute.Robots {
  const agents = [
    // All conventional search crawlers
    "*",
    // AI training + answer crawlers — explicitly allowed
    "GPTBot",
    "ChatGPT-User",
    "ClaudeBot",
    "anthropic-ai",
    "PerplexityBot",
    "Google-Extended",
    "CCBot",
    "Applebot-Extended",
  ];
  return {
    rules: agents.map((userAgent) => ({ userAgent, allow: "/", disallow: PRIVATE })),
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
