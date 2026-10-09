/**
 * Content migration: repo files → Payload CMS.
 *
 * Source of truth before the CMS: content/**\/*.mdx plus the TS data modules in
 * lib/ (blog, services, content, industries, locations, location-services).
 * Those files are NOT deleted — they remain the seed source and history.
 *
 * Usage (Node 20+, env from .env). `payload run` strips --flags, so options are env vars:
 *   npm run cms:seed                          create missing documents only (safe default)
 *   SEED_UPDATE_EXISTING=1 npm run cms:seed   also overwrite documents matched by slug
 *   SEED_DRY_RUN=1 npm run cms:seed           report what would happen, write nothing
 *
 * Idempotent: documents are matched by slug (or natural key), never duplicated.
 * Globals are only written when empty, or with --update-existing.
 */
import 'dotenv/config'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { getPayload, type CollectionSlug, type Payload, type Where } from 'payload'
import { convertMarkdownToLexical, type SanitizedServerEditorConfig } from '@payloadcms/richtext-lexical'
import config from '../../payload.config'
import { normalizeMarkdownForLexical } from './markdown'
import { slugify } from '../../payload/fields/validators'

import { posts as generatedPosts } from '../../lib/blog'
import { pillars as pillarData, services as generatedServices } from '../../lib/services'
import type { Service as FileService } from '../../lib/services'
import type { Project as FileProject, NarrativeBlock } from '../../lib/projects'
import {
  site,
  nav as navData,
  clients as clientData,
  services as pillarCopy,
  projects as legacyProjects,
  testimonials as testimonialData,
  process as processData,
  whyPoints as whyData,
} from '../../lib/content'
import { industries as industryData } from '../../lib/industries'
import { locations as locationData } from '../../lib/locations'
import { locationServices as locationServiceData } from '../../lib/location-services'
import { SERVICE_LINK_MAP } from '../../lib/service-links'

const UPDATE = process.env.SEED_UPDATE_EXISTING === '1'
const DRY = process.env.SEED_DRY_RUN === '1'
const ROOT = process.cwd()
const ctx = { disableRevalidate: true }

type Stats = Record<string, { created: number; updated: number; skipped: number }>
const stats: Stats = {}
const bump = (c: string, k: 'created' | 'updated' | 'skipped') => {
  stats[c] ??= { created: 0, updated: 0, skipped: 0 }
  stats[c][k]++
}
const warnings: string[] = []

let payload: Payload
let editorConfig: SanitizedServerEditorConfig

/* --------------------------------- helpers --------------------------------- */

const md = (markdown: string | undefined) =>
  markdown?.trim() ? convertMarkdownToLexical({ editorConfig, markdown: normalizeMarkdownForLexical(markdown) }) : undefined

const img = (url: string | undefined, alt: string, caption?: string) => (url ? { url, alt, ...(caption ? { caption } : {}) } : undefined)

const readMdx = (dir: string) =>
  fs.existsSync(dir)
    ? fs
        .readdirSync(dir)
        .filter((f) => /\.mdx?$/.test(f))
        .map((f) => ({ file: f, ...matter(fs.readFileSync(path.join(dir, f), 'utf8')) }))
    : []

/**
 * Create or (optionally) update one document. Returns its id.
 * `status` applies to versioned collections only.
 */
async function upsert(
  collection: CollectionSlug,
  where: Where,
  data: Record<string, unknown>,
  status?: 'published' | 'draft',
): Promise<number | undefined> {
  const found = await payload.find({ collection, where, limit: 1, depth: 0, draft: true, overrideAccess: true, context: ctx })
  const existing = found.docs[0] as { id: number } | undefined
  const withStatus = status ? { ...data, _status: status } : data
  const draft = status === 'draft'
  if (existing && !UPDATE) {
    bump(collection, 'skipped')
    return existing.id
  }
  if (DRY) {
    bump(collection, existing ? 'updated' : 'created')
    return existing?.id ?? -1
  }
  try {
    if (existing) {
      await payload.update({ collection, id: existing.id, data: withStatus, draft, overrideAccess: true, context: ctx })
      bump(collection, 'updated')
      return existing.id
    }
    const doc = await payload.create({ collection, data: withStatus, draft, overrideAccess: true, context: ctx })
    bump(collection, 'created')
    return doc.id as number
  } catch (err) {
    warnings.push(`${collection} ${JSON.stringify(where)}: ${(err as Error).message}`)
    return existing?.id
  }
}

