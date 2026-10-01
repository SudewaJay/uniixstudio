/** Bilesma Natural social media case study content. Everything here is read off the delivered posts. */

export const BS = {
  deep: "#1F3A2B",
  green: "#6A9670",
  leaf: "#A9D18E",
  saffron: "#5B3E8C",
  kasthuri: "#F07A2A",
  cream: "#F6F1E7",
} as const;

export type Format = "review" | "ingredients" | "benefits" | "offer" | "spotlight";
export type Corner = "tl" | "tr" | "tc";
export type Tone = "light" | "dark" | "tint";

export type Post = {
  id: string;
  src: string;
  product: string;
  format: Format;
  logo: Corner;
  tone: Tone;
  /** Which of the recurring sign-off elements this post carries. */
  has: { url: boolean; signoff: boolean; badges: boolean; seal: boolean };
  alt: string;
};

const p = (id: string) => `/portfolio/bilesma-social/${id}.webp`;
const all = { url: true, signoff: true, badges: true, seal: true };

export const posts: Post[] = [
  {
    id: "kasthuri-benefits",
    src: p("kasthuri-benefits"),
    product: "Kasthuri Care Body Lotion",
    format: "benefits",
    logo: "tr",
    tone: "light",
    has: all,
    alt: "Bilesma Natural Kasthuri Care Body Lotion benefits post: orange background, Sinhala headline, four benefit icons around the bottle",
  },
  {
    id: "rath-hadun-review",
    src: p("rath-hadun-review"),
    product: "Rath Hadun Care Body Lotion",
    format: "review",
    logo: "tr",
    tone: "light",
    has: all,
    alt: "Bilesma Natural Rath Hadun Care Body Lotion review post: Real Skin. Real Stories. Real Results. with a customer review card among palm fronds",
  },
  {
    id: "sinharaja-oil-ingredients",
    src: p("sinharaja-oil-ingredients"),
    product: "Sinharaja Hair Oil",
    format: "ingredients",
    logo: "tl",
    tone: "light",
    has: all,
    alt: "Bilesma Natural Sinharaja Hair Oil ingredients post on soft green, eight herbal ingredients named in Sinhala",
  },
  {
    id: "saffron-review",
    src: p("saffron-review"),
    product: "Saffron Face Cream",
    format: "review",
    logo: "tl",
    tone: "light",
    has: all,
    alt: "Bilesma Natural Saffron Face Cream review post: lilac background, Sinhala customer review in a speech bubble above the jar on a swing",
  },
  {
    id: "gooseberry-review",
    src: p("gooseberry-review"),
    product: "Gooseberry Touch Body Lotion",
    format: "review",
    logo: "tr",
    tone: "light",
    has: all,
    alt: "Bilesma Natural Gooseberry Touch Body Lotion review post: bottle on moss beside a hand holding a phone with a customer recommendation",
  },
  {
    id: "offer-orange",
    src: p("offer-orange"),
    product: "All products",
    format: "offer",
    logo: "tc",
    tone: "light",
    has: { url: true, signoff: false, badges: false, seal: false },
    alt: "Bilesma Natural and Mintpay offer post: up to 18% off all products in Sinhala, product range on a white podium",
  },
  {
    id: "offer-green",
    src: p("offer-green"),
    product: "All products",
    format: "offer",
    logo: "tc",
    tone: "light",
    has: { url: true, signoff: false, badges: false, seal: false },
    alt: "Bilesma Natural and Mintpay offer post: oversized green 18% off on all products over a forest scene, full range lined up on grass",
  },
  {
    id: "saffron-ingredients",
    src: p("saffron-ingredients"),
    product: "Saffron Face Cream",
    format: "ingredients",
    logo: "tl",
    tone: "light",
    has: all,
    alt: "Bilesma Natural Saffron Face Cream ingredients post with saffron flower and ten herbal ingredients named in Sinhala",
  },
  {
    id: "gooseberry-ingredients",
    src: p("gooseberry-ingredients"),
    product: "Gooseberry Touch Body Lotion",
    format: "ingredients",
    logo: "tr",
    tone: "tint",
    has: all,
    alt: "Bilesma Natural Gooseberry Touch Body Lotion ingredients post: amber background, oil splash and ingredients in bubbles",
  },
  {
    id: "wtc-offer",
    src: p("wtc-offer"),
    product: "World Trade Center pop-up",
    format: "offer",
    logo: "tl",
    tone: "light",
    has: { url: false, signoff: false, badges: false, seal: false },
    alt: "Bilesma Natural World Trade Center pop-up offer: 20% off shown on a hanging banner between the two towers",
  },
  {
    id: "matara-review",
    src: p("matara-review"),
    product: "Matara Hair Essence",
    format: "review",
    logo: "tr",
    tone: "dark",
    has: all,
    alt: "Bilesma Natural Matara Hair Essence review post: braided hair wrapped around the bottle beside a Sinhala customer review",
  },
  {
    id: "cleanser-oily-review",
    src: p("cleanser-oily-review"),
    product: "Bilesmalepa Face Cleanser, Oily Skin",
    format: "review",
    logo: "tl",
    tone: "light",
    has: all,
    alt: "Bilesma Natural Bilesmalepa Face Cleanser for oily skin review post: bottle on a mossy branch, phone showing a Sinhala review",
  },
  {
    id: "saffron-benefits",
    src: p("saffron-benefits"),
    product: "Saffron Face Cream",
    format: "benefits",
    logo: "tl",
    tone: "light",
    has: all,
    alt: "Bilesma Natural Saffron Face Cream benefits post: Saffron Glow headline in English and Sinhala, jar on a violet stage",
  },
  {
    id: "aloe-review",
    src: p("aloe-review"),
    product: "Sinharaja Aloe Vera Body Lotion",
    format: "review",
    logo: "tl",
    tone: "tint",
    has: all,
    alt: "Bilesma Natural Sinharaja Aloe Vera Body Lotion review post: bottle on an aloe leaf with an English customer review card",
  },
  {
    id: "matara-ingredients",
    src: p("matara-ingredients"),
    product: "Matara Hair Essence",
    format: "ingredients",
    logo: "tl",
    tone: "dark",
    has: all,
    alt: "Bilesma Natural Matara Hair Essence ingredients post: bottle held by a moss hand, ingredients listed in Sinhala",
  },
  {
    id: "cleanser-dry",
    src: p("cleanser-dry"),
    product: "Bilesmalepa Face Cleanser, Dry & Normal",
    format: "spotlight",
    logo: "tr",
    tone: "dark",
    has: all,
    alt: "Bilesma Natural Bilesmalepa Dry and Normal Face Cleanser spotlight: No More Dry Skin headline, bottle held in a hand on peach",
  },
  {
    id: "sinharaja-review",
    src: p("sinharaja-review"),
    product: "Sinharaja Hair Oil",
    format: "review",
    logo: "tr",
    tone: "light",
    has: all,
    alt: "Bilesma Natural Sinharaja Hair Oil for curly hair review post: bottle on a wooden swing with a customer review card",
  },
  {
    id: "curly-ingredients",
    src: p("curly-ingredients"),
    product: "Sinharaja Hair Oil",
    format: "ingredients",
    logo: "tr",
    tone: "dark",
    has: all,
    alt: "Bilesma Natural Sinharaja Hair Oil for curly hair ingredients post: Sinhala headline, ingredients in glass bubbles above moss",
  },
  {
    id: "shampoo-conditioner",
    src: p("shampoo-conditioner"),
    product: "Pure Divine Shampoo & Conditioner",
    format: "spotlight",
    logo: "tr",
    tone: "light",
    has: { url: true, signoff: true, badges: false, seal: false },
    alt: "Bilesma Natural Pure Divine anti-dandruff shampoo and conditioner spotlight with prices on a lime background",
  },
];

export const formats: Array<{ id: Format; label: string; ghost: string; formula: string }> = [
  {
    id: "review",
    label: "Reviews",
    ghost: "REVIEW",
    formula:
      "“Real Skin. Real Stories. Real Results.” over a real customer recommendation, framed as a card or a phone. Proof first, product second.",
  },
  {
    id: "ingredients",
    label: "Ingredients",
    ghost: "INGREDIENTS",
    formula:
      "The product with the herbs that go into it, each named in Sinhala. It shows the Ayurvedic story instead of claiming it.",
  },
  {
    id: "benefits",
    label: "Benefits",
    ghost: "BENEFITS",
    formula:
      "A Sinhala headline, the product dead centre and what it does for your skin in short lines, often with line icons.",
  },
  {
    id: "spotlight",
    label: "Spotlight",
    ghost: "PRODUCT",
    formula: "One product, one problem it solves, one bold headline. Used for launches and price posts.",
  },
  {
    id: "offer",
    label: "Offers",
    ghost: "OFFER",
    formula:
      "A big number, the whole range in frame, dates and T&C. Co-branded with Mintpay when the offer runs through them.",
  },
];

/** Hotspots on the anatomy post, as percentages of the 1080 × 1350 frame. */
export const anatomy = {
  postId: "kasthuri-benefits",
  zones: [
    {
      n: "01",
      title: "Logo in the top corner",
      body: "Always top, always in a corner, always opposite the headline. Here the headline runs left, so the mark sits right. It is never resized below legibility or placed over the product.",
      box: { x: 86, y: 1.5, w: 12.5, h: 12 }, pin: { x: 84.5, y: 7 },
    },
    {
      n: "02",
      title: "Sinhala-led headline",
      body: "The hook speaks the language most Bilesma customers think in. A small kicker line sits above a heavy headline, so it reads in a thumb-scroll.",
      box: { x: 3, y: 2, w: 67, h: 9.5 }, pin: { x: 72, y: 6.5 },
    },
    {
      n: "03",
      title: "The product-name tag",
      body: "A white bar with the full product name in English, every time. It anchors the Sinhala headline and makes the product searchable.",
      box: { x: 3.5, y: 11.8, w: 43, h: 3.4 }, pin: { x: 48.5, y: 13.5 },
    },
    {
      n: "04",
      title: "Product as the hero",
      body: "The real product photo, cut out cleanly and placed centre stage. Props like leaves, herbs and water support it but never cover the label.",
      box: { x: 34, y: 23.5, w: 33, h: 47 }, pin: { x: 64, y: 30 },
    },
    {
      n: "05",
      title: "Ghost type sets the format",
      body: "A huge outlined word behind the product (BENEFITS, INGREDIENTS, REVIEW) tells you what kind of post this is before you read a line.",
      box: { x: 20, y: 31, w: 60, h: 38 }, pin: { x: 24, y: 50 },
    },
    {
      n: "06",
      title: "Benefits as line icons",
      body: "Four benefits in Sinhala, each with a single-weight icon drawn in the post’s accent colour. Short enough to read at a glance.",
      box: { x: 15, y: 25, w: 20, h: 19 }, pin: { x: 16.5, y: 27 },
    },
    {
      n: "07",
      title: "Natural Product seal",
      body: "The circular seal holds the bottom-left corner, mirrored by the sign-off. On light backgrounds it switches to a dark outline.",
      box: { x: 2.5, y: 86.5, w: 13.5, h: 11.5 }, pin: { x: 16.5, y: 87.5 },
    },
    {
      n: "08",
      title: "Trust row and URL",
      body: "Paraben free, cruelty free, non toxic, eco friendly, sulfate free. Five icons in one row, with bilesmanatural.lk under them.",
      box: { x: 33.5, y: 87.5, w: 33.5, h: 11 }, pin: { x: 68.5, y: 89 },
    },
    {
      n: "09",
      title: "The sign-off",
      body: "“Pure by Nature. Proudly Sri Lankan.” closes the post in the opposite corner to the seal. Same words, same weight, every time.",
      box: { x: 76, y: 93, w: 22.5, h: 5.5 }, pin: { x: 74.5, y: 96 },
    },
  ],
};

