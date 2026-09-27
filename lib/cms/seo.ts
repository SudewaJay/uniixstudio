import type { Metadata } from 'next'
import type { Project as CmsProject } from '@/payload-types'
import { site } from '@/lib/content'
import { ogImageMeta, ogImageUrl } from '@/lib/og-image'
import { imageSrc } from './helpers'

/** The shared SEO group (identical shape on every collection). */
export type SeoFields = NonNullable<CmsProject['seo']>

type MetaInput = {
  /** Site path, e.g. "/portfolio/foo/" — becomes the canonical URL. */
  path: string
  /** Default <title> when the editor sets no meta title. */
  title: string
  description: string
  /** Default social title when the editor sets none (defaults to title). */
  ogTitle?: string
  /** Default social image (cover image) when no SEO image is set. */
  image?: string
  seo?: SeoFields | null
  type?: 'website' | 'article'
  publishedTime?: string
  modifiedTime?: string
  /** Site default social image from Site Settings. */
  fallbackImage?: string
  /** Force noindex (e.g. drafts in preview). */
  noIndex?: boolean
}

/**
 * One metadata builder for every CMS-driven page: editor overrides first,
 * then content defaults. Canonicals are always absolute, never inherited.
 */
export function buildMetadata(input: MetaInput): Metadata {
  const seo = input.seo ?? undefined
  const title = seo?.metaTitle || input.title
  const description = seo?.metaDescription || input.description
  const canonical = seo?.canonicalURL || site.canonical(input.path)
  const image = imageSrc(seo?.ogImage, 'og') || input.image || input.fallbackImage
  const ogTitle = seo?.ogTitle || input.ogTitle || title
  const ogDescription = seo?.ogDescription || description
  const noIndex = Boolean(seo?.noIndex || input.noIndex)

  return {
    metadataBase: new URL(site.url),
    title,
    description,
    alternates: { canonical },
    robots: noIndex || seo?.noFollow ? { index: !noIndex, follow: !seo?.noFollow } : undefined,
    openGraph: {
      type: input.type ?? 'website',
      url: canonical,
      title: ogTitle,
      description: ogDescription,
      siteName: site.name,
      images: ogImageMeta(image),
      ...(input.type === 'article'
        ? { publishedTime: input.publishedTime, modifiedTime: input.modifiedTime }
        : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: seo?.twitterTitle || ogTitle,
      description: seo?.twitterDescription || ogDescription,
      images: image ? [ogImageUrl(image) as string] : undefined,
    },
  }
}
