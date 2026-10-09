import type { CollectionConfig } from 'payload'
import { ROLES, adminOrSelf, isSuperAdmin, superAdminField, superAdminOrSelf } from '../access'

export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'User', plural: 'Users & Access' },
  auth: {
    tokenExpiration: 60 * 60 * 8, // 8h sessions
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
  },
  admin: {
    group: 'Administration',
    useAsTitle: 'email',
    defaultColumns: ['email', 'name', 'role', 'updatedAt'],
    description: 'People who can sign in to the CMS. Only super-admins can invite users or change roles.',
  },
  access: {
    // Every role can use the admin panel; the public never can.
    admin: ({ req }) => Boolean(req.user),
    read: adminOrSelf,
    create: isSuperAdmin,
    update: superAdminOrSelf,
    delete: isSuperAdmin,
    unlock: isSuperAdmin,
  },
  fields: [
    { name: 'name', type: 'text' },
    {
      name: 'role',
      type: 'select',
      required: true,
      defaultValue: 'editor',
      saveToJWT: true,
      options: [
        { label: 'Super admin — everything, including users', value: 'super-admin' },
        { label: 'Admin — all content, settings & enquiries', value: 'admin' },
        { label: 'Editor — create, edit & publish content', value: 'editor' },
        { label: 'Author — draft own blog posts', value: 'author' },
      ] satisfies { value: (typeof ROLES)[number]; label: string }[],
      access: { create: superAdminField, update: superAdminField },
      admin: { position: 'sidebar' },
    },
  ],
}
