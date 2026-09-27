import 'server-only'
import type { Pillar as CmsPillar, Service as CmsService } from '@/payload-types'
import type { Pillar, Service, ServicePillar } from '@/lib/services'
import { cmsQuery, readOpts } from './cache'
import { docs, isDoc, resolveImage, richTextToMarkdown, str } from './helpers'
import { getPayloadClient } from './payload'
import { toVideos } from './projects'
import { collectionTag, docTag } from './tags'

const PILLAR_TAGS = [collectionTag('pillars')]
const SERVICE_TAGS = [collectionTag('services'), collectionTag('pillars'), collectionTag('projects')]

function toPillar(doc: CmsPillar): Pillar {
  return {
    slug: doc.slug,
    label: doc.label,
    tagline: doc.tagline ?? '',
    description: doc.description ?? '',
    accent: doc.accentColor ?? '#F8C84A',
    num: str(doc.num),
    headline: str(doc.headline),
    positioning: str(doc.positioning),
    capabilities: (doc.capabilities ?? []).map((c) => ({ name: c.name, desc: c.description ?? '' })),
    seo: doc.seo ?? undefined,
  }
}

const pillarSlugOf = (p: CmsService['pillar']): ServicePillar | undefined =>
  isDoc(p) ? (p as CmsPillar).slug : undefined

async function toService(doc: CmsService): Promise<Service | undefined> {
  const pillar = pillarSlugOf(doc.pillar)
  if (!pillar) return undefined
  const cover = resolveImage(doc.coverImage, 'hero')
  return {
    slug: doc.slug,
    pillar,
    name: doc.name,
    rawName: doc.rawName || doc.name,
    pageTitle: doc.pageTitle,
    metaDescription: doc.seo?.metaDescription || doc.shortDescription || '',
    body: await richTextToMarkdown(doc.body),
    faqs: doc.faqs?.length ? doc.faqs.map((f) => ({ question: f.question, answer: f.answer })) : undefined,
    coverImage: cover?.src,
    coverAlt: cover?.alt || undefined,
    process: doc.process?.length
      ? doc.process.map((p) => ({ title: p.title, detail: p.detail, duration: str(p.duration) }))
      : undefined,
    deliverables: doc.deliverables?.length
      ? doc.deliverables.map((d) => ({ name: d.name, description: d.description ?? '' }))
      : undefined,
    pricingTiers: doc.pricingTiers?.length
      ? doc.pricingTiers.map((t) => ({
          name: t.name,
          price: t.price,
          summary: t.summary ?? '',
          includes: t.includes ?? [],
          highlight: Boolean(t.highlight),
        }))
      : undefined,
    relatedReading: doc.relatedReading?.length
      ? doc.relatedReading.map((r) => ({ label: r.label, href: r.href }))
      : undefined,
    videos: toVideos(doc.videos),
    shortDescription: str(doc.shortDescription),
    pricingFromLKR: doc.pricingFromLKR ?? undefined,
    primaryKeyword: str(doc.primaryKeyword),
    cta: doc.cta?.label && doc.cta?.href ? { label: doc.cta.label, href: doc.cta.href } : undefined,
    relatedServiceKeys: docs(doc.relatedServices)
      .map((s) => ({ pillar: pillarSlugOf(s.pillar), slug: s.slug }))
      .filter((s): s is { pillar: ServicePillar; slug: string } => Boolean(s.pillar)),
    relatedProjectSlugs: docs(doc.relatedProjects).map((p) => p.slug),
    seo: doc.seo ?? undefined,
  }
}

export function getPillars(): Promise<Pillar[]> {
  return cmsQuery(['pillars'], PILLAR_TAGS, async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'pillars', ...readOpts(draft), sort: 'displayOrder', limit: 20 })
    return res.docs.map(toPillar)
  })
}

export async function getPillar(slug: string): Promise<Pillar | undefined> {
  return (await getPillars()).find((p) => p.slug === slug)
}

/** All published services, pillar order then editor order. */
export function getServices(): Promise<Service[]> {
  return cmsQuery(['services', 'all'], SERVICE_TAGS, async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'services',
      ...readOpts(draft),
      depth: 1,
      sort: ['displayOrder', 'name'],
      limit: 200,
      pagination: false,
    })
    const out = await Promise.all(res.docs.map(toService))
    return out.filter((s): s is Service => Boolean(s))
  })
}

export function getService(pillar: string, slug: string): Promise<Service | undefined> {
  return cmsQuery(['services', pillar, slug], [...SERVICE_TAGS, docTag('services', slug)], async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'services',
      ...readOpts(draft),
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    })
    const doc = res.docs[0]
    const service = doc ? await toService(doc) : undefined
    return service?.pillar === pillar ? service : undefined
  })
}

export async function getServicesForPillar(pillar: string): Promise<Service[]> {
  return (await getServices()).filter((s) => s.pillar === pillar)
}
