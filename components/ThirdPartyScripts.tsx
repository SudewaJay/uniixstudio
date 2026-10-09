/**
 * Third-party tracking scripts: GA4, Microsoft Clarity and Meta Pixel.
 *
 * One place for every analytics ID. IDs come from CMS Site Settings →
 * Analytics, falling back to env vars (NEXT_PUBLIC_GA_ID,
 * NEXT_PUBLIC_CLARITY_ID, NEXT_PUBLIC_META_PIXEL_ID). Nothing loads when
 * unset.
 *
 * Loaded with strategy="lazyOnload" (after the load event, during idle time).
 * gtag.js alone is ~190KB and was the largest long task on mobile when it ran
 * afterInteractive; deferring it keeps it out of TBT/LCP.
 */
import Script from "next/script";
import type { SiteSettings } from "@/lib/cms/site";

/** IDs are interpolated into inline scripts, so only accept safe characters. */
const safeId = (id: string | undefined) => (id && /^[A-Za-z0-9_-]+$/.test(id) ? id : undefined);

export default function ThirdPartyScripts({ analytics }: { analytics: SiteSettings["analytics"] }) {
  const GA_ID = safeId(analytics.gaId ?? process.env.NEXT_PUBLIC_GA_ID);
  const CLARITY_ID = safeId(analytics.clarityId ?? process.env.NEXT_PUBLIC_CLARITY_ID);
  const PIXEL_ID = safeId(analytics.metaPixelId ?? process.env.NEXT_PUBLIC_META_PIXEL_ID);
  return (
    <>
      {GA_ID && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
            strategy="lazyOnload"
          />
          <Script id="ga4-init" strategy="lazyOnload">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                anonymize_ip: true,
              });
            `}
          </Script>
        </>
      )}

      {CLARITY_ID && (
        <Script id="clarity-init" strategy="lazyOnload">
          {`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${CLARITY_ID}");
          `}
        </Script>
      )}

      {PIXEL_ID && (
        <Script id="meta-pixel-init" strategy="lazyOnload">
          {`
            !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
            n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
            document,'script','https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${PIXEL_ID}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}
    </>
  );
}
