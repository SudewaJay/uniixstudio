/**
 * Shared Project type used by both client (WorkGrid, BlogIndex-style) and
 * server (portfolio page, detail page) components.
 *
 * MDX-driven projects live in content/projects/*.mdx. The legacy inline
 * projects array (lib/content.ts) is merged into the same shape so the
 * grid keeps rendering during the migration.
 */

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
  testimonial?: ProjectTestimonial;
  /* Design rationale block (optional, rendered when present) */
  designRationale?: string;
  colorPalette?: ColorSwatch[];
  typography?: TypeFace[];
  uiPrinciples?: DesignPrinciple[];
  motionPrinciples?: DesignPrinciple[];
  /** Long-form Markdown body from MDX. Only set for projects with a content/projects/*.mdx file. */
  body?: string;
  /** True when an MDX file exists and the detail page should be reachable. */
  hasDetail: boolean;
};
