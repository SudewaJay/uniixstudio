/**
 * CricBook case study — content and asset registry.
 *
 * Every claim here is traceable to the live product (cricbook.lk), its public
 * pages, or the CricBook codebase. There are deliberately no traffic, booking,
 * revenue or ranking figures: none have been verified for publication.
 */

const A = "/portfolio/cricbook";

/** CricBook brand tokens, as defined in the product's Tailwind config. */
export const CB = {
  indigo: "#221C63",
  indigoDeep: "#15103F",
  navy: "#1C244B",
  magenta: "#ED1C8E",
  mint: "#22E0A0",
  electric: "#4B3FF5",
  gold: "#F5C518",
  surface: "#F4F3F8",
} as const;

export const img = {
  og: `${A}/og.jpg`,
  web: {
    home: `${A}/web/home.webp`,
    homeLong: `${A}/web/home-long.webp`,
    howItWorks: `${A}/web/how-it-works.webp`,
    listYourVenue: `${A}/web/list-your-venue.webp`,
    venue: `${A}/web/venue.webp`,
    venuesMap: `${A}/web/venues-map.webp`,
    playMalabe: `${A}/web/play-malabe.webp`,
    blog: `${A}/web/blog.webp`,
    software: `${A}/web/court-booking-software.webp`,
    lyvNugegoda: `${A}/web/list-your-venue-nugegoda.webp`,
    priceIndex: `${A}/web/price-index.webp`,
    indoorCricket: `${A}/web/indoor-cricket.webp`,
    futsal: `${A}/web/futsal.webp`,
    ownerSignIn: `${A}/web/owner-sign-in.webp`,
    homeCompare: `${A}/web/home-compare.webp`,
    homeLocations: `${A}/web/home-locations.webp`,
    homeGuarantee: `${A}/web/home-guarantee.webp`,
  },
  console: {
    hero: `${A}/console/hero.webp`,
    calendar: `${A}/console/calendar.webp`,
    courts: `${A}/console/courts.webp`,
    online: `${A}/console/online.webp`,
    reports: `${A}/console/reports.webp`,
    settlement: `${A}/console/settlement.webp`,
  },
  live: {
    mobileHome: `${A}/live/mobile-home.webp`,
    mobileVenue: `${A}/live/mobile-venue.webp`,
    mobileMap: `${A}/live/mobile-venues-map.webp`,
    mobileListVenue: `${A}/live/mobile-list-your-venue.webp`,
    tabletHome: `${A}/live/tablet-home.webp`,
  },
  app: {
    splash: `${A}/app/splash.webp`,
    onboarding: `${A}/app/onboarding.webp`,
    otp: `${A}/app/otp.webp`,
    sport: `${A}/app/sport.webp`,
    map: `${A}/app/map.webp`,
    list: `${A}/app/list.webp`,
    venue: `${A}/app/venue.webp`,
    slots: `${A}/app/slots.webp`,
    summary: `${A}/app/summary.webp`,
    processing: `${A}/app/processing.webp`,
    confirmed: `${A}/app/confirmed.webp`,
    bookings: `${A}/app/bookings.webp`,
    profile: `${A}/app/profile.webp`,
    dtMap: `${A}/app/dt-map.webp`,
    dtList: `${A}/app/dt-list.webp`,
    dtVenue: `${A}/app/dt-venue.webp`,
    dtSlots: `${A}/app/dt-slots.webp`,
    dtSummary: `${A}/app/dt-summary.webp`,
    dtConfirmed: `${A}/app/dt-confirmed.webp`,
    dtBookings: `${A}/app/dt-bookings.webp`,
  },
  brand: {
    logo: `${A}/brand/logo.svg`,
    logoDark: `${A}/brand/logo-dark.svg`,
    spark: `${A}/brand/spark.svg`,
    lockupLight: `${A}/brand/lockup-light.webp`,
    lockupDark: `${A}/brand/lockup-dark.webp`,
    markLight: `${A}/brand/mark-light.webp`,
    markDark: `${A}/brand/mark-dark.webp`,
    monogramLight: `${A}/brand/monogram-light.webp`,
    monogramDark: `${A}/brand/monogram-dark.webp`,
    wordmarkWide: `${A}/brand/wordmark-wide.webp`,
  },
  social: {
    courts: `${A}/social/courts.webp`,
    courtsAlt: `${A}/social/courts-alt.webp`,
    owners: `${A}/social/owners.webp`,
    proof: `${A}/social/proof.webp`,
    how: `${A}/social/how.webp`,
    foundingMint: `${A}/social/founding-mint.webp`,
    foundingMagenta: `${A}/social/founding-magenta.webp`,
    flyerOwners: `${A}/social/flyer-venue-owners.webp`,
    flyer: `${A}/social/flyer.webp`,
    storyComingSoon: `${A}/social/story-coming-soon.webp`,
    storyMessage: `${A}/social/story-message.webp`,
    storyWhy: `${A}/social/story-why.webp`,
  },
  photo: {
    court1: `${A}/photo/court-1.webp`,
    court2: `${A}/photo/court-2.webp`,
    court3: `${A}/photo/court-3.webp`,
    court4: `${A}/photo/court-4.webp`,
    futsalStrike: `${A}/photo/futsal-strike.webp`,
    futsalCage: `${A}/photo/futsal-cage.webp`,
    hallNight: `${A}/photo/hall-night.webp`,
  },
} as const;

