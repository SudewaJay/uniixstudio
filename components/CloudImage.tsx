/**
 * Thin wrapper around next-cloudinary's CldImage with Uniix defaults:
 * - Auto format (WebP/AVIF when supported)
 * - Auto quality
 * - Lazy by default (set `priority` for above-the-fold)
 *
 * Usage:
 *   <CloudImage src="projects/wasana/hero" alt="Wasana Drivers hero" width={1600} height={900} />
 *
 * The `src` is the Cloudinary public ID (folder/filename without extension)
 * — uploaded via the Cloudinary dashboard, CLI, or upload API.
 */
import { CldImage, type CldImageProps } from "next-cloudinary";

export type CloudImageProps = Omit<CldImageProps, "src"> & {
  src: string;
};

export default function CloudImage({
  src,
  alt,
  width,
  height,
  format = "auto",
  quality = "auto",
  ...rest
}: CloudImageProps) {
  return (
    <CldImage
      src={src}
      alt={alt}
      width={width}
      height={height}
      format={format}
      quality={quality}
      {...rest}
    />
  );
}
