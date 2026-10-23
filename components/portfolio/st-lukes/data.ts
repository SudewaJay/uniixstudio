/**
 * St Luke's Medical Laboratory case study content. Prices, towns, packages,
 * analyzers, articles and schema counts are read off stlukesmedilab.com
 * (October 2026); project figures come from the client brief.
 */

/** Live-site brand tokens (from stlukesmedilab.com CSS). */
export const SL = {
  green: "#58B330",
  greenDark: "#3F7D24",
  greenDarker: "#2F5E1B",
  soft: "#F4FBF0",
  border: "#D1E7C4",
  ink: "#0F172A",
  red: "#DC2626",
} as const;

const shot = (id: string) => `/portfolio/st-lukes/${id}.webp`;
export const shots = {
  home: shot("d-home"),
  priceList: shot("d-price-list"),
  packages: shot("d-packages"),
  technology: shot("d-technology"),
  locations: shot("d-locations"),
  katunayake: shot("d-katunayake"),
  tsh: shot("d-tsh"),
  dengue: shot("d-dengue"),
  dengueSi: shot("d-dengue-si"),
  homeVisit: shot("d-home-visit"),
  mHome: shot("m-home"),
  mPriceList: shot("m-price-list"),
  mJaEla: shot("m-ja-ela"),
  mKatunayake: shot("m-katunayake"),
  mDengue: shot("m-dengue"),
  mPackages: shot("m-packages"),
  mTsh: shot("m-tsh"),
  mTechnology: shot("m-technology"),
} as const;

/* -------------------------------------------------------------------------- */
/* Headline numbers                                                            */
/* -------------------------------------------------------------------------- */

export const heroStats = [
  { value: "100", unit: "/100", label: "Lighthouse SEO" },
  { value: "0.5", unit: "s", label: "Desktop load" },
  { value: "63", unit: "", label: "Indexed pages" },
  { value: "0", unit: "", label: "Layout shift" },
];

export const challenge = [
  {
    title: "Smaller budget, same patients",
    body: "The national chains outspend a single lab on ads and brand. St Luke's had to win on things they don't do, not on doing more of what they do.",
  },
  {
    title: "Patients search by price and by place",
    body: "People type “TSH test price” or “blood test Wattala”. A brochure site has no page that answers either, so the chains win by default.",
  },
  {
    title: "Health searches demand proof",
    body: "Google and patients both look for signs of clinical credibility before they trust a lab with a blood sample.",
  },
];

/* -------------------------------------------------------------------------- */
/* 01 Price transparency                                                       */
/* -------------------------------------------------------------------------- */

export type Test = { name: string; price: number; cat: string };

const cat = (c: string, rows: Array<[string, number]>): Test[] =>
  rows.map(([name, price]) => ({ name, price, cat: c }));

/** The full public price list, exactly as published (LKR). */
export const tests: Test[] = [
  ...cat("Urine & Fluid", [
    ["Urine Full Report (UFR)", 400],
    ["Urine Microalbumin / UACR", 1400],
    ["Urine Sugar", 100],
    ["Urine Albumin", 100],
    ["Urine Sugar & Albumin", 150],
    ["SFR + Sugar", 400],
    ["Seminal Fluid Analysis (SFA)", 500],
    ["Pregnancy Test (HCG)", 250],
  ]),
  ...cat("Blood Sugar", [
    ["Fasting Blood Sugar (FBS)", 280],
    ["Post Prandial Blood Sugar (PPBS)", 280],
    ["Random Blood Sugar (RBS)", 280],
    ["3 Point Sugar Profile", 850],
    ["Glucose Challenge Test (GCT) with FBS", 750],
    ["OGTT (1st hr, 2nd hr, FBS)", 1300],
    ["OGTT (FBS, 2nd hr)", 1000],
    ["HbA1C", 2100],
  ]),
  ...cat("Haematology", [
    ["Full Blood Count (FBC)", 400],
    ["WBC / DC", 250],
    ["Platelet Count", 400],
    ["Haemoglobin (Hb)", 400],
    ["ESR", 400],
    ["Blood Group", 550],
    ["Malarial Parasites", 250],
    ["Ferritin", 2400],
  ]),
  ...cat("Coagulation", [
    ["Bleeding Time", 300],
    ["Clotting Time", 300],
    ["PT / INR", 1200],
  ]),
  ...cat("Lipids & Cardiac", [
    ["Serum Cholesterol", 700],
    ["Lipid Profile", 1500],
  ]),
  ...cat("Liver", [
    ["Serum Alkaline Phosphatase", 700],
    ["Protein (Total, Albumin, Globulin)", 1200],
    ["Gamma GT (GGT)", 700],
    ["SGOT (AST)", 650],
    ["SGPT (ALT)", 650],
    ["Serum Bilirubin (Total)", 700],
    ["Serum Bilirubin (Direct / Indirect)", 1300],
    ["Liver Function Test (LFT)", 2250],
    ["Liver Profile", 4000],
  ]),
  ...cat("Kidney", [
    ["Blood Urea", 650],
    ["Serum Creatinine", 650],
    ["Serum Creatinine with GFR", 700],
    ["Serum Electrolytes", 1350],
    ["Serum Uric Acid", 850],
    ["Calcium (Total)", 850],
    ["Ionized Calcium", 1350],
    ["Renal Profile", 4400],
    ["Renal Function Test (RFT)", 2200],
  ]),
  ...cat("Thyroid & Hormones", [
    ["TSH", 1800],
    ["Free T4 (FT4)", 1900],
    ["Free T3 (FT3)", 1900],
  ]),
  ...cat("Inflammation", [
    ["C-Reactive Protein (CRP)", 900],
    ["Rheumatoid Factor (quantitative)", 1000],
  ]),
  ...cat("Infectious Disease", [
    ["HIV 1, 2", 1800],
    ["VDRL", 1000],
    ["HBs Ag", 1200],
    ["Dengue NS1 Ag", 1200],
  ]),
  ...cat("Vitamins", [["Vitamin D", 7000]]),
  ...cat("Panels", [["Full Body Tests", 4300]]),
];

