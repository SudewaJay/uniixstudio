/**
 * Cinecraft Media case study content.
 *
 * Everything here is either taken from the supplied artwork (file contents,
 * colours and measurements read from the vector masters) or is clearly framed
 * as Uniix Studio's design reading of that artwork. No dates, results,
 * guidelines or client statements are invented.
 */

/** Presentation colours for the page. Not the client's colour specification. */
export const CC = {
  black: "#080808",
  charcoal: "#141414",
  soft: "#F7F6F2",
  stone: "#ECEAE3",
  white: "#FFFFFF",
  /** Interface gold for text and rules on dark surfaces. */
  gold: "#D7C28B",
  grey: "#858585",
} as const;

const base = "/portfolio/cinecraft";

/**
 * Asset map. Filenames in the client folder are inconsistent (the PNG named
 * "DARK FULL" is white artwork, the PNG named "DARK ICON" is black artwork), so
 * each entry is named by what it actually contains.
 */
export const asset = {
  /** Vector.svg — full logo, white, MEDIA in gold → white gradient. For dark grounds. */
  fullWhite: `${base}/logo-full-white.svg`,
  /** Vector-1.svg — full logo, black, MEDIA in gold → black gradient. For light grounds. */
  fullBlack: `${base}/logo-full-black.svg`,
  /** Vector-2.svg — monogram, white fill, #DDDDDD hairline. For dark grounds. */
  monoWhite: `${base}/monogram-white.svg`,
  /** Vector-3.svg — monogram, black fill, #373737 hairline. For light grounds. */
  monoBlack: `${base}/monogram-black.svg`,
  /** CCM DARK FULL.jpg — supplied presentation, white logo on black satin. */
  satinFull: `${base}/satin-full.webp`,
  /** CCM DARK ICON.jpg — supplied presentation, white monogram on black satin. */
  satinMono: `${base}/satin-monogram.webp`,
  /** CCM LIGHT FULL.jpg — supplied presentation, black logo on white. */
  paperFull: `${base}/paper-full.webp`,
  /** CCM LIGHT ICON.jpg — supplied presentation, black monogram on white. */
  paperMono: `${base}/paper-monogram.webp`,
};

/** Intrinsic aspect ratios of the vector masters, used to size boxes before load (no CLS). */
export const ratio = {
  full: "752 / 453",
  mono: "682 / 393",
};

export const projectInfo = [
  { label: "Client", value: "Cinecraft Media" },
  { label: "Industry", value: "Video production & photography" },
  { label: "Location", value: "Colombo, Sri Lanka" },
  { label: "Project", value: "Logo Design & Brand Identity" },
  { label: "Creative partner", value: "Uniix Studio" },
  { label: "Deliverables", value: "Logo variations and brand identity artwork" },
];

/**
 * About the client — taken from Cinecraft Media's own public channels
 * (cinecraftmedia.net and its Facebook page), not from Uniix Studio.
 */
export const client = {
  intro:
    "Cinecraft Media is a creative video production studio in Colombo, Sri Lanka, bringing brand stories to life, from social reels to full-scale productions. Its own line: “Crafting visuals that speak louder.”",
  services: [
    "Social media content",
    "Corporate productions",
    "Hospitality & tourism films",
    "Event coverage",
    "Aerial & FPV videography",
    "Product photography",
    "Architecture photography",
  ],
  process: ["Pre-production", "Production", "Post-production & delivery"],
  /** Projects the studio shows publicly on its own website and Facebook page. */
  work: ["Amari Colombo", "Street Burger", "The Coast"],
};

export const deliverables = [
  { name: "Full logo", detail: "Monogram, CINECRAFT wordmark and MEDIA line" },
  { name: "Standalone monogram", detail: "The interlocking mark on its own" },
  { name: "Light & dark versions", detail: "Black artwork for light grounds, white for dark" },
  { name: "Vector masters", detail: "Four SVG files, one per version" },
  { name: "Raster exports", detail: "Transparent PNGs and 2320 px JPG presentations" },
];

