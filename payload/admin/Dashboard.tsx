import Link from 'next/link'
import type { CollectionSlug, ServerProps, Where } from 'payload'

/**
 * Task-oriented dashboard, rendered above Payload's default dashboard (whose
 * card grid is hidden in uniix-admin.css and replaced by "All tools" below).
 * Every number and row comes from the database, queried with the signed-in
 * user's permissions.
 */

const ADMIN = '/admin'
const TIME_ZONE = 'Asia/Colombo'

/** Draft-enabled collections, with the field used as each document's title. */
const SOURCES: { slug: CollectionSlug; title: string; label: string }[] = [
  { slug: 'blog-posts', title: 'title', label: 'Blog post' },
  { slug: 'projects', title: 'title', label: 'Project' },
  { slug: 'services', title: 'name', label: 'Service' },
  { slug: 'pages', title: 'title', label: 'Landing page' },
]

type Row = { key: string; title: string; label: string; href: string; updatedAt: string; status?: string }

const listUrl = (slug: string, where?: Record<string, string>) => {
  const qs = where
    ? '?' + Object.entries(where).map(([k, v]) => `where[${k}][equals]=${encodeURIComponent(v)}`).join('&')
    : ''
  return `${ADMIN}/collections/${slug}${qs}`
}

const relative = (iso: string) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 1) return 'just now'
  if (mins < 60) return `${mins} min ago`
  if (mins < 60 * 24) return `${Math.round(mins / 60)} h ago`
  const days = Math.round(mins / (60 * 24))
  if (days < 7) return `${days} d ago`
  return new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: TIME_ZONE })
}

const greeting = () => {
  const hour = Number(new Intl.DateTimeFormat('en-GB', { hour: 'numeric', hour12: false, timeZone: TIME_ZONE }).format(new Date()))
  return hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening'
}

async function safe<T>(fn: () => Promise<T>): Promise<T | null> {
  try {
    return await fn()
  } catch {
    // A collection the user cannot read simply drops out of the dashboard.
    return null
  }
}

function StatusBadge({ status }: { status?: string }) {
  if (!status) return null
  const label = status === 'published' ? 'Published' : status === 'draft' ? 'Draft' : status
  return <span className={`uniix-badge uniix-badge--${status}`}>{label}</span>
}

