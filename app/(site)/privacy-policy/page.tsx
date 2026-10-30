import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import JsonLd from "@/components/JsonLd";
import { buildMetadata } from "@/lib/cms/seo";
import { getSiteSettings } from "@/lib/cms/site";
import { breadcrumbSchema } from "@/lib/schema";

export const metadata: Metadata = buildMetadata({
  path: "/privacy-policy/",
  title: "Privacy Policy | Uniix Studio",
  description:
    "How Uniix Studio collects, uses and protects personal data from our website, contact forms and WhatsApp enquiries, under Sri Lanka’s PDPA.",
});

const UPDATED = "30 October 2026";

export default async function PrivacyPolicyPage() {
  const site = await getSiteSettings();
  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Privacy Policy", url: "/privacy-policy/" },
  ]);

  // Name only the trackers this site actually loads — same resolution as ThirdPartyScripts.
  const { gaId, clarityId, metaPixelId } = site.analytics;
  const tools = [
    (gaId ?? process.env.NEXT_PUBLIC_GA_ID) && "Google Analytics",
    (clarityId ?? process.env.NEXT_PUBLIC_CLARITY_ID) && "Microsoft Clarity",
    (metaPixelId ?? process.env.NEXT_PUBLIC_META_PIXEL_ID) && "Meta Pixel",
    "Vercel Analytics",
  ].filter(Boolean) as string[];
  const toolList = tools.length > 1 ? `${tools.slice(0, -1).join(", ")} and ${tools.at(-1)}` : tools[0];

  const mail = (
    <a className="underline underline-offset-2" href={`mailto:${site.email}`}>
      {site.email}
    </a>
  );

  return (
    <>
      <JsonLd data={crumbs} />
      <PageHeader eyebrow="Legal" title="Privacy Policy" lede={`Last updated: ${UPDATED}`} />

      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <div className="max-w-[72ch] space-y-10 text-[17px] leading-[1.7] text-ink-2 [&_h2]:mb-3 [&_h2]:font-display [&_h2]:text-[26px] [&_h2]:font-medium [&_h2]:tracking-[-0.02em] [&_h2]:text-ink [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-6">
            <p>
              {site.name} (“we”, “us”) is a creative digital agency based in {site.location}. This policy explains what
              personal data we collect through uniixstudio.com, why we collect it and how we protect it. We process
              personal data in line with Sri Lanka’s Personal Data Protection Act, No. 9 of 2022.
            </p>

            <div>
              <h2>What we collect</h2>
              <ul>
                <li>Details you send us: name, email, phone or WhatsApp number, company and project details.</li>
                <li>Usage data: pages visited, device and browser type, approximate location and referral source.</li>
                <li>Cookies and similar technologies used by our analytics tools.</li>
              </ul>
            </div>

            <div>
              <h2>How we use it</h2>
              <ul>
                <li>To reply to enquiries, prepare quotes and deliver projects.</li>
                <li>To improve our website and understand which content is useful.</li>
                <li>To send project updates. We only send marketing emails if you opt in, and you can unsubscribe anytime.</li>
              </ul>
              <p className="mt-3">We do not sell your personal data.</p>
            </div>

            <div>
              <h2>Analytics and third parties</h2>
              <p>
                We use {toolList} to measure site usage. Our site is hosted on Vercel. If you contact us on WhatsApp,
                Meta’s privacy policy also applies. These providers process data on our behalf and may store it outside
                Sri Lanka.
              </p>
            </div>

            <div>
              <h2>How long we keep it</h2>
              <p>
                Enquiry data is kept for up to 24 months. Client project records are kept for as long as needed for the
                project and for legal and accounting requirements.
              </p>
            </div>

            <div>
              <h2>Your rights</h2>
              <p>
                You can ask to access, correct or delete your personal data, or withdraw consent, by emailing {mail}. We
                reply within 21 days.
              </p>
            </div>

            <div>
              <h2>Contact</h2>
              <p>
                {site.name}, {site.location} · {mail}
                {site.whatsapp && <> · WhatsApp {site.whatsapp}</>}
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
