import { APIError, type CollectionBeforeValidateHook, type CollectionConfig } from 'payload'
import { isAdmin, isEditor } from '../access'
import { BOOLEAN_CELL } from '../fields'
import { normalizePath } from '../fields/validators'
import { revalidateHooks } from '../hooks/revalidate'

const MAX_HOPS = 10

/** Normalises paths and rejects self-redirects and loops. */
const validateRedirect: CollectionBeforeValidateHook = async ({ data, originalDoc, req }) => {
  if (!data) return data
  if (typeof data.from === 'string') data.from = normalizePath(data.from).split('?')[0]
  if (typeof data.to === 'string') data.to = normalizePath(data.to)
  const from = data.from ?? originalDoc?.from
  const to = data.to ?? originalDoc?.to
  if (!from || !to) return data
  if (/^https?:\/\//i.test(from)) throw new APIError('"From" must be a path on this site, e.g. /old-page/.', 400, undefined, true)
  if (from === to) throw new APIError('A redirect cannot point to itself.', 400, undefined, true)

  // Follow the chain from `to`; reaching `from` again means a loop.
  let cursor: string = to
  for (let hop = 0; hop < MAX_HOPS; hop++) {
    const next = await req.payload.find({
      collection: 'redirects',
      where: {
        and: [
          { from: { equals: cursor } },
          { enabled: { equals: true } },
          ...(originalDoc?.id ? [{ id: { not_equals: originalDoc.id } }] : []),
        ],
      },
      limit: 1,
      depth: 0,
      req,
    })
    const hopTo = next.docs[0]?.to
    if (!hopTo) return data
    if (hopTo === from) {
      throw new APIError(`This creates a redirect loop (${from} → ${to} → … → ${from}).`, 400, undefined, true)
    }
    cursor = hopTo
  }
  throw new APIError(`Redirect chain is longer than ${MAX_HOPS} hops — point straight to the final URL.`, 400, undefined, true)
}

export const Redirects: CollectionConfig = {
  slug: 'redirects',
  admin: {
    group: 'Administration',
    useAsTitle: 'from',
    listSearchableFields: ['from', 'to'],
    defaultColumns: ['from', 'to', 'type', 'enabled'],
    description: 'Send old URLs to new ones. Applied to any URL that would otherwise 404.',
  },
  // Server-side lookups use the Local API; the REST API is staff-only.
  access: { read: isEditor, create: isEditor, update: isEditor, delete: isAdmin },
  hooks: { beforeValidate: [validateRedirect], ...revalidateHooks('redirects') },
  fields: [
    {
      name: 'from',
      type: 'text',
      required: true,
      unique: true,
      index: true,
      admin: { description: 'Old path, e.g. /old-page/' },
    },
    { name: 'to', type: 'text', required: true, admin: { description: 'New path (/new-page/) or full URL.' } },
    {
      type: 'row',
      fields: [
        {
          name: 'type',
          type: 'select',
          required: true,
          defaultValue: 'permanent',
          options: [
            { label: 'Permanent (301/308) — the page moved for good', value: 'permanent' },
            { label: 'Temporary (302/307)', value: 'temporary' },
          ],
          admin: { width: '70%' },
        },
        { name: 'enabled', type: 'checkbox', defaultValue: true, admin: { width: '30%', components: { Cell: BOOLEAN_CELL } } },
      ],
    },
  ],
}
