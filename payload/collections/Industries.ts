import type { CollectionConfig } from 'payload'

export const Industries: CollectionConfig = {
  slug: 'industries',
  admin: {
    group: 'Marketing',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
    },
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'accent',
      type: 'text',
      admin: { description: 'Hex color' },
    },
    {
      name: 'bgGradient',
      type: 'text',
      admin: { description: 'Tailwind class string like from-[#0f172a] to-[#1e3a8a]' },
    },
    {
      name: 'body',
      type: 'richText',
    },
    {
      name: 'caseStudies',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
    },
    {
      name: 'seo',
      type: 'group',
      fields: [
        { name: 'title', type: 'text' },
        { name: 'metaDescription', type: 'textarea' },
        { name: 'ogImage', type: 'upload', relationTo: 'media' },
      ],
    },
  ],
}
