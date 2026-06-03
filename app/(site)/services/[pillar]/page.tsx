import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import {
  pillars,
  getPillar,
  getServicesForPillar,
} from "@/lib/services";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export function generateStaticParams() {
  return pillars.map((p) => ({ pillar: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ pillar: string }>;
}): Promise<Metadata> {
  const { pillar: pillarSlug } = await params;
  const pillar = getPillar(pillarSlug);
  if (!pillar) return { title: "Services" };
  const canonical = `https://uniixstudio.com/services/${pillarSlug}/`;
  return {
    title: `${pillar.label} Services in Sri Lanka | Uniix Studio`,
    description: pillar.description,
    alternates: { canonical },
    openGraph: {
      title: `${pillar.label} Services in Sri Lanka | Uniix Studio`,
      description: pillar.description,
      url: canonical,
    },
  };
}

export default async function PillarPage({
  params,
}: {
  params: Promise<{ pillar: string }>;
}) {
  const { pillar: pillarSlug } = await params;
  const pillar = getPillar(pillarSlug);
  if (!pillar) notFound();

  const services = getServicesForPillar(pillar.slug);
  const otherPillars = pillars.filter((p) => p.slug !== pillar.slug);

  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services/" },
    { name: pillar.label, url: `/services/${pillar.slug}/` },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
      <PageHeader
        eyebrow={`Services · ${pillar.label}`}
        title={
          <>
            {pillar.label}{" "}
            <span className="italic-display gradient-text">{pillar.tagline}</span>
          </>
        }
        lede={pillar.description}
      />

      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {services.map((s, i) => (
              <Reveal key={s.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <Link
                  href={`/services/${pillar.slug}/${s.slug}/`}
                  className="group relative block h-full bg-bg-paper border border-line rounded-3xl p-8 md:p-10 hover:border-transparent hover:shadow-soft hover:-translate-y-1 transition-all duration-500"
                >
                  <div
                    className="absolute -top-1/3 -right-1/3 w-2/3 h-2/3 rounded-full opacity-15 blur-3xl pointer-events-none transition-opacity duration-500 group-hover:opacity-40"
                    style={{ background: pillar.accent }}
                    aria-hidden="true"
                  />
                  <div className="relative">
                    <span
                      className="font-mono text-[10px] tracking-[0.22em] uppercase block mb-5"
                      style={{ color: pillar.accent }}
                    >
                      {String(i + 1).padStart(2, "0")} / {pillar.label}
                    </span>
                    <h3 className="font-display font-medium text-ink text-[26px] md:text-[28px] leading-[1.05] tracking-[-0.02em] mb-3 group-hover:text-brand-4 transition-colors">
                      {s.name}
                    </h3>
                    <p className="text-ink-2 text-[14.5px] leading-[1.6] mb-6">
                      {s.metaDescription}
                    </p>
                    <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-4 transition-transform duration-300 group-hover:translate-x-1">
                      Explore service
                      <span aria-hidden="true">→</span>
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Other pillars */}
      <section className="bg-bg-paper border-t border-line-soft py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <h2
              className="font-display font-medium text-ink mb-10 tracking-[-0.02em]"
              style={{ fontSize: "clamp(28px,3.5vw,42px)" }}
            >
              Explore other pillars
            </h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-6 md:gap-8">
            {otherPillars.map((p, i) => (
              <Reveal key={p.slug} delay={i as 0 | 1}>
                <Link
                  href={`/services/${p.slug}/`}
                  className="group block bg-bg-warm border border-line rounded-3xl p-8 md:p-10 hover:shadow-sm2 hover:-translate-y-1 transition-all duration-500"
                >
                  <span
                    className="font-mono text-[10px] tracking-[0.22em] uppercase block mb-4"
                    style={{ color: p.accent }}
                  >
                    Pillar
                  </span>
                  <h3 className="font-display font-medium text-ink text-[28px] leading-[1.1] tracking-[-0.02em] mb-2 group-hover:text-brand-4 transition-colors">
                    {p.label}
                  </h3>
                  <p className="text-ink-2 text-[15px] leading-[1.6] mb-5">
                    {p.tagline}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-medium text-brand-4 transition-transform duration-300 group-hover:translate-x-1">
                    Explore pillar
                    <span aria-hidden="true">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
