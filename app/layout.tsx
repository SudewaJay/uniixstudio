import type { Metadata } from "next";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";
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
import Footer from "@/components/Footer";
import "./globals.css";

const display = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  axes: ["opsz", "SOFT"],
});
const sans = Inter({
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
  title: {
    default: `${site.name} — ${site.tagline} in Sri Lanka & Australia`,
    template: `%s · ${site.name}`,
  },
  description: site.description,
  keywords: [
    "creative agency sri lanka",
    "web design colombo",
    "branding agency sri lanka",
    "digital marketing colombo",
    "ui ux design sri lanka",
    "seo agency sri lanka",
    "next.js development sri lanka",
  ],
  authors: [{ name: site.name }],
  creator: site.name,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
    siteName: site.name,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} — ${site.tagline}`,
    description: site.description,
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
  icons: {
    icon: [
      {
        url:
          "data:image/svg+xml," +
          encodeURIComponent(
            `<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='#F8C84A'/><stop offset='.5' stop-color='#F07B20'/><stop offset='1' stop-color='#E8621A'/></linearGradient></defs><rect width='100' height='100' rx='22' fill='url(#g)'/><text x='50' y='70' font-family='system-ui' font-size='62' font-weight='900' fill='white' text-anchor='middle'>U</text></svg>`
          ),
      },
    ],
  },
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