async function upsertGlobal(slug: 'settings' | 'nav' | 'footer' | 'promo-bar' | 'stats' | 'homepage' | 'about', isEmpty: (doc: Record<string, unknown>) => boolean, data: Record<string, unknown>) {
  const current = (await payload.findGlobal({ slug, depth: 0, draft: true, overrideAccess: true })) as unknown as Record<string, unknown>
  if (!UPDATE && !isEmpty(current)) return bump(`global:${slug}`, 'skipped')
  if (DRY) return bump(`global:${slug}`, 'updated')
  const versioned = slug === 'homepage' || slug === 'about'
  await payload.updateGlobal({
    slug,
    data: versioned ? { ...data, _status: 'published' } : data,
    overrideAccess: true,
    context: ctx,
  })
  bump(`global:${slug}`, 'updated')
}

const ids = {
  pillars: new Map<string, number>(),
  services: new Map<string, number>(), // key: slug
  industries: new Map<string, number>(),
  projects: new Map<string, number>(),
  authors: new Map<string, number>(),
  posts: new Map<string, number>(),
  locations: new Map<string, number>(),
}

const serviceIdFromHref = (href: string | undefined) => {
  const m = href?.match(/^\/services\/[a-z-]+\/([a-z0-9-]+)\/?$/)
  return m ? ids.services.get(m[1]) : undefined
}

/* ------------------------------ file readers ------------------------------ */

function fileServices(): FileService[] {
  const out: FileService[] = []
  const base = path.join(ROOT, 'content', 'services')
  for (const pillar of fs.existsSync(base) ? fs.readdirSync(base) : []) {
    for (const { file, data, content } of readMdx(path.join(base, pillar))) {
      out.push({ ...(data as FileService), slug: data.slug ?? file.replace(/\.mdx?$/, ''), rawName: data.rawName ?? data.name, body: content })
    }
  }
  const keys = new Set(out.map((s) => `${s.pillar}:${s.slug}`))
  return [...out, ...generatedServices.filter((s) => !keys.has(`${s.pillar}:${s.slug}`))]
}

function fileProjects(): FileProject[] {
  const mdx = readMdx(path.join(ROOT, 'content', 'projects')).map(
    ({ file, data, content }) => ({ ...(data as FileProject), slug: data.slug ?? file.replace(/\.mdx?$/, ''), body: content, hasDetail: true }),
  )
  const seen = new Set(mdx.map((p) => p.slug))
  return [...mdx, ...legacyProjects.filter((p) => !seen.has(p.slug)).map((p) => ({ ...p, hasDetail: false }) as FileProject)]
}

type FilePost = (typeof generatedPosts)[number] & Record<string, unknown>

function filePosts(): FilePost[] {
  const mdx = readMdx(path.join(ROOT, 'content', 'blog')).map(({ file, data, content }) => {
    const words = content.trim().split(/\s+/).length
    return {
      ...data,
      id: 0,
      slug: data.slug ?? file.replace(/\.mdx?$/, ''),
      title: data.title,
      excerpt: data.excerpt ?? content.trim().slice(0, 200) + '…',
      metaDescription: data.metaDescription ?? data.excerpt ?? data.title,
      primaryKeyword: data.primaryKeyword ?? '',
      category: data.category ?? 'Insights',
      publishDate: String(data.publishDate instanceof Date ? data.publishDate.toISOString() : data.publishDate),
      wordCount: words,
      readTime: '',
      coverImage: data.coverImage ?? 'https://images.unsplash.com/photo-1561070791-2526d30994b8?w=1600&q=80&auto=format&fit=crop',
      author: { name: data.author?.name ?? 'Uniix Studio', role: data.author?.role ?? 'Founder · Uniix Studio', initial: data.author?.initial ?? 'S' },
      body: content,
      ctaBlock: data.ctaBlock ?? '',
      isStub: words < 200,
      faqs: data.faqs,
    } as FilePost
  })
  const seen = new Set(mdx.map((p) => p.slug))
  return [...mdx, ...(generatedPosts as FilePost[]).filter((p) => !seen.has(p.slug))]
}

/* --------------------------------- seeders --------------------------------- */

