import type { Metadata } from "next";
import { Fraunces, Lexend, JetBrains_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThirdPartyScripts from "@/components/ThirdPartyScripts";
import { site } from "@/lib/content";
import {
  organizationSchema,
  localBusinessSchema,
  webSiteSchema,
  schemaGraph,
} from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import PromoBar from "@/components/PromoBar";
import Footer from "@/components/Footer";
import "../globals.css";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
});
const sans = Lexend({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  // Default title for the homepage. Pages MUST set their own absolute
  // title (no template-based suffix) to avoid "X · Uniix Studio · Uniix Studio"
  // duplication that hurts CTR and SEO.
  title: {
    default: `${site.name} | Creative Design & Digital Agency in Sri Lanka`,
    template: `%s`,
  },
  description: site.description,
  // NOTE: meta keywords removed sitewide — Google has ignored this tag since
  // 2009 and identical sitewide keywords are a templated-metadata smell.
  authors: [{ name: site.name }],
  creator: site.name,
  // NOTE: Canonical is intentionally NOT set at the layout level — if it
  // were, every child page would inherit it and Google would treat them
  // all as duplicates of "/". Each page sets its own canonical via its
  // metadata export or generateMetadata().
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 1200,
        alt: `${site.name} — ${site.tagline}`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    images: ["/og-image.jpg"],
  },
  robots: { index: true, follow: true },
  // Search Console verification — set env vars in Vercel to activate.
  // Empty/undefined values are omitted from the rendered <meta> tags.
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { "msvalidate.01": process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  // Favicons auto-detected from app/icon.png + app/apple-icon.png by Next.js.
  // Next generates the <link rel="icon"> + sized variants automatically.
};

// Site-wide JSON-LD bundle: Organization + LocalBusiness + WebSite
// Per Masterplan §5 — these three are required on every page via the layout.
const siteSchema = schemaGraph(
  organizationSchema(),
  localBusinessSchema(),
  webSiteSchema(),
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${display.variable} ${sans.variable} ${mono.variable}`}>
      <head>
        <JsonLd data={siteSchema} />
      </head>
      <body className="font-sans">
        <a href="#main-content" className="skip-link">Skip to main content</a>
        <PromoBar />
        <Nav />
        <main id="main-content">{children}</main>
        <Footer />
        <Analytics />
        <SpeedInsights />
        <ThirdPartyScripts />
      </body>
    </html>
  );
}