export const testCategories = Array.from(new Set(tests.map((t) => t.cat)));

export const packages = [
  { name: "Full Body Health Check", short: "Full Body", price: 4700, for: "A complete routine health screen" },
  { name: "Joint Pain & Fatigue Profile", short: "Joint Pain", price: 4500, for: "Body aches, joint pain and tiredness" },
  { name: "Kidney Health Profile", short: "Kidney", price: 3500, for: "Kidney function and gout risk" },
  { name: "Diabetic Kidney Profile", short: "Diabetic Kidney", price: 3600, for: "Early kidney monitoring for diabetes" },
];

/** Which package includes which test, in package order. */
export const packageMatrix: Array<{ test: string; in: [boolean, boolean, boolean, boolean] }> = [
  { test: "Full Blood Count (FBC)", in: [true, true, false, false] },
  { test: "ESR", in: [true, true, false, false] },
  { test: "Fasting Blood Sugar (FBS)", in: [true, true, false, false] },
  { test: "Urine Full Report (UFR)", in: [true, true, true, false] },
  { test: "Lipid Profile", in: [true, false, false, false] },
  { test: "SGOT", in: [true, false, false, false] },
  { test: "SGPT", in: [true, false, false, false] },
  { test: "Serum Creatinine", in: [true, false, false, false] },
  { test: "Blood Urea", in: [true, false, false, false] },
  { test: "C-Reactive Protein (CRP)", in: [false, true, false, false] },
  { test: "Rheumatoid (RA) Factor", in: [false, true, false, false] },
  { test: "TSH", in: [false, true, false, false] },
  { test: "Serum Electrolytes", in: [false, false, true, true] },
  { test: "Ionized Calcium", in: [false, false, true, true] },
  { test: "Serum Creatinine with GFR", in: [false, false, true, true] },
  { test: "Serum Uric Acid", in: [false, false, true, false] },
  { test: "Urine Microalbumin (UACR)", in: [false, false, false, true] },
];

/* -------------------------------------------------------------------------- */
/* 02 Hyper-local                                                              */
/* -------------------------------------------------------------------------- */

export type Town = {
  slug: string;
  name: string;
  kind: "hq" | "walk-in" | "home-visit";
  /** Approximate position on the schematic corridor map, 0–100 on each axis. */
  x: number;
  y: number;
  line: string;
};

