import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { orderField, seoField } from '../fields'
import { validateHexColor } from '../fields/validators'
import { revalidateHooks } from '../hooks/revalidate'
import { previewUrl } from '../utilities/preview'

/**
 * The three service disciplines. Their slugs are part of every service URL
 * (/services/<pillar>/<service>/), so the list is fixed; copy is editable.
 */
export const Pillars: CollectionConfig = {
  slug: 'pillars',
  labels: { singular: 'Service Pillar', plural: 'Service Pillars' },
  admin: {
    group: 'Services',
    useAsTitle: 'label',
    defaultColumns: ['label', 'slug', 'tagline', 'displayOrder'],
    description: 'Design · Technology · Growth — the hubs at /services/<pillar>/.',
    preview: (doc) => previewUrl(`/services/${doc.slug}/`),
  },
  access: { read: anyone, create: isAdmin, update: isEditor, delete: isAdmin },
  hooks: revalidateHooks('pillars'),
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
                { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
                {
                  name: 'num',
                  type: 'text',
                  admin: { width: '20%', description: '"01", "02"…' },
                },
                {
                  name: 'accentColor',
                  type: 'text',
                  validate: validateHexColor,
                  admin: { width: '40%', description: 'Hex, e.g. #F8C84A' },
                },
              ],
            },
            { name: 'tagline', type: 'text', admin: { description: 'One line on the pillar hub.' } },
            { name: 'description', type: 'textarea' },
            {
              name: 'headline',
              type: 'text',
              admin: { description: 'Homepage "Pillars" headline, e.g. "Design that moves people."' },
            },
            { name: 'positioning', type: 'textarea', admin: { description: 'Homepage "Pillars" paragraph.' } },
            {
              name: 'capabilities',
              type: 'array',
              admin: { initCollapsed: true, description: 'Capability list shown on the homepage pillar panel.' },
              fields: [
                { name: 'name', type: 'text', required: true },
                { name: 'description', type: 'textarea' },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoField()] },
      ],
    },
    {
      name: 'slug',
      type: 'select',
      required: true,
      unique: true,
      options: [
        { label: 'Design', value: 'design' },
        { label: 'Technology', value: 'technology' },
        { label: 'Growth', value: 'growth' },
      ],
      admin: { position: 'sidebar', description: 'Fixed — part of every service URL.' },
    },
    orderField(),
  ],
}
