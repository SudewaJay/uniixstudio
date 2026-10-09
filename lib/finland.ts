/**
 * Content for the /finland landing page — client-first.
 *
 * The page sells the work; the Finland presence is a credibility detail near
 * the end. Nothing here is a claim about Finnish clients, offices, results or
 * credentials. Project facts (names, industries, services, challenge /
 * approach / result, testimonials) are NOT authored here — the page reads
 * them from each project's MDX in content/projects/.
 */

// ---------------------------------------------------------------------------
// PLACEHOLDERS — search the repo for "FINLAND_PLACEHOLDER" to find them all.
// While any required value still starts with "[" the page renders `noindex`
// and stays out of the sitemap (see `finlandHasPlaceholders`).
// ---------------------------------------------------------------------------

export const finlandPartner = {
  /* FINLAND_PLACEHOLDER */ name: "[FRIEND_NAME]",
  /* FINLAND_PLACEHOLDER */ bio: "[FRIEND_BIO]",
  role: "Technical Partner — Finland",
  title: "Senior Software Engineer",
  /** "/finland/partner.jpg" or a Cloudinary URL, 4:5. `null` → monogram card. */
  portrait: null as string | null,
  /** Optional public profile (e.g. LinkedIn). `null` hides the link. */
  profileUrl: null as string | null,
  /** VERIFY against the partner's CV — keep only what it supports. */
  capabilities: [
    "Software Engineering",
    "Architecture",
    "Product Development",
    "Cloud",
    "APIs",
    "AI",
  ],
};

export const finlandFounder = {
  /* FINLAND_PLACEHOLDER */ name: "[FOUNDER_NAME]",
  role: "Founder · Creative Director",
  /** Taken from the existing /about page copy. */
  bio: "Leads creative direction across brand identity, web and digital strategy. Works directly with every client from kickoff through launch.",
  /** Portrait path, 4:5. `null` → monogram card. */
  portrait: null as string | null,
};

export const finlandContact = {
  /* FINLAND_PLACEHOLDER */ email: "[FINLAND_EMAIL]",
  /* FINLAND_PLACEHOLDER */ phone: "[PHONE]",
};

/**
 * Ask Cloudinary for a pre-sized JPEG so the Next image optimizer never has
 * to pull a multi-megabyte original (some gallery PNGs are 5–8 MB). Non-
 * Cloudinary URLs pass through unchanged.
 */
