/**
 * Maps free-text service labels (used in project MDX frontmatter and the
 * marketing site) to canonical /services/[pillar]/[slug]/ URLs.
 *
 * Used by the portfolio detail page to:
 *   1. Render the meta-strip services list as internal links
 *   2. Build a "Related services" cross-link grid above "More work"
 *
 * Keeping this lookup centralized means service URL changes propagate without
 * touching every case study.
 */

export const SERVICE_LINK_MAP: Record<string, string> = {
  // Technology
  "Web Design": "/services/technology/web-design/",
  "Web Development": "/services/technology/web-development/",
  "WordPress": "/services/technology/wordpress/",
  "E-commerce": "/services/technology/ecommerce/",
  "Ecommerce": "/services/technology/ecommerce/",
  "Mobile Apps": "/services/technology/mobile-apps/",
  "Performance Optimization": "/services/technology/web-development/",

  // Design
  "Brand Identity": "/services/design/brand-identity/",
  "Branding": "/services/design/brand-identity/",
  "Logo Design": "/services/design/logo-design/",
  "UI/UX Design": "/services/design/ui-ux-design/",
  "UI/UX": "/services/design/ui-ux-design/",
  "Graphic Design": "/services/design/",

  // Growth
  "SEO": "/services/growth/seo/",
  "Local SEO": "/services/growth/seo/",
  "SEO · GEO · AEO": "/services/growth/seo/",
  "Content Marketing": "/services/growth/content-marketing/",
  "Social Media": "/services/growth/social-media/",
  "Analytics": "/services/growth/analytics/",
  "PPC Advertising": "/services/growth/ppc-advertising/",
};

export function getServiceUrl(name: string): string | undefined {
  return SERVICE_LINK_MAP[name];
}

/** De-duped, URL-resolved subset of a project's services list. */
export function resolveServiceLinks(
  services: string[] | undefined,
): Array<{ name: string; href: string }> {
  if (!services) return [];
  const seen = new Set<string>();
  const out: Array<{ name: string; href: string }> = [];
  for (const name of services) {
    const href = getServiceUrl(name);
    if (!href || seen.has(href)) continue;
    seen.add(href);
    out.push({ name, href });
  }
  return out;
}
