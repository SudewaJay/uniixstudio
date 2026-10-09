import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { orderField } from '../fields'
import { revalidateHooks } from '../hooks/revalidate'

export const Process: CollectionConfig = {
  slug: 'process',
  labels: { singular: 'Process Stage', plural: 'Process Stages' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['num', 'title', 'displayOrder'],
    description: 'The delivery process shown on the homepage and service pages.',
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isAdmin },
  hooks: revalidateHooks('process'),
  defaultSort: 'displayOrder',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'num', type: 'text', required: true, admin: { width: '20%', description: '"01"' } },
        { name: 'title', type: 'text', required: true, admin: { width: '80%' } },
      ],
    },
    { name: 'description', type: 'textarea', required: true },
    { name: 'deliverables', type: 'text', hasMany: true },
    orderField(),
  ],
}
