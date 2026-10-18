# SEO audit: uniixstudio.com

Audit date: 18 October 2026
Branch audited: `main` at `fb8e4ac` (work branch `feat/seo-growth-blogs`)
Live site checked: https://www.uniixstudio.com/

This audit covers what could be checked from the repository and the public website. Limitations are listed at the end. Nothing here comes from Search Console or analytics data, because neither was accessible.

---

## 1. Stack and content architecture

| Area | Finding |
|---|---|
| Framework | Next.js 15.4 (App Router), React 19, TypeScript, Tailwind CSS 3 |
| CMS | Payload CMS 3 on Postgres (Neon). Blog posts, services, projects, locations and globals are read from the CMS at runtime (`lib/cms/*`). |
| Blog source | The MDX files in `content/blog/` and the array in `lib/blog.ts` are the **migration and seed source**, not the runtime source. `npm run cms:seed` creates any post that doesn't exist yet in the database (matched by slug) and never overwrites existing posts unless `SEED_UPDATE_EXISTING=1`. |
| Blog templates | Two layouts. `layout: "editorial"` gives the long-form template with key takeaways, a sticky contents list, related services, contextual CTA, FAQs and related posts (`components/blog/EditorialArticle.tsx`). |
| Scheduling | Posts with a future `publishDate` are hidden until that date. The CMS cache has a one-hour TTL, so scheduled posts appear within about an hour of their date. |
| Hosting | Vercel. Vercel Analytics and Speed Insights packages are installed. |
| Old branch note | The local checkout was on `feat/cinecraft-media-case-study`, which predates the CMS migration. This work is on a fresh branch from `origin/main`. |

## 2. Technical SEO (verified)

| Check | Result | Evidence |
|---|---|---|
| Canonical host | `uniixstudio.com` redirects to `https://www.uniixstudio.com/` | `curl` returned 200 at the www URL |
| robots.txt | Allows all crawlers, explicitly allows GPTBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, CCBot, Applebot-Extended; references the sitemap | Live `/robots.txt` |
| Sitemap | 119 URLs, including 63 blog posts. Built from the CMS; excludes noindexed or externally canonicalised documents | Live `/sitemap.xml`, `app/sitemap.ts` |
| Canonicals | Built per page via `buildMetadata()` with trailing slashes | `lib/cms/seo.ts`, blog page |
| Article schema | `BlogPosting` with organisation author (`#organization`), `datePublished`, `dateModified`, image, publisher; plus `BreadcrumbList` | `lib/schema.ts` |
| FAQ schema | Deliberately off for new posts (`faqSchema: false`); FAQs still render visibly | `lib/blog-fs.ts` comment |
| llms.txt | Present at `/llms.txt` | `public/llms.txt` |
| Business NAP | `lib/content.ts` now holds a street address and postal code for the LocalBusiness data | `lib/content.ts` lines 18–21 |
| Test post | `hello-from-mdx` returns 404 and is not in the sitemap | Live check |
| GA4 | Tag `G-JFLVMPFLKR` loads on the live homepage | Live HTML |

## 3. Issues and opportunities found

Priority: **High** affects leads or trust now; **Medium** affects growth; **Low** is housekeeping.

### High

1. **No conversion events were tracked.** GA4 loads, but the code sent no events for contact-form submissions or WhatsApp, phone and email clicks. Without them, no article can be connected to an enquiry. **Fixed in this branch:** `generate_lead` on successful form submission and `contact_click` (method: whatsapp, phone or email) on enquiry links. The form's stored `source` now also records the same-site page the visitor came from, such as `/contact/ ← /blog/online-booking-system-sri-lanka/`. These events still need to be marked as key events in GA4 (see `performance-tracking-plan.md`).
2. **Unverified claims in existing posts.** Several older posts state specifics that could not be verified and conflict with primary sources checked today:
   - `ecommerce-website-development-sri-lanka-guide`: says Stripe "workarounds exist" and gives PayHere setup times and build price ranges without sources.
   - `shopify-vs-woocommerce-sri-lanka`: states Shopify third-party transaction fees per plan (2% / 1% / 0.5%) and typical gateway fees of 1.5–2.5%. Shopify's help page doesn't list per-plan rates for Sri Lanka, and PayHere's published rates in October 2026 are 2.69–3.30%.
   - `uniix-studio-2026-digital-trends-report` and the client results and Q3 reports: contain figures such as "5–10× engagement" that should be checked against the underlying data before the posts are cited further.
   - `website-cost-sri-lanka-2026`: says domain registration costs "LKR 2,000–5,000/year". The LK Domain Registry lists LKR 1,000 for second-level names such as .com.lk and LKR 5,000 for .lk, with premium names up to LKR 40,000.
   Recommend a factual review of these posts. The new payment and domain articles carry the verified figures, and `internal-linking-plan.md` lists the exact paragraphs to correct.
