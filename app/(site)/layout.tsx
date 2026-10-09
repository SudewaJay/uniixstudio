import type { Metadata } from "next";
import { JetBrains_Mono } from "next/font/google";
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
import { isDraftMode } from "@/lib/cms/cache";
import { getFooter, getNav, getPromoBar, getSiteSettings } from "@/lib/cms/site";
import { getLocations } from "@/lib/cms/locations";
import JsonLd from "@/components/JsonLd";
import Nav from "@/components/Nav";
import PromoBar from "@/components/PromoBar";
import Footer from "@/components/Footer";
import PreviewBanner from "@/components/PreviewBanner";
import "../globals.css";

const mono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

/**
 * Site-wide defaults, driven by CMS Site Settings. Pages MUST set their own
 * absolute title (no template suffix — avoids "X · Uniix Studio · Uniix
 * Studio") and their own canonical: a layout-level canonical would be
 * inherited by every child page and make them all duplicates of "/".
 * (Meta keywords are intentionally omitted — ignored by Google since 2009.)
 */
export async function generateMetadata(): Promise<Metadata> {
  const s = await getSiteSettings();
  const ogImage = s.defaultOgImage ?? "/og-image.jpg";
  const ogTitle = `${s.name} — ${s.tagline}`;
  const googleVerification = s.analytics.googleSiteVerification ?? process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION;
  const bingVerification = s.analytics.bingSiteVerification ?? process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION;
  return {
    metadataBase: new URL(site.url),
    title: {
      default: `${s.name} | Creative Design & Digital Agency in Sri Lanka`,
      template: `%s`,
    },
    description: s.description,
    authors: [{ name: s.name }],
    creator: s.name,
    openGraph: {
      type: "website",
      title: ogTitle,
      description: s.description,
      siteName: s.name,
      locale: "en_US",
      images: [
        s.defaultOgImage
          ? { url: ogImage, width: 1200, height: 630, alt: ogTitle }
          : { url: ogImage, width: 1200, height: 1200, alt: ogTitle },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: s.description,
      images: [ogImage],
    },
    robots: { index: true, follow: true },
    // Favicons default to app/icon.png + app/apple-icon.png; a CMS favicon overrides.
    ...(s.favicon ? { icons: { icon: s.favicon, apple: s.favicon } } : {}),
    verification: {
      google: googleVerification,
      other: bingVerification ? { "msvalidate.01": bingVerification } : undefined,
    },
  };
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [settings, nav, footer, promo, locations, preview] = await Promise.all([
    getSiteSettings(),
    getNav(),
    getFooter(),
    getPromoBar(),
    getLocations(),
    isDraftMode(),
  ]);

  // Site-wide JSON-LD bundle: Organization + LocalBusiness + WebSite
  // Per Masterplan §5 — these three are required on every page via the layout.
  const siteSchema = schemaGraph(
    organizationSchema(settings),
    localBusinessSchema(settings, locations),
    webSiteSchema(settings),
  );

  return (
    <html lang="en" className={mono.variable}>
      <head>
        {/*
          Google Sans Flex is self-hosted (see @font-face in globals.css).
          Preloading the latin subset lets it download in parallel with the
          CSS instead of being discovered only after the stylesheet parses.
        */}
        <link
          rel="preload"
          href="/fonts/GoogleSansFlex-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body className="font-sans">
        <JsonLd data={siteSchema} />
        <a href="#main-content" className="skip-link">Skip to main content</a>
        {preview && <PreviewBanner />}
        <PromoBar promo={promo} socials={settings.socials} />
        <Nav nav={nav} />
        <main id="main-content">{children}</main>
        <Footer
          footer={footer}
          settings={settings}
          locations={locations.map(({ slug, name }) => ({ slug, name }))}
        />
        <Analytics />
        <SpeedInsights />
        <ThirdPartyScripts analytics={settings.analytics} />
      </body>
    </html>
  );
}
