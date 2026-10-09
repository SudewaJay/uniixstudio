'use client'

import Link from 'next/link'
import type { DefaultCellComponentProps } from 'payload'

type Media = { url?: string | null; sizes?: { thumbnail?: { url?: string | null } } }
type ImageValue = { media?: Media | number | string | null; url?: string | null; alt?: string | null }

/**
 * List-view thumbnail for an imageField() group (an upload OR a URL). Used by
 * a display-only `ui` column, so nothing is stored. The image field's name is
 * passed in through the column's `custom.imageField`.
 *
 * Like Payload's DefaultCell, it honours `link` (when it is the first column)
 * and `onClick` (inside relationship/upload drawers), so it never swallows
 * the row's navigation.
 */
export function ThumbnailCell({ rowData, field, link, linkURL, onClick, collectionSlug, cellData }: DefaultCellComponentProps) {
  const name = (field as { admin?: { custom?: { imageField?: string } } }).admin?.custom?.imageField ?? 'coverImage'
  const value = (rowData as Record<string, unknown>)[name] as ImageValue | undefined
  const media = value?.media && typeof value.media === 'object' ? value.media : undefined
  const src = media?.sizes?.thumbnail?.url || media?.url || value?.url || undefined

  const image = src ? (
    // Plain <img>: admin-only thumbnail from Cloudinary, Blob or /public paths.
    // eslint-disable-next-line @next/next/no-img-element
    <img className="uniix-thumb" src={src} alt="" loading="lazy" decoding="async" width={56} height={40} />
  ) : (
    <span className="uniix-thumb uniix-thumb--empty" />
  )

  if (typeof onClick === 'function') {
    return (
      <button type="button" className="uniix-thumb-link" aria-label="Select" onClick={() => onClick({ cellData, collectionSlug, rowData })}>
        {image}
      </button>
    )
  }
  if (link) {
    const href = linkURL || `/admin/collections/${collectionSlug}/${encodeURIComponent(String(rowData.id))}`
    return (
      <Link className="uniix-thumb-link" href={href} prefetch={false} aria-label="Open">
        {image}
      </Link>
    )
  }
  return image
}

export default ThumbnailCell
