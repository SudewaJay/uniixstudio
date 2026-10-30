# Blog pruning decisions — review before deploying Phase 4

Generated 2026-10-30 from the 67 published posts in the CMS (Search Console: 4 of 65 posts indexed).

**15 keep · 5 merge · 47 noindex.** The code reads these decisions from `lib/blog-decisions.mjs`. Edit that file to change one, then rebuild.

## What each decision does

- **keep**: stays indexed. Shows in the matching service pages' *Related reading* block. The CMS script adds 2 contextual links to its services + 1 to a case study.
- **merge → X**: the listed sections get copied into X by the CMS script. The post is then unpublished (set to draft, not deleted) and `/blog/<slug>/` 301s to X.
- **noindex**: stays live, listed on /blog/ and linked as before, with `robots: noindex, follow`. It's dropped from the sitemap.

## Deploy order

1. Review this table and edit `lib/blog-decisions.mjs` if needed.
2. Dry-run, then apply, the CMS script: `node node_modules/payload/bin.js run scripts/cms/seo-fix-pass.ts` (add `-- --apply` to write).
3. Merge and deploy the Phase 4 commit.

| Slug | Words | Target keyword | Closest service page | Overlaps | Decision | Notes |
|---|---:|---|---|---|---|---|
| `bilesma-natural-packaging-design-case-study` | 1295 | product packaging design Sri Lanka | `/services/design/packaging-design/` | — | **keep** | Real named case study; only packaging content on the site. |
| `case-study-wasana-drivers-brand-identity` | 1192 | brand identity case study Sri Lanka | `/services/design/brand-identity/` | — | **keep** | Real named case study. |
| `ecommerce-website-development-sri-lanka-guide` | 1212 | ecommerce website development Sri Lanka | `/services/technology/ecommerce/` | shopify-vs-woocommerce-sri-lanka, payment-gateway-sri-lanka-website | **keep** | Hub for ecommerce intent; absorbs the Shopify/Woo post. |
| `freelancer-vs-agency-web-design-sri-lanka` | 1713 | freelancer vs agency web design Sri Lanka | `/services/technology/web-design/` | questions-to-ask-web-development-agency | **keep** | "How to choose" intent; distinct angle (who to hire vs what to ask). |
| `how-long-does-web-development-take` | 1080 | how long does web development take | `/services/technology/web-development/` | questions-to-ask-web-development-agency | **keep** | Process/timeline intent asked before buying. |
| `how-much-does-logo-cost-sri-lanka` | 1303 | how much does logo cost Sri Lanka | `/services/design/logo-design/` | — | **keep** | Pricing intent; maps to logo design. |
| `local-seo-sri-lanka-guide` | 1459 | local SEO Sri Lanka | `/services/growth/seo/` | google-my-business-setup-sri-lanka-2026, near-me-search-sri-lanka-service-area, local-seo-web-design-gampaha | **keep** | Hub for local SEO; absorbs the near-me post. |
| `mobile-app-vs-web-app-which-does-your-business-need` | 1240 | mobile app vs web app | `/services/technology/mobile-apps/` | — | **keep** | Decision intent; only mobile-app post. |
| `questions-to-ask-web-development-agency` | 1289 | how to choose web development company | `/services/technology/web-development/` | how-to-brief-a-web-designer, freelancer-vs-agency-web-design-sri-lanka | **keep** | "How to choose" intent. |
| `social-media-management-cost-sri-lanka` | 962 | social media cost Sri Lanka | `/services/growth/social-media/` | — | **keep** | Pricing intent. |
| `ui-ux-design-process-step-by-step-guide` | 1792 | UI UX design process | `/services/design/ui-ux-design/` | figma-design-agency-sri-lanka | **keep** | Process intent; maps to UI/UX. |
| `website-cost-sri-lanka-2026` | 1842 | website cost Sri Lanka | `/services/technology/web-design/` | web-design-packages-sri-lanka, business-website-cost-ja-ela | **keep** | Pricing hub; absorbs two cost posts. |
| `website-maintenance-cost-sri-lanka` | 1079 | website maintenance cost Sri Lanka | `/services/technology/wordpress/` | — | **keep** | Pricing intent (ongoing cost). |
| `what-is-brand-identity-complete-guide` | 1829 | what is brand identity | `/services/design/brand-identity/` | brand-identity-vs-logo-difference, how-to-create-brand-style-guide, startup-branding-sri-lanka | **keep** | Hub for brand identity; absorbs logo-vs-identity. |
| `what-to-ask-seo-agency-sri-lanka` | 1308 | what to ask SEO agency Sri Lanka | `/services/growth/seo/` | — | **keep** | "How to choose" intent for SEO. |
| `brand-identity-vs-logo-difference` | 1244 | brand identity vs logo difference Sri Lanka | `/services/design/brand-identity/` | what-is-brand-identity-complete-guide | merge → `what-is-brand-identity-complete-guide` | Move "Which does your business need?" + "What this means for your budget" into the guide. |
| `business-website-cost-ja-ela` | 2567 | website cost Ja-Ela | `/services/technology/web-design/` | website-cost-sri-lanka-2026 | merge → `website-cost-sri-lanka-2026` | Move "Build cost versus cost of ownership", "Questions to ask before you accept a quote", "Red flags in a cheap quote". Ja-Ela intent is now served by /locations/ja-ela/. |
| `near-me-search-sri-lanka-service-area` | 1225 | near me SEO Sri Lanka | `/services/growth/seo/` | local-seo-sri-lanka-guide | merge → `local-seo-sri-lanka-guide` | Move "What Google does when someone searches near me", "Why fake addresses fail", "The legitimate approach: one address, many service areas". |
| `shopify-vs-woocommerce-sri-lanka` | 1695 | Shopify vs WooCommerce Sri Lanka | `/services/technology/ecommerce/` | ecommerce-website-development-sri-lanka-guide | merge → `ecommerce-website-development-sri-lanka-guide` | Move "The 30-second verdict", "The 5-year cost picture", "The honest decision framework" into the ecommerce guide. |
| `web-design-packages-sri-lanka` | 1187 | web design packages Sri Lanka | `/services/technology/web-design/` | website-cost-sri-lanka-2026 | merge → `website-cost-sri-lanka-2026` | Move "The comparison table" and "How to compare quotes honestly" into the cost post. |
| `ai-search-optimisation-sri-lanka` | 1223 | AI search optimisation Sri Lanka | `/services/growth/seo/` | answer-engine-optimisation-sri-lanka | noindex | Same topic as AEO post; neither has buyer intent. |
| `answer-engine-optimisation-sri-lanka` | 1500 | answer engine optimisation Sri Lanka | `/services/growth/seo/` | ai-search-optimisation-sri-lanka | noindex | Informational; overlaps AI-search post. |
| `best-cms-small-business-sri-lanka` | 1038 | best CMS small business Sri Lanka | `/services/technology/wordpress/` | wix-vs-wordpress-sri-lanka-2026, nextjs-vs-wordpress-sri-lanka, wordpress-vs-custom-website-development | noindex | One of four CMS-comparison posts. |
| `branding-mistakes-small-businesses` | 1119 | branding mistakes small businesses | `/services/design/brand-identity/` | signs-your-business-needs-a-rebrand | noindex | Listicle; low intent. |
| `case-study-travel-agency-website-sri-lanka` | 1123 | travel agency website case study Sri Lanka | `/services/technology/web-design/` | — | noindex | Unnamed client, no portfolio entry; "tripled enquiries" can't be verified. TODO(sudewa): name the client + add a portfolio entry, then promote to keep. |
| `content-marketing-strategy-b2b-2026` | 1266 | B2B content marketing strategy 2026 | `/services/growth/content-marketing/` | — | noindex | B2B/SaaS topic, off-market for SL SMEs. |
| `conversion-rate-optimisation-sri-lanka` | 1431 | conversion rate optimisation Sri Lanka | `/services/growth/analytics/` | landing-page-design-sri-lanka | noindex | Informational. |
| `digital-marketing-agency-colombo` | 1175 | digital marketing agency Colombo | `/services/growth/` | digital-marketing-sri-lanka-2026-guide | noindex | Agency-keyword page competing with the service pages. |
| `digital-marketing-sri-lanka-2026-guide` | 1493 | digital marketing Sri Lanka | `/services/growth/` | uniix-studio-2026-digital-trends-report | noindex | Dated guide. Still the 301 target of the old WP URL (stays 200). |
| `figma-agent-design-canvas-2026` | 1902 | Figma Agent | `/services/design/ui-ux-design/` | figma-design-agency-sri-lanka | noindex | News-style, no buyer intent. |
| `figma-design-agency-sri-lanka` | 1029 | Figma design agency Sri Lanka | `/services/design/ui-ux-design/` | ui-ux-design-process-step-by-step-guide | noindex | Competes with the UI/UX service page. |
| `google-my-business-setup-sri-lanka-2026` | 1901 | Google My Business setup Sri Lanka | `/services/growth/seo/` | local-seo-sri-lanka-guide | noindex | Covered by Step 1 of the local SEO guide. Candidate for a future merge. |
| `hotel-website-design-sri-lanka` | 1188 | hotel website design Sri Lanka | `/services/technology/web-design/` | website-design-negombo-tourism-businesses, social-media-marketing-hotels-sri-lanka | noindex | Industry page territory (/industries/). |
| `how-to-brief-a-web-designer` | 1523 | how to brief a web designer | `/services/technology/web-design/` | questions-to-ask-web-development-agency | noindex | Overlaps the agency-questions post. |
| `how-to-create-brand-style-guide` | 1471 | brand style guide template | `/services/design/brand-identity/` | what-is-brand-identity-complete-guide | noindex | Overlaps the brand identity guide. |
| `how-to-measure-digital-marketing-roi` | 1462 | measure digital marketing ROI | `/services/growth/analytics/` | — | noindex | Informational. |
| `how-to-rank-on-google-sri-lanka` | 1306 | how to rank on Google Sri Lanka | `/services/growth/seo/` | what-is-seo-and-why-your-business-needs-it, seo-audit-checklist-sri-lanka, local-seo-sri-lanka-guide | noindex | Generic SEO explainer #3 of 4. |
| `landing-page-design-sri-lanka` | 1197 | landing page design Sri Lanka | `/services/technology/web-design/` | conversion-rate-optimisation-sri-lanka | noindex | Thin overlap with CRO. |
| `lk-domain-registration-guide` | 1380 | .lk domain registration | `/services/technology/web-design/` | — | noindex | Scheduled 2026-11-17 (not live yet). Informational. |
| `local-seo-web-design-gampaha` | 2293 | local SEO Gampaha | `/services/growth/seo/` | local-seo-sri-lanka-guide | noindex | Town-keyword post; doorway risk next to city pages. |
| `medical-lab-clinic-website-design-sri-lanka` | 1675 | medical lab website design Sri Lanka | `/services/technology/web-design/` | St Luke's case study | noindex | Published 2026-10-27, too new to judge. Reassess in ~3 months. |
| `multilingual-website-sinhala-tamil-english` | 1599 | multilingual website Sri Lanka | `/services/technology/web-design/` | — | noindex | Scheduled 2026-11-10 (not live yet). |
| `nextjs-vs-wordpress-sri-lanka` | 1129 | Next.js vs WordPress Sri Lanka | `/services/technology/web-development/` | wordpress-vs-custom-website-development, wix-vs-wordpress-sri-lanka-2026 | noindex | CMS comparison #2 of 4. |
| `one-page-vs-multi-page-website-sri-lanka` | 1228 | one page website vs multi page Sri Lanka | `/services/technology/web-design/` | — | noindex | Low intent. |
| `online-booking-system-sri-lanka` | 2117 | online booking system Sri Lanka | `/services/technology/web-development/` | — | noindex | Published 2026-10-20, too new to judge. Reassess. |
| `payment-gateway-sri-lanka-website` | 1519 | payment gateway Sri Lanka | `/services/technology/ecommerce/` | ecommerce-website-development-sri-lanka-guide | noindex | Scheduled 2026-11-03 (not live yet). Overlaps ecommerce guide. |
| `ppc-vs-seo-which-should-you-choose-2026` | 1261 | PPC vs SEO 2026 | `/services/growth/ppc-advertising/` | what-is-seo-and-why-your-business-needs-it | noindex | Generic comparison. |
| `real-estate-website-sri-lanka` | 1106 | real estate website Sri Lanka | `/services/technology/web-design/` | — | noindex | Industry page territory. |
| `restaurant-website-design-sri-lanka` | 1270 | restaurant website design Sri Lanka | `/services/technology/web-design/` | — | noindex | Industry page territory. |
| `seo-audit-checklist-sri-lanka` | 1169 | SEO audit checklist Sri Lanka | `/services/growth/seo/` | how-to-rank-on-google-sri-lanka | noindex | Checklist, low intent. |
| `signs-your-business-needs-a-rebrand` | 2203 | signs you need a rebrand | `/services/design/brand-identity/` | branding-mistakes-small-businesses | noindex | Decent intent but 15-slot limit; first in line if a keep slot opens. |
| `social-media-marketing-hotels-sri-lanka` | 1582 | social media marketing hotels Sri Lanka | `/services/growth/social-media/` | hotel-website-design-sri-lanka | noindex | Industry-specific, informational. |
| `startup-branding-sri-lanka` | 1243 | startup branding Sri Lanka | `/services/design/brand-identity/` | what-is-brand-identity-complete-guide | noindex | Overlaps brand identity guide. |
| `state-of-branding-sri-lanka-2026` | 1178 | state of branding Sri Lanka 2026 | `/services/design/brand-identity/` | uniix-studio-2026-digital-trends-report | noindex | Dated report. |
| `uniix-studio-2026-digital-trends-report` | 1203 | digital trends Sri Lanka 2026 | `/services/growth/` | uniix-studio-q3-2026-digital-report, state-of-branding-sri-lanka-2026 | noindex | Report #1 of 3. |
| `uniix-studio-client-results-report-2026` | 1005 | digital agency results Sri Lanka 2026 | `/services/growth/` | uniix-studio-2026-digital-trends-report | noindex | Report; claims not tied to named case studies. |
| `uniix-studio-q3-2026-digital-report` | 1197 | digital marketing Sri Lanka Q3 2026 | `/services/growth/` | uniix-studio-2026-digital-trends-report | noindex | Report #3 of 3. |
| `web-design-company-negombo-ja-ela-wattala` | 1529 | web design company Negombo | `/services/technology/web-design/` | /locations/ city pages | noindex | Doorway risk next to the 4 city pages. |
| `web-design-for-wattala-businesses` | 2035 | web design Wattala | `/services/technology/web-design/` | /locations/wattala/ | noindex | Duplicates the Wattala city page. |
| `web-design-kandana-ragama-gampaha` | 1199 | web design Kandana | `/services/technology/web-design/` | /locations/ city pages | noindex | Town-keyword post. |
| `web-design-vs-web-development-differences` | 1865 | web design vs web development | `/services/technology/web-development/` | — | noindex | Definitional, low intent. |
| `website-design-negombo-tourism-businesses` | 1973 | tourism website design Negombo | `/services/technology/web-design/` | hotel-website-design-sri-lanka | noindex | Town + industry overlap. |
| `website-redesign-checklist-sri-lanka` | 1686 | website redesign checklist | `/services/technology/web-design/` | website-redesign-kandana | noindex | Checklist; overlaps Kandana post. |
| `website-redesign-kandana` | 2046 | website redesign Kandana | `/services/technology/web-design/` | website-redesign-checklist-sri-lanka | noindex | Town-keyword post. |
| `what-is-seo-and-why-your-business-needs-it` | 1902 | what is SEO for business | `/services/growth/seo/` | how-to-rank-on-google-sri-lanka | noindex | Generic explainer. |
| `wix-vs-wordpress-sri-lanka-2026` | 1499 | Wix vs WordPress Sri Lanka | `/services/technology/wordpress/` | best-cms-small-business-sri-lanka | noindex | CMS comparison #3 of 4. |
| `wordpress-vs-custom-website-development` | 1966 | WordPress vs custom development | `/services/technology/web-development/` | nextjs-vs-wordpress-sri-lanka | noindex | CMS comparison #4 of 4. |
