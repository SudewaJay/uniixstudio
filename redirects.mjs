// UNIIX Studio — 301 redirects for old WordPress URLs + consolidated location pages.
// Wired into next.config.js → redirects().
// All are permanent (308/301). Source paths are written without trailing slash; Next matches both.

export const seoRedirects = [
  // ---- Old blog posts (root-level WordPress slugs) ----
  { source: '/digital-marketing-sri-lanka-2026-guide', destination: '/blog/digital-marketing-sri-lanka-2026-guide/', permanent: true },
  { source: '/how-ai-automation-are-reshaping-sri-lankan-businesses', destination: '/blog/', permanent: true },
  { source: '/why-every-business-needs-web-design-and-development', destination: '/services/technology/web-design/', permanent: true },
  { source: '/the-importance-of-branding-in-building-a-strong-online-presence', destination: '/services/design/brand-identity/', permanent: true },
  { source: '/typography-trends-2024-from-serif-to-variable-fonts', destination: '/blog/', permanent: true },
  { source: '/pixels-rediscovered-a-nostalgic-yet-contemporary-trend', destination: '/blog/', permanent: true },
  { source: '/10-of-the-best-social-media-analytics-tools-for-smart-marketers', destination: '/services/growth/social-media/', permanent: true },
  { source: '/:slug/feed', destination: '/blog/', permanent: true },

  // ---- Old service URLs ----
  { source: '/services/motion-graphics', destination: '/services/design/motion-graphics/', permanent: true },
  { source: '/services/creative-design', destination: '/services/design/', permanent: true },
  { source: '/services/business-branding', destination: '/services/design/brand-identity/', permanent: true },
  { source: '/services/web-development', destination: '/services/technology/web-development/', permanent: true },
  { source: '/services/usability', destination: '/services/design/ui-ux-design/', permanent: true },
  { source: '/services/social-spark', destination: '/services/growth/social-media/', permanent: true },
  { source: '/services_group/about-us', destination: '/about/', permanent: true },
  { source: '/services_group/:path*', destination: '/services/', permanent: true },
  { source: '/web-design', destination: '/services/technology/web-design/', permanent: true },

  // ---- Old portfolio URLs ----
  { source: '/portfolio/bilesma-natural-social-media-creative-strategy', destination: '/portfolio/bilesma-natural-social-media/', permanent: true },
  { source: '/portfolio/zerro-branding-and-logo-designzerro', destination: '/portfolio/zerro/', permanent: true },
  { source: '/portfolio/sri-lankas-1-car-rental-marketplace-rentmycar-lk', destination: '/portfolio/rentmycar-lk/', permanent: true },
  { source: '/portfolio/wasana-drivers-in-sri-lanka', destination: '/portfolio/wasana/', permanent: true },
  { source: '/portfolio/wasana-drivers-in-sri-lanka-branding', destination: '/portfolio/wasana/', permanent: true },
  { source: '/portfolio/coventry-business-club-branding', destination: '/portfolio/coventry/', permanent: true },
  // /portfolio/ecowave-energy/ is a live case study — no redirect.
  { source: '/portfolio_group/:path*', destination: '/portfolio/', permanent: true },
  { source: '/portfolio-3', destination: '/portfolio/', permanent: true },
  { source: '/work', destination: '/portfolio/', permanent: true },
  { source: '/gallery', destination: '/portfolio/', permanent: true },

  // ---- Old pages / archives ----
  { source: '/contacts', destination: '/contact/', permanent: true },
  { source: '/faq', destination: '/contact/', permanent: true },
  { source: '/resources', destination: '/blog/', permanent: true },
  { source: '/blogs', destination: '/blog/', permanent: true },
  { source: '/2024', destination: '/blog/', permanent: true },
  { source: '/2024/:path*', destination: '/blog/', permanent: true },
  { source: '/category/:path*', destination: '/blog/', permanent: true },
  { source: '/author/:path*', destination: '/about/', permanent: true },
  { source: '/team/:path*', destination: '/about/', permanent: true },
  { source: '/team_group/:path*', destination: '/about/', permanent: true },
  { source: '/quillforms/:path*', destination: '/contact/', permanent: true },
  { source: '/layouts/:path*', destination: '/', permanent: true },

  // ---- Location consolidation: one strong page per city ----
  // Their copy now renders as sections on the city page (CMS: Location pages).
  { source: '/locations/:city(colombo|negombo|ja-ela|wattala)/:service(web-design|web-development|ecommerce)', destination: '/locations/:city/', permanent: true },
]
