const { withPayload } = require('@payloadcms/next/withPayload');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Per SEO Masterplan: every URL ends with a trailing slash for consistency
  trailingSlash: true,
  images: {
    // AVIF first, WebP fallback. Next only negotiates formats the browser
    // advertises, so older clients still get WebP/JPEG.
    formats: ["image/avif", "image/webp"],
    // Scoped to the CDNs actually in use — Cloudinary (next-cloudinary),
    // Vercel Blob (Payload uploads), Pexels (blog covers) and Vimeo thumbnails.
    // Avoid the "**" wildcard: it lets any origin proxy through the image
    // optimizer, which is a bandwidth/abuse vector.
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "*.public.blob.vercel-storage.com" },
      { protocol: "https", hostname: "images.pexels.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "image.thum.io" },
      { protocol: "https", hostname: "vumbnail.com" },
    ],
  },
  async redirects() {
    // 308 (permanent) redirects from the old WordPress site's URLs to their
    // closest equivalent on the new site. These paths are still indexed and
    // were returning 404s, bleeding link equity. Add more here as Search
    // Console → Pages → "Not found (404)" surfaces additional legacy URLs.
    const permanent = true;
    return [
      // Core section pages
      { source: "/services-2", destination: "/services", permanent },
      { source: "/gallery", destination: "/portfolio", permanent },
      { source: "/contacts", destination: "/contact", permanent },
      { source: "/blogs", destination: "/blog", permanent },
      // Old WordPress portfolio taxonomy — collapse all into the portfolio hub
      { source: "/portfolio_group/:slug*", destination: "/portfolio", permanent },
      // Legacy root-level blog posts (WordPress published posts at the root)
      {
        source: "/10-of-the-best-social-media-analytics-tools-for-smart-marketers",
        destination: "/blog",
        permanent,
      },
      {
        source: "/pixels-rediscovered-a-nostalgic-yet-contemporary-trend",
        destination: "/blog",
        permanent,
      },
      {
        source: "/abstract-gradients-a-kaleidoscope-of-colors",
        destination: "/blog",
        permanent,
      },
    ];
  },
};

module.exports = withPayload(nextConfig);
