import type { MetadataRoute } from "next";
import { site } from "@/lib/content";
import { finlandHasPlaceholders } from "@/lib/finland";
import { getPillars, getServices } from "@/lib/cms/services";
import { getPosts } from "@/lib/cms/blog";
import { getDetailedProjects } from "@/lib/cms/projects";
import { getIndustries } from "@/lib/cms/industries";
import { getLocations, getLocationServices } from "@/lib/cms/locations";
import { getPageSummaries } from "@/lib/cms/pages";
import type { SeoFields } from "@/lib/cms/seo";

/**
 * Built from the CMS: only published documents are ever returned by the
 * queries (drafts are filtered by access control), and anything an editor
 * marked noindex — or pointed at another canonical — is left out.
 * Refreshed on demand through the same cache tags as the pages.
 */
export const revalidate = 3600;

type Entry = { path: string; priority: number; freq: "monthly" | "weekly"; lastModified?: Date; seo?: SeoFields | null };

const indexable = (e: Entry) => !e.seo?.noIndex && !e.seo?.canonicalURL;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();
  const baseUrl = (path: string) => `${site.url}${path}/`.replace(/\/+$/, "/");

  const [pillars, services, posts, projects, industries, locations, locationServices, pages] = await Promise.all([
    getPillars(),
    getServices(),
    getPosts(),
    getDetailedProjects(),
    getIndustries(),
    getLocations(),
    getLocationServices(),
    getPageSummaries(),
  ]);

  const staticRoutes: Entry[] = [
    { path: "", priority: 1.0, freq: "weekly" },
    { path: "/services", priority: 0.9, freq: "monthly" },
    { path: "/portfolio", priority: 0.8, freq: "monthly" },
    { path: "/blog", priority: 0.9, freq: "weekly" },
    { path: "/industries", priority: 0.7, freq: "monthly" },
    { path: "/about", priority: 0.7, freq: "monthly" },
    { path: "/contact", priority: 0.8, freq: "monthly" },
    { path: "/showreel", priority: 0.75, freq: "monthly" },
    { path: "/locations", priority: 0.8, freq: "monthly" },
    // Listed only once its placeholders are replaced (it's noindex until then).
    ...(finlandHasPlaceholders
      ? []
      : [
          { path: "/finland", priority: 0.85, freq: "monthly" as const },
          { path: "/finland/fi", priority: 0.85, freq: "monthly" as const },
        ]),
  ];

  const entries: Entry[] = [
    ...staticRoutes,
    ...pillars.map((p) => ({ path: `/services/${p.slug}`, priority: 0.85, freq: "monthly" as const, seo: p.seo })),
    ...locations.map((l) => ({ path: `/locations/${l.slug}`, priority: 0.85, freq: "monthly" as const, seo: l.seo })),
    ...locationServices.map((ls) => ({
      path: `/locations/${ls.area}/${ls.service}`,
      priority: 0.8,
      freq: "monthly" as const,
      seo: ls.seo,
    })),
    ...services.map((s) => ({ path: `/services/${s.pillar}/${s.slug}`, priority: 0.8, freq: "monthly" as const, seo: s.seo })),
    ...industries.map((i) => ({ path: `/industries/${i.slug}`, priority: 0.7, freq: "monthly" as const, seo: i.seo })),
    ...projects.map((p) => ({ path: `/portfolio/${p.slug}`, priority: 0.85, freq: "monthly" as const, seo: p.seo })),
    ...posts.map((p) => ({
      path: `/blog/${p.slug}`,
      priority: 0.7,
      freq: "monthly" as const,
      lastModified: new Date(p.updatedDate ?? p.publishDate),
      seo: p.seo,
    })),
    ...pages
      .filter((p) => !p.noIndex)
      .map((p) => ({
        path: `/${p.slug}`,
        priority: p.kind === "legal" ? 0.3 : 0.6,
        freq: "monthly" as const,
        lastModified: new Date(p.updatedAt),
      })),
  ];

  return entries.filter(indexable).map((r) => ({
    url: baseUrl(r.path),
    lastModified: r.lastModified ?? now,
    changeFrequency: r.freq,
    priority: r.priority,
  }));
}
