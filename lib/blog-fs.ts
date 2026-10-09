/**
 * Blog post shape rendered by the blog pages. Content now comes from the CMS
 * (lib/cms/blog.ts); the MDX files in content/blog and lib/blog.ts remain the
 * migration source read by scripts/cms/seed.ts.
 */
import type { BlogPost as BaseBlogPost } from "./blog";

/**
 * Optional fields for hand-written MDX posts. All are opt-in: posts that don't
 * set them render exactly as before. `layout: "editorial"` switches the post
 * page to the long-form template (sticky contents, related services, contextual
 * CTA) — see components/blog/EditorialArticle.tsx.
 */
export type EditorialFields = {
  layout?: "editorial";
  /** <title> / OG title when the H1 is too long for a SERP title. */
  seoTitle?: string;
  /** ISO date of the last substantive revision → dateModified. */
  updatedDate?: string;
  coverAlt?: string;
  coverCaption?: string;
  /** 1200×630 JPG for social cards when the cover isn't suitable. */
  ogImage?: string;
  secondaryKeywords?: string[];
  /** Short "in brief" answers shown beside the intro. */
  keyTakeaways?: string[];
  /** Service pages to feature, as "pillar/slug" (validated at render). */
  relatedServices?: string[];
  /** Blog slugs to feature first under "Continue reading". */
  relatedPosts?: string[];
  ctaHeading?: string;
  ctaLabel?: string;
  ctaHref?: string;
  /**
   * Set false to omit FAQPage JSON-LD while still rendering the FAQ. Google
   * stopped showing FAQ rich results in May 2026, so new posts don't emit it.
   */
  faqSchema?: boolean;
};

export type BlogPost = BaseBlogPost &
  EditorialFields & {
    /* CMS-only */
    tags?: string[];
    featured?: boolean;
    seo?: import("./cms/seo").SeoFields;
  };
