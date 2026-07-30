/**
 * Location × Service combo pages — /locations/[area]/[service]/
 *
 * These target high-intent long-tail queries ("web design negombo",
 * "ecommerce website wattala"). CRITICAL: this is a CURATED list, NOT a
 * cross-product of every town × every service. Each entry is hand-written with
 * content that only makes sense for that specific town + service pairing.
 * Auto-generating all combinations would produce thin near-duplicate pages that
 * Google penalises — only add a combo here when you can write real, distinct
 * copy for it.
 *
 * `area` must match a slug in lib/locations.ts and `service`/`pillar` must match
 * a real service in lib/services.ts (both are validated at build via the
 * route's generateStaticParams).
 */

export type LocationService = {
  area: string; // location slug
  service: string; // service slug
  pillar: string; // service pillar slug
  serviceLabel: string; // display label, e.g. "Web Design"
  h1: string;
  metaTitle: string;
  metaDescription: string;
  lede: string;
  intro: string[];
  benefits: Array<{ title: string; body: string }>;
  faqs: Array<{ question: string; answer: string }>;
};

export const locationServices: LocationService[] = [
  {
    area: "negombo",
    service: "web-design",
    pillar: "technology",
    serviceLabel: "Web Design",
    h1: "Web Design in Negombo",
    metaTitle: "Web Design Negombo | Hotel & Restaurant Websites — Uniix Studio",
    metaDescription:
      "Web design in Negombo for hotels, guesthouses and restaurants. Uniix Studio builds fast, beautiful, direct-booking websites that convert travellers into guests.",
    lede: "Beautiful, fast, mobile-first websites for Negombo's hospitality and coastal businesses.",
    intro: [
      "In Negombo your website is your best salesperson — working 24/7 for travellers who are comparing you against a dozen Booking.com listings before they've even landed. Web design here isn't decoration; it's the difference between a direct booking and a lost commission. We design sites that load in a blink on airport 4G, look premium on a phone, and make the 'reserve' or 'WhatsApp us' button impossible to miss.",
      "A well-designed Negombo site earns trust in the first three seconds: real photography of your rooms or dishes, honest pricing, genuine reviews, and a booking flow that takes two taps. We design around how travellers actually decide — visually, quickly, on mobile — so more of the people who find you turn into confirmed guests instead of bouncing to an OTA.",
    ],
    benefits: [
      {
        title: "Direct-booking first",
        body: "Every design decision funnels toward a direct enquiry or booking — cutting the OTA commission you'd otherwise hand over on every stay.",
      },
      {
        title: "Mobile & speed obsessed",
        body: "Travellers browse on phones over patchy connections. We build for sub-2-second loads so you never lose a guest to a spinning wheel.",
      },
      {
        title: "Photography that sells",
        body: "We design galleries and layouts that show off your property or menu the way international listings do — so you look like the premium option, not the budget one.",
      },
    ],
    faqs: [
      {
        question: "How much does web design cost for a Negombo hotel or guesthouse?",
        answer:
          "It depends on scope — a polished single-property site is very different from a multi-room booking platform. We give a fixed quote after a short call where we understand your rooms, booking flow and goals. Most hospitality clients see the site pay for itself in recovered OTA commission within months.",
      },
      {
        question: "Can you redesign my existing Negombo website?",
        answer:
          "Yes. We often take a dated or slow site and rebuild it for speed, mobile and conversions while keeping your existing content and bookings intact. We'll audit what you have and tell you honestly what's worth keeping.",
      },
      {
        question: "Will my new site work with Booking.com and channel managers?",
        answer:
          "We design your site to complement your OTA presence and can integrate booking widgets or channel-manager links so your direct site and listings stay in sync — while nudging guests toward the commission-free direct booking.",
      },
    ],
  },
  {
    area: "negombo",
    service: "ecommerce",
    pillar: "technology",
    serviceLabel: "E-commerce",
    h1: "E-commerce Websites in Negombo",
    metaTitle: "E-commerce Website Development Negombo | Uniix Studio",
    metaDescription:
      "E-commerce websites in Negombo. Uniix Studio builds online stores for tour packages, seafood, retail and coastal brands — with local payment and delivery built in.",
    lede: "Online stores that let Negombo businesses sell beyond the beach strip.",
    intro: [
      "Negombo has products worth selling online — spice and seafood, dive courses and tour packages, resort retail and local crafts — but most of it is still sold face to face. An e-commerce site turns your walk-in trade into something that sells while you sleep, to customers in Colombo, Kandy or overseas who found you online.",
      "We build stores on WooCommerce or Shopify with Sri Lankan payment gateways and delivery options wired in, so checkout is friction-free for local buyers and card-ready for tourists. Whether you're selling bookable experiences or physical goods, we design the store to make browsing effortless and buying obvious.",
    ],
    benefits: [
      {
        title: "Sell experiences or products",
        body: "From bookable dive courses and tour packages to physical seafood and retail — we structure the store around how your specific product is bought.",
      },
      {
        title: "Local payments & delivery",
        body: "PayHere, card and cash-on-delivery, plus courier integrations — so both Sri Lankan and overseas buyers can check out without friction.",
      },
      {
        title: "Built to be found",
        body: "Product pages structured for search, so 'buy [product] Sri Lanka' queries can land straight on your store, not a marketplace.",
      },
    ],
    faqs: [
      {
        question: "Which platform is best for a Negombo online store — Shopify or WooCommerce?",
        answer:
          "Shopify is faster to launch and lower-maintenance; WooCommerce gives more control and no monthly platform fee. We recommend based on your product count, budget and how much you want to manage yourself — and explain the trade-offs plainly on our first call.",
      },
      {
        question: "Can tourists pay by international card?",
        answer:
          "Yes. We set up gateways that accept international cards alongside local options, so overseas customers and tourists can buy your products or book experiences before or after their trip.",
      },
      {
        question: "Do you handle delivery and inventory setup too?",
        answer:
          "We configure delivery zones, rates and courier options, and set up your product catalogue and stock so you're ready to sell from day one — then hand over a store your own team can run.",
      },
    ],
  },
  {
    area: "ja-ela",
    service: "web-development",
    pillar: "technology",
    serviceLabel: "Web Development",
    h1: "Web Development in Ja-Ela",
    metaTitle: "Web Development Ja-Ela | Business & B2B Websites — Uniix Studio",
    metaDescription:
      "Web development in Ja-Ela for manufacturers, distributors and trade businesses. Uniix Studio builds fast, credible, catalogue-ready company websites.",
    lede: "Robust, credible websites for Ja-Ela's manufacturers, importers and trade businesses.",
    intro: [
      "Ja-Ela runs on makers and traders — manufacturers, importers, distributors and showrooms clustered around the Katunayake zone and the Colombo–Negombo road. These businesses win on credibility and clarity, not animation. Good web development here means a fast, well-structured site that a buyer, supplier or bank can look at and immediately trust.",
      "We build company and B2B websites with proper product catalogues, spec and brochure downloads, and enquiry forms that route straight to your sales desk. Under the hood it's clean, fast and maintainable — built so your own team can add products and update prices without calling a developer, and so it holds up as your catalogue grows.",
    ],
    benefits: [
      {
        title: "Catalogue-ready",
        body: "Structured product and category systems with spec sheets and downloads — so buyers can self-serve the information that closes a deal.",
      },
      {
        title: "Credibility that converts B2B",
        body: "Clean, professional builds that make a small Ja-Ela manufacturer look as trustworthy as a multinational to buyers, suppliers and lenders.",
      },
      {
        title: "Easy for your team to run",
        body: "Built on a CMS your staff can actually use — add products, update prices, post news — without a developer on retainer.",
      },
    ],
    faqs: [
      {
        question: "Do you build B2B and manufacturer websites in Ja-Ela?",
        answer:
          "Yes — it's our core local segment. We build credible corporate sites with product catalogues, spec downloads and sales-routed enquiry forms, engineered for the trust B2B buyers, suppliers and banks expect.",
      },
      {
        question: "Can you build a custom web application, not just a website?",
        answer:
          "We do both. Beyond marketing sites we build custom tools — quote generators, dealer portals, inventory-linked catalogues — when a standard website isn't enough for how your business operates.",
      },
      {
        question: "Will the site be fast and easy to maintain?",
        answer:
          "Yes. We build for speed and hand over a site your team can maintain, with clean structure and a straightforward CMS. We also offer ongoing support if you'd rather we handle updates.",
      },
    ],
  },
  {
    area: "wattala",
    service: "ecommerce",
    pillar: "technology",
    serviceLabel: "E-commerce",
    h1: "E-commerce Websites in Wattala",
    metaTitle: "E-commerce Website Development Wattala | Uniix Studio",
    metaDescription:
      "E-commerce websites in Wattala. Uniix Studio builds online stores for retailers and showrooms near Colombo — with local payments, delivery and a Colombo-grade finish.",
    lede: "Online stores that turn Wattala's showrooms and retailers into round-the-clock sellers.",
    intro: [
      "Wattala is packed with showrooms and retailers sitting on strong walk-in trade — but a shop that only sells within driving distance is leaving money on the table. An online store extends your Negombo Road showroom to every customer across Colombo and Gampaha who'd rather browse and buy from their phone.",
      "Because Wattala shoppers expect a Colombo standard, we build stores that look sharp and check out fast: clear product pages, real photography, local payment gateways and delivery options, and a mobile experience that doesn't fight the customer. The result is a store that captures the 'near me' searcher and the at-home browser alike.",
    ],
    benefits: [
      {
        title: "Extend beyond walk-ins",
        body: "Sell your showroom's range to the whole Colombo–Gampaha catchment, not just the customers who can physically visit.",
      },
      {
        title: "Colombo-grade finish",
        body: "Polished design and fast checkout that meets the expectations of Wattala's affluent, comparison-shopping customers.",
      },
      {
        title: "Local payments & delivery",
        body: "Card, PayHere and cash-on-delivery with courier integrations, so checkout is effortless for local buyers.",
      },
    ],
    faqs: [
      {
        question: "Can you build an online store for my Wattala showroom?",
        answer:
          "Yes. We build e-commerce on Shopify or WooCommerce tailored to your product range, with local payment and delivery, so your showroom can sell across Colombo and Gampaha — not just to walk-ins.",
      },
      {
        question: "How do I get my Wattala store to show up on Google?",
        answer:
          "We structure product and category pages for search, connect your store to your Google Business Profile, and can layer on SEO and ads. Combined with reviews, that's what wins both the 'near me' searcher and the wider online buyer.",
      },
      {
        question: "Do you offer support after the store launches?",
        answer:
          "Yes. We hand over a store your team can run day to day, and offer ongoing support plans for updates, new products, promotions and technical maintenance whenever you want us involved.",
      },
    ],
  },
];

export function getLocationService(
  area: string,
  service: string
): LocationService | undefined {
  return locationServices.find(
    (ls) => ls.area === area && ls.service === service
  );
}

/** Combo pages available for a given location (used to cross-link). */
export function locationServicesFor(area: string): LocationService[] {
  return locationServices.filter((ls) => ls.area === area);
}
