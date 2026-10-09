/**
 * Plain validators shared by CMS fields. Payload validators return `true` or
 * an error message; empty values are allowed here — use `required` for that.
 */

export const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/

export function slugify(input: string): string {
  return input
    .normalize('NFKD')
    .replace(/[̀-ͯ]/g, '')
    .toLowerCase()
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 96)
}

export function validateSlug(value: unknown): true | string {
  if (value === null || value === undefined || value === '') return true
  if (typeof value !== 'string' || !SLUG_PATTERN.test(value)) {
    return 'Use lowercase letters, numbers and single hyphens only (e.g. "brand-identity").'
  }
  return true
}

/** Absolute http(s) URL. */
export function validateUrl(value: unknown): true | string {
  if (value === null || value === undefined || value === '') return true
  if (typeof value !== 'string') return 'Enter a URL.'
  try {
    const u = new URL(value)
    if (u.protocol !== 'https:' && u.protocol !== 'http:') return 'URL must start with https://'
    return true
  } catch {
    return 'Enter a full URL, e.g. https://example.com'
  }
}

/** Absolute http(s) URL or a site-relative path like "/portfolio/foo.jpg". */
export function validateUrlOrPath(value: unknown): true | string {
  if (value === null || value === undefined || value === '') return true
  if (typeof value === 'string' && value.startsWith('/') && !value.startsWith('//')) return true
  return validateUrl(value)
}

/** A link target: internal path, absolute URL, anchor, mailto: or tel:. */
export function validateHref(value: unknown): true | string {
  if (value === null || value === undefined || value === '') return true
  if (typeof value !== 'string') return 'Enter a link.'
  if (/^(mailto:|tel:)\S+$/.test(value)) return true
  if (value.startsWith('#')) return true
  if (value.startsWith('/') && !value.startsWith('//')) return true
  const url = validateUrl(value)
  return url === true ? true : 'Use an internal path ("/contact"), a full URL, "mailto:" or "tel:".'
}

export function validateHexColor(value: unknown): true | string {
  if (value === null || value === undefined || value === '') return true
  return typeof value === 'string' && /^#(?:[0-9a-fA-F]{3}){1,2}$/.test(value)
    ? true
    : 'Use a hex colour such as #F8C84A.'
}

export function validateVimeoId(value: unknown): true | string {
  if (value === null || value === undefined || value === '') return true
  return typeof value === 'string' && /^\d{6,12}$/.test(value) ? true : 'Vimeo IDs are digits only, e.g. 1201632698.'
}

/** Soft length check used by SEO fields — blocks only egregious overruns. */
export function maxLengthMessage(max: number, label: string) {
  return (value: unknown): true | string => {
    if (typeof value !== 'string' || value.length <= max) return true
    return `${label} is ${value.length} characters — keep it under ${max} so search engines don't truncate it.`
  }
}

/** "/old-page" → "/old-page/" (the site uses trailing slashes); URLs untouched. */
export function normalizePath(value: string): string {
  const v = value.trim()
  if (/^https?:\/\//i.test(v)) return v
  const [path, query = ''] = v.split('?')
  let p = path.startsWith('/') ? path : `/${path}`
  p = p.replace(/\/{2,}/g, '/')
  if (!p.endsWith('/') && !/\.[a-z0-9]{2,5}$/i.test(p)) p = `${p}/`
  return query ? `${p}?${query}` : p
}