export const video = {
  logoReveal: { src: `${A}/video/logo-reveal.mp4`, poster: `${A}/video/reveal-poster.webp` },
  reel: [
    {
      src: `${A}/video/hook.mp4`,
      poster: `${A}/video/hook-poster.webp`,
      label: "01 · The question",
      alt: "Story reel opening: why is booking a sports venue still so difficult?",
    },
    {
      src: `${A}/video/availability.mp4`,
      poster: `${A}/video/availability-poster.webp`,
      label: "02 · The player problem",
      alt: "Story reel: you don't even know if the time you want is available.",
    },
    {
      src: `${A}/video/venue-problems.mp4`,
      poster: `${A}/video/venue-problems-poster.webp`,
      label: "03 · The venue problem",
      alt: "Story reel: venue owners face overlapping bookings and untracked walk-ins.",
    },
    {
      src: `${A}/video/reveal-story.mp4`,
      poster: `${A}/video/reveal-story-poster.webp`,
      label: "04 · The reveal",
      alt: "Story reel: that's how CricBook started.",
    },
  ],
} as const;

/* -------------------------------------------------------------------------- */

export const projectInfo = [
  { label: "Client", value: "CricBook" },
  { label: "Industry", value: "Sports Technology" },
  { label: "Location", value: "Colombo, Sri Lanka" },
  { label: "Project type", value: "Digital product · Marketplace · Booking platform" },
  { label: "Year", value: "2026" },
];

export const infoServices = [
  "Branding",
  "Product Design",
  "UI/UX",
  "Web Design",
  "Development",
  "SEO",
  "Social Media",
];

export const channels = [
  { name: "Phone calls", note: "“Is 7 free tonight?”" },
  { name: "WhatsApp", note: "Three chats, one slot" },
  { name: "Walk-ins", note: "Already at the gate" },
  { name: "Social media", note: "DMs nobody tracks" },
  { name: "Paper diary", note: "Written in the book" },
  { name: "Manual calendars", note: "Updated when someone remembers" },
];

export const bigIdea = [
  {
    key: "Brand",
    line: "An identity with the energy of the game.",
    items: ["Wordmark + spark mark", "Colour & type system", "Brand voice"],
  },
  {
    key: "Product",
    line: "Two journeys designed as one system.",
    items: ["Player booking flow", "Venue console", "Design system"],
  },
  {
    key: "Platform",
    line: "The product, engineered and shipped.",
    items: ["Responsive web app / PWA", "Booking + payments", "Venue management"],
  },
  {
    key: "Marketing",
    line: "The brand, carried beyond the interface.",
    items: ["Social creative", "Story reel", "Venue flyers"],
  },
  {
    key: "Growth",
    line: "Foundations that compound over time.",
    items: ["Technical SEO", "Local landing pages", "Content architecture"],
  },
];

export const services = [
  { title: "Brand Identity", body: "Named the energy: the spark mark, the wordmark and a palette built for courts under floodlights." },
  { title: "Product Strategy", body: "Framed CricBook as a two-sided product — a player app and a venue tool — from day one." },
  { title: "UI/UX Design", body: "Designed the player journey from venue discovery to confirmed booking." },
  { title: "Web Design", body: "Designed the public site to sell the product, earn trust and bring venues on board." },
  { title: "Web Development", body: "Built the responsive customer-facing platform and its supporting digital experience." },
  { title: "Booking Platform", body: "Per-court availability, held slots at checkout, online or cash-at-venue payment." },
  { title: "Venue Management", body: "A console for calendars, walk-ins, pricing, staff, customers and settlement." },
  { title: "SEO", body: "Created the technical and content foundation for sport, venue and location search." },
  { title: "Content Strategy", body: "Sports guides, price indexes and a blog structured around what players actually ask." },
  { title: "Social Media Design", body: "A launch system of posts and stories that reads as CricBook at a glance." },
  { title: "Marketing Creatives", body: "Venue-acquisition flyers and campaign assets for owners and players." },
  { title: "Digital Product Experience", body: "One voice, one visual language and one logic from Instagram to invoice." },
];

