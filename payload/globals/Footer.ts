import type { GlobalConfig } from 'payload'
import { anyone, isEditor } from '../access'
import { headingFields, hrefField, linksArray } from '../fields'
import { revalidateGlobal } from '../hooks/revalidate'

export const Footer: GlobalConfig = {
  slug: 'footer',
  label: 'Footer',
  admin: { group: 'Site', description: 'Footer links, call to action and legal line. Socials come from Site Settings.' },
  access: { read: anyone, update: isEditor },
  hooks: { afterChange: [revalidateGlobal('footer')] },
  fields: [
    { name: 'locationsLabel', type: 'text', defaultValue: 'Areas we serve' },
    headingFields('ctaHeading'),
    {
      type: 'row',
      fields: [
        { name: 'ctaLabel', type: 'text', admin: { width: '50%' } },
        hrefField('ctaHref', { admin: { width: '50%' } }),
      ],
    },
    { name: 'description', type: 'textarea' },
    linksArray('links', { admin: { description: 'Main footer navigation.' } }),
    {
      name: 'showLocations',
      label: 'List service areas',
      type: 'checkbox',
      defaultValue: true,
      admin: { description: 'Adds the Locations list to the footer.' },
    },
    linksArray('legalLinks', { admin: { description: 'Privacy, terms, etc.' } }),
    {
      name: 'copyright',
      type: 'text',
      admin: { description: 'Use {year} for the current year.' },
    },
  ],
}
