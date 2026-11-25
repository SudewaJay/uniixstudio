/**
 * Studio facts that the inner pages rely on, kept in one place so nothing
 * unverified creeps in.
 *
 * Everything here has been confirmed by the studio for client-facing use.
 * Do not add testimonials, ratings or result figures here unless the client
 * has approved them.
 */

/**
 * Projects shown with stock imagery and generic copy in the CMS. They may be
 * listed (name, year, discipline) and keep their URLs, but are never given a
 * visual feature or quoted for results.
 */
export const LOGO_ONLY_PROJECTS = new Set(["zerro", "wasana", "terraflow", "coventry"]);

/** CricBook is the studio's own product, not client work. */
export const OWN_PRODUCTS = new Set(["cricbook"]);

export const FOUNDED = 2019;

/** Markets the studio works in. */
export const MARKETS = ["Sri Lanka", "Australia", "United Kingdom"];

/** The three disciplines, in the order the studio talks about them. */
export const DISCIPLINES = [
  { slug: "design", label: "Design" },
  { slug: "technology", label: "Technology" },
  { slug: "growth", label: "Growth" },
] as const;

export type DisciplineSlug = (typeof DISCIPLINES)[number]["slug"];

/** Tools in daily use, per discipline. Keep in sync with the homepage Studio section. */
export const TOOLS: Record<DisciplineSlug, string[]> = {
  design: ["Figma", "Illustrator", "Photoshop", "After Effects", "Premiere Pro"],
  technology: ["Next.js", "React", "WordPress", "WooCommerce", "Shopify", "Payload CMS"],
  growth: ["Google Analytics 4", "Search Console", "Google Ads", "Meta Ads"],
};

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

/**
 * Projects that demonstrate a service, best first. A project counts when one
 * of its service tags names the service (or the service names the tag).
 * Logo-only projects are never offered as proof.
 */
export function projectsForService<
  P extends { slug: string; services?: string[]; tags?: string[]; feature?: boolean },
>(service: { name: string; slug: string; relatedProjectSlugs?: string[] }, projects: P[]): P[] {
  const name = norm(service.name.replace(/services?$/i, ""));
  const slugWords = norm(service.slug.replace(/-/g, " "));
  const picked = new Set(service.relatedProjectSlugs ?? []);
  const hits = projects.filter((p) => {
    if (LOGO_ONLY_PROJECTS.has(p.slug)) return false;
    if (picked.has(p.slug)) return true;
    return [...(p.services ?? []), ...(p.tags ?? [])].some((t) => {
      const tag = norm(t);
      return tag === name || tag.includes(name) || name.includes(tag) || tag.includes(slugWords);
    });
  });
  return hits.sort((a, b) => Number(picked.has(b.slug)) - Number(picked.has(a.slug)) || Number(b.feature) - Number(a.feature));
}

/** Contact-form option that best matches a service (the form only accepts its own options). */
const ENQUIRY_OPTION: Record<string, string> = {
  "brand-identity": "Brand identity",
  "logo-design": "Brand identity",
  "packaging-design": "Brand identity",
  "print-design": "Brand identity",
  "print-collateral": "Brand identity",
  "ui-ux-design": "UI/UX design",
  "web-design": "Website design & development",
  "web-development": "Website design & development",
  wordpress: "Website design & development",
  ecommerce: "Website design & development",
  seo: "SEO",
  "ppc-advertising": "Performance marketing",
  "social-media": "Performance marketing",
  analytics: "Performance marketing",
};

/** /contact/ link prefilled for one service. */
export function enquiryHref(service: { slug: string; name: string }): string {
  const q = new URLSearchParams({
    service: ENQUIRY_OPTION[service.slug] ?? "Something else",
    message: `I'm interested in ${service.name.replace(/ services?$/i, "")}.`,
  });
  return `/contact/?${q.toString()}`;
}
