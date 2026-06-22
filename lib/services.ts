// AUTO-GENERATED from ~/Desktop/Uniix/uniix_seo/generated_service_pages/
// Edit the source JSON and re-run scripts/ingest-content.py to update.

export type ServicePillar = "design" | "technology" | "growth";

export type ServiceProcessStep = {
  title: string;
  detail: string;
  duration?: string;
};

export type ServiceDeliverable = {
  name: string;
  description: string;
};

export type ServicePricingTier = {
  name: string;
  price: string;
  summary: string;
  includes: string[];
  highlight?: boolean;
};

export type ServiceRelatedLink = {
  label: string;
  href: string;
};

export type ServiceVideo = {
  vimeoId: string;
  title: string;
  client: string;
  description?: string;
  year?: string;
  /** ISO 8601 date — used for VideoObject.uploadDate when provided. */
  uploadDate?: string;
};

export type Service = {
  slug: string;
  pillar: ServicePillar;
  name: string;
  rawName: string;
  pageTitle: string;
  metaDescription: string;
  /** Markdown body — render with react-markdown */
  body: string;
  /**
   * Optional FAQ block (Masterplan §3.1 / §5.3).
   * When provided, the service page renders a visible FAQ section AND
   * emits FAQPage JSON-LD schema for AEO/PAA targeting.
   */
  faqs?: Array<{ question: string; answer: string }>;
  /** Hero image rendered above the body. */
  coverImage?: string;
  /** Animated step-by-step engagement process. */
  process?: ServiceProcessStep[];
  /** Grid of concrete deliverables included in the engagement. */
  deliverables?: ServiceDeliverable[];
  /** Optional pricing tiers (renders as comparison cards). */
  pricingTiers?: ServicePricingTier[];
  /** Curated internal links to blog posts / other services (topic cluster). */
  relatedReading?: ServiceRelatedLink[];
  /** Commercial videos / showreel embedded on the service page. */
  videos?: ServiceVideo[];
};

export type Pillar = {
  slug: ServicePillar;
  label: string;
  tagline: string;
  description: string;
  accent: string;
};

export const pillars: Pillar[] = [
  {
    slug: `design`,
    label: `Design`,
    tagline: `Identity that makes you unforgettable.`,
    description: `Brand systems, logos, and UI/UX work that turns first impressions into loyal customers.`,
    accent: `#F8C84A`,
  },
  {
    slug: `technology`,
    label: `Technology`,
    tagline: `Engineering that scales.`,
    description: `Performance-led websites, e-commerce, and apps built on modern stacks.`,
    accent: `#F07B20`,
  },
  {
    slug: `growth`,
    label: `Growth`,
    tagline: `Marketing that compounds.`,
    description: `SEO, content, and paid media systems that turn traffic into measurable revenue.`,
    accent: `#E8621A`,
  },
];