async function seedPillars() {
  for (const [i, p] of pillarData.entries()) {
    const copy = pillarCopy.find((c) => c.slug === p.slug)
    const id = await upsert('pillars', { slug: { equals: p.slug } }, {
      slug: p.slug,
      label: p.label,
      tagline: p.tagline,
      description: p.description,
      accentColor: p.accent,
      num: copy?.num,
      // Matches the /services hub wording (the homepage copy said "Tech built…").
      headline: p.slug === 'technology' ? 'Technology built to scale.' : copy?.headline,
      positioning: copy?.positioning,
      capabilities: copy?.items.map((it) => ({ name: it.name, description: it.desc })),
      displayOrder: i,
    })
    if (id) ids.pillars.set(p.slug, id)
  }
}

/** Homepage reading order (was hard-coded in components/home/IndustryIndex.tsx). */
const INDUSTRY_ORDER = ['education', 'healthcare', 'real-estate', 'ecommerce', 'corporate', 'travel', 'finance', 'startups']

async function seedIndustries() {
  const ordered = [...industryData].sort((a, b) => INDUSTRY_ORDER.indexOf(a.slug) - INDUSTRY_ORDER.indexOf(b.slug))
  for (const [i, ind] of ordered.entries()) {
    const id = await upsert('industries', { slug: { equals: ind.slug } }, {
      slug: ind.slug,
      name: ind.name,
      description: ind.description,
      image: img(ind.image, `${ind.name} — Uniix Studio industry`),
      accent: ind.accent,
      bgGradient: ind.bg,
      displayOrder: i,
    })
    if (id) ids.industries.set(ind.slug, id)
  }
}

async function seedServices() {
  const all = fileServices()
  for (const [i, s] of all.entries()) {
    const id = await upsert('services', { slug: { equals: s.slug } }, {
      slug: s.slug,
      pillar: ids.pillars.get(s.pillar),
      name: s.name,
      rawName: s.rawName,
      pageTitle: s.pageTitle,
      body: md(s.body),
      coverImage: img(s.coverImage, `${s.rawName} by Uniix Studio`),
      process: s.process?.map((p) => ({ title: p.title, detail: p.detail, duration: p.duration })),
      deliverables: s.deliverables?.map((d) => ({ name: d.name, description: d.description })),
      pricingTiers: s.pricingTiers?.map((t) => ({ ...t, highlight: Boolean(t.highlight) })),
      faqs: s.faqs,
      relatedReading: s.relatedReading,
      videos: s.videos?.map((v) => ({ ...v, uploadDate: v.uploadDate ? new Date(v.uploadDate).toISOString() : undefined })),
      seo: { metaTitle: s.pageTitle.length <= 70 ? s.pageTitle : undefined, metaDescription: s.metaDescription.slice(0, 200) },
      displayOrder: i,
    }, 'published')
    if (id) ids.services.set(s.slug, id)
  }
}

function narrative(blocks: NarrativeBlock[] | undefined) {
  return blocks?.map((b) => {
    const { kind, ...rest } = b
    const blockType = {
      brief: 'narrativeBrief',
      approach: 'narrativeApproach',
      ia: 'narrativeIa',
      pillars: 'narrativePillars',
      outcome: 'narrativeOutcome',
    }[kind]
    return { blockType, ...rest }
  })
}

/** Homepage industry proof (formerly hard-coded in app/(site)/page.tsx). */
const INDUSTRY_PROJECT: Record<string, string> = {
  healthcare: 'st-lukes-medilab',
  travel: 'rentmycar-lk',
  corporate: 'ecowave-energy',
}

