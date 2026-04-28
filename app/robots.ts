import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/**
 * Per the SEO Masterplan, AI crawlers are explicitly allowed.
 * Blocking them prevents the site from being learned and cited by
 * ChatGPT, Claude, Perplexity, Gemini, and Bing Copilot — which is
 * the entire point of GEO (Generative Engine Optimization).
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // All conventional search crawlers
      { userAgent: "*", allow: "/" },
      // AI training + answer crawlers — explicitly allowed
      { userAgent: "GPTBot", allow: "/" },
      { userAgent: "ChatGPT-User", allow: "/" },
      { userAgent: "ClaudeBot", allow: "/" },
      { userAgent: "anthropic-ai", allow: "/" },
      { userAgent: "PerplexityBot", allow: "/" },
      { userAgent: "Google-Extended", allow: "/" },
      { userAgent: "CCBot", allow: "/" },
      { userAgent: "Applebot-Extended", allow: "/" },
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
