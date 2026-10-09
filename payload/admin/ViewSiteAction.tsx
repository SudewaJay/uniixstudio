import { site } from '@/lib/content'

/** Header action: open the public website in a new tab. */
export function ViewSiteAction() {
  return (
    <a className="uniix-view-site" href={site.url} target="_blank" rel="noopener noreferrer" aria-label="View website (opens in a new tab)">
      <span className="uniix-view-site__label">View website</span>
      <span aria-hidden="true">↗</span>
    </a>
  )
}

export default ViewSiteAction
