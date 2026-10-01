import Link from "next/link";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import NextProjectExhibition from "@/components/portfolio/case-study/NextProjectExhibition";
import type { Project } from "@/lib/projects";
import PostAnatomy from "./PostAnatomy";
import LogoMap from "./LogoMap";
import FeedWall from "./FeedWall";
import {
  BS,
  anatomy,
  challenge,
  constants,
  formats,
  outcomes,
  posts,
  relatedServices,
  toneInfo,
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

const byId = (id: string) => posts.find((p) => p.id === id)!;

/** Hero deck: five posts fanned out; they spread wider on hover. */
const deck = [
  { id: "saffron-benefits", cls: "-translate-x-[62%] -rotate-[11deg] group-hover:-translate-x-[92%] group-hover:-rotate-[15deg]" },
  { id: "gooseberry-review", cls: "-translate-x-[32%] -rotate-[5deg] translate-y-[-3%] group-hover:-translate-x-[47%] group-hover:-rotate-[7deg]" },
  { id: "kasthuri-benefits", cls: "translate-y-[-6%] group-hover:translate-y-[-9%] z-10" },
  { id: "curly-ingredients", cls: "translate-x-[32%] rotate-[5deg] translate-y-[-3%] group-hover:translate-x-[47%] group-hover:rotate-[7deg]" },
  { id: "matara-ingredients", cls: "translate-x-[62%] rotate-[11deg] group-hover:translate-x-[92%] group-hover:rotate-[15deg]" },
];

const worlds = [
  { name: "Kasthuri Care", from: "#F9A65A", to: "#E2611B", post: "kasthuri-benefits" },
  { name: "Saffron", from: "#C4B0EC", to: "#4A2F86", post: "saffron-review" },
  { name: "Gooseberry Touch", from: "#F6C46E", to: "#1F5B33", post: "gooseberry-ingredients" },
  { name: "Sinharaja", from: "#C9DE9E", to: "#2C5A35", post: "sinharaja-review" },
  { name: "Matara Hair Essence", from: "#F1F1EE", to: "#3D5A1F", post: "matara-ingredients" },
  { name: "Bilesmalepa", from: "#F8D3B6", to: "#6F8295", post: "cleanser-dry" },
];

export default function BilesmaSocialCaseStudy({
  project,
  nextProject,
  prevProject,
}: {
  project: Project;
  nextProject: Project;
  prevProject?: Project;
}) {
  const anatomyPost = byId(anatomy.postId);
  const rowA = posts.slice(0, 10);
  const rowB = posts.slice(9);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden bg-bg pt-28 md:pt-36" aria-labelledby="bs-title">
        <div className="wrap">
          <div className="flex flex-wrap items-center justify-between gap-4 pb-8 border-b border-line">
            <Link
              href="/portfolio/"
              className="inline-flex items-center gap-2 min-h-[44px] font-mono text-[11px] tracking-[0.2em] uppercase text-ink-mute hover:text-brand-ink transition-colors duration-micro"
            >
              <span className="text-brand-ink" aria-hidden="true">←</span> All work
            </Link>
            <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-mute">
              Social media case study <span className="opacity-40 mx-1.5">·</span>
              <span className="text-brand-ink">{project.year}</span>
            </p>
          </div>

          <div className="mt-10 md:mt-16 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:items-end">
            <div>
              <p className="eyebrow rise-in">Social media creatives · Sri Lanka</p>
              <h1 id="bs-title" className="t-display mt-6 text-[clamp(48px,8.4vw,132px)] !leading-[0.9]">
                <span className="mask-line">
                  <span>One brand.</span>
                </span>{" "}
                <span className="mask-line">
                  <span style={{ color: BS.green }}>Every post.</span>
                </span>
              </h1>
            </div>
            <div className="lg:pb-4">
              <p
                className="rise-in t-h3 text-ink max-w-[26ch] text-[clamp(22px,2.3vw,32px)]"
                style={{ animationDelay: "140ms" }}
              >
                {project.headline}
              </p>
              <ul
                className="rise-in mt-6 flex flex-wrap gap-x-3 gap-y-2 font-mono text-[11px] tracking-[0.16em] uppercase text-ink-mute"
                style={{ animationDelay: "240ms" }}
                aria-label="Disciplines"
              >
                {["Social creatives", "Art direction", "Bilingual copy", "Templates"].map((d, i) => (
                  <li key={d} className="flex items-center gap-3">
                    {i > 0 && <span aria-hidden="true" className="text-brand-ink">·</span>}
                    {d}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Fanned deck */}
        <div className="wrap-wide mt-12 md:mt-16">
          <div
            className="relative overflow-hidden rounded-[32px] px-4 pb-10 pt-16 md:pb-14 md:pt-24"
            style={{
              background: `radial-gradient(60% 70% at 50% 40%, #2F5A41 0%, ${BS.deep} 70%)`,
            }}
          >
            <div className="group relative mx-auto h-[min(118vw,560px)] w-[min(52vw,340px)] md:h-[560px] md:w-[360px]">
              {deck.map((d) => {
                const p = byId(d.id);
                return (
                  <div
                    key={d.id}
                    className={`absolute inset-x-0 top-0 aspect-[4/5] overflow-hidden rounded-[18px] shadow-[0_30px_60px_-20px_rgba(0,0,0,.6)] ring-1 ring-white/10 transition-transform duration-[700ms] ease-uniix motion-reduce:transition-none ${d.cls}`}
                  >
                    <SmartImage
                      src={p.src}
                      alt={d.id === "kasthuri-benefits" ? p.alt : ""}
                      sizes="(min-width:768px) 360px, 52vw"
                      priority={d.id === "kasthuri-benefits"}
                    />
                  </div>
                );
              })}
            </div>
            <p className="relative mt-2 text-center font-mono text-[10px] tracking-[0.2em] uppercase text-white/45 md:mt-0">
              Hover the deck
            </p>
          </div>
        </div>
      </section>

      {/* Project information */}
      <section aria-label="Project information" className="mt-16 md:mt-24 border-y border-line bg-bg-warm">
        <div className="wrap py-10 md:py-12">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-5">
            {[
              { label: "Client", value: project.client ?? "Bilesma Natural" },
              { label: "Industry", value: "Ayurvedic skin & hair care" },
              { label: "Format", value: "4:5 feed posts" },
              { label: "Language", value: "Sinhala & English" },
            ].map((i) => (
              <div key={i.label}>
                <dt className="t-meta text-[10px] text-ink-mute">{i.label}</dt>
                <dd className="mt-2 font-display text-[17px] font-medium leading-[1.3] text-ink">{i.value}</dd>
              </div>
            ))}
            <div className="col-span-2 md:col-span-1">
              <dt className="t-meta text-[10px] text-ink-mute">Services</dt>
              <dd className="mt-2">
                <ul className="flex flex-wrap gap-x-3 gap-y-1 text-[14px] text-ink leading-[1.5]">
                  {["Post design", "Art direction", "Copywriting", "Templates"].map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </dd>
            </div>
          </dl>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="t-body text-ink-2 max-w-[70ch]">{project.summary}</p>
            <Link href="/portfolio/bilesma-natural/" className="link-cta group">
              See the packaging case study <span className="cta-arrow" aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Marquee of the feed */}
      <section aria-label="The Bilesma Natural feed" className="overflow-hidden bg-bg py-14 md:py-20">
        {[rowA, rowB].map((row, r) => (
          <div key={r} className={r === 1 ? "mt-3 md:mt-4" : undefined}>
            <ul
              className="marquee-track gap-3 md:gap-4 motion-reduce:!animate-none"
              style={{ animationDuration: "70s", animationDirection: r === 1 ? "reverse" : "normal" }}
            >
              {[...row, ...row].map((p, i) => (
                <li
                  key={`${p.id}-${i}`}
                  aria-hidden={i >= row.length || undefined}
                  className="relative aspect-[4/5] w-[150px] shrink-0 overflow-hidden rounded-[14px] md:w-[210px]"
                >
                  <SmartImage src={p.src} alt={i >= row.length ? "" : p.alt} sizes="210px" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>

      {/* 01 — Challenge */}
      <section aria-labelledby="bs-challenge" className="section border-t border-line bg-bg">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Head
            n="01"
            kicker="The challenge"
            id="bs-challenge"
            title="Many products. One face."
            lead="Bilesma Natural sells a growing range of Ayurvedic creams, lotions, oils and cleansers, and introduces them on social one product at a time. Each post had to sell its product and still look unmistakably like Bilesma."
          />
          <ol className="border-t border-line self-end">
            {challenge.map((c, i) => (
              <li key={c.title} className="border-b border-line">
                <Reveal delay={(i % 3) as 0 | 1 | 2} className="grid grid-cols-[auto_1fr] gap-x-5 py-6">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-brand-ink pt-1.5">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-display text-[19px] md:text-[21px] font-medium text-ink">{c.title}</h3>
                    <p className="t-body mt-2 text-ink-2 max-w-[58ch]">{c.body}</p>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 02 — Anatomy */}
      <section aria-labelledby="bs-anatomy" className="section border-t border-line" style={{ background: BS.cream }}>
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="02" kicker="Anatomy of a post" id="bs-anatomy" title="Nine zones. Every post." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                Take one post apart and you find the system. Hover or tap a zone to see what it does
                and why it sits where it does.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 md:mt-20">
            <PostAnatomy src={anatomyPost.src} alt={anatomyPost.alt} zones={anatomy.zones} />
          </div>
        </div>
      </section>

      {/* 03 — Logo placement */}
      <section aria-labelledby="bs-logo" className="on-dark section-loose text-white overflow-hidden" style={{ background: BS.deep }}>
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head
              n="03"
              kicker="Logo placement"
              id="bs-logo"
              title="The mark moves. The rule doesn’t."
              dark
            />
            <Reveal delay={1}>
              <p className="t-lead text-white/75 max-w-[48ch]">
                The logo always takes a top corner, on the side opposite the headline, and changes
                colour only for contrast. Pick a corner to see every post that uses it.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 md:mt-20">
            <LogoMap posts={posts} tones={toneInfo} />
          </div>
        </div>
      </section>

      {/* 04 — Constants */}
      <section aria-labelledby="bs-constants" className="section bg-bg">
        <div className="wrap">
          <Head
            n="04"
            kicker="Brand constants"
            id="bs-constants"
            title="What never changes."
            lead="Colours, products and formats rotate. These five elements do not. Each dot below is one of the nineteen posts."
          />
          <ul className="mt-14 border-t border-line">
            {constants.map((c, ci) => {
              const hits = posts.map((p) => (c.key === "logo" ? true : p.has[c.key]));
              const n = hits.filter(Boolean).length;
              return (
                <li key={c.key} className="border-b border-line">
                  <Reveal
                    delay={(ci % 3) as 0 | 1 | 2}
                    className="grid gap-4 py-6 md:grid-cols-[minmax(0,1fr)_auto_auto] md:items-center md:gap-10"
                  >
                    <div>
                      <h3 className="font-display text-[19px] md:text-[21px] font-medium text-ink">{c.label}</h3>
                      <p className="mt-1 text-[14px] text-ink-mute">{c.note}</p>
                    </div>
                    <div className="flex flex-wrap gap-1.5" aria-hidden="true">
                      {hits.map((h, i) => (
                        <span
                          key={posts[i].id}
                          title={posts[i].product}
                          className="h-3.5 w-3.5 rounded-[4px] transition-transform duration-micro hover:scale-150"
                          style={{ background: h ? BS.green : "transparent", boxShadow: h ? undefined : "inset 0 0 0 1px rgba(0,0,0,.18)" }}
                        />
                      ))}
                    </div>
                    <p className="font-display text-[28px] font-semibold leading-none text-ink tabular-nums md:text-right">
                      {n}
                      <span className="text-[16px] font-normal text-ink-mute"> / {posts.length}</span>
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* 05 — Formats & feed */}
      <section aria-labelledby="bs-feed" className="section border-t border-line bg-bg">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="05" kicker="Formats" id="bs-feed" title="Five formats, one family." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                Each format has a job in the funnel: reviews build trust, ingredients prove the
                Ayurvedic story, offers close. Open any post to run it against the brand check.
              </p>
            </Reveal>
          </div>
          <div className="mt-12 md:mt-16">
            <FeedWall posts={posts} formats={formats} />
          </div>
        </div>
      </section>

      {/* 06 — Colour worlds */}
      <section aria-labelledby="bs-worlds" className="section border-t border-line bg-bg-warm">
        <div className="wrap">
          <Head
            n="06"
            kicker="Colour"
            id="bs-worlds"
            title="Each product keeps its own world."
            lead="Backgrounds are pulled from the packaging, so a customer who knows the bottle recognises the post. The frame around it stays the same."
          />
          <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {worlds.map((w, i) => {
              const p = byId(w.post);
              return (
                <li key={w.name}>
                  <Reveal delay={(i % 3) as 0 | 1 | 2}>
                    <figure className="group">
                      <div
                        className="relative aspect-[3/4] overflow-hidden rounded-[18px]"
                        style={{ background: `linear-gradient(160deg, ${w.from}, ${w.to})` }}
                      >
                        <div className="absolute inset-x-[14%] top-[12%] aspect-[4/5] overflow-hidden rounded-[10px] shadow-[0_18px_40px_-14px_rgba(0,0,0,.55)] transition-transform duration-std ease-uniix group-hover:-translate-y-1.5 group-hover:rotate-[-2deg] motion-reduce:transition-none">
                          <SmartImage src={p.src} alt="" sizes="(min-width:1024px) 12vw, 32vw" />
                        </div>
                      </div>
                      <figcaption className="mt-3">
                        <span className="block font-display text-[16px] font-medium text-ink">{w.name}</span>
                        <span className="font-mono text-[10px] tracking-[0.12em] uppercase text-ink-mute">
                          {w.from} → {w.to}
                        </span>
                      </figcaption>
                    </figure>
                  </Reveal>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Outcome */}
      <section aria-labelledby="bs-outcome" className="section border-t border-line bg-bg">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Head
            n="07"
            kicker="Outcome"
            id="bs-outcome"
            title="A feed you can recognise without the logo."
            lead="What Bilesma Natural has now:"
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

      {/* Why consistency matters (search intent: social media design Sri Lanka) */}
      <section aria-labelledby="bs-why" className="section-tight border-t border-line bg-bg">
        <div className="wrap grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Reveal>
            <p className="eyebrow">For product brands</p>
            <h2 id="bs-why" className="t-h3 mt-4 max-w-[20ch]">
              Why a consistent feed sells more than a clever post
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <div className="t-body text-ink-2 max-w-[62ch] space-y-4">
              <p>
                People scroll past a post in under a second. If your brand looks different every
                time, every post has to introduce you from scratch. A fixed frame (logo, sign-off,
                trust marks, URL) means each post builds on the last, and customers start
                recognising you before they read a word.
              </p>
              <p>
                That is why we design social media for Sri Lankan beauty and wellness brands as a{" "}
                <Link href="/services/design/social-media-creatives/" className="underline decoration-line underline-offset-4 hover:text-brand-ink">
                  template system
                </Link>
                , not a series of one-off graphics, and tie it back to the same{" "}
                <Link href="/portfolio/bilesma-natural/" className="underline decoration-line underline-offset-4 hover:text-brand-ink">
                  packaging and print
                </Link>{" "}
                the customer holds.
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
        <section aria-labelledby="bs-faq" className="section-tight border-t border-line bg-bg">
          <div className="wrap max-w-[900px]">
            <Reveal>
              <p className="eyebrow">Questions</p>
              <h2 id="bs-faq" className="t-h3 mt-4">About this project</h2>
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
      <section aria-labelledby="bs-close" className="on-dark relative overflow-hidden bg-bg-ink text-white section-loose">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(45% 60% at 80% 20%, rgba(106,150,112,.28), transparent 70%), radial-gradient(50% 55% at 10% 90%, rgba(91,62,140,.22), transparent 70%)`,
          }}
        />
        <div className="wrap relative">
          <Reveal>
            <p className="eyebrow">Closing</p>
            <h2 id="bs-close" className="t-display mt-6 max-w-[16ch]">
              Does your feed look like one brand?
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead mt-8 max-w-[56ch] text-white/75">
              Uniix Studio designs social media systems that keep Sri Lankan product brands
              recognisable in every post, in Sinhala and English.
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
