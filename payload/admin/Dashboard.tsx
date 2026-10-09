import type { CollectionSlug, ServerProps } from 'payload'

import { site } from '@/lib/content'

/**
 * Shown above the default collection cards on /admin: what needs attention
 * (new enquiries, unpublished drafts), recent edits, and one-click shortcuts
 * for the jobs editors do most.
 */

const ADMIN = '/admin'

const QUICK_ACTIONS: { label: string; hint: string; href: string }[] = [
  { label: 'Write a blog post', hint: 'Blog', href: `${ADMIN}/collections/blog-posts/create` },
  { label: 'Add a project', hint: 'Portfolio', href: `${ADMIN}/collections/projects/create` },
  { label: 'Edit the homepage', hint: 'Website', href: `${ADMIN}/globals/homepage` },
  { label: 'Upload images', hint: 'Media Library', href: `${ADMIN}/collections/media/create` },
]

/** Draft-enabled collections, with the field used as each document's title. */
const DRAFT_SOURCES: { slug: CollectionSlug; title: string; label: string }[] = [
  { slug: 'blog-posts', title: 'title', label: 'Blog post' },
  { slug: 'projects', title: 'title', label: 'Project' },
  { slug: 'services', title: 'name', label: 'Service' },
  { slug: 'pages', title: 'title', label: 'Landing page' },
]

type Row = { id: number | string; title: string; label: string; href: string; updatedAt: string }

const when = (iso: string) => {
  const mins = Math.round((Date.now() - new Date(iso).getTime()) / 60000)
  if (mins < 60) return `${Math.max(mins, 1)} min ago`
  if (mins < 60 * 24) return `${Math.round(mins / 60)} h ago`
  const days = Math.round(mins / (60 * 24))
  return days < 30 ? `${days} d ago` : new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })
}

export async function Dashboard({ payload, user }: ServerProps) {
  if (!payload || !user) return null
  // Respect the signed-in user's permissions rather than reading everything.
  const opts = { user, overrideAccess: false, depth: 0 } as const

  const safe = async <T,>(fn: () => Promise<T>, fallback: T) => {
    try {
      return await fn()
    } catch {
      return fallback
    }
  }

  const [enquiries, perSource] = await Promise.all([
    safe(
      () =>
        payload.find({
          ...opts,
          collection: 'contact-submissions',
          where: { status: { equals: 'new' } },
          sort: '-createdAt',
          limit: 5,
        }),
      null,
    ),
    Promise.all(
      DRAFT_SOURCES.map(async (s) => {
        const toRow = (doc: unknown): Row => {
          const d = doc as Record<string, unknown>
          return {
          id: d.id as number,
          title: String(d[s.title] || '(untitled)'),
          label: s.label,
          href: `${ADMIN}/collections/${s.slug}/${d.id}`,
          updatedAt: String(d.updatedAt),
          }
        }
        const [drafts, recent] = await Promise.all([
          safe(
            () =>
              payload.find({ ...opts, collection: s.slug, draft: true, where: { _status: { equals: 'draft' } }, sort: '-updatedAt', limit: 5 }),
            null,
          ),
          safe(() => payload.find({ ...opts, collection: s.slug, draft: true, sort: '-updatedAt', limit: 5 }), null),
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
  const recent = perSource.flatMap((s) => s.recent).sort(byNewest).slice(0, 6)
  const newCount = enquiries?.totalDocs ?? 0
  const firstName = String((user as { name?: string }).name || user.email || '').split(/[\s@]/)[0]

  return (
    <section className="uniix-dash">
      <header className="uniix-dash__head">
        <div>
          <h1 className="uniix-dash__title">Welcome back{firstName ? `, ${firstName}` : ''}</h1>
          <p className="uniix-dash__lede">Everything on uniixstudio.com is edited here. Changes go live as soon as you publish.</p>
        </div>
        <a className="uniix-dash__site" href={site.url} target="_blank" rel="noopener noreferrer">
          View website ↗
        </a>
      </header>

      <div className="uniix-dash__actions">
        {QUICK_ACTIONS.map((a) => (
          <a key={a.href} className="uniix-dash__action" href={a.href}>
            <span className="uniix-dash__action-label">{a.label}</span>
            <span className="uniix-dash__action-hint">{a.hint}</span>
          </a>
        ))}
      </div>

      <div className="uniix-dash__grid">
        {enquiries && (
          <article className="uniix-dash__card">
            <h2 className="uniix-dash__card-title">
              New enquiries <span className={`uniix-dash__count${newCount ? ' is-hot' : ''}`}>{newCount}</span>
            </h2>
            {newCount === 0 ? (
              <p className="uniix-dash__empty">You&apos;re all caught up.</p>
            ) : (
              <ul className="uniix-dash__list">
                {enquiries.docs.map((e) => {
                  const d = e as unknown as { id: number; name?: string; email?: string; service?: string; createdAt: string }
                  return (
                    <li key={d.id}>
                      <a href={`${ADMIN}/collections/contact-submissions/${d.id}`}>{d.name || d.email || 'Enquiry'}</a>
                      <span>{[d.service, when(d.createdAt)].filter(Boolean).join(' · ')}</span>
                    </li>
                  )
                })}
              </ul>
            )}
            <a className="uniix-dash__more" href={`${ADMIN}/collections/contact-submissions`}>
              All enquiries →
            </a>
          </article>
        )}

        <article className="uniix-dash__card">
          <h2 className="uniix-dash__card-title">
            Unpublished drafts <span className="uniix-dash__count">{draftCount}</span>
          </h2>
          {drafts.length === 0 ? (
            <p className="uniix-dash__empty">Nothing waiting to be published.</p>
          ) : (
            <ul className="uniix-dash__list">
              {drafts.map((r) => (
                <li key={r.href}>
                  <a href={r.href}>{r.title}</a>
                  <span>
                    {r.label} · {when(r.updatedAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>

        <article className="uniix-dash__card">
          <h2 className="uniix-dash__card-title">Recently edited</h2>
          {recent.length === 0 ? (
            <p className="uniix-dash__empty">No edits yet.</p>
          ) : (
            <ul className="uniix-dash__list">
              {recent.map((r) => (
                <li key={r.href}>
                  <a href={r.href}>{r.title}</a>
                  <span>
                    {r.label} · {when(r.updatedAt)}
                  </span>
                </li>
              ))}
            </ul>
          )}
        </article>
      </div>
    </section>
  )
}

export default Dashboard
