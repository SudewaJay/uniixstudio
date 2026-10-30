// Blog pruning decisions (SEO fix pass, phase 4). Full reasoning per post: SEO_BLOG_DECISIONS.md.
// Plain .mjs so next.config.js (merge redirects) and the app (noindex, sitemap, related reading) share one list.
// Any post not listed here is indexed as normal — new posts need no entry.

/** The strongest posts: unique topic, buyer intent, one matching service. */
export const KEEP = {
  'how-much-does-logo-cost-sri-lanka': { services: ['design/logo-design', 'design/brand-identity'], caseStudy: 'zerro' },
  'website-cost-sri-lanka-2026': { services: ['technology/web-design', 'technology/web-development'], caseStudy: 'st-lukes-medilab' },
  'website-maintenance-cost-sri-lanka': { services: ['technology/wordpress', 'technology/web-development'], caseStudy: 'rentmycar-lk' },
  'social-media-management-cost-sri-lanka': { services: ['growth/social-media', 'design/social-media-creatives'], caseStudy: 'bilesma-natural-social-media' },
  'freelancer-vs-agency-web-design-sri-lanka': { services: ['technology/web-design', 'design/ui-ux-design'], caseStudy: 'st-lukes-medilab' },
  'questions-to-ask-web-development-agency': { services: ['technology/web-development', 'technology/web-design'], caseStudy: 'rentmycar-lk' },
  'how-long-does-web-development-take': { services: ['technology/web-development', 'technology/ecommerce'], caseStudy: 'cricbook' },
  'what-to-ask-seo-agency-sri-lanka': { services: ['growth/seo', 'growth/analytics'], caseStudy: 'st-lukes-medilab' },
  'local-seo-sri-lanka-guide': { services: ['growth/seo', 'technology/web-design'], caseStudy: 'st-lukes-medilab' },
  'ui-ux-design-process-step-by-step-guide': { services: ['design/ui-ux-design', 'technology/mobile-apps'], caseStudy: 'cricbook' },
  'bilesma-natural-packaging-design-case-study': { services: ['design/packaging-design', 'design/brand-identity'], caseStudy: 'bilesma-natural' },
  'case-study-wasana-drivers-brand-identity': { services: ['design/brand-identity', 'design/logo-design'], caseStudy: 'wasana' },
  'what-is-brand-identity-complete-guide': { services: ['design/brand-identity', 'design/logo-design'], caseStudy: 'terraflow' },
  'ecommerce-website-development-sri-lanka-guide': { services: ['technology/ecommerce', 'technology/web-development'], caseStudy: 'rentmycar-lk' },
  'mobile-app-vs-web-app-which-does-your-business-need': { services: ['technology/mobile-apps', 'technology/web-development'], caseStudy: 'cricbook' },
}

/** Overlapping posts folded into a keep post: source slug → target slug (301). */
export const MERGE = {
  'web-design-packages-sri-lanka': 'website-cost-sri-lanka-2026',
  'business-website-cost-ja-ela': 'website-cost-sri-lanka-2026',
  'brand-identity-vs-logo-difference': 'what-is-brand-identity-complete-guide',
  'near-me-search-sri-lanka-service-area': 'local-seo-sri-lanka-guide',
  'shopify-vs-woocommerce-sri-lanka': 'ecommerce-website-development-sri-lanka-guide',
}

/** Thin, overlapping or low-intent posts: stay live and linked, but `noindex, follow`. */
export const NOINDEX = [
  'ai-search-optimisation-sri-lanka',
  'answer-engine-optimisation-sri-lanka',
  'best-cms-small-business-sri-lanka',
  'branding-mistakes-small-businesses',
  'case-study-travel-agency-website-sri-lanka',
  'content-marketing-strategy-b2b-2026',
  'conversion-rate-optimisation-sri-lanka',
  'digital-marketing-agency-colombo',
  'digital-marketing-sri-lanka-2026-guide',
  'figma-agent-design-canvas-2026',
  'figma-design-agency-sri-lanka',
  'google-my-business-setup-sri-lanka-2026',
  'hotel-website-design-sri-lanka',
  'how-to-brief-a-web-designer',
  'how-to-create-brand-style-guide',
  'how-to-measure-digital-marketing-roi',
  'how-to-rank-on-google-sri-lanka',
  'landing-page-design-sri-lanka',
  'lk-domain-registration-guide',
  'local-seo-web-design-gampaha',
  'medical-lab-clinic-website-design-sri-lanka',
  'multilingual-website-sinhala-tamil-english',
  'nextjs-vs-wordpress-sri-lanka',
  'one-page-vs-multi-page-website-sri-lanka',
  'online-booking-system-sri-lanka',
  'payment-gateway-sri-lanka-website',
  'ppc-vs-seo-which-should-you-choose-2026',
  'real-estate-website-sri-lanka',
  'restaurant-website-design-sri-lanka',
  'seo-audit-checklist-sri-lanka',
  'signs-your-business-needs-a-rebrand',
  'social-media-marketing-hotels-sri-lanka',
  'startup-branding-sri-lanka',
  'state-of-branding-sri-lanka-2026',
  'uniix-studio-2026-digital-trends-report',
  'uniix-studio-client-results-report-2026',
  'uniix-studio-q3-2026-digital-report',
  'web-design-company-negombo-ja-ela-wattala',
  'web-design-for-wattala-businesses',
  'web-design-kandana-ragama-gampaha',
  'web-design-vs-web-development-differences',
  'website-design-negombo-tourism-businesses',
  'website-redesign-checklist-sri-lanka',
  'website-redesign-kandana',
  'what-is-seo-and-why-your-business-needs-it',
  'wix-vs-wordpress-sri-lanka-2026',
  'wordpress-vs-custom-website-development',
]

const noindexSet = new Set(NOINDEX)

/** @param {string} slug */
export const isNoIndexPost = (slug) => noindexSet.has(slug)

/** @param {string} slug */
export const isMergedPost = (slug) => slug in MERGE

/** 301s for merged posts, in next.config redirects() shape. */
export const blogMergeRedirects = Object.entries(MERGE).map(([from, to]) => ({
  source: `/blog/${from}`,
  destination: `/blog/${to}/`,
  permanent: true,
}))

/**
 * Keep posts for a service page's "Related reading": posts mapped to this exact
 * service first, then keep posts from the same pillar. `key` is "pillar/service".
 * @param {string} key
 * @param {number} [limit]
 * @returns {string[]}
 */
export function keepPostsForService(key, limit = 3) {
  const pillar = key.split('/')[0]
  const entries = Object.entries(KEEP)
  const exact = entries.filter(([, k]) => k.services.includes(key)).map(([slug]) => slug)
  const samePillar = entries
    .filter(([slug, k]) => !exact.includes(slug) && k.services.some((s) => s.startsWith(`${pillar}/`)))
    .map(([slug]) => slug)
  return [...exact, ...samePillar].slice(0, limit)
}
