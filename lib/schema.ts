/**
 * JSON-LD schema generators per the SEO Masterplan §5.
 *
 * Render with the <JsonLd> component:
 *   <JsonLd data={organizationSchema()} />
 *
 * All generators return plain JS objects — render-time serialization
 * happens inside the <JsonLd> component to avoid double-stringification.
 */

import { site } from "@/lib/content";
import type { BlogPost } from "@/lib/blog";
import type { Service, Pillar } from "@/lib/services";
import type { Project } from "@/lib/projects";
import { locations, type Location } from "@/lib/locations";
import type { LocationService } from "@/lib/location-services";

const SITE_URL = site.url.replace(/\/$/, "");
const LOGO_URL = `${SITE_URL}/uniix-logo.svg`;

/** True once real geo coordinates are configured in site.businessAddress. */
function hasGeo(): boolean {
  const { lat, lng } = site.businessAddress.geo;
  return typeof lat === "number" && typeof lng === "number";
}

/** The single real business PostalAddress, omitting empty placeholder fields. */
function postalAddress() {
  const a = site.businessAddress;
  return {
    "@type": "PostalAddress",
    ...(a.streetAddress && { streetAddress: a.streetAddress }),
    addressLocality: a.addressLocality,
    ...(a.addressRegion && { addressRegion: a.addressRegion }),
    ...(a.postalCode && { postalCode: a.postalCode }),
    addressCountry: a.addressCountry,
  };
}

// ---------- Site-wide ----------

/** Used in root layout — identifies the org to all engines. */
export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: site.name,
    url: SITE_URL,
    logo: {
      "@type": "ImageObject",
      url: LOGO_URL,
    },
    description: site.description,
    sameAs: [
      site.socials.facebook,
      site.socials.instagram,
      site.socials.linkedin,
    ],
  };
}

/**
 * Combined LocalBusiness + ProfessionalService — Google reads this
 * for the Maps pack and Knowledge Panel.
 */
export function localBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${SITE_URL}/#localbusiness`,
    name: site.name,
    url: SITE_URL,
    image: LOGO_URL,
    logo: LOGO_URL,
    telephone: site.whatsapp,
    email: site.email,
    description: site.description,
    address: postalAddress(),
    ...(hasGeo() && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.businessAddress.geo.lat,
        longitude: site.businessAddress.geo.lng,
      },
    }),
    areaServed: [
      // Towns we actively serve — town-level signals for local ranking.
      ...locations.map((l) => ({
        "@type": "City" as const,
        name: l.name,
      })),
      { "@type": "Country", name: "Sri Lanka" },
      { "@type": "Country", name: "Australia" },
      { "@type": "Country", name: "United Kingdom" },
    ],
    sameAs: [
      site.socials.facebook,
      site.socials.instagram,
      site.socials.linkedin,
    ],
    priceRange: "$$",
  };
}

/**
 * Per service-area LocalBusiness node for /locations/[area] pages.
 * Uses the ONE real business address + a GeoCircle around the town, so Google
 * reads it as "this business serves {town}" — not a fake second location.
 */
export function localBusinessAreaSchema(loc: Location) {
  const pageUrl = `${SITE_URL}/locations/${loc.slug}/`;
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${pageUrl}#localbusiness`,
    name: `${site.name} — ${loc.name}`,
    url: pageUrl,
    image: LOGO_URL,
    logo: LOGO_URL,
    telephone: site.whatsapp,
    email: site.email,
    description: loc.metaDescription,
    parentOrganization: { "@id": `${SITE_URL}/#organization` },
    address: postalAddress(),
    ...(hasGeo() && {
      geo: {
        "@type": "GeoCoordinates",
        latitude: site.businessAddress.geo.lat,
        longitude: site.businessAddress.geo.lng,
      },
    }),
    areaServed: {
      "@type": "City",
      name: loc.name,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: `${loc.district} District`,
      },
      ...(loc.geo && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: loc.geo.lat,
          longitude: loc.geo.lng,
        },
      }),
    },
    sameAs: [
      site.socials.facebook,
      site.socials.instagram,
      site.socials.linkedin,
    ],
    priceRange: "$$",
  };
}

/**
 * Service schema for a /locations/[area]/[service] combo page — a specific
 * service scoped to a specific town.
 */
