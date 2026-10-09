'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

/**
 * "Dashboard" entry at the top of the sidebar (Payload only links to it via
 * the logo). Mirrors Payload's own .nav__link markup, including the active
 * indicator, so it shares the sidebar styling.
 */
export function NavDashboardLink() {
  const pathname = usePathname()
  const active = pathname === '/admin' || pathname === '/admin/'

  return (
    <Link className="nav__link" id="nav-dashboard" href="/admin" aria-current={active ? 'page' : undefined}>
      {active && <div className="nav__link-indicator" />}
      <span className="nav__link-label">Dashboard</span>
    </Link>
  )
}

export default NavDashboardLink