export async function Dashboard({ payload, user, permissions }: ServerProps) {
  if (!payload || !user) return null
  const opts = { user, overrideAccess: false } as const
  const canRead = (slug: string) => Boolean(permissions?.collections?.[slug]?.read)

  const count = (collection: CollectionSlug, where?: Where) =>
    canRead(collection) ? safe(async () => (await payload.count({ ...opts, collection, where })).totalDocs) : Promise.resolve(null)

  const [newEnquiries, publishedPosts, publishedProjects, enquiryRows, perSource] = await Promise.all([
    count('contact-submissions', { status: { equals: 'new' } }),
    count('blog-posts', { _status: { equals: 'published' } }),
    count('projects', { _status: { equals: 'published' } }),
    canRead('contact-submissions')
      ? safe(() =>
          payload.find({ ...opts, collection: 'contact-submissions', where: { status: { equals: 'new' } }, sort: '-createdAt', limit: 4, depth: 0 }),
        )
      : Promise.resolve(null),
    Promise.all(
      SOURCES.filter((s) => canRead(s.slug)).map(async (s) => {
        const toRow = (doc: unknown): Row => {
          const d = doc as Record<string, unknown>
          return {
            key: `${s.slug}-${d.id}`,
            title: String(d[s.title] || '(untitled)'),
            label: s.label,
            href: `${ADMIN}/collections/${s.slug}/${d.id}`,
            updatedAt: String(d.updatedAt),
            status: typeof d._status === 'string' ? d._status : undefined,
          }
        }
        // draft: true reads the latest version, so unpublished edits count too.
        const [drafts, recent] = await Promise.all([
          safe(() => payload.find({ ...opts, collection: s.slug, draft: true, where: { _status: { equals: 'draft' } }, sort: '-updatedAt', limit: 5, depth: 0 })),
          safe(() => payload.find({ ...opts, collection: s.slug, draft: true, sort: '-updatedAt', limit: 6, depth: 0 })),
        ])
        return {
          drafts: (drafts?.docs ?? []).map(toRow),
          draftCount: drafts?.totalDocs ?? 0,
          recent: (recent?.docs ?? []).map(toRow),
        }
      }),
    ),
  ])

  const byNewest = (a: Row, b: Row) => b.updatedAt.localeCompare(a.updatedAt)
  const drafts = perSource.flatMap((s) => s.drafts).sort(byNewest).slice(0, 5)
  const draftCount = perSource.reduce((n, s) => n + s.draftCount, 0)
  const recent = perSource.flatMap((s) => s.recent).sort(byNewest).slice(0, 7)
  const enquiries = (enquiryRows?.docs ?? []) as unknown as {
    id: number
    name?: string
    email?: string
    service?: string
    createdAt: string
  }[]

  const metrics = [
    newEnquiries !== null && {
      label: 'New enquiries',
      value: newEnquiries,
      href: listUrl('contact-submissions', { status: 'new' }),
      icon: 'inbox',
      hot: newEnquiries > 0,
    },
    publishedPosts !== null && { label: 'Published posts', value: publishedPosts, href: listUrl('blog-posts', { _status: 'published' }), icon: 'pen' },
    publishedProjects !== null && { label: 'Live projects', value: publishedProjects, href: listUrl('projects', { _status: 'published' }), icon: 'briefcase' },
    perSource.length > 0 && { label: 'Drafts to publish', value: draftCount, href: '#uniix-attention', icon: 'draft' },
  ].filter(Boolean) as { label: string; value: number; href: string; icon: string; hot?: boolean }[]

  // "All tools": every section this user can open, grouped as in the sidebar.
  const groups = new Map<string, { label: string; href: string; id: string }[]>()
  const add = (group: unknown, item: { label: string; href: string; id: string }) => {
    const g = typeof group === 'string' ? group : 'Other'
    groups.set(g, [...(groups.get(g) ?? []), item])
  }
  const labelOf = (l: unknown, fallback: string) => (typeof l === 'string' ? l : fallback)
  for (const c of payload.config.collections) {
    if (!canRead(c.slug) || c.admin?.hidden === true) continue
    add(c.admin?.group, { label: labelOf(c.labels?.plural, c.slug), href: `${ADMIN}/collections/${c.slug}`, id: c.slug })
  }
  for (const g of payload.config.globals) {
    if (!permissions?.globals?.[g.slug]?.read || g.admin?.hidden === true) continue
    add(g.admin?.group, { label: labelOf(g.label, g.slug), href: `${ADMIN}/globals/${g.slug}`, id: g.slug })
  }

  const name = String((user as { name?: string }).name || user.email || '').split(/[\s@]/)[0]
  const attentionEmpty = enquiries.length === 0 && drafts.length === 0

  return (
    <div className="uniix-dash">
      <header className="uniix-dash__head">
        <h1 className="uniix-dash__title">
          {greeting()}
          {name ? `, ${name}` : ''}
        </h1>
        <p className="uniix-dash__lede">Manage your website, content and portfolio from one place.</p>
      </header>

      {metrics.length > 0 && (
        <section aria-label="Key numbers" className="uniix-metrics">
          {metrics.map((m) => (
            <Link key={m.label} href={m.href} className={`uniix-metric${m.hot ? ' is-hot' : ''}`}>
              <span className={`uniix-metric__icon uniix-i uniix-i--${m.icon}`} aria-hidden="true" />
              <span className="uniix-metric__value">{m.value}</span>
              <span className="uniix-metric__label">{m.label}</span>
            </Link>
          ))}
        </section>
      )}

      <section aria-labelledby="uniix-quick" className="uniix-section">
        <h2 id="uniix-quick" className="uniix-section__title">
          Quick actions
        </h2>
        <div className="uniix-quick">
          <Link className="uniix-btn uniix-btn--primary" href={`${ADMIN}/collections/blog-posts/create`}>
            <span className="uniix-i uniix-i--plus" aria-hidden="true" /> Write a blog post
          </Link>
          <Link className="uniix-btn" href={`${ADMIN}/collections/projects/create`}>
            <span className="uniix-i uniix-i--briefcase" aria-hidden="true" /> Add a project
          </Link>
          <Link className="uniix-btn" href={`${ADMIN}/globals/homepage`}>
            <span className="uniix-i uniix-i--home" aria-hidden="true" /> Edit the homepage
          </Link>
          <Link className="uniix-btn" href={`${ADMIN}/collections/media/create`}>
            <span className="uniix-i uniix-i--image" aria-hidden="true" /> Upload media
          </Link>
        </div>
      </section>

      <div className="uniix-columns">
        <section id="uniix-attention" aria-labelledby="uniix-attention-title" className="uniix-panel">
          <h2 id="uniix-attention-title" className="uniix-section__title">
            Needs attention
          </h2>
          {attentionEmpty ? (
            <div className="uniix-empty">
              <span className="uniix-i uniix-i--check" aria-hidden="true" />
              <div>
                <p className="uniix-empty__title">You&apos;re all caught up</p>
                <p className="uniix-empty__text">No new enquiries and nothing waiting to be published.</p>
              </div>
            </div>
          ) : (
            <ul className="uniix-rows">
              {enquiries.map((e) => (
                <li key={`enquiry-${e.id}`}>
                  <Link href={`${ADMIN}/collections/contact-submissions/${e.id}`} className="uniix-row">
                    <span className="uniix-row__main">
                      <span className="uniix-row__title">{e.name || e.email || 'Enquiry'}</span>
                      <span className="uniix-row__meta">
                        New enquiry{e.service ? ` · ${e.service}` : ''} · {relative(e.createdAt)}
                      </span>
                    </span>
                    <span className="uniix-badge uniix-badge--new">New</span>
                  </Link>
                </li>
              ))}
              {drafts.map((r) => (
                <li key={`draft-${r.key}`}>
                  <Link href={r.href} className="uniix-row">
                    <span className="uniix-row__main">
                      <span className="uniix-row__title">{r.title}</span>
                      <span className="uniix-row__meta">
                        {r.label} not published · edited {relative(r.updatedAt)}
                      </span>
                    </span>
                    <StatusBadge status="draft" />
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {(newEnquiries ?? 0) > enquiries.length && (
            <Link className="uniix-more" href={listUrl('contact-submissions', { status: 'new' })}>
              View all {newEnquiries} new enquiries →
            </Link>
          )}
        </section>

        <section aria-labelledby="uniix-recent-title" className="uniix-panel">
          <h2 id="uniix-recent-title" className="uniix-section__title">
            Recent activity
          </h2>
          {recent.length === 0 ? (
            <div className="uniix-empty">
              <span className="uniix-i uniix-i--pen" aria-hidden="true" />
              <div>
                <p className="uniix-empty__title">No edits yet</p>
                <p className="uniix-empty__text">Content you create or update will show up here.</p>
              </div>
            </div>
          ) : (
            <ul className="uniix-rows">
              {recent.map((r) => (
                <li key={`recent-${r.key}`}>
                  <Link href={r.href} className="uniix-row">
                    <span className="uniix-row__main">
                      <span className="uniix-row__title">{r.title}</span>
                      <span className="uniix-row__meta">
                        {r.label} · updated {relative(r.updatedAt)}
                      </span>
                    </span>
                    <StatusBadge status={r.status} />
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>

      <section aria-labelledby="uniix-tools-title" className="uniix-section">
        <h2 id="uniix-tools-title" className="uniix-section__title">
          All tools
        </h2>
        <div className="uniix-tools">
          {[...groups.entries()].map(([group, items]) => (
            <div key={group} className="uniix-tools__group">
              <h3 className="uniix-tools__label">{group}</h3>
              <ul>
                {items.map((i) => (
                  <li key={i.id}>
                    <Link href={i.href}>{i.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard
