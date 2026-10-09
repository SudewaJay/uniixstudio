import { APIError, type CollectionBeforeChangeHook, type Field } from 'payload'
import { roleOf } from '../access'

/** Sidebar "Created by / Last edited by" fields, filled server-side. */
export const auditFields: Field[] = [
  {
    name: 'createdBy',
    type: 'relationship',
    relationTo: 'users',
    index: true,
    admin: { position: 'sidebar', readOnly: true },
  },
  {
    name: 'updatedBy',
    label: 'Last edited by',
    type: 'relationship',
    relationTo: 'users',
    admin: { position: 'sidebar', readOnly: true },
  },
]

/**
 * Stamps createdBy/updatedBy. Whatever a client sends for these fields is
 * overwritten here, so they cannot be spoofed (field-level access is not used
 * because it runs after collection hooks and would erase the stamp).
 */
export const stampAudit: CollectionBeforeChangeHook = ({ data, operation, req, originalDoc }) => {
  const userId = req.user?.id ?? null
  if (operation === 'create') data.createdBy = userId
  else data.createdBy = originalDoc?.createdBy ?? null
  data.updatedBy = userId
  return data
}

/** Authors may write drafts but an editor must publish. */
export const authorsCannotPublish: CollectionBeforeChangeHook = ({ data, req }) => {
  if (roleOf(req.user) === 'author' && data?._status === 'published') {
    throw new APIError('Authors can save drafts — ask an editor to publish.', 403, undefined, true)
  }
  return data
}