async function seedProjects() {
  const CURATED_ORDER = ['cricbook', 'bilesma-natural', 'bilesma-natural-social-media', 'rentmycar-lk', 'st-lukes-medilab', 'ecowave-energy', 'sierra-energy-solutions', 'zerro', 'wasana', 'terraflow', 'coventry']
  for (const p of fileProjects()) {
    const order = CURATED_ORDER.indexOf(p.slug)
    const industrySlug = Object.entries(INDUSTRY_PROJECT).find(([, slug]) => slug === p.slug)?.[0]
    const serviceIds = [...new Set((p.services ?? []).map((n) => serviceIdFromHref(SERVICE_LINK_MAP[n])).filter(Boolean))]
    const id = await upsert('projects', { slug: { equals: p.slug } }, {
      slug: p.slug,
      title: p.title,
      overline: p.overline,
      headline: p.headline,
      summary: p.summary,
      coverImage: img(p.coverImage, `${p.title} — cover`),
      heroOverlay: Boolean(p.heroOverlay),
      client: p.client,
      year: p.year ? Number(p.year) : undefined,
      location: p.location,
      industryLabel: p.industry,
      liveUrl: p.url,
      tags: p.tags,
      audienceTier: p.audienceTier,
      serviceTags: p.services,
      deliverables: p.deliverables,
      bg: p.bg,
      bigText: p.bigText,
      bigClass: p.bigClass,
      problem: p.problem,
      solution: p.solution,
      result: p.result,
      metrics: p.stats?.map((s) => ({ value: s.value, label: s.label })),
      narrative: narrative(p.narrative),
      body: md(p.narrative?.length ? undefined : p.body),
      contentBlocks: p.contentBlocks?.map((b) => ({
        heading: b.heading,
        body: b.body,
        image: img(b.image, b.imageAlt ?? b.heading),
        imagePosition: b.imagePosition ?? 'left',
      })),
      testimonial: p.testimonial,
      faqs: p.faqs,
      designRationale: p.designRationale,
      colorPalette: p.colorPalette,
      typography: p.typography,
      uiPrinciples: p.uiPrinciples,
      motionPrinciples: p.motionPrinciples,
      techStack: p.techStack,
      wireframes: p.wireframes?.map((w, i) => ({ image: img(w.src, w.alt ?? w.caption ?? `${p.title} wireframe ${i + 1}`), caption: w.caption })),
      gallery: p.gallery?.map((src, i) => ({ image: img(src, `${p.title} — View ${String(i + 1).padStart(2, '0')}`) })),
      galleryAspect: p.galleryAspect?.replace(/\s+/g, ''),
      galleryHeading: p.galleryHeading,
      socialGallery: p.socialGallery?.map((src, i) => ({ image: img(src, `${p.title} — social design ${i + 1}`) })),
      socialGalleryHeading: p.socialGalleryHeading,
      socialCampaign: p.socialCampaign
        ? {
            title: p.socialCampaign.title,
            description: p.socialCampaign.description,
            images: p.socialCampaign.images.map((i) => ({ image: img(i.src, i.alt), label: i.label })),
          }
        : undefined,
      videos: p.videos?.map((v) => ({ ...v, uploadDate: v.uploadDate ? new Date(v.uploadDate).toISOString() : undefined })),
      industry: industrySlug ? ids.industries.get(industrySlug) : undefined,
      services: serviceIds,
      hasCaseStudy: p.hasDetail,
      feature: Boolean(p.feature),
      displayOrder: order === -1 ? 100 : order,
      seo: {
        metaTitle: p.seoTitle,
        metaDescription: p.seoDescription?.slice(0, 170),
        ogImage: p.ogImage ? img(p.ogImage, `${p.title} case study`) : undefined,
      },
    }, 'published')
    if (id) ids.projects.set(p.slug, id)
  }
  // Industry → project back-links.
  for (const [industry, project] of Object.entries(INDUSTRY_PROJECT)) {
    const iid = ids.industries.get(industry), pid = ids.projects.get(project)
    if (iid && pid && !DRY && (UPDATE || stats['industries']?.created)) {
      await payload.update({ collection: 'industries', id: iid, data: { caseStudies: [pid] }, overrideAccess: true, context: ctx })
    }
  }
}

async function seedSimpleCollections() {
  for (const [i, t] of testimonialData.entries()) {
    await upsert('testimonials', { name: { equals: t.name } }, { ...t, featured: true, displayOrder: i })
  }
  for (const [i, c] of clientData.entries()) {
    await upsert('clients', { name: { equals: c.name } }, {
      name: c.name,
      logo: img(c.logo, `${c.name} logo`),
      wordmarkStyle: c.style,
      featured: true,
      displayOrder: i,
    })
  }
  for (const [i, p] of processData.entries()) {
    await upsert('process', { num: { equals: p.num } }, { num: p.num, title: p.title, description: p.desc, deliverables: p.deliverables, displayOrder: i })
  }
  for (const [i, w] of whyData.entries()) {
    await upsert('why-points', { num: { equals: w.num } }, { num: w.num, title: w.title, instead: w.instead, description: w.desc, displayOrder: i })
  }
  await upsert('team', { slug: { equals: 'uniix-studio-founder' } }, {
    slug: 'uniix-studio-founder',
    name: 'Uniix Studio',
    role: 'Founder · Creative Director',
    department: 'Leadership',
    initial: 'S',
    bio: 'Founder of Uniix Studio. Leads creative direction across brand identity, web and digital strategy. Works directly with every client from kickoff through launch.',
    featured: true,
    displayOrder: 0,
  })
}

