import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { orderField } from '../fields'
import { revalidateHooks } from '../hooks/revalidate'

export const WhyPoints: CollectionConfig = {
  slug: 'why-points',
  labels: { singular: 'Why Uniix point', plural: 'Why Uniix points' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['num', 'title', 'displayOrder'],
    description: '"Why Uniix" reasons on the homepage and About page.',
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isAdmin },
  hooks: revalidateHooks('why-points'),
  defaultSort: 'displayOrder',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'num', type: 'text', required: true, admin: { width: '20%' } },
        { name: 'title', type: 'text', required: true, admin: { width: '80%' } },
      ],
    },
    {
      name: 'instead',
      label: 'Instead of…',
      type: 'text',
      admin: { description: 'The industry habit this answers — shown struck-through on the homepage.' },
    },
    { name: 'description', type: 'textarea', required: true },
    orderField(),
  ],
}
