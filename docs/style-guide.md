# Uniix Studio — Style Guide

> Technical design-system reference, extracted verbatim from the live codebase
> (`tailwind.config.js`, `app/globals.css`, `app/(site)/layout.tsx`).
> Token names match the Tailwind config so this doubles as developer documentation.

---

## 1. Color

### 1.1 Brand gradient (signature)
The defining brand asset. Linear, 135°, four warm stops.

```css
linear-gradient(135deg, #F8C84A 0%, #F5A623 35%, #F07B20 70%, #E8621A 100%);
```

| Token | Hex | Role |
|---|---|---|
| `brand-1` | `#F8C84A` | Golden yellow — gradient start, highlights |
| `brand-2` | `#F5A623` | Amber — mid |
| `brand-3` | `#F07B20` | Orange — **primary brand color** (selection, focus, scrollbar) |
| `brand-4` | `#E8621A` | Burnt orange — gradient end, deepest accent |

- **Tailwind:** `bg-brand-grad`, `bg-brand-grad-soft` (8% opacity wash), text gradient via `.gradient-text` / `.gradient-text-animated`.
- **Primary solid accent** when a single color is needed: `#F07B20` (`brand-3`).

### 1.2 Foundation — backgrounds
| Token | Hex | Use |
|---|---|---|
| `bg.DEFAULT` | `#FBFAF6` | Page background — warm off-white paper |
| `bg.warm` | `#FFF6EB` | Warm section tint |
| `bg.paper` | `#FFFFFF` | Cards / elevated surfaces |
| `bg.ink` | `#0E0A06` | Darkest background (near-black, warm) |

### 1.3 Foundation — ink / text
| Token | Hex | Use |
|---|---|---|
| `ink.DEFAULT` | `#1A1410` | Primary text |
| `ink.2` | `#3A2F26` | Secondary text / muted headings |
| `ink.mute` | `#7A6E64` | Tertiary / captions |

### 1.4 Lines & borders
| Token | Value |
|---|---|
| `line.DEFAULT` | `rgba(26,20,16,.10)` |
| `line.soft` | `rgba(26,20,16,.06)` |

### 1.5 Interaction colors
- **Selection:** background `#F07B20`, text `#fff`.
- **Focus ring:** `2px solid #F07B20`, `outline-offset: 3px`.
- **Scrollbar thumb:** `#F07B20` on `#FBFAF6` track.
- **Status dot (live):** green `#22C55E` (`bg-green-500`) with pulsing glow.

---

## 2. Typography

Three families, loaded via `next/font/google` and exposed as CSS variables.

| Role | Family | CSS var / Tailwind | Notes |
|---|---|---|---|
| **Display** | Fraunces | `--font-display` / `font-display` | Variable serif. Axes: `opsz`, `SOFT`. Used for headlines. |
| **Sans (body)** | Lexend | `--font-sans` / `font-sans` | Default body font (`<body class="font-sans">`). |
| **Mono** | JetBrains Mono | `--font-mono` / `font-mono` | Eyebrows, labels, metadata. |

Fallback stacks: display → `Georgia, serif`; sans → `system-ui, sans-serif`; mono → `monospace`.

### 2.1 Display headings (`.display`)
```css
font-family: Fraunces;
font-weight: 400 (normal) or 500 (medium, hero);
letter-spacing: -0.025em;       /* hero uses -0.03em */
line-height: 1.02;              /* hero uses 0.8 for stacked lines */
font-variation-settings: "opsz" 144;
```
- **Italic accent** (`.italic-display`): `font-variation-settings: "opsz" 144, "SOFT" 100;` — used for the second hero line and emphasis words.
- **Hero scale:** `clamp(40px, 8.5vw, 112px)`.

### 2.2 Body
- Base: Lexend, weight **500 (`font-medium`)** dominates the UI; `400` and `600`/`700` used sparingly.
- Lede / intro paragraphs: `clamp(17px, 1.4vw, 20px)`, `line-height: 1.55`, color `ink.2`, `max-width: 68ch`.

### 2.3 Eyebrow (`.eyebrow`)
The recurring section label.
```css
font-family: mono;
font-size: 11px;
font-weight: 500;
letter-spacing: 0.18em;
text-transform: uppercase;
color: ink.2;
/* prefixed by a 24px gradient rule via ::before */
```
Mono uppercase labels elsewhere range `tracking-[0.16em]`–`[0.22em]`.

### 2.4 Gradient text
- `.gradient-text` — static gradient clipped to text.
- `.gradient-text-animated` — 120° gradient, `background-size: 220%`, drifts over a **6s** loop (`gradient-drift`).
- `.shimmer-text` — dark text with a white highlight sweeping across on a **4s** loop (used on the hero italic line).

