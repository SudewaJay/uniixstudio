/** Bilesma Natural case study content. Everything here is drawn from the delivered work. */

export const BN = {
  green: "#6A9670",
  leaf: "#8CBF6B",
  deep: "#1F3A2B",
  charcoal: "#2E2E2E",
  sand: "#E8CFA8",
  kraft: "#B48A5E",
  mist: "#EEF3EC",
} as const;

const base = "/portfolio/bilesma";

export const img = {
  cover: `${base}/cover.webp`,
  oldBag: `${base}/old-kraft-bag.webp`,
  /** Old bag placed on the same 1600² canvas as taglineStudio, for the compare slider. */
  oldBagAligned: `${base}/old-kraft-bag-aligned.webp`,
  taglineStudio: `${base}/bag-tagline-studio.webp`,
  taglineMonstera: `${base}/bag-tagline-monstera.webp`,
  logoStudio: `${base}/bag-logo-studio.webp`,
  logoMonstera: `${base}/bag-logo-monstera.webp`,
  xBanner: `${base}/x-banner.webp`,
  bookmarks: `${base}/bookmarks.webp`,
};

export const reel = {
  src: `${base}/logo-reel.mp4`,
  poster: `${base}/logo-reel-poster.webp`,
  description:
    "Logo animation for Bilesma Natural by Uniix Studio: the brand mark resolves out of warm light and the Sinhala tagline ඔබව හදවතින්ම ලස්සන කරයි appears beneath it.",
  uploadDate: "2024-01-20",
  duration: "PT9S",
};

export const projectInfo = [
  { label: "Client", value: "Bilesma Natural (Pvt) Ltd" },
  { label: "Industry", value: "Ayurvedic skin & hair care" },
  { label: "Location", value: "Nugegoda, Sri Lanka" },
  { label: "Year", value: "2024" },
];

export const infoServices = ["Packaging design", "Print design", "Brand system", "Logo animation"];

export const problems = [
  {
    title: "It said nothing about natural beauty",
    body: "Bare kraft and a utility-blue band read as a grocery or takeaway bag. For an Ayurvedic skin and hair care brand, the word that matters most, natural, was nowhere to be seen.",
  },
  {
    title: "It disappeared on the counter",
    body: "No tagline, no colour story, no point of difference. Nothing made a customer pause, pick it up or remember whose bag it was.",
  },
  {
    title: "It wasted a free marketing surface",
    body: "A carry bag goes home with the customer and stays around for days. The old one carried no website, no phone number and no reason to order again.",
  },
];

export const comparison = [
  { aspect: "Base", before: "Brown kraft paper", after: "Clean white bag" },
  { aspect: "Brand cue", before: "Blue band, small badge logo", after: "Cascading watercolour botanicals" },
  { aspect: "Palette", before: "Off-brand utility blue", after: "Botanical greens" },
  { aspect: "Message", before: "None", after: "“Let Your Inner Beauty Shine”" },
  { aspect: "Contact", before: "None", after: "Web, email, two phone lines, address" },
  { aspect: "On the counter", before: "Blends in", after: "Reads premium and natural at a glance" },
];

export const decisions = [
  {
    title: "From functional to premium",
    body: "Moving from kraft to white repositions the brand from everyday to considered. White signals cleanliness and care and gives the artwork room to breathe.",
  },
  {
    title: "Show natural, don’t say it",
    body: "Monstera and palm fronds in watercolour run down the gusset and wrap the corner, so the bag tells the plant-based story before a word is read.",
  },
  {
    title: "A palette that belongs to the brand",
    body: "The blue band fought the brand. A botanical green now ties the bag, banner and bookmarks together into one recognisable system.",
  },
  {
    title: "An emotional promise, front and centre",
    body: "“Let Your Inner Beauty Shine” leads the main face, with BEAUTY set heavier in brand green. The bag carries a feeling, not just a product.",
  },
  {
    title: "Every bag becomes a reorder prompt",
    body: "A green footer band carries bilesmanatural.lk, the customer care email, both phone lines and the Nugegoda address, so the bag keeps selling after the sale.",
  },
  {
    title: "Two faces, one system",
    body: "One face leads with the message; the other is a quiet logo panel with line-art leaves in sage and sand. Whichever way it sits, the bag is on brand.",
  },
];

export const outcomes = [
  "A two-panel carry bag that reads premium and natural from any angle",
  "One green botanical system shared by packaging, banner and bookmarks",
  "Contact details and the brand promise on every bag that leaves the store",
  "A Sinhala-led X-banner for retail floors, pop-ups and events",
  "Bookmark inserts that reward a second order and add value to the first",
  "A logo animation ready for Reels, ads and video intros",
];

export const relatedServices = [
  { name: "Print & packaging design", href: "/services/design/print-design/" },
  { name: "Brand identity", href: "/services/design/brand-identity/" },
  { name: "Motion graphics", href: "/services/design/motion-graphics/" },
  { name: "Social media creatives", href: "/services/design/social-media-creatives/" },
];
