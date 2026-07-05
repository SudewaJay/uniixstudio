import { getPayload } from './client'

// Return types are inferred from Payload's typed API. Once `payload
// generate:types` is run (writing payload-types.ts), these will resolve to the
// concrete collection/global interfaces automatically.

export async function getSiteSettings() {
  const payload = await getPayload()
  return await payload.findGlobal({ slug: 'settings' })
}

export async function getNav() {
  const payload = await getPayload()
  return await payload.findGlobal({ slug: 'nav' })
}

export async function getPromoBar() {
  const payload = await getPayload()
  return await payload.findGlobal({ slug: 'promo-bar' })
}

export async function getStats() {
  const payload = await getPayload()
  return await payload.findGlobal({ slug: 'stats' })
}

export async function getProjects() {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'projects',
    limit: 100,
    sort: 'displayOrder',
  })
  return res.docs
}

export async function getTestimonials() {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'testimonials',
    limit: 100,
    sort: 'displayOrder',
  })
  return res.docs
}

export async function getClients() {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'clients',
    limit: 100,
    sort: 'displayOrder',
  })
  return res.docs
}

export async function getProcessSteps() {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'process',
    limit: 100,
    sort: 'displayOrder',
  })
  return res.docs
}

export async function getWhyPoints() {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'why-points',
    limit: 100,
    sort: 'displayOrder',
  })
  return res.docs
}