export const palette = [
  { name: "Deep Indigo", hex: CB.indigo, role: "Surfaces, navigation, the night-session mood", fg: "#FFFFFF", flex: 3 },
  { name: "Magenta", hex: CB.magenta, role: "Primary action — Find a court, Pay, Book", fg: "#FFFFFF", flex: 2, shade: true },
  { name: "Mint", hex: CB.mint, role: "Availability, success, confirmed", fg: "#06302A", flex: 1.6 },
  { name: "Electric Blue", hex: CB.electric, role: "Highlights and secondary toggles", fg: "#FFFFFF", flex: 1.2 },
  { name: "Gold", hex: CB.gold, role: "Trust score and verified badges", fg: "#3A2A03", flex: 0.8 },
  { name: "Light Surface", hex: CB.surface, role: "App canvas for long browsing", fg: "#1A1730", flex: 1.4 },
];

/** Slot states as labelled in the live booking UI. */
export const slotStates = [
  { label: "Available", bg: "#E6FBF3", border: CB.mint, fg: "#067A52" },
  { label: "Held", bg: "#FFF8DB", border: CB.gold, fg: "#7A5B00" },
  { label: "Booked", bg: "#FDE6F2", border: CB.magenta, fg: "#A30F5F" },
  { label: "Closed", bg: "#EEEDF5", border: "#C9C6DC", fg: "#6B6796" },
];

export type JourneyStage = {
  key: string;
  title: string;
  lead: string;
  decisions: string[];
  screens: { src: string; alt: string }[];
};

export const journey: JourneyStage[] = [
  {
    key: "Discover",
    title: "Start from the sport and the side of town.",
    lead: "Players don't search for a venue name. They search for a game near them tonight.",
    decisions: [
      "Sport toggle sits above everything — cricket and football never mix in one list",
      "Area selection defaults to where you are, with a map and a list view",
      "Price pills on the map, so cost is visible before a tap",
    ],
    screens: [
      { src: img.app.sport, alt: "CricBook app home with sport toggle, search and nearby filters" },
      { src: img.app.map, alt: "CricBook map view with price pills on each venue" },
    ],
  },
  {
    key: "Choose",
    title: "Compare venues the way players compare them.",
    lead: "Distance, rating and hourly price do the deciding — so they lead every card.",
    decisions: [
      "Venue cards carry sport, distance, rating and ‘from’ price",
      "Sort by nearby, top rated or open late",
      "Venue pages answer amenities, reviews and location before you commit",
    ],
    screens: [
      { src: img.app.list, alt: "CricBook venue list with venue cards and price per hour" },
      { src: img.app.venue, alt: "CricBook venue detail page with amenities and reviews" },
    ],
  },
  {
    key: "Book",
    title: "Every court, every slot, labelled — not just coloured.",
    lead: "Availability is the product. A multi-court venue shows every court's slot, not one guess.",
    decisions: [
      "Seven days of availability, grouped into morning, afternoon and evening",
      "Slots are labelled available, held, booked or closed",
      "Peak pricing is shown on the slot itself, never at checkout",
    ],
    screens: [
      { src: img.app.slots, alt: "CricBook slot selection screen with morning, afternoon and evening slots" },
      { src: img.app.summary, alt: "CricBook booking summary with price breakdown and cancellation policy" },
    ],
  },
  {
    key: "Pay",
    title: "Pay the way the venue actually works.",
    lead: "Sri Lankan venues run on cash. The product had to respect that, not fight it.",
    decisions: [
      "Online payment via PAYable — card, FriMi or eZ Cash",
      "Deposit now, or reserve and pay cash at the venue where offered",
      "The slot is held while you check out, so nobody takes it mid-booking",
    ],
    screens: [
      { src: img.app.processing, alt: "CricBook confirming booking screen while payment completes" },
      { src: img.app.summary, alt: "CricBook confirm booking screen with pay button" },
    ],
  },
  {
    key: "Play",
    title: "A reference you show at the counter. That's check-in.",
    lead: "The confirmation replaces the screenshot, the group chat and the phone call back.",
    decisions: [
      "Every booking carries a reference shown at the venue",
      "Add to calendar and get directions from the confirmation",
      "Upcoming and past bookings live in one place",
    ],
    screens: [
      { src: img.app.confirmed, alt: "CricBook ‘You are booked’ confirmation screen with booking reference" },
      { src: img.app.bookings, alt: "CricBook My Bookings screen with upcoming bookings" },
    ],
  },
];

