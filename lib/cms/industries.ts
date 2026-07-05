import { getPayload } from './client'

export async function getIndustries() {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'industries',
    limit: 100,
  })
  return res.docs
}

export async function getIndustry(slug: string) {
  const payload = await getPayload()
  const res = await payload.find({
    collection: 'industries',
    where: { slug: { equals: slug } },
    limit: 1,
  })
  return res.docs[0]
}
