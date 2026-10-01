import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import { site } from "@/lib/content";
import SmartImage from "@/components/ui/SmartImage";
import NextProjectExhibition from "@/components/portfolio/case-study/NextProjectExhibition";
import LazyVideo from "@/components/portfolio/cricbook/LazyVideo";
import type { Project } from "@/lib/projects";
import BeforeAfter from "./BeforeAfter";
import {
  BN,
  comparison,
  decisions,
  img,
  infoServices,
  outcomes,
  problems,
  projectInfo,
  reel,
  relatedServices,
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
          <span className={dark ? "text-[#A9D18E]" : "text-brand-ink"}>{n}</span> {kicker}
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

export default function BilesmaCaseStudy({
  project,
  nextProject,
  prevProject,
  hasReel,
}: {
  project: Project;
  nextProject: Project;
  prevProject?: Project;
  /** The logo reel renders only once its encoded file is in /public. */
  hasReel: boolean;
}) {
  return (
    <>
      {/* Hero */}
      <section className="relative bg-bg pt-28 md:pt-36 overflow-hidden" aria-labelledby="bn-title">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line">
            <Link
              href="/portfolio/"
              className="inline-flex items-center gap-2 min-h-[44px] font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute hover:text-brand-ink transition-colors duration-micro"
            >
              <span className="text-brand-ink" aria-hidden="true">←</span> All work
            </Link>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
              Packaging case study <span className="opacity-40 mx-1.5">·</span>
              <span className="text-brand-ink">{project.year}</span>
            </p>
          </div>

          <div className="mt-10 md:mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="eyebrow rise-in">Cosmetic packaging design · Sri Lanka</p>
              <h1 id="bn-title" className="t-display mt-6 text-[clamp(52px,9.5vw,148px)] !leading-[0.88]">
                <span className="mask-line">
                  <span>Bilesma</span>
                </span>{" "}
                <span className="mask-line">
                  <span style={{ color: BN.green }}>Natural</span>
                </span>
              </h1>
            </div>
            <div className="lg:pb-4">
              <p
                className="rise-in t-h3 text-ink max-w-[24ch] text-[clamp(24px,2.5vw,36px)]"
                style={{ animationDelay: "140ms" }}
              >
                From a plain kraft bag to a botanical brand people carry home.
              </p>
              <ul
                className="rise-in mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute"
                style={{ animationDelay: "240ms" }}
                aria-label="Disciplines"
              >
                {["Packaging", "Print", "Retail", "Motion"].map((d, i) => (
                  <li key={d} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="text-brand-ink">·</span>}
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="wrap-wide mt-12 md:mt-16">
          <div className="relative aspect-[4/5] sm:aspect-[16/10] overflow-hidden rounded-[32px]" style={{ background: BN.deep }}>
            <SmartImage
              src={img.taglineMonstera}
              alt="Bilesma Natural redesigned carry bag by Uniix Studio: white botanical bag reading Let Your Inner Beauty Shine, set among monstera leaves"
              sizes="(min-width:1560px) 1520px, 96vw"
              priority
              position="50% 48%"
            />
          </div>
        </div>
      </section>

      {/* Project information */}
      <section aria-label="Project information" className="mt-16 md:mt-24 border-y border-line bg-bg-warm">
        <div className="wrap py-10 md:py-12">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">
            {projectInfo.map((i) => (
              <div key={i.label}>
                <dt className="t-meta text-[10px] text-ink-mute">{i.label}</dt>
                <dd className="mt-2 font-display text-[17px] font-medium leading-[1.3] text-ink">{i.value}</dd>
              </div>
            ))}
            <div className="col-span-2 md:col-span-1">
              <dt className="t-meta text-[10px] text-ink-mute">Services</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[14px] text-ink leading-[1.5]">
                  {infoServices.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="t-body text-ink-2 max-w-[70ch]">{project.summary}</p>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-cta group">
                Visit bilesmanatural.lk <span className="cta-arrow" aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 01 — Challenge */}
      <section aria-labelledby="bn-challenge" className="section bg-bg">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:gap-20 items-center">
          <div>
            <Head
              n="01"
              kicker="The challenge"
              id="bn-challenge"
              title="Great products. A forgettable bag."
              lead="Bilesma Natural makes Ayurvedic skin and hair care in Nugegoda: face creams, body lotions, hair oils and more. The products lived up to the brand. The carry bag didn’t."
            />
            <ol className="mt-12 border-t border-line">
              {problems.map((p, i) => (
                <li key={p.title} className="border-b border-line">
                  <Reveal delay={(i % 3) as 0 | 1 | 2} className="grid grid-cols-[auto_1fr] gap-x-5 py-6">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-brand-ink pt-1.5">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div>
                      <h3 className="font-display text-[19px] md:text-[21px] font-medium text-ink">{p.title}</h3>
                      <p className="t-body mt-2 text-ink-2 max-w-[58ch]">{p.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ol>
          </div>
          <Reveal delay={1}>
            <figure>
              <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] bg-white ring-1 ring-line">
                <div className="absolute inset-[6%]">
                  <SmartImage
                    src={img.oldBag}
                    alt="Original Bilesma Natural kraft carry bag with a blue band, before the Uniix Studio redesign"
                    sizes="(min-width:1024px) 40vw, 92vw"
                    fit="contain"
                  />
                </div>
              </div>
              <figcaption className="mt-4 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute">
                Before: the original kraft carry bag
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 02 — Before / after */}
      <section aria-labelledby="bn-compare" className="section border-t border-line" style={{ background: BN.mist }}>
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20 items-center">
          <Reveal>
            <BeforeAfter
              before={img.oldBagAligned}
              after={img.taglineStudio}
              beforeAlt="Old Bilesma Natural kraft bag"
              afterAlt="New Bilesma Natural white botanical carry bag"
            />
            <p className="mt-4 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute">
              Drag to compare
            </p>
          </Reveal>
          <div>
            <Head
              n="02"
              kicker="Before & after"
              id="bn-compare"
              title="Same products. A different first impression."
              lead="We kept the Bilesma Natural logo and rebuilt everything around it: material, palette, illustration, message and the information the bag carries."
            />
            <Reveal delay={2}>
              <table className="mt-10 w-full text-left text-[14px] md:text-[15px]">
                <caption className="sr-only">Old packaging compared with the new design</caption>
                <thead>
                  <tr className="border-b border-ink/20">
                    <th scope="col" className="py-3 pr-4 t-meta text-[10px] text-ink-mute font-normal"><span className="sr-only">Aspect</span></th>
                    <th scope="col" className="py-3 pr-4 t-meta text-[10px] font-normal" style={{ color: BN.kraft }}>Old bag</th>
                    <th scope="col" className="py-3 t-meta text-[10px] font-normal" style={{ color: BN.green }}>New bag</th>
                  </tr>
                </thead>
                <tbody>
                  {comparison.map((r) => (
                    <tr key={r.aspect} className="border-b border-ink/10 align-top">
                      <th scope="row" className="py-3.5 pr-4 font-display font-medium text-ink">{r.aspect}</th>
                      <td className="py-3.5 pr-4 text-ink-mute">{r.before}</td>
                      <td className="py-3.5 text-ink">{r.after}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 03 — The bag system */}
      <section aria-labelledby="bn-system" className="section bg-bg">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="03" kicker="Packaging system" id="bn-system" title="Two faces. One botanical system." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                A bag is seen from every side, so we designed both. One face carries the promise and
                the contact band; the other is a calm logo panel. The watercolour gusset joins them.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 md:mt-20 grid gap-4 md:gap-5 md:grid-cols-2">
            <Reveal>
              <figure>
                <div className="relative aspect-square overflow-hidden rounded-[24px] bg-white ring-1 ring-line">
                  <SmartImage
                    src={img.taglineStudio}
                    alt="Bilesma Natural packaging design, tagline face: Let Your Inner Beauty Shine with a green contact band"
                    sizes="(min-width:768px) 46vw, 94vw"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-[18px] font-medium text-ink">The promise face</span>
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute">Tagline · contact band</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={1}>
              <figure>
                <div className="relative aspect-square overflow-hidden rounded-[24px] bg-white ring-1 ring-line">
                  <SmartImage
                    src={img.logoStudio}
                    alt="Bilesma Natural logo brand panel with line-art leaves and watercolour monstera, packaging design by Uniix Studio"
                    sizes="(min-width:768px) 46vw, 94vw"
                  />
                </div>
                <figcaption className="mt-4 flex items-baseline justify-between gap-4">
                  <span className="font-display text-[18px] font-medium text-ink">The brand face</span>
                  <span className="font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute">Logo · line-art leaves</span>
                </figcaption>
              </figure>
            </Reveal>
            <Reveal className="md:col-span-2">
              <div className="relative aspect-[4/5] sm:aspect-[16/9] overflow-hidden rounded-[24px]" style={{ background: BN.deep }}>
                <SmartImage
                  src={img.logoMonstera}
                  alt="Bilesma Natural white botanical paper bag photographed among monstera leaves"
                  sizes="(min-width:1280px) 1240px, 94vw"
                  position="50% 50%"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 04 — Design decisions */}
      <section aria-labelledby="bn-decisions" className="on-dark section-loose text-white overflow-hidden" style={{ background: BN.deep }}>
        <div className="wrap">
          <Head
            n="04"
            kicker="Design decisions"
            id="bn-decisions"
            title="Six choices that changed the bag."
            lead="None of this is decoration. Each decision answers one of the problems the old bag had."
            dark
          />
          <ol className="mt-14 md:mt-20 grid border-l border-t border-white/15 sm:grid-cols-2 lg:grid-cols-3">
            {decisions.map((d, i) => (
              <li key={d.title} className="border-b border-r border-white/15">
                <Reveal delay={(i % 3) as 0 | 1 | 2} className="h-full p-6 md:p-8">
                  <span className="font-mono text-[11px] tracking-[0.18em] text-[#A9D18E]">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-5 font-display text-[20px] md:text-[22px] font-medium leading-[1.25] text-white">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[15px] leading-[1.6] text-white/70">{d.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 05 — Palette */}
      <section aria-labelledby="bn-palette" className="section bg-bg">
        <div className="wrap">
          <Head
            n="05"
            kicker="Colour"
            id="bn-palette"
            title="A palette taken from the leaves."
            lead="Greens for nature and wellness, charcoal for the mark, a touch of sand for warmth. The same tokens run through the bag, the banner and the bookmarks."
          />
          <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {project.colorPalette?.map((c, i) => (
              <li key={c.hex}>
                <Reveal delay={(i % 3) as 0 | 1 | 2}>
                  <div
                    className="aspect-[4/5] rounded-[20px] ring-1 ring-line"
                    style={{ background: c.hex }}
                    aria-hidden="true"
                  />
                  <p className="mt-3 font-display text-[16px] font-medium text-ink">{c.name}</p>
                  <p className="font-mono text-[11px] tracking-[0.12em] uppercase text-ink-mute">{c.hex}</p>
                  <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-2">{c.role}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — X-banner */}
      <section aria-labelledby="bn-banner" className="section border-t border-line bg-bg-warm">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:gap-20 items-center">
          <Reveal>
            <div className="relative aspect-square overflow-hidden rounded-[28px]">
              <SmartImage
                src={img.xBanner}
                alt="Bilesma Natural X-banner roll-up stand with Sinhala headline, model holding a monstera leaf, designed by Uniix Studio"
                sizes="(min-width:1024px) 46vw, 94vw"
              />
            </div>
          </Reveal>
          <div>
            <Head
              n="06"
              kicker="Retail & events"
              id="bn-banner"
              title="An X-banner that speaks Sinhala."
              lead="For retail floors, pop-ups and events, we designed a roll-up stand that reads from across the room. The headline is in Sinhala, the language most of Bilesma Natural’s customers think in."
            />
            <Reveal delay={2}>
              <figure className="mt-10 border-l-2 pl-6" style={{ borderColor: BN.green }}>
                <blockquote>
                  <p lang="si" className="font-display text-[clamp(26px,2.6vw,36px)] font-semibold leading-[1.35] text-ink">
                    ඔබව <span style={{ color: BN.green }}>හදවතින්ම ලස්සන</span> කරයි.
                  </p>
                </blockquote>
                <figcaption className="mt-3 text-[15px] text-ink-2">
                  “Makes you beautiful from the heart.” The Sinhala echo of the bag’s promise.
                </figcaption>
              </figure>
            </Reveal>
            <Reveal delay={3}>
              <ul className="mt-10 grid gap-3 text-[15px] text-ink-2">
                <li><span className="text-ink font-medium">Logo high</span>, where it clears tables and crowds</li>
                <li><span className="text-ink font-medium">One portrait, one leaf</span>: the product story in a single image</li>
                <li><span className="text-ink font-medium">Monstera corners</span> that tie the stand to the packaging</li>
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 07 — Bookmarks */}
      <section aria-labelledby="bn-bookmarks" className="section bg-bg">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-20 items-center">
          <div className="lg:order-2">
            <div className="relative aspect-square overflow-hidden rounded-[28px] bg-[#E9E9E9]">
              <SmartImage
                src={img.bookmarks}
                alt="Bilesma Natural bookmarks: 7.5% off scratch coupon and five beauty tips in Sinhala, print design by Uniix Studio"
                sizes="(min-width:1024px) 44vw, 94vw"
              />
            </div>
          </div>
          <div className="lg:order-1">
            <Head
              n="07"
              kicker="In-bag inserts"
              id="bn-bookmarks"
              title="Bookmarks that bring customers back."
              lead="Two arch-topped bookmarks travel inside the bag. One rewards the next order; the other gives the customer something worth keeping."
            />
            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              <Reveal delay={1}>
                <div className="h-full rounded-[20px] p-6 text-white" style={{ background: BN.leaf }}>
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/80">Coupon</p>
                  <p className="mt-3 font-display text-[34px] font-bold leading-none">7.5% off</p>
                  <p className="mt-4 text-[14px] leading-[1.55] text-white/90">
                    A scratch-to-reveal code with four clear steps to redeem it on bilesmanatural.lk,
                    valid for 21 days to nudge a quick second order.
                  </p>
                </div>
              </Reveal>
              <Reveal delay={2}>
                <div className="h-full rounded-[20px] bg-ink p-6 text-white">
                  <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-white/60">Tips</p>
                  <p lang="si" className="mt-3 font-display text-[22px] font-semibold leading-[1.3]">
                    හදවතින්ම ලස්සන වීමට <span style={{ color: BN.leaf }}>tips 5ක්</span>
                  </p>
                  <p className="mt-4 text-[14px] leading-[1.55] text-white/75">
                    Five tips for being beautiful from the heart, in Sinhala. Value-first content
                    that keeps the brand on the nightstand.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Logo reel */}
      {hasReel && (
        <section aria-labelledby="bn-reel" className="on-dark section text-white" style={{ background: BN.charcoal }}>
          <JsonLd
            data={{
              "@context": "https://schema.org",
              "@type": "VideoObject",
              name: "Bilesma Natural logo animation",
              description: reel.description,
              thumbnailUrl: `${site.url}${reel.poster}`,
              contentUrl: `${site.url}${reel.src}`,
              uploadDate: reel.uploadDate,
              duration: reel.duration,
              creator: { "@id": `${site.url}/#organization` },
              publisher: { "@id": `${site.url}/#organization` },
            }}
          />
          <div className="wrap">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
              <Head n="08" kicker="Motion" id="bn-reel" title="The logo, in motion." dark />
              <Reveal delay={1}>
                <p className="t-lead text-white/75 max-w-[48ch]">
                  A nine-second reveal: the mark resolves out of warm light, then the Sinhala
                  promise from the X-banner lands beneath it. Built for Reels, ads and video
                  intros, so every piece of content opens the way every bag closes.
                </p>
              </Reveal>
            </div>
            <Reveal>
              <LazyVideo
                src={reel.src}
                poster={reel.poster}
                label="Bilesma Natural logo animation reel"
                className="mt-14 aspect-video rounded-[24px] bg-black"
              />
            </Reveal>
          </div>
        </section>
      )}

      {/* Outcome */}
      <section aria-labelledby="bn-outcome" className="section border-t border-line bg-bg-warm">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Head
            n={hasReel ? "09" : "08"}
            kicker="Outcome"
            id="bn-outcome"
            title="Packaging that works on every unit sold."
            lead="A carry bag is the one ad every customer takes home. Here is what Bilesma Natural has now:"
          />
          <ol className="border-t border-line self-end">
            {outcomes.map((o, i) => (
              <li key={o} className="flex items-baseline gap-5 border-b border-line py-4">
                <span className="font-mono text-[11px] tracking-[0.16em] text-brand-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[clamp(17px,1.5vw,21px)] font-medium tracking-[-0.015em] text-ink">{o}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why packaging matters (search intent: packaging design Sri Lanka) */}
      <section aria-labelledby="bn-why" className="section-tight bg-bg">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow">For product brands</p>
            <h2 id="bn-why" className="t-h3 mt-4 max-w-[20ch]">
              Why packaging design pays back for Sri Lankan brands
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="t-body text-ink-2 max-w-[62ch] space-y-4">
              <p>
                For cosmetics, beauty and Ayurvedic brands in Sri Lanka, packaging is often the first
                thing a customer holds and the last thing they see before deciding to buy again. A
                well-designed carry bag differentiates you on the counter, signals product quality,
                and keeps your website and phone number in the customer’s home.
              </p>
              <p>
                Unlike an ad, it works on every unit you sell, for as long as you sell it. That is
                why we treat packaging, print and motion as one{" "}
                <Link href="/services/design/brand-identity/" className="underline decoration-line underline-offset-4 hover:text-brand-ink">
                  brand system
                </Link>{" "}
                rather than separate jobs.
              </p>
            </div>
          </Reveal>
        </div>
        <div className="wrap mt-12">
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
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
        <section aria-labelledby="bn-faq" className="section-tight border-t border-line bg-bg">
          <div className="wrap max-w-[900px]">
            <Reveal>
              <p className="eyebrow">Questions</p>
              <h2 id="bn-faq" className="t-h3 mt-4">About this project</h2>
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
      <section aria-labelledby="bn-close" className="on-dark relative overflow-hidden bg-bg-ink text-white section-loose">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(45% 60% at 80% 20%, rgba(106,150,112,.28), transparent 70%), radial-gradient(50% 55% at 10% 90%, rgba(140,191,107,.14), transparent 70%)`,
          }}
        />
        <div className="wrap relative">
          <Reveal>
            <p className="eyebrow">Closing</p>
            <h2 id="bn-close" className="t-display mt-6 max-w-[16ch]">
              Is your packaging as good as your product?
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead mt-8 max-w-[56ch] text-white/75">
              Uniix Studio designs packaging, print and motion that make Sri Lankan product brands
              look the way their products feel.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-14 border-t border-line-dark pt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="t-h3 text-white">Let’s redesign yours.</p>
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
