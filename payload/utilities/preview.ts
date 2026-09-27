/**
 * Builds the admin "Preview" link. /api/preview verifies the Payload session
 * before enabling Next.js draft mode, so the link is useless to non-staff.
 */
export function previewUrl(path: string): string {
  return `/api/preview?path=${encodeURIComponent(path)}`
}

/** Versioning shared by every publishable collection. */
export const draftVersions = {
  drafts: { autosave: { interval: 1500 } },
  maxPerDoc: 25,
} as const
