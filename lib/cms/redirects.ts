import 'server-only'
import { notFound, permanentRedirect, redirect } from 'next/navigation'
import { unstable_cache } from 'next/cache'
import { normalizePath } from '@/payload/fields/validators'
import { getPayloadClient } from './payload'
import { collectionTag } from './tags'

type RedirectRule = { to: string; permanent: boolean }

/** All enabled redirects as a path → rule map (one cached query). */
const getRedirectMap = unstable_cache(
  async (): Promise<Record<string, RedirectRule>> => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'redirects',
      overrideAccess: true, // server-side lookup; the REST API stays staff-only
      where: { enabled: { equals: true } },
      depth: 0,
      limit: 5000,
      pagination: false,
    })
    return Object.fromEntries(res.docs.map((r) => [r.from, { to: r.to, permanent: r.type === 'permanent' }]))
  },
  ['cms', 'redirects'],
  { tags: [collectionTag('redirects')], revalidate: 3600 },
)

/**
 * Call instead of notFound() on any route that can miss: applies a CMS
 * redirect for this path when one exists, otherwise renders the 404.
 */
export async function notFoundOrRedirect(path: string): Promise<never> {
  const rule = (await getRedirectMap())[normalizePath(path).split('?')[0]]
  if (rule) {
    if (rule.permanent) permanentRedirect(rule.to)
    redirect(rule.to)
  }
  notFound()
}
