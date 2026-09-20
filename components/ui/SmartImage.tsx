import NextImage from "next/image";
import clsx from "clsx";

/**
 * The single image primitive for the site.
 *
 * Raster images go through next/image so we get AVIF/WebP, a real `srcset` and
 * intrinsic dimensions (no CLS). The homepage previously shipped 61 raw <img>
 * tags with no width/height — one case-study cover alone was 4.7 MB on a 375px
 * viewport.
 *
 * SVGs bypass the optimizer (Next refuses to optimize SVG without
 * `dangerouslyAllowSVG`, and vector marks gain nothing from it). They carry no
 * width/height attributes; instead they fill an already-sized parent via
 * `absolute inset-0`, so the box exists before the file arrives and there is
 * still no layout shift.
 *
 * `sizes` is required by convention: without it Next assumes 100vw and serves
 * a desktop-width file to phones.
 */
export default function SmartImage({
  src,
  alt,
  sizes,
  priority = false,
  className,
  quality = 72,
  fit = "cover",
  position,
}: {
  src: string;
  /** Empty string marks the image decorative — it is then hidden from AT. */
  alt: string;
  sizes: string;
  priority?: boolean;
  className?: string;
  quality?: number;
  fit?: "cover" | "contain";
  position?: string;
}) {
  const decorative = alt === "";
  const objectFit = fit === "cover" ? "object-cover" : "object-contain";

  if (src.endsWith(".svg")) {
    return (
      /* eslint-disable-next-line @next/next/no-img-element */
      <img
        src={src}
        alt={alt}
        aria-hidden={decorative || undefined}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        className={clsx("absolute inset-0 h-full w-full", objectFit, className)}
        style={position ? { objectPosition: position } : undefined}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      quality={quality}
      priority={priority}
      loading={priority ? undefined : "lazy"}
      aria-hidden={decorative || undefined}
      className={clsx(objectFit, className)}
      style={position ? { objectPosition: position } : undefined}
    />
  );
}
