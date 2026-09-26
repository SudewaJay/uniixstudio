/**
 * Content for the /finland landing page.
 *
 * Everything authored for that page lives here, so copy changes never touch
 * component code. Nothing in this file is a claim about Finnish clients,
 * offices, statistics or credentials — see the PLACEHOLDERS block below for
 * the values that still need real information before launch.
 */

// ---------------------------------------------------------------------------
// PLACEHOLDERS — search the repo for "FINLAND_PLACEHOLDER" to find them all.
// Replace each string with verified information. While any of these still
// starts with "[" the page renders with `noindex` and stays out of the
// sitemap (see `finlandHasPlaceholders`), so an unfinished page never ranks.
// ---------------------------------------------------------------------------

export const finlandPartner = {
  /* FINLAND_PLACEHOLDER */ name: "[FRIEND_NAME]",
  /* FINLAND_PLACEHOLDER */ bio: "[FRIEND_BIO]",
  role: "Technical Partner — Finland",
  title: "Senior Software Engineer",
  /**
   * Path under /public (e.g. "/finland/partner.jpg") or a Cloudinary URL.
   * Portrait ratio 4:5, at least 1200px tall. `null` renders a neutral
   * monogram card instead of a stock face.
   */
  portrait: null as string | null,
  /** Optional public profile, e.g. LinkedIn. `null` hides the link. */
  profileUrl: null as string | null,
  /**
   * VERIFY against the partner's CV before launch — keep only the areas the
   * CV actually supports. Do not add certifications or employers here.
   */
  capabilities: [
    "Software Architecture",
    "Full-Stack Engineering",
    "Cloud",
    "APIs",
    "AI",
    "Technical Strategy",
    "Product Development",
  ],
};

export const finlandContact = {
  /* FINLAND_PLACEHOLDER */ email: "[FINLAND_EMAIL]",
  /* FINLAND_PLACEHOLDER */ phone: "[PHONE]",
  /**
   * Discovery-call destination. Point this at a real scheduler (Cal.com,
   * Calendly, HubSpot) when one exists; until then it lands on /contact.
   */
  bookingUrl: "/contact/",
};

const isPlaceholder = (v: string) => v.trim().startsWith("[");

/** True while any required Finland value is still a placeholder. */
export const finlandHasPlaceholders = [
  finlandPartner.name,
  finlandPartner.bio,
  finlandContact.email,
].some(isPlaceholder);

/** Render helper: hide optional placeholder fields (phone) instead of showing brackets. */
export const isFinlandPlaceholder = isPlaceholder;

// ---------------------------------------------------------------------------
// 02 — The model
// ---------------------------------------------------------------------------

export const finlandModel = {
  finland: {
    code: "FI",
    country: "Finland",
    label: "Local presence",
    timeZone: "Europe/Helsinki",
    items: [
      "Technical consultation",
      "Discovery",
      "Client communication",
      "Architecture",
      "Project coordination",
    ],
  },
  sriLanka: {
    code: "LK",
    country: "Sri Lanka",
    label: "Digital delivery",
    timeZone: "Asia/Colombo",
    items: [
      "UX/UI",
      "Branding",
      "Development",
      "Product engineering",
      "SEO & growth",
      "QA & support",
    ],
  },
};

// ---------------------------------------------------------------------------
// 03 — Capabilities
// ---------------------------------------------------------------------------

export const finlandCapabilities = [
  {
    num: "01",
    title: "Design",
    line: "Brands and interfaces people trust on first contact.",
    items: ["Brand identity", "UX strategy", "UI design", "Design systems", "Digital experiences"],
  },
  {
    num: "02",
    title: "Technology",
    line: "Production-grade engineering, from marketing sites to platforms.",
    items: ["Web development", "Web applications", "SaaS", "APIs", "Cloud", "AI & automation"],
  },
  {
    num: "03",
    title: "Growth",
    line: "Visibility and conversion that compound after launch.",
    items: ["SEO", "AEO", "Content", "Conversion optimization", "Analytics"],
  },
  {
    num: "04",
    title: "Product",
    line: "From a first hypothesis to a product that keeps evolving.",
    items: ["Product strategy", "UX research", "Prototyping", "MVP development", "Product evolution"],
  },
];

// ---------------------------------------------------------------------------
// 04 — Services
// ---------------------------------------------------------------------------

export type FinlandServiceVisual =
  | "presence"
  | "product"
  | "engineering"
  | "ai"
  | "growth"
  | "brand";

