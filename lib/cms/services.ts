import { getPayload } from './client'
import type { Pillar, Service, ServicePillar } from '../services'

export async function getPillars(): Promise<Pillar[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'pillars',
    limit: 100,
  })
  return res.docs.map(doc => ({
    slug: doc.slug as ServicePillar,
    label: doc.label,
    tagline: doc.tagline || '',
    description: doc.description || '',
    accent: doc.accentColor || '',
  }))
}

export async function getPillar(slug: string): Promise<Pillar | undefined> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'pillars',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = res.docs[0]
  if (!doc) return undefined
  
  return {
    slug: doc.slug as ServicePillar,
    label: doc.label,
    tagline: doc.tagline || '',
    description: doc.description || '',
    accent: doc.accentColor || '',
  }
}

export async function getServices(): Promise<Service[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'services',
    limit: 100,
    sort: 'displayOrder',
  })
  
  return res.docs.map(doc => {
    const pillarSlug = typeof doc.pillar === 'object' && doc.pillar !== null ? doc.pillar.slug : doc.pillar
    
    return {
      slug: doc.slug,
      pillar: pillarSlug as ServicePillar,
      name: doc.name,
      rawName: doc.rawName || doc.name,
      pageTitle: doc.pageTitle || '',
      metaDescription: doc.metaDescription || '',
      body: JSON.stringify(doc.body), // Serialize Lexical JSON to string to satisfy type, user may need a renderer component
      faqs: doc.faqs || [],
    }
  })
}

export async function getService(pillar: string, slug: string): Promise<Service | undefined> {
  const payload = await getPayload()
  // Since slug is unique within the collection, we can just query by slug
  const res = await payload.find({
    collection: 'services',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  const doc = res.docs[0]
  if (!doc) return undefined
  
  const pillarSlug = typeof doc.pillar === 'object' && doc.pillar !== null ? doc.pillar.slug : doc.pillar
  if (pillarSlug !== pillar) return undefined
  
  return {
    slug: doc.slug,
    pillar: pillarSlug as ServicePillar,
    name: doc.name,
    rawName: doc.rawName || doc.name,
    pageTitle: doc.pageTitle || '',
    metaDescription: doc.metaDescription || '',
    body: JSON.stringify(doc.body),
    faqs: doc.faqs || [],
  }
}

export async function getServicesForPillar(pillar: string): Promise<Service[]> {
  const allServices = await getServices()
  return allServices.filter(s => s.pillar === pillar)
}
