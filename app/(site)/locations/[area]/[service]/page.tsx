import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import {
  locationServices,
  getLocationService,
  locationServicesFor,
} from "@/lib/location-services";
import { getLocation } from "@/lib/locations";
import { site } from "@/lib/content";
import {
  locationServiceSchema,
  breadcrumbSchema,
  faqPageSchema,
  schemaGraph,
} from "@/lib/schema";

export function generateStaticParams() {
  return locationServices.map((ls) => ({
    area: ls.area,
    service: ls.service,
  }));
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string; service: string }>;
}): Promise<Metadata> {
  const { area, service } = await params;
  const ls = getLocationService(area, service);
  if (!ls) return { title: "Service" };
  const canonical = site.canonical(`/locations/${area}/${service}/`);
  return {
    metadataBase: new URL(site.url),
    title: ls.metaTitle,
    description: ls.metaDescription,
    alternates: { canonical },
    openGraph: {
      title: ls.metaTitle,
      description: ls.metaDescription,
      url: canonical,
    },
  };
}

export default async function LocationServicePage({
  params,
}: {
  params: Promise<{ area: string; service: string }>;
}) {
  const { area, service } = await params;
  const ls = getLocationService(area, service);
  const loc = getLocation(area);
  if (!ls || !loc) notFound();

  const schema = schemaGraph(
    locationServiceSchema(ls, loc),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Locations", url: "/locations/" },
      { name: loc.name, url: `/locations/${loc.slug}/` },
      { name: ls.serviceLabel, url: `/locations/${area}/${service}/` },
    ]),
    faqPageSchema(ls.faqs)
  );

  const otherCombos = locationServicesFor(area).filter(
    (c) => c.service !== service
  );

  return (
    <>
      <JsonLd data={schema} />

      <PageHeader
        eyebrow={`${loc.name} · ${ls.serviceLabel}`}
        title={
          <>
            {ls.serviceLabel} in{" "}
            <span className="italic-display gradient-text">{loc.name}</span>.
          </>
        }
        lede={ls.lede}
      />

      {/* Intro */}
      <section className="pb-14 md:pb-20">
        <div className="wrap max-w-3xl">
          <div className="space-y-5 text-[16px] md:text-[17px] leading-[1.7] text-ink/80">
            {ls.intro.map((para, i) => (
              <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="pb-14 md:pb-20">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {ls.benefits.map((b, i) => (
              <Reveal key={b.title} delay={(i % 3) as 0 | 1 | 2}>
                <div className="h-full rounded-2xl border border-ink/10 p-6">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-brand-3 mb-3 block">
                    0{i + 1}
                  </span>
                  <h3 className="font-display font-medium text-[19px] tracking-[-0.01em] mb-2">
                    {b.title}
                  </h3>
                  <p className="text-ink/70 text-[14.5px] leading-[1.6]">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="pb-14 md:pb-20">
        <div className="wrap max-w-3xl">
          <h2 className="font-display font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-8">
            {ls.serviceLabel} in {loc.name} — FAQs
          </h2>
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {ls.faqs.map((faq) => (
              <div key={faq.question} className="py-6">
                <h3 className="font-display font-medium text-[18px] mb-2">
                  {faq.question}
                </h3>
                <p className="text-ink/70 text-[15px] leading-[1.65]">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <div className="wrap">
          <div className="rounded-3xl bg-ink text-white p-10 md:p-14 text-center">
            <h2 className="font-display font-medium text-[28px] md:text-[38px] tracking-[-0.02em] mb-3">
              {ls.serviceLabel.toLowerCase()} for your {loc.name} business
            </h2>
            <p className="text-white/70 text-[16px] max-w-xl mx-auto mb-7">
              Tell us what you&rsquo;re building and we&rsquo;ll come back with a
              clear plan, timeline and fixed quote.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block px-7 py-3.5 rounded-full bg-white text-ink font-medium text-[15px] hover:bg-white/90 transition-colors"
              >
                Start a project
              </Link>
              <a
                href={site.whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-7 py-3.5 rounded-full border border-white/30 text-white font-medium text-[15px] hover:bg-white/10 transition-colors"
              >
                WhatsApp us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Related links: back to hub + other combos + full service */}
      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/40 mb-6">
            Related
          </h2>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            <Link
              href={`/locations/${loc.slug}`}
              className="font-display text-[18px] text-ink/70 hover:text-ink underline underline-offset-4 decoration-ink/20 hover:decoration-ink/60 transition-colors"
            >
              All services in {loc.name}
            </Link>
            {otherCombos.map((c) => (
              <Link
                key={c.service}
                href={`/locations/${area}/${c.service}`}
                className="font-display text-[18px] text-ink/70 hover:text-ink underline underline-offset-4 decoration-ink/20 hover:decoration-ink/60 transition-colors"
              >
                {c.serviceLabel} in {loc.name}
              </Link>
            ))}
            <Link
              href={`/services/${ls.pillar}/${ls.service}`}
              className="font-display text-[18px] text-ink/70 hover:text-ink underline underline-offset-4 decoration-ink/20 hover:decoration-ink/60 transition-colors"
            >
              Our {ls.serviceLabel} service
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
