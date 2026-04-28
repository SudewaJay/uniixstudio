/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Per SEO Masterplan: every URL ends with a trailing slash for consistency
  trailingSlash: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "**" },
    ],
  },
  async redirects() {
    return [
      // Old flat /services route preserved as the hub — sub-services live nested
      // Example legacy redirects can be added here as the site evolves
    ];
  },
};

module.exports = nextConfig;
