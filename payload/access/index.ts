import type { Access, FieldAccess, PayloadRequest, Where } from 'payload'

/**
 * Role model (server-enforced — every collection/global routes through these).
 *
 *   super-admin  everything, including users & roles
 *   admin        all content, media, submissions, redirects, site settings
 *   editor       create / edit / publish content; no users, settings or submissions
 *   author       blog posts they created (drafts only — cannot publish) + media uploads
 *
 * Anonymous visitors only ever see published documents.
 */
export const ROLES = ['super-admin', 'admin', 'editor', 'author'] as const
export type Role = (typeof ROLES)[number]

const RANK: Record<Role, number> = { author: 1, editor: 2, admin: 3, 'super-admin': 4 }

type MaybeUser = PayloadRequest['user']

export function roleOf(user: MaybeUser): Role | null {
  const role = (user as { role?: unknown } | null | undefined)?.role
  return typeof role === 'string' && (ROLES as readonly string[]).includes(role) ? (role as Role) : null
}

export function hasRole(user: MaybeUser, min: Role): boolean {
  const role = roleOf(user)
  return role !== null && RANK[role] >= RANK[min]
}

/* ------------------------------ collection ------------------------------ */

export const anyone: Access = () => true
export const nobody: Access = () => false

export const isStaff: Access = ({ req }) => roleOf(req.user) !== null
export const isEditor: Access = ({ req }) => hasRole(req.user, 'editor')
export const isAdmin: Access = ({ req }) => hasRole(req.user, 'admin')
export const isSuperAdmin: Access = ({ req }) => hasRole(req.user, 'super-admin')

/** Versioned content: staff see drafts, everyone else only published docs. */
export const publishedOrStaff: Access = ({ req }) => {
  if (roleOf(req.user)) return true
  return { _status: { equals: 'published' } } satisfies Where
}

/** Editors+ may touch anything; authors only documents they created. */
export const editorOrOwnDoc: Access = ({ req }) => {
  if (hasRole(req.user, 'editor')) return true
  if (roleOf(req.user) === 'author' && req.user) {
    return { createdBy: { equals: req.user.id } } satisfies Where
  }
  return false
}

/** Users: admins see everyone; every staff member can see their own record. */
export const adminOrSelf: Access = ({ req }) => {
  if (hasRole(req.user, 'admin')) return true
  if (req.user) return { id: { equals: req.user.id } } satisfies Where
  return false
}

export const superAdminOrSelf: Access = ({ req }) => {
  if (hasRole(req.user, 'super-admin')) return true
  if (req.user) return { id: { equals: req.user.id } } satisfies Where
  return false
}

/* -------------------------------- fields -------------------------------- */

export const superAdminField: FieldAccess = ({ req }) => hasRole(req.user, 'super-admin')
export const adminField: FieldAccess = ({ req }) => hasRole(req.user, 'admin')
export const staffField: FieldAccess = ({ req }) => roleOf(req.user) !== null
