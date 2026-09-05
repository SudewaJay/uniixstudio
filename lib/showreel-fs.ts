import "server-only";
import { allServices } from "./services-fs";
import { allProjects } from "./projects-fs";
import type { ServiceVideo } from "./services-fs";

export type ShowreelFilm = ServiceVideo & {
  /**
   * Hi-res poster frame. Resolved at build time from Vimeo's oEmbed endpoint;
   * falls back to vumbnail (ID-derived, always available, 640px) if Vimeo is
   * unreachable during the build.
   */
  poster: string;
};

/**
 * Every film declared anywhere in the content tree — services first (that's
 * where the full reel lives), then any project-only films. Deduped by ID.
 *
 * Nothing here is authored in this file: titles, clients and years all come
 * from the MDX frontmatter that already powers /showreel.
 */
function collect(): ServiceVideo[] {
  const seen = new Set<string>();
  const out: ServiceVideo[] = [];
  for (const source of [
    ...allServices.flatMap((s) => s.videos ?? []),
    ...allProjects.flatMap((p) => p.videos ?? []),
  ]) {
    if (seen.has(source.vimeoId)) continue;
    seen.add(source.vimeoId);
    out.push(source);
  }
  return out;
}

/**
 * Vimeo's CDN serves any width off the same frame via a `-d_<width>` suffix,
 * but the URL carries a content hash we can only get from the API. We fetch it
 * once at build time so the rendered HTML ships a real, optimisable URL and the
 * browser never has to talk to Vimeo just to paint the poster.
 */
async function resolvePoster(vimeoId: string): Promise<string> {
  const fallback = `https://vumbnail.com/${vimeoId}_large.jpg`;
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(
        `https://vimeo.com/${vimeoId}`,
      )}`,
      { signal: AbortSignal.timeout(5000) },
    );
    if (!res.ok) return fallback;
    const data = (await res.json()) as { thumbnail_url?: string };
    const url = data.thumbnail_url;
    if (!url) return fallback;
    // ".../<hash>-d_295x166?region=us" → ".../<hash>-d_1920"
    const base = url.split("-d_")[0];
    return base ? `${base}-d_1920` : fallback;
  } catch {
    return fallback;
  }
}

/**
 * The hero reel. The featured film (index 0) is the one that plays as the
 * background loop, so it is ordered shortest-first: a 15s film loops far more
 * tightly than a 46s one and pulls a fraction of the data.
 */
const FEATURED_FIRST = [
  "1201630679", // EcoWave Energy — Short Promo (15s)
  "1209223360", // RentMyCar.lk — AI Commercial (32s)
  "1201994565", // Ready for Christmas — AI Motion Piece (26s)
  "1201630678", // EcoWave Energy — Promotional Video (38s)
  "1201632698", // PromptLime Commercial (46s)
];

export async function getShowreelFilms(): Promise<ShowreelFilm[]> {
  const films = collect();
  const ordered = [
    ...FEATURED_FIRST.map((id) => films.find((f) => f.vimeoId === id)).filter(
      (f): f is ServiceVideo => Boolean(f),
    ),
    ...films.filter((f) => !FEATURED_FIRST.includes(f.vimeoId)),
  ];
  return Promise.all(
    ordered.map(async (f) => ({ ...f, poster: await resolvePoster(f.vimeoId) })),
  );
}