export const finlandServices: {
  num: string;
  title: string;
  desc: string;
  visual: FinlandServiceVisual;
  href: string;
}[] = [
  {
    num: "01",
    title: "Digital presence",
    desc: "High-performance websites built around UX, brand and conversion.",
    visual: "presence",
    href: "/services/technology/web-design/",
  },
  {
    num: "02",
    title: "Digital products",
    desc: "Web applications, SaaS platforms and customer-facing products.",
    visual: "product",
    href: "/services/technology/web-development/",
  },
  {
    num: "03",
    title: "Product engineering",
    desc: "From architecture and MVPs to scalable production systems.",
    visual: "engineering",
    href: "/services/technology/",
  },
  {
    num: "04",
    title: "AI & automation",
    desc: "Practical AI systems, automation and intelligent workflows.",
    visual: "ai",
    href: "/services/technology/",
  },
  {
    num: "05",
    title: "Digital growth",
    desc: "SEO, AEO, content and conversion systems.",
    visual: "growth",
    href: "/services/growth/seo/",
  },
  {
    num: "06",
    title: "Brand & experience",
    desc: "Identity, visual systems and digital brand experiences.",
    visual: "brand",
    href: "/services/design/brand-identity/",
  },
];

// ---------------------------------------------------------------------------
// 05 — Transformation
// ---------------------------------------------------------------------------

export const finlandTransformation = [
  {
    key: "old",
    label: "Old website",
    title: "An outdated digital presence",
    desc: "Where many companies start: a site that no longer reflects the business, the offer or the customer.",
    disciplines: ["Audit"],
  },
  {
    key: "structure",
    label: "Structure",
    title: "Strategy and structure",
    desc: "Audience, content and journeys are mapped before anything is designed — so every page has a job.",
    disciplines: ["Strategy", "UX"],
  },
  {
    key: "experience",
    label: "New experience",
    title: "A designed experience",
    desc: "Brand, interface and a reusable design system, shaped around how your customers decide.",
    disciplines: ["Design"],
  },
  {
    key: "product",
    label: "Product",
    title: "Engineered as a product",
    desc: "Fast, accessible and integrated — CMS, APIs and the tools your team already uses.",
    disciplines: ["Engineering"],
  },
  {
    key: "growth",
    label: "Growth",
    title: "Built to keep growing",
    desc: "Search visibility, content and conversion are measured and improved long after launch day.",
    disciplines: ["Growth"],
  },
] as const;

// ---------------------------------------------------------------------------
// 06 — Industries
// ---------------------------------------------------------------------------

export type FinlandIndustry = {
  num: string;
  name: string;
  sectors: string[];
  statement: string;
  capability: string;
  /** Slug of a real Uniix project whose cover can stand behind the tile. */
  proofProject?: string;
};

export const finlandIndustries: FinlandIndustry[] = [
  {
    num: "01",
    name: "Hospitality",
    sectors: ["Hotels", "Resorts", "Restaurants", "Tourism"],
    statement: "Booking journeys that feel as considered as the stay itself.",
    capability: "Booking UX · Multilingual sites · Local search",
    proofProject: "rentmycar-lk",
  },
  {
    num: "02",
    name: "Property",
    sectors: ["Real estate", "Construction", "Architecture", "Interior"],
    statement: "Portfolios and listings that let the work carry the sale.",
    capability: "Listing platforms · Visual portfolios · Lead capture",
  },
  {
    num: "03",
    name: "Professional services",
    sectors: ["Consulting", "Recruitment", "Finance", "Engineering"],
    statement: "Clear positioning for firms that sell expertise, not products.",
    capability: "Brand positioning · Content systems · CRM integration",
  },
  {
    num: "04",
    name: "Health & wellness",
    sectors: ["Clinics", "Dental", "Fitness", "Wellness"],
    statement: "Digital experiences that earn trust before the first appointment.",
    capability: "Accessible UX · Booking flows · Local SEO",
    proofProject: "st-lukes-medilab",
  },
  {
    num: "05",
    name: "Technology",
    sectors: ["SaaS", "Startups", "AI", "Software"],
    statement: "Product sites and platforms that explain complex things simply.",
    capability: "SaaS platforms · Product design · MVP engineering",
  },
  {
    num: "06",
    name: "Manufacturing",
    sectors: ["Industrial", "Engineering", "B2B", "Manufacturing"],
    statement: "Turning technical capability into a brand buyers remember.",
    capability: "B2B websites · Brand identity · Product catalogues",
    proofProject: "ecowave-energy",
  },
];

