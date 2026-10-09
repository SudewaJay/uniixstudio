import 'server-only'
import type { ServiceVideo } from '@/lib/services'
import { cmsQuery } from './cache'
import { getProjects } from './projects'
import { getServices } from './services'
import { collectionTag } from './tags'

export type ShowreelFilm = ServiceVideo & {
  /** Hi-res poster frame from Vimeo oEmbed; vumbnail (640px) if Vimeo is unreachable. */
  poster: string
  /** Seconds, from the same oEmbed call. Absent if Vimeo was unreachable. */
  duration?: number
}

/**
 * Vimeo's CDN serves any width off the same frame via a `-d_<width>` suffix,
 * but the URL carries a hash only the API knows. Resolved server-side and
 * cached with the films, so the browser never talks to Vimeo to paint a poster.
 */
async function resolveMeta(vimeoId: string): Promise<{ poster: string; duration?: number }> {
  const fallback = { poster: `https://vumbnail.com/${vimeoId}_large.jpg` }
  try {
    const res = await fetch(
      `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(`https://vimeo.com/${vimeoId}`)}`,
      { signal: AbortSignal.timeout(5000) },
    )
    if (!res.ok) return fallback
    const data = (await res.json()) as { thumbnail_url?: string; duration?: number }
    const base = data.thumbnail_url?.split('-d_')[0]
    return {
      poster: base ? `${base}-d_1920` : fallback.poster,
      duration: typeof data.duration === 'number' ? data.duration : undefined,
    }
  } catch {
    return fallback
  }
}

/**
 * The hero reel plays index 0 as the background loop, so it is ordered
 * shortest-first: a 15s film loops far tighter than a 46s one.
 */
const FEATURED_FIRST = [
  '1201630679', // EcoWave Energy — Short Promo (15s)
  '1209223360', // RentMyCar.lk — AI Commercial (32s)
  '1201994565', // Ready for Christmas — AI Motion Piece (26s)
  '1201630678', // EcoWave Energy — Promotional Video (38s)
  '1201632698', // PromptLime Commercial (46s)
]

/** Every film on a published service or project (services first), deduped by ID. */
export function getShowreelFilms(): Promise<ShowreelFilm[]> {
  return cmsQuery(['showreel'], [collectionTag('services'), collectionTag('projects')], async () => {
    const [services, projects] = await Promise.all([getServices(), getProjects()])
    const seen = new Set<string>()
    const films: ServiceVideo[] = []
    for (const v of [...services.flatMap((s) => s.videos ?? []), ...projects.flatMap((p) => p.videos ?? [])]) {
      if (seen.has(v.vimeoId)) continue
      seen.add(v.vimeoId)
      films.push(v)
    }
    const rank = (id: string) => (FEATURED_FIRST.includes(id) ? FEATURED_FIRST.indexOf(id) : FEATURED_FIRST.length)
    const ordered = films.map((f, i) => ({ f, i })).sort((a, b) => rank(a.f.vimeoId) - rank(b.f.vimeoId) || a.i - b.i)
    return Promise.all(ordered.map(async ({ f }) => ({ ...f, ...(await resolveMeta(f.vimeoId)) })))
  })
}
