import type { GlobalConfig } from 'payload'

export const PromoBar: GlobalConfig = {
  slug: 'promo-bar',
  label: 'Promo Bar',
  admin: {
    group: 'Globals',
    description: 'The thin dark bar at the very top of every page. Rotates through taglines.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'enabled',
      type: 'checkbox',
      defaultValue: false,
    },
    {
      name: 'taglines',
      type: 'array',
      fields: [
        { name: 'text', type: 'text', required: true },
      ],
    },
    {
      name: 'rotateInterval',
      type: 'number',
      defaultValue: 3800,
      admin: {
        description: 'Rotation interval in milliseconds (default: 3800)',
        step: 100,
      },
    },
  ],
}