async function seedBlog() {
  const all = filePosts()
  for (const a of new Map(all.map((p) => [p.author.name, p.author])).values()) {
    const id = await upsert('authors', { slug: { equals: slugify(a.name) } }, { name: a.name, slug: slugify(a.name), role: a.role, initial: a.initial })
    if (id) ids.authors.set(a.name, id)
  }
  for (const p of all) {
    const e = p as FilePost & {
      layout?: string; seoTitle?: string; updatedDate?: string; coverAlt?: string; coverCaption?: string; ogImage?: string
      secondaryKeywords?: string[]; keyTakeaways?: string[]; relatedServices?: string[]; ctaHeading?: string; ctaLabel?: string; ctaHref?: string; faqSchema?: boolean
    }
    const id = await upsert('blog-posts', { slug: { equals: p.slug } }, {
      slug: p.slug,
      title: p.title,
      excerpt: (p.excerpt || p.metaDescription).slice(0, 320),
      coverImage: img(p.coverImage, e.coverAlt || p.title, e.coverCaption),
      body: md(p.body),
      author: ids.authors.get(p.author.name),
      category: ['Design', 'Technology', 'Growth', 'Insights'].includes(p.category) ? p.category : 'Insights',
      publishDate: new Date(p.publishDate).toISOString(),
      updatedDate: e.updatedDate ? new Date(e.updatedDate).toISOString() : undefined,
      layout: e.layout === 'editorial' ? 'editorial' : 'standard',
      keyTakeaways: e.keyTakeaways,
      ctaBlock: p.ctaBlock || undefined,
      ctaHeading: e.ctaHeading,
      ctaLabel: e.ctaLabel,
      ctaHref: e.ctaHref,
      faqs: p.faqs,
      faqSchema: e.faqSchema === true,
      primaryKeyword: p.primaryKeyword,
      secondaryKeywords: e.secondaryKeywords,
      relatedServices: (e.relatedServices ?? []).map((k) => ids.services.get(k.split('/')[1])).filter(Boolean),
      seo: {
        metaTitle: e.seoTitle,
        metaDescription: p.metaDescription?.slice(0, 170),
        ogImage: e.ogImage ? img(e.ogImage, p.title) : undefined,
      },
    }, p.isStub ? 'draft' : 'published')
    if (id) ids.posts.set(p.slug, id)
  }
  // Second pass: post → post relations need every post to exist first.
  if (!DRY) {
    for (const p of all) {
      const related = ((p as { relatedPosts?: string[] }).relatedPosts ?? []).map((s) => ids.posts.get(s)).filter(Boolean)
      const id = ids.posts.get(p.slug)
      if (id && related.length && (UPDATE || stats['blog-posts']?.created)) {
        await payload.update({ collection: 'blog-posts', id, data: { relatedPosts: related }, draft: p.isStub, overrideAccess: true, context: ctx })
      }
    }
  }
}

async function seedLocations() {
  for (const [i, l] of locationData.entries()) {
    const id = await upsert('locations', { slug: { equals: l.slug } }, {
      slug: l.slug,
      name: l.name,
      district: l.district,
      geo: { lat: l.geo.lat, lng: l.geo.lng },
      lede: l.lede,
      intro: l.intro.map((paragraph) => ({ paragraph })),
      localAngle: l.localAngle,
      keyIndustries: l.keyIndustries,
      landmarks: l.landmarks,
      featuredServices: l.featuredServices
        .map((f) => ({ service: ids.services.get(f.slug), label: f.label }))
        .filter((f) => f.service),
      relatedPosts: l.relatedPosts.map((s) => ids.posts.get(s)).filter(Boolean),
      faqs: l.faqs,
      seo: { metaDescription: l.metaDescription },
      displayOrder: i,
    })
    if (id) ids.locations.set(l.slug, id)
  }
  for (const ls of locationServiceData) {
    const location = ids.locations.get(ls.area), service = ids.services.get(ls.service)
    if (!location || !service) {
      warnings.push(`location-page ${ls.area}/${ls.service}: missing location or service`)
      continue
    }
    await upsert('location-pages', { and: [{ location: { equals: location } }, { service: { equals: service } }] }, {
      location,
      service,
      serviceLabel: ls.serviceLabel,
      h1: ls.h1,
      lede: ls.lede,
      intro: ls.intro.map((paragraph) => ({ paragraph })),
      benefits: ls.benefits,
      faqs: ls.faqs,
      seo: { metaTitle: ls.metaTitle, metaDescription: ls.metaDescription },
    })
  }
}

