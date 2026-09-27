import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { featuredField, imageField, orderField, seoField, slugField } from '../fields'
import { validateHexColor } from '../fields/validators'
import { revalidateHooks } from '../hooks/revalidate'
import { previewUrl } from '../utilities/preview'

/** Sectors served — /industries/ and /industries/<slug>/. */
export const Industries: CollectionConfig = {
  slug: 'industries',
  labels: { singular: 'Industry', plural: 'Industries' },
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'slug', 'featured', 'displayOrder'],
    preview: (doc) => previewUrl(`/industries/${doc.slug}/`),
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isAdmin },
  hooks: revalidateHooks('industries'),
  defaultSort: 'displayOrder',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'name', type: 'text', required: true },
            { name: 'description', type: 'textarea', required: true, admin: { description: 'Lede + card copy.' } },
            imageField('image', { label: 'Hero image' }),
            { name: 'body', type: 'richText', admin: { description: 'Optional long-form section.' } },
            {
              name: 'challenges',
              type: 'array',
              admin: { initCollapsed: true, description: 'Problems this sector faces (optional section).' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea' },
              ],
            },
            {
              name: 'solutions',
              type: 'array',
              admin: { initCollapsed: true, description: 'How Uniix answers them (optional section).' },
              fields: [
                { name: 'title', type: 'text', required: true },
                { name: 'body', type: 'textarea' },
              ],
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            { name: 'caseStudies', label: 'Projects', type: 'relationship', relationTo: 'projects', hasMany: true },
            { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
            { name: 'testimonials', type: 'relationship', relationTo: 'testimonials', hasMany: true },
          ],
        },
        {
          label: 'Appearance',
          fields: [
            {
              type: 'row',
              fields: [
                {
                  name: 'accent',
                  type: 'text',
                  validate: validateHexColor,
                  admin: { width: '40%', description: 'Eyebrow tint, hex.' },
                },
                {
                  name: 'bgGradient',
                  type: 'text',
                  admin: { width: '60%', description: 'Fallback gradient (Tailwind classes, developer).' },
                },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoField()] },
      ],
    },
    slugField('name'),
    featuredField(),
    orderField(),
  ],
}
