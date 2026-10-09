import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Reveal from "@/components/Reveal";
import CTASection from "@/components/CTASection";
import TestimonialsSection from "@/components/TestimonialsSection";
import { breadcrumbSchema, schemaGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import SmartImage from "@/components/ui/SmartImage";
import { getAbout, getSiteSettings } from "@/lib/cms/site";
import { getFeaturedTestimonials, getTeam, getWhyPoints } from "@/lib/cms/content";
import { buildMetadata } from "@/lib/cms/seo";
import { site } from "@/lib/content";

export async function generateMetadata(): Promise<Metadata> {
  const [about, settings] = await Promise.all([getAbout(), getSiteSettings()]);
  return buildMetadata({
    path: "/about/",
    title: "About Uniix Studio | Creative Design Agency in Sri Lanka",
    description:
      "Meet the team behind Uniix Studio — a Colombo-based creative agency working with ambitious brands across Sri Lanka, Australia and the UK. No middlemen.",
    seo: about.seo,
    fallbackImage: settings.defaultOgImage,
  });
}

export default async function AboutPage() {
  const [about, team, whyPoints, testimonials] = await Promise.all([
    getAbout(),
    getTeam(),
    getWhyPoints(),
    getFeaturedTestimonials(),
  ]);
  const hero = about.hero ?? {};
  const story = (about.story?.paragraphs ?? []).map((p) => p.paragraph);
  const members = team.filter((m) => m.featured).length ? team.filter((m) => m.featured) : team;
  const awards = about.awards ?? [];

  // Person nodes only for real, named people (not the studio placeholder).
  const people = members
    .filter((m) => m.name !== site.name)
    .map((m) => ({
      "@context": "https://schema.org",
      "@type": "Person",
      name: m.name,
      jobTitle: m.role,
      worksFor: { "@id": `${site.url}/#organization` },
      ...(m.photo ? { image: m.photo.src } : {}),
      ...(m.links.length ? { sameAs: m.links.map((l) => l.href) } : {}),
    }));

  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about/" },
  ]);

  return (
    <>
      <JsonLd data={people.length ? schemaGraph(crumbs, ...people) : crumbs} />
      <PageHeader
        eyebrow={hero.eyebrow ?? "About Uniix Studio"}
        title={
          <>
            {hero.heading ?? "A studio for"}{" "}
            <span className="italic-display gradient-text">{hero.headingAccent ?? "work that lasts."}</span>
          </>
        }
        lede={hero.lede ?? undefined}
      />

      {/* Story */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_1.4fr] gap-12 lg:gap-24 items-start">
            <Reveal>
              <span className="eyebrow">{about.story?.eyebrow ?? "Our story"}</span>
            </Reveal>
            <Reveal delay={1}>
              <div className="flex flex-col gap-6 text-[18px] leading-[1.65] text-ink-2 max-w-[60ch]">
                {story.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 md:py-28 bg-bg-warm">
        <div className="wrap">
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <div className="bg-bg-paper border border-line rounded-lg2 p-10 md:p-12 h-full">
                <span className="eyebrow">{about.mission?.eyebrow ?? "Mission"}</span>
                <h3
                  className="display mt-5 mb-5"
                  style={{ fontSize: "clamp(32px,3.5vw,44px)" }}
                >
                  {about.mission?.heading}{" "}
                  <span className="italic-display gradient-text">{about.mission?.headingAccent}</span>
                </h3>
                <p className="text-ink-2 text-[16px] leading-[1.6] max-w-[44ch]">{about.mission?.body}</p>
              </div>
            </Reveal>
            <Reveal delay={1}>
              <div className="bg-ink text-white rounded-lg2 p-10 md:p-12 h-full relative overflow-hidden">
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "-30%",
                    right: "-20%",
                    width: "70%",
                    height: "100%",
                    background:
                      "radial-gradient(closest-side, rgba(232,98,26,.4), transparent 70%)",
                  }}
                />
                <div className="relative">
                  <span className="eyebrow text-white/70">{about.vision?.eyebrow ?? "Vision"}</span>
                  <h3
                    className="display mt-5 mb-5"
                    style={{ fontSize: "clamp(32px,3.5vw,44px)" }}
                  >
                    {about.vision?.heading}{" "}
                    <span className="italic-display gradient-text">{about.vision?.headingAccent}</span>
                  </h3>
                  <p className="text-white/80 text-[16px] leading-[1.6] max-w-[44ch]">{about.vision?.body}</p>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* Founder / Team */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end mb-14">
            <Reveal>
              <span className="eyebrow">{about.team?.eyebrow ?? "The team"}</span>
              <h2 className="display mt-4" style={{ fontSize: "clamp(40px,5vw,72px)" }}>
                {about.team?.heading ?? "Senior people."}
                <br />
                <span className="italic-display gradient-text">{about.team?.headingAccent ?? "Direct lines."}</span>
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="text-[clamp(16px,1.3vw,18px)] text-ink-2 max-w-[42ch] leading-[1.55]">
                {about.team?.support}
              </p>
            </Reveal>
          </div>

          <div className="flex flex-col gap-6">
            {members.map((m) => (
              <Reveal key={m.id}>
                <div className="bg-bg-paper border border-line rounded-lg2 p-8 md:p-12 grid md:grid-cols-[auto_1fr] gap-8 md:gap-12 items-center">
                  {m.photo ? (
                    <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden shadow-soft">
                      <SmartImage src={m.photo.src} alt={m.photo.alt || m.name} sizes="160px" />
                    </div>
                  ) : (
                    <div
                      aria-hidden="true"
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full bg-brand-grad text-white grid place-items-center font-display font-bold text-6xl shadow-soft"
                    >
                      {m.initial}
                    </div>
                  )}
                  <div>
                    <div className="font-mono text-[11px] tracking-[0.18em] uppercase text-brand-4 mb-2">
                      {m.role}
                    </div>
                    <h3
                      className="font-display font-medium mb-3"
                      style={{ fontSize: "clamp(28px,3vw,36px)", letterSpacing: "-0.02em" }}
                    >
                      {m.name}
                    </h3>
                    {m.bio && <p className="text-ink-2 text-[16px] leading-[1.6] max-w-[60ch]">{m.bio}</p>}
                    {m.links.length > 0 && (
                      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
                        {m.links.map((l) => (
                          <li key={l.href}>
                            <a href={l.href} target="_blank" rel="noopener noreferrer" className="link-cta text-[14px]">
                              {l.label} <span className="cta-arrow">↗</span>
                            </a>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {awards.length > 0 && (
            <Reveal>
              <div className="mt-14">
                <span className="eyebrow">Awards &amp; certifications</span>
                <ul className="mt-6 grid gap-x-8 sm:grid-cols-2 border-t border-line">
                  {awards.map((a) => (
                    <li key={a.id ?? a.title} className="flex items-baseline justify-between gap-4 border-b border-line py-4">
                      <span className="font-display text-[18px] font-medium">{a.title}</span>
                      <span className="t-meta text-ink-mute">
                        {[a.issuer, a.year].filter(Boolean).join(" · ")}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          )}
        </div>
      </section>

      {/* Why choose us */}
      <section className="py-20 md:py-28 bg-bg-warm">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 lg:gap-12 items-end mb-14">
            <Reveal>
              <span className="eyebrow">{about.why?.eyebrow ?? "Why choose us"}</span>
              <h2 className="display mt-4" style={{ fontSize: "clamp(40px,5vw,72px)" }}>
                {about.why?.heading ?? "Five reasons"}{" "}
                <span className="italic-display gradient-text">{about.why?.headingAccent ?? "clients stay."}</span>
              </h2>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {whyPoints.map((p, i) => (
              <Reveal key={p.num} delay={(i % 4) as 0 | 1 | 2 | 3}>
                <div className="bg-bg-paper border border-line rounded-lg2 p-8 md:p-10 h-full transition-all duration-300 hover:-translate-y-1 hover:shadow-sm2">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-brand-4">
                    {p.num}
                  </span>
                  <h4
                    className="font-display font-medium mt-4 mb-3"
                    style={{ fontSize: "24px", letterSpacing: "-0.015em" }}
                  >
                    {p.title}
                  </h4>
                  <p className="text-ink-2 text-[15px] leading-[1.55]">{p.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection items={testimonials} />
      <CTASection />
    </>
  );
}
