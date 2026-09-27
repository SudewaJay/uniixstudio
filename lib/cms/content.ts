import 'server-only'
import { cmsQuery, readOpts } from './cache'
import { imageSrc, resolveImage, str, type ResolvedImage } from './helpers'
import { getPayloadClient } from './payload'
import { collectionTag } from './tags'

/* ------------------------------ testimonials ------------------------------ */

export type TestimonialItem = {
  id: number
  quote: string
  headline?: string
  name: string
  role: string
  company?: string
  initial: string
  project?: string
  year?: string
  avatar?: string
  videoUrl?: string
  poster?: string
  featured: boolean
}

export function getTestimonials(): Promise<TestimonialItem[]> {
  return cmsQuery(['testimonials'], [collectionTag('testimonials')], async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'testimonials', ...readOpts(draft), depth: 1, sort: 'displayOrder', limit: 100 })
    return res.docs.map((t) => ({
      id: t.id,
      quote: t.quote,
      headline: str(t.headline),
      name: t.name,
      role: t.role ?? '',
      company: str(t.company),
      initial: t.initial || t.name.charAt(0),
      project: str(t.project),
      year: str(t.year),
      avatar: imageSrc(t.avatar, 'thumbnail'),
      videoUrl: str(t.videoUrl),
      poster: imageSrc(t.poster, 'card'),
      featured: Boolean(t.featured),
    }))
  })
}

/** Featured testimonials, or every testimonial when none are featured. */
export async function getFeaturedTestimonials(): Promise<TestimonialItem[]> {
  const all = await getTestimonials()
  const featured = all.filter((t) => t.featured)
  return featured.length ? featured : all
}

/* --------------------------------- clients -------------------------------- */

export type ClientLogo = { id: number; name: string; logo?: string; alt: string; style: string; website?: string; featured: boolean }

export function getClients(): Promise<ClientLogo[]> {
  return cmsQuery(['clients'], [collectionTag('clients')], async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'clients', ...readOpts(draft), depth: 1, sort: 'displayOrder', limit: 100 })
    return res.docs.map((c) => {
      const logo = resolveImage(c.logo)
      return {
        id: c.id,
        name: c.name,
        logo: logo?.src,
        alt: logo?.alt || `${c.name} logo`,
        style: c.wordmarkStyle || 'font-display tracking-[-0.02em]',
        website: str(c.website),
        featured: Boolean(c.featured),
      }
    })
  })
}

export async function getFeaturedClients(): Promise<ClientLogo[]> {
  const all = await getClients()
  const featured = all.filter((c) => c.featured)
  return featured.length ? featured : all
}

/* -------------------------------- process --------------------------------- */

export type ProcessStage = { id: number; num: string; title: string; desc: string; deliverables: string[] }

export function getProcess(): Promise<ProcessStage[]> {
  return cmsQuery(['process'], [collectionTag('process')], async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'process', ...readOpts(draft), sort: 'displayOrder', limit: 20 })
    return res.docs.map((p) => ({ id: p.id, num: p.num, title: p.title, desc: p.description, deliverables: p.deliverables ?? [] }))
  })
}

/* ------------------------------- why points ------------------------------- */

export type WhyPoint = { num: string; title: string; instead?: string; desc: string }

export function getWhyPoints(): Promise<WhyPoint[]> {
  return cmsQuery(['why-points'], [collectionTag('why-points')], async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'why-points', ...readOpts(draft), sort: 'displayOrder', limit: 20 })
    return res.docs.map((p) => ({ num: p.num, title: p.title, instead: str(p.instead), desc: p.description }))
  })
}

/* ---------------------------------- team ---------------------------------- */

export type TeamMember = {
  id: number
  name: string
  role: string
  bio?: string
  initial: string
  photo?: ResolvedImage
  skills: string[]
  links: Array<{ label: string; href: string }>
  featured: boolean
}

export function getTeam(): Promise<TeamMember[]> {
  return cmsQuery(['team'], [collectionTag('team')], async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'team', ...readOpts(draft), depth: 1, sort: 'displayOrder', limit: 100 })
    return res.docs.map((m) => ({
      id: m.id,
      name: m.name,
      role: m.role,
      bio: str(m.bio),
      initial: m.initial || m.name.charAt(0),
      photo: resolveImage(m.photo, 'card'),
      skills: m.skills ?? [],
      links: (m.socialLinks ?? []).filter((l) => l.label && l.href).map((l) => ({ label: l.label!, href: l.href! })),
      featured: Boolean(m.featured),
    }))
  })
}
