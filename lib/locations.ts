/**
 * Local service-area pages.
 *
 * SEO model: Uniix Studio has ONE physical address (see `site.businessAddress`
 * in lib/content.ts, which must match the Google Business Profile character-for-
 * character). Each location below is a SERVICE AREA we cover from that one office
 * — never a second address. Pages emit `areaServed` for the town + the single
 * real NAP, which is the correct way to rank locally without NAP conflicts.
 *
 * Every town has genuinely distinct copy (economy, landmarks, buyer profile,
 * FAQs). Do NOT template the same paragraph with the town name swapped —
 * Google treats near-duplicate "doormat" location pages as thin/spam.
 */

export type Location = {
  /** URL slug, e.g. "negombo" -> /locations/negombo/ */
  slug: string;
  /** Display name of the town. */
  name: string;
  /** District the town sits in (used in copy + schema). */
  district: string;
  /** Approx. geo centre of the town — used for the GeoCircle service area. */
  geo: { lat: number; lng: number };
  /** ~155-char meta description, town-specific. */
  metaDescription: string;
  /** One-line lede under the page header. */
  lede: string;
  /** 2–3 paragraph intro that establishes real local relevance. */
  intro: string[];
  /** Why a business in THIS town benefits from a local partner. */
  localAngle: string;
  /** Sectors that actually dominate this town's economy. */
  keyIndustries: string[];
  /** Landmarks / neighbourhoods a local would recognise (natural signals). */
  landmarks: string[];
  /** Which of our service slugs to feature here, most relevant first. */
  featuredServices: Array<{ pillar: string; slug: string; label: string }>;
  /** Town-specific FAQs (feed FAQPage schema + on-page accordion). */
  faqs: Array<{ question: string; answer: string }>;
  /**
   * Blog slugs to surface as a "local playbook" — matched to the town's
   * economy (e.g. Negombo → restaurant/local-SEO guides). Titles/excerpts are
   * pulled live from the posts, so only the slug lives here.
   */
  relatedPosts: string[];
};

const WEB = { pillar: "technology", slug: "web-design", label: "Web Design" };
const DEV = {
  pillar: "technology",
  slug: "web-development",
  label: "Web Development",
};
const WP = { pillar: "technology", slug: "wordpress", label: "WordPress Sites" };
const ECOM = {
  pillar: "technology",
  slug: "ecommerce",
  label: "E-commerce Stores",
};
const BRAND = {
  pillar: "design",
  slug: "brand-identity",
  label: "Brand Identity",
};
const SEO = { pillar: "growth", slug: "seo", label: "SEO" };
const SOCIAL = {
  pillar: "growth",
  slug: "social-media",
  label: "Social Media",
};

