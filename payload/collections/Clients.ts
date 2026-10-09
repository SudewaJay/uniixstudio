import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { featuredField, imageField, orderField } from '../fields'
import { validateUrl } from '../fields/validators'
import { revalidateHooks } from '../hooks/revalidate'

/** Client / brand logos for trust strips and logo clouds. */
export const Clients: CollectionConfig = {
  slug: 'clients',
  labels: { singular: 'Client', plural: 'Clients' },
  admin: {
    group: 'Portfolio',
    useAsTitle: 'name',
    listSearchableFields: ['name'],
    defaultColumns: ['name', 'featured', 'displayOrder'],
    description: 'Featured clients appear in the homepage and site logo strips.',
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isAdmin },
  hooks: revalidateHooks('clients'),
  defaultSort: 'displayOrder',
  fields: [
    { name: 'name', label: 'Company name', type: 'text', required: true },
    imageField('logo', { description: 'SVG preferred. Upload, or use a /clients/… path.' }),
    {
      type: 'row',
      fields: [
        { name: 'website', type: 'text', validate: validateUrl, admin: { width: '50%' } },
        { name: 'location', type: 'text', admin: { width: '50%' } },
      ],
    },
    { name: 'industry', type: 'relationship', relationTo: 'industries' },
    {
      name: 'wordmarkStyle',
      type: 'text',
      admin: { description: 'Developer: Tailwind classes for the text fallback when there is no logo.' },
    },
    featuredField(),
    orderField(),
  ],
}