/** Facts read directly from the vector masters (Vector-1.svg, 752 × 453 units). */
export const measured = [
  {
    value: "2",
    label: "identical C forms",
    body: "The two Cs are the same outline, repeated 107.8 units to the right. One shape, used twice.",
  },
  {
    value: "1.74",
    label: "width-to-height ratio",
    body: "The monogram measures 431.7 × 248.4 units. The standalone icon file keeps the same proportion.",
  },
  {
    value: "3.1×",
    label: "monogram to cap height",
    body: "The monogram stands about three times the height of the CINECRAFT capitals beneath it.",
  },
  {
    value: "0.15",
    label: "units of drift",
    body: "MEDIA starts where the monogram starts: their left edges sit 0.15 units apart on a 752-unit canvas.",
  },
];

/** Section 04: the three design notes. Our reading of the artwork, not client statements. */
export const conceptNotes = [
  {
    n: "01",
    title: "The CM monogram",
    body: "Two C forms and an M interlock into one compact symbol. Where one letter passes behind the next it is cut back along the curve in front, leaving a fine channel instead of a merged blob. The result reads as layers: three shapes stacked in depth, not three letters in a row.",
    pin: { x: 40, y: 196 },
  },
  {
    n: "02",
    title: "Contrast & structure",
    body: "Heavy strokes sit against open counters. The round Cs meet the straight stems and sharp diagonals of the M, so curve and angle are always next to each other. That push and pull keeps the mark strong at a glance and gives it a clear silhouette at any size.",
    pin: { x: 368, y: 74 },
  },
  {
    n: "03",
    title: "A cinematic character",
    body: "Pure black, pure white and one restrained warm accent. Set on deep black, the mark behaves like a title card: it has light and shadow, not colour, to work with. For a studio whose work is hotel films, brand reels and aerial footage, a mark that behaves like an end card does more than a brighter palette would.",
    pin: { x: 647, y: 300 },
  },
];

/** Section 05: what each part of the anatomy explorer highlights. */
export const anatomyParts = [
  {
    id: "all",
    label: "Complete logo",
    title: "One signature, three tiers",
    body: "Monogram, wordmark and descriptor stack into a single lock-up. The monogram carries the identity; the type says who it belongs to.",
  },
  {
    id: "cs",
    label: "The two Cs",
    title: "One outline, repeated",
    body: "Both Cs share an identical outline, notch included, offset 107.8 units. On the first C the notch makes room for the second; on the second it makes room for the M. One rule, applied twice, is what creates the sense of depth.",
  },
  {
    id: "m",
    label: "The M",
    title: "Tucked into the counter",
    body: "The M’s left stem sits inside the second C, its edge trimmed to follow the C’s inner curve. The overlap reads as one gesture rather than three letters.",
  },
  {
    id: "wordmark",
    label: "CINECRAFT",
    title: "The wide anchor",
    body: "The wordmark runs the full 752-unit width of the lock-up, about 1.74 times the width of the monogram above it.",
  },
  {
    id: "media",
    label: "MEDIA",
    title: "Aligned to the mark",
    body: "MEDIA starts where the monogram starts and spans almost exactly its width, tying the bottom line back to the symbol.",
  },
] as const;

export type AnatomyPartId = (typeof anatomyParts)[number]["id"];

/** Section 06: relative heights, in source units, of each typographic tier. */
export const typeScale = [
  { label: "Monogram", units: 248.4, note: "Bold, geometric, interlocking" },
  { label: "CINECRAFT", units: 80.7, note: "Uppercase, open letter spacing" },
  { label: "MEDIA", units: 48.4, note: "Smaller, widely tracked, gold gradient" },
];

/** Section 07: colours sampled from the supplied files. */
export const sampledColours = [
  {
    name: "Black",
    hex: "#000000",
    source: "Fill of the light-background artwork (Vector-1.svg, Vector-3.svg)",
    swatch: "#000000",
  },
  {
    name: "White",
    hex: "#FFFFFF",
    source: "Fill of the dark-background artwork (Vector.svg, Vector-2.svg)",
    swatch: "#FFFFFF",
  },
  {
    name: "Gold",
    hex: "#F7DE91",
    source: "Gradient stop at the MEDIA baseline, fading to the logo colour at the cap line",
    swatch: "linear-gradient(to top, #F7DE91, #FFFFFF)",
  },
  {
    name: "Presentation black",
    hex: "≈ #0E0E0E",
    source: "Background of the satin presentation JPGs (sampled, approximate)",
    swatch: "#0E0E0E",
  },
];

