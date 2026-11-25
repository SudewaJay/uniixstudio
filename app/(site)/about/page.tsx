import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo-metadata";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { getAbout, getSiteSettings } from "@/lib/cms/site";
import { getFeaturedClients } from "@/lib/cms/content";
import { getPillars } from "@/lib/cms/services";
import { DISCIPLINES, FOUNDED, MARKETS } from "@/lib/studio";
import ScrollStatement from "@/components/about/ScrollStatement";
import DisciplineVenn, { type VennItem } from "@/components/about/DisciplineVenn";
import EnquiryClose from "@/components/studio/EnquiryClose";

export async function generateMetadata(): Promise<Metadata> {
  const [about, settings] = await Promise.all([getAbout(), getSiteSettings()]);
  return pageMeta("/about/", { seo: about.seo, fallbackImage: settings.defaultOgImage });
}

const PRINCIPLES = [
  { title: "Strategy before execution", line: "We agree what the work has to achieve before anything is designed." },
  { title: "Direct collaboration", line: "You talk to the people doing the work, not an account manager." },
  { title: "Creative and technical craft", line: "Design and code are held to the same standard." },
  { title: "Transparent communication", line: "Clear scope, clear quotes and regular check-ins." },
  { title: "Long-term relationships", line: "We stay on after launch to look after what we built." },
];

