/**
 * Shared Project type used by both client (WorkGrid, BlogIndex-style) and
 * server (portfolio page, detail page) components.
 *
 * MDX-driven projects live in content/projects/*.mdx. The legacy inline
 * projects array (lib/content.ts) is merged into the same shape so the
 * grid keeps rendering during the migration.
 */

import type { ServiceVideo } from "./services";

export type ProjectStat = { label: string; value: string };

export type ProjectTestimonial = {
  quote: string;
  name: string;
  role: string;
};

export type ColorSwatch = {
  name: string;
  hex: string;
  role: string;
};

export type TypeFace = {
  family: string;
  role: "display" | "body" | "mono";
  weights?: string;
  sample?: string;
  rationale?: string;
};

export type DesignPrinciple = {
  title: string;
  detail: string;
};

export type TechItem = {
  name: string;
  category?: string;
  url?: string;
};

export type Wireframe = {
  src: string;
  caption?: string;
  alt?: string;
};

export type NarrativeBlock =
  | {
      kind: "brief";
      eyebrow?: string;
      headline: string;
      lead?: string;
      problems: Array<{ title: string; body: string }>;
      footnote?: string;
    }
  | {
      kind: "approach";
      eyebrow?: string;
      headline: string;
      pullQuote: string;
      proofs: Array<{ claim: string; evidence: string }>;
    }
  | {
      kind: "ia";
      eyebrow?: string;
      headline: string;
      lead?: string;
      quadrants: Array<{
        label: string;
        title: string;
        description: string;
        query: string;
      }>;
    }
  | {
      kind: "pillars";
      eyebrow?: string;
      headline: string;
      lead?: string;
      items: Array<{ title: string; body: string }>;
    }
  | {
      kind: "outcome";
      eyebrow?: string;
      headline: string;
      stats: Array<{ value: string; label: string; body?: string }>;
      closing?: string;
    };

export type ContentBlock = {
  heading: string;
  body: string;
  image?: string;
  imageAlt?: string;
  /** When "right", image renders on the right side at md+ breakpoints. Default "left". */
  imagePosition?: "left" | "right";
};

export type AudienceTier =
  | "enterprise"
  | "midmarket"
  | "smb"
  | "startup"
  | "nonprofit";

export type Project = {
  slug: string;
  title: string;
  overline: string;
  year: string;
  feature?: boolean;
  headline: string;
  summary: string;
  bg: string;
  bigText: string;
  bigClass: string;
  coverImage: string;
  /** Service / discipline tags rendered as pills on portfolio cards + used by the filter UI. */
  tags?: string[];
  /** Audience tier for the "Filter by Business Type" pill row. */
  audienceTier?: AudienceTier;
  /** Optional social-media campaign showcase rendered as an auto-sliding carousel on the case study page. */
  socialCampaign?: {
    title?: string;
    description?: string;
    images: Array<{ src: string; alt: string; label?: string }>;
  };
  /* Detail-page extras (optional) */
  client?: string;
  industry?: string;
  location?: string;
  services?: string[];
  deliverables?: string[];
  url?: string;
  problem?: string;
  solution?: string;
  result?: string;
  stats?: ProjectStat[];
  gallery?: string[];
  /** CSS aspect-ratio for gallery items (e.g. "4/3" landscape, "4/5" social/portrait, "1/1" square). Defaults to "4/3". */
  galleryAspect?: string;
  /** Heading for the gallery section. Defaults to "Selected views". */
  galleryHeading?: string;
  /** Optional second gallery for social/brand creatives, rendered in a square (1:1) grid. */
  socialGallery?: string[];
  /** Heading for the social gallery section. Defaults to "Social media design". */
  socialGalleryHeading?: string;
  testimonial?: ProjectTestimonial;
  /* Design rationale block (optional, rendered when present) */
  designRationale?: string;
  colorPalette?: ColorSwatch[];
  typography?: TypeFace[];
  uiPrinciples?: DesignPrinciple[];
  motionPrinciples?: DesignPrinciple[];
  /* Tech stack, wireframes, and narrative blocks (Eight25-style additions) */
  /** Vimeo videos showcased on the project (reuses the showreel VideoShowcase + VideoObject schema). */
  videos?: ServiceVideo[];
  techStack?: TechItem[];
  wireframes?: Wireframe[];
  contentBlocks?: ContentBlock[];
  /** Structured, interactive narrative — replaces the MDX body when present. */
  narrative?: NarrativeBlock[];
  /** Visible FAQ block + FAQPage JSON-LD (AEO / People-Also-Ask). */
  faqs?: Array<{ question: string; answer: string }>;
  /** Opt-in: overlay the hero title on the cover image instead of stacking them. */
  heroOverlay?: boolean;
  /** Long-form Markdown body from MDX. Only set for projects with a content/projects/*.mdx file. */
  body?: string;
  /** True when an MDX file exists and the detail page should be reachable. */
  hasDetail: boolean;
};