export const services: Service[] = [
  {
    slug: `brand-identity`,
    pillar: `design`,
    name: `Brand Identity`,
    rawName: `Brand Identity Design`,
    pageTitle: `Brand Identity Design in Sri Lanka | Uniix Studio`,
    metaDescription: `Elevate your business with professional Brand Identity Design in Sri Lanka. Uniix Studio crafts unique logos, colours, and visuals that resonate. Get a free consultation!`,
    body: `## Make Your Mark: Crafting a Brand Identity That Resonates with Sri Lankan Audiences

Your brand is more than just a logo; it's the soul of your business, the unspoken promise you make to your customers. A strong brand identity design is crucial for standing out in today's competitive landscape, especially within the vibrant and diverse Sri Lankan market. It’s about building recognition, trust, and a deep connection with your target audience.

At Uniix Studio, we specialise in creating impactful brand identity design that captures your unique story and vision. We understand the nuances of the Sri Lankan consumer and market, enabling us to develop visually stunning and strategically sound brand identities that communicate your values effectively, foster loyalty, and drive sustainable growth for your business.

## What's Included in Our Brand Identity Design Service

Our comprehensive brand identity design service ensures every visual aspect of your brand is meticulously crafted:

*   **Comprehensive Logo Design:** Primary logo, secondary variations, sub-marks, and favicons for diverse applications.
*   **Defined Color Palette:** Strategic selection of primary, secondary, and accent colours with precise CMYK, RGB, and Hex codes.
*   **Typography System:** Selection of fonts for headings, body text, and specific uses, ensuring readability and brand consistency.
*   **Brand Style Guide / Manual:** A detailed document outlining all brand elements and their correct usage across various mediums.
*   **Stationery Design:** Professionally designed business cards, letterheads, and envelopes that reinforce your brand.
*   **Social Media Brand Kit:** Customised profile pictures, cover photos, and template guidelines for a cohesive online presence.
*   **Iconography & Graphic Elements:** Development of unique icons, patterns, or graphic motifs to enhance your brand's visual language.
*   **Imagery Direction:** Guidance on photographic styles and visual aesthetics that align with your brand's personality.

## Our Brand Identity Design Process

We follow a structured and collaborative process to ensure your brand identity is perfectly tailored to your vision and goals:

1.  **Discovery & Research:** We kick off with in-depth discussions to understand your business, values, target audience, competitive landscape, and design aspirations.
2.  **Strategy & Concept Development:** Based on our insights, we develop a strategic creative brief, mood boards, and initial conceptual directions for your brand identity.
3.  **Design & Refinement:** Our designers bring the concepts to life, developing core elements like the logo,`,
  },
  {
    slug: `logo-design`,
    pillar: `design`,
    name: `Logo Design`,
    rawName: `Logo Design`,
    pageTitle: `Logo Design in Sri Lanka | Uniix Studio`,
    metaDescription: `Elevate your brand with professional Logo Design in Sri Lanka. Uniix Studio crafts unique, memorable logos that resonate with your audience. Let's create your brand's visual identity.`,
    body: `## Craft an Unforgettable Identity for Your Sri Lankan Brand

Your logo is more`,
  },
  {
    slug: `ui-ux-design`,
    pillar: `design`,
    name: `UI/UX Design`,
    rawName: `UI UX Design`,
    pageTitle: `UI UX Design in Sri Lanka | Uniix Studio`,
    metaDescription: `Elevate your digital presence with expert UI UX Design in Sri Lanka. Uniix Studio crafts intuitive, engaging experiences that drive growth. Discover your potential.`,
    body: `## Unlock Digital Growth with Intuitive & Engaging User Experiences

In today's competitive digital landscape, exceptional`,
  },
  {
    slug: `motion-graphics`,
    pillar: `design`,
    name: `Motion Graphics`,
    rawName: `Motion Graphics`,
    pageTitle: `Motion Graphics in Sri Lanka | Uniix Studio`,
    metaDescription: `Bring your brand to life with professional Motion Graphics in Sri Lanka. Uniix Studio crafts animated logos, explainers, and social video that stops the scroll. Let's animate your story.`,
    body: `## Motion That Stops the Scroll

Static design gets noticed; motion gets remembered. In a feed full of competing content, animated brand assets hold attention longer, explain complex ideas faster, and make your business feel modern and alive.

At Uniix Studio, we create motion graphics that are on-brand and built for performance — from a polished animated logo to social-first explainer videos engineered for the first three seconds where attention is won or lost.

## What's Included in Our Motion Graphics Service

*   **Animated Logo & Brand Stings:** Signature intros and outros for video, ads, and presentations.
*   **Explainer Videos:** Clear, animated storytelling that turns a complex product into an easy yes.
*   **Social Motion:** Reels, shorts, and ad creative sized and paced for each platform.
*   **Kinetic Typography:** Animated text that makes key messages land with rhythm and impact.
*   **UI & Product Motion:** Micro-animations that make your website or app feel premium.
*   **Sound & Edit:** Music, sound design, and editing that complete the experience.

## Our Motion Graphics Process

1.  **Brief & Script:** We define the goal, message, platform, and length before a single frame moves.
2.  **Storyboard & Style Frames:** We lock the look and narrative so there are no surprises in production.
3.  **Animation & Sound:** We bring the boards to life with motion, music, and sound design.
4.  **Delivery & Variants:** We export platform-ready files in every aspect ratio you need.`,
  },
  {
    slug: `packaging-design`,
    pillar: `design`,
    name: `Packaging Design`,
    rawName: `Packaging Design`,
    pageTitle: `Packaging Design in Sri Lanka | Uniix Studio`,
    metaDescription: `Make your product impossible to ignore on the shelf. Uniix Studio creates retail-ready Packaging Design in Sri Lanka — labels, boxes, and unboxing experiences that sell. Get a free consultation!`,
    body: `## Packaging That Sells Before a Word Is Read

On a crowded Sri Lankan shelf, your packaging has about three seconds to win a customer. Great packaging design is not decoration — it is your hardest-working salesperson, communicating quality, value, and personality the instant a shopper looks at it.

At Uniix Studio, we design packaging that is as practical as it is beautiful. We balance shelf impact, regulatory and print requirements, and your brand story so your product earns the pick-up — whether it sits in a Colombo supermarket, a boutique, or a customer's hands at unboxing.

## What's Included in Our Packaging Design Service

*   **Structural & Dieline Design:** Boxes, pouches, labels, and cartons built to real print and manufacturing specs.
*   **Label & Surface Design:** Front-of-pack hierarchy, ingredients, barcodes, and compliance information laid out for clarity.
*   **Retail Shelf Testing:** Mock-ups that prove how your design reads against competitors at a glance.
*   **Unboxing Experience:** Inserts, tissue, and interior print that turn delivery into a shareable moment.
*   **Print-Ready Artwork:** Final files with bleeds, spot colours, and finishes prepared for your printer.
*   **Brand Consistency:** Packaging that extends your existing identity system, not a one-off design.

## Our Packaging Design Process

1.  **Discovery & Audit:** We study your product, audience, competitors, and the shelf or channel it will live in.
2.  **Concept Development:** We present distinct directions with structure, hierarchy, and finish options.
3.  **Design & Refinement:** We refine the chosen route across every SKU and variant.
4.  **Pre-Press & Handover:** We deliver print-ready artwork and liaise with your printer to protect quality.`,
  },
  {
    slug: `print-collateral`,
    pillar: `design`,
    name: `Print & Collateral`,
    rawName: `Print & Collateral`,
    pageTitle: `Print & Collateral Design in Sri Lanka | Uniix Studio`,
    metaDescription: `Professional Print & Collateral Design in Sri Lanka. Uniix Studio designs brochures, business cards, and marketing material that feel as good as they look. Get a free consultation!`,
    body: `## Print That Feels as Good as It Looks

Digital is everywhere, but print still closes deals. A beautifully designed brochure, a business card with weight, or a pitch deck handed across the table signals a level of care that a PDF rarely matches.

At Uniix Studio, we design print and marketing collateral that extends your brand into the physical world — meticulously typeset, production-ready, and finished to feel premium in the hand.

## What's Included in Our Print & Collateral Service

*   **Business Cards & Stationery:** Cards, letterheads, and envelopes with considered stock and finishes.
*   **Brochures & Catalogues:** Multi-page layouts that guide the reader and showcase your offer.
*   **Pitch & Sales Decks:** Persuasive, on-brand documents built to win the room.
*   **Flyers & Posters:** Eye-catching campaign material for events and promotions.
*   **Large-Format & Signage:** Banners, standees, and signage prepared at the right scale and resolution.
*   **Print Production Support:** Paper, finish, and printer recommendations with press-ready files.

## Our Print & Collateral Process

1.  **Discovery & Scope:** We clarify the audience, message, and where each piece will be used.
2.  **Layout & Typesetting:** We design clean, on-brand layouts with a clear visual hierarchy.
3.  **Refinement & Proofing:** We refine copy fit, imagery, and details across every page.
4.  **Pre-Press & Handover:** We deliver print-ready artwork and support the print run end to end.`,
  },
  {
    slug: `analytics`,
    pillar: `growth`,
    name: `Analytics & Reporting`,
    rawName: `Analytics and Reporting`,
    pageTitle: `Analytics and Reporting in Sri Lanka | Uniix Studio`,
    metaDescription: `Unlock sustainable growth with expert Analytics and Reporting in Sri Lanka. Uniix Studio helps businesses make data-driven decisions for smarter strategies. Get a free consultation!`,
    body: `## Transform Your Data into Actionable Insights for Business Growth

In today's competitive Sri Lankan market, simply collecting data isn't enough. To truly thrive, businesses need to understand what that data means and how to leverage it for strategic advantage. This is where robust analytics and reporting become your most powerful tool, turning raw numbers into clear pathways for improvement and expansion.

Uniix Studio's Analytics and Reporting service empowers Sri Lankan businesses, from startups to established enterprises, to move beyond guesswork. We provide the expertise to meticulously gather, interpret, and present your critical business data, ensuring every decision you make is informed, impactful, and aligned with your growth objectives. Discover how data-driven insights can give you a significant edge.

## What's Included in Our Analytics and Reporting Service

Our comprehensive service is designed to give you a clear, actionable understanding of your performance:

*   **Google Analytics 4 (GA4) Setup & Audit:** Expert configuration or optimization of your GA4 property for accurate data collection.
*   **Custom Dashboard Creation:** Development of intuitive, real-time dashboards (e.g., Google Looker Studio) tailored to your key performance indicators (KPIs).
*   **Website Traffic & User Behavior Analysis:** In-depth examination of visitor patterns, popular pages, bounce rates, and conversion funnels.
*   **Digital Campaign Performance Reporting:** Detailed analysis of your social media, paid ad, and email marketing campaign effectiveness.
*   **Conversion Rate Optimization (CRO) Insights:** Identification of opportunities to improve website conversions, lead generation, and sales.
*   **Competitor Benchmarking & Market Trends:** Analysis of competitor performance and broader market trends relevant to your industry in Sri Lanka.
*   **Monthly/Quarterly Performance Reports:** Regular, easy-to-understand reports highlighting key metrics, trends, and progress towards goals.
*   **Actionable Recommendations:** Clear, strategic advice on how to use insights to improve marketing efforts, user experience, and overall business strategy.

## Our Analytics and Reporting Process

At Uniix Studio, we follow a structured, client-centric process to deliver maximum value:

1.  **Discovery & Goal Alignment:** We begin by understanding your business, objectives, and specific growth challenges. We identify key metrics and KPIs that matter most to you.
2.  **Tracking Setup & Data Integration:** Our team sets up or audits your analytics tools (e.g., GA4, Google Tag Manager), ensuring accurate data collection and seamless integration across your digital platforms.
3.  **Data Analysis & Insight Generation:** We meticulously collect, clean, and analyze your data, identifying trends, anomalies, and underlying user behaviors.
4.  **Reporting & Visualization:** We transform complex data into clear, concise reports and interactive dashboards, making insights easily accessible and understandable for your team.
5.  **Strategic Recommendations & Review:** We provide actionable recommendations based on our findings, followed by a dedicated session to discuss strategies and plan next steps for continuous improvement.

## Why Uniix Studio for Analytics and Reporting in Sri Lanka

Choosing the right partner for analytics and reporting in Sri Lanka is crucial for transforming data into tangible growth. Uniix Studio stands out through our blend of local market understanding and global best practices. We are committed to empowering your business with the clarity needed to make confident, data-backed decisions.

Our team comprises certified data analysts and digital strategists who are experts in the latest analytics platforms and methodologies, including GA4 and Google Looker Studio. We don't just present data; we interpret it within the context of the Sri Lankan market, providing insights that are truly relevant to your audience and competitive landscape. This deep expertise ensures you receive sophisticated analysis tailored to your unique business needs.

We believe in a transparent and collaborative process, making sure you understand the 'why' behind every insight and recommendation. Our focus is always on delivering measurable results and a clear return on investment. By partnering with Uniix Studio, you gain a dedicated team committed to helping your business achieve sustainable growth through intelligent`,
  },
  {
    slug: `content-marketing`,
    pillar: `growth`,
    name: `Content Marketing`,
    rawName: `Content Marketing`,
    pageTitle: `** Content Marketing in Sri Lanka | Uniix Studio`,
    metaDescription: `** Boost your brand's online presence with expert Content Marketing in Sri Lanka. Uniix Studio crafts compelling content strategies that drive growth. Let's connect!`,
    body: `## Transform Your Sri Lankan Business with Engaging Content that Converts

In today's dynamic digital landscape,`,
  },
  {
    slug: `ppc-advertising`,
    pillar: `growth`,
    name: `PPC Advertising`,
    rawName: `PPC Advertising`,
    pageTitle: `PPC Advertising in Sri Lanka | Uniix Studio`,
    metaDescription: `Boost your online visibility and drive immediate sales with expert PPC Advertising in Sri Lanka. Uniix Studio helps businesses grow faster. Let's talk!`,
    body: `## Unlock Immediate Growth and Reach Your Ideal Customers Online

In today's competitive digital landscape, getting your business noticed quickly is crucial. PPC (Pay-Per-Click) advertising offers a powerful solution, allowing you to place your brand directly in front of potential customers at the precise moment they are searching for products or services like yours. It's about generating instant, measurable results that fuel your business growth.

For Sri Lankan businesses, navigating the nuances of local search behaviour and market trends is key to successful online advertising. Our expert PPC advertising services are designed to cut through the noise, ensuring your investment delivers maximum impact. We craft highly targeted campaigns that drive relevant traffic, increase conversions, and provide a significant return on your advertising spend.

## What's Included in Our PPC Advertising Service

*   **Comprehensive Keyword Research:** Identifying high-value, relevant keywords specific to the Sri Lankan market and your industry.
*   **Strategic Ad Copywriting:** Crafting compelling, conversion-focused ad creatives that resonate with your target audience.
*   **Landing Page Optimization Recommendations:** Guiding you to improve your landing pages for better ad relevance and conversion rates.
*   **Multi-Platform Campaign Setup:** Expert setup and configuration across Google Ads (Search, Display, Shopping) and social media platforms (Facebook, Instagram).
*   **Proactive Bid Management & Budget Allocation:** Continuous optimization of bids and budget to maximize ROI and minimize wasted spend.
*   **Precise Audience Targeting:** Utilizing demographic, geographic, interest, and behavioural targeting to reach your ideal customer in Sri Lanka.
*   **A/B Testing & Optimization:** Ongoing testing of ad copy, headlines, and landing pages to continuously improve performance.
*   **Transparent Performance Reporting:** Regular, easy-to-understand reports detailing key metrics, progress, and actionable insights.

## Our PPC Advertising Process

1.  **Discovery & Strategy Session:** We begin by thoroughly understanding your business goals, target audience, competitive landscape, and specific objectives for PPC advertising in Sri Lanka.
2.  **Campaign Development & Setup:** Based on our strategy, we conduct in-depth keyword research, craft compelling ad copy, design audience segments, and meticulously set up your campaigns across chosen platforms.
3.  **Launch & Initial Monitoring:** Once approved, your campaigns go live. We closely monitor performance from day one, making immediate adjustments to ensure optimal initial results.
4.  **Ongoing Optimization & Refinement:** Our team continuously analyzes data, performs A/B tests, adjusts bids, refines targeting, and introduces new strategies to maximize your ROI over time.
5.  **Performance Reporting & Review:** We provide regular, detailed reports on your campaign's performance, highlighting key metrics, successes, and our strategic recommendations for future growth.

## Why Uniix Studio for PPC Advertising in Sri Lanka

At Uniix Studio, we bring a blend of local market insight and global best practices to your PPC advertising efforts. Our team consists of certified digital marketing specialists who understand the unique dynamics of the Sri Lankan consumer and competitive landscape. We don't just run ads; we craft data-driven strategies designed for your specific business context, ensuring your message reaches the right people at the right time.

Our transparent and collaborative process sets us apart. We believe in keeping you informed every step of the way, explaining our strategies, and providing clear, actionable insights from your campaign data. You'll understand where your investment is going and the tangible results it's generating, fostering a partnership built on trust and mutual growth.

Ultimately, our focus is on delivering measurable results and a strong return on your investment. We are committed to driving real business growth, whether that's increasing leads, boosting sales, or enhancing brand visibility. Choose Uniix Studio for PPC advertising that doesn't just spend your budget, but strategically invests it for sustainable success in the Sri Lankan market.

## PPC Advertising Pricing in Sri Lanka

Our PPC advertising management fees in Sri Lanka are tailored to the complexity and scale of your campaigns, ensuring fair and value-driven pricing. For small to medium-sized businesses, our management fees typically range from **LKR 25,000 to LKR 75,000 per month**, in addition to your advertising budget. Larger or more complex campaigns requiring extensive platform management and advanced strategies may range from **LKR 75,000 to LKR 150,000+ per month**. Please note that your actual advertising spend (paid directly to Google, Facebook, etc.) is separate from our management fee. We offer custom quotes after a detailed understanding of your specific business`,
  },
  {
    slug: `seo`,
    pillar: `growth`,
    name: `SEO Services`,
    rawName: `SEO Services`,
    pageTitle: `SEO Services in Sri Lanka | Uniix Studio`,
    metaDescription: `Boost your online visibility and attract more customers with expert SEO Services in Sri Lanka. Uniix Studio helps businesses rank higher. Let's grow!`,
    body: `## Unlock Your Business's Full Online Potential and Dominate Search Results in Sri Lanka

In today's competitive digital landscape`,
  },
  {
    slug: `social-media`,
    pillar: `growth`,
    name: `Social Media Management`,
    rawName: `Social Media Management`,
    pageTitle: `Social Media Management in Sri Lanka | Uniix Studio`,
    metaDescription: `Elevate your brand with expert Social Media Management in Sri Lanka. Uniix Studio crafts engaging strategies to boost your online presence and reach. Let's grow together!`,
    body: `## Transform Your Brand's Online Presence and Drive Meaningful Engagement

The digital landscape in Sri`,
  },
  {
    slug: `ecommerce`,
    pillar: `technology`,
    name: `E-Commerce`,
    rawName: `E-Commerce Development`,
    pageTitle: `E-Commerce Development in Sri Lanka | Uniix Studio`,
    metaDescription: `Boost your business online with expert E-Commerce Development in Sri Lanka. Uniix Studio builds powerful, secure, and user-friendly online stores. Start selling today!`,
    body: `## Transform Your Sri Lankan Business into an Online Sales Powerhouse

In today's competitive market,`,
  },
  {
    slug: `mobile-apps`,
    pillar: `technology`,
    name: `Mobile App Development`,
    rawName: `Mobile App Development`,
    pageTitle: `Mobile App Development in Sri Lanka | Uniix Studio`,
    metaDescription: `Unlock your business potential with expert Mobile App Development in Sri Lanka. We build powerful, user-centric apps. Get your free consultation!`,
    body: `## Empower Your Business with a Seamless Mobile Experience

In today's fast-paced digital landscape, a powerful mobile presence is no longer a luxury but a necessity for businesses in Sri Lanka. Imagine connecting with your customers directly, offering services at their fingertips, and streamlining operations—all through a beautifully designed, high-performing mobile application.

Uniix Studio specialises in crafting custom mobile app development solutions that transform your ideas into tangible, market-ready products. We understand the unique needs of Sri Lankan businesses, helping you engage local audiences, expand your reach, and drive innovation in a competitive market.

## What's Included in Our Mobile App Development Service

*   **Comprehensive Requirements Gathering:** Detailed analysis of your business goals, target audience, and desired features.
*   **Intuitive UI/UX Design:** Crafting user-centric interfaces and engaging experiences tailored to your brand.
*   **Native iOS & Android Development:** Building high-performance applications specifically for Apple and Android ecosystems.
*   **Cross-Platform Development:** Utilising frameworks like React Native or Flutter for efficient development across platforms.
*   **Robust Backend API Development:** Designing and integrating secure server-side infrastructure for data management.
*   **Rigorous Quality Assurance & Testing:** Thorough testing across devices and scenarios to ensure bug-free functionality.
*   **App Store & Google Play Store Submission:** Guiding you through the entire deployment process.
*   **Post-Launch Support & Maintenance:** Ongoing updates, bug fixes, and performance monitoring to keep your app optimal.

## Our Mobile App Development Process

1.  **Discovery & Strategy:** We begin with an in-depth consultation to understand your vision, define project scope, and outline a strategic roadmap tailored for the Sri Lankan market.
2.  **Design & Prototyping:** Our designers create wireframes, mock-ups, and interactive prototypes, ensuring the user experience is intuitive and visually appealing before development begins.
3.  **Agile Development & Iteration:** Leveraging agile methodologies, our developers build your app in sprints, allowing for continuous feedback and flexible adjustments throughout the development cycle.
4.  **Rigorous Testing & Deployment:** Every feature undergoes comprehensive testing to guarantee functionality, security, and performance. We then manage the seamless submission and launch of your app on relevant stores.
5.  **Post-Launch Optimisation & Support:** After launch, we provide ongoing support, performance monitoring, and strategic updates to ensure your app remains competitive and delivers long-term value.

## Why Uniix Studio for Mobile App Development in Sri Lanka

At Uniix Studio, our dedicated team brings a wealth of expertise in mobile app development, combining cutting-edge technology with creative design to deliver solutions that stand out. We stay abreast of the latest industry trends and local market nuances, ensuring your app is not just functional but also highly relevant and impactful for users across Sri Lanka.

Our transparent and collaborative process sets us apart. We believe in keeping you informed every step of the way, from initial concept to final launch. This client-centric approach ensures that the final product not only meets but exceeds your expectations, fostering a true partnership focused on your success.

Ultimately, we are driven by results. Uniix Studio is committed to developing mobile applications that deliver measurable value—whether it's`,
  },
  {
    slug: `web-design`,
    pillar: `technology`,
    name: `Web Design`,
    rawName: `Web Design`,
    pageTitle: `Web Design in Sri Lanka | Uniix Studio`,
    metaDescription: `Elevate your Sri Lankan business online with professional web design from Uniix Studio. We craft stunning, high-performance websites. See how we can help your brand grow!`,
    body: `## Unlock Unprecedented Growth for Your Sri Lankan Business Online

In today's digital-first economy, a professionally designed website isn't just a luxury; it's a critical asset for any Sri Lankan business aiming to thrive. Your website is often the first interaction potential customers have with your brand, making it essential to create a powerful, lasting impression that converts visitors into loyal clients.

Uniix Studio specialises in crafting bespoke web design solutions that are not only visually captivating but also strategically engineered for performance and user experience. We understand the unique market dynamics of Sri Lanka and build websites that resonate with local audiences while meeting global digital standards.

## What's Included in Our Web Design Service

*   **Custom UI/UX Design:** Tailored user interface and experience design reflecting your brand identity and ensuring intuitive navigation.
*   **Mobile-Responsive Development:** Websites meticulously optimised to look and function flawlessly across all devices, from desktops to smartphones.
*   **Content Management System (CMS) Integration:** Easy-to-use platforms like WordPress allowing you to manage your website content effortlessly.
*   **Basic SEO Optimisation:** Foundational search engine optimisation to help your website rank higher on Google and other search engines.
*   **Website Security (SSL Certificate):** Implementation of an SSL certificate to protect your site and your visitors' data, building trust.
*   **Performance Optimisation:** Techniques to ensure fast loading times, crucial for user retention and search engine rankings.
*   **Post-Launch Support & Training:** Guidance and resources to help you confidently manage your new website, plus ongoing assistance.

## Our Web Design Process

1.  **Discovery & Strategy:** We begin by deeply understanding your business goals, target audience, and competitive landscape in Sri Lanka to define a clear strategy.
2.  **Design & Prototyping:** Our creative team develops wireframes, mockups, and interactive prototypes, allowing you to visualise and refine the website's look and feel.
3.  **Development & Implementation:** Once designs are approved, our developers bring your vision to life, coding the website, integrating the CMS, and ensuring robust functionality.
4.  **Testing & Quality Assurance:** We conduct rigorous testing across various devices and browsers to ensure your website is bug-free, secure, and performs optimally before launch.
5.  **Launch & Post-Launch Support:** After your website goes live, we provide training on managing your new site and offer ongoing support to ensure its continued success and growth.

## Why Uniix Studio for Web Design in Sri Lanka

At Uniix Studio, we combine artistic flair with technical prowess to deliver web`,
  },
  {
    slug: `web-development`,
    pillar: `technology`,
    name: `Web Development`,
    rawName: `Web Development`,
    pageTitle: `Web Development in Sri Lanka | Uniix Studio`,
    metaDescription: `Elevate your business online with expert web development in Sri Lanka. Uniix Studio crafts stunning, high-performing websites tailored for growth. Discover your potential!`,
    body: `## Transform Your Business Potential with a Powerful, Custom-Built Website

In today's competitive Sri Lankan market,`,
  },
  {
    slug: `wordpress`,
    pillar: `technology`,
    name: `WordPress Development`,
    rawName: `WordPress Development`,
    pageTitle: `WordPress Development in Sri Lanka | Uniix Studio`,
    metaDescription: `Boost your online presence with expert WordPress Development in Sri Lanka. Uniix Studio crafts custom, high-performing websites. Get a free consultation!`,
    body: `## Empower Your Sri Lankan Business with a Cutting-Edge WordPress Site

In today's competitive digital landscape, a powerful online presence is non-negotiable for Sri Lankan businesses looking to thrive. WordPress, the world's most popular content management system, offers unparalleled flexibility, scalability, and ease of use, making it the ideal foundation for your digital success.

At Uniix Studio, we specialise in delivering bespoke wordpress development solutions tailored to the unique needs and aspirations of businesses across Sri Lanka. From engaging corporate websites to robust e-commerce platforms, our expertise ensures your site is not just visually stunning but also highly functional, secure, and optimised for growth in the local market.

## What's Included in Our WordPress Development Service

*   **Custom WordPress Theme Design & Development:** Unique, branded designs crafted from scratch, not just off-the-shelf templates.
*   **Responsive Mobile-First Optimization:** Websites that look and perform flawlessly on all devices, from desktops to smartphones.
*   **E-commerce Integration (WooCommerce):** Robust online stores with secure payment gateways and product management features.
*   **SEO-Friendly Structure & Setup:** Foundations built for strong search engine visibility from day one.
*   **Plugin Configuration & Customization:** Integration and tailoring of essential plugins for enhanced functionality and performance.
*   **Advanced Website Security Implementation:** Measures to protect your site from threats, including SSL certificates and firewall setup.
*   **Performance Optimization (Speed & Caching):** Ensuring fast loading times for a superior user experience and better SEO.
*   **Content Management System (CMS) Training:** Empowering you to easily update and manage your website content post-launch.

## Our WordPress Development Process

1.  **Discovery & Strategy Session:** We begin by understanding your business goals, target audience, and specific requirements to define a clear project roadmap.
2.  **Design & Wireframing:** Our designers create intuitive user experiences (UX) and visually appealing interfaces (UI) with detailed wireframes and mockups for your approval.
3.  **Development & Integration:** Our expert developers bring the design to life, coding the custom theme, integrating functionalities, and populating content.
4.  **Testing & Quality Assurance:** Rigorous testing is conducted across various devices and browsers to ensure flawless functionality, performance, and security.
5.  **Launch & Post-Launch Support:** After your approval, we strategically launch your website and provide initial support and training for seamless handover.

## Why Uniix Studio for WordPress Development in Sri Lanka

Choosing Uniix Studio means partnering with a team that deeply understands the Sri Lankan digital landscape and WordPress's capabilities. Our local expertise ensures your website resonates with your audience, incorporating cultural nuances and market trends for maximum impact. We combine creative design with technical excellence, ensuring your WordPress site is not just beautiful but also a powerful business tool.

Our process is built on transparency, collaboration, and a client-centric approach. From the initial consultation to post-launch support, you'll be involved every step of the way. We pride ourselves on clear communication, delivering projects on time and within budget, and fostering long-term relationships with our clients. Your success is our ultimate goal.`,
  },
];

export function getService(pillar: string, slug: string): Service | undefined {
  return services.find((s) => s.pillar === pillar && s.slug === slug);
}

export function getServicesForPillar(pillar: string): Service[] {
  return services.filter((s) => s.pillar === pillar);
}

export function getPillar(slug: string): Pillar | undefined {
  return pillars.find((p) => p.slug === slug);
}
