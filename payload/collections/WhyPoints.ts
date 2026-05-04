import type { CollectionConfig } from 'payload'

export const WhyPoints: CollectionConfig = {
  slug: 'why-points',
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
