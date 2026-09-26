export type ReelFilm = {
  vimeoId: string;
  title: string;
  client: string;
  year?: string;
  poster: string;
  /** Seconds, from Vimeo oEmbed at build time. */
  duration?: number;
};

/**
 * Split a frontmatter title like "EcoWave Energy — Short Promo" into the work
 * and its format. Titles without a dash ("PromptLime Commercial") fall back to
 * the client name and a generic format — nothing here is invented.
 */
export function filmLabels(film: ReelFilm) {
  const [name, kind] = film.title.split(" — ");
  if (kind) return { name, kind };
  return {
    name: film.client,
    kind: /commercial/i.test(film.title) ? "Commercial" : "Brand film",
  };
}

export function formatDuration(s?: number) {
  if (!s) return "";
  return `${Math.floor(s / 60)}:${String(Math.round(s % 60)).padStart(2, "0")}`;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
