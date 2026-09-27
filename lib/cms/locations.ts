import 'server-only'
import type { Location as CmsLocation, LocationPage, Pillar, Service } from '@/payload-types'
import type { Location } from '@/lib/locations'
import type { LocationService } from '@/lib/location-services'
import { cmsQuery, readOpts } from './cache'
import { docs, isDoc } from './helpers'
import { getPayloadClient } from './payload'
import { collectionTag } from './tags'

const TAGS = [collectionTag('locations'), collectionTag('location-pages'), collectionTag('services'), collectionTag('blog-posts')]

const serviceKey = (s: Service | number | null | undefined) =>
  isDoc(s ?? null) && isDoc((s as Service).pillar)
    ? { pillar: ((s as Service).pillar as Pillar).slug, slug: (s as Service).slug, name: (s as Service).name }
    : undefined

function toLocation(doc: CmsLocation): Location {
  return {
    slug: doc.slug,
    name: doc.name,
    district: doc.district,
    geo: { lat: doc.geo.lat, lng: doc.geo.lng },
    metaDescription: doc.seo?.metaDescription || doc.lede,
    lede: doc.lede,
    intro: (doc.intro ?? []).map((p) => p.paragraph),
    localAngle: doc.localAngle,
    keyIndustries: doc.keyIndustries ?? [],
    landmarks: doc.landmarks ?? [],
    featuredServices: (doc.featuredServices ?? [])
      .map((f) => {
        const key = serviceKey(f.service)
        return key ? { pillar: key.pillar, slug: key.slug, label: f.label || key.name } : null
      })
      .filter((f): f is NonNullable<typeof f> => f !== null),
    faqs: (doc.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer })),
    relatedPosts: docs(doc.relatedPosts).map((p) => p.slug),
    seo: doc.seo ?? undefined,
  }
}

function toLocationService(doc: LocationPage): LocationService | undefined {
  const area = isDoc(doc.location) ? doc.location.slug : undefined
  const key = serviceKey(doc.service)
  if (!area || !key) return undefined
  return {
    area,
    service: key.slug,
    pillar: key.pillar,
    serviceLabel: doc.serviceLabel,
    h1: doc.h1,
    metaTitle: doc.seo?.metaTitle || doc.h1,
    metaDescription: doc.seo?.metaDescription || doc.lede,
    lede: doc.lede,
    intro: (doc.intro ?? []).map((p) => p.paragraph),
    benefits: (doc.benefits ?? []).map((b) => ({ title: b.title, body: b.body })),
    faqs: (doc.faqs ?? []).map((f) => ({ question: f.question, answer: f.answer })),
    seo: doc.seo ?? undefined,
  }
}

export function getLocations(): Promise<Location[]> {
  return cmsQuery(['locations'], TAGS, async (draft) => {
    const payload = await getPayloadClient()
    const res = await payload.find({ collection: 'locations', ...readOpts(draft), depth: 2, sort: 'displayOrder', limit: 200 })
    return res.docs.map(toLocation)
  })
}

export async function getLocation(slug: string): Promise<Location | undefined> {
  return (await getLocations()).find((l) => l.slug === slug)
}

export function getLocationServices(): Promise<LocationService[]> {
  return cmsQuery(['location-pages'], TAGS, async (draft) => {
    try {
      const payload = await getPayloadClient()
      const res = await payload.find({ collection: 'location-pages', ...readOpts(draft), depth: 2, limit: 500, pagination: false })
      return res.docs.map(toLocationService).filter((l): l is LocationService => Boolean(l))
    } catch (err) {
      console.warn('getLocationServices failed:', err)
      return []
    }
  })
}

export async function getLocationService(area: string, service: string): Promise<LocationService | undefined> {
  return (await getLocationServices()).find((l) => l.area === area && l.service === service)
}

export async function locationServicesFor(area: string): Promise<LocationService[]> {
  return (await getLocationServices()).filter((l) => l.area === area)
}
