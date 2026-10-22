# Internal linking plan

Two parts: the links already built into the five new articles, and the links to add **from existing pages** to the new articles once each one is live.

> **Add inbound links in the CMS admin, not by editing the old MDX files and re-seeding.** The live content is in Payload. Re-seeding existing posts with `SEED_UPDATE_EXISTING=1` would overwrite any edits made in the CMS since the migration.

---

## Part 1: links inside the new articles (built)

Every link below was checked against a local production build: 0 broken internal links across the five posts.

### Online booking systems (`/blog/online-booking-system-sri-lanka/`)
| Anchor text | Target | Purpose |
|---|---|---|
| RentMyCar.lk | `/portfolio/rentmycar-lk/` | Evidence: the "don't build yet" decision |
| Wasana Drivers | `/portfolio/wasana/` | Evidence: WhatsApp-first flow |
| CricBook | `/portfolio/cricbook/` | Evidence: custom booking platform |
| UI/UX design | `/services/design/ui-ux-design/` | Service |
| payment gateways for Sri Lankan websites | `/blog/payment-gateway-sri-lanka-website/` | Cluster: payments |
| SEO services | `/services/growth/seo/` | Service |
| website cost guide | `/blog/website-cost-sri-lanka-2026/` | Cluster: cost |
| mobile apps vs web apps | `/blog/mobile-app-vs-web-app-which-does-your-business-need/` | Cluster |
| web development | `/services/technology/web-development/` | **Primary service** |
| Related services block | web-development, ui-ux-design, mobile-apps, seo | Template |

### Medical lab and clinic websites (`/blog/medical-lab-clinic-website-design-sri-lanka/`)
| Anchor text | Target | Purpose |
|---|---|---|
| St Luke's Medical Laboratory / St Luke's case study | `/portfolio/st-lukes-medilab/` | Evidence (twice: intro and conclusion) |
| local SEO and web design in Gampaha | `/blog/local-seo-web-design-gampaha/` | Cluster: local pages |
| Sinhala, Tamil and English websites | `/blog/multilingual-website-sinhala-tamil-english/` | Cluster: language |
| content marketing | `/services/growth/content-marketing/` | Service |
| online booking systems | `/blog/online-booking-system-sri-lanka/` | Cluster: booking |
| SEO services | `/services/growth/seo/` | Service |
| web design | `/services/technology/web-design/` | **Primary service** |

### Payment gateways (`/blog/payment-gateway-sri-lanka-website/`)
| Anchor text | Target | Purpose |
|---|---|---|
| CricBook | `/portfolio/cricbook/` | Evidence: PAYable integration |
| Shopify and WooCommerce in Sri Lanka | `/blog/shopify-vs-woocommerce-sri-lanka/` | Cluster |
| e-commerce | `/services/technology/ecommerce/` | **Primary service** |
| e-commerce development guide | `/blog/ecommerce-website-development-sri-lanka-guide/` | Cluster |
| online booking systems | `/blog/online-booking-system-sri-lanka/` | Cluster |
| web development | `/services/technology/web-development/` | Service |

### Multilingual websites (`/blog/multilingual-website-sinhala-tamil-english/`)
| Anchor text | Target | Purpose |
|---|---|---|
| Bilesma Natural | `/portfolio/bilesma-natural-social-media/` | Evidence: Sinhala-led creative |
| RentMyCar.lk | `/portfolio/rentmycar-lk/` | Evidence: Sinhala-first social, Noto Sans Sinhala |
| St Luke's Medical Laboratory | `/portfolio/st-lukes-medilab/` | Evidence: bilingual dengue articles |
| web design | `/services/technology/web-design/` | Service |
| website cost guide for Ja-Ela businesses | `/blog/business-website-cost-ja-ela/` | Cluster: cost of multilingual content |
| web development / SEO / content team | `/services/technology/web-development/`, `/services/growth/seo/`, `/services/growth/content-marketing/` | **Primary service: web development** |

### .lk domain registration (`/blog/lk-domain-registration-guide/`)
| Anchor text | Target | Purpose |
|---|---|---|
| Google Business Profile | `/blog/google-my-business-setup-sri-lanka-2026/` | Cluster: local |
| brand identity | `/services/design/brand-identity/` | Service (naming) |
| multilingual websites | `/blog/multilingual-website-sinhala-tamil-english/` | Cluster |
| web design | `/services/technology/web-design/` | **Primary service** |
| web design packages guide | `/blog/web-design-packages-sri-lanka/` | Cluster |

---

## Part 2: inbound links to add from existing pages

Add each link in the CMS admin when the target article is live. The suggested sentence is a minimal edit to existing copy; adapt it if the paragraph has changed. Priority: **A** adds commercial or topical relevance, **B** adds discovery.

