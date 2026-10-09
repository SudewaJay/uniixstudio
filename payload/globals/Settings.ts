import type { GlobalConfig } from 'payload'
import { anyone, isAdmin } from '../access'
import { imageField } from '../fields'
import { validateUrl } from '../fields/validators'
import { revalidateGlobal } from '../hooks/revalidate'

const social = (name: string, label?: string) =>
  ({ name, label, type: 'text', validate: validateUrl, admin: { width: '50%' } }) as const

/** Brand, contact details (NAP), socials and analytics IDs — used site-wide. */
export const Settings: GlobalConfig = {
  slug: 'settings',
  label: 'Site Settings',
  admin: {
    group: 'Website',
    description: 'Brand identity, contact details, social links and analytics IDs.',
  },
  access: { read: anyone, update: isAdmin },
  hooks: { afterChange: [revalidateGlobal('settings')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Brand',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'siteName', type: 'text', required: true, defaultValue: 'Uniix Studio', admin: { width: '50%' } },
                { name: 'tagline', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              name: 'metaDescription',
              label: 'Default meta description',
              type: 'textarea',
              required: true,
              maxLength: 170,
            },
            imageField('logo', { description: 'Optional. The coded logo is used when empty.' }),
            imageField('favicon', { description: 'Square PNG/SVG. The built-in icon is used when empty.' }),
            imageField('defaultOgImage', { label: 'Default social image', description: '1200×630.' }),
          ],
        },
        {
          label: 'Contact & location',
          description: 'Must match your Google Business Profile exactly (name, address, phone).',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'email', type: 'email', required: true, admin: { width: '50%' } },
                { name: 'phone', type: 'text', admin: { width: '50%', description: 'Display format, e.g. +94 74 0555 898' } },
              ],
            },
            {
              type: 'row',
              fields: [
                { name: 'whatsapp', type: 'text', admin: { width: '50%', description: 'E.164, e.g. +94740555898' } },
                {
                  name: 'whatsappLink',
                  type: 'text',
                  validate: validateUrl,
                  admin: { width: '50%', description: 'https://wa.me/94740555898' },
                },
              ],
            },
            { name: 'location', label: 'Location label', type: 'text', defaultValue: 'Colombo, Sri Lanka' },
            {
              name: 'address',
              type: 'group',
              fields: [
                { name: 'streetAddress', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'addressLocality', label: 'Town / city', type: 'text', admin: { width: '34%' } },
                    { name: 'addressRegion', label: 'Region', type: 'text', admin: { width: '33%' } },
                    { name: 'postalCode', type: 'text', admin: { width: '33%' } },
                  ],
                },
                {
                  type: 'row',
                  fields: [
                    { name: 'addressCountry', label: 'Country code', type: 'text', defaultValue: 'LK', admin: { width: '34%' } },
                    { name: 'lat', type: 'number', min: -90, max: 90, admin: { width: '33%' } },
                    { name: 'lng', type: 'number', min: -180, max: 180, admin: { width: '33%' } },
                  ],
                },
              ],
            },
            {
              name: 'businessHours',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'days', type: 'text', required: true, admin: { width: '50%', placeholder: 'Mon–Fri' } },
                    { name: 'hours', type: 'text', required: true, admin: { width: '50%', placeholder: '09:00–18:00' } },
                  ],
                },
              ],
            },
          ],
        },
        {
          label: 'Social',
          fields: [
            {
              name: 'socials',
              type: 'group',
              admin: { hideGutter: true },
              fields: [
                { type: 'row', fields: [social('instagram'), social('facebook')] },
                { type: 'row', fields: [social('linkedin', 'LinkedIn'), social('twitter', 'X / Twitter')] },
                { type: 'row', fields: [social('behance'), social('dribbble')] },
                { type: 'row', fields: [social('youtube', 'YouTube'), social('tiktok', 'TikTok')] },
              ],
            },
          ],
        },
        {
          label: 'Analytics',
          description: 'Public measurement IDs only — never paste API keys or passwords here.',
          fields: [
            {
              name: 'analytics',
              type: 'group',
              admin: { hideGutter: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'gaId', label: 'GA4 measurement ID', type: 'text', admin: { width: '50%', placeholder: 'G-XXXXXXXXXX' } },
                    { name: 'clarityId', label: 'Microsoft Clarity ID', type: 'text', admin: { width: '50%' } },
                  ],
                },
                { name: 'metaPixelId', label: 'Meta Pixel ID', type: 'text', admin: { placeholder: 'digits only' } },
                {
                  type: 'row',
                  fields: [
                    { name: 'googleSiteVerification', type: 'text', admin: { width: '50%' } },
                    { name: 'bingSiteVerification', type: 'text', admin: { width: '50%' } },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
