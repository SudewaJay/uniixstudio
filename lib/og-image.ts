/**
 * Normalize any cover image URL into a social-preview-friendly variant.
 *
 * Why this exists:
 *   - WhatsApp does not preview `.webp` images. It needs JPG or PNG.
 *   - WhatsApp caps preview images around 300 KB; large covers get dropped.
 *   - Facebook / LinkedIn / X expect 1200×630 (1.91:1) for the large card.
 *
 * For Cloudinary URLs we inject delivery transforms after `/upload/`:
 *   - f_jpg     — force JPG output (WhatsApp-safe)
 *   - w_1200    — exactly 1200 px wide
 *   - h_630     — exactly 630 px tall
 *   - c_fill    — crop-to-fit (won't letterbox)
 *   - q_auto:good — quality auto-tuned to stay well under WhatsApp's cap
 *
 * For non-Cloudinary URLs we return the original; the caller still gets
 * width/height metadata via `OG_IMAGE_DIMENSIONS`.
 */

export const OG_IMAGE_DIMENSIONS = { width: 1200, height: 630 } as const;

const CLOUDINARY_HOST = "res.cloudinary.com";
const OG_TRANSFORMS = "f_jpg,w_1200,h_630,c_fill,q_auto:good";

export function ogImageUrl(src: string | undefined | null): string | undefined {
  if (!src) return undefined;
  try {
    const url = new URL(src);
    if (url.hostname !== CLOUDINARY_HOST) return src;
    // Cloudinary path shape: /<cloud_name>/image/upload/[<transforms>/]<rest>
    const parts = url.pathname.split("/");
    const uploadIdx = parts.indexOf("upload");
    if (uploadIdx === -1) return src;
    // If a transforms segment already lives at uploadIdx+1 (Cloudinary
    // marks it by a comma in the segment), we replace it; otherwise insert.
    const next = parts[uploadIdx + 1] ?? "";
    if (next.includes(",")) {
      parts[uploadIdx + 1] = OG_TRANSFORMS;
    } else {
      parts.splice(uploadIdx + 1, 0, OG_TRANSFORMS);
    }
    url.pathname = parts.join("/");
    return url.toString();
  } catch {
    return src;
  }
}

/** Convenience builder for the openGraph.images array. */
export function ogImageMeta(src: string | undefined | null) {
  const url = ogImageUrl(src);
  if (!url) return undefined;
  return [
    {
      url,
      width: OG_IMAGE_DIMENSIONS.width,
      height: OG_IMAGE_DIMENSIONS.height,
      type: "image/jpeg" as const,
    },
  ];
}
