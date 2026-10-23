import Link from "next/link";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import SmartImage from "@/components/ui/SmartImage";
import NextProjectExhibition from "@/components/portfolio/case-study/NextProjectExhibition";
import { site } from "@/lib/content";
import type { Project } from "@/lib/projects";
import LogoArt from "./LogoArt";
import AnatomyExplorer from "./AnatomyExplorer";
import SurfaceSwitcher from "./SurfaceSwitcher";
import {
  CC,
  approach,
  asset,
  client,
  conceptNotes,
  deliverables,
  measured,
  mockups,
  projectInfo,
  ratio,
  relatedServices,
  sampledColours,
  scaleSizes,
  typeScale,
  variations,
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
          <span style={{ color: dark ? CC.gold : "#8A6D2C" }}>{n}</span> {kicker}
        </p>
        <h2 id={id} className="t-h2 mt-5 max-w-[17ch]">
          {title}
        </h2>
      </Reveal>
      {lead && (
        <Reveal delay={1}>
          <p className={`t-lead mt-6 max-w-[56ch] ${dark ? "text-white/70" : "text-ink-2"}`}>{lead}</p>
        </Reveal>
      )}
    </div>
  );
}

/** Supplied logo files, described for image search and AI answer engines. */
function imageSchema() {
  const items = variations.flatMap((g) => g.items);
  return {
    "@context": "https://schema.org",
    "@graph": items.map((i) => ({
      "@type": "ImageObject",
      contentUrl: `${site.url}${i.src}`,
      caption: i.alt,
      creator: { "@id": `${site.url}/#organization` },
      creditText: "Uniix Studio",
    })),
  };
}

