export const site = {
  name: "Uniix Studio",
  tagline: "Creative Digital Agency",
  url: "https://www.uniixstudio.com",
  description:
    "Uniix Studio is a creative digital agency in Sri Lanka offering brand identity, web development, and digital marketing. We design brands that perform.",
  email: "hey@uniixstudio.com",
  phone: "+94 74 0555 898",
  whatsapp: "+94740555898",
  whatsappLink: "https://wa.me/94740555898",
  location: "Colombo, Sri Lanka",
  /**
   * Real, physical business address — MUST match your Google Business Profile
   * character-for-character (same street line, same phone). This is the single
   * NAP used across every location page's LocalBusiness schema.
   * TODO(uniix): replace the placeholders below with your verified GBP details.
   */
  businessAddress: {
    streetAddress: "", // TODO e.g. "123 Galle Road"
    addressLocality: "Colombo", // TODO the town your GBP is registered in
    addressRegion: "Western Province",
    postalCode: "", // TODO e.g. "11500"
    addressCountry: "LK",
    // TODO set to your office's real coordinates (drop a pin in Google Maps).
    geo: { lat: 6.9271, lng: 79.8612 },
  },
  /** Build an absolute canonical URL for a page path. */
  canonical: (path: string = "/") => {
    const clean = path.startsWith("/") ? path : `/${path}`;
    const withTrail = clean.endsWith("/") ? clean : `${clean}/`;
    return `https://www.uniixstudio.com${withTrail === "/" ? "/" : withTrail}`;
  },
  socials: {
    instagram: "https://instagram.com/uniix.studio",
    facebook: "https://facebook.com/uniixstudiolk",
    linkedin: "https://linkedin.com/company/uniixstudio",
  },
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/services", label: "Services" },
  { href: "/portfolio", label: "Work" },
  { href: "/blog", label: "Insights" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export const clients = [
  {
    name: "Wasana Drivers",
    logo: "/clients/wasana_drivers_srilanka_logo_by_uniix_studio.svg",
    style: "font-display tracking-[-0.04em]",
  },
  {
    name: "Zerro",
    logo: "/clients/zerro_logo.svg",
    style: "font-display font-bold tracking-[-0.06em]",
  },
  {
    name: "Ecowave Energy",
    logo: "/clients/ecowave_energy_logo.svg",
    style: "font-display tracking-[-0.02em]",
  },
  {
    name: "Himisha Tour",
    logo: "/clients/himisha_tour_logo.svg",
    style: "font-display italic tracking-[-0.02em]",
  },
  {
    name: "Rent My Car LK",
    logo: "/clients/rent_my_car_lk_logo.svg",
    style: "font-display tracking-[-0.02em]",
  },
  {
    name: "Jay",
    logo: "/clients/jay_logo.svg",
    style: "font-display tracking-[0.05em] uppercase",
  },
];

export const services = [
  {
    slug: "design",
    num: "01",
    title: "Design",
    headline: "Design that moves people.",
    positioning:
      "Visually striking, user-focused design that elevates brands and drives engagement — from logo systems to full digital experiences.",
    items: [
      {
        name: "Brand Identity & Logo Systems",
        desc: "Logo suites, palettes, type systems, and full brand guidelines that scale across every touchpoint.",
      },
      {
        name: "Website & Landing Page Design",
        desc: "Conversion-focused marketing sites and landing pages designed to ship and perform.",
      },
      {
        name: "UI/UX Design (Web & Mobile)",
        desc: "Product interfaces engineered for clarity, usability, and delight — with research-backed flows.",
      },
      {
        name: "Social & Marketing Creatives",
        desc: "Ad creatives, post templates, and campaign systems that stay on-brand at scale.",
      },
      {
        name: "Product Design",
        desc: "End-to-end product thinking — from wireframes to interactive prototypes ready for build.",
      },
    ],
  },
  {
    slug: "growth",
    num: "02",
    title: "Growth",
    headline: "Growth driven by data.",
    positioning:
      "We help brands grow through data-driven strategies and performance marketing — turning spend into measurable returns.",
    items: [
      {
        name: "Performance Marketing",
        desc: "Meta and Google ad campaigns built around conversion goals — not vanity metrics.",
      },
      {
        name: "SEO Optimisation",
        desc: "Local and technical SEO that ranks you where your customers are searching.",
      },
      {
        name: "Social Strategy & Content",
        desc: "Monthly content systems built around a clear brand voice and a plan that compounds.",
      },
      {
        name: "Funnel & Conversion Design",
        desc: "Audit-driven funnel rebuilds — landing pages, lead capture, nurture flows.",
      },
      {
        name: "Campaign Strategy",
        desc: "Launch playbooks, seasonal campaigns, and integrated rollouts across channels.",
      },
    ],
  },
  {
    slug: "technology",
    num: "03",
    title: "Technology",
    headline: "Tech built to scale.",
    positioning:
      "We build fast, scalable, and high-performance digital products using modern stacks like React and Next.js.",
    items: [
      {
        name: "Website Development",
        desc: "Next.js and React builds tuned for Core Web Vitals, SEO, and long-term maintainability.",
      },
      {
        name: "Custom Web Applications",
        desc: "Bespoke web apps and dashboards — auth, payments, integrations, the works.",
      },
      {
        name: "Web Maintenance & Optimisation",
        desc: "Ongoing performance, accessibility, and uptime monitoring for live products.",
      },
      {
        name: "API Integrations",
        desc: "Connect your stack — CRMs, payment gateways, analytics, third-party data.",
      },
      {
        name: "Automation Solutions",
        desc: "Internal tooling and workflow automation to take repetitive work off your team's plate.",
      },
    ],
  },
];

export const projects = [
  {
    slug: "zerro",
    title: "Zerro Branding",
    overline: "Brand Identity",
    year: "2024",
    feature: true,
    headline: "Visual identity for a modern tech brand.",
    summary:
      "Full visual identity system — logo, type system, brand guidelines and marketing collateral — for a launch-stage tech company.",
    bg: "from-[#0f1014] to-[#1a1d24]",
    bigText: "ZERRO",
    bigClass:
      "font-display font-bold tracking-[-0.04em] bg-brand-grad bg-clip-text text-transparent opacity-90",
    coverImage:
      "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=1600&q=80&auto=format&fit=crop",
    tags: ["Brand Identity", "Logo Design"],
    audienceTier: "startup",
  },
  {
    slug: "wasana",
    title: "Wasana Drivers",
    overline: "Web Design & Development",
    year: "2024",
    feature: false,
    headline: "Booking-ready transport site, mobile-first.",
    summary:
      "Mobile-first website with booking flow and local SEO for a Sri Lankan transport service.",
    bg: "from-[#1a1f3a] to-[#2c3354]",
    bigText: "WD",
    bigClass:
      "font-display font-bold tracking-[-0.05em] text-white/10",
    coverImage:
      "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1600&q=80&auto=format&fit=crop",
    tags: ["Web Design", "Web Development", "Local SEO"],
    audienceTier: "smb",
  },
  {
    slug: "coventry",
    title: "Coventry Business Club",
    overline: "Web Design",
    year: "2023",
    feature: false,
    headline: "A members-first site with corporate prestige.",
    summary:
      "Corporate website for a UK-based business community, balancing prestige with member-first UX.",
    bg: "from-[#2c2117] to-[#4a3826]",
    bigText: "CBC",
    bigClass:
      "font-display font-bold tracking-[-0.04em] text-white/10",
    coverImage:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1600&q=80&auto=format&fit=crop",
    tags: ["Web Design", "WordPress"],
    audienceTier: "midmarket",
  },
  {
    slug: "terraflow",
    title: "Terraflow Branding",
    overline: "Brand Identity",
    year: "2024",
    feature: true,
    headline: "Identity for an environmental tech startup.",
    summary:
      "End-to-end identity for a sustainability-focused startup — including logo, palette, motion language and full brand book.",
    bg: "from-[#0e2419] to-[#1a3d2c]",
    bigText: "TERRAFLOW",
    bigClass:
      "font-display font-bold tracking-[-0.04em] text-[#F8C84A]/25",
    coverImage:
      "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=1600&q=80&auto=format&fit=crop",
    tags: ["Brand Identity", "Motion Graphics"],
    audienceTier: "startup",
  },
];

export const testimonials = [
  {
    quote:
      "Uniix completely transformed our online presence. Traffic tripled within two months of relaunch — their local SEO knowledge is unmatched.",
    headline: "Traffic tripled in two months.",
    name: "Roshan Perera",
    role: "Director · Retail Brand, Colombo",
    initial: "R",
    project: "Performance Marketing",
    year: "2024",
  },
  {
    quote:
      "Finally, an agency that explains things clearly and delivers on time. The rebrand they did is something we're genuinely proud of.",
    headline: "A rebrand we're proud of.",
    name: "Nadeesha Fernando",
    role: "Founder · Hospitality Group",
    initial: "N",
    project: "Brand Identity",
    year: "2024",
  },
  {
    quote:
      "From identity to website to ads — having one team handle all of it is the reason our launch actually worked. Worth every rupee.",
    headline: "One team, one launch.",
    name: "Amal Jayasuriya",
    role: "Co-founder · Tech Startup",
    initial: "A",
    project: "Brand · Web · Growth",
    year: "2023",
  },
];

export const process = [
  {
    num: "01",
    title: "Discover",
    desc: "Deep-dive workshops to understand your business goals, audience, and what success actually looks like — before a single pixel moves.",
  },
  {
    num: "02",
    title: "Define",
    desc: "Strategy, messaging frameworks, sitemaps and creative direction — all aligned before we move into design and development.",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Brand systems, pixel-perfect UI, and production-ready code — delivered in tight, reviewable sprints with weekly check-ins.",
  },
  {
    num: "04",
    title: "Launch & Grow",
    desc: "Launch is the start, not the end. We run analytics, optimise conversion, and partner with you on growth campaigns long after delivery.",
  },
];

export const whyPoints = [
  {
    num: "01",
    title: "Strategy first, design second.",
    desc: "We don't chase trends. Every visual, every layout, every motion exists to move someone closer to becoming your customer.",
  },
  {
    num: "02",
    title: "Senior team, no juniors hidden in the back.",
    desc: "You work directly with the people building your project. No long handoff chains, no dropped context.",
  },
  {
    num: "03",
    title: "Design, growth and tech under one roof.",
    desc: "From identity to code to campaigns — everything in-house. No subcontractors, no quality drift between disciplines.",
  },
  {
    num: "04",
    title: "Transparent timelines and pricing.",
    desc: "Clear scope, fixed milestones, honest delivery dates. No surprises mid-project — and no scope creep on our side either.",
  },
  {
    num: "05",
    title: "Built for long-term partnership.",
    desc: "Most clients stay with us beyond their first project. We're optimising for the second engagement, the third, the fifth.",
  },
];
