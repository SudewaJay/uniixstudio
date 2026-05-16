import { revalidateTag } from 'next/cache'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { secret, collection, slug, global } = await request.json()

    if (secret !== process.env.PAYLOAD_SECRET) {
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
