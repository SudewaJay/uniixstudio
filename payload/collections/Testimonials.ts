import type { CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { featuredField, imageField, orderField } from '../fields'
import { validateUrlOrPath } from '../fields/validators'
import { revalidateHooks } from '../hooks/revalidate'

export const Testimonials: CollectionConfig = {
  slug: 'testimonials',
  admin: {
    group: 'Content',
    useAsTitle: 'name',
    defaultColumns: ['name', 'company', 'headline', 'featured', 'displayOrder'],
    description: 'Client quotes. Featured ones appear on the homepage and About page.',
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isAdmin },
  hooks: revalidateHooks('testimonials'),
  defaultSort: 'displayOrder',
  fields: [
    { name: 'quote', type: 'textarea', required: true },
    { name: 'headline', type: 'text', admin: { description: 'Punchy one-liner pulled from the quote.' } },
    {
      type: 'row',
      fields: [
        { name: 'name', label: 'Client name', type: 'text', required: true, admin: { width: '34%' } },
        { name: 'role', type: 'text', admin: { width: '33%', description: 'e.g. "Director · Retail Brand".' } },
        { name: 'company', type: 'text', admin: { width: '33%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'initial', type: 'text', maxLength: 1, admin: { width: '20%' } },
        { name: 'project', label: 'Work label', type: 'text', admin: { width: '50%', description: 'e.g. "Brand Identity".' } },
        { name: 'year', type: 'text', admin: { width: '15%' } },
        { name: 'rating', type: 'number', min: 1, max: 5, admin: { width: '15%' } },
      ],
    },
    imageField('avatar', { label: 'Photo' }),
    imageField('companyLogo', { label: 'Company logo' }),
    {
      type: 'collapsible',
      label: 'Video testimonial (optional)',
      admin: { initCollapsed: true },
      fields: [
        { name: 'videoUrl', type: 'text', validate: validateUrlOrPath, admin: { description: 'MP4 URL.' } },
        imageField('poster', { label: 'Video poster' }),
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'relatedProject', type: 'relationship', relationTo: 'projects', admin: { width: '50%' } },
        { name: 'relatedService', type: 'relationship', relationTo: 'services', admin: { width: '50%' } },
      ],
    },
    featuredField(),
    orderField(),
  ],
}
