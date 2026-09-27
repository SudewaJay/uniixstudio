import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
  GlobalAfterChangeHook,
  PayloadRequest,
} from 'payload'
import { revalidateTag } from 'next/cache'
import { collectionTag, docTag, globalTag } from '../../lib/cms/tags'

/**
 * On-demand ISR. Payload runs inside the Next.js server, so hooks call
 * `revalidateTag` directly — no webhook, no shared secret over HTTP.
 *
 * Only publish-state transitions matter: autosaving a draft never touches the
 * live site. Scripts (seed, migrations) run outside a Next request, where
 * revalidateTag is unavailable; they pass `context.disableRevalidate`.
 */
function revalidate(req: PayloadRequest, tags: string[]) {
  if (req.context?.disableRevalidate) return
  for (const tag of new Set(tags)) {
    try {
      revalidateTag(tag)
    } catch {
      // Outside a Next.js request (CLI scripts) — nothing is cached there.
      return
    }
  }
  req.payload.logger.info({ msg: 'revalidated', tags: [...new Set(tags)] })
}

type Doc = { slug?: unknown; _status?: unknown } | undefined | null

const slugOf = (doc: Doc) => (typeof doc?.slug === 'string' && doc.slug ? doc.slug : null)
const isLive = (doc: Doc) => doc?._status === undefined || doc?._status === 'published'

export function revalidateCollection(collection: string, alsoTags: string[] = []): CollectionAfterChangeHook {
  return ({ doc, previousDoc, req }) => {
    const nowLive = isLive(doc)
    const wasLive = Boolean(previousDoc) && isLive(previousDoc)
    // A draft save of something that was never live changes nothing public.
    if (!nowLive && !wasLive) return doc

    const tags = [collectionTag(collection), ...alsoTags]
    const current = slugOf(doc)
    const previous = slugOf(previousDoc)
    if (current) tags.push(docTag(collection, current))
    if (previous && previous !== current) tags.push(docTag(collection, previous))
    revalidate(req, tags)
    return doc
  }
}

export function revalidateCollectionDelete(collection: string, alsoTags: string[] = []): CollectionAfterDeleteHook {
  return ({ doc, req }) => {
    const tags = [collectionTag(collection), ...alsoTags]
    const slug = slugOf(doc)
    if (slug) tags.push(docTag(collection, slug))
    revalidate(req, tags)
    return doc
  }
}

export function revalidateGlobal(global: string): GlobalAfterChangeHook {
  return ({ doc, req }) => {
    revalidate(req, [globalTag(global)])
    return doc
  }
}

/** Convenience: both collection hooks at once. */
export function revalidateHooks(collection: string, alsoTags: string[] = []) {
  return {
    afterChange: [revalidateCollection(collection, alsoTags)],
    afterDelete: [revalidateCollectionDelete(collection, alsoTags)],
  }
}
