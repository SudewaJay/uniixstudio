import type { CollectionConfig } from 'payload'
import { isAdmin, isEditor, publishedOrStaff } from '../access'
import {
  faqsField,
  featuredField,
  hrefField,
  imageField,
  orderField,
  seoField,
  slugField,
  videosField,
} from '../fields'
import { auditFields, stampAudit } from '../hooks/audit'
import { revalidateHooks } from '../hooks/revalidate'
import { draftVersions, previewUrl } from '../utilities/preview'

type PillarRef = { slug?: string } | number | string | null | undefined

/** Service detail pages — /services/<pillar>/<service>/. */
export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'pillar', 'featured', '_status', 'updatedAt'],
    listSearchableFields: ['name', 'rawName', 'pageTitle', 'slug'],
    description: 'Each service has its own page at /services/<pillar>/<service>/.',
    preview: (doc) => {
      const pillar = doc.pillar as PillarRef
      const pillarSlug = typeof pillar === 'object' && pillar ? pillar.slug : undefined
      return pillarSlug ? previewUrl(`/services/${pillarSlug}/${doc.slug}/`) : null
    },
  },
  versions: draftVersions,
  access: {
    read: publishedOrStaff,
    create: isEditor,
    update: isEditor,
    delete: isAdmin,
    readVersions: isEditor,
  },
  hooks: { beforeChange: [stampAudit], ...revalidateHooks('services') },
  defaultSort: 'displayOrder',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'name',
                  type: 'text',
                  required: true,
                  admin: { width: '50%', description: 'Short label — nav, breadcrumbs, cards.' },
                },
                {
                  name: 'rawName',
                  label: 'Full name',
                  type: 'text',
                  admin: { width: '50%', description: 'e.g. "Brand Identity Design". Defaults to Name.' },
                },
              ],
            },
            {
              name: 'pageTitle',
              label: 'Page title (browser tab & search results)',
              type: 'text',
              required: true,
              admin: {
                description: 'e.g. "Brand Identity Design in Sri Lanka | Uniix Studio". The on-page H1 is built from the Name.',
              },
            },
            {
              name: 'shortDescription',
              type: 'textarea',
              admin: { description: 'One or two sentences for cards and listings.' },
            },
            imageField('coverImage', { label: 'Hero image' }),
            {
              name: 'body',
              type: 'richText',
              required: true,
              admin: { description: 'Main page copy. Use H2s for sections.' },
            },
          ],
        },
        {
          label: 'Process & deliverables',
          fields: [
            {
              name: 'process',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'title', type: 'text', required: true, admin: { width: '70%' } },
                    { name: 'duration', type: 'text', admin: { width: '30%' } },
                  ],
                },
                { name: 'detail', type: 'textarea', required: true },
              ],
            },
            {
              name: 'deliverables',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'pricingFromLKR',
              label: 'Starting price (LKR)',
              type: 'number',
              min: 0,
              admin: { step: 10000, description: 'Optional pricing chip.' },
            },
            {
              name: 'pricingTiers',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true, admin: { width: '40%' } },
                    { name: 'price', type: 'text', required: true, admin: { width: '30%' } },
                    { name: 'highlight', type: 'checkbox', admin: { width: '30%' } },
                  ],
                },
                { name: 'summary', type: 'textarea' },
                { name: 'includes', type: 'text', hasMany: true },
              ],
            },
            faqsField(8),
          ],
        },
        {
          label: 'Media & links',
          fields: [
            videosField(),
            {
              name: 'relatedReading',
              type: 'array',
              admin: { initCollapsed: true, description: 'Curated internal links (topic cluster).' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                    hrefField('href', { required: true, admin: { width: '50%' } }),
                  ],
                },
              ],
            },
            {
              name: 'relatedServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              maxRows: 3,
              filterOptions: ({ id }) => ({ id: { not_equals: id } }),
            },
            { name: 'relatedProjects', type: 'relationship', relationTo: 'projects', hasMany: true, maxRows: 6 },
            { name: 'testimonials', type: 'relationship', relationTo: 'testimonials', hasMany: true },
            { name: 'industries', type: 'relationship', relationTo: 'industries', hasMany: true },
            {
              name: 'cta',
              label: 'Call to action',
              type: 'group',
              admin: { description: 'Defaults to "Get a free consultation" → /contact.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'label', type: 'text', admin: { width: '50%' } },
                    hrefField('href', { admin: { width: '50%' } }),
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'primaryKeyword', type: 'text' },
            seoField(),
          ],
        },
      ],
    },
    slugField('name'),
    {
      name: 'pillar',
      type: 'relationship',
      relationTo: 'pillars',
      required: true,
      admin: { position: 'sidebar', description: 'Determines the URL prefix.' },
    },
    featuredField(),
    orderField('Order within the pillar.'),
    ...auditFields,
  ],
}
