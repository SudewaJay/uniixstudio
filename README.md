# Uniix Studio — Next.js Website

Production-grade Next.js 14 + Tailwind site for Uniix Studio. Five routes (Home, About, Services, Portfolio, Contact), shared component library, App Router, full SEO with JSON-LD schema, sitemap and robots.

## Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS 3 + custom CSS variables
- **Fonts:** Fraunces (display), Inter (body), JetBrains Mono (labels) — all via `next/font/google`
- **Language:** TypeScript
- **Animation:** CSS keyframes + IntersectionObserver (no heavy runtime libs)

## Quick start

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Build & ship

```bash
npm run build
npm start
```

## Deploy to Vercel

The fastest path:

1. Push this folder to a GitHub repo.
2. Go to [vercel.com/new](https://vercel.com/new), import the repo.
3. Vercel auto-detects Next.js — accept defaults, click **Deploy**.
4. Add `uniixstudio.com` under **Project → Settings → Domains**.

No build configuration needed. First build takes ~60–90 seconds.

## Project structure

```
app/
  layout.tsx          Root layout, fonts, metadata, JSON-LD schema
  page.tsx            Homepage
  globals.css         Design tokens, base styles, animations
  about/page.tsx      About page
  services/page.tsx   Services page (3 pillars + sub-services)
  portfolio/page.tsx  Portfolio page (work grid + case studies)
  contact/page.tsx    Contact page (form + sidebar)
  not-found.tsx       404
  sitemap.ts          Auto-generated /sitemap.xml
  robots.ts           Auto-generated /robots.txt
components/
  Nav.tsx             Sticky nav with scroll detection + mobile menu
  Footer.tsx          Footer with giant brand mark
  Logo.tsx            Reusable logo
  Hero.tsx            Homepage hero
  ServicesSection.tsx 3-pillar services grid
  WorkGrid.tsx        Reusable portfolio grid
  ProcessSection.tsx  4-stage process
  TestimonialsSection.tsx
  CTASection.tsx      Final CTA
  PageHeader.tsx      Inner-page hero
  Reveal.tsx          Scroll-triggered fade-in wrapper
  ContactForm.tsx     Contact form (client component)
lib/
  content.ts          All site copy — services, projects, testimonials, etc.
```

**Single source of truth for content:** `lib/content.ts`. Edit there, every page updates.

## Before going live — replace these

In `lib/content.ts`:
- `email: "hello@uniixstudio.com"` → your real email
- `whatsapp: "+94000000000"` → your real number
- `whatsappLink: "https://wa.me/94000000000"` → real number, no `+`

In `app/layout.tsx`:
- Add a real `og-image.jpg` (1200×630) to `/public/` and reference it in the metadata if you want richer social sharing previews.

In `components/ContactForm.tsx`:
- Currently the form opens the user's mail client via `mailto:`. To use a real backend (Resend, Postmark, etc.), create `app/api/contact/route.ts` and replace the `mailto:` line with a `fetch()` call to your endpoint. The component is already a client component, so this is a localised change.

## Customising the design

**Brand colours** live in `tailwind.config.js` under `theme.extend.colors.brand`. The gradient is in `theme.extend.backgroundImage["brand-grad"]`. Change once, propagates everywhere.

**Fonts** are imported in `app/layout.tsx`. Swap any of the three `next/font/google` calls for a different family — the rest of the app uses CSS variables, so nothing else needs to change.

**Add a new project** — push a new entry into the `projects` array in `lib/content.ts`. It'll show up on Home and Portfolio automatically.

**Add a new service item** — same pattern; edit the relevant pillar's `items` array.

## Performance notes

- All animations use CSS or IntersectionObserver — no heavy JS animation libraries
- Fonts loaded with `display: "swap"` to avoid layout shift
- All pages are static by default — Vercel serves them from edge cache
- JSON-LD schema present for ProfessionalService rich results
- Sitemap auto-generated at `/sitemap.xml`, robots at `/robots.txt`

## Future enhancements (deferred for later)

- Individual case study pages (one per project) — would need real screenshots and metrics
- Headless CMS integration (Sanity, Contentful) for editing without code
- Real form backend with spam protection (Resend + reCAPTCHA)
- Blog routes (already supported by the SEO blog automation pipeline you have)

---

Built for Uniix Studio. Light mode, brand gradient, editorial type, no AI slop.
