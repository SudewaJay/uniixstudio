import type { GlobalConfig } from 'payload'

export const Nav: GlobalConfig = {
  slug: 'nav',
  label: 'Navigation',
  admin: {
    group: 'Globals',
    description: 'Top navigation links and the primary CTA button.',
  },
  access: { read: () => true },
  fields: [
    {
      name: 'items',
      type: 'array',
      fields: [
        { name: 'label', type: 'text', required: true },
        { name: 'href', type: 'text', required: true },
        { name: 'openInNewTab', type: 'checkbox', defaultValue: false },
      ],
    },
    {
      name: 'ctaLabel',
      type: 'text',
      defaultValue: "Let's talk",
      required: true,
    },
    {
      name: 'ctaHref',
      type: 'text',
      required: true,
    },
  ],
}
