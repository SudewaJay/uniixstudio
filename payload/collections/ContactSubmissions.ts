import type { CollectionConfig } from 'payload'
import { isAdmin, isSuperAdmin, nobody } from '../access'

/**
 * Enquiries from the contact form. Private: created only by the server-side
 * /api/contact route (Local API), readable only by admins. Never public.
 */
export const ContactSubmissions: CollectionConfig = {
  slug: 'contact-submissions',
  labels: { singular: 'Enquiry', plural: 'Enquiries' },
  admin: {
    group: 'Inbox',
    useAsTitle: 'name',
    defaultColumns: ['name', 'email', 'service', 'status', 'createdAt'],
    listSearchableFields: ['name', 'email', 'company', 'message'],
    description: 'Contact-form enquiries. Update the status as you follow up.',
  },
  access: { read: isAdmin, create: nobody, update: isAdmin, delete: isSuperAdmin },
  defaultSort: '-createdAt',
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'name', type: 'text', required: true, admin: { width: '50%', readOnly: true } },
        { name: 'email', type: 'email', required: true, admin: { width: '50%', readOnly: true } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'phone', type: 'text', admin: { width: '33%', readOnly: true } },
        { name: 'company', type: 'text', admin: { width: '33%', readOnly: true } },
        { name: 'budget', type: 'text', admin: { width: '34%', readOnly: true } },
      ],
    },
    { name: 'service', type: 'text', admin: { readOnly: true } },
    { name: 'message', type: 'textarea', required: true, admin: { readOnly: true } },
    {
      name: 'source',
      type: 'text',
      admin: { readOnly: true, description: 'Page or campaign the enquiry came from.' },
    },
    {
      name: 'emailDelivered',
      type: 'checkbox',
      admin: { readOnly: true, position: 'sidebar', description: 'Whether the notification email was sent.' },
    },
    {
      name: 'status',
      type: 'select',
      required: true,
      defaultValue: 'new',
      index: true,
      options: [
        { label: 'New', value: 'new' },
        { label: 'Contacted', value: 'contacted' },
        { label: 'Qualified', value: 'qualified' },
        { label: 'Converted', value: 'converted' },
        { label: 'Archived', value: 'archived' },
      ],
      admin: { position: 'sidebar', components: { Cell: '/payload/admin/StatusCell#StatusCell' } },
    },
    { name: 'notes', type: 'textarea', admin: { description: 'Internal follow-up notes.' } },
  ],
}