/** Ten town pages. Descriptions are the lines each page leads with on the live site. */
export const towns: Town[] = [
  { slug: "negombo", name: "Negombo", kind: "home-visit", x: 22, y: 6, line: "Home visit blood tests and full-body checkups across Negombo. Samples collected at your door, digital reports emailed." },
  { slug: "katunayake", name: "Katunayake", kind: "home-visit", x: 46, y: 22, line: "Home and workplace blood tests for airport staff, Free Trade Zone workers and pre-employment medicals." },
  { slug: "seeduwa", name: "Seeduwa", kind: "home-visit", x: 42, y: 36, line: "Home blood tests and sample collection across Seeduwa, on the Negombo Road corridor near the airport." },
  { slug: "thudella", name: "Thudella", kind: "walk-in", x: 34, y: 49, line: "Reliable testing and priority home visits serving Thudella, minutes from the Ja-Ela lab." },
  { slug: "ja-ela", name: "Ja-Ela", kind: "hq", x: 48, y: 57, line: "Headquarters and central processing lab on Old Negombo Road. Walk-in tests and home visits." },
  { slug: "batagama", name: "Batagama", kind: "walk-in", x: 70, y: 60, line: "Neighbourhood lab tests and convenient home sample collection around Batagama." },
  { slug: "kandana", name: "Kandana", kind: "walk-in", x: 52, y: 70, line: "Fast, affordable blood tests and home sample collection on the Negombo Road corridor." },
  { slug: "ragama", name: "Ragama", kind: "walk-in", x: 76, y: 79, line: "Lab tests, ECG and home collection for Ragama and the teaching-hospital neighbourhood." },
  { slug: "welisara", name: "Welisara", kind: "walk-in", x: 56, y: 83, line: "Diagnostic testing and home visits across Welisara (also spelt Walisara) and surrounding areas." },
  { slug: "wattala", name: "Wattala", kind: "walk-in", x: 50, y: 95, line: "Transparently priced diagnostics and home visits for Wattala, every price published in LKR." },
];

export const townAnatomy = [
  "Its own introduction, written for that town",
  "Local landmarks and neighbourhoods",
  "2–3 FAQs local patients actually ask",
  "Opening hours, distance from the lab and postcode",
  "Google Maps embed linked to the Business Profile",
  "MedicalBusiness and City structured data",
];

/* -------------------------------------------------------------------------- */
/* 03 Technical SEO                                                            */
/* -------------------------------------------------------------------------- */

export type Query = { q: string; lang?: "si"; url: string; img: string; mobile: string; why: string };

/** Searches the site was built to answer, and the page that answers each one. */
export const queries: Query[] = [
  {
    q: "TSH test price in Sri Lanka",
    url: "stlukesmedilab.com/price-list/tsh",
    img: shots.tsh,
    mobile: shots.mTsh,
    why: "One of 19 test-price pages. The price, fasting rules and a WhatsApp button sit above the fold, with MedicalTest, Offer and FAQPage markup underneath.",
  },
  {
    q: "blood test Katunayake",
    url: "stlukesmedilab.com/locations/katunayake",
    img: shots.katunayake,
    mobile: shots.mKatunayake,
    why: "A home-visit town page written for airport staff and Free Trade Zone workers who need pre-employment and visa medicals.",
  },
  {
    q: "dengue symptoms Ja-Ela",
    url: "stlukesmedilab.com/blog/dengue-spike-2026-ja-ela-wattala",
    img: shots.dengue,
    mobile: shots.mDengue,
    why: "Published on 7 June 2026, during the dengue spike, while people were searching for it. Reviewed by a named MLT.",
  },
  {
    q: "ඩෙංගු රුධිර පරීක්ෂණ ජා-ඇල",
    lang: "si",
    url: "stlukesmedilab.com/blog/dengue-spike-2026-ja-ela-wattala-si",
    img: shots.dengueSi,
    mobile: shots.mDengue,
    why: "The same article in Sinhala, published the same day, for the patients who search in Sinhala.",
  },
  {
    q: "health checkup package price",
    url: "stlukesmedilab.com/packages",
    img: shots.packages,
    mobile: shots.mPackages,
    why: "Four packages at fixed LKR prices, with a side-by-side table of exactly which tests each one includes.",
  },
  {
    q: "CLIA thyroid test lab Ja-Ela",
    url: "stlukesmedilab.com/technology",
    img: shots.technology,
    mobile: shots.mTechnology,
    why: "All four analyzers named and pictured, each marked up as a MedicalDevice: a credibility signal for patients and for Google.",
  },
];

export type SchemaPage = { label: string; path: string; types: Array<[string, number]> };

