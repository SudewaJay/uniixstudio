import type { CollectionConfig } from 'payload'

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    group: 'System',
    useAsTitle: 'from',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      admin: { description: 'Source URL path, e.g., /old-page' },
    },
    {
      name: 'to',
      type: 'text',
      required: true,
      admin: { description: 'Destination URL path, e.g., /new-page' },
    },
    {
      name: 'permanent',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Use 301 (Permanent) redirect instead of 302 (Temporary)' },
    },
  ],
}
