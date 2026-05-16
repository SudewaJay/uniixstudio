import type { CollectionConfig, Access, FieldAccess } from 'payload'

const isAdminOrEditor: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin' || user.role === 'editor') return true
  return false
}

const isAdmin: Access = ({ req: { user } }) => {
  if (!user) return false
  if (user.role === 'admin') return true
  return false
}

// Field-level access uses a different signature than collection-level Access.
// FieldAccess must return boolean (no Where clauses allowed at the field layer).
const isAdminField: FieldAccess = ({ req: { user } }) => {
  if (!user) return false
  return user.role === 'admin'
}

export const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    group: 'System',
    useAsTitle: 'email',
  },
  access: {
    read: isAdminOrEditor,
    create: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'role',
      type: 'select',
      options: [
        { label: 'Admin', value: 'admin' },
        { label: 'Editor', value: 'editor' },
        { label: 'Viewer', value: 'viewer' },
      ],
      required: true,
      defaultValue: 'editor',
      access: {
        update: isAdminField,
      },
    },
  ],
}
