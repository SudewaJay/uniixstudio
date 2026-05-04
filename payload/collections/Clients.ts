import type { CollectionConfig } from 'payload'

export const Clients: CollectionConfig = {
  slug: 'clients',
  admin: {
    group: 'Marketing',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'logoMark',
      type: 'upload',
      relationTo: 'media',
      admin: { description: 'SVG preferred' },
    },
    {
      name: 'wordmarkStyle',
      type: 'text',
      admin: { description: 'Tailwind classes, fallback if no logo' },
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
    },
    {
      name: 'featured',
      type: 'checkbox',
      defaultValue: false,
      admin: { description: 'Show on homepage trust strip' },
    },
  ],
}