export const bookingSequence = [
  { n: "01", title: "Find a venue", body: "Nearby venues on a map, priced before you tap.", src: img.app.map },
  { n: "02", title: "Choose your sport", body: "Cricket or football — one toggle, two different lists.", src: img.app.sport },
  { n: "03", title: "Compare courts", body: "Distance, rating and price on every card.", src: img.app.list },
  { n: "04", title: "Check availability", body: "Amenities, reviews and a direct path to live slots.", src: img.app.venue },
  { n: "05", title: "Choose a time", body: "Seven days, three dayparts, every slot labelled.", src: img.app.slots },
  { n: "06", title: "Confirm", body: "Court, time, price and cancellation terms — on one screen.", src: img.app.summary },
  { n: "07", title: "Pay", body: "Held while you pay. Confirmed the moment it clears.", src: img.app.processing },
  { n: "08", title: "Play", body: "A booking reference you show at the counter.", src: img.app.confirmed },
];

export type ConsoleView = {
  key: string;
  title: string;
  body: string;
  src: string;
  alt: string;
  url: string;
  ratio: string;
};

export const consoleViews: ConsoleView[] = [
  {
    key: "Calendar",
    title: "One live calendar",
    body: "Online, cash, walk-in and regular bookings land court-by-court in one calendar. Fill a slot here and it goes off sale everywhere.",
    src: img.console.calendar,
    alt: "CricBook venue console calendar showing two courts with online, cash, walk-in and regular bookings",
    url: "cricbook.lk/dashboard/calendar",
    ratio: "1800/764",
  },
  {
    key: "Courts & pricing",
    title: "The venue sets the rules",
    body: "Opening hours, peak windows, rates, maintenance blocks, holidays and closures — per court, because a cricket cage and a futsal pitch aren't priced the same.",
    src: img.console.courts,
    alt: "CricBook venue console court settings with opening hours, peak windows and rates per court",
    url: "cricbook.lk/dashboard/courts",
    ratio: "1300/1110",
  },
  {
    key: "Online bookings",
    title: "Players find you. You see it land.",
    body: "What a player books on CricBook appears in the owner's calendar the moment it's paid — alongside the cash bookings the venue already takes.",
    src: img.console.online,
    alt: "Side-by-side of what a player sees and the new online booking arriving in the venue console",
    url: "cricbook.lk/dashboard",
    ratio: "1800/534",
  },
  {
    key: "Reports",
    title: "Which hours pay for the lights",
    body: "Court fill rate by hour against real capacity — so pricing becomes a decision, not a habit.",
    src: img.console.reports,
    alt: "CricBook venue console reports with court fill rate by hour",
    url: "cricbook.lk/dashboard/reports",
    ratio: "1800/808",
  },
  {
    key: "Settlement",
    title: "Month-end in minutes",
    body: "One statement: what came in online, what came in as cash, the commission due and what settles to the bank.",
    src: img.console.settlement,
    alt: "CricBook venue console monthly settlement statement",
    url: "cricbook.lk/dashboard/settlement",
    ratio: "1380/1330",
  },
];

/** Owner console modules — each is a real route in the CricBook dashboard. */
export const consoleModules = [
  "Overview",
  "Calendar",
  "Bookings",
  "Walk-ins",
  "Courts",
  "Rates",
  "Closures",
  "Customers",
  "Staff",
  "Promotions",
  "Events",
  "Revenue",
  "Settlement",
  "Notifications",
];

export const ecosystem = {
  left: ["Discovery", "Availability", "Booking", "Payments"],
  right: ["Notifications", "Customer data", "Venue management", "Reporting"],
};

export const websiteBalance = [
  "Product discovery",
  "Conversion",
  "Trust",
  "Sports imagery",
  "Live booking",
  "Venue acquisition",
  "SEO",
  "Educational content",
];

export const websiteSequence = [
  { label: "Homepage", path: "cricbook.lk", src: img.web.home, alt: "CricBook homepage hero: Book the court. Not the phone call." },
  { label: "How it works", path: "cricbook.lk/how-it-works", src: img.web.howItWorks, alt: "CricBook How it works page: Find it. Book it. Play it." },
  { label: "Venue discovery", path: "cricbook.lk/venues", src: img.web.venuesMap, alt: "CricBook venue discovery map with prices on each venue" },
  { label: "Venue page", path: "cricbook.lk/venues/…", src: img.web.venue, alt: "CricBook venue page with availability and booking steps" },
  { label: "List your venue", path: "cricbook.lk/list-your-venue", src: img.web.listYourVenue, alt: "CricBook for venue owners page: Run your venue. Not your booking chaos." },
  { label: "Sports content", path: "cricbook.lk/indoor-cricket", src: img.web.indoorCricket, alt: "CricBook indoor cricket courts in Colombo page" },
];