export const locations: Location[] = [
  {
    slug: "negombo",
    name: "Negombo",
    district: "Gampaha",
    geo: { lat: 7.2081, lng: 79.8380 },
    metaDescription:
      "Web design & development in Negombo. Uniix Studio builds fast, bookable websites for hotels, guesthouses, restaurants and tour operators on the west coast.",
    lede: "Websites and brands built for Negombo's tourism, hospitality and coastal business community.",
    intro: [
      "Negombo runs on visitors. Ten minutes from Bandaranaike International Airport, it's the first and last stop for a huge share of travellers entering Sri Lanka — which means your website is often the deciding factor between a booking and a scroll-past. We build sites for Negombo businesses that load fast on hotel Wi-Fi and airport 4G, and turn browsers into confirmed reservations.",
      "The town's economy is unusually digital-dependent: guesthouses live and die by Booking.com and their own direct-booking pages, seafood restaurants on the beach strip compete on Google Maps, and dive schools and tour operators sell to people who found them online weeks before they landed. A generic template doesn't cut it here — you need clear pricing, real photography, WhatsApp-first contact and a booking flow that works on a phone.",
      "We work with hotels, guesthouses, restaurants, watersports and tour operators across the lagoon and the beach strip, giving them a site and brand that looks as good as the international listings they're competing against — while keeping more of the margin that OTAs would otherwise take.",
    ],
    localAngle:
      "Negombo's buyers are overwhelmingly international and mobile. A locally-built site that prioritises direct bookings, multilingual-ready copy and Google Maps presence recovers commission you'd lose to OTAs — and ranks for high-intent searches like \"hotels in Negombo\" and \"Negombo restaurant\".",
    keyIndustries: [
      "Hotels & guesthouses",
      "Restaurants & seafood",
      "Tour operators & travel agents",
      "Watersports & diving",
      "Retail & wellness",
    ],
    landmarks: [
      "Negombo Beach strip",
      "Negombo Lagoon",
      "Katunayake / BIA (airport)",
      "Lellama fish market",
      "Poruthota Road",
    ],
    featuredServices: [WEB, DEV, ECOM, BRAND, SEO, SOCIAL],
    faqs: [
      {
        question: "Do you build websites for hotels and guesthouses in Negombo?",
        answer:
          "Yes — hospitality is our biggest local segment. We build direct-booking websites with room galleries, availability enquiry flows, WhatsApp booking and fast mobile performance, so you convert travellers without paying OTA commission on every stay.",
      },
      {
        question: "Can you help my Negombo restaurant show up on Google Maps?",
        answer:
          "We optimise your website for local search and align it with your Google Business Profile — consistent name, address and phone, menu and photos on-page, and location-specific content. Combined with reviews, that's what earns a spot in the Negombo map results.",
      },
      {
        question: "Do I need to be in Negombo to work with you?",
        answer:
          "No. We're a short drive up the coast and work with clients across Gampaha and Colombo, but the whole engagement runs over calls, WhatsApp and shared links. We can meet in Negombo when it helps.",
      },
    ],
    relatedPosts: [
      "restaurant-website-design-sri-lanka",
      "local-seo-sri-lanka-guide",
      "google-my-business-setup-sri-lanka-2026",
    ],
  },
  {
    slug: "ja-ela",
    name: "Ja-Ela",
    district: "Gampaha",
    geo: { lat: 7.0744, lng: 79.8919 },
    metaDescription:
      "Web design & development in Ja-Ela. Uniix Studio builds professional websites, e-commerce and branding for businesses along the Colombo–Negombo corridor.",
    lede: "Digital foundations for Ja-Ela's manufacturers, importers, showrooms and growing SMEs.",
    intro: [
      "Ja-Ela sits on the artery between Colombo and Negombo, wrapped around the Katunayake export-processing zone and a dense belt of small manufacturers, importers, showrooms and family businesses. It's a town of makers and traders — companies that have real products and real customers, but often a web presence that hasn't kept up with the business.",
      "That gap is exactly where a good website earns its keep. A Ja-Ela distributor or manufacturer doesn't need flashy animation — they need a credible site that a buyer, a supplier or a bank can look at and trust, with clear product catalogues, downloadable specs, and enquiry forms that actually reach the sales desk. We build exactly that: professional, fast, and easy for your own team to update.",
      "For the retailers and showrooms along the main road, we build sites and e-commerce stores that capture the walk-in-adjacent searches — people checking you out on their phone before they drive over — and turn them into calls, directions and orders.",
    ],
    localAngle:
      "Ja-Ela's B2B and trade businesses win deals on credibility. A clean, well-structured website with real product information and easy contact routes shortens the trust gap with buyers, suppliers and lenders — and captures the Colombo–Negombo traffic searching on the move.",
    keyIndustries: [
      "Manufacturing & light industry",
      "Import / export & distribution",
      "Showrooms & retail",
      "Construction & building supplies",
      "Professional services",
    ],
    landmarks: [
      "Colombo–Negombo main road (A3)",
      "Katunayake EPZ / free trade zone",
      "Kandana & Ekala industrial belt",
      "Ja-Ela town centre",
      "Gampaha district",
    ],
    featuredServices: [WEB, DEV, WP, BRAND, ECOM, SEO],
    faqs: [
      {
        question: "Do you build B2B and company websites for Ja-Ela businesses?",
        answer:
          "Yes. Much of Ja-Ela is manufacturing, distribution and trade, so we specialise in credible corporate sites with product catalogues, spec downloads, and enquiry forms that route straight to your sales team — the kind of site buyers, suppliers and banks take seriously.",
      },
      {
        question: "Can you build a site my own staff can update?",
        answer:
          "Absolutely. We build on WordPress or a simple CMS when you want in-house control, so your team can add products, update prices and post news without calling a developer each time.",
      },
      {
        question: "How quickly can a Ja-Ela business get online?",
        answer:
          "A focused business website typically goes live in 2–4 weeks; a larger catalogue or e-commerce store takes longer. We scope it against your goals on the first call and give you a fixed timeline.",
      },
    ],
    relatedPosts: [
      "ecommerce-website-development-sri-lanka-guide",
      "how-to-rank-on-google-sri-lanka",
      "local-seo-sri-lanka-guide",
    ],
  },
  {
    slug: "wattala",
    name: "Wattala",
    district: "Gampaha",
    geo: { lat: 6.9897, lng: 79.8919 },
    metaDescription:
      "Web design & development in Wattala. Uniix Studio builds high-converting websites, e-commerce and branding for retailers and service businesses near Colombo.",
    lede: "Websites and brands for Wattala's retailers, showrooms and service businesses on Colombo's doorstep.",
    intro: [
      "Wattala is where Colombo's commercial energy spills into Gampaha. On the Negombo Road you've got showrooms, supermarkets, clinics, restaurants and a thick layer of service businesses all fighting for the same well-connected, high-spending customers who live and commute through the area. The competition is Colombo-grade — and so should your website be.",
      "For a Wattala business, the website's job is to win the local search before the customer decides where to drive. When someone types \"salon near Wattala\", \"Wattala restaurant\" or \"showroom Wattala\", the businesses that show up with a fast site, real photos, clear offers and easy directions get the visit. We build sites engineered to be that result.",
      "Because Wattala buyers expect a Colombo standard of polish, we pair sharp brand design with conversion-focused build: strong first impressions, obvious calls to action, WhatsApp and click-to-call, and e-commerce when you're ready to sell beyond the walk-in radius.",
    ],
    localAngle:
      "Wattala's customers are affluent, mobile and comparison-shopping in real time. Winning the \"near me\" search with a fast, polished, Maps-aligned site converts that high foot-traffic intent into visits and orders — against Colombo-level competition.",
    keyIndustries: [
      "Retail & showrooms",
      "Restaurants & cafés",
      "Salons, clinics & wellness",
      "Real estate & property",
      "Local service businesses",
    ],
    landmarks: [
      "Negombo Road (main commercial strip)",
      "Hendala",
      "Hekitta",
      "Elakanda",
      "Colombo city boundary",
    ],
    featuredServices: [WEB, DEV, ECOM, BRAND, SEO, SOCIAL],
    faqs: [
      {
        question: "How do I get my Wattala business to rank higher on Google?",
        answer:
          "It's a mix: a fast, well-structured website with location-specific pages, a fully optimised Google Business Profile, consistent name/address/phone everywhere, on-page photos and reviews. We handle the website and on-page side and align it with your Business Profile so the two reinforce each other.",
      },
      {
        question: "Do you build online stores for Wattala retailers?",
        answer:
          "Yes — we build e-commerce on WooCommerce or Shopify with local payment gateways and delivery options, so your showroom can sell beyond walk-ins to customers across Colombo and Gampaha.",
      },
      {
        question: "Can you also handle branding and social media, not just the website?",
        answer:
          "We do. Many Wattala clients start with a website and add brand identity and social media so everything — logo, site, Instagram, ads — looks like one consistent, professional business.",
      },
    ],
    relatedPosts: [
      "local-seo-sri-lanka-guide",
      "real-estate-website-sri-lanka",
      "google-my-business-setup-sri-lanka-2026",
    ],
  },
];

export function getLocation(slug: string): Location | undefined {
  return locations.find((l) => l.slug === slug);
}