export default function CinecraftCaseStudy({
  project,
  nextProject,
  prevProject,
}: {
  project: Project;
  nextProject: Project;
  prevProject?: Project;
}) {
  return (
    <>
      <JsonLd data={imageSchema()} />

      {/* 02 — Hero: the brand reveal */}
      <section
        data-nav-invert
        aria-labelledby="cc-title"
        className="on-dark relative isolate overflow-hidden text-white"
        style={{ background: CC.black }}
      >
        <div aria-hidden="true" className="cc-light pointer-events-none absolute inset-[-10%] -z-10">
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(38% 34% at 50% 34%, rgba(255,255,255,.11), transparent 72%), radial-gradient(26% 24% at 64% 22%, rgba(215,194,139,.08), transparent 70%), radial-gradient(60% 50% at 50% 110%, rgba(255,255,255,.04), transparent 70%)",
            }}
          />
        </div>

        <div className="wrap pt-28 md:pt-32">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-line-dark pb-6">
            <Link
              href="/portfolio/"
              className="inline-flex min-h-[44px] items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/60 transition-colors duration-micro hover:text-white"
            >
              <span aria-hidden="true" style={{ color: CC.gold }}>
                ←
              </span>{" "}
              All work
            </Link>
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/50">
              Brand identity case study <span className="mx-1.5 opacity-40">·</span>
              <span style={{ color: CC.gold }}>{project.year}</span>
            </p>
          </div>

          <p className="rise-in mt-12 text-center font-mono text-[11px] uppercase tracking-[0.32em] text-white/55 md:mt-16">
            Brand Identity <span style={{ color: CC.gold }}>/</span> Logo Design
          </p>

          <div
            className="rise-in relative mx-auto mt-10 w-[min(84vw,720px)] md:mt-14"
            style={{ aspectRatio: ratio.full, animationDelay: "220ms", animationDuration: "1100ms" }}
          >
            <SmartImage
              src={asset.fullWhite}
              alt="Cinecraft Media logo: interlocking CM monogram above the CINECRAFT wordmark and a gold MEDIA line, designed by Uniix Studio"
              sizes="(min-width:860px) 720px, 84vw"
              fit="contain"
              priority
            />
          </div>

          <div className="mt-20 grid gap-10 border-t border-line-dark pt-10 md:mt-28 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-16">
            <h1 id="cc-title" className="rise-in" style={{ animationDelay: "520ms" }}>
              <span className="block font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
                Cinecraft Media · Logo & brand identity
              </span>
              <span className="t-display mt-5 block max-w-[12ch] text-[clamp(44px,7vw,104px)]">
                Crafting a cinematic identity.
              </span>
            </h1>
            <div className="rise-in lg:pt-9" style={{ animationDelay: "680ms" }}>
              <p className="t-lead max-w-[46ch] text-white/75">
                An exploration of form, contrast, and typographic precision — bringing Cinecraft Media’s
                visual identity together through a distinctive CM monogram.
              </p>
              <dl className="mt-8 grid grid-cols-3 gap-4 border-t border-line-dark pt-6">
                {[
                  ["Client", "Cinecraft Media"],
                  ["Services", "Logo Design, Brand Identity"],
                  ["Agency", "Uniix Studio"],
                ].map(([k, v]) => (
                  <div key={k}>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">{k}</dt>
                    <dd className="mt-2 text-[14px] leading-[1.45] text-white">{v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          <div aria-hidden="true" className="flex flex-col items-center gap-3 pb-10 pt-16 md:pt-20">
            <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/40">Scroll</span>
            <span className="relative block h-12 w-px overflow-hidden bg-white/10">
              <span className="cc-cue absolute inset-0 block" style={{ background: CC.gold }} />
            </span>
          </div>
        </div>
      </section>

      {/* 03 — Project overview */}
      <section aria-labelledby="cc-overview" className="section" style={{ background: CC.soft }}>
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:gap-24">
          <div>
            <Head n="01" kicker="The project" id="cc-overview" title="A mark designed to make an impression." />
            <Reveal delay={1}>
              <p className="t-lead mt-8 max-w-[58ch] text-ink-2">
                Cinecraft Media’s identity centres on a bold, interlocking CM monogram paired with a clean
                typographic wordmark. The design brings together distinctive letterforms, a restrained
                monochrome palette, and a subtle gold accent to create a recognisable and versatile visual
                signature.
              </p>
            </Reveal>
            <Reveal delay={2}>
              <div className="mt-12 rounded-[24px] border border-line bg-white p-6 md:p-8">
                <h3 className="t-meta text-[10px] text-ink-mute">About the client</h3>
                <p className="t-body mt-4 max-w-[60ch] text-ink-2">{client.intro}</p>
                <dl className="mt-6 grid gap-6 sm:grid-cols-2">
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">What they make</dt>
                    <dd className="mt-2">
                      <ul className="space-y-1 text-[14px] leading-[1.5] text-ink">
                        {client.services.map((s) => (
                          <li key={s}>{s}</li>
                        ))}
                      </ul>
                    </dd>
                  </div>
                  <div>
                    <dt className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">How they work</dt>
                    <dd className="mt-2 text-[14px] leading-[1.5] text-ink">{client.process.join(" → ")}</dd>
                    <dt className="mt-5 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">Recent work shown</dt>
                    <dd className="mt-2 text-[14px] leading-[1.5] text-ink">{client.work.join(" · ")}</dd>
                  </div>
                </dl>
                <p className="mt-6 text-[12px] leading-[1.5] text-ink-mute">Source: Cinecraft Media’s website and social channels.</p>
              </div>
            </Reveal>
            <Reveal delay={2}>
              <h3 className="mt-12 t-meta text-[10px] text-ink-mute">What we delivered</h3>
              <ul className="mt-4 border-t border-line">
                {deliverables.map((d) => (
                  <li key={d.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-line py-4">
                    <span className="font-display text-[17px] font-medium text-ink">{d.name}</span>
                    <span className="text-[14px] text-ink-mute">{d.detail}</span>
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>

          <Reveal delay={1}>
            <aside aria-label="Project information" className="lg:sticky lg:top-28">
              <dl className="border-t border-ink">
                {projectInfo.map((i) => (
                  <div key={i.label} className="grid grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] gap-4 border-b border-line py-5">
                    <dt className="t-meta text-[10px] text-ink-mute pt-1">{i.label}</dt>
                    <dd className="font-display text-[17px] font-medium leading-[1.35] text-ink">{i.value}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-6 text-[13px] leading-[1.6] text-ink-mute">
                Shown here: the supplied logo artwork, presented as delivered.
              </p>
            </aside>
          </Reveal>
        </div>
      </section>

      {/* 04 — The logo concept */}
      <section aria-labelledby="cc-concept" className="section bg-white">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
            <Head n="02" kicker="The logo concept" id="cc-concept" title="One monogram. A distinctive identity." />
            <Reveal delay={1}>
              <p className="t-body max-w-[46ch] text-ink-mute">
                Three notes on how the mark works. These are our design reading of the finished artwork.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <figure className="mt-14 md:mt-20">
              <div className="relative rounded-[32px] px-[8%] py-[9%] md:py-[7%]" style={{ background: CC.stone }}>
                <div className="relative mx-auto max-w-[620px]" style={{ aspectRatio: ratio.mono }}>
                  <SmartImage
                    src={asset.monoBlack}
                    alt="Cinecraft Media CM monogram in black: two overlapping C forms and an M"
                    sizes="(min-width:860px) 620px, 82vw"
                    fit="contain"
                  />
                  {conceptNotes.map((c) => (
                    <span
                      key={c.n}
                      aria-hidden="true"
                      className="absolute grid h-8 w-8 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full font-mono text-[10px] text-ink shadow-[0_0_0_6px_rgba(236,234,227,.7)] md:h-10 md:w-10 md:text-[11px]"
                      style={{ left: `${(c.pin.x / 682) * 100}%`, top: `${(c.pin.y / 393) * 100}%`, background: CC.gold }}
                    >
                      {c.n}
                    </span>
                  ))}
                </div>
              </div>
              <figcaption className="sr-only">
                The Cinecraft Media monogram with three numbered markers matching the design notes below.
              </figcaption>
            </figure>
          </Reveal>

          <ol className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
            {conceptNotes.map((c, i) => (
              <li key={c.n}>
                <Reveal delay={(i % 3) as 0 | 1 | 2}>
                  <div className="flex items-center gap-4">
                    <span className="font-mono text-[11px] tracking-[0.16em] text-ink">{c.n}</span>
                    <span aria-hidden="true" className="h-px flex-1" style={{ background: CC.gold }} />
                  </div>
                  <h3 className="t-h4 mt-5 text-ink">{c.title}</h3>
                  <p className="t-body mt-3 text-ink-2">{c.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 05 — Logo anatomy & form */}
      <section aria-labelledby="cc-anatomy" className="section border-t border-line" style={{ background: CC.soft }}>
        <div className="wrap">
          <Head
            n="03"
            kicker="Logo anatomy & form"
            id="cc-anatomy"
            title="Read straight from the vector master."
            lead="The identity pairs a strong, overlapping monogram with a restrained wordmark. The contrast between the compact symbol and the spacious typography creates a clear hierarchy while allowing the complete logo to function as a unified signature."
          />
          <div className="mt-14 md:mt-20">
            <AnatomyExplorer />
          </div>
          <ul className="mt-16 grid gap-px overflow-hidden rounded-[24px] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-4">
            {measured.map((m, i) => (
              <li key={m.label} className="bg-white p-6 md:p-8">
                <Reveal delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <p className="t-numeral text-[clamp(44px,4.4vw,64px)] text-ink">{m.value}</p>
                  <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.18em]" style={{ color: "#8A6D2C" }}>
                    {m.label}
                  </p>
                  <p className="mt-3 text-[14px] leading-[1.6] text-ink-2">{m.body}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 06 — Typography & hierarchy */}
      <section aria-labelledby="cc-type" className="on-dark section-loose text-white" style={{ background: CC.black }}>
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="04" kicker="Typography & hierarchy" id="cc-type" title="Precision in every letter." dark />
            <Reveal delay={1}>
              <p className="t-lead max-w-[48ch] text-white/70">
                The wordmark balances the strength of the monogram with a more restrained typographic
                treatment. The widely spaced lettering introduces clarity and rhythm, while the smaller MEDIA
                line creates a secondary level of information.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <figure className="mt-16 md:mt-24">
              <LogoArt
                id="cc-type-wordmark"
                tone="white"
                highlight="wordmark"
                viewBox="-4 296 760 90"
                title="CINECRAFT wordmark from the Cinecraft Media logo, shown large"
                className="block h-auto w-full"
              />
              <figcaption className="mt-5 flex flex-wrap justify-between gap-3 border-t border-line-dark pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                <span>CINECRAFT · primary wordmark</span>
                <span>Uppercase · open tracking · geometric construction</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20 lg:items-center">
            <Reveal>
              <figure>
                <LogoArt
                  id="cc-type-media"
                  tone="white"
                  highlight="media"
                  viewBox="150 398 456 60"
                  title="MEDIA line from the Cinecraft Media logo, with its gold gradient"
                  className="block h-auto w-full"
                />
                <figcaption className="mt-5 border-t border-line-dark pt-4 font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                  MEDIA · descriptor · gold at the baseline, white at the cap line
                </figcaption>
              </figure>
            </Reveal>

            <Reveal delay={1}>
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                Relative height of each tier, in source units
              </p>
              <ul className="mt-6 space-y-6">
                {typeScale.map((t) => (
                  <li key={t.label}>
                    <div className="flex items-baseline justify-between gap-4">
                      <span className="font-display text-[18px] font-medium text-white">{t.label}</span>
                      <span className="font-mono text-[12px] text-white/55">{t.units}</span>
                    </div>
                    <div className="mt-2 h-[3px] w-full bg-white/10">
                      <div className="h-full" style={{ width: `${(t.units / 248.4) * 100}%`, background: CC.gold }} />
                    </div>
                    <p className="mt-2 text-[13px] text-white/55">{t.note}</p>
                  </li>
                ))}
              </ul>
              <p className="mt-8 text-[13px] leading-[1.6] text-white/50 max-w-[52ch]">
                The wordmark is supplied as vector outlines, so the artwork above is the logo itself, not a
                font set to look like it.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 07 — Colour & contrast */}
      <section aria-labelledby="cc-colour" className="section" style={{ background: CC.soft }}>
        <div className="wrap">
          <Head n="05" kicker="Colour & contrast" id="cc-colour" title="An identity built on contrast." />

          <div className="mt-14 grid gap-4 md:mt-20 md:grid-cols-2 md:gap-5">
            {[
              { bg: CC.black, src: asset.fullWhite, label: "White artwork · deep black", alt: "Cinecraft Media full logo in white on black" },
              { bg: CC.white, src: asset.fullBlack, label: "Black artwork · white", alt: "Cinecraft Media full logo in black on white" },
            ].map((p, i) => (
              <Reveal key={p.label} delay={i as 0 | 1}>
                <figure>
                  <div className="grid aspect-[4/3] place-items-center rounded-[24px] ring-1 ring-line" style={{ background: p.bg }}>
                    <div className="relative w-[62%]" style={{ aspectRatio: ratio.full }}>
                      <SmartImage src={p.src} alt={p.alt} sizes="(min-width:768px) 30vw, 58vw" fit="contain" />
                    </div>
                  </div>
                  <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{p.label}</figcaption>
                </figure>
              </Reveal>
            ))}
            {[
              { bg: CC.charcoal, src: asset.monoWhite, label: "Monogram · charcoal", alt: "Cinecraft Media monogram in white on charcoal" },
              { bg: CC.stone, src: asset.monoBlack, label: "Monogram · stone", alt: "Cinecraft Media monogram in black on a warm stone background" },
            ].map((p, i) => (
              <Reveal key={p.label} delay={i as 0 | 1}>
                <figure>
                  <div className="grid aspect-[16/9] place-items-center rounded-[24px] ring-1 ring-line" style={{ background: p.bg }}>
                    <div className="relative w-[36%]" style={{ aspectRatio: ratio.mono }}>
                      <SmartImage src={p.src} alt={p.alt} sizes="(min-width:768px) 18vw, 34vw" fit="contain" />
                    </div>
                  </div>
                  <figcaption className="mt-3 font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute">{p.label}</figcaption>
                </figure>
              </Reveal>
            ))}
          </div>

          <div className="mt-16 grid gap-12 md:mt-24 lg:grid-cols-2 lg:gap-20">
            <Reveal>
              <h3 className="t-h3 text-ink">Black & white</h3>
              <p className="t-body mt-4 max-w-[52ch] text-ink-2">
                The mark is drawn in pure black or pure white, nothing in between. That gives it the highest
                contrast either ground can offer, keeps it legible when it is reproduced small or in one colour,
                and lets the same shapes work on screen, on print and over video.
              </p>
            </Reveal>
            <Reveal delay={1}>
              <h3 className="t-h3 text-ink">Champagne gold</h3>
              <p className="t-body mt-4 max-w-[52ch] text-ink-2">
                Gold appears in one place only: the MEDIA line, as a gradient that is warmest at the baseline and
                fades into the logo colour above. It adds warmth and a sense of occasion without competing with
                the monogram, and the restraint is what makes it noticeable.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <ul className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {sampledColours.map((c) => (
                <li key={c.name}>
                  <div aria-hidden="true" className="aspect-[5/3] rounded-[16px] ring-1 ring-line" style={{ background: c.swatch }} />
                  <p className="mt-3 font-display text-[16px] font-medium text-ink">{c.name}</p>
                  <p className="font-mono text-[11px] uppercase tracking-[0.12em] text-ink-mute">{c.hex}</p>
                  <p className="mt-1.5 text-[13px] leading-[1.5] text-ink-2">{c.source}</p>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-[13px] text-ink-mute">
              Values sampled from the supplied files. They describe the artwork; they are not a published colour
              specification.
            </p>
          </Reveal>

          <div className="mt-20 border-t border-line pt-14 md:mt-28">
            <Reveal>
              <h3 className="t-h3 text-ink">Try it on a surface</h3>
              <p className="t-body mt-3 max-w-[56ch] text-ink-2">
                Pick a background and the matching supplied artwork is swapped in. The contrast ratio is
                calculated live against the logo colour.
              </p>
            </Reveal>
            <div className="mt-8">
              <SurfaceSwitcher />
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Logo variations */}
      <section aria-labelledby="cc-variations" className="section bg-white">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
            <Head n="06" kicker="Logo variations" id="cc-variations" title="Designed for different contexts." />
            <Reveal delay={1}>
              <p className="t-body max-w-[46ch] text-ink-mute">
                The four presentation files supplied with the identity: full logo and monogram, each on a dark and
                a light ground.
              </p>
            </Reveal>
          </div>

          {variations.map((g) => (
            <div key={g.group} className="mt-16 md:mt-20">
              <Reveal>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">{g.group}</h3>
              </Reveal>
              <div className="mt-6 grid gap-4 md:grid-cols-2 md:gap-5">
                {g.items.map((v, i) => (
                  <Reveal key={v.src} delay={i as 0 | 1}>
                    <figure>
                      <div className="relative aspect-square overflow-hidden rounded-[24px] ring-1 ring-line" style={{ background: v.dark ? "#0E0E0E" : CC.white }}>
                        <SmartImage src={v.src} alt={v.alt} sizes="(min-width:1280px) 600px, (min-width:768px) 46vw, 92vw" />
                      </div>
                      <figcaption className="mt-4 grid gap-1 sm:grid-cols-[1fr_auto] sm:gap-4">
                        <span className="font-display text-[18px] font-medium text-ink">{v.label}</span>
                        <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-ink-mute sm:pt-1.5">
                          Ground · {v.ground}
                        </span>
                        <span className="text-[14px] leading-[1.6] text-ink-2 sm:col-span-2">{v.body}</span>
                      </figcaption>
                    </figure>
                  </Reveal>
                ))}
              </div>
            </div>
          ))}

          <Reveal>
            <div className="mt-20 md:mt-28">
              <h3 className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-mute">At every size</h3>
              <div className="mt-6 grid overflow-hidden rounded-[24px] ring-1 ring-line md:grid-cols-2">
                {[
                  { bg: CC.black, src: asset.monoWhite, text: "text-white/55" },
                  { bg: CC.soft, src: asset.monoBlack, text: "text-ink-mute" },
                ].map((row) => (
                  <ul key={row.src} className="flex flex-wrap items-end gap-x-6 gap-y-6 px-6 py-10 md:px-10" style={{ background: row.bg }}>
                    {scaleSizes.map((s) => (
                      <li key={s} className="flex flex-col items-start gap-3">
                        <span className="relative block" style={{ height: s, aspectRatio: ratio.mono }}>
                          <SmartImage src={row.src} alt="" sizes={`${Math.ceil(s * 1.8)}px`} fit="contain" />
                        </span>
                        <span className={`font-mono text-[10px] tracking-[0.12em] ${row.text}`}>{s}px</span>
                      </li>
                    ))}
                  </ul>
                ))}
              </div>
              <p className="sr-only">The Cinecraft Media monogram shown at 16, 24, 32, 48, 72 and 120 pixels tall on dark and light backgrounds.</p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 08b — Identity in context (concept mockups, labelled as such) */}
      <section aria-labelledby="cc-context" className="on-dark section text-white" style={{ background: CC.charcoal }}>
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.85fr)] lg:items-end">
            <Head n="07" kicker="In context" id="cc-context" title="Imagined on set and in the studio." dark />
            <Reveal delay={1}>
              <p className="t-body max-w-[46ch] text-white/65">
                Illustrative concepts showing how the identity could work in a production studio’s world. These are
                visualisations, not applications produced or installed for the client.
              </p>
            </Reveal>
          </div>

          <Reveal>
            <figure className="mt-14 md:mt-20">
              <div className="relative overflow-hidden rounded-[24px] bg-black" style={{ aspectRatio: mockups.signage.ratio }}>
                <SmartImage src={mockups.signage.src} alt={mockups.signage.alt} sizes="(min-width:1280px) 1240px, 94vw" />
                <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                  Concept mockup
                </span>
              </div>
              <figcaption className="mt-4 grid gap-1 sm:grid-cols-[auto_1fr] sm:gap-6">
                <span className="font-display text-[18px] font-medium text-white">{mockups.signage.label}</span>
                <span className="text-[14px] leading-[1.6] text-white/60">{mockups.signage.body}</span>
              </figcaption>
            </figure>
          </Reveal>

          <div className="mt-6 grid gap-6 md:mt-8 md:grid-cols-2 md:gap-5">
            {mockups.items.map((m, i) => (
              <Reveal key={m.src} delay={i as 0 | 1}>
                <figure>
                  <div className="relative overflow-hidden rounded-[24px] bg-black" style={{ aspectRatio: m.ratio }}>
                    <SmartImage src={m.src} alt={m.alt} sizes="(min-width:1280px) 610px, (min-width:768px) 46vw, 94vw" />
                    <span className="absolute left-4 top-4 rounded-full bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-white/80 backdrop-blur-sm">
                      Concept mockup
                    </span>
                  </div>
                  <figcaption className="mt-4">
                    <span className="block font-display text-[18px] font-medium text-white">{m.label}</span>
                    <span className="mt-1 block text-[14px] leading-[1.6] text-white/60">{m.body}</span>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — Identity in detail */}
      <section aria-labelledby="cc-detail" className="on-dark relative text-white" style={{ background: "#0E0E0E" }}>
        <div className="relative aspect-[4/5] w-full overflow-hidden sm:aspect-[16/9] lg:aspect-[21/10]">
          <SmartImage
            src={asset.satinMono}
            alt="Cinecraft Media CM monogram in white on flowing black satin"
            sizes="100vw"
            position="50% 50%"
          />
          <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/70 to-transparent" />
          <div className="wrap absolute inset-x-0 bottom-0 pb-8 md:pb-12">
            <Reveal>
              <h2 id="cc-detail" className="t-h3 max-w-[20ch] text-white">
                Strong in its simplest form.
              </h2>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10 — Design approach */}
      <section aria-labelledby="cc-approach" className="section" style={{ background: CC.soft }}>
        <div className="wrap">
          <Head
            n="08"
            kicker="Design approach"
            id="cc-approach"
            title="From visual exploration to a unified mark."
            lead="An editorial reading of the finished identity, in three stages. It describes what the design does, not a dated production log."
          />
          <ol className="relative mt-14 grid gap-0 md:mt-20 md:grid-cols-3 md:gap-8">
            <span aria-hidden="true" className="absolute left-0 right-0 top-[7px] hidden h-px bg-line md:block" />
            {approach.map((a, i) => (
              <li key={a.n} className="relative border-l border-line pb-10 pl-8 last:pb-0 md:border-l-0 md:pb-0 md:pl-0">
                <Reveal delay={(i % 3) as 0 | 1 | 2}>
                  <span
                    aria-hidden="true"
                    className="absolute -left-[7.5px] top-0 block h-[15px] w-[15px] rounded-full md:left-0"
                    style={{ background: CC.gold, boxShadow: `0 0 0 4px ${CC.soft}` }}
                  />
                  <p className="font-mono text-[11px] tracking-[0.16em] text-ink-mute md:mt-10">{a.n}</p>
                  <h3 className="t-h3 mt-3 text-ink">{a.title}</h3>
                  <p className="t-body mt-3 max-w-[40ch] text-ink-2">{a.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 11 — Final brand reveal */}
      <section aria-labelledby="cc-reveal" className="on-dark relative isolate overflow-hidden section-loose text-white" style={{ background: CC.black }}>
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ background: "radial-gradient(42% 40% at 50% 40%, rgba(255,255,255,.09), transparent 72%)" }}
        />
        <div className="wrap text-center">
          <Reveal>
            <div className="relative mx-auto w-[min(80vw,620px)]" style={{ aspectRatio: ratio.full }}>
              <SmartImage
                src={asset.fullWhite}
                alt="Cinecraft Media logo in white with the gold MEDIA line"
                sizes="(min-width:780px) 620px, 80vw"
                fit="contain"
              />
            </div>
          </Reveal>
          <Reveal delay={1}>
            <h2 id="cc-reveal" className="t-h2 mx-auto mt-20 max-w-[16ch] md:mt-28">
              A clear mark. A considered identity.
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-white/55">
              Cinecraft Media — brand identity by <span style={{ color: CC.gold }}>Uniix Studio</span>
            </p>
          </Reveal>
        </div>
      </section>

      {/* For media brands — search intent: logo design for media / production companies */}
      <section aria-labelledby="cc-why" className="section-tight bg-bg">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow">For video production studios</p>
            <h2 id="cc-why" className="t-h3 mt-4 max-w-[22ch]">
              What makes a strong logo for a video production company
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="t-body max-w-[62ch] space-y-4 text-ink-2">
              <p>
                A production studio’s logo rarely sits on a plain page. It appears as a watermark over footage,
                on the end card of a hotel film, in the corner of a reel and as a tiny Instagram or TikTok
                avatar. It needs a compact symbol that survives at small sizes, a full lock-up for credits and
                proposals, and dependable light and dark versions.
              </p>
              <p>
                That is why we design a{" "}
                <Link href="/services/design/logo-design/" className="underline decoration-line underline-offset-4 hover:text-brand-ink">
                  logo
                </Link>{" "}
                as a small system rather than a single file, and why the Cinecraft Media identity ships as a full
                logo and a monogram, each in black and in white, as vectors and as raster exports. It is the
                foundation of a wider{" "}
                <Link href="/services/design/brand-identity/" className="underline decoration-line underline-offset-4 hover:text-brand-ink">
                  brand identity
                </Link>
                .
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
                  className="group flex min-h-[64px] items-center justify-between rounded-2xl border border-line bg-bg-warm p-5 transition-all duration-micro hover:-translate-y-0.5 hover:border-ink"
                >
                  <span className="font-display text-[17px] font-medium text-ink">{s.name}</span>
                  <span aria-hidden="true" className="font-mono text-[14px] text-ink transition-transform group-hover:translate-x-1">
                    ↗
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ — mirrors the FAQPage JSON-LD emitted by the route */}
      {project.faqs && project.faqs.length > 0 && (
        <section aria-labelledby="cc-faq" className="section-tight border-t border-line bg-bg">
          <div className="wrap max-w-[900px]">
            <Reveal>
              <p className="eyebrow">Questions</p>
              <h2 id="cc-faq" className="t-h3 mt-4">
                About the Cinecraft Media identity
              </h2>
            </Reveal>
            <div className="mt-8 border-t border-line">
              {project.faqs.map((f, i) => (
                <details key={f.question} className="group border-b border-line" open={i === 0}>
                  <summary className="flex min-h-[56px] cursor-pointer list-none items-center justify-between gap-6 py-5 font-display text-[18px] font-medium text-ink md:text-[20px] [&::-webkit-details-marker]:hidden">
                    {f.question}
                    <span aria-hidden="true" className="transition-transform duration-micro group-open:rotate-45" style={{ color: "#8A6D2C" }}>
                      +
                    </span>
                  </summary>
                  <p className="t-body max-w-[65ch] pb-6 text-ink-2">{f.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 12 — Closing CTA */}
      <section aria-labelledby="cc-close" className="on-dark section text-white" style={{ background: CC.charcoal }}>
        <div className="wrap flex flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <div>
            <Reveal>
              <h2 id="cc-close" className="t-h2 max-w-[14ch]">
                Explore more of our work.
              </h2>
            </Reveal>
            <Reveal delay={1}>
              <p className="t-lead mt-6 max-w-[46ch] text-white/70">
                Discover how Uniix Studio brings brands to life through thoughtful design and creative execution.
              </p>
            </Reveal>
          </div>
          <Reveal delay={2}>
            <div className="flex flex-wrap gap-4">
              <Link href="/portfolio/" className="btn btn-light group">
                <span aria-hidden="true">←</span> Back to Portfolio
              </Link>
              <Link href="/contact/" className="btn btn-outline-light group">
                Start a Project <span className="cta-arrow" aria-hidden="true">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <NextProjectExhibition nextProject={nextProject} prevProject={prevProject} />
    </>
  );
}
