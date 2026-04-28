import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { pillars, services } from "@/lib/services";
import { posts } from "@/lib/blog";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const baseUrl = (path: string) => `${site.url}${path}/`.replace(/\/+$/, "/");

  const staticRoutes: { path: string; priority: number; freq: "monthly" | "weekly" }[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/portfolio", priority: 0.8, freq: "monthly" },
    { path: "/blog", priority: 0.9, freq: "weekly" },
    { path: "/industries", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
  ];

  const pillarRoutes = pillars.map((p) => ({
    path: `/services/${p.slug}`,
    priority: 0.85,
    freq: "monthly" as const,
  }));

  const serviceRoutes = services.map((s) => ({
    path: `/services/${s.pillar}/${s.slug}`,
    priority: 0.8,
    freq: "monthly" as const,
  }));

  const blogRoutes = posts
    .filter((p) => !p.isStub)
    .map((p) => ({
      path: `/blog/${p.slug}`,
      priority: 0.7,
      freq: "monthly" as const,
      lastModified: new Date(p.publishDate),
    }));

  const all = [
    ...staticRoutes.map((r) => ({ ...r, lastModified: now })),
    ...pillarRoutes.map((r) => ({ ...r, lastModified: now })),
    ...serviceRoutes.map((r) => ({ ...r, lastModified: now })),
    ...blogRoutes,
  ];

  return all.map((r) => ({
    url: baseUrl(r.path),
    lastModified: r.lastModified,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
