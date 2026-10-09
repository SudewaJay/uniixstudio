import 'server-only'
import type { SanitizedServerEditorConfig } from '@payloadcms/richtext-lexical'
import { convertLexicalToMarkdown } from '@payloadcms/richtext-lexical'
import config from '@payload-config'
import type { Media } from '@/payload-types'

/* ------------------------------ relationships ------------------------------ */

/** A populated relationship (object) — skips unpopulated IDs and nulls. */
export function isDoc<T extends { id: number | string }>(value: T | number | string | null | undefined): value is T {
  return typeof value === 'object' && value !== null
}

export function docs<T extends { id: number | string }>(values: (T | number | string)[] | null | undefined): T[] {
  return (values ?? []).filter(isDoc)
}

export const str = (v: string | null | undefined): string | undefined => (v ? v : undefined)

/* ---------------------------------- images --------------------------------- */

export type ImageGroup =
  | { media?: number | Media | null; url?: string | null; alt?: string | null; caption?: string | null }
  | null
  | undefined

export type ResolvedImage = { src: string; alt: string; width?: number; height?: number; caption?: string }

type SizeName = 'thumbnail' | 'card' | 'hero' | 'og'

/**
 * Image group → { src, alt }. Uploads win over URLs; a named rendition is used
 * when it exists so cards never load originals.
 */
export function resolveImage(img: ImageGroup, size?: SizeName): ResolvedImage | undefined {
  if (!img) return undefined
  const media = isDoc(img.media ?? null) ? (img.media as Media) : undefined
  if (media?.url) {
    const rendition = size ? media.sizes?.[size] : undefined
    return {
      src: rendition?.url || media.url,
      alt: img.alt || media.alt || '',
      width: (rendition?.url ? rendition.width : media.width) ?? undefined,
      height: (rendition?.url ? rendition.height : media.height) ?? undefined,
      caption: str(img.caption) ?? str(media.caption),
    }
  }
  if (img.url) return { src: img.url, alt: img.alt || '', caption: str(img.caption) }
  return undefined
}

export const imageSrc = (img: ImageGroup, size?: SizeName) => resolveImage(img, size)?.src

/* -------------------------------- rich text -------------------------------- */

let editorConfig: SanitizedServerEditorConfig | undefined

async function getEditorConfig(): Promise<SanitizedServerEditorConfig> {
  if (!editorConfig) {
    const sanitized = await config
    editorConfig = (sanitized.editor as unknown as { editorConfig: SanitizedServerEditorConfig }).editorConfig
  }
  return editorConfig
}

/**
 * Lexical → Markdown, rendered by the site's existing ReactMarkdown pipelines
 * (heading anchors, TOC, tables). The Lexical config round-trips every
 * construct used in the content — see scripts/cms/markdown.ts.
 */
export async function richTextToMarkdown(data: unknown): Promise<string> {
  if (!data || typeof data !== 'object' || !('root' in data)) return ''
  type LexicalData = Parameters<typeof convertLexicalToMarkdown>[0]['data']
  return convertLexicalToMarkdown({ data: data as LexicalData, editorConfig: await getEditorConfig() })
}

/* ---------------------------------- misc ---------------------------------- */

export const isoDate = (v: string | null | undefined) => (v ? v.slice(0, 10) : undefined)
