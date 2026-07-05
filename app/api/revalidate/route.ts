import { createHash, timingSafeEqual } from 'crypto'
import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

/**
 * Constant-time secret comparison. Hashing both sides to a fixed length
 * lets us use timingSafeEqual (which requires equal-length buffers) without
 * leaking the expected secret's length via an early return.
 */
function secretsMatch(provided: unknown, expected: string): boolean {
  if (typeof provided !== 'string') return false
  const a = createHash('sha256').update(provided).digest()
  const b = createHash('sha256').update(expected).digest()
  return timingSafeEqual(a, b)
}

export async function POST(request: NextRequest) {
  try {
    const { secret, collection, slug, global } = await request.json()

    const expected = process.env.PAYLOAD_SECRET
    if (!expected || !secretsMatch(secret, expected)) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
    }

    if (collection && slug) {
      // Revalidate collection item
      revalidateTag(`${collection}:${slug}`)
      // Revalidate collection list
      revalidateTag(collection)
    }

    if (global) {
      // Revalidate global setting
      revalidateTag(global)
    }

    // Always revalidate homepage just in case
    revalidateTag('homepage')

    return NextResponse.json({ revalidated: true, now: Date.now() })
  } catch (err) {
    return NextResponse.json({ message: 'Error revalidating' }, { status: 500 })
  }
}
