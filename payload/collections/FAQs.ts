import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { BOOLEAN_CELL, orderField } from '../fields'
import { revalidateHooks } from '../hooks/revalidate'

/** Reusable FAQ bank — pulled into pages via the FAQ block. */
export const FAQs: CollectionConfig = {
  slug: 'faqs',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  admin: {
    group: 'Services',
    useAsTitle: 'question',
    listSearchableFields: ['question'],
    defaultColumns: ['question', 'category', 'published', 'displayOrder'],
    description: 'General questions reused across landing pages. Service- and post-specific FAQs live on those documents.',
  },
  access: {
    read: ({ req }) => (req.user ? true : { published: { equals: true } }),
    create: isEditor,
    update: isEditor,
    delete: isAdmin,
  },
  hooks: revalidateHooks('faqs'),
  defaultSort: 'displayOrder',
  fields: [
    { name: 'question', type: 'text', required: true },
    { name: 'answer', type: 'textarea', required: true },
    {
      name: 'category',
      type: 'select',
      defaultValue: 'general',
      index: true,
      options: [
        { label: 'General', value: 'general' },
        { label: 'Pricing & process', value: 'pricing' },
        { label: 'Design', value: 'design' },
        { label: 'Technology', value: 'technology' },
        { label: 'Growth & SEO', value: 'growth' },
      ],
      admin: { position: 'sidebar' },
    },
    { name: 'published', type: 'checkbox', defaultValue: true, index: true, admin: { position: 'sidebar', components: { Cell: BOOLEAN_CELL } } },
    orderField(),
  ],
}
