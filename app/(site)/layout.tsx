import type { Metadata } from "next";
import { JetBrains_Mono, Manrope, Space_Grotesk } from "next/font/google";
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
import WhatsAppButton from "@/components/WhatsAppButton";
import "../globals.css";

// Display face (headings). Variable font, so one file covers 300–700.
const display = Space_Grotesk({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-space-grotesk",
});

// Text face (body copy, UI). Variable font, 200–800.
const sans = Manrope({
  subsets: ["latin", "latin-ext"],
  display: "swap",
  variable: "--font-manrope",
});

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
    <html
      lang="en"
      className={`${display.variable} ${sans.variable} ${mono.variable}`}
    >
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
        <WhatsAppButton link={settings.whatsappLink} />
        <Analytics />
        <SpeedInsights />
        <ThirdPartyScripts analytics={settings.analytics} />
      </body>
    </html>
  );
}