---

## 3. Spacing & Layout

- **Container (`.wrap`):** `max-width: 1320px`, centered, padding `px-5` (mobile) → `md:px-8`.
- **Rhythm:** generous vertical whitespace; section padding driven by Tailwind scale (typ. `py-20`+).
- **Text balance:** headlines use `text-balance`.

---

## 4. Radius & Elevation

### Border radius
| Token | Value |
|---|---|
| `rounded-sm2` | `10px` |
| `rounded` (DEFAULT) | `18px` |
| `rounded-lg2` | `28px` |
| pills / buttons | `rounded-full` |

### Shadows
| Token | Value |
|---|---|
| `shadow-sm2` | `0 1px 2px rgba(26,20,16,.04), 0 8px 24px -12px rgba(26,20,16,.08)` |
| `shadow-soft` | `0 2px 4px rgba(26,20,16,.04), 0 24px 60px -24px rgba(232,98,26,.18)` — warm orange-tinted lift |

---

## 5. Buttons

Base (`.btn`): `inline-flex`, `gap: 10px`, padding `px-7 py-4`, `rounded-full`, weight 500, `15px`, `transition 300ms`.

| Variant | Style | Hover |
|---|---|---|
| `.btn-primary` | ink bg, white text, ink border | lift `-translate-y-0.5` + dark shadow |
| `.btn-grad` | brand gradient bg, white text | lift + orange shadow `rgba(232,98,26,.45)` |
| `.btn-ghost` | transparent, ink text, soft border | inverts to ink bg / white text |

All buttons lift `-0.5` (≈2px) on hover with a colored drop shadow.

---

## 6. Motion

Principle: **purposeful and calm.** Eased, slow loops; everything disables under `prefers-reduced-motion`.

| Animation | Keyframe | Timing |
|---|---|---|
| `animate-rise` | `rise` — translateY 105% → 0 | `.9s cubic-bezier(.2,.8,.2,1)` |
| `animate-scroll` (marquee) | `scroll` — translateX 0 → -50% | `38s linear infinite` |
| `animate-pulse2` (status dot) | `pulse2` — opacity 1 ↔ .55 | `2s ease infinite` |
| gradient text | `gradient-drift` | `6s ease-in-out infinite` |
| hero shimmer | `shimmer-pass` | `4s ease-in-out infinite` |
| hero grid mesh | `hero-grid-slide` — 80px slide | `18s linear infinite` |
| poster columns | `scrollColUp` / `scrollColDown` | `var(--scroll-duration, 40s) linear` |

- **Hover micro-interactions:** list rows reveal a `→` and indent (`pl-2`/`pl-3`); process rows indent and the number picks up the gradient.
- **Standard transition:** `300ms` for hover/UI; smooth scroll on `html`.
- **Library:** Framer Motion drives entrance/word-rise animations.
- **Reduced motion:** marquees pause, decorative loops stop, `scroll-behavior: auto`.

---

## 7. Backgrounds & Effects

- `bg-brand-grad-soft` — subtle 8% gradient wash for section tints.
- **Hero silk:** WebGL fluid orange shader behind a frosted-glass overlay (`backdrop-filter: blur(40px) saturate(130%)`).
- **Hero grid:** dual radial amber glows + animated 80px line mesh, masked to an ellipse.
- Dark project tiles: deep desaturated gradients with gradient/amber text accents at low opacity.

---

## 8. Accessibility

- Visible focus ring on all interactive elements (`:focus-visible` → orange outline).
- Skip-to-content link (`.skip-link`) — ink bar, reveals on focus.
- Color contrast: ink `#1A1410` on paper `#FBFAF6` exceeds WCAG AA.
- All non-essential motion honors `prefers-reduced-motion: reduce`.

---

## 9. Token Quick Reference (Tailwind)

```js
colors: {
  brand: { 1:'#F8C84A', 2:'#F5A623', 3:'#F07B20', 4:'#E8621A' },
  bg:    { DEFAULT:'#FBFAF6', warm:'#FFF6EB', paper:'#FFFFFF', ink:'#0E0A06' },
  ink:   { DEFAULT:'#1A1410', 2:'#3A2F26', mute:'#7A6E64' },
  line:  { DEFAULT:'rgba(26,20,16,.10)', soft:'rgba(26,20,16,.06)' },
}
fontFamily: { display:'Fraunces', sans:'Lexend', mono:'JetBrains Mono' }
borderRadius: { sm2:'10px', DEFAULT:'18px', lg2:'28px' }
```