export function cld(src: string, width = 1400): string {
  const marker = "/image/upload/";
  if (!src.includes("res.cloudinary.com") || !src.includes(marker)) return src;
  const [head, tail] = src.split(marker);
  // Leave URLs that already carry a transform segment alone.
  if (/^[a-z]_[^/]*,/.test(tail) || /^[a-z]_[^/]*\//.test(tail)) return src;
  return `${head}${marker}c_limit,w_${width},q_auto,f_jpg/${tail}`;
}

const isPlaceholder = (v: string) => v.trim().startsWith("[");

/** True while any required value is still a placeholder. */
export const finlandHasPlaceholders = [
  finlandPartner.name,
  finlandPartner.bio,
  finlandFounder.name,
  finlandContact.email,
].some(isPlaceholder);

/** Hide optional placeholder fields (phone) instead of showing brackets. */
export const isFinlandPlaceholder = isPlaceholder;

// ---------------------------------------------------------------------------
// 01 Hero — the living portfolio. Every tile is real Uniix work and links to
// that project's case study; name / industry / services come from its MDX.
// ---------------------------------------------------------------------------

export const finlandHeroTiles: { project: string; image: string; ratio: "tall" | "wide" | "square" }[] = [
  { project: "rentmycar-lk", image: "cover", ratio: "wide" },
  { project: "ecowave-energy", image: "cover", ratio: "square" },
  { project: "sierra-energy-solutions", image: "https://res.cloudinary.com/dfh2tmn3p/image/upload/v1781699871/sierra-energy/sierra-post-01.jpg", ratio: "tall" },
  { project: "st-lukes-medilab", image: "cover", ratio: "wide" },
  { project: "rentmycar-lk", image: "/portfolio/rentmycar/social/suv.webp", ratio: "square" },
  { project: "st-lukes-medilab", image: "https://res.cloudinary.com/dfh2tmn3p/image/upload/v1780539838/Lab-Test-Price-List-LKR-_-Ja-Ela-St-Luke-s-Medical-Laboratory-06-04-2026_07_52_AM_jj9eq9.png", ratio: "tall" },
  { project: "st-lukes-medilab", image: "https://res.cloudinary.com/dfh2tmn3p/image/upload/v1781701708/st-lukes/stlukes-social-avurudu.png", ratio: "square" },
  { project: "sierra-energy-solutions", image: "https://res.cloudinary.com/dfh2tmn3p/image/upload/v1781699879/sierra-energy/sierra-post-04.jpg", ratio: "tall" },
  { project: "sierra-energy-solutions", image: "https://res.cloudinary.com/dfh2tmn3p/image/upload/v1781699875/sierra-energy/sierra-post-02.jpg", ratio: "wide" },
  { project: "rentmycar-lk", image: "/portfolio/rentmycar/social/car.webp", ratio: "square" },
];

// ---------------------------------------------------------------------------
// 02 Selected work — editorial order. Only projects with real imagery.
// Pattern: large → two-up → large → horizontal strip.
// ---------------------------------------------------------------------------

export const finlandWorkLayout = {
  lead: "rentmycar-lk",
  pair: ["st-lukes-medilab", "ecowave-energy"],
  feature: "sierra-energy-solutions",
  /** Horizontal strip of detail frames, each linking to its case study. */
  strip: [
    { project: "rentmycar-lk", image: "/portfolio/rentmycar/social/van.webp", caption: "Social system" },
    { project: "sierra-energy-solutions", image: "https://res.cloudinary.com/dfh2tmn3p/image/upload/v1781699883/sierra-energy/sierra-post-05.jpg", caption: "Occasion post" },
    { project: "st-lukes-medilab", image: "https://res.cloudinary.com/dfh2tmn3p/image/upload/v1781701713/st-lukes/stlukes-social-new-year-2025.jpg", caption: "Social design" },
    { project: "sierra-energy-solutions", image: "https://res.cloudinary.com/dfh2tmn3p/image/upload/v1781699888/sierra-energy/sierra-post-07.jpg", caption: "Campaign post" },
    { project: "st-lukes-medilab", image: "https://res.cloudinary.com/dfh2tmn3p/image/upload/v1780539840/St-Luke-s-Medical-Laboratory-_-Ja-Ela-Blood-Tests-ECG-06-04-2026_07_50_AM_bwm3ic.png", caption: "Service pages" },
    { project: "rentmycar-lk", image: "/portfolio/rentmycar/social/tuktuk.webp", caption: "Category campaign" },
  ],
};

// ---------------------------------------------------------------------------
// 03 Services
// ---------------------------------------------------------------------------

export const finlandServices = [
  {
    num: "01",
    title: "Web design & development",
    desc: "High-performance websites designed around users, brands and business goals.",
    capabilities: ["UX strategy", "UI design", "Next.js", "CMS", "Performance", "Accessibility"],
    project: "st-lukes-medilab",
    href: "/services/technology/web-development/",
  },
  {
    num: "02",
    title: "UI/UX & product design",
    desc: "Digital experiences, interfaces and product systems designed for real people.",
    capabilities: ["UX research", "User journeys", "Wireframes", "Prototyping", "Design systems"],
    project: "rentmycar-lk",
    href: "/services/design/ui-ux-design/",
  },
  {
    num: "03",
    title: "Branding",
    desc: "Visual identities that create recognition and consistency across digital touchpoints.",
    capabilities: ["Brand strategy", "Logo systems", "Typography & colour", "Guidelines", "Motion"],
    project: "ecowave-energy",
    href: "/services/design/brand-identity/",
  },
  {
    num: "04",
    title: "Digital products",
    desc: "Web applications, SaaS platforms and digital products from idea to production.",
    capabilities: ["Product strategy", "MVPs", "Web applications", "SaaS", "APIs", "Cloud"],
    project: "rentmycar-lk",
    href: "/services/technology/",
  },
  {
    num: "05",
    title: "SEO & digital growth",
    desc: "Search visibility, content, conversion and continuous digital improvement.",
    capabilities: ["Technical SEO", "Local SEO", "AEO", "Content", "Conversion", "Analytics"],
    project: "st-lukes-medilab",
    href: "/services/growth/seo/",
  },
  {
    num: "06",
    title: "AI & automation",
    desc: "Practical AI systems, automation and intelligent digital workflows.",
    capabilities: ["Workflow automation", "Content pipelines", "Integrations", "AI features"],
    project: "rentmycar-lk",
    href: "/services/technology/",
  },
];

// ---------------------------------------------------------------------------
// 04 Case studies — challenge / approach / result come from MDX
// (`problem`, `solution`, `result`). Only real stats from MDX are shown.
// ---------------------------------------------------------------------------

export const finlandCaseStudies = ["rentmycar-lk", "st-lukes-medilab", "ecowave-energy", "sierra-energy-solutions"];

// ---------------------------------------------------------------------------
// 06 Capabilities — design → experience → engineering → growth
// ---------------------------------------------------------------------------

export const finlandCapabilities = [
  {
    num: "01",
    title: "Design",
    line: "Understanding people, then shaping what they see.",
    items: ["Strategy", "UX Research", "UI Design", "Design Systems"],
  },
  {
    num: "02",
    title: "Experience",
    line: "Interfaces that are fast, inclusive and easy to run.",
    items: ["Frontend", "CMS", "Performance", "Accessibility"],
  },
  {
    num: "03",
    title: "Engineering",
    line: "The systems underneath — built for production.",
    items: ["Backend", "APIs", "Cloud", "SaaS"],
  },
  {
    num: "04",
    title: "Growth",
    line: "Visibility and intelligence that compound after launch.",
    items: ["SEO", "Analytics", "AI", "Automation"],
  },
];

// ---------------------------------------------------------------------------
// 07 Industries — a real project stands behind a tile only where one exists.
// ---------------------------------------------------------------------------

export type FinlandIndustry = {
  num: string;
  name: string;
  sectors: string[];
  statement: string;
  capability: string;
  proofProject?: string;
};

export const finlandIndustries: FinlandIndustry[] = [
  {
    num: "01",
    name: "Hospitality",
    sectors: ["Hotels", "Restaurants", "Tourism", "Travel"],
    statement: "Booking journeys that feel as considered as the stay itself.",
    capability: "Web design · Booking UX · Local search",
    proofProject: "rentmycar-lk",
  },
  {
    num: "02",
    name: "Property & construction",
    sectors: ["Real estate", "Construction", "Architecture", "Interiors"],
    statement: "Portfolios and listings that let the work carry the sale.",
    capability: "Listing platforms · Visual portfolios · Lead capture",
  },
  {
    num: "03",
    name: "Healthcare & wellness",
    sectors: ["Clinics", "Laboratories", "Dental", "Wellness"],
    statement: "Digital experiences that earn trust before the first appointment.",
    capability: "Accessible UX · Booking flows · Local SEO",
    proofProject: "st-lukes-medilab",
  },
  {
    num: "04",
    name: "Professional services",
    sectors: ["Consulting", "Recruitment", "Finance", "Legal"],
    statement: "Clear positioning for firms that sell expertise.",
    capability: "Brand positioning · Content · CRM integration",
  },
  {
    num: "05",
    name: "Technology",
    sectors: ["SaaS", "Software", "AI", "Platforms"],
    statement: "Product sites and platforms that explain complex things simply.",
    capability: "Product design · SaaS platforms · Engineering",
  },
  {
    num: "06",
    name: "Manufacturing",
    sectors: ["Industrial", "Engineering", "B2B", "Energy"],
    statement: "Turning technical capability into a brand buyers remember.",
    capability: "B2B websites · Brand identity · Catalogues",
  },
  {
    num: "07",
    name: "Retail & e-commerce",
    sectors: ["Online stores", "D2C brands", "Marketplaces"],
    statement: "Stores that are easy to browse and easier to buy from.",
    capability: "E-commerce · Product pages · Conversion",
  },
  {
    num: "08",
    name: "Startups",
    sectors: ["Launch", "MVP", "Rebrand", "Scale-up"],
    statement: "From a first identity to a product ready for market.",
    capability: "Brand identity · MVPs · Launch sites",
    proofProject: "ecowave-energy",
  },
];

// ---------------------------------------------------------------------------
// 08 Process
// ---------------------------------------------------------------------------

export const finlandProcess = [
  { num: "01", title: "Discover", desc: "Understand the business, users and opportunity." },
  { num: "02", title: "Strategize", desc: "Define what needs to be built and why." },
  { num: "03", title: "Design", desc: "Create the experience and visual system." },
  { num: "04", title: "Build", desc: "Develop the product for production." },
  { num: "05", title: "Grow", desc: "Improve, measure and evolve." },
];

// ---------------------------------------------------------------------------
// 09 About — "from the studio" frames are real project details, captioned.
// ---------------------------------------------------------------------------

export const finlandStudioFrames = [
  { project: "ecowave-energy", image: "cover", caption: "Brand identity" },
  { project: "rentmycar-lk", image: "/portfolio/rentmycar/social/bus.webp", caption: "Campaign system" },
  { project: "sierra-energy-solutions", image: "https://res.cloudinary.com/dfh2tmn3p/image/upload/v1781699892/sierra-energy/sierra-post-09.jpg", caption: "Bilingual layouts" },
];

// ---------------------------------------------------------------------------
// 10 Finland presence
// ---------------------------------------------------------------------------

export const finlandPresence = {
  finland: {
    label: "Finland",
    timeZone: "Europe/Helsinki",
    items: ["Technical collaboration", "Client communication", "Local meetings", "Product & engineering discussions"],
  },
  team: {
    label: "Uniix international team",
    timeZone: "Asia/Colombo",
    items: ["Design", "UX/UI", "Development", "Branding", "Growth", "Product delivery"],
  },
};

// ---------------------------------------------------------------------------
// Atmosphere photography (Unsplash License; placeholders for commissioned
// photography). Used in the hero, the Finland presence section and the final CTA.
// ---------------------------------------------------------------------------

export const finlandImages = {
  heroForest: {
    src: "/finland/forest-mist.jpg",
    alt: "Mist settling over a snow-dusted pine forest in the early morning",
    credit: "Julian Zwengel / Unsplash",
    position: "center 35%",
  },
  frozenLake: {
    src: "/finland/frozen-lake.jpg",
    alt: "A lone pine on the shore of a frozen lake at blue hour",
    credit: "Anastasia Zolotukhina / Unsplash",
    position: "56% center",
  },
  cabinDusk: {
    src: "/finland/cabin-dusk.jpg",
    alt: "Footprints in the snow leading to a warm-lit timber cabin at dusk",
    credit: "Sean C Davis / Unsplash",
    position: "64% 70%",
  },
};
