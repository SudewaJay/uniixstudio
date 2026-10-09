import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { imageField, slugField } from '../fields'
import { validateUrl } from '../fields/validators'
import { revalidateHooks } from '../hooks/revalidate'

/** Public bylines for blog posts (separate from CMS user accounts). */
export const Authors: CollectionConfig = {
  slug: 'authors',
  labels: { singular: 'Author', plural: 'Authors' },
  admin: { group: 'Content', useAsTitle: 'name', defaultColumns: ['name', 'role', 'updatedAt'] },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isAdmin },
  // Bylines appear on every post card, so a change refreshes the blog too.
  hooks: revalidateHooks('authors', ['cms:blog-posts']),
  fields: [
    { name: 'name', type: 'text', required: true },
    { name: 'role', type: 'text', admin: { description: 'e.g. "Founder · Uniix Studio".' } },
    { name: 'bio', type: 'textarea' },
    imageField('avatar', { label: 'Photo' }),
    {
      name: 'initial',
      type: 'text',
      maxLength: 1,
      admin: { description: 'Monogram shown when there is no photo. Defaults to the first letter.' },
    },
    {
      name: 'email',
      type: 'email',
      access: { read: ({ req }) => Boolean(req.user) },
      admin: { description: 'Internal only — never shown publicly.' },
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'linkedin', type: 'text', validate: validateUrl, admin: { width: '33%' } },
            { name: 'twitter', label: 'X / Twitter', type: 'text', validate: validateUrl, admin: { width: '33%' } },
            { name: 'website', type: 'text', validate: validateUrl, admin: { width: '34%' } },
          ],
        },
      ],
    },
    slugField('name'),
  ],
}
