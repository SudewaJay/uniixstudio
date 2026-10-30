import type { Metadata } from "next";
import { hasPageMeta, pageMeta } from "@/lib/seo-metadata";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { getLocations, locationServicesFor } from "@/lib/cms/locations";
import { getPosts } from "@/lib/cms/blog";
import { getDetailedProjects } from "@/lib/cms/projects";
import { getSiteSettings } from "@/lib/cms/site";
import { buildMetadata } from "@/lib/cms/seo";
import { notFoundOrRedirect } from "@/lib/cms/redirects";
import {
  localBusinessAreaSchema,
  breadcrumbSchema,
  faqPageSchema,
  schemaGraph,
} from "@/lib/schema";

/** Merged service sections, in page order, with their on-page headings. */
const SECTION_ORDER = ["web-design", "web-development", "ecommerce"];
const SECTION_TITLES: Record<string, string> = {
  "web-design": "Web design",
  "web-development": "Web development",
  ecommerce: "E-commerce",
};

export async function generateStaticParams() {
  return (await getLocations()).map((l) => ({ area: l.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ area: string }>;
}): Promise<Metadata> {
  const { area } = await params;
  const loc = (await getLocations()).find((l) => l.slug === area);
  if (!loc) return { title: "Location" };
  const path = `/locations/${loc.slug}/`;
  if (hasPageMeta(path)) return pageMeta(path, { seo: loc.seo });
  return buildMetadata({
    path,
    title: `Web Design & Development in ${loc.name} | Uniix Studio`,
    description: loc.metaDescription,
    seo: loc.seo,
  });
}

export default async function LocationDetailPage({
  params,
}: {
  params: Promise<{ area: string }>;
}) {
  const { area } = await params;
  const [locations, posts, combos, site, projects] = await Promise.all([
    getLocations(),
    getPosts(),
    locationServicesFor(area),
    getSiteSettings(),
    getDetailedProjects(),
  ]);
  const loc = locations.find((l) => l.slug === area);
  if (!loc) return notFoundOrRedirect(`/locations/${area}/`);

  // The old /locations/<town>/<service>/ pages now live here as sections (their
  // URLs 301 to this page). The CMS "Location pages" collection is still where
  // that copy is edited.
  const sections = SECTION_ORDER.map((slug) => combos.find((c) => c.service === slug)).filter(
    (c): c is NonNullable<typeof c> => Boolean(c),
  );
  const sectionSlugs = new Set(sections.map((c) => c.service));

  // Town FAQs first, then the merged service FAQs (deduped by question).
  const seen = new Set<string>();
  const faqs = [...loc.faqs, ...sections.flatMap((c) => c.faqs)].filter((f) => {
    const key = f.question.trim().toLowerCase();
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });

  // Local proof: case studies whose client is based in this town. With none,
  // fall back to work from the other towns we serve, labelled as nearby.
  // TODO(sudewa): add a real local client/project for towns that only show "nearby" work (currently Negombo, Wattala).
  const inTown = (p: (typeof projects)[number], name: string) =>
    (p.location ?? "").toLowerCase().includes(name.toLowerCase());
  const localWork = projects.filter((p) => inTown(p, loc.name));
  const nearbyWork = localWork.length
    ? []
    : projects.filter((p) => locations.some((l) => l.slug !== loc.slug && inTown(p, l.name)));
  const work = (localWork.length ? localWork : nearbyWork).slice(0, 3);

  const schema = schemaGraph(
    localBusinessAreaSchema(loc, site),
    breadcrumbSchema([
      { name: "Home", url: "/" },
      { name: "Locations", url: "/locations/" },
      { name: loc.name, url: `/locations/${loc.slug}/` },
    ]),
    ...(faqs.length ? [faqPageSchema(faqs)] : []),
  );

  const others = locations.filter((l) => l.slug !== loc.slug);
  const guides = loc.relatedPosts
    .map((slug) => posts.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <>
      <JsonLd data={schema} />

      <PageHeader
        eyebrow={`Locations · ${loc.district} District`}
        title={
          <>
            Web design in{" "}
            <span className="italic-display gradient-text">{loc.name}</span>.
          </>
        }
        lede={loc.lede}
      />

      {/* Intro / local relevance */}
      <section className="pb-14 md:pb-20">
        <div className="wrap max-w-3xl">
          <div className="space-y-5 text-[16px] md:text-[17px] leading-[1.7] text-ink/80">
            {loc.intro.map((para, i) => (
              <Reveal key={i} delay={(i % 3) as 0 | 1 | 2}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services we offer here */}
      <section className="pb-14 md:pb-20">
        <div className="wrap">
          <h2 className="font-display font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-2">
            What we do for {loc.name} businesses
          </h2>
          <p className="text-ink/60 text-[15px] mb-8 max-w-2xl">
            {loc.localAngle}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {loc.featuredServices.map((svc, i) => {
              const hasCombo = sectionSlugs.has(svc.slug);
              const href = hasCombo ? `#${svc.slug}` : `/services/${svc.pillar}/${svc.slug}`;
              return (
                <Reveal key={svc.slug} delay={(i % 3) as 0 | 1 | 2}>
                  <Link
                    href={href}
                    className="group block rounded-2xl border border-ink/10 p-6 hover:border-ink/30 hover:shadow-soft transition-all"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/40 block mb-2">
                      {hasCombo ? `${loc.name} service` : "Service"}
                    </span>
                    <h3 className="font-display font-medium text-[19px] tracking-[-0.01em] mb-1 group-hover:text-brand-3 transition-colors">
                      {svc.label} in {loc.name}
                    </h3>
                    <span className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink/50 group-hover:text-ink/80 transition-colors">
                      Learn more &rarr;
                    </span>
                  </Link>
                </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Merged service sections (formerly /locations/<town>/<service>/) */}
      {sections.map((c) => (
        <section key={c.service} id={c.service} className="pb-14 md:pb-20 scroll-mt-28">
          <div className="wrap">
            <div className="max-w-3xl">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/40 block mb-2">
                {loc.name} · {c.serviceLabel}
              </span>
              <h2 className="font-display font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-4">
                {SECTION_TITLES[c.service] ?? c.serviceLabel}
              </h2>
              <p className="text-ink/80 text-[17px] leading-[1.6] mb-5">{c.lede}</p>
              <div className="space-y-5 text-[16px] md:text-[17px] leading-[1.7] text-ink/80">
                {c.intro.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
            </div>
            {c.benefits.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-8">
                {c.benefits.map((b, i) => (
                  <Reveal key={b.title} delay={(i % 3) as 0 | 1 | 2}>
                    <div className="h-full rounded-2xl border border-ink/10 p-6">
                      <span className="font-mono text-[11px] tracking-[0.14em] text-brand-3 mb-3 block">0{i + 1}</span>
                      <h3 className="font-display font-medium text-[19px] tracking-[-0.01em] mb-2">{b.title}</h3>
                      <p className="text-ink/70 text-[14.5px] leading-[1.6]">{b.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            )}
            <Link
              href={`/services/${c.pillar}/${c.service}/`}
              className="inline-block mt-6 font-mono text-[11px] tracking-[0.12em] uppercase text-ink/60 hover:text-ink transition-colors"
            >
              Our {c.serviceLabel.toLowerCase()} service in full &rarr;
            </Link>
          </div>
        </section>
      ))}

      {/* Local proof */}
      {work.length > 0 && (
        <section className="pb-14 md:pb-20">
          <div className="wrap">
            <h2 className="font-display font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-2">
              {localWork.length ? `Our work in ${loc.name}` : `Work near ${loc.name}`}
            </h2>
            <p className="text-ink/60 text-[15px] mb-8 max-w-2xl">
              {localWork.length
                ? `Projects for businesses based in ${loc.name}.`
                : `Projects for clients a short drive from ${loc.name}.`}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {work.map((p, i) => (
                <Reveal key={p.slug} delay={(i % 3) as 0 | 1 | 2}>
                  <Link
                    href={`/portfolio/${p.slug}/`}
                    className="group block h-full rounded-2xl border border-ink/10 overflow-hidden hover:border-ink/30 hover:shadow-soft transition-all"
                  >
                    {p.coverImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={p.coverImage}
                        alt={p.coverAlt ?? `${p.title} project by Uniix Studio`}
                        loading="lazy"
                        className="w-full aspect-[16/10] object-cover"
                      />
                    )}
                    <div className="p-6">
                      <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/40 block mb-2">
                        {p.location}
                      </span>
                      <h3 className="font-display font-medium text-[19px] tracking-[-0.01em] mb-1 group-hover:text-brand-3 transition-colors">
                        {p.title}
                      </h3>
                      <p className="text-ink/60 text-[13.5px] leading-[1.55] line-clamp-3">{p.summary}</p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Local context: industries + landmarks */}
      <section className="pb-14 md:pb-20">
        <div className="wrap">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Reveal>
              <div className="rounded-2xl bg-ink/[0.03] p-7">
                <h3 className="font-display font-medium text-[20px] mb-4">
                  Who we help in {loc.name}
                </h3>
                <ul className="space-y-2">
                  {loc.keyIndustries.map((ind) => (
                    <li
                      key={ind}
                      className="text-ink/75 text-[15px] flex items-start gap-2"
                    >
                      <span className="text-brand-3 mt-1">&bull;</span>
                      {ind}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="rounded-2xl bg-ink/[0.03] p-7">
                <h3 className="font-display font-medium text-[20px] mb-4">
                  Serving all of {loc.name}
                </h3>
                <p className="text-ink/60 text-[14px] mb-3">
                  From the {loc.landmarks[0]} out across the wider area:
                </p>
                <div className="flex flex-wrap gap-2">
                  {loc.landmarks.map((lm) => (
                    <span
                      key={lm}
                      className="font-mono text-[11px] tracking-[0.08em] px-3 py-1.5 rounded-full bg-ink/5 text-ink/70"
                    >
                      {lm}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Area served */}
      <section className="pb-14 md:pb-20">
        <div className="wrap">
          <h2 className="font-display font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-6">
            Area we serve around {loc.name}
          </h2>
          <div className="rounded-2xl overflow-hidden border border-ink/10 bg-ink/[0.03]">
            <iframe
              title={`Map of ${loc.name}, ${loc.district} District — area served by Uniix Studio`}
              src={`https://www.google.com/maps?q=${loc.geo.lat},${loc.geo.lng}&z=13&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              className="w-full h-[320px] md:h-[400px] border-0"
            />
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="pb-14 md:pb-20">
        <div className="wrap max-w-3xl">
          <h2 className="font-display font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-8">
            {loc.name} web design — FAQs
          </h2>
          <div className="divide-y divide-ink/10 border-t border-ink/10">
            {faqs.map((faq) => (
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

      {/* Local playbook — related guides */}
      {guides.length > 0 && (
        <section className="pb-14 md:pb-20">
          <div className="wrap">
            <h2 className="font-display font-medium text-[26px] md:text-[32px] tracking-[-0.02em] mb-2">
              The {loc.name} growth playbook
            </h2>
            <p className="text-ink/60 text-[15px] mb-8 max-w-2xl">
              Free guides from our team — the same tactics we use to get {loc.name}{" "}
              businesses ranking and converting.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {guides.map((post, i) => (
                <Reveal key={post.slug} delay={(i % 3) as 0 | 1 | 2}>
                  <Link
                    href={`/blog/${post.slug}`}
                    className="group block h-full rounded-2xl border border-ink/10 p-6 hover:border-ink/30 hover:shadow-soft transition-all"
                  >
                    <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink/40 block mb-3">
                      {post.category} · Guide
                    </span>
                    <h3 className="font-display font-medium text-[18px] leading-[1.25] tracking-[-0.01em] mb-2 group-hover:text-brand-3 transition-colors">
                      {post.title}
                    </h3>
                    <p className="text-ink/60 text-[13.5px] leading-[1.55] line-clamp-3">
                      {post.excerpt}
                    </p>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="pb-16 md:pb-24">
        <div className="wrap">
          <div className="rounded-3xl bg-ink text-white p-10 md:p-14 text-center">
            <h2 className="font-display font-medium text-[28px] md:text-[38px] tracking-[-0.02em] mb-3">
              Ready to grow your {loc.name} business online?
            </h2>
            <p className="text-white/70 text-[16px] max-w-xl mx-auto mb-7">
              Tell us about your business and we&rsquo;ll show you exactly how a
              better website and brand pays for itself.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="inline-block px-7 py-3.5 rounded-full bg-white text-ink font-medium text-[15px] hover:bg-white/90 transition-colors"
              >
                Start a project
              </Link>
              {site.whatsappLink && (
                <a
                  href={site.whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block px-7 py-3.5 rounded-full border border-white/30 text-white font-medium text-[15px] hover:bg-white/10 transition-colors"
                >
                  WhatsApp us
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Other locations */}
      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <h2 className="font-mono text-[11px] tracking-[0.2em] uppercase text-ink/40 mb-6">
            Other areas we serve
          </h2>
          <div className="flex flex-wrap gap-4">
            {others.map((o) => (
              <Link
                key={o.slug}
                href={`/locations/${o.slug}`}
                className="font-display text-[18px] text-ink/70 hover:text-ink underline underline-offset-4 decoration-ink/20 hover:decoration-ink/60 transition-colors"
              >
                Web design in {o.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
