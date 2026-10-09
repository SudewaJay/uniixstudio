import 'server-only'
import type { Where } from 'payload'
import type { BlogPost as CmsBlogPost, Pillar } from '@/payload-types'
import type { BlogPost } from '@/lib/blog-fs'
import { cmsQuery, readOpts } from './cache'
import { docs, isDoc, isoDate, resolveImage, richTextToMarkdown, str } from './helpers'
import { getPayloadClient } from './payload'
import { collectionTag, docTag } from './tags'

const TAGS = [collectionTag('blog-posts'), collectionTag('authors'), collectionTag('services')]

/** Published and not scheduled for the future. Drafts are only seen in preview. */
function liveWhere(draft: boolean, extra?: Where): Where {
  const clauses: Where[] = [...(extra ? [extra] : [])]
  if (!draft) clauses.push({ publishDate: { less_than_equal: new Date().toISOString() } })
  return clauses.length ? { and: clauses } : {}
}

async function toPost(doc: CmsBlogPost, withBody: boolean): Promise<BlogPost> {
  const author = isDoc(doc.author) ? doc.author : undefined
  const cover = resolveImage(doc.coverImage, 'hero')
  return {
    id: doc.id,
    slug: doc.slug,
    title: doc.title,
    excerpt: doc.excerpt,
    metaDescription: doc.seo?.metaDescription || doc.excerpt,
    primaryKeyword: doc.primaryKeyword || '',
    category: doc.category,
    publishDate: isoDate(doc.publishDate) ?? '',
    wordCount: doc.wordCount ?? 0,
    readTime: doc.readTime || '5 min read',
    coverImage: cover?.src ?? '',
    author: {
      name: author?.name ?? 'Uniix Studio',
      role: author?.role ?? '',
      initial: author?.initial || author?.name?.charAt(0) || 'U',
    },
    body: withBody ? await richTextToMarkdown(doc.body) : '',
    ctaBlock: doc.ctaBlock ?? '',
    isStub: false,
    faqs: doc.faqs?.length ? doc.faqs.map((f) => ({ question: f.question, answer: f.answer })) : undefined,
    layout: doc.layout === 'editorial' ? 'editorial' : undefined,
    seoTitle: str(doc.seo?.metaTitle),
    updatedDate: isoDate(doc.updatedDate),
    coverAlt: cover?.alt || undefined,
    coverCaption: cover?.caption,
    ogImage: resolveImage(doc.seo?.ogImage, 'og')?.src,
    secondaryKeywords: doc.secondaryKeywords ?? undefined,
    keyTakeaways: doc.keyTakeaways?.length ? doc.keyTakeaways : undefined,
    relatedServices: docs(doc.relatedServices)
      .map((s) => (isDoc(s.pillar) ? `${(s.pillar as Pillar).slug}/${s.slug}` : null))
      .filter((s): s is string => Boolean(s)),
    relatedPosts: docs(doc.relatedPosts).map((p) => p.slug),
    ctaHeading: str(doc.ctaHeading),
    ctaLabel: str(doc.ctaLabel),
    ctaHref: str(doc.ctaHref),
    faqSchema: Boolean(doc.faqSchema),
    tags: doc.tags ?? undefined,
    featured: Boolean(doc.featured),
    seo: doc.seo ?? undefined,
  }
}

/** Listing data (no bodies), newest first. */
export function getPosts(): Promise<BlogPost[]> {
  return cmsQuery(['blog', 'list'], TAGS, async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'blog-posts',
      ...readOpts(draft),
      where: liveWhere(draft),
      depth: 2,
      sort: '-publishDate',
      limit: 500,
      pagination: false,
      select: { body: false },
    })
    // `select` omits the body; toPost(…, false) never reads it.
    return Promise.all(res.docs.map((d) => toPost(d as CmsBlogPost, false)))
  })
}

export function getPost(slug: string): Promise<BlogPost | undefined> {
  return cmsQuery(['blog', 'slug', slug], [...TAGS, docTag('blog-posts', slug)], async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({
      collection: 'blog-posts',
      ...readOpts(draft),
      where: liveWhere(draft, { slug: { equals: slug } }),
      depth: 2,
      limit: 1,
    })
    return res.docs[0] ? toPost(res.docs[0], true) : undefined
  })
}

/** Homepage "Insights": featured posts first, then the newest. */
export async function getFeaturedPosts(limit = 3): Promise<BlogPost[]> {
  const posts = await getPosts()
  return [...posts.filter((p) => p.featured), ...posts.filter((p) => !p.featured)].slice(0, limit)
}
