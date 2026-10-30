import type { MetadataRoute } from "next";
import { site } from "@/lib/content";

/**
 * Per the SEO Masterplan, AI crawlers are explicitly allowed.
 * Blocking them prevents the site from being learned and cited by
 * ChatGPT, Claude, Perplexity, Gemini, and Bing Copilot — which is
 * the entire point of GEO (Generative Engine Optimization).
 *
 * Disallowed: the CMS admin and API, Next's generated OG/Twitter image
 * routes, feeds, and the search template URL — none of them are content.
 */
const disallow = ["/admin/", "/api/", "/*opengraph-image*", "/*twitter-image*", "/*/feed/", "/search"];

export default function robots(): MetadataRoute.Robots {
  const agents = [
    // All conventional search crawlers
    "*",
    // AI training + answer crawlers — explicitly allowed
    "GPTBot",
    "ChatGPT-User",
    "OAI-SearchBot",
    "ClaudeBot",
    "anthropic-ai",
    "PerplexityBot",
    "Google-Extended",
    "CCBot",
    "Applebot-Extended",
  ];
  // Link-preview bots must still fetch the OG images, or shared links lose their cards.
  const previewBots = ["Twitterbot", "facebookexternalhit", "LinkedInBot"];
  return {
    rules: [
      ...agents.map((userAgent) => ({ userAgent, allow: "/", disallow })),
      ...previewBots.map((userAgent) => ({ userAgent, allow: "/", disallow: ["/admin/", "/api/"] })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
