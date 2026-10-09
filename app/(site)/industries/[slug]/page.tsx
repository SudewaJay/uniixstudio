import type { Metadata } from "next";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { breadcrumbSchema } from "@/lib/schema";
import { getIndustries } from "@/lib/cms/industries";
import { getProjects } from "@/lib/cms/projects";
import { buildMetadata } from "@/lib/cms/seo";
import { notFoundOrRedirect } from "@/lib/cms/redirects";

export async function generateStaticParams() {
  return (await getIndustries()).map((ind) => ({ slug: ind.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ind = (await getIndustries()).find((i) => i.slug === slug);
  if (!ind) return { title: "Industry" };
  return buildMetadata({
    path: `/industries/${slug}/`,
    title: `${ind.name} — Digital Agency for ${ind.name} | Uniix Studio`,
    ogTitle: `${ind.name} | Uniix Studio`,
    description: ind.description,
    image: ind.image || undefined,
    seo: ind.seo,
  });
}

export default async function IndustryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [industries, projects] = await Promise.all([getIndustries(), getProjects()]);
  const industry = industries.find((i) => i.slug === slug);
  if (!industry) return notFoundOrRedirect(`/industries/${slug}/`);

  const others = industries.filter((i) => i.slug !== slug).slice(0, 4);
  const work = (industry.projectSlugs ?? [])
    .map((s) => projects.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const pairs = [
    { heading: "The challenge", items: industry.challenges ?? [] },
    { heading: "How we help", items: industry.solutions ?? [] },
  ].filter((g) => g.items.length > 0);

  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Industries", url: "/industries/" },
    { name: industry.name, url: `/industries/${industry.slug}/` },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
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

      {/* Optional CMS sections — render only when an editor has filled them. */}
      {industry.body && (
        <section className="pb-16 md:pb-24">
          <div className="wrap">
            <div className="max-w-[68ch] mx-auto text-ink-2 text-[17px] leading-[1.7] [&_h2]:display [&_h2]:text-ink [&_h2]:text-[clamp(26px,3vw,36px)] [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:mb-5 [&_ul]:list-disc [&_ul]:pl-6 [&_a]:underline">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{industry.body}</ReactMarkdown>
            </div>
          </div>
        </section>
      )}

      {pairs.length > 0 && (
        <section className="pb-16 md:pb-24">
          <div className="wrap grid gap-12 lg:grid-cols-2">
            {pairs.map((g) => (
              <Reveal key={g.heading}>
                <h2 className="display" style={{ fontSize: "clamp(28px,3.4vw,44px)" }}>
                  {g.heading}
                </h2>
                <ul className="mt-8 border-t border-line">
                  {g.items.map((it) => (
                    <li key={it.title} className="border-b border-line py-6">
                      <h3 className="font-display font-medium text-[20px] tracking-[-0.015em]">{it.title}</h3>
                      {it.body && <p className="mt-2 text-ink-2 text-[15px] leading-[1.6]">{it.body}</p>}
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </section>
      )}

      {(work.length > 0 || (industry.serviceLinks?.length ?? 0) > 0) && (
        <section className="pb-16 md:pb-24">
          <div className="wrap">
            {work.length > 0 && (
              <>
                <Reveal>
                  <span className="eyebrow">Selected work</span>
                </Reveal>
                <div className="mt-8 grid gap-6 md:grid-cols-2">
                  {work.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/portfolio/${p.slug}/`}
                      className="group block rounded-lg2 border border-line bg-bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                    >
                      <span className="t-meta text-ink-mute">{p.overline}</span>
                      <h3 className="mt-3 font-display font-medium text-[26px] tracking-[-0.02em]">{p.title}</h3>
                      <p className="mt-3 text-ink-2 text-[15px] leading-[1.6]">{p.summary}</p>
                    </Link>
                  ))}
                </div>
              </>
            )}
            {(industry.serviceLinks?.length ?? 0) > 0 && (
              <ul className="mt-10 flex flex-wrap gap-3">
                {industry.serviceLinks!.map((s) => (
                  <li key={s.href}>
                    <Link href={s.href} className="btn btn-secondary btn-sm">
                      {s.label} <span className="cta-arrow">↗</span>
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </section>
      )}

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
