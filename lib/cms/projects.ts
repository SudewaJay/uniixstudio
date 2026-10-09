import 'server-only'
import type { Project as CmsProject } from '@/payload-types'
import type { NarrativeBlock, Project } from '@/lib/projects'
import type { ServiceVideo } from '@/lib/services'
import { cmsQuery, readOpts } from './cache'
import { docs, imageSrc, isDoc, resolveImage, richTextToMarkdown, str } from './helpers'
import { getPayloadClient } from './payload'
import { collectionTag, docTag } from './tags'

const TAGS = [collectionTag('projects'), collectionTag('industries'), collectionTag('services')]

export function toVideos(videos: CmsProject['videos']): ServiceVideo[] | undefined {
  if (!videos?.length) return undefined
  return videos.map((v) => ({
    vimeoId: v.vimeoId,
    title: v.title,
    client: v.client,
    description: str(v.description),
    year: str(v.year),
    uploadDate: v.uploadDate ? v.uploadDate.slice(0, 10) : undefined,
  }))
}

function toNarrative(blocks: CmsProject['narrative']): NarrativeBlock[] | undefined {
  if (!blocks?.length) return undefined
  return blocks.map((b): NarrativeBlock => {
    const base = { eyebrow: str(b.eyebrow), headline: b.headline }
    switch (b.blockType) {
      case 'narrativeBrief':
        return {
          kind: 'brief',
          ...base,
          lead: str(b.lead),
          problems: (b.problems ?? []).map((p) => ({ title: p.title, body: p.body })),
          footnote: str(b.footnote),
        }
      case 'narrativeApproach':
        return {
          kind: 'approach',
          ...base,
          pullQuote: b.pullQuote,
          proofs: (b.proofs ?? []).map((p) => ({ claim: p.claim, evidence: p.evidence })),
        }
      case 'narrativeIa':
        return {
          kind: 'ia',
          ...base,
          lead: str(b.lead),
          quadrants: (b.quadrants ?? []).map((q) => ({
            label: q.label,
            title: q.title,
            description: q.description,
            query: q.query,
          })),
        }
      case 'narrativePillars':
        return {
          kind: 'pillars',
          ...base,
          lead: str(b.lead),
          items: (b.items ?? []).map((i) => ({ title: i.title, body: i.body })),
        }
      case 'narrativeOutcome':
        return {
          kind: 'outcome',
          ...base,
          stats: (b.stats ?? []).map((s) => ({ value: s.value, label: s.label, body: str(s.body) })),
          closing: str(b.closing),
        }
    }
  })
}

const images = (list: { image?: Parameters<typeof resolveImage>[0] }[] | null | undefined, size?: 'card' | 'hero') =>
  (list ?? []).map((g) => imageSrc(g.image, size)).filter((s): s is string => Boolean(s))

