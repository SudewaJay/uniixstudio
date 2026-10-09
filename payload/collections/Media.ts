import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isStaff } from '../access'
import { revalidateHooks } from '../hooks/revalidate'

/**
 * Media library. Files go to Vercel Blob in production (see payload.config).
 * Sharp generates responsive WebP renditions so cards never ship originals;
 * the original is stored untouched (SVG logos stay vector).
 */
export const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    group: 'System',
    description: 'Images, video and documents. Always add alt text — it is required.',
    defaultColumns: ['filename', 'alt', 'mimeType', 'filesize', 'updatedAt'],
  },
  access: { read: anyone, create: isStaff, update: isStaff, delete: isAdmin },
  hooks: revalidateHooks('media'),
  upload: {
    mimeTypes: ['image/*', 'video/mp4', 'video/webm', 'application/pdf'],
    focalPoint: true,
    crop: true,
    adminThumbnail: 'thumbnail',
    imageSizes: [
      { name: 'thumbnail', width: 400, formatOptions: { format: 'webp', options: { quality: 75 } } },
      { name: 'card', width: 900, formatOptions: { format: 'webp', options: { quality: 80 } } },
      { name: 'hero', width: 1920, formatOptions: { format: 'webp', options: { quality: 82 } } },
      { name: 'og', width: 1200, height: 630, formatOptions: { format: 'jpeg', options: { quality: 85 } } },
    ],
  },
  fields: [
    {
      name: 'alt',
      type: 'text',
      required: true,
      admin: { description: 'What the image shows, for screen readers and search. Not a filename.' },
    },
    { name: 'caption', type: 'text' },
    { name: 'description', type: 'textarea', admin: { description: 'Internal notes: source, licence, usage rights.' } },
  ],
}