export function locationServiceSchema(ls: LocationService, loc: Location) {
  const pageUrl = `${SITE_URL}/locations/${ls.area}/${ls.service}/`;
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `${ls.serviceLabel} in ${loc.name}`,
    serviceType: ls.serviceLabel,
    description: ls.metaDescription,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "City",
      name: loc.name,
      ...(loc.geo && {
        geo: {
          "@type": "GeoCoordinates",
          latitude: loc.geo.lat,
          longitude: loc.geo.lng,
        },
      }),
    },
    url: pageUrl,
  };
}

/** Enables sitelinks search box in Google. */
export function webSiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: SITE_URL,
    name: site.name,
    description: site.description,
    publisher: { "@id": `${SITE_URL}/#organization` },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/search/?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

// ---------- Per-page ----------

/** Service detail page — one per /services/[pillar]/[service]/. */
export function serviceSchema(service: Service, pillar: Pillar) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.pageTitle,
    description: service.metaDescription,
    serviceType: service.name,
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: { "@type": "Country", name: "Sri Lanka" },
    url: `${SITE_URL}/services/${pillar.slug}/${service.slug}/`,
    category: pillar.label,
  };
}

/** Breadcrumbs — required on every interior page. */
export function breadcrumbSchema(
  crumbs: Array<{ name: string; url: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.url.startsWith("http") ? c.url : `${SITE_URL}${c.url}`,
    })),
  };
}

/** FAQ section — biggest AEO unlock per the Masterplan. */
export function faqPageSchema(faqs: Array<{ question: string; answer: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };
}

/** Portfolio case study — CreativeWork covers process, tech, and images. */
export function creativeWorkSchema(project: Project) {
  const pageUrl = `${SITE_URL}/portfolio/${project.slug}/`;
  const images = [
    project.coverImage,
    ...(project.gallery ?? []),
    ...((project.wireframes ?? []).map((w) => w.src)),
  ].filter(Boolean);
  const keywords = [
    ...(project.services ?? []),
    ...((project.techStack ?? []).map((t) => t.name)),
    project.industry,
  ]
    .filter(Boolean)
    .join(", ");
  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    headline: project.headline,
    description: project.summary,
    url: pageUrl,
    image: images,
    dateCreated: project.year,
    inLanguage: "en",
    creator: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    about: project.client
      ? {
          "@type": "Organization",
          name: project.client,
          ...(project.url ? { url: project.url } : {}),
          // `industry` is NOT a valid schema.org Organization property (it
          // fails structured-data validation). `knowsAbout` is the correct
          // property for the entity's field/sector.
          ...(project.industry ? { knowsAbout: project.industry } : {}),
          ...(project.location
            ? {
                address: {
                  "@type": "PostalAddress",
                  addressLocality: project.location,
                },
              }
            : {}),
        }
      : project.industry
        ? { "@type": "Thing", name: project.industry }
        : undefined,
    keywords: keywords || undefined,
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };
}

/** Blog post — every article gets one. */
export function articleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.metaDescription,
    image: post.coverImage,
    datePublished: post.publishDate,
    dateModified: post.publishDate,
    wordCount: post.wordCount,
    keywords: post.primaryKeyword,
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${post.slug}/`,
    },
  };
}

/** VideoObject — eligible for Google Video search rich result. */
export function videoObjectSchema(v: {
  vimeoId: string;
  title: string;
  client: string;
  description?: string;
  uploadDate?: string;
  year?: string;
}) {
  const date = v.uploadDate ?? (v.year ? `${v.year}-01-01` : undefined);
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name: v.title,
    description:
      v.description ?? `${v.title} — commercial work by Uniix Studio for ${v.client}.`,
    thumbnailUrl: `https://vumbnail.com/${v.vimeoId}_large.jpg`,
    embedUrl: `https://player.vimeo.com/video/${v.vimeoId}`,
    contentUrl: `https://vimeo.com/${v.vimeoId}`,
    uploadDate: date,
    creator: { "@id": `${SITE_URL}/#organization` },
    publisher: { "@id": `${SITE_URL}/#organization` },
    inLanguage: "en",
  };
}

/**
 * Helper to bundle multiple schemas into a single @graph object —
 * cleaner than emitting many <script> tags per page.
 */
export function schemaGraph(...nodes: object[]) {
  return {
    "@context": "https://schema.org",
    "@graph": nodes.map((n) => {
      // Strip nested @context — only the wrapper needs one
      const { "@context": _ctx, ...rest } = n as Record<string, unknown>;
      return rest;
    }),
  };
}
