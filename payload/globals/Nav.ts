import type { GlobalConfig } from 'payload'
import { anyone, isEditor } from '../access'
import { hrefField } from '../fields'
import { revalidateGlobal } from '../hooks/revalidate'

export const Nav: GlobalConfig = {
  slug: 'nav',
  label: 'Navigation',
  admin: { group: 'Website', description: 'Header links (desktop and mobile) and the primary button.' },
  access: { read: anyone, update: isEditor },
  hooks: { afterChange: [revalidateGlobal('nav')] },
  fields: [
    {
      name: 'items',
      type: 'array',
      maxRows: 7,
      admin: { description: 'Keep it short — 4–5 items read best.' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
            hrefField('href', { required: true, admin: { width: '45%' } }),
            { name: 'openInNewTab', label: 'New tab', type: 'checkbox', admin: { width: '15%' } },
          ],
        },
        {
          name: 'children',
          label: 'Dropdown links',
          type: 'array',
          admin: { initCollapsed: true },
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'label', type: 'text', required: true, admin: { width: '40%' } },
                hrefField('href', { required: true, admin: { width: '60%' } }),
              ],
            },
            { name: 'description', type: 'text' },
          ],
        },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', label: 'Button label', type: 'text', required: true, defaultValue: 'Start a project', admin: { width: '50%' } },
        hrefField('ctaHref', { label: 'Button link', required: true, defaultValue: '/contact', admin: { width: '50%' } }),
      ],
    },
  ],
}