/** Structured data per page template, counted from the live HTML. */
export const schemaPages: SchemaPage[] = [
  {
    label: "Price list",
    path: "/price-list",
    types: [["MedicalTest", 66], ["Offer", 58], ["City", 10], ["MedicalDevice", 4], ["FAQPage", 1], ["OfferCatalog", 1], ["MedicalBusiness", 1], ["BreadcrumbList", 1], ["WebSite", 1], ["SearchAction", 1]],
  },
  {
    label: "Test price page",
    path: "/price-list/tsh",
    types: [["MedicalTest", 9], ["Question", 8], ["Answer", 8], ["MedicalDevice", 4], ["FAQPage", 2], ["Offer", 1], ["MedicalBusiness", 1], ["BreadcrumbList", 1], ["City", 10]],
  },
  {
    label: "Town page",
    path: "/locations/katunayake",
    types: [["MedicalTest", 16], ["City", 11], ["Question", 8], ["MedicalDevice", 8], ["OpeningHoursSpecification", 4], ["MedicalBusiness", 2], ["PostalAddress", 2], ["FAQPage", 2], ["BreadcrumbList", 1]],
  },
  {
    label: "Article",
    path: "/blog/dengue-spike-2026-ja-ela-wattala",
    types: [["MedicalWebPage", 1], ["Person", 1], ["MedicalTest", 8], ["MedicalDevice", 4], ["FAQPage", 1], ["BreadcrumbList", 1], ["MedicalBusiness", 1], ["City", 10]],
  },
  {
    label: "Homepage",
    path: "/",
    types: [["MedicalBusiness", 1], ["MedicalTest", 12], ["City", 10], ["MedicalDevice", 4], ["Offer", 4], ["OfferCatalog", 1], ["FAQPage", 1], ["WebSite", 1], ["SearchAction", 1], ["SiteNavigationElement", 8]],
  },
];

export const schemaTypes = [
  "MedicalBusiness", "MedicalTest", "MedicalDevice", "MedicalWebPage", "MedicalProcedure", "FAQPage",
  "Question", "Answer", "Offer", "OfferCatalog", "BreadcrumbList", "ListItem", "ItemList", "City",
  "PostalAddress", "OpeningHoursSpecification", "WebSite", "SearchAction", "EntryPoint",
  "SiteNavigationElement", "Person", "AboutPage",
];

export const analyzers = [
  { name: "CLIA Immunoassay Analyzer", runs: "Thyroid, fertility hormones, Vitamin D, B12, tumour markers" },
  { name: "BioSystems A15", runs: "Liver, kidney, cholesterol and blood-sugar biochemistry" },
  { name: "Audicom AC9801", runs: "Sodium, potassium and chloride electrolytes" },
  { name: "Medonic Hematology Analyzer", runs: "Full blood count, platelets and dengue monitoring" },
];

/* -------------------------------------------------------------------------- */
/* 04 Content                                                                  */
/* -------------------------------------------------------------------------- */

export type Topic = "outbreak" | "tests" | "equipment" | "local";

export const topicInfo: Record<Topic, string> = {
  outbreak: "Outbreak alerts",
  tests: "Tests explained",
  equipment: "Inside the lab",
  local: "Local services",
};

export type Article = { title: string; slug: string; date: string; topic: Topic; si?: boolean };

/** Every article on the live blog, newest first. */
export const articles: Article[] = [
  { date: "2026-08-30", topic: "outbreak", slug: "chikungunya-test-ja-ela-wattala", title: "Chikungunya in Ja-Ela & Wattala: symptoms, blood tests and how to tell it apart from dengue" },
  { date: "2026-08-28", topic: "outbreak", slug: "leptospirosis-rat-fever-test-ja-ela-ragama", title: "Leptospirosis (rat fever) in Gampaha: who’s at risk after the rains" },
  { date: "2026-08-26", topic: "tests", slug: "hba1c-prediabetes-test-ja-ela", title: "HbA1c test in Ja-Ela: catching prediabetes before it becomes diabetes" },
  { date: "2026-08-24", topic: "tests", slug: "thyroid-tsh-test-ja-ela-wattala", title: "Thyroid test (TSH) in Ja-Ela: when tiredness or weight change is worth testing" },
  { date: "2026-08-22", topic: "tests", slug: "fatty-liver-test-ja-ela", title: "Fatty liver without alcohol: why it’s rising in Sri Lanka" },
  { date: "2026-07-23", topic: "local", slug: "home-blood-tests-negombo-seeduwa", title: "Home blood tests in Negombo & Seeduwa: how it works and what it costs" },
  { date: "2026-07-23", topic: "local", slug: "pre-employment-medical-tests-katunayake", title: "Pre-employment & visa medical blood tests in Katunayake" },
  { date: "2026-07-11", topic: "equipment", slug: "biochemistry-blood-tests-biosystems-a15-ja-ela", title: "Biochemistry blood tests on the BioSystems A15" },
  { date: "2026-07-11", topic: "equipment", slug: "clia-immunoassay-testing-ja-ela", title: "CLIA immunoassay testing: thyroid, Vitamin D & ferritin" },
  { date: "2026-07-11", topic: "equipment", slug: "electrolyte-testing-audicom-ja-ela", title: "Electrolyte testing on the Audicom AC9801" },
  { date: "2026-07-11", topic: "equipment", slug: "full-blood-count-medonic-ja-ela", title: "Full blood count & dengue monitoring on the Medonic analyzer" },
  { date: "2026-07-05", topic: "tests", slug: "vitamin-d-test-ja-ela-si", si: true, title: "Vitamin D රුධිර පරීක්ෂණය ජා-ඇලේ" },
  { date: "2026-07-05", topic: "tests", slug: "vitamin-d-test-ja-ela", title: "Vitamin D test in Ja-Ela: why deficiency is common" },
  { date: "2026-06-26", topic: "outbreak", slug: "dengue-high-risk-divisions-june-2026-ja-ela-wattala-si", si: true, title: "ඩෙංගු අවදානම් කලාප — 2026 ජූනි" },
  { date: "2026-06-26", topic: "outbreak", slug: "dengue-high-risk-divisions-june-2026-ja-ela-wattala", title: "Dengue high-risk areas in Ja-Ela, Wattala & Ragama: official June 2026 list" },
  { date: "2026-06-07", topic: "outbreak", slug: "dengue-spike-2026-ja-ela-wattala-si", si: true, title: "ඩෙංගු 2026: රෝග ලක්ෂණ සහ ජා-ඇල රුධිර පරීක්ෂණ" },
  { date: "2026-06-07", topic: "outbreak", slug: "dengue-spike-2026-ja-ela-wattala", title: "Dengue spike 2026: symptoms & where to test in Ja-Ela" },
  { date: "2026-02-15", topic: "tests", slug: "understanding-fasting-blood-sugar-results", title: "Understanding your fasting blood sugar results" },
  { date: "2026-02-10", topic: "tests", slug: "why-regular-lipid-profiling-is-crucial", title: "Why regular lipid profiling is crucial" },
  { date: "2026-02-05", topic: "tests", slug: "preparing-for-your-first-ecg", title: "Preparing for your first ECG: what to expect" },
];

