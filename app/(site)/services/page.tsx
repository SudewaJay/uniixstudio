import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "@/lib/seo-metadata";
import { getPillars, getServices } from "@/lib/cms/services";
import { getProjects } from "@/lib/cms/projects";
import { getProcess } from "@/lib/cms/content";
import { getSiteSettings } from "@/lib/cms/site";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import DisciplineIndex, { type IndexService } from "@/components/services/DisciplineIndex";
import ProofGrid, { type ProofItem } from "@/components/services/ProofGrid";
import ProcessSteps from "@/components/services/ProcessSteps";
import EnquiryClose from "@/components/studio/EnquiryClose";
import { DISCIPLINES, OWN_PRODUCTS, TOOLS, enquiryHref, projectsForService } from "@/lib/studio";

export const metadata: Metadata = pageMeta("/services/");

/** Projects that prove the services page, in this order. */
const PROOF = ["cricbook", "rentmycar-lk", "st-lukes-medilab", "ecowave-energy"];

const LOOK = {
  design: { tone: "paper", frame: "plain" },
  technology: { tone: "dark", frame: "browser" },
  growth: { tone: "light", frame: "chart" },
} as const;

export default async function ServicesPage() {
  const [pillars, services, projects, stages, settings] = await Promise.all([
    getPillars(),
    getServices(),
    getProjects(),
    getProcess(),
    getSiteSettings(),
  ]);

  const disciplines = DISCIPLINES.map((d, i) => {
    const pillar = pillars.find((p) => p.slug === d.slug);
    const list: IndexService[] = services
      .filter((s) => s.pillar === d.slug)
      .map((s) => {
        const proof = projectsForService(s, projects).find((p) => p.coverImage);
        return {
          slug: s.slug,
          name: s.name,
          desc: s.metaDescription,
          href: `/services/${d.slug}/${s.slug}/`,
          enquireHref: enquiryHref(s),
          // Real work only. Services without a matching project get a
          // typographic panel instead of the CMS stock cover.
          cover: proof?.coverImage,
          coverAlt: proof ? `${proof.title}, ${s.name.toLowerCase()} by Uniix Studio` : undefined,
          deliverables: (s.deliverables ?? []).slice(0, 6).map((x) => x.name),
          proof: proof
            ? { slug: proof.slug, title: proof.title, cover: proof.coverImage, own: OWN_PRODUCTS.has(proof.slug) }
            : undefined,
        };
      });
    return { ...d, index: String(i + 1).padStart(2, "0"), tagline: pillar?.tagline ?? "", list };
  });

  const proof: ProofItem[] = PROOF.map((slug) => projects.find((p) => p.slug === slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p?.coverImage))
    .map((p) => ({
      slug: p.slug,
      title: p.title,
      cover: p.coverImage,
      did: (p.services ?? p.tags ?? []).slice(0, 4),
      own: OWN_PRODUCTS.has(p.slug),
      year: p.year,
    }));

  const total = disciplines.reduce((n, d) => n + d.list.length, 0);
  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Services", url: "/services/" },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />

      {/* ------------------------------------------------------------ Intro */}
      <section aria-labelledby="services-title" className="relative overflow-hidden bg-bg pb-20 pt-[calc(var(--header-h)+56px)] md:pb-28 md:pt-[calc(var(--header-h)+88px)]">
        <div className="wrap-wide">
          <p className="rise-in font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute" style={{ animationDelay: "40ms" }}>
            Services · {total} across three disciplines
          </p>
          <h1
            id="services-title"
            className="mt-8 font-display font-medium leading-[0.86] tracking-[-0.06em] text-ink text-[clamp(44px,11.5vw,200px)]"
          >
            <span className="sr-only">Services: </span>
            {disciplines.map((d, i) => (
              <span
                key={d.slug}
                className="mask-line block"
                style={{ paddingLeft: ["0", "clamp(0px,9vw,180px)", "clamp(0px,3vw,60px)"][i] }}
              >
                <span className="block" style={{ animationDelay: `${120 + i * 110}ms` }}>
                  <a href={`#${d.slug}`} className="svc-word group inline-flex items-start gap-[0.12em]">
                    <span className="transition-colors duration-std group-hover:text-brand-ink">{d.label}</span>
                    <sup className="mt-[0.5em] font-mono text-[11px] font-normal tracking-[0.1em] text-ink-mute md:text-[13px]" aria-hidden="true">
                      {String(d.list.length).padStart(2, "0")}
                    </sup>
                  </a>
                  {i < disciplines.length - 1 && (
                    <span aria-hidden="true" className="svc-x ml-[0.18em] inline-block text-brand-3">
                      ×
                    </span>
                  )}
                </span>
              </span>
            ))}
          </h1>

          <div
            className="rise-in mt-14 flex flex-col gap-6 border-t border-ink/15 pt-6 md:mt-20 md:flex-row md:items-center md:justify-between"
            style={{ animationDelay: "520ms" }}
          >
            <p className="max-w-[40ch] text-[clamp(17px,1.4vw,21px)] leading-[1.45] text-ink-2">
              Hire us for one service, or for all three working as one team.
            </p>
            <Link href="#start" className="btn btn-primary group self-start md:self-auto">
              Start a project <span className="cta-arrow">↓</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- The three indexes */}
      {disciplines.map((d) => (
        <DisciplineIndex
          key={d.slug}
          id={d.slug}
          index={d.index}
          label={d.label}
          tagline={d.tagline}
          tools={TOOLS[d.slug]}
          services={d.list}
          tone={LOOK[d.slug].tone}
          frame={LOOK[d.slug].frame}
        />
      ))}

      {proof.length > 0 && <ProofGrid items={proof} />}
      {stages.length > 0 && <ProcessSteps stages={stages} />}

      <EnquiryClose
        heading={<>One service or the whole build.</>}
        note="Tell us what you need. We'll reply with a plan and a quote."
        email={settings.email}
        whatsappLink={settings.whatsappLink}
        whatsappText="Hi Uniix, I'd like to talk about a project."
      />
    </>
  );
}