async function seedGlobals() {
  await upsertGlobal('settings', (d) => !d.email || d.email === 'hello@uniixstudio.com', {
    siteName: site.name,
    tagline: site.tagline,
    metaDescription: site.description,
    email: site.email,
    phone: site.phone,
    whatsapp: site.whatsapp,
    whatsappLink: site.whatsappLink,
    location: site.location,
    address: {
      streetAddress: site.businessAddress.streetAddress || undefined,
      addressLocality: site.businessAddress.addressLocality,
      addressRegion: site.businessAddress.addressRegion,
      postalCode: site.businessAddress.postalCode || undefined,
      addressCountry: site.businessAddress.addressCountry,
      lat: site.businessAddress.geo.lat,
      lng: site.businessAddress.geo.lng,
    },
    socials: {
      instagram: site.socials.instagram,
      facebook: site.socials.facebook,
      linkedin: site.socials.linkedin,
      behance: 'https://www.behance.net/uniixstudio',
      dribbble: 'https://dribbble.com/uniixstudio',
    },
  })
  await upsertGlobal('nav', (d) => !(d.items as unknown[])?.length, {
    items: navData.map((n) => ({ label: n.label, href: n.href })),
    ctaLabel: 'Start a project',
    ctaHref: '/contact',
  })
  await upsertGlobal('footer', (d) => !(d.links as unknown[])?.length, {
    locationsLabel: 'Areas we serve',
    ctaHeading: 'Get in Touch',
    ctaHref: '/contact',
    description: 'Studio based in Colombo — we design brands that perform across Sri Lanka, Australia and the UK.',
    links: [
      { label: 'Home', href: '/' },
      { label: 'Services', href: '/services' },
      { label: 'Work', href: '/portfolio' },
      { label: 'Insights', href: '/blog' },
      { label: 'About', href: '/about' },
      { label: 'Finland', href: '/finland' },
      { label: 'Contact', href: '/contact' },
    ],
    showLocations: true,
    copyright: 'Uniix Studio © {year} · All rights reserved',
  })
  await upsertGlobal('promo-bar', (d) => !(d.taglines as unknown[])?.length, {
    enabled: true,
    rotateInterval: 3800,
    taglines: [
      'Creative Digital Agency · Colombo · Working globally',
      'Brand identities · Performance websites · Growth systems',
      '50+ projects shipped · 3× average traffic lift in 90 days',
      'Available for Q3 2026 — 2 slots left',
    ].map((text) => ({ text })),
  })
  await upsertGlobal('stats', (d) => !(d.entries as unknown[])?.length, {
    entries: [
      { value: '3×', label: 'Average traffic lift', description: 'Within 90 days of launch, across selected projects.' },
      { value: '4+', label: 'Years building', description: 'Selected work since 2022 across Sri Lanka, Australia and the UK.' },
      { value: '8', label: 'Industries served', description: 'From healthcare and education to fintech, travel and SaaS.' },
    ],
  })
  const pid = (s: string) => ids.projects.get(s)
  await upsertGlobal('homepage', (d) => !(d.featuredWork as unknown[])?.length, {
    brandStatement: {
      body: 'Most agencies bolt these together from three different teams. We run them as one, so your brand, your site and your marketing all pull in the same direction — and nothing gets lost in the handoff.',
      trustLine: 'Trusted by ambitious teams across Colombo, Sydney & the UK',
    },
    pillars: { eyebrow: 'What we do', heading: 'Three disciplines.', headingAccent: 'One accountable team.', support: 'Open a discipline to see what sits inside it — and a project where we shipped it.' },
    work: { eyebrow: 'Selected work', heading: "Brands we're", headingAccent: 'proud of.' },
    industries: { eyebrow: 'Industries', heading: 'Built for', headingAccent: 'different worlds.' },
    process: { eyebrow: 'How we work', heading: 'Four stages.', headingAccent: 'No surprises.', support: 'Clear deliverables at every stage, fixed milestones and honest dates.' },
    why: { eyebrow: 'Why Uniix', heading: 'A studio built', headingAccent: 'for serious work.', support: 'A small, senior team in Colombo working with clients across South Asia, Australia and the UK.' },
    results: { eyebrow: 'Results', heading: 'Creative work,', headingAccent: 'measured.', support: 'Every project ties creative decisions back to a business outcome — not to impressions and likes.' },
    clientStories: { eyebrow: 'Client stories', heading: 'What clients actually say.' },
    insights: { eyebrow: 'Insights', heading: 'Field notes for', headingAccent: 'ambitious teams.' },
    featuredWork: ['cricbook', 'rentmycar-lk', 'st-lukes-medilab', 'ecowave-energy'].map(pid).filter(Boolean),
    pillarProof: [
      { pillar: ids.pillars.get('design'), project: pid('ecowave-energy'), evidence: 'Brand Identity' },
      { pillar: ids.pillars.get('growth'), project: pid('st-lukes-medilab'), evidence: 'Local SEO' },
      { pillar: ids.pillars.get('technology'), project: pid('rentmycar-lk'), evidence: 'Web Development' },
    ].filter((r) => r.pillar && r.project),
    industryProof: [
      ...Object.entries(INDUSTRY_PROJECT).map(([i, p]) => ({ industry: ids.industries.get(i), project: pid(p) })),
      { industry: ids.industries.get('startups'), filmVimeoId: '1201632698' }, // PromptLime Commercial
    ].filter((r) => r.industry),
  })
  await upsertGlobal('about', (d) => !(d.hero as { heading?: string } | undefined)?.heading, {
    hero: {
      eyebrow: 'About Uniix Studio',
      heading: 'A studio for',
      headingAccent: 'work that lasts.',
      lede: 'We design brand identities, build performance websites, and grow businesses through data-driven marketing — all under one roof. Founded in Colombo, working globally, optimising for the long game.',
    },
    story: {
      eyebrow: 'Our story',
      paragraphs: [
        "Uniix Studio started with a simple frustration: most agencies in our market treat design, growth and tech as separate disciplines bolted together at the invoice. The result is brands that look good but don't convert, websites that win awards but lose revenue, and campaigns that report impressions instead of outcomes.",
        'We wanted to build something different — a studio where the strategist, the designer, the developer and the marketer are talking to each other every day, working from the same brief, optimising for the same business goal.',
        'Today we work with founders, marketers and operators across Sri Lanka, Australia and the UK — from launch-stage startups to established companies looking to modernise. The thread between every project: we measure success in business outcomes, not deliverables.',
      ].map((paragraph) => ({ paragraph })),
    },
    mission: {
      eyebrow: 'Mission',
      heading: 'Make great design',
      headingAccent: 'accountable.',
      body: 'We exist to give ambitious companies a creative partner who treats design and growth as the same conversation — and ties every output back to a measurable business goal.',
    },
    vision: {
      eyebrow: 'Vision',
      heading: 'The studio brands',
      headingAccent: 'grow up with.',
      body: 'To build a creative studio that South Asian and Australian companies return to for every chapter of their growth — from first logo to flagship product.',
    },
    team: {
      eyebrow: 'The team',
      heading: 'Senior people.',
      headingAccent: 'Direct lines.',
      support: 'A small, deliberately senior team. You work with the people building your project — not a sales team that hands you off after signing.',
    },
    why: { eyebrow: 'Why choose us', heading: 'Five reasons', headingAccent: 'clients stay.' },
  })
}

/* ----------------------------------- run ----------------------------------- */

async function main() {
  payload = await getPayload({ config })
  editorConfig = (payload.config.editor as unknown as { editorConfig: SanitizedServerEditorConfig }).editorConfig
  console.log(`\nSeeding Uniix CMS  (update-existing=${UPDATE} dry-run=${DRY})\n`)

  await seedPillars()
  await seedIndustries()
  await seedServices()
  await seedProjects()
  await seedSimpleCollections()
  await seedBlog()
  await seedLocations()
  await seedGlobals()

  console.table(stats)
  if (warnings.length) {
    console.log(`\n${warnings.length} warning(s):`)
    for (const w of warnings) console.log('  ·', w)
    process.exitCode = 1
  }
  process.exit()
}

// Top-level await: `payload run` resolves as soon as the module evaluates.
try {
  await main()
} catch (err) {
  console.error(err)
  process.exit(1)
}
