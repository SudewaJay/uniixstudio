import 'server-only'
import type { Page } from '@/payload-types'
import { cmsQuery, readOpts } from './cache'
import { getPayloadClient } from './payload'
import { collectionTag, docTag } from './tags'

// Blocks can reference any of these, so any of them changing refreshes pages.
const TAGS = ['pages', 'services', 'projects', 'testimonials', 'clients', 'industries', 'process', 'faqs', 'team'].map(collectionTag)

export function getPage(slug: string): Promise<Page | undefined> {
  return cmsQuery(['pages', slug], [...TAGS, docTag('pages', slug)], async (draft) => {
    try {
      const payload = await getPayloadClient()
      const res = await payload.find({
        collection: 'pages',
        ...readOpts(draft),
        where: { slug: { equals: slug } },
        depth: 2,
        limit: 1,
      })
      return res.docs[0]
    } catch (err) {
      console.warn(`getPage(${slug}) failed:`, err)
      return undefined
    }
  })
}

export type PageSummary = { slug: string; title: string; kind: 'landing' | 'legal'; updatedAt: string; noIndex: boolean }

export function getPageSummaries(): Promise<PageSummary[]> {
  return cmsQuery(['pages', 'list'], [collectionTag('pages')], async (draft) => {
    try {
      const payload = await getPayloadClient()
      const res = await payload.find({
        collection: 'pages',
        ...readOpts(draft),
        depth: 0,
        limit: 500,
        pagination: false,
        select: { slug: true, title: true, kind: true, updatedAt: true, seo: { noIndex: true } },
      })
      return res.docs.map((p) => ({
        slug: p.slug,
        title: p.title,
        kind: p.kind === 'legal' ? 'legal' : 'landing',
        updatedAt: p.updatedAt,
        noIndex: Boolean(p.seo?.noIndex),
      }))
    } catch (err) {
      console.warn('getPageSummaries failed:', err)
      return []
    }
  })
}