export default async function AboutPage() {
  const [about, clients, pillars, settings] = await Promise.all([
    getAbout(),
    getFeaturedClients(),
    getPillars(),
    getSiteSettings(),
  ]);
  const story = (about.story?.paragraphs ?? []).map((p) => p.paragraph).filter(Boolean);
  const year = new Date().getFullYear();

  const venn: VennItem[] = DISCIPLINES.map((d) => {
    const p = pillars.find((x) => x.slug === d.slug);
    return { slug: d.slug, label: d.label, tagline: p?.tagline ?? "", capabilities: (p?.capabilities ?? []).map((c) => c.name) };
  });

  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "About", url: "/about/" },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />

      {/* ------------------------------------------------------------ Intro */}
      <section aria-labelledby="about-title" className="relative overflow-hidden bg-bg pb-16 pt-[calc(var(--header-h)+56px)] md:pb-24 md:pt-[calc(var(--header-h)+88px)]">
        <div className="wrap-wide">
          <p className="rise-in font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute" style={{ animationDelay: "40ms" }}>
            About Uniix Studio
          </p>
          <h1
            id="about-title"
            className="mt-8 font-display font-medium leading-[0.9] tracking-[-0.055em] text-ink text-[clamp(44px,7.2vw,128px)]"
          >
            <span className="mask-line block">
              <span className="block" style={{ animationDelay: "120ms" }}>
                One team for the brand,
              </span>
            </span>
            <span className="mask-line block">
              <span className="block" style={{ animationDelay: "220ms" }}>
                the build <span className="text-brand-ink">and the growth.</span>
              </span>
            </span>
          </h1>
        </div>

        <div className="wrap-wide mt-16 flex flex-col gap-8 md:mt-24 md:flex-row md:items-end md:justify-between">
          <p className="rise-in max-w-[38ch] text-[clamp(17px,1.4vw,21px)] leading-[1.45] text-ink-2" style={{ animationDelay: "420ms" }}>
            A design and technology studio in Colombo, working with clients in {MARKETS.slice(0, -1).join(", ")} and the UK.
          </p>
          <p aria-hidden="true" className="about-year select-none font-display font-medium leading-[0.75] tracking-[-0.06em] text-[clamp(96px,17vw,300px)]">
            {FOUNDED}
          </p>
        </div>
      </section>

      {/* ------------------------------------------------------------ Story */}
      <section id="story" aria-labelledby="story-title" className="border-t border-ink/10 bg-bg-paper py-24 md:py-36">
        <div className="wrap-wide grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="lg:sticky lg:top-[calc(var(--header-h)+32px)] lg:h-fit">
            <h2 id="story-title" className="font-display font-medium leading-[0.92] tracking-[-0.05em] text-ink text-[clamp(40px,5vw,84px)]">
              Why Uniix exists
            </h2>
            <ol className="mt-10 border-t border-ink/15">
              {[
                { when: String(FOUNDED), what: "Started as a graphic design studio" },
                { when: "Then", what: "Websites, apps and platforms" },
                { when: "Now", what: "Design, technology and growth" },
              ].map((m) => (
                <li key={m.when} className="grid grid-cols-[84px_minmax(0,1fr)] border-b border-ink/15 py-4 text-[15.5px]">
                  <span className="font-mono text-[12px] uppercase tracking-[0.14em] text-brand-ink">{m.when}</span>
                  <span className="text-ink-2">{m.what}</span>
                </li>
              ))}
            </ol>
          </div>
          <div className="flex flex-col gap-8">
            {story.map((p, i) => (
              <Reveal key={i}>
                <p
                  className={
                    i === 0
                      ? "font-display text-[clamp(24px,2.5vw,38px)] font-medium leading-[1.2] tracking-[-0.025em] text-ink"
                      : "max-w-[60ch] text-[clamp(17px,1.3vw,19px)] leading-[1.65] text-ink-2"
                  }
                >
                  {p}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ------------------------------------------------------- Philosophy */}
      <ScrollStatement
        id="philosophy"
        label="What we believe"
        text="Great design should be accountable to business outcomes."
        accent={["accountable"]}
      />

      {/* ------------------------------------------------------ Disciplines */}
      <DisciplineVenn items={venn} />

      {/* -------------------------------------------------------- Approach */}
      <section id="approach" aria-labelledby="approach-title" className="bg-bg py-24 md:py-36">
        <div className="wrap-wide">
          <h2 id="approach-title" className="font-display font-medium leading-[0.9] tracking-[-0.05em] text-ink text-[clamp(44px,6vw,100px)]">
            How we work
          </h2>
          <ol className="mt-14 border-t border-ink/15 md:mt-20">
            {PRINCIPLES.map((p, i) => (
              <li key={p.title} className="about-row group grid gap-2 border-b border-ink/15 py-7 md:grid-cols-[88px_minmax(0,1fr)_minmax(0,1fr)] md:items-baseline md:gap-8 md:py-9">
                <span className="font-mono text-[12px] tabular-nums text-ink-mute">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="font-display text-[clamp(26px,3vw,46px)] font-medium leading-[1] tracking-[-0.035em] text-ink transition-colors duration-std group-hover:text-brand-ink">
                  {p.title}
                </h3>
                <p className="max-w-[40ch] text-[16px] leading-[1.55] text-ink-2">{p.line}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* --------------------------------------------------------- Clients */}
      {clients.length > 0 && (
        <section id="clients" aria-labelledby="clients-title" className="border-t border-ink/10 bg-bg-paper py-20 md:py-28">
          <div className="wrap-wide grid gap-10 lg:grid-cols-[minmax(0,0.6fr)_minmax(0,1.4fr)] lg:items-center">
            <h2 id="clients-title" className="font-display font-medium leading-[0.95] tracking-[-0.045em] text-ink text-[clamp(32px,3.6vw,56px)]">
              Clients
            </h2>
            <ul className="grid grid-cols-2 border-l border-t border-ink/10 sm:grid-cols-3">
              {clients.map((c) => (
                <li key={c.name} className="grid h-28 place-items-center border-b border-r border-ink/10 p-6 md:h-36">
                  {c.logo ? (
                    <span className="relative block h-10 w-full max-w-[150px] md:h-12">
                      <SmartImage
                        src={c.logo}
                        alt={c.alt || `${c.name} logo`}
                        sizes="150px"
                        fit="contain"
                        className="opacity-60 transition-[opacity,filter] duration-std [filter:grayscale(1)_brightness(0)] hover:opacity-100 hover:[filter:none]"
                      />
                    </span>
                  ) : (
                    <span className="text-[17px] text-ink-2">{c.name}</span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <EnquiryClose
        heading={<>Come and meet the studio.</>}
        note={`Colombo, since ${FOUNDED}. ${year - FOUNDED} years of brands, websites and products.`}
        email={settings.email}
        whatsappLink={settings.whatsappLink}
        whatsappText="Hi Uniix, I'd like to have a chat about a project."
      />
    </>
  );
}
