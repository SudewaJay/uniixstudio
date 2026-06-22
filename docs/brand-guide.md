# Uniix Studio — Brand Guide

> The single source of truth for how Uniix Studio looks, sounds, and shows up.
> Extracted from the live website (`tailwind.config.js`, `app/globals.css`, `lib/content.ts`).

---

## 1. Brand at a Glance

| | |
|---|---|
| **Name** | Uniix Studio |
| **Tagline** | Creative Digital Agency |
| **Positioning line** | *Creative Digital Agency for Bold Brands.* |
| **One-liner** | We design brand identities, build performance websites, and grow businesses through data-driven marketing — all under one roof. |
| **Location** | Colombo, Sri Lanka — working globally |
| **Domain** | uniixstudio.com |

### What we do
Three disciplines, one roof:
1. **Design** — *Design that moves people.* Brand identity, web & UI/UX, social creatives, product design.
2. **Growth** — *Growth driven by data.* Performance marketing, SEO, social strategy, funnels.
3. **Technology** — *Tech built to scale.* Next.js/React builds, web apps, integrations, automation.

---

## 2. Mission & Promise

**Mission:** Design brands that *perform* — not just brands that look good.

**Brand promise:** Strategy first, design second. Every visual, layout, and motion exists to move someone closer to becoming a customer.

### The five things we stand for
1. **Strategy first, design second.** We don't chase trends.
2. **Senior team, no juniors hidden in the back.** You work directly with the builders.
3. **Design, growth & tech under one roof.** Everything in-house — no quality drift.
4. **Transparent timelines and pricing.** Clear scope, fixed milestones, no surprises.
5. **Built for long-term partnership.** Optimising for the second engagement, the third, the fifth.

---

## 3. Brand Personality

| Trait | We are | We are not |
|---|---|---|
| **Confident** | Bold, declarative, sure of the work | Arrogant, hype-driven |
| **Warm** | Approachable, human, Colombo-rooted | Cold, corporate, distant |
| **Sharp** | Strategic, results-led, precise | Vague, fluffy, jargon-heavy |
| **Crafted** | Editorial, considered, premium | Cheap, templated, mass-market |
| **Honest** | Transparent on price & timeline | Salesy, over-promising |

**Personality in one image:** an editorial magazine spread that also ships clean code — warm paper, a confident serif headline, and a sunset-orange gradient running through it.

---

## 4. Voice & Tone

### Voice principles
- **Lead with the outcome.** "Traffic tripled in two months." not "We offer SEO services."
- **Short, declarative sentences.** Headlines end with a period. *Design that moves people.*
- **Confident, never boastful.** Let proof and results do the bragging.
- **Plain language over jargon.** "We explain things clearly and deliver on time."
- **Active and human.** "We design, build, and grow." First-person plural, always.

### Tone by context
| Context | Tone |
|---|---|
| Hero / headlines | Bold, punchy, editorial — period-stopped statements |
| Service & body copy | Clear, benefit-led, confident |
| Testimonials | Real, specific, results-first |
| Process / about | Honest, partner-minded, reassuring |
| CTAs | Direct and inviting — "Start a project", "Let's talk" |

### Writing examples (on-brand)
- ✅ *Creative Digital Agency for Bold Brands.*
- ✅ *Design that moves people.*
- ✅ *Launch is the start, not the end.*
- ✅ *Senior team, no juniors hidden in the back.*
- ❌ *We are a synergistic full-service solutions provider.* (jargon, no outcome)
- ❌ *World's #1 best agency!!!* (hype, unprovable)

### Naming & terminology
- Always **Uniix Studio** (capital U, one word "Uniix"). Never "Unix", "Uniix Studios", or "uniix studio" in body copy.
- Spell disciplines as **Design**, **Growth**, **Technology** when referring to the service pillars.
- Use British/international spelling: *optimise, colour, programme* (matches site copy — "Optimisation", "optimising").

---

## 5. Logo & Clearspace (working principles)

The wordmark is set in the **Fraunces** display serif. Until a locked lockup file exists, follow these rules:

- **Clearspace:** keep padding equal to the cap-height of the "U" on all sides.
- **Minimum size:** 24px tall on screen for legibility of the serif.
- **On light backgrounds:** ink (`#1A1410`) wordmark.
- **On dark / photographic backgrounds:** white wordmark, or the brand gradient as an accent only.
- **Don't:** stretch, recolour outside the palette, add drop shadows, or set the wordmark in any font other than Fraunces.

Client logos on the site are individually styled wordmarks (see `lib/content.ts → clients`) — treat each as a guest brand, never restyle them in Uniix colours.

---

## 6. Color, Type & Motion

Full technical specs live in [`style-guide.md`](./style-guide.md). The essentials:

- **Signature:** the warm sunset gradient `#F8C84A → #F5A623 → #F07B20 → #E8621A` at 135°.
- **Foundation:** warm off-white paper (`#FBFAF6`) + near-black ink (`#1A1410`).
- **Type:** Fraunces (display serif) · Lexend (sans body) · JetBrains Mono (labels/eyebrows).
- **Motion:** purposeful and calm — word-rise headlines, slow gradient drift, marquees. Always respect `prefers-reduced-motion`.

---

## 7. Imagery & Art Direction

- **Mood:** editorial, premium, warm. Lean into sunset/amber tones that echo the gradient.
- **Treatment:** real work over stock where possible; when stock is used, prefer warm, high-contrast, crafted scenes.
- **Backgrounds:** dark project tiles use deep desaturated gradients (`from-[#0f1014]`, `from-[#0e2419]`) with the brand gradient or amber as a subtle accent.
- **Avoid:** cold blue corporate stock, cluttered collages, low-contrast greys.

---

## 8. Quick Do / Don't

**Do**
- Use the gradient as the hero accent — sparingly, for emphasis.
- End headlines with a period.
- Lead every claim with a measurable outcome.
- Keep generous warm-white space.

**Don't**
- Set the gradient on large background fills (it's an accent, not a wallpaper).
- Mix in off-palette colours or cold greys.
- Use more than the three brand typefaces.
- Hide the team behind jargon or hype.
