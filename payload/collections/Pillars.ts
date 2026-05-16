import type { CollectionConfig } from 'payload'

export const Pillars: CollectionConfig = {
  slug: 'pillars',
  admin: {
    group: 'Services',
    useAsTitle: 'label',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'select',
      options: [
        { label: 'Design', value: 'design' },
        { label: 'Technology', value: 'technology' },
        { label: 'Growth', value: 'growth' },
      ],
      unique: true,
      required: true,
    },
    {
      name: 'label',
      type: 'text',
      required: true,
    },
    {
      name: 'tagline',
      type: 'text',
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'accentColor',
      type: 'text',
      admin: {
        description: 'Hex color code (e.g. #F8C84A)',
      },
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
        { name: 'canonicalOverride', type: 'text' },
      ],
    },
  ],
}
