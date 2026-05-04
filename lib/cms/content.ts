import { getPayload } from './client'

export async function getSiteSettings(): Promise<any> {
  const payload = await getPayload()
  return await payload.findGlobal({ slug: 'settings' })
}

export async function getNav(): Promise<any> {
  const payload = await getPayload()
  return await payload.findGlobal({ slug: 'nav' })
}

export async function getPromoBar(): Promise<any> {
  const payload = await getPayload()
  return await payload.findGlobal({ slug: 'promo-bar' })
}

export async function getStats(): Promise<any> {
  const payload = await getPayload()
  return await payload.findGlobal({ slug: 'stats' })
}

export async function getProjects(): Promise<any[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'projects',
    limit: 100,
    sort: 'displayOrder',
  })
  return res.docs
}

export async function getTestimonials(): Promise<any[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: 'displayOrder',
  })
  return res.docs
}

export async function getClients(): Promise<any[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'clients',
    limit: 100,
    sort: 'displayOrder',
  })
  return res.docs
}

export async function getProcessSteps(): Promise<any[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'process',
    limit: 100,
    sort: 'displayOrder',
  })
  return res.docs
}

export async function getWhyPoints(): Promise<any[]> {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'why-points',
    limit: 100,
    sort: 'displayOrder',
  })
  return res.docs
}
