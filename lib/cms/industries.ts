import 'server-only'
import type { Industry as CmsIndustry, Pillar } from '@/payload-types'
import type { Industry } from '@/lib/industries'
import { cmsQuery, readOpts } from './cache'
import { docs, isDoc, resolveImage, richTextToMarkdown } from './helpers'
import { getPayloadClient } from './payload'
import { collectionTag } from './tags'

const TAGS = [collectionTag('industries'), collectionTag('projects'), collectionTag('services')]

async function toIndustry(doc: CmsIndustry): Promise<Industry> {
  const image = resolveImage(doc.image, 'card')
  return {
    slug: doc.slug,
    name: doc.name,
    description: doc.description,
    image: image?.src ?? '',
    imageAlt: image?.alt || undefined,
    accent: doc.accent || '#F8C84A',
    bg: doc.bgGradient || 'from-[#1c1917] to-[#44403c]',
    body: (await richTextToMarkdown(doc.body)) || undefined,
    challenges: (doc.challenges ?? []).map((c) => ({ title: c.title, body: c.body ?? '' })),
    solutions: (doc.solutions ?? []).map((c) => ({ title: c.title, body: c.body ?? '' })),
    projectSlugs: docs(doc.caseStudies).map((p) => p.slug),
    serviceLinks: docs(doc.services)
      .filter((s) => isDoc(s.pillar))
      .map((s) => ({ label: s.name, href: `/services/${(s.pillar as Pillar).slug}/${s.slug}/` })),
    seo: doc.seo ?? undefined,
  }
}

export function getIndustries(): Promise<Industry[]> {
  return cmsQuery(['industries'], TAGS, async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'industries',
      ...readOpts(draft),
      depth: 2,
      sort: 'displayOrder',
      limit: 100,
    })
    return Promise.all(res.docs.map(toIndustry))
  })
}

export async function getIndustry(slug: string): Promise<Industry | undefined> {
  return (await getIndustries()).find((i) => i.slug === slug)
}