/** CMS document → the Project shape every portfolio component already renders. */
export async function toProject(doc: CmsProject): Promise<Project> {
  const cover = resolveImage(doc.coverImage, 'hero')
  const quote = doc.testimonial?.quote
  return {
    slug: doc.slug,
    title: doc.title,
    overline: doc.overline,
    year: doc.year ? String(doc.year) : '',
    feature: Boolean(doc.feature),
    headline: doc.headline,
    summary: doc.summary,
    bg: doc.bg || 'from-[#0f1014] to-[#1a1d24]',
    bigText: doc.bigText || doc.title.toUpperCase(),
    bigClass: doc.bigClass || 'font-display font-bold tracking-[-0.04em] text-white/10',
    coverImage: cover?.src ?? '',
    tags: doc.tags ?? undefined,
    audienceTier: doc.audienceTier ?? undefined,
    socialCampaign: doc.socialCampaign?.images?.length
      ? {
          title: str(doc.socialCampaign.title),
          description: str(doc.socialCampaign.description),
          images: doc.socialCampaign.images
            .map((i) => {
              const img = resolveImage(i.image, 'card')
              return img ? { src: img.src, alt: img.alt, label: str(i.label) } : null
            })
            .filter((i): i is { src: string; alt: string; label: string | undefined } => i !== null),
        }
      : undefined,
    client: str(doc.client),
    industry: str(doc.industryLabel) ?? (isDoc(doc.industry ?? null) ? (doc.industry as { name: string }).name : undefined),
    location: str(doc.location),
    services: doc.serviceTags?.length ? doc.serviceTags : undefined,
    deliverables: doc.deliverables?.length ? doc.deliverables : undefined,
    url: str(doc.liveUrl),
    problem: str(doc.problem),
    solution: str(doc.solution),
    result: str(doc.result),
    stats: doc.metrics?.length
      ? doc.metrics.map((m) => ({ label: m.label, value: `${m.prefix ?? ''}${m.value}${m.suffix ?? ''}` }))
      : undefined,
    gallery: doc.gallery?.length ? images(doc.gallery, 'hero') : undefined,
    galleryAspect: str(doc.galleryAspect),
    galleryHeading: str(doc.galleryHeading),
    socialGallery: doc.socialGallery?.length ? images(doc.socialGallery, 'card') : undefined,
    socialGalleryHeading: str(doc.socialGalleryHeading),
    testimonial:
      quote && doc.testimonial?.name
        ? { quote, name: doc.testimonial.name, role: doc.testimonial.role ?? '' }
        : undefined,
    designRationale: str(doc.designRationale),
    colorPalette: doc.colorPalette?.length
      ? doc.colorPalette.map((c) => ({ name: c.name, hex: c.hex, role: c.role }))
      : undefined,
    typography: doc.typography?.length
      ? doc.typography.map((t) => ({
          family: t.family,
          role: t.role,
          weights: str(t.weights),
          sample: str(t.sample),
          rationale: str(t.rationale),
        }))
      : undefined,
    uiPrinciples: doc.uiPrinciples?.length ? doc.uiPrinciples.map((p) => ({ title: p.title, detail: p.detail })) : undefined,
    motionPrinciples: doc.motionPrinciples?.length
      ? doc.motionPrinciples.map((p) => ({ title: p.title, detail: p.detail }))
      : undefined,
    videos: toVideos(doc.videos),
    techStack: doc.techStack?.length
      ? doc.techStack.map((t) => ({ name: t.name, category: str(t.category), url: str(t.url) }))
      : undefined,
    wireframes: doc.wireframes?.length
      ? doc.wireframes
          .map((w) => {
            const img = resolveImage(w.image, 'hero')
            return img ? { src: img.src, alt: img.alt || undefined, caption: str(w.caption) } : null
          })
          .filter((w): w is NonNullable<typeof w> => w !== null)
      : undefined,
    contentBlocks: doc.contentBlocks?.length
      ? doc.contentBlocks.map((b) => {
          const img = resolveImage(b.image, 'hero')
          return {
            heading: b.heading,
            body: b.body,
            image: img?.src,
            imageAlt: img?.alt || undefined,
            imagePosition: b.imagePosition ?? undefined,
          }
        })
      : undefined,
    narrative: toNarrative(doc.narrative),
    faqs: doc.faqs?.length ? doc.faqs.map((f) => ({ question: f.question, answer: f.answer })) : undefined,
    heroOverlay: Boolean(doc.heroOverlay),
    body: (await richTextToMarkdown(doc.body)) || undefined,
    hasDetail: doc.hasCaseStudy !== false,
    seo: doc.seo ?? undefined,
    coverAlt: cover?.alt || undefined,
    relatedSlugs: docs(doc.relatedProjects).map((p) => p.slug),
  }
}

/** Every published project, in the editor-defined order. */
export function getProjects(): Promise<Project[]> {
  return cmsQuery(['projects', 'all'], TAGS, async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'projects',
      ...readOpts(draft),
      depth: 1,
      limit: 200,
      sort: ['displayOrder', '-year'],
      pagination: false,
    })
    return Promise.all(res.docs.map(toProject))
  })
}

export function getProject(slug: string): Promise<Project | undefined> {
  return cmsQuery(['projects', 'slug', slug], [...TAGS, docTag('projects', slug)], async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'projects',
      ...readOpts(draft),
      where: { slug: { equals: slug } },
      depth: 1,
      limit: 1,
    })
    return res.docs[0] ? toProject(res.docs[0]) : undefined
  })
}

export async function getDetailedProjects(): Promise<Project[]> {
  return (await getProjects()).filter((p) => p.hasDetail)
}
