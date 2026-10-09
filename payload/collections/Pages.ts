import type { CollectionConfig } from 'payload'
import { isAdmin, isEditor, publishedOrStaff } from '../access'
import { pageBlocks } from '../blocks'
import { seoField, slugField } from '../fields'
import { auditFields, stampAudit } from '../hooks/audit'
import { revalidateHooks } from '../hooks/revalidate'
import { draftVersions, previewUrl } from '../utilities/preview'

/**
 * Block-built pages at /<slug>/ — campaign landing pages and legal pages.
 * Routes defined in code (/services, /blog, …) always win over a page slug.
 */
export const RESERVED_SLUGS = [
  'about', 'admin', 'api', 'blog', 'contact', 'finland', 'industries', 'locations',
  'portfolio', 'services', 'showreel', 'sitemap', 'robots', 'next',
]

export const Pages: CollectionConfig = {
  slug: 'pages',
  labels: { singular: 'Landing Page', plural: 'Landing Pages' },
  admin: {
    group: 'Marketing',
    useAsTitle: 'title',
    defaultColumns: ['title', 'slug', 'kind', '_status', 'updatedAt'],
    description: 'Campaign landing pages and legal pages, built from blocks. Published at /<slug>/.',
    preview: (doc) => previewUrl(`/${doc.slug}/`),
  },
  versions: draftVersions,
  access: { read: publishedOrStaff, create: isEditor, update: isEditor, delete: isAdmin, readVersions: isEditor },
  hooks: { beforeChange: [stampAudit], ...revalidateHooks('pages') },
  fields: [
    { name: 'title', type: 'text', required: true },
    {
      name: 'layout',
      type: 'blocks',
      blocks: pageBlocks,
      minRows: 1,
      admin: { initCollapsed: false },
    },
    seoField(),
    slugField('title', {
      validate: (value: unknown) => {
        if (typeof value !== 'string' || !value) return true
        if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value)) return 'Use lowercase letters, numbers and hyphens.'
        return RESERVED_SLUGS.includes(value) ? `"${value}" is already a site section — choose another slug.` : true
      },
    }),
    {
      name: 'kind',
      type: 'select',
      defaultValue: 'landing',
      options: [
        { label: 'Landing page', value: 'landing' },
        { label: 'Legal page', value: 'legal' },
      ],
      admin: { position: 'sidebar', description: 'Legal pages get a plain reading layout and a footer link.' },
    },
    ...auditFields,
  ],
}