// ---------------------------------------------------------------------------
// 07 — Selected work (existing case studies only — no Finnish clients)
// ---------------------------------------------------------------------------

export const finlandWorkOrder = [
  "rentmycar-lk",
  "st-lukes-medilab",
  "ecowave-energy",
  "sierra-energy-solutions",
];

// ---------------------------------------------------------------------------
// 08 — Process
// ---------------------------------------------------------------------------

export const finlandProcess = [
  { num: "01", title: "Discover", desc: "Understand the business, audience and opportunity." },
  { num: "02", title: "Define", desc: "Turn the opportunity into a clear strategy." },
  { num: "03", title: "Design", desc: "Create the experience, brand and product system." },
  { num: "04", title: "Build", desc: "Engineer the digital experience for production." },
  { num: "05", title: "Grow", desc: "Improve performance, visibility and conversion." },
];

// ---------------------------------------------------------------------------
// 10 — Why Uniix (factual, editable)
// ---------------------------------------------------------------------------

export const finlandWhy = [
  {
    num: "01",
    title: "Design + engineering",
    desc: "Design and development are part of the same team, working from the same brief.",
  },
  {
    num: "02",
    title: "Local + international",
    desc: "Finland-side technical presence, with an established delivery team in Sri Lanka.",
  },
  {
    num: "03",
    title: "Product thinking",
    desc: "We design around business outcomes, not just screens.",
  },
  {
    num: "04",
    title: "Long-term partnership",
    desc: "We can stay involved after launch through growth, iteration and support.",
  },
  {
    num: "05",
    title: "Modern technology",
    desc: "Modern web architecture, performance, accessibility and AI-ready systems.",
  },
];

// ---------------------------------------------------------------------------
// 11 — Engagement models (no pricing)
// ---------------------------------------------------------------------------

export const finlandEngagements = [
  {
    num: "01",
    title: "Digital presence",
    forWho: "For companies that need a modern website and digital foundation.",
    includes: ["Strategy", "UX/UI", "Development", "SEO foundation", "Analytics"],
  },
  {
    num: "02",
    title: "Digital product",
    forWho: "For businesses building a platform, application or SaaS product.",
    includes: ["Product strategy", "UX research", "UI", "Architecture", "Development", "Launch"],
  },
  {
    num: "03",
    title: "Growth partnership",
    forWho: "For businesses that want ongoing digital improvement.",
    includes: ["SEO", "AEO", "Content", "Conversion", "Analytics", "Continuous UX improvements"],
  },
];

// ---------------------------------------------------------------------------
// Atmosphere photography
//
// Self-hosted under /public/finland (Unsplash License — free for commercial
// use, no attribution required; credited here anyway). These are placeholders
// for commissioned photography: swap `src` for your own shoot and keep the
// same crop intent (`position` is the object-position used on mobile crops).
// ---------------------------------------------------------------------------

export const finlandImages = {
  heroForest: {
    src: "/finland/forest-mist.jpg",
    alt: "Mist settling over a snow-dusted pine forest in the early morning",
    credit: "Julian Zwengel / Unsplash",
  },
  windowStudio: {
    src: "/finland/window-studio.jpg",
    alt: "A designer working on a laptop at a warmly lit table beside a large window on a cold blue evening",
    credit: "Kounotori / Unsplash",
    position: "62% center",
  },
  frozenLake: {
    src: "/finland/frozen-lake.jpg",
    alt: "A lone pine on the shore of a frozen lake at blue hour",
    credit: "Anastasia Zolotukhina / Unsplash",
    position: "56% center",
  },
  snowWalk: {
    src: "/finland/snow-walk.jpg",
    alt: "A person walking alone along a snow-covered forest path",
    credit: "Hanna Lazar / Unsplash",
    position: "40% center",
  },
  warmTable: {
    src: "/finland/warm-table.jpg",
    alt: "People talking at a lamp-lit table inside, with snowy hills beyond the window",
    credit: "Olya P / Unsplash",
    position: "50% center",
  },
  cabinDusk: {
    src: "/finland/cabin-dusk.jpg",
    alt: "Footprints in the snow leading to a warm-lit timber cabin at dusk",
    credit: "Sean C Davis / Unsplash",
    position: "64% 70%",
  },
};

/** Outside → Inside → Screen: the page's signature scroll story. */
export const finlandJourney = [
  { key: "outside", label: "Nature", line: "It starts outside — with the people you want to reach." },
  { key: "inside", label: "Human", line: "Then a conversation — understanding what they need." },
  { key: "screen", label: "Technology", line: "And finally the product — built for how they live." },
] as const;
