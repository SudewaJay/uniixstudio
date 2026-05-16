import type { CollectionConfig } from 'payload'

export const Process: CollectionConfig = {
  slug: 'process',
  admin: {
    group: 'Site sections',
    useAsTitle: 'title',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'num',
      type: 'text',
      admin: { description: '"01", "02", etc.' },
      required: true,
    },
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    {
      name: 'displayOrder',
      type: 'number',
      defaultValue: 0,
    },
  ],
}