export const constants: Array<{ key: keyof Post["has"] | "logo"; label: string; note: string }> = [
  { key: "logo", label: "Bilesma mark in a top corner", note: "Never moved off the top edge" },
  { key: "url", label: "bilesmanatural.lk", note: "Only the pop-up banner drops it" },
  { key: "signoff", label: "“Pure by Nature. Proudly Sri Lankan.”", note: "Every post that isn’t an offer" },
  { key: "badges", label: "Five-icon trust row", note: "On every product post with claims" },
  { key: "seal", label: "Natural Product seal", note: "Paired with GMP and ISO marks when relevant" },
];

export const toneInfo: Record<Tone, { label: string; swatch: string; body: string }> = {
  light: {
    label: "White mark",
    swatch: "#FFFFFF",
    body: "On saturated colour and photography: orange, violet, forest, the WTC towers.",
  },
  dark: {
    label: "Charcoal mark",
    swatch: "#1E1E1E",
    body: "On pale, airy backgrounds such as peach, mist and white hair-care scenes.",
  },
  tint: {
    label: "Tinted mark",
    swatch: "#5B4A1E",
    body: "Picked from the scene when it suits better, like brown on amber or olive on aloe.",
  },
};

export const challenge = [
  {
    title: "Ten-plus products, ten colour worlds",
    body: "Every Bilesma product has its own packaging colour: saffron violet, gooseberry green, kasthuri orange. Posts had to honour each one without the feed turning into a patchwork.",
  },
  {
    title: "Two languages in one scroll",
    body: "Customers read Sinhala first, but product names, reviews and offers often arrive in English. Both had to sit together without fighting.",
  },
  {
    title: "Trust before the sale",
    body: "Natural and Ayurvedic claims are easy to make and hard to believe. The posts needed proof: real reviews, real ingredients, real certifications.",
  },
];

export const outcomes = [
  "A post template with nine fixed zones that any designer on the account can follow",
  "Five repeatable formats: reviews, ingredients, benefits, spotlights and offers",
  "One logo rule set: top corner, opposite the headline, colour chosen for contrast",
  "A Sinhala-first voice with English product tags for search and recall",
  "Trust signals (seal, five badges, GMP and ISO marks) on every product post",
  "Product colour worlds that change post to post while the brand stays fixed",
];

export const relatedServices = [
  { name: "Social media creatives", href: "/services/design/social-media-creatives/" },
  { name: "Social media management", href: "/services/growth/social-media/" },
  { name: "Brand identity", href: "/services/design/brand-identity/" },
  { name: "Packaging case study", href: "/portfolio/bilesma-natural/" },
];
