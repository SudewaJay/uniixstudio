import type { ArrayField, CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { faqsField, orderField, seoField, slugField } from '../fields'
import { revalidateHooks } from '../hooks/revalidate'
import { previewUrl } from '../utilities/preview'

export const paragraphs = (name: string, description?: string): ArrayField => ({
  name,
  type: 'array',
  minRows: 1,
  admin: { description },
  fields: [{ name: 'paragraph', type: 'textarea', required: true }],
})

/**
 * Service areas — /locations/<slug>/. Each is an area served from the single
 * real office (NAP in Site Settings). Copy must be genuinely local: templated
 * "doorway" pages are penalised by Google.
 */
export const Locations: CollectionConfig = {
  slug: 'locations',
  labels: { singular: 'Location', plural: 'Locations' },
  admin: {
    group: 'Local SEO',
    useAsTitle: 'name',
    listSearchableFields: ['name', 'district'],
    defaultColumns: ['name', 'district', 'displayOrder'],
    description: 'Local service-area pages. Write genuinely distinct copy for every town.',
    preview: (doc) => previewUrl(`/locations/${doc.slug}/`),
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isAdmin },
  hooks: revalidateHooks('locations'),
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
                { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
                { name: 'district', type: 'text', required: true, admin: { width: '50%' } },
              ],
            },
            { name: 'lede', type: 'textarea', required: true },
            paragraphs('intro', '2–3 paragraphs establishing real local relevance.'),
            { name: 'localAngle', type: 'textarea', required: true },
            { name: 'keyIndustries', type: 'text', hasMany: true },
            { name: 'landmarks', type: 'text', hasMany: true },
            {
              name: 'featuredServices',
              type: 'array',
              admin: { description: 'Most relevant first.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'service', type: 'relationship', relationTo: 'services', required: true, admin: { width: '50%' } },
                    { name: 'label', type: 'text', admin: { width: '50%', description: 'Defaults to the service name.' } },
                  ],
                },
              ],
            },
            { name: 'relatedPosts', type: 'relationship', relationTo: 'blog-posts', hasMany: true },
            faqsField(),
          ],
        },
        {
          label: 'Map & SEO',
          fields: [
            {
              name: 'geo',
              type: 'group',
              admin: { description: 'Town centre — used for the GeoCircle service area.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'lat', type: 'number', required: true, min: -90, max: 90, admin: { width: '50%' } },
                    { name: 'lng', type: 'number', required: true, min: -180, max: 180, admin: { width: '50%' } },
                  ],
                },
              ],
            },
            seoField(),
          ],
        },
      ],
    },
    slugField('name'),
    orderField(),
  ],
}
