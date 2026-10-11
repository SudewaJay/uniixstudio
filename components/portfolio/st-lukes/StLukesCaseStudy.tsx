import Link from "next/link";
import Reveal from "@/components/Reveal";
import NextProjectExhibition from "@/components/portfolio/case-study/NextProjectExhibition";
import type { Project } from "@/lib/projects";
import { BrowserFrame, PhoneFrame } from "./Frames";
import PriceFinder from "./PriceFinder";
import PackageMatrix from "./PackageMatrix";
import TownExplorer from "./TownExplorer";
import QueryRouter from "./QueryRouter";
import SchemaExplorer from "./SchemaExplorer";
import ArticleWall from "./ArticleWall";
import SiteScroller from "./SiteScroller";
import {
  SL,
  analyzers,
  articles,
  challenge,
  contactWays,
  heroStats,
  lighthouse,
  packageMatrix,
  packages,
  queries,
  relatedServices,
  schemaPages,
  schemaTypes,
  scrollPages,
  shots,
  testCategories,
  tests,
  timeline,
  topicInfo,
  townAnatomy,
  towns,
} from "./data";

function Head({
  n,
  kicker,
  title,
  id,
  lead,
  dark,
  className,
}: {
  n: string;
  kicker: string;
  title: React.ReactNode;
  id: string;
  lead?: React.ReactNode;
  dark?: boolean;
  className?: string;
}) {
  return (
    <div className={className}>
      <Reveal>
        <p className="eyebrow">
          <span style={{ color: dark ? "#A6E08A" : SL.greenDark }}>{n}</span> {kicker}
        </p>
        <h2 id={id} className="t-h2 mt-5 max-w-[18ch]">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={1}>
          <p className={`t-lead mt-6 max-w-[56ch] ${dark ? "text-white/75" : "text-ink-2"}`}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

function Ring({ score, label, note }: { score: number; label: string; note: string }) {
  const r = 42;
  const c = 2 * Math.PI * r;
  return (
    <figure className="flex flex-col items-center text-center">
      <div className="relative h-[120px] w-[120px]">
        <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90" aria-hidden="true">
          <circle cx="50" cy="50" r={r} fill="none" stroke="rgba(15,23,42,.08)" strokeWidth="7" />
          <circle cx="50" cy="50" r={r} fill="none" stroke={SL.green} strokeWidth="7" strokeLinecap="round" strokeDasharray={`${(score / 100) * c} ${c}`} />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-display text-[34px] font-semibold tabular-nums text-ink">
          {score}
        </span>
      </div>
      <figcaption className="mt-4">
        <span className="block font-display text-[17px] font-medium text-ink">{label}</span>
        <span className="mt-1 block text-[13px] text-ink-mute">{note}</span>
      </figcaption>
    </figure>
  );
}

const fmtLKR = (n: number) => n.toLocaleString("en-LK");

export default function StLukesCaseStudy({
  project,
  nextProject,
  prevProject,
}: {
  project: Project;
  nextProject: Project;
  prevProject?: Project;
}) {
  const prices = tests.map((t) => t.price);
  const englishCount = articles.filter((a) => !a.si).length;
  const sinhalaCount = articles.length - englishCount;

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg pt-28 md:pt-36" aria-labelledby="sl-title">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line">
            <Link
              href="/portfolio/"
              className="inline-flex items-center gap-2 min-h-[44px] font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute hover:text-brand-ink transition-colors duration-micro"
            >
              <span className="text-brand-ink" aria-hidden="true">←</span> All work
            </Link>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
              Web, SEO &amp; content case study <span className="opacity-40 mx-1.5">·</span>
              <span className="text-brand-ink">Feb 2026 – now</span>
            </p>
          </div>

          <div className="mt-10 md:mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="eyebrow rise-in">Diagnostic lab · Ja-Ela, Sri Lanka</p>
              <h1 id="sl-title" className="t-display mt-6 text-[clamp(48px,8.4vw,132px)] !leading-[0.9]">
                <span className="mask-line">
                  <span>One lab.</span>
                </span>{" "}
                <span className="mask-line">
                  <span style={{ color: SL.greenDark }}>Every search.</span>
                </span>
              </h1>
            </div>
            <div className="lg:pb-4">
              <p className="rise-in t-h3 text-ink max-w-[26ch] text-[clamp(22px,2.3vw,32px)]" style={{ animationDelay: "140ms" }}>
                {project.headline}
              </p>
              <ul
                className="rise-in mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute"
                style={{ animationDelay: "240ms" }}
                aria-label="Disciplines"
              >
                {["Design", "Development", "SEO", "Content", "Management"].map((d, i) => (
                  <li key={d} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="text-brand-ink">·</span>}
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Device composition */}
        <div className="wrap-wide mt-12 md:mt-16">
          <div
            className="relative overflow-hidden rounded-[32px] px-4 pb-0 pt-12 md:px-12 md:pt-20"
            style={{ background: `radial-gradient(70% 80% at 30% 20%, #4E9A2C 0%, ${SL.greenDarker} 55%, #17300D 100%)` }}
          >
            <div className="relative mx-auto max-w-[1080px] pb-10 md:pb-0">
              <div className="md:w-[86%] md:translate-y-[6%]">
                <BrowserFrame src={shots.home} url="stlukesmedilab.com" alt="St Luke's Medical Laboratory homepage: Trusted diagnostics, closer to home" sizes="(min-width:1024px) 900px, 100vw" priority />
              </div>
              <PhoneFrame
                src={shots.mPriceList}
                alt="St Luke's price list on mobile: 58 tests, 12 categories, from LKR 100"
                className="absolute -bottom-6 right-0 hidden w-[22%] md:block"
                sizes="240px"
                priority
              />
            </div>
          </div>
        </div>

        {/* Stat strip */}
        <div className="wrap mt-12 md:mt-16">
          <dl className="grid grid-cols-2 gap-y-8 border-y border-line py-8 md:grid-cols-4">
            {heroStats.map((s) => (
              <div key={s.label} className="px-1 md:px-6 md:first:pl-0 md:[&:not(:first-child)]:border-l md:border-line">
                <dt className="t-meta text-[10px] text-ink-mute">{s.label}</dt>
                <dd className="mt-2 font-display text-[clamp(36px,4.4vw,60px)] font-semibold leading-none tracking-[-0.03em] text-ink tabular-nums">
                  {s.value}
                  <span className="text-[0.45em] font-normal text-ink-mute">{s.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* Project information */}
      <section aria-label="Project information" className="mt-16 md:mt-20 border-y border-line bg-bg-warm">
        <div className="wrap py-10 md:py-12">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">
            {[
              { label: "Client", value: project.client ?? "St Luke's Medical Laboratory" },
              { label: "Location", value: "Ja-Ela, Sri Lanka" },
              { label: "Engagement", value: "Design, build, SEO, content & management" },
              { label: "Duration", value: "20 Feb 2026 – ongoing" },
            ].map((i) => (
              <div key={i.label}>
                <dt className="t-meta text-[10px] text-ink-mute">{i.label}</dt>
                <dd className="mt-2 font-display text-[17px] font-medium leading-[1.3] text-ink">{i.value}</dd>
              </div>
            ))}
            <div>
              <dt className="t-meta text-[10px] text-ink-mute">Live site</dt>
              <dd className="mt-2">
                <a href={project.url} target="_blank" rel="noopener" className="inline-flex min-h-[44px] items-center gap-1.5 font-display text-[17px] font-medium text-ink underline decoration-line underline-offset-4 hover:text-brand-ink">
                  stlukesmedilab.com <span aria-hidden="true">↗</span>
                </a>
              </dd>
            </div>
          </dl>
          <p className="t-body mt-8 border-t border-line pt-6 text-ink-2 max-w-[70ch]">{project.summary}</p>
        </div>
      </section>

      {/* 01 — Challenge */}
      <section aria-labelledby="sl-challenge" className="section bg-bg">
        <div className="wrap grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Head
            n="01"
            kicker="The challenge"
            id="sl-challenge"
            title="An independent lab against the national chains."
            lead="St Luke's competes for the same patients as the big chains, with a smaller budget and a smaller brand. The website had to bring patients in from Google and WhatsApp, not just sit there as a brochure."
          />
          <ol className="border-t border-line self-end">
            {challenge.map((c, i) => (
              <li key={c.title} className="border-b border-line">
                <Reveal delay={(i % 3) as 0 | 1 | 2} className="grid grid-cols-[auto_1fr] gap-x-5 py-6">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-brand-ink pt-1.5">{String(i + 1).padStart(2, "0")}</span>
                  <div>
                    <h3 className="font-display text-[19px] md:text-[21px] font-medium text-ink">{c.title}</h3>
                    <p className="t-body mt-2 text-ink-2 max-w-[58ch]">{c.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
        <div className="wrap mt-16 md:mt-24">
          <Reveal>
            <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-ink-mute">The strategy: three advantages the chains don’t use</p>
          </Reveal>
          <ol className="mt-5 grid gap-4 md:grid-cols-3">
            {[
              ["Price transparency", "Publish every price. The chains make you ask at the counter.", "#sl-prices"],
              ["Hyper-local SEO", "A real page for every town the lab serves, not one page for “Sri Lanka”.", "#sl-local"],
              ["Technical SEO", "Structured data and test-price pages the chains’ sites don’t have.", "#sl-search"],
            ].map(([t, b, href], i) => (
              <li key={t}>
                <Reveal delay={i as 0 | 1 | 2}>
                  <a href={href} className="group flex h-full flex-col justify-between gap-8 rounded-[20px] p-6 text-white transition-transform duration-std ease-uniix hover:-translate-y-1" style={{ background: i === 1 ? SL.ink : i === 0 ? SL.greenDark : SL.greenDarker }}>
                    <span className="font-mono text-[11px] tracking-[0.16em] text-white/60">0{i + 1}</span>
                    <span>
                      <span className="block font-display text-[24px] font-medium leading-tight">{t}</span>
                      <span className="mt-2 block text-[15px] leading-[1.5] text-white/75">{b}</span>
                      <span aria-hidden="true" className="mt-5 inline-block transition-transform duration-micro group-hover:translate-y-0.5">↓</span>
                    </span>
                  </a>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 02 — Price transparency */}
      <section id="sl-prices" aria-labelledby="sl-prices-h" className="section border-t border-line scroll-mt-20" style={{ background: SL.soft }}>
        <div className="wrap grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
          <div>
            <Head
              n="02"
              kicker="Price transparency"
              id="sl-prices-h"
              title="Every price, published."
              lead="The national chains won’t tell you what a test costs until you’re at their counter. St Luke’s publishes the whole list in LKR. This is the real list, in a working copy of the finder we built. Try it."
            />
            <Reveal delay={2}>
              <dl className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-line bg-line">
                {[
                  ["Tests published", String(tests.length)],
                  ["Categories", String(testCategories.length)],
                  ["From", `LKR ${fmtLKR(Math.min(...prices))}`],
                  ["Up to", `LKR ${fmtLKR(Math.max(...prices))}`],
                ].map(([l, v]) => (
                  <div key={l} className="bg-white p-5">
                    <dt className="t-meta text-[10px] text-ink-mute">{l}</dt>
                    <dd className="mt-2 font-display text-[28px] font-semibold leading-none tabular-nums text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
          <Reveal delay={1}>
            <PriceFinder tests={tests} categories={testCategories} />
          </Reveal>
        </div>

        <div className="wrap mt-20 md:mt-28">
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Reveal>
              <h3 className="t-h3 max-w-[20ch]">Four packages, four different questions.</h3>
            </Reveal>
            <Reveal delay={1}>
              <p className="t-body text-ink-2 max-w-[52ch]">
                Bundles are named for the worry that brings someone in, not for the lab’s internal panels.
                Pick one to see exactly what it includes.
              </p>
            </Reveal>
          </div>
          <Reveal delay={1} className="mt-10">
            <PackageMatrix packages={packages} rows={packageMatrix} />
          </Reveal>
        </div>
      </section>

      {/* 03 — Hyper-local */}
      <section id="sl-local" aria-labelledby="sl-local-h" className="on-dark section-loose overflow-hidden text-white scroll-mt-20" style={{ background: SL.ink }}>
        <div className="wrap">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="03" kicker="Hyper-local SEO" id="sl-local-h" title="Ten towns. Ten real pages." dark />
            <Reveal delay={1}>
              <p className="t-lead text-white/75 max-w-[48ch]">
                Seven walk-in towns and three home-visit areas along the Negombo Road corridor. Each page is
                written for its town, not copied and pasted. Pick a town on the map.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 md:mt-20">
            <TownExplorer towns={towns} anatomy={townAnatomy} phones={{ "ja-ela": shots.mJaEla, katunayake: shots.mKatunayake }} />
          </div>
        </div>
      </section>

      {/* 04 — Search */}
      <section id="sl-search" aria-labelledby="sl-search-h" className="section bg-bg scroll-mt-20">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="04" kicker="Technical SEO" id="sl-search-h" title="A page for every search." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                63 pages in the sitemap, each built around something a patient actually types. One keyword-focused
                H1 per page, canonical URLs and an auto-generated 1200×630 share image for each.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 md:mt-16">
            <QueryRouter queries={queries} />
          </div>

          <div className="mt-20 grid gap-10 border-t border-line pt-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
            <Reveal>
              <h3 className="t-h3 max-w-[18ch]">Equipment, not adjectives.</h3>
              <p className="t-body mt-4 text-ink-2 max-w-[48ch]">
                Instead of calling itself “world-class”, the lab names and pictures all four analyzers. Each is
                marked up as a <code className="text-ink">MedicalDevice</code>, which tells search engines the lab
                does its own clinical testing.
              </p>
            </Reveal>
            <ul className="grid gap-3 sm:grid-cols-2">
              {analyzers.map((a, i) => (
                <li key={a.name}>
                  <Reveal delay={(i % 2) as 0 | 1} className="h-full rounded-[16px] border border-line p-5">
                    <p className="font-mono text-[10px] tracking-[0.16em] uppercase" style={{ color: SL.greenDark }}>
                      MedicalDevice · 0{i + 1}
                    </p>
                    <p className="mt-3 font-display text-[18px] font-medium text-ink">{a.name}</p>
                    <p className="mt-1.5 text-[14px] leading-[1.5] text-ink-2">{a.runs}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 05 — Structured data */}
      <section aria-labelledby="sl-schema" className="on-dark section text-white" style={{ background: `linear-gradient(180deg, ${SL.greenDarker}, #142A0C)` }}>
        <div className="wrap">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="05" kicker="Structured data" id="sl-schema" title="22 schema types, read by machines." dark />
            <Reveal delay={1}>
              <p className="t-lead text-white/75 max-w-[48ch]">
                Patients see the page. Google, Maps and AI assistants read the structured data underneath. Pick a
                template to see what it tells them, counted from the live HTML.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 md:mt-16">
            <SchemaExplorer pages={schemaPages} allTypes={schemaTypes} />
          </div>
        </div>
      </section>

      {/* 06 — Content */}
      <section aria-labelledby="sl-content" className="section bg-bg">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
            <Head
              n="06"
              kicker="Content marketing"
              id="sl-content"
              title="Health articles, reviewed by a lab technologist."
              lead="Every article is reviewed by a qualified medical lab technologist (MLT), named in the byline, and structured so Google and AI tools like ChatGPT, Gemini and Perplexity can quote it."
            />
            <Reveal delay={1} className="self-end">
              <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-[18px] border border-line bg-line">
                {[
                  ["Articles", String(articles.length)],
                  ["Words", "≈21,400"],
                  ["English / Sinhala", `${englishCount} / ${sinhalaCount}`],
                  ["MLT-reviewed", "All"],
                ].map(([l, v]) => (
                  <div key={l} className="bg-bg p-5">
                    <dt className="t-meta text-[10px] text-ink-mute">{l}</dt>
                    <dd className="mt-2 font-display text-[30px] font-semibold leading-none tabular-nums text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Dengue moment */}
          <div className="mt-16 overflow-hidden rounded-[28px] border border-line md:mt-20" style={{ background: SL.soft }}>
            <div className="grid grid-cols-1 gap-10 p-6 md:p-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(0,1.3fr)] lg:items-center">
              <Reveal>
                <p className="font-mono text-[10px] tracking-[0.2em] uppercase" style={{ color: SL.red }}>
                  June 2026 · dengue spike
                </p>
                <h3 className="t-h3 mt-4 max-w-[18ch]">Published while people were searching.</h3>
                <p className="t-body mt-4 text-ink-2 max-w-[44ch]">
                  When dengue cases jumped in the Western Province, the dengue articles went live in English and
                  Sinhala on the same day, 7 June. A follow-up listing the official high-risk areas went live on
                  26 June.
                </p>
              </Reveal>
              <div className="relative grid grid-cols-2 gap-3 md:gap-5">
                <Reveal delay={1}>
                  <BrowserFrame src={shots.dengue} url="…/dengue-spike-2026-ja-ela-wattala" alt="Dengue Spike 2026 article in English" sizes="(min-width:1024px) 30vw, 50vw" />
                  <p className="mt-2 font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute">English</p>
                </Reveal>
                <Reveal delay={2} className="md:translate-y-8">
                  <BrowserFrame src={shots.dengueSi} url="…/dengue-spike-2026-ja-ela-wattala-si" alt="The same dengue article in Sinhala" sizes="(min-width:1024px) 30vw, 50vw" />
                  <p className="mt-2 font-mono text-[10px] tracking-[0.16em] uppercase text-ink-mute" lang="si">
                    සිංහල
                  </p>
                </Reveal>
              </div>
            </div>
          </div>

          <div className="mt-16 md:mt-20">
            <ArticleWall articles={articles} topics={topicInfo} />
          </div>
        </div>
      </section>

      {/* 07 — Experience */}
      <section aria-labelledby="sl-ux" className="section border-t border-line bg-bg-warm">
        <div className="wrap grid grid-cols-1 gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-center lg:gap-20">
          <div>
            <Head
              n="07"
              kicker="Experience"
              id="sl-ux"
              title="Five ways to get in touch, one tap away."
              lead="Built mobile-first to WCAG 2.2 AA, with 44 px minimum tap targets. Most patients arrive on a phone, so getting in touch is never more than a thumb away."
            />
            <ol className="mt-10 border-t border-line">
              {contactWays.map((c, i) => (
                <li key={c.label} className="border-b border-line">
                  <Reveal delay={(i % 3) as 0 | 1 | 2} className="grid grid-cols-[auto_1fr] gap-x-5 py-4">
                    <span className="font-mono text-[11px] tracking-[0.16em] pt-1" style={{ color: SL.greenDark }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[18px] font-medium text-ink">{c.label}</h3>
                      <p className="mt-1 text-[14px] leading-[1.55] text-ink-2">{c.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <Reveal delay={1} className="relative mx-auto flex w-full max-w-[460px] items-end justify-center gap-4">
            <PhoneFrame src={shots.mHome} alt="St Luke's homepage on mobile with Book a Home Visit and WhatsApp buttons" className="w-[52%]" sizes="240px" />
            <PhoneFrame src={shots.mTsh} alt="TSH test price page on mobile with Book on WhatsApp and call buttons" className="w-[44%] -translate-y-10" sizes="210px" />
          </Reveal>
        </div>
      </section>

      {/* 08 — Performance */}
      <section aria-labelledby="sl-perf" className="section bg-bg">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="08" kicker="Performance" id="sl-perf" title="Fast, stable and lighter than before." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                In September we rebuilt the design system and replaced a heavy animation library with CSS-only
                animation. The site got lighter and the scores went to the top.
              </p>
            </Reveal>
          </div>
          <Reveal className="mt-14 grid grid-cols-2 gap-y-12 md:grid-cols-4">
            {lighthouse.map((l) => (
              <Ring key={l.label} {...l} />
            ))}
          </Reveal>
          <div className="mt-16 grid gap-10 border-t border-line pt-12 md:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)] md:gap-16">
            <Reveal>
              <p className="t-meta text-[10px] text-ink-mute">JavaScript sent to the browser</p>
              <div className="mt-6 space-y-4">
                {[
                  ["Before", 1.4, "rgba(15,23,42,.18)"],
                  ["After", 0.9, SL.green],
                ].map(([l, mb, color]) => (
                  <div key={l as string} className="grid grid-cols-[64px_minmax(0,1fr)_auto] items-center gap-4">
                    <span className="text-[14px] text-ink-2">{l}</span>
                    <span className="h-3 rounded-full" style={{ width: `${((mb as number) / 1.4) * 100}%`, background: color as string }} />
                    <span className="font-display text-[20px] font-semibold tabular-nums text-ink">{mb} MB</span>
                  </div>
                ))}
              </div>
              <p className="mt-5 font-display text-[clamp(28px,3vw,40px)] font-semibold tracking-[-0.02em]" style={{ color: SL.greenDark }}>
                36% less JavaScript
              </p>
            </Reveal>
            <Reveal delay={1}>
              <dl className="grid grid-cols-2 gap-6">
                {[
                  ["Desktop page load", "0.5 s"],
                  ["Layout shift (CLS)", "0"],
                  ["Lines of code", "≈7,600"],
                  ["Components", "28"],
                ].map(([l, v]) => (
                  <div key={l}>
                    <dt className="t-meta text-[10px] text-ink-mute">{l}</dt>
                    <dd className="mt-2 font-display text-[30px] font-semibold leading-none tabular-nums text-ink">{v}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 09 — Scroll the live site */}
      <section aria-labelledby="sl-scroll" className="on-dark section-loose overflow-hidden text-white" style={{ background: SL.ink }}>
        <div className="wrap">
          <div className="text-center">
            <Reveal>
              <p className="eyebrow">
                <span style={{ color: "#A6E08A" }}>09</span> The live site
              </p>
              <h2 id="sl-scroll" className="t-h2 mx-auto mt-5 max-w-[18ch]">
                Scroll it yourself.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="t-lead mx-auto mt-6 max-w-[52ch] text-white/75">
                Full-length captures of stlukesmedilab.com, taken in October 2026.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 md:mt-16">
            <SiteScroller pages={scrollPages} />
          </div>
        </div>
      </section>

      {/* 10 — Timeline */}
      <section aria-labelledby="sl-time" className="section bg-bg">
        <div className="wrap">
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="10" kicker="Eight months" id="sl-time" title="Shipped every month, still going." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                44 commits and 18 feature launches since February. New articles, towns or services go live by
                editing one file, with no CMS fees.
              </p>
            </Reveal>
          </div>
          <ol className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {timeline.map((t, i) => (
              <li key={t.month} className="bg-bg p-6">
                <Reveal delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <p className="flex items-baseline justify-between">
                    <span className="font-display text-[28px] font-semibold text-ink">{t.month}</span>
                    <span className="font-mono text-[10px] tracking-[0.16em] text-ink-mute">2026</span>
                  </p>
                  <ul className="mt-4 space-y-2">
                    {t.items.map((it) => (
                      <li key={it} className="flex gap-2.5 text-[14px] leading-[1.45] text-ink-2">
                        <span aria-hidden="true" className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: SL.green }} />
                        {it}
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </li>
            ))}
          </ol>
          <Reveal className="mt-10">
            <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
              {["Next.js 16", "React 19", "TypeScript", "Tailwind CSS 4", "Vercel", "Schema.org"].map((t) => (
                <li key={t} className="rounded-full border border-line px-3.5 py-1.5 font-mono text-[11px] tracking-[0.08em] text-ink-2">
                  {t}
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      {/* Why (search intent: medical lab website / healthcare SEO Sri Lanka) */}
      <section aria-labelledby="sl-why" className="section-tight border-t border-line bg-bg">
        <div className="wrap grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow">For clinics and labs</p>
            <h2 id="sl-why" className="t-h3 mt-4 max-w-[20ch]">
              How a small lab competes with the chains on Google
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="t-body text-ink-2 max-w-[62ch] space-y-4">
              <p>
                A national chain will always outspend you on ads. It is much harder for a chain to be as open, as
                local and as technically careful as one focused lab. Published prices answer the question patients
                actually have. Town pages meet them where they live. Structured data and reviewed articles show
                Google the lab is genuine.
              </p>
              <p>
                That is how we build{" "}
                <Link href="/industries/healthcare/" className="underline decoration-line underline-offset-4 hover:text-brand-ink">
                  healthcare websites
                </Link>{" "}
                in Sri Lanka: design, development and{" "}
                <Link href="/services/growth/seo/" className="underline decoration-line underline-offset-4 hover:text-brand-ink">
                  SEO
                </Link>{" "}
                as one job, managed month after month.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="wrap mt-12">
          <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedServices.map((s) => (
              <li key={s.href}>
                <Link
                  href={s.href}
                  className="group flex items-center justify-between p-5 rounded-2xl bg-bg-warm border border-line hover:border-brand-ink hover:-translate-y-0.5 transition-all duration-micro"
                >
                  <span className="font-display font-medium text-[17px] text-ink">{s.name}</span>
                  <span aria-hidden="true" className="font-mono text-[14px] text-brand-ink group-hover:translate-x-1 transition-transform">↗</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ */}
      {project.faqs && project.faqs.length > 0 && (
        <section aria-labelledby="sl-faq" className="section-tight border-t border-line bg-bg">
          <div className="wrap max-w-[900px]">
            <Reveal>
              <p className="eyebrow">Questions</p>
              <h2 id="sl-faq" className="t-h3 mt-4">About this project</h2>
            </Reveal>
            <div className="mt-8 border-t border-line">
              {project.faqs.map((f) => (
                <details key={f.question} className="group border-b border-line">
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[18px] md:text-[20px] font-medium text-ink [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span aria-hidden="true" className="text-brand-ink transition-transform duration-micro group-open:rotate-45">+</span>
                  </summary>
                  <p className="t-body pb-6 text-ink-2 max-w-[65ch]">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Closing */}
      <section aria-labelledby="sl-close" className="on-dark relative overflow-hidden bg-bg-ink text-white section-loose">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(45% 60% at 80% 20%, rgba(88,179,48,.25), transparent 70%), radial-gradient(50% 55% at 10% 90%, rgba(63,125,36,.2), transparent 70%)" }}
        />
        <div className="wrap relative">
          <Reveal>
            <p className="eyebrow">Closing</p>
            <h2 id="sl-close" className="t-display mt-6 max-w-[16ch]">
              Can patients find your prices?
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead mt-8 max-w-[56ch] text-white/75">
              Uniix Studio designs, builds and runs websites for clinics and labs in Sri Lanka, so independent
              practices can win searches the big chains take for granted.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-14 border-t border-line-dark pt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="t-h3 text-white">Let’s build yours.</p>
              <div className="flex flex-wrap gap-4">
                <Link href="/contact/" className="btn btn-light group">
                  Start a project <span className="cta-arrow" aria-hidden="true">→</span>
                </Link>
                <Link href="/portfolio/" className="btn btn-outline-light">
                  View more work <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <NextProjectExhibition nextProject={nextProject} prevProject={prevProject} />
    </>
  );
}
