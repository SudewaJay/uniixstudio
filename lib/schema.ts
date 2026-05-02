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

const SITE_URL = site.url.replace(/\/$/, "");
const LOGO_URL = `${SITE_URL}/uniix-logo.svg`;

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
    address: {
      "@type": "PostalAddress",
      addressLocality: "Colombo",
      addressCountry: "LK",
    },
    areaServed: [
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
