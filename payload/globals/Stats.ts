import type { GlobalConfig } from 'payload'

export const Stats: GlobalConfig = {
  slug: 'stats',
  label: 'Stats Bar',
  admin: {
    group: 'Globals',
    description: 'The 4-column "By the numbers" section between Testimonials and Blog. Max 4 entries.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'entries',
      type: 'array',
      maxRows: 4,
      fields: [
        { name: 'value', type: 'text', required: true },
        { name: 'label', type: 'text', required: true },
        { name: 'description', type: 'textarea' },
      ],
    },
  ],
}
