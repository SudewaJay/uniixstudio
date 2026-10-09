'use client'

import type { DefaultCellComponentProps } from 'payload'

type Media = { url?: string | null; sizes?: { thumbnail?: { url?: string | null } } }
type ImageValue = { media?: Media | number | string | null; url?: string | null; alt?: string | null }

/**
 * List-view thumbnail for an imageField() group (an upload OR a URL). Used by
 * a display-only `ui` column, so nothing is stored. The image field's name is
 * passed in through the column's `custom.imageField`.
 */
export function ThumbnailCell({ rowData, field }: DefaultCellComponentProps) {
  const name = (field as { admin?: { custom?: { imageField?: string } } }).admin?.custom?.imageField ?? 'coverImage'
  const value = (rowData as Record<string, unknown>)[name] as ImageValue | undefined
  const media = value?.media && typeof value.media === 'object' ? value.media : undefined
  const src = media?.sizes?.thumbnail?.url || media?.url || value?.url || undefined

  if (!src) return <span className="uniix-thumb uniix-thumb--empty" aria-label="No image" />
  // Plain <img>: admin-only thumbnail from Cloudinary, Blob or /public paths.
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="uniix-thumb" src={src} alt="" loading="lazy" decoding="async" width={56} height={40} />
}

export default ThumbnailCell
