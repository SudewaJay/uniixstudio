import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {
  services,
  pillars,
  getService,
  getPillar,
  getServicesForPillar,
} from "@/lib/services";
import {
  serviceSchema,
  breadcrumbSchema,
  faqPageSchema,
  schemaGraph,
} from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return services.map((s) => ({ pillar: s.pillar, service: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string; service: string }>;
}): Promise<Metadata> {
  const { pillar, service: serviceSlug } = await params;
  const service = getService(pillar, serviceSlug);
  if (!service) return { title: "Service" };
  return {
    title: service.pageTitle,
    description: service.metaDescription,
    openGraph: {
      title: service.pageTitle,
      description: service.metaDescription,
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ pillar: string; service: string }>;
}) {
  const { pillar: pillarSlug, service: serviceSlug } = await params;
  const service = getService(pillarSlug, serviceSlug);
  const pillar = getPillar(pillarSlug);
  if (!service || !pillar) notFound();

  const sibling = getServicesForPillar(pillarSlug)
    .filter((s) => s.slug !== serviceSlug)
    .slice(0, 3);

  // Strip the leading H1 from the markdown body if present (we render our own H1)
  const bodyWithoutH1 = service.body.replace(/^#\s+.*\n/, "").trim();

  // JSON-LD: Service + BreadcrumbList (+ FAQPage when service.faqs is populated)
  const schemas: object[] = [
    serviceSchema(service, pillar),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Services", url: "/services/" },
      { name: pillar.label, url: `/services/${pillar.slug}/` },
      { name: service.name, url: `/services/${pillar.slug}/${service.slug}/` },
    ]),
  ];
  if (service.faqs && service.faqs.length > 0) {
    schemas.push(faqPageSchema(service.faqs));
  }
  const pageSchema = schemaGraph(...schemas);

  return (
    <>
      <JsonLd data={pageSchema} />
      <PageHeader
        eyebrow={
          <>
            <Link
              href={`/services/${pillar.slug}/`}
              className="hover:text-brand-4 transition-colors"
            >
              {pillar.label}
            </Link>{" "}
            · {service.name}
          </>
        }
        title={
          <>
            {service.name}{" "}
            <span className="italic-display gradient-text">in Sri Lanka.</span>
          </>
        }
        lede={service.metaDescription}
      />

      {/* Body */}
      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_280px] gap-12 lg:gap-16">
            {/* Markdown body */}
            <div className="max-w-[68ch]">
              <Reveal>
                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <h1
                        className="font-display font-medium text-ink mt-10 mb-5 leading-[1.1] tracking-[-0.02em]"
                        style={{ fontSize: "clamp(28px,3.4vw,40px)" }}
                      >
                        {children}
                      </h1>
                    ),
                    h2: ({ children }) => (
                      <h2
                        className="font-display font-medium text-ink mt-12 mb-5 leading-[1.15] tracking-[-0.015em]"
                        style={{ fontSize: "clamp(24px,2.6vw,32px)" }}
                      >
                        {children}
                      </h2>
                    ),
                    h3: ({ children }) => (
                      <h3 className="font-display font-medium text-ink mt-8 mb-3 text-[22px] leading-[1.2] tracking-[-0.01em]">
                        {children}
                      </h3>
                    ),
                    p: ({ children }) => (
                      <p className="text-[17px] leading-[1.75] text-ink-2 mb-5">
                        {children}
                      </p>
                    ),
                    ul: ({ children }) => (
                      <ul className="list-disc pl-6 my-5 text-[17px] leading-[1.75] text-ink-2 space-y-2">
                        {children}
                      </ul>
                    ),
                    ol: ({ children }) => (
                      <ol className="list-decimal pl-6 my-5 text-[17px] leading-[1.75] text-ink-2 space-y-2">
                        {children}
                      </ol>
                    ),
                    strong: ({ children }) => (
                      <strong className="text-ink font-semibold">{children}</strong>
                    ),
                    a: ({ href, children }) => (
                      <a
                        href={href}
                        className="text-brand-4 underline underline-offset-4 hover:text-brand-3 transition-colors"
                      >
                        {children}
                      </a>
                    ),
                  }}
                >
                  {bodyWithoutH1}
                </ReactMarkdown>
              </Reveal>
            </div>

            {/* Sticky sidebar */}
            <aside className="lg:sticky lg:top-32 lg:self-start">
              <div
                className="bg-bg-paper border border-line rounded-3xl p-6 md:p-7 mb-6"
                style={{ borderTopColor: pillar.accent, borderTopWidth: "3px" }}
              >
                <span
                  className="font-mono text-[10px] tracking-[0.22em] uppercase block mb-3"
                  style={{ color: pillar.accent }}
                >
                  Pillar
                </span>
                <h3 className="font-display font-medium text-ink text-[20px] mb-3 tracking-[-0.01em]">
                  {pillar.label}
                </h3>
                <p className="text-ink-2 text-[13.5px] leading-[1.55] mb-4">
                  {pillar.description}
                </p>
                <Link
                  href={`/services/${pillar.slug}/`}
                  className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-4 hover:translate-x-1 transition-transform duration-300"
                >
                  All {pillar.label.toLowerCase()} services
                  <span aria-hidden="true">→</span>
                </Link>
              </div>

              <div className="bg-ink text-white rounded-3xl p-6 md:p-7 relative overflow-hidden">
                <div
                  className="absolute -top-1/2 -right-1/2 w-full h-full rounded-full opacity-30 blur-3xl pointer-events-none"
                  style={{ background: pillar.accent }}
                  aria-hidden="true"
                />
                <div className="relative">
                  <h3 className="font-display font-medium text-[20px] leading-[1.2] tracking-[-0.01em] mb-3">
                    Get a free consultation
                  </h3>
                  <p className="text-white/75 text-[13px] leading-[1.55] mb-5">
                    Tell us about your project and we&apos;ll respond within 24
                    hours.
                  </p>
                  <Link
                    href="/contact/"
                    className="inline-flex items-center justify-center w-full py-2.5 rounded-full bg-white text-ink text-[13px] font-semibold hover:bg-bg-warm transition-colors"
                  >
                    Start a conversation ↗
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* FAQ — Masterplan §3.1. Renders only when faqs are populated on the service. */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="bg-bg border-t border-line-soft py-20 md:py-28">
          <div className="wrap">
            <div className="grid lg:grid-cols-[1fr_2fr] gap-12 lg:gap-20 items-start">
              <Reveal>
                <span
                  className="font-mono text-[11px] tracking-[0.22em] uppercase block mb-4"
                  style={{ color: pillar.accent }}
                >
                  FAQ
                </span>
                <h2
                  className="font-display font-medium text-ink leading-[1.05] tracking-[-0.02em]"
                  style={{ fontSize: "clamp(32px,4vw,52px)" }}
                >
                  Frequently asked
                  <br />
                  <span className="italic-display gradient-text">questions.</span>
                </h2>
                <p className="text-ink-2 text-[15px] leading-[1.6] mt-5 max-w-[36ch]">
                  Quick answers to what clients ask most before starting a
                  {" "}{service.name.toLowerCase()} engagement.
                </p>
              </Reveal>

              <div className="divide-y divide-line">
                {service.faqs.map((f, i) => (
                  <Reveal key={f.question} delay={(i % 3) as 0 | 1 | 2}>
                    <details className="group py-6">
                      <summary className="cursor-pointer list-none flex items-start justify-between gap-6">
                        <h3 className="font-display font-medium text-ink text-[20px] md:text-[22px] leading-[1.3] tracking-[-0.01em]">
                          {f.question}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="flex-shrink-0 mt-1 size-8 rounded-full border border-line grid place-items-center text-ink-2 transition-transform duration-300 group-open:rotate-45"
                        >
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        </span>
                      </summary>
                      <p className="mt-4 text-ink-2 text-[15.5px] leading-[1.7] max-w-[68ch]">
                        {f.answer}
                      </p>
                    </details>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Sibling services */}
      {sibling.length > 0 && (
        <section className="bg-bg-paper border-t border-line-soft py-20 md:py-28">
          <div className="wrap">
            <Reveal>
              <h2
                className="font-display font-medium text-ink mb-10 tracking-[-0.02em]"
                style={{ fontSize: "clamp(28px,3.5vw,42px)" }}
              >
                More {pillar.label.toLowerCase()} services
              </h2>
            </Reveal>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {sibling.map((s, i) => (
                <Reveal key={s.slug} delay={i as 0 | 1 | 2}>
                  <Link
                    href={`/services/${pillar.slug}/${s.slug}/`}
                    className="group block bg-bg border border-line rounded-3xl p-8 hover:shadow-sm2 hover:-translate-y-1 transition-all duration-500"
                  >
                    <span
                      className="font-mono text-[10px] tracking-[0.22em] uppercase block mb-3"
                      style={{ color: pillar.accent }}
                    >
                      Service
                    </span>
                    <h3 className="font-display font-medium text-ink text-[22px] leading-[1.15] tracking-[-0.015em] mb-3 group-hover:text-brand-4 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-ink-2 text-[14px] leading-[1.6] line-clamp-3">
                      {s.metaDescription}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
