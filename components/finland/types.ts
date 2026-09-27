/**
 * The slice of a portfolio project the /finland page renders. Built in the
 * page from `allProjects` (content/projects/*.mdx) — components never author
 * project facts themselves.
 */
export type FiProject = {
  slug: string;
  title: string;
  client?: string;
  industry?: string;
  /** Services line, e.g. "Web Design · Development · SEO" (MDX `overline`). */
  services: string;
  headline: string;
  summary: string;
  coverImage: string;
  year: string;
  problem?: string;
  solution?: string;
  result?: string;
  stats?: { label: string; value: string }[];
};

export type FiProjects = Record<string, FiProject>;

/** First sentence of a long MDX paragraph, for compact editorial use. */
export function firstSentence(text?: string, max = 220): string | undefined {
  if (!text) return undefined;
  const m = text.match(/^(.+?[.!?])(\s|$)/);
  const s = (m ? m[1] : text).trim();
  return s.length > max ? `${s.slice(0, max).replace(/\s+\S*$/, "")}…` : s;
}

/** Short industry label — first segment of "Healthcare · Diagnostics". */
export const shortIndustry = (p?: FiProject) => p?.industry?.split("·")[0].trim();
