import type { CollectionAfterChangeHook, CollectionAfterDeleteHook, GlobalAfterChangeHook } from 'payload'

const triggerWebhook = async (body: any) => {
  try {
    const url = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    await fetch(`${url}/api/revalidate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: process.env.PAYLOAD_SECRET,
        ...body,
      }),
    })
  } catch (err) {
    console.error('Error triggering revalidation webhook', err)
  }
}

export const revalidateCollection = (collectionSlug: string): CollectionAfterChangeHook => {
  return async ({ doc, req: { payload } }) => {
    triggerWebhook({
      collection: collectionSlug,
      slug: doc.slug,
    })
    return doc
  }
}

export const revalidateCollectionDelete = (collectionSlug: string): CollectionAfterDeleteHook => {
  return async ({ doc, req: { payload } }) => {
    triggerWebhook({
      collection: collectionSlug,
      slug: doc.slug,
    })
    return doc
  }
}

export const revalidateGlobal = (globalSlug: string): GlobalAfterChangeHook => {
  return async ({ doc }) => {
    triggerWebhook({
      global: globalSlug,
    })
    return doc
  }
}