3. **Wasana Drivers case study uses stock imagery** (Unsplash cover and gallery) and states a "< 1.2s" speed index without a source. Real screenshots and a dated measurement would make it citable.

### Medium

4. **Possible cannibalisation in the local cluster.** These pairs target overlapping intents:
   - `web-design-company-negombo-ja-ela-wattala`, `web-design-for-wattala-businesses` and the location page `/locations/wattala/web-design/`
   - `web-design-kandana-ragama-gampaha` and `website-redesign-kandana`
   - `local-seo-sri-lanka-guide`, `local-seo-web-design-gampaha` and `near-me-search-sri-lanka-service-area`
   Check Search Console's query-to-page report: if two URLs swap positions for the same queries, consolidate or differentiate them. No new town pages were added in this cycle for this reason.
5. **Topic gaps with commercial intent.** No existing post covered online booking systems, payment gateways, .lk domains, healthcare websites or multilingual (Sinhala/Tamil) websites, despite strong case-study evidence for several of them (CricBook, St Luke's, RentMyCar.lk). These became this cycle's five articles.
6. **Stock cover imagery.** 56 of the 63 existing posts use Pexels or Unsplash cover images; only the five September editorial posts have original covers and diagrams. Stock photos add nothing a reader or an AI system can learn from. Replace covers on the posts that get the most impressions with original diagrams or real project screenshots. (All 20 posts in the generated `lib/blog.ts` are overridden by MDX files of the same slug, so the MDX is what was seeded.)

### Low

7. **Multiple lockfiles warning** during build: a `package-lock.json` exists in the user's home directory as well as the project, so Next.js picks the wrong workspace root. Setting `outputFileTracingRoot` or removing the stray lockfile would silence it.
8. **`node_modules` was stale** relative to `main`'s lockfile and was reinstalled with `npm ci` for this work.

## 4. Brand and conventions observed

- Voice: plain, practical British English, second person, no hype. Existing editorial posts open with a scenario, give a direct answer under a question-style H2 near the top, use `<aside data-tone="insight">` callouts, tables and one or two SVG diagrams, and end with "The short version".
- Design tokens: warm off-white `#FBFAF6`, ink `#1A1410`, brand gradient `#F8C84A → #E8621A` (`docs/style-guide.md`).
- Images: `public/blog/<slug>/hero.webp` (1600×900), `og.jpg` (1200×630) and in-article SVGs.
- URLs: `/blog/<slug>/` with trailing slashes; services at `/services/<pillar>/<slug>/`; portfolio at `/portfolio/<slug>/`.
- Contact: `/contact/`, hey@uniixstudio.com, +94 74 0555 898, WhatsApp `wa.me/94740555898` (from `lib/content.ts`).

## 5. Research limitations

- **Google Search Console:** available through the Supermetrics connector, but **not authenticated**. No impressions, clicks, CTR, positions or indexing data were retrieved.
- **Google Analytics 4:** the tag is live, but no API access was available, so there is no baseline for sessions or conversions.
- **Keyword volumes and difficulty:** no keyword tool (Ahrefs, Semrush or Similarweb) was connected. No volumes or difficulty scores are quoted anywhere in this work. Opportunity scores in `keyword-opportunities.md` are qualitative.
- **SERP research:** done with a US-based web search tool. Results for Sri Lankan queries may differ from what a searcher in Sri Lanka sees.
- **Third-party facts** (gateway fees, domain prices, legal dates) were checked against primary sources on 18 October 2026 and are dated in the articles. They will change.
