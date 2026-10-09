import 'server-only'
import { unstable_cache } from 'next/cache'
import { draftMode } from 'next/headers'
import { collectionTag } from './tags'

/**
 * Safety-net TTL. Content normally refreshes instantly via the revalidation
 * hooks; the hourly TTL also surfaces blog posts whose publish date passes.
 */
export const REVALIDATE_SECONDS = 3600

/** Draft mode is only ever enabled by /api/preview after a CMS login check. */
export async function isDraftMode(): Promise<boolean> {
  try {
    return (await draftMode()).isEnabled
  } catch {
    // generateStaticParams / build-time: no request scope.
    return false
  }
}

/**
 * Runs a CMS read through Next's data cache, tagged for on-demand
 * revalidation. In draft mode the cache is bypassed and drafts are included.
 */
export async function cmsQuery<T>(
  key: readonly (string | number)[],
  tags: readonly string[],
  fn: (draft: boolean) => Promise<T>,
): Promise<T> {
  if (await isDraftMode()) return fn(true)
  return unstable_cache(() => fn(false), ['cms', ...key.map(String)], {
    // Every CMS read may embed uploaded media.
    tags: [...tags, collectionTag('media')],
    revalidate: REVALIDATE_SECONDS,
  })()
}

/**
 * Local API options: drafts (staff preview) bypass access control; public
 * reads enforce the collection access rules (published documents only).
 */
export function readOpts(draft: boolean) {
  return draft ? ({ draft: true, overrideAccess: true } as const) : ({ draft: false, overrideAccess: false } as const)
}