/** Section 07: surfaces for the contrast switcher. `dark` picks the white artwork. */
export const surfaces = [
  { id: "black", label: "Deep black", bg: CC.black, dark: true },
  { id: "charcoal", label: "Charcoal", bg: CC.charcoal, dark: true },
  { id: "soft", label: "Soft white", bg: CC.soft, dark: false },
  { id: "stone", label: "Stone", bg: CC.stone, dark: false },
  { id: "white", label: "Pure white", bg: CC.white, dark: false },
] as const;

/** Section 08: the supplied presentation files. */
export const variations = [
  {
    group: "Primary identity",
    items: [
      {
        src: asset.satinFull,
        label: "Full logo · dark",
        ground: "Black satin",
        body: "White artwork with the gold MEDIA line. The lead presentation of the identity.",
        alt: "Cinecraft Media full logo in white with a gold MEDIA line on a black satin background, designed by Uniix Studio",
        dark: true,
      },
      {
        src: asset.paperFull,
        label: "Full logo · light",
        ground: "White",
        body: "Black artwork; MEDIA keeps its gold, now fading to black at the cap line.",
        alt: "Cinecraft Media full logo in black with a gold-to-black MEDIA line on a white background",
        dark: false,
      },
    ],
  },
  {
    group: "Standalone symbol",
    items: [
      {
        src: asset.satinMono,
        label: "Monogram · dark",
        ground: "Black satin",
        body: "The mark on its own for avatars, watermarks and tight spaces on dark media.",
        alt: "Cinecraft Media CM monogram in white on a black satin background",
        dark: true,
      },
      {
        src: asset.paperMono,
        label: "Monogram · light",
        ground: "White",
        body: "The same mark in black, with a soft hairline edge from the vector master.",
        alt: "Cinecraft Media CM monogram in black on a white background",
        dark: false,
      },
    ],
  },
];

/**
 * Concept mockups. Illustrative only: they show how the identity could live on
 * set and in a studio, and are labelled on the page as not delivered applications.
 */
export const mockups = {
  signage: {
    src: `${base}/mockup-signage.webp`,
    ratio: "1672 / 941",
    label: "Studio wall",
    body: "Dimensional lettering on a dark feature wall, with warm edge light catching the gold MEDIA line.",
    alt: "Concept mockup: Cinecraft Media logo as dimensional white and gold lettering on a dark studio reception wall",
  },
  items: [
    {
      src: `${base}/mockup-camera.webp`,
      ratio: "1536 / 1024",
      label: "On the rig",
      body: "The monogram and lock-up on a cinema camera, monitor and battery plate: the places a crew sees every day.",
      alt: "Concept mockup: Cinecraft Media logo applied to a cinema camera rig, matte box, monitor and battery",
    },
    {
      src: `${base}/mockup-clapperboard.webp`,
      ratio: "1536 / 1024",
      label: "On the slate",
      body: "The full logo on a clapperboard, the first frame of every take.",
      alt: "Concept mockup: Cinecraft Media logo printed on a black clapperboard on set",
    },
  ],
};

/** Section 10. An editorial explanation of the visible design, not a production log. */
export const approach = [
  {
    n: "01",
    title: "Exploration",
    body: "Bring the initials together into one overlapping monogram, and pair it with a wordmark that names the business in full.",
  },
  {
    n: "02",
    title: "Refinement",
    body: "Balance the letterforms against their counters, cut each overlap cleanly, and set the type so it supports the mark instead of competing with it.",
  },
  {
    n: "03",
    title: "Identity presentation",
    body: "Resolve light and dark versions of the full logo and the monogram, so the identity holds its contrast on any background.",
  },
];

export const scaleSizes = [16, 24, 32, 48, 72, 120];

export const relatedServices = [
  { name: "Logo design", href: "/services/design/logo-design/" },
  { name: "Brand identity", href: "/services/design/brand-identity/" },
  { name: "Motion graphics", href: "/services/design/motion-graphics/" },
  { name: "Social media creatives", href: "/services/design/social-media-creatives/" },
];
