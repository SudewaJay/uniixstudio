/**
 * Uniix Studio branding for the admin (replaces Payload's logo). The
 * wordmark uses /public/uniix-logo.svg as a CSS mask so it takes the text
 * colour in light and dark mode; the small icon is the site favicon.
 */
export function Logo() {
  return <span className="uniix-logo" role="img" aria-label="Uniix Studio" />
}

export function Icon() {
  // eslint-disable-next-line @next/next/no-img-element
  return <img className="uniix-icon" src="/uniix_studio_favicon.png" alt="Uniix Studio" width={24} height={24} />
}

export default Logo
