import { site } from '@/lib/content'

/** Header action: open the public website in a new tab. */
export function ViewSiteAction() {
  return (
    <a className="uniix-view-site" href={site.url} target="_blank" rel="noopener noreferrer">
      View website
      <span aria-hidden="true">↗</span>
      <span className="uniix-sr-only"> (opens in a new tab)</span>
    </a>
  )
}

export default ViewSiteAction