| Pri | From (existing page) | Where | Suggested anchor and edit | To (new article) |
|---|---|---|---|---|
| A | `/blog/ecommerce-website-development-sri-lanka-guide/` | Payment gateway section and FAQ "Which payment gateways work in Sri Lanka in 2026?" | Add: "Our [guide to payment gateways for Sri Lankan websites](/blog/payment-gateway-sri-lanka-website/) compares fees and integration in detail." **Also review this section:** it says Stripe "workarounds exist", which the new article doesn't support. | Payment gateways |
| A | `/blog/shopify-vs-woocommerce-sri-lanka/` | Paragraphs "Shopify in Sri Lanka" / "WooCommerce in Sri Lanka" | Add: "see our [payment gateway comparison](/blog/payment-gateway-sri-lanka-website/) for current published fees." **Also review** the per-plan Shopify fee figures and the "1.5–2.5%" gateway fee claim. | Payment gateways |
| A | `/blog/web-design-vs-web-development-differences/` | Galle whale-watching booking example | Link "online booking system" to `/blog/online-booking-system-sri-lanka/` | Booking systems |
| A | `/blog/restaurant-website-design-sri-lanka/` | "a real-time booking system showing available slots" | Link "real-time booking system" | Booking systems |
| A | `/blog/hotel-website-design-sri-lanka/` | Booking engine section | Add: "If you're deciding whether to build or buy, see [online booking systems: build, buy or wait](/blog/online-booking-system-sri-lanka/)." | Booking systems |
| A | `/portfolio/cricbook/` (CMS project) | Booking platform section or FAQ | "Read our guide to [choosing an online booking system](/blog/online-booking-system-sri-lanka/)." | Booking systems |
| A | `/portfolio/st-lukes-medilab/` (CMS project) | Closing section | "Planning a site for your own lab or clinic? Read [what patients need to see](/blog/medical-lab-clinic-website-design-sri-lanka/)." | Healthcare |
| A | `/industries/healthcare/` (CMS industry) | Intro or related content | "[Medical lab and clinic website design in Sri Lanka](/blog/medical-lab-clinic-website-design-sri-lanka/)" | Healthcare |
| A | `/blog/business-website-cost-ja-ela/` | Bullet "Multilingual content…" | Link "a proper language structure" to `/blog/multilingual-website-sinhala-tamil-english/` | Multilingual |
| A | `/blog/how-to-brief-a-web-designer/` | "Multilingual? English-only, English + Sinhala…" | Add "(see [how to build a multilingual website](/blog/multilingual-website-sinhala-tamil-english/))" | Multilingual |
| B | `/blog/website-cost-sri-lanka-2026/` | "Domain Name Registration" item and FAQ | Link "domain registration" to `/blog/lk-domain-registration-guide/`. **Also correct** "LKR 2,000–5,000/year": the registry lists LKR 1,000 (.com.lk) to LKR 5,000 (.lk), with premium names higher. | .lk domains |
| B | `/blog/website-maintenance-cost-sri-lanka/` | "Hosting and domain management" | Link "domain" to `/blog/lk-domain-registration-guide/` | .lk domains |
| B | `/blog/google-my-business-setup-sri-lanka-2026/` | Clinic examples | Link "clinic" to `/blog/medical-lab-clinic-website-design-sri-lanka/` | Healthcare |
| B | `/blog/near-me-search-sri-lanka-service-area/` | "medical services" mention | Link "medical services" to `/blog/medical-lab-clinic-website-design-sri-lanka/` | Healthcare |
| B | `/blog/local-seo-sri-lanka-guide/` | Any Sinhala/Tamil keyword mention, or the conclusion | "If your customers search in Sinhala or Tamil, read [our multilingual website guide](/blog/multilingual-website-sinhala-tamil-english/)." | Multilingual |
| B | `/services/technology/ecommerce/` (CMS service) | FAQ or related posts | Payment gateway article | Payment gateways |
| B | `/services/technology/web-development/` (CMS service) | Related posts | Booking systems and multilingual articles | Booking, Multilingual |

### Automatic links (no action needed)

- **Related posts.** The five articles reference each other through `relatedPosts`, and the template's "Continue reading" rotation also surfaces every post from others, so none is orphaned.
- **Blog index, RSS and sitemap.** All five appear automatically once live (verified locally).

### Anchor text rules

- Describe the destination ("payment gateway comparison"), never "click here" or "read more".
- Don't repeat the exact primary keyword as an anchor on every page. Vary it naturally.
- Link from the paragraph where the reader would actually want the detail, not from a list at the end.
