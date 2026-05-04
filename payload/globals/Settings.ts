import type { GlobalConfig } from 'payload'

/**
 * Site-wide settings — single source of truth for brand, contact, socials, analytics.
 * Surfaced under the "Globals" group in admin nav.
 */
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  admin: {
    description: 'Brand identity, contact details, social links, and analytics IDs. Used everywhere on the site.',
    group: 'Globals',
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          description: 'How Uniix Studio identifies itself across the site, OG cards, and search results.',
          fields: [
            {
              name: 'siteName',
              type: 'text',
              defaultValue: 'Uniix Studio',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'tagline',
              type: 'text',
              admin: {
                description: 'Short positioning line. Used in nav title and footer.',
                width: '50%',
              },
            },
            {
              name: 'metaDescription',
              type: 'textarea',
              maxLength: 160,
              required: true,
              admin: {
                description: 'Default <meta description> for the homepage and pages without their own. Max 160 chars.',
              },
            },
            {
              name: 'defaultOgImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Site-wide fallback OG image (1200×630). Per-page OG can override.',
              },
            },
          ],
        },
        {
          label: 'Contact',
          description: 'How visitors reach you.',
          fields: [
            { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
            {
              name: 'whatsapp',
              type: 'text',
              admin: { description: 'Phone format, e.g., +94XXXXXXXXX', width: '50%' },
            },
            {
              name: 'whatsappLink',
              type: 'text',
              admin: { description: 'Full WhatsApp deep link, e.g., https://wa.me/94XXXXXXXXX' },
            },
            {
              name: 'location',
              type: 'text',
              defaultValue: 'Colombo, Sri Lanka',
            },
          ],
        },
        {
          label: 'Social',
          description: 'External profiles. Linked from the promo bar, footer, and Organization JSON-LD.',
          fields: [
            {
              name: 'socials',
              type: 'group',
              admin: { hideGutter: true },
              fields: [
                { name: 'instagram', type: 'text', admin: { width: '50%', description: 'Full URL' } },
                { name: 'facebook', type: 'text', admin: { width: '50%', description: 'Full URL' } },
                { name: 'linkedin', type: 'text', admin: { width: '50%', description: 'Full URL' } },
                { name: 'twitter', type: 'text', admin: { width: '50%', description: 'Full URL — used as X' } },
                { name: 'behance', type: 'text', admin: { width: '50%', description: 'Full URL' } },
                { name: 'dribbble', type: 'text', admin: { width: '50%', description: 'Full URL' } },
              ],
            },
          ],
        },
        {
          label: 'Analytics',
          description: 'Tracking and verification IDs. Set once and forget.',
          fields: [
            {
              name: 'analytics',
              type: 'group',
              admin: { hideGutter: true },
              fields: [
                {
                  name: 'gaId',
                  type: 'text',
                  admin: { description: 'Google Analytics 4 measurement ID, e.g., G-XXXXXXXXXX', width: '50%' },
                },
                {
                  name: 'clarityId',
                  type: 'text',
                  admin: { description: 'Microsoft Clarity project ID', width: '50%' },
                },
                {
                  name: 'googleSiteVerification',
                  type: 'text',
                  admin: { description: 'Search Console verification token', width: '50%' },
                },
                {
                  name: 'bingSiteVerification',
                  type: 'text',
                  admin: { description: 'Bing Webmaster verification token', width: '50%' },
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