export const seoFunnel = [
  { step: "Search", example: "“indoor cricket near me”" },
  { step: "Sport", example: "/indoor-cricket · /futsal" },
  { step: "Location", example: "/play/malabe · /play/athurugiriya" },
  { step: "Venue", example: "/venues/[venue]" },
  { step: "Booking", example: "Live slot → confirmed" },
];

export const seoFoundations = [
  { title: "Technical SEO", body: "Sitemap, robots, canonical metadata and generated Open Graph images across every route." },
  { title: "Structured data", body: "Organisation, website and page-level schema so search engines read venues and guides correctly." },
  { title: "Search-first architecture", body: "Sport → area → venue URLs that mirror how players phrase the search." },
  { title: "Local intent", body: "Area pages for where people play, and area landing pages for venue owners across Sri Lanka." },
  { title: "Sports content", body: "Court-dimension guides and a court price index that answer questions before they're asked." },
  { title: "Blog architecture", body: "Area- and sport-led articles that link back into the pages that book." },
  { title: "Internal linking", body: "Guides link to sports, sports to areas, areas to venues — every path ends at a bookable slot." },
  { title: "AI-search readiness", body: "An llms.txt and answer-shaped copy so assistants can describe CricBook accurately." },
];

export const seoPages = [
  { label: "Area page", path: "/play/malabe", src: img.web.playMalabe, alt: "CricBook Indoor cricket & futsal in Malabe area page" },
  { label: "Price index", path: "/futsal-court-prices-sri-lanka", src: img.web.priceIndex, alt: "CricBook Sri Lanka indoor court price index page" },
  { label: "Venue acquisition", path: "/list-your-venue/nugegoda", src: img.web.lyvNugegoda, alt: "CricBook List your Nugegoda court page" },
  { label: "Blog", path: "/blog", src: img.web.blog, alt: "CricBook blog index with sports and area articles" },
];

export const seoAreas = ["Colombo", "Nugegoda", "Dehiwala", "Mount Lavinia", "Negombo", "Malabe", "Athurugiriya", "Polgasowita"];

export const outcomes = [
  "Unified player booking experience",
  "Digital venue discovery",
  "Live, per-court availability",
  "Structured venue onboarding",
  "Connected player and venue workflows",
  "Mobile-first booking journey",
  "Search-ready content architecture",
  "Scalable product foundation",
  "One brand across every touchpoint",
];

export const technology = [
  { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Framer Motion"] },
  { group: "Platform", items: ["Responsive web app", "Installable PWA", "Capacitor iOS & Android shells"] },
  { group: "Backend", items: ["Node.js", "Express", "Prisma"] },
  { group: "Data", items: ["PostgreSQL on Supabase"] },
  { group: "Payments", items: ["PAYable — card, FriMi, eZ Cash"] },
  { group: "Authentication", items: ["Phone OTP", "Google Sign-In"] },
  { group: "Messaging & media", items: ["Transactional email", "Web push", "Cloudinary", "Google Maps"] },
  { group: "Deployment", items: ["Vercel", "Containerised API"] },
];

export const layers = ["Brand", "UX", "UI", "Web", "Platform", "Content", "SEO", "Growth"];

export const faqs = [
  {
    question: "What is CricBook?",
    answer:
      "CricBook is a sports booking platform for indoor cricket and futsal courts in Sri Lanka. Players see live per-court availability and prices, book in about a minute, and pay online or in cash at the venue where that's offered. Venue owners run their bookings, walk-ins, pricing and settlement from one console.",
  },
  {
    question: "What did Uniix Studio do for CricBook?",
    answer:
      "Uniix Studio designed and built CricBook end to end: brand identity, product strategy, UI/UX for the player app and the venue console, web design and development, the booking and payment flows, SEO and content architecture, and social media and marketing creative.",
  },
  {
    question: "Is CricBook a website or an app?",
    answer:
      "Both. CricBook is a responsive web application that installs to the home screen as a PWA, with Capacitor shells prepared for iOS and Android — one codebase serving players and venue owners.",
  },
  {
    question: "How do payments work on CricBook?",
    answer:
      "Players can pay online through PAYable by card, FriMi or eZ Cash, pay a deposit, or reserve and pay cash at the venue where the venue allows it. The slot is held while the player checks out.",
  },
];