/* -------------------------------------------------------------------------- */
/* 05 Experience, performance, timeline                                        */
/* -------------------------------------------------------------------------- */

export const contactWays = [
  { label: "Click-to-call", body: "The phone number is a tap target in the header, hero and footer." },
  { label: "WhatsApp", body: "A floating button on every page and a “Book on WhatsApp” button on every test page." },
  { label: "AI chat assistant", body: "An assistant on the site for quick questions about tests and visits." },
  { label: "Sticky mobile bar", body: "Call and WhatsApp stay within thumb reach while scrolling." },
  { label: "Home-visit booking", body: "Book a phlebotomist to the door in any of the 10 towns." },
];

export const lighthouse = [
  { label: "SEO", score: 100, note: "Mobile and desktop" },
  { label: "Best Practices", score: 100, note: "Mobile and desktop" },
  { label: "Accessibility", score: 97, note: "WCAG 2.2 AA, 44 px tap targets" },
  { label: "Performance", score: 100, note: "Desktop" },
];

export const scrollPages = [
  { id: "home", label: "Homepage", url: "stlukesmedilab.com", src: "/portfolio/st-lukes/f-home.webp", w: 1200, h: 5417 },
  { id: "prices", label: "Price list", url: "stlukesmedilab.com/price-list", src: "/portfolio/st-lukes/f-price-list.webp", w: 1200, h: 5417 },
  { id: "town", label: "Town page", url: "stlukesmedilab.com/locations/ja-ela", src: "/portfolio/st-lukes/f-ja-ela.webp", w: 1200, h: 2667 },
  { id: "article", label: "Article", url: "stlukesmedilab.com/blog/dengue-spike-2026-…", src: "/portfolio/st-lukes/f-dengue.webp", w: 1200, h: 5348 },
];

export const timeline = [
  { month: "Feb", items: ["Project kickoff", "New brand profile"] },
  { month: "Apr", items: ["Hero and price-list redesign"] },
  { month: "May", items: ["Full SEO playbook", "Structured data", "Blog engine"] },
  { month: "Jun", items: ["Google Search Console", "AI chatbot", "Dengue articles in English and Sinhala", "Mobile speed work"] },
  { month: "Jul", items: ["3 new service-area towns", "Google Maps embeds", "MLT-reviewed articles"] },
  { month: "Aug", items: ["5 articles optimised for AI search"] },
  { month: "Sep", items: ["Design-system rebuild", "36% less JavaScript"] },
  { month: "Oct", items: ["19 test-price landing pages", "Floating WhatsApp button"] },
];

export const relatedServices = [
  { name: "Web design", href: "/services/technology/web-design/" },
  { name: "SEO", href: "/services/growth/seo/" },
  { name: "Content marketing", href: "/services/growth/content-marketing/" },
  { name: "Healthcare websites", href: "/industries/healthcare/" },
];
