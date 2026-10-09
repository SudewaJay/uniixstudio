import { APIError, type CollectionBeforeValidateHook, type CollectionConfig } from 'payload'
import { anyone, isAdmin, isEditor } from '../access'
import { faqsField, seoField } from '../fields'
import { revalidateHooks } from '../hooks/revalidate'
import { paragraphs } from './Locations'

const idOf = (v: unknown) => (v && typeof v === 'object' && 'id' in v ? (v as { id: unknown }).id : v)

/** One page per (location, service) pair — never duplicates. */
const uniquePair: CollectionBeforeValidateHook = async ({ data, originalDoc, req }) => {
  const location = idOf(data?.location ?? originalDoc?.location)
  const service = idOf(data?.service ?? originalDoc?.service)
  if (!location || !service) return data
  const clash = await req.payload.find({
    collection: 'location-pages',
    where: {
      and: [
        { location: { equals: location } },
        { service: { equals: service } },
        ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
      ],
    },
    limit: 1,
    depth: 0,
    req,
  })
  if (clash.totalDocs > 0) {
    throw new APIError('A page for this location and service already exists.', 400, undefined, true)
  }
  return data
}

/**
 * Curated location × service pages — /locations/<area>/<service>/.
 * Only add a combination when you can write distinct copy for it.
 */
export const LocationPages: CollectionConfig = {
  slug: 'location-pages',
  labels: { singular: 'Location Service Page', plural: 'Location Service Pages' },
  admin: {
    group: 'Local SEO',
    useAsTitle: 'h1',
    defaultColumns: ['h1', 'location', 'service', 'updatedAt'],
    description: 'Hand-written town × service pages. Not a cross-product — quality over quantity.',
  },
  access: { read: anyone, create: isEditor, update: isEditor, delete: isAdmin },
  hooks: { beforeValidate: [uniquePair], ...revalidateHooks('location-pages') },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'location', type: 'relationship', relationTo: 'locations', required: true, admin: { width: '50%' } },
        { name: 'service', type: 'relationship', relationTo: 'services', required: true, admin: { width: '50%' } },
      ],
    },
    {
      type: 'row',
      fields: [
        { name: 'h1', label: 'Heading (H1)', type: 'text', required: true, admin: { width: '60%' } },
        { name: 'serviceLabel', type: 'text', required: true, admin: { width: '40%' } },
      ],
    },
    { name: 'lede', type: 'textarea', required: true },
    paragraphs('intro'),
    {
      name: 'benefits',
      type: 'array',
      fields: [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'textarea', required: true },
      ],
    },
    faqsField(),
    seoField(),
  ],
}
