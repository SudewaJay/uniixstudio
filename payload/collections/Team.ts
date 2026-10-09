import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { featuredField, imageField, linksArray, orderField, slugField } from '../fields'
import { revalidateHooks } from '../hooks/revalidate'

export const Team: CollectionConfig = {
  slug: 'team',
  labels: { singular: 'Team Member', plural: 'Team' },
  admin: {
    group: 'Website',
    useAsTitle: 'name',
    listSearchableFields: ['name', 'role'],
    defaultColumns: ['name', 'role', 'department', 'featured', 'displayOrder'],
    description: 'People shown on the About page.',
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isAdmin },
  hooks: revalidateHooks('team'),
  defaultSort: 'displayOrder',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
        { name: 'role', type: 'text', required: true, admin: { width: '50%' } },
      ],
    },
    {
      name: 'department',
      type: 'select',
      options: ['Leadership', 'Design', 'Technology', 'Growth', 'Production', 'Operations'],
    },
    { name: 'bio', type: 'textarea' },
    imageField('photo'),
    { name: 'initial', type: 'text', maxLength: 1, admin: { description: 'Monogram when there is no photo.' } },
    { name: 'skills', type: 'text', hasMany: true },
    linksArray('socialLinks'),
    slugField('name'),
    featuredField(),
    orderField(),
  ],
}
