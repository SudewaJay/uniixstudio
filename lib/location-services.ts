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
  seo?: import("./cms/seo").SeoFields;
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
  {
    area: "wattala",
    service: "web-design",
    pillar: "technology",
    serviceLabel: "Web Design",
    h1: "Web Design in Wattala",
    metaTitle: "Web Design Wattala | Websites for Local Businesses — Uniix Studio",
    metaDescription:
      "Web design in Wattala for showrooms, clinics, salons and restaurants. Uniix Studio designs fast, polished websites that win 'near me' searches and bring in visits.",
    lede: "Polished, fast websites that win the Wattala 'near me' search before the customer picks where to go.",
    intro: [
      "Most Wattala customers decide where to go from their phone, often while already on the Negombo Road. Someone searching for a clinic in Hendala, a salon in Wattala or a furniture showroom near Elakanda is choosing between the three or four businesses that look best on a small screen. Web design here is about winning that ten-second comparison.",
      "We design Wattala websites around what those customers check first: what you offer, what it costs, what it looks like, where you are and how to reach you. Real photos, clear offers, a one-tap call or WhatsApp button and a map that opens straight into directions, with a Colombo-grade finish so you don't look like the cheaper option next to a city competitor.",
    ],
    benefits: [
      {
        title: "Designed for the 'near me' moment",
        body: "Layouts built for people deciding on the move: offer, proof, location and contact above the fold on mobile.",
      },
      {
        title: "Colombo-grade polish",
        body: "Wattala customers compare you with Colombo brands. We design to that standard so your business reads as the premium choice.",
      },
      {
        title: "Aligned with Google Maps",
        body: "Name, address, phone, hours and photos kept consistent with your Google Business Profile, so the site and your Maps listing strengthen each other.",
      },
    ],
    faqs: [
      {
        question: "How much does web design cost for a Wattala business?",
        answer:
          "A focused business site for a shop, clinic or restaurant costs far less than a large catalogue or e-commerce build. We give a fixed quote after a short call about your pages, content and goals, with no hourly surprises.",
      },
      {
        question: "Can you redesign my existing Wattala website?",
        answer:
          "Yes. We audit what you have, keep the content and rankings worth keeping, and rebuild the design for speed, mobile and enquiries. Most redesigns go live in 2–4 weeks.",
      },
      {
        question: "Will my new site help me show up on Google in Wattala?",
        answer:
          "It's built to. Every site ships with clean technical SEO, location-specific content, LocalBusiness schema and fast load times. Paired with an optimised Google Business Profile and steady reviews, that's what moves you up local results.",
      },
    ],
  },
  {
    area: "wattala",
    service: "web-development",
    pillar: "technology",
    serviceLabel: "Web Development",
    h1: "Web Development in Wattala",
    metaTitle: "Web Development Wattala | Custom Websites & Web Apps — Uniix Studio",
    metaDescription:
      "Web development in Wattala. Uniix Studio builds fast custom websites, booking systems and web apps for Wattala retailers, clinics and service businesses.",
    lede: "Fast, well-engineered websites and web apps for Wattala businesses that have outgrown a template.",
    intro: [
      "Plenty of Wattala businesses start with a quick template site and hit its limits within a year: it's slow, it breaks on mobile, the booking plugin fights the theme, and nobody can update it without paying someone. Web development is about fixing that at the foundation, with a site built properly so it stays fast, secure and easy to run.",
      "We develop Wattala websites and web apps on modern, lightweight stacks: appointment booking for clinics and salons, stock-linked catalogues for showrooms, order and delivery flows for restaurants, and enquiry systems that land in the right inbox or WhatsApp. Each one is built to load quickly on mobile data and to be handed over to your own team.",
    ],
    benefits: [
      {
        title: "Built for speed",
        body: "Lean code and optimised images for fast loads on 4G, which helps both Google rankings and the customer who won't wait.",
      },
      {
        title: "Features that fit how you work",
        body: "Bookings, catalogues, order forms and integrations built around your actual workflow instead of bolted-on plugins.",
      },
      {
        title: "Secure and maintainable",
        body: "Clean, documented builds with updates and backups handled, so the site keeps working long after launch.",
      },
    ],
    faqs: [
      {
        question: "What's the difference between web design and web development?",
        answer:
          "Design is how the site looks and guides people; development is how it's built and what it can do: speed, booking systems, catalogues, integrations and security. We handle both in-house, so nothing gets lost between the two.",
      },
      {
        question: "Can you add online booking or ordering to my Wattala website?",
        answer:
          "Yes. We build appointment booking, table reservations, order forms and delivery flows, connected to email, WhatsApp or your existing tools, so customers can act without calling.",
      },
      {
        question: "Do you provide hosting and maintenance?",
        answer:
          "We can set up fast, reliable hosting and offer maintenance plans for updates, backups, security and small changes. If you'd rather manage it yourself, we hand everything over with documentation.",
      },
    ],
  },
  {
    area: "ja-ela",
    service: "web-design",
    pillar: "technology",
    serviceLabel: "Web Design",
    h1: "Web Design in Ja-Ela",
    metaTitle: "Web Design Ja-Ela | Professional Business Websites — Uniix Studio",
    metaDescription:
      "Web design in Ja-Ela for manufacturers, distributors, showrooms and SMEs. Uniix Studio designs professional websites that build trust and bring in enquiries.",
    lede: "Professional, trustworthy website design for Ja-Ela's manufacturers, traders and growing SMEs.",
    intro: [
      "A lot of Ja-Ela businesses are bigger and better than their websites suggest. A manufacturer supplying half the island, an importer with a warehouse full of stock, or a showroom that's been on the main road for twenty years can still look small online. When a new buyer, a foreign supplier or a bank checks you out, that outdated site costs you before a conversation starts.",
      "Our web design for Ja-Ela businesses closes that gap. We design clean, professional sites that present your company at its real size: clear product ranges, capability and certification pages, factory or showroom photography, client logos and an obvious route to request a quote. For retail and showrooms, we design for the customer checking you out on their phone before they drive over.",
    ],
    benefits: [
      {
        title: "Look as big as you are",
        body: "Corporate-grade design that gives a Ja-Ela SME the credibility buyers, suppliers and lenders expect from an established company.",
      },
      {
        title: "Products front and centre",
        body: "Clear product and category layouts with specs and brochures, so buyers find what they need without calling first.",
      },
      {
        title: "Enquiries that reach sales",
        body: "Quote and contact forms designed to capture the right details and land with the right person, plus WhatsApp and click-to-call.",
      },
    ],
    faqs: [
      {
        question: "How much does a website cost for a Ja-Ela business?",
        answer:
          "It depends on the number of pages and products and whether you need e-commerce. A focused company site is quite different from a large catalogue. We give a fixed quote after a short scoping call, and our Ja-Ela website cost guide covers typical ranges.",
      },
      {
        question: "Can you design a website in Sinhala and English?",
        answer:
          "Yes. We design bilingual sites with a simple language switch, so you can reach local customers in Sinhala and buyers or partners in English.",
      },
      {
        question: "Do you take the product photos and write the content?",
        answer:
          "We can. We help structure and write your page content, and can arrange product, factory or showroom photography so the site shows your business properly.",
      },
    ],
  },
  {
    area: "negombo",
    service: "web-development",
    pillar: "technology",
    serviceLabel: "Web Development",
    h1: "Web Development in Negombo",
    metaTitle: "Web Development Negombo | Booking Systems & Web Apps — Uniix Studio",
    metaDescription:
      "Web development in Negombo. Uniix Studio builds booking engines, tour-package systems and fast custom websites for Negombo hotels, tour operators and businesses.",
    lede: "Booking engines, tour systems and fast custom builds for Negombo's hospitality and travel businesses.",
    intro: [
      "Negombo businesses often need more than a brochure site. A guesthouse wants live availability without a clumsy plugin, a tour operator needs to sell packages with dates, pickups and deposits, and a dive school has to handle courses, gear hire and certifications. That's web development: making the site actually do the work your front desk does today.",
      "We build these systems to be fast and reliable for international travellers: multi-currency pricing, card deposits, automatic confirmation emails and WhatsApp handoff, plus integrations with channel managers and OTAs where needed. It's all built to load quickly on roaming data and to keep working in peak season.",
    ],
    benefits: [
      {
        title: "Direct-booking engines",
        body: "Room availability, enquiry-to-booking flows and deposits built into your own site, so fewer bookings go through commission-charging OTAs.",
      },
      {
        title: "Tour & activity systems",
        body: "Package builders with dates, pickups, group sizes and add-ons for tour operators, dive schools and watersports centres.",
      },
      {
        title: "Built for travellers",
        body: "Multi-currency, international cards, auto-confirmations and fast loads on roaming data. Built around how overseas guests book.",
      },
    ],
    faqs: [
      {
        question: "Can you connect my Negombo hotel website to a channel manager?",
        answer:
          "Yes. We integrate booking widgets or channel-manager links so availability stays in sync across your site and OTAs, while the site pushes guests toward the commission-free direct option.",
      },
      {
        question: "Can tourists pay a deposit online?",
        answer:
          "Yes. We set up gateways that take international cards, with deposits, full payments or pay-on-arrival options and automatic confirmation emails.",
      },
      {
        question: "Do you build custom systems, not just websites?",
        answer:
          "We do: booking engines, tour package builders, staff dashboards and internal tools. We scope it to how your business actually runs and build only what you'll use.",
      },
    ],
  },
  {
    area: "colombo",
    service: "web-design",
    pillar: "technology",
    serviceLabel: "Web Design",
    h1: "Web Design in Colombo",
    metaTitle: "Web Design Colombo | Websites That Convert — Uniix Studio",
    metaDescription:
      "Web design in Colombo for startups, SMEs and corporates. Uniix Studio designs fast, credible, conversion-focused websites built to stand out in a crowded market.",
    lede: "Sharp, credible, conversion-focused web design for Colombo companies in the country's toughest market.",
    intro: [
      "In Colombo, your website is being compared all the time. A prospect shortlisting consultancies, a patient choosing a clinic, a buyer looking at apartments in Colombo 5: they all open three or four tabs and close the ones that look dated, slow or vague. Good web design in Colombo is about being the tab that stays open.",
      "We design Colombo websites around clear positioning and proof. Your value is stated plainly, case studies and credentials sit near the top, pricing or next steps are obvious, and the whole experience holds up on a phone in traffic and on a laptop in a boardroom. It looks premium without big-agency overheads, and you deal directly with the people designing it.",
    ],
    benefits: [
      {
        title: "Positioning first",
        body: "We work out what makes you the obvious choice before we design a pixel, so the site sells instead of just looking good.",
      },
      {
        title: "Proof where it counts",
        body: "Case studies, client logos, reviews and credentials placed where Colombo's sceptical buyers look for them.",
      },
      {
        title: "Senior team, fair price",
        body: "Direct access to senior designers and developers, without paying for a city-centre agency's account layers.",
      },
    ],
    faqs: [
      {
        question: "How much does web design cost in Colombo?",
        answer:
          "It ranges widely: a focused company site costs a fraction of a large corporate or e-commerce build. We give a fixed quote after a short discovery call, and our 2026 website cost guide covers typical ranges in Sri Lanka.",
      },
      {
        question: "How long does a Colombo website redesign take?",
        answer:
          "Most business sites take 3–6 weeks from kickoff to launch, depending on page count and how ready your content is. We agree a timeline up front and share progress links throughout.",
      },
      {
        question: "Do you design for Colombo startups as well as established companies?",
        answer:
          "Yes. We design launch sites and product pages for startups, and redesigns for established firms that have outgrown their current site. The process scales to the stage you're at.",
      },
    ],
  },
  {
    area: "colombo",
    service: "web-development",
    pillar: "technology",
    serviceLabel: "Web Development",
    h1: "Web Development in Colombo",
    metaTitle: "Web Development Colombo | Custom Web Apps & Next.js Sites — Uniix Studio",
    metaDescription:
      "Web development in Colombo. Uniix Studio builds high-performance Next.js websites, headless CMS builds, client portals and SaaS MVPs for Colombo companies.",
    lede: "High-performance websites, web apps and MVPs engineered for Colombo companies.",
    intro: [
      "Colombo companies increasingly need more than a marketing site: a client portal for a finance firm, a booking and records system for a clinic chain, a listings platform for a property developer, or an MVP for a startup heading into its first funding round. That's where web development matters: architecture, performance, security and code your future team can maintain.",
      "We build on modern stacks like Next.js, headless CMSs and robust APIs, with a focus on speed and search performance. Sites pass Core Web Vitals, web apps are built around real user workflows, and everything ships with documentation and a clean handover. You get engineering to a Colombo standard from a lean senior team.",
    ],
    benefits: [
      {
        title: "Modern, fast stacks",
        body: "Next.js and headless CMS builds that load fast, rank well and scale, without the bloat of heavy page builders.",
      },
      {
        title: "Web apps & MVPs",
        body: "Client portals, dashboards, booking systems and SaaS MVPs scoped tightly and shipped in iterations you can test with real users.",
      },
      {
        title: "Clean handover",
        body: "Documented, version-controlled code and infrastructure your in-house or future dev team can take over with confidence.",
      },
    ],
    faqs: [
      {
        question: "Do you build SaaS products and MVPs for Colombo startups?",
        answer:
          "Yes. We help startups scope the smallest product worth launching, then design and build it with auth, payments, dashboards and admin tools, ready to put in front of users and investors.",
      },
      {
        question: "Can you integrate with our existing systems?",
        answer:
          "We regularly integrate with CRMs, ERPs, payment gateways (PayHere, Stripe, bank IPGs), booking platforms and internal APIs, so the website becomes part of how the business runs.",
      },
      {
        question: "Which technology do you use?",
        answer:
          "Mostly Next.js and React with a headless CMS, or WordPress when your team needs a familiar editor. We recommend the stack based on your content, integrations and who will maintain it.",
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
