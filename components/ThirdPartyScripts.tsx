/**
 * Third-party tracking scripts: GA4 + Microsoft Clarity.
 *
 * Both are env-var driven and no-op locally. Set the IDs in Vercel:
 *   - NEXT_PUBLIC_GA_ID            → e.g. G-XXXXXXXXXX
 *   - NEXT_PUBLIC_CLARITY_ID       → e.g. abcdefghij
 *
 * Loaded with strategy="lazyOnload" (after the load event, during idle time).
 * gtag.js alone is ~190KB and was the largest long task on mobile when it ran
 * afterInteractive; deferring it keeps it out of TBT/LCP.
 */
import Script from "next/script";

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const CLARITY_ID = process.env.NEXT_PUBLIC_CLARITY_ID;

export default function ThirdPartyScripts() {
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
    </>
  );
}
