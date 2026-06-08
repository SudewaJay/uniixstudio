import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import { industries } from "@/lib/industries";
import { site } from "@/lib/content";

export function generateStaticParams() {
  return industries.map((ind) => ({ slug: ind.slug }));
}

export const dynamic = "force-static";
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = industries.find((i) => i.slug === slug);
  if (!ind) return { title: "Industry" };
  const canonical = site.canonical(`/industries/${slug}/`);
  return {
    metadataBase: new URL(site.url),
    title: `${ind.name} — Digital Agency for ${ind.name} | Uniix Studio`,
    description: ind.description,
    alternates: { canonical },
    openGraph: {
      title: `${ind.name} | Uniix Studio`,
      description: ind.description,
      url: canonical,
    },
  };
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) notFound();

  const others = industries.filter((i) => i.slug !== slug).slice(0, 4);

  return (
    <>
      <PageHeader
        eyebrow={`Industries · ${industry.name}`}
        title={
          <>
            Digital work for{" "}
            <span className="italic-display gradient-text">
              {industry.name.toLowerCase()}
            </span>
            .
          </>
        }
        lede={industry.description}
      />

      <section className="pb-16 md:pb-24">
        <div className="wrap">
          <div
            className={`relative aspect-[16/7] rounded-lg2 overflow-hidden shadow-soft bg-gradient-to-br ${industry.bg}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={industry.image}
              alt=""
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
          </div>
        </div>
      </section>

      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <Reveal>
            <h2
              className="display"
              style={{ fontSize: "clamp(32px,4vw,52px)" }}
            >
              Other industries we serve
            </h2>
          </Reveal>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mt-10">
            {others.map((ind, i) => (
              <Reveal key={ind.slug} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <Link
                  href={`/industries/${ind.slug}`}
                  className={`group relative block aspect-[3/4] rounded-3xl overflow-hidden shadow-soft bg-gradient-to-br ${ind.bg}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={ind.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/95 via-ink/45 to-ink/10 group-hover:via-ink/65 transition-opacity duration-500" />
                  <div className="absolute inset-x-0 bottom-0 p-6 md:p-7">
                    <span
                      className="font-mono text-[10px] tracking-[0.22em] uppercase opacity-90 block mb-2"
                      style={{ color: ind.accent }}
                    >
                      Industry
                    </span>
                    <h3 className="font-display font-medium text-white text-[22px] md:text-[26px] leading-[1.05] tracking-[-0.02em]">
                      {ind.name}
                    </h3>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
