/**
 * One-shot migration from /lib/*.ts → Payload CMS.
 *
 * Run with:
 *   npx payload run scripts/migrate-to-payload.ts          # recommended (safe — skips existing)
 *   FORCE=1 npx payload run scripts/migrate-to-payload.ts  # nuke and re-create
 *
 * If `payload run` is unavailable, fall back to:
 *   node --import tsx --env-file=.env scripts/migrate-to-payload.ts
 *
 * Idempotent by default: if a doc already exists (matched by slug or unique
 * field), it's skipped. Globals are upserted unconditionally.
 */

// Load .env BEFORE importing payload — bypasses the broken loadEnv.js shim
// in payload@3.84 + @next/env on Node 24.
import 'dotenv/config'

import { getPayload } from 'payload'
import configPromise from '../payload.config'

import {
  site,
  nav,
  clients,
  projects,
  testimonials,
  process as processSteps,
  whyPoints,
} from '../lib/content'
import { pillars, services } from '../lib/services'
import { industries } from '../lib/industries'
import { posts } from '../lib/blog'

const FORCE = process.env.FORCE === '1'

async function main() {
  const payload = await getPayload({ config: configPromise })
  console.log(`\nMigrating Uniix data → Payload CMS  (FORCE=${FORCE ? 'yes' : 'no'})\n`)

  /* ---------- GLOBALS — always upsert ---------- */

  await payload.updateGlobal({
    slug: 'settings',
    data: {
      siteName: site.name,
      tagline: site.tagline,
      metaDescription: site.description,
      email: site.email,
      whatsapp: site.whatsapp,
      whatsappLink: site.whatsappLink,
      location: site.location,
      socials: {
        instagram: site.socials.instagram,
        facebook: site.socials.facebook,
        linkedin: site.socials.linkedin,
      },
    } as never,
  })
  console.log('  ✓ settings')

  await payload.updateGlobal({
    slug: 'nav',
    data: {
      items: nav.map((n) => ({ label: n.label, href: n.href })),
      ctaLabel: "Let's talk",
      ctaHref: '/contact',
    } as never,
  })
  console.log('  ✓ nav')

  await payload.updateGlobal({
    slug: 'promo-bar',
    data: {
      enabled: true,
      taglines: [
        { text: 'Creative Digital Agency · Colombo · Working globally' },
        { text: 'Brand identities · Performance websites · Growth systems' },
        { text: '50+ projects shipped · 3× average traffic lift in 90 days' },
        { text: 'Available for Q3 2026 — 2 slots left' },
      ],
      rotateInterval: 3800,
    } as never,
  })
  console.log('  ✓ promo-bar')

  await payload.updateGlobal({
    slug: 'stats',
    data: {
      entries: [
        { value: '4+', label: 'Years building', description: 'Selected since 2022 across Sri Lanka, Australia, and the UK.' },
        { value: '50+', label: 'Projects shipped', description: 'Branding, web, and growth — from launch-stage founders to enterprise.' },
        { value: '30+', label: 'Clients served', description: 'Founders, marketing teams, and operators across 8 industries.' },
        { value: '92%', label: 'Client retention', description: 'Most clients return for a second engagement, then a third.' },
      ],
    } as never,
  })
  console.log('  ✓ stats')

  /* ---------- COLLECTIONS ---------- */

  await migrateCollection(payload, 'pillars', pillars, (p) => ({
    slug: p.slug,
    label: p.label,
    tagline: p.tagline,
    description: p.description,
    accentColor: p.accent,
  }))

  // Pre-resolve pillar IDs once — Services need relationship IDs, not slugs
  const pillarIdBySlug = await buildSlugToIdMap(payload, 'pillars')

  await migrateCollection(payload, 'services', services, (s) => ({
    slug: s.slug,
    name: s.name,
    rawName: s.rawName,
    pillar: pillarIdBySlug.get(s.pillar) ?? null,
    pageTitle: s.pageTitle,
    metaDescription: truncate(s.metaDescription, 160),
    body: mdToLexical(s.body),
  }))

  await migrateCollection(payload, 'industries', industries, (ind) => ({
    slug: ind.slug,
    name: ind.name,
    description: ind.description,
    // image is an upload field — manual upload via /admin after migration
    accent: ind.accent,
    bgGradient: ind.bg,
  }))

  await migrateCollection(payload, 'projects', projects, (p) => ({
    slug: p.slug,
    title: p.title,
    overline: p.overline,
    headline: p.headline,
    summary: p.summary,
    year: parseInt(p.year, 10) || 2024,
    feature: !!p.feature,
    bg: p.bg,
    bigText: p.bigText,
    bigClass: p.bigClass,
    displayOrder: 0,
  }))

  await migrateCollection(
    payload,
    'testimonials',
    testimonials,
    (t, i) => ({
      quote: t.quote,
      headline: t.headline,
      name: t.name,
      role: t.role,
      initial: t.initial,
      project: t.project,
      year: t.year,
      displayOrder: i,
    }),
    'name',
  )

  await migrateCollection(
    payload,
    'clients',
    clients,
    (c, i) => ({
      name: c.name,
      wordmarkStyle: c.style,
      displayOrder: i,
      featured: i < 5,
    }),
    'name',
  )

  await migrateCollection(
    payload,
    'process',
    processSteps,
    (p, i) => ({
      num: p.num,
      title: p.title,
      description: p.desc,
      displayOrder: i,
    }),
    'num',
  )

  await migrateCollection(
    payload,
    'why-points',
    whyPoints,
    (w, i) => ({
      num: w.num,
      title: w.title,
      description: w.desc,
      displayOrder: i,
    }),
    'num',
  )

  await migrateCollection(
    payload,
    'authors',
    dedupeBy(posts.map((p) => p.author), 'name'),
    (a) => ({
      name: a.name,
      slug: a.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      role: a.role,
      initial: a.initial,
    }),
    'name',
  )

  // Pre-resolve author IDs by name — BlogPosts.author is a relationship
  const authorIdByName = await buildNameToIdMap(payload, 'authors')

  await migrateCollection(
    payload,
    'blog-posts',
    posts.filter((p) => !p.isStub),
    (post) => ({
      slug: post.slug,
      title: post.title,
      excerpt: truncate(post.excerpt, 200),
      body: mdToLexical(post.body),
      // coverImage is required — uploaded manually via /admin after migration
      coverImageAlt: post.title,
      category: post.category,
      primaryKeyword: post.primaryKeyword || '',
      publishDate: post.publishDate,
      status: 'published',
      readTime: post.readTime,
      wordCount: post.wordCount || 0,
      author: authorIdByName.get(post.author.name) ?? null,
    }),
    'slug',
    { draft: true }, // bypass required-field validation for missing coverImage
  )

  console.log('\n✅ Migration complete.\n')
  process.exit(0)
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

async function migrateCollection<T>(
  payload: Awaited<ReturnType<typeof getPayload>>,
  slug: string,
  items: T[],
  shape: (item: T, index: number) => Record<string, unknown>,
  uniqueField: string = 'slug',
  options: { draft?: boolean } = {},
) {
  console.log(`  → ${slug}: ${items.length} items`)
  let created = 0
  let skipped = 0
  let errored = 0

  for (let i = 0; i < items.length; i++) {
    const data = shape(items[i], i)
    const matchValue = data[uniqueField]

    try {
      if (matchValue && !FORCE) {
        const existing = await payload.find({
          collection: slug as never,
          where: { [uniqueField]: { equals: matchValue } } as never,
          limit: 1,
        })
        if (existing.docs.length > 0) {
          skipped++
          continue
        }
      }
      await payload.create({
        collection: slug as never,
        data: data as never,
        draft: options.draft,
      })
      created++
    } catch (e: unknown) {
      errored++
      const msg = e instanceof Error ? e.message : String(e)
      console.warn(`    ! ${slug}[${i}] (${matchValue}): ${msg.slice(0, 200)}`)
    }
  }
  console.log(`     ${created} created · ${skipped} skipped · ${errored} errored`)
}

/* ---------- Lookup helpers ---------- */

async function buildSlugToIdMap(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
): Promise<Map<string, unknown>> {
  const res = await payload.find({ collection: collection as never, limit: 200 })
  const map = new Map<string, unknown>()
  for (const doc of res.docs as Array<{ slug?: string; id: unknown }>) {
    if (doc.slug) map.set(doc.slug, doc.id)
  }
  return map
}

async function buildNameToIdMap(
  payload: Awaited<ReturnType<typeof getPayload>>,
  collection: string,
): Promise<Map<string, unknown>> {
  const res = await payload.find({ collection: collection as never, limit: 200 })
  const map = new Map<string, unknown>()
  for (const doc of res.docs as Array<{ name?: string; id: unknown }>) {
    if (doc.name) map.set(doc.name, doc.id)
  }
  return map
}

/* ---------- String + content helpers ---------- */

function truncate(s: string | undefined, max: number): string {
  if (!s) return ''
  if (s.length <= max) return s
  // Cut at the last word boundary that fits
  const cut = s.slice(0, max - 1)
  const lastSpace = cut.lastIndexOf(' ')
  return (lastSpace > max * 0.6 ? cut.slice(0, lastSpace) : cut).trimEnd() + '…'
}

/**
 * Convert plain markdown text into the minimal Lexical JSON shape Payload's
 * richText field accepts. We don't parse markdown syntax — we drop the entire
 * body into one paragraph node. The editor can re-format inside /admin.
 *
 * For full markdown→Lexical conversion later, swap this with Payload's
 * official converter from @payloadcms/richtext-lexical.
 */
function mdToLexical(markdown: string): unknown {
  const text = (markdown || '').trim()
  return {
    root: {
      type: 'root',
      format: '',
      indent: 0,
      version: 1,
      direction: 'ltr',
      children: text
        ? [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              direction: 'ltr',
              textFormat: 0,
              textStyle: '',
              children: [
                {
                  type: 'text',
                  format: 0,
                  style: '',
                  mode: 'normal',
                  text,
                  detail: 0,
                  version: 1,
                },
              ],
            },
          ]
        : [],
    },
  }
}

function dedupeBy<T extends Record<string, unknown>>(arr: T[], key: keyof T): T[] {
  const seen = new Set()
  return arr.filter((item) => {
    const v = item[key]
    if (seen.has(v)) return false
    seen.add(v)
    return true
  })
}

main().catch((err) => {
  console.error('\n❌ Migration failed:', err)
  process.exit(1)
})
