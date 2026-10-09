import Link from "next/link";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import NextProjectExhibition from "@/components/portfolio/case-study/NextProjectExhibition";
import type { Project } from "@/lib/projects";
import CricBookHero from "./CricBookHero";
import BrandSection from "./BrandSection";
import JourneyTabs from "./JourneyTabs";
import BookingSequence from "./BookingSequence";
import VenueConsole from "./VenueConsole";
import LazyVideo from "./LazyVideo";
import ScrollingPage from "./ScrollingPage";
import { BigIdeaFlow, Ecosystem, LayersRail } from "./Systems";
import { BrowserFrame, PhoneFrame, TabletFrame } from "./Frames";
import {
  CB,
  channels,
  consoleModules,
  faqs,
  img,
  infoServices,
  outcomes,
  projectInfo,
  seoAreas,
  seoFoundations,
  seoFunnel,
  seoPages,
  services,
  technology,
  video,
  websiteBalance,
  websiteSequence,
} from "./data";

/** Section heading pair used throughout — Uniix eyebrow + t-h2. */
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
          <span className={dark ? "text-[#22E0A0]" : "text-brand-ink"}>{n}</span> {kicker}
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

export default function CricBookCaseStudy({
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
      {/* 01 — Hero */}
      <CricBookHero />

      {/* 02 — Project information */}
      <section aria-label="Project information" className="mt-16 md:mt-24 border-y border-line bg-bg-warm">
        <div className="wrap py-10 md:py-12">
          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 lg:grid-cols-[1fr_1fr_1fr_1.4fr_1.6fr_0.6fr]">
            {projectInfo.slice(0, 3).map((i) => (
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
            {projectInfo.slice(3).map((i) => (
              <div key={i.label}>
                <dt className="t-meta text-[10px] text-ink-mute">{i.label}</dt>
                <dd className="mt-2 font-display text-[17px] font-medium leading-[1.3] text-ink">{i.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
            <p className="t-body text-ink-2 max-w-[70ch]">{project.summary}</p>
            {project.url && (
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="link-cta group">
                Visit cricbook.lk <span className="cta-arrow" aria-hidden="true">↗</span>
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* 03 — Challenge */}
      <section aria-labelledby="cb-challenge" className="section bg-bg">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-20 items-center">
          <div>
            <Head
              n="01"
              kicker="The challenge"
              id="cb-challenge"
              title="Booking a court shouldn’t start with a phone call."
              lead="In Sri Lanka, a game of indoor cricket or futsal usually starts with calling around. Availability lives in a paper diary, a WhatsApp thread and somebody’s memory — and none of them agree."
            />
            <Reveal delay={2}>
              <blockquote className="mt-10 border-l-2 pl-6" style={{ borderColor: CB.magenta }}>
                <p className="t-h4 text-ink max-w-[34ch]">
                  CricBook needed more than a website. It needed a digital system connecting players,
                  venues and bookings in one experience.
                </p>
              </blockquote>
            </Reveal>
          </div>

          {/* Fragmented channels → one system */}
          <Reveal delay={1}>
            <div className="relative grid grid-cols-[1fr_auto_0.9fr] items-center gap-3 sm:gap-6 rounded-[28px] border border-line bg-white p-5 sm:p-8 shadow-sm2">
              <ul className="flex flex-col gap-2" aria-label="How bookings were scattered">
                {channels.map((c, i) => (
                  <li
                    key={c.name}
                    className="rounded-xl border border-line bg-bg px-3 py-2.5 sm:px-4"
                    style={{ transform: `rotate(${[-1.2, 0.8, -0.6, 1.1, -0.9, 0.5][i]}deg)` }}
                  >
                    <span className="block text-[13px] sm:text-[14px] font-medium text-ink">{c.name}</span>
                    <span className="block text-[11px] sm:text-[12px] text-ink-mute">{c.note}</span>
                  </li>
                ))}
              </ul>
              <svg viewBox="0 0 40 240" className="h-[240px] w-6 sm:w-10" aria-hidden="true" fill="none">
                {[20, 60, 100, 140, 180, 220].map((y) => (
                  <path key={y} d={`M0 ${y} C 24 ${y}, 18 120, 40 120`} stroke="rgba(18,16,14,.22)" strokeWidth="1" />
                ))}
              </svg>
              <div className="rounded-2xl p-4 sm:p-6 text-white text-center" style={{ background: CB.indigo }}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.brand.spark} alt="" aria-hidden="true" className="mx-auto h-10 w-auto" />
                <p className="mt-3 font-mono text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-[#22E0A0]">CricBook</p>
                <p className="mt-1 font-display text-[16px] sm:text-[20px] font-medium leading-tight">One live calendar</p>
                <p className="mt-2 hidden sm:block text-[12px] leading-[1.45] text-white/65">
                  Every booking, however it was taken, in one place.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* 04 — The big idea */}
      <section aria-labelledby="cb-idea" className="on-dark section-loose bg-bg-ink text-white overflow-hidden">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="02" kicker="The big idea" id="cb-idea" title="From brand to platform." dark />
            <Reveal delay={1}>
              <p className="t-lead text-white/75 max-w-[48ch]">
                Uniix Studio worked across the entire digital experience — from identity and product
                UX to the customer-facing platform, the venue-owner experience, content and growth
                foundations. Brand, product and technology were built together.
              </p>
            </Reveal>
          </div>
          <div className="mt-16 md:mt-24">
            <BigIdeaFlow />
          </div>
        </div>
      </section>

      {/* 05 — What we built */}
      <section aria-labelledby="cb-built" className="section bg-bg">
        <div className="wrap">
          <Head
            n="03"
            kicker="Scope"
            id="cb-built"
            title="What we built."
            lead="Twelve disciplines, one team, one product. None of them were handed off to someone else."
          />
          <ol className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s, i) => (
              <li key={s.title} className="group relative border-b border-r border-line">
                <Reveal delay={(i % 4) as 0 | 1 | 2 | 3} className="h-full">
                  <div className="flex h-full sm:min-h-[200px] flex-col justify-between p-5 sm:p-6 md:p-7 transition-colors duration-std group-hover:bg-white">
                    <span className="font-mono text-[11px] tracking-[0.18em] text-ink-mute transition-colors duration-micro group-hover:text-[#C9147A]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <div className="mt-3 sm:mt-10">
                      <h3 className="t-h4">{s.title}</h3>
                      <p className="mt-2 text-[14px] leading-[1.55] text-ink-2">{s.body}</p>
                    </div>
                  </div>
                  <span
                    aria-hidden="true"
                    className="absolute bottom-0 left-0 h-[2px] w-full origin-left scale-x-0 transition-transform duration-std ease-uniix group-hover:scale-x-100"
                    style={{ background: `linear-gradient(90deg, ${CB.mint}, ${CB.magenta})` }}
                  />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 06 — Brand */}
      <BrandSection />

      {/* 07 — Product design */}
      <section aria-labelledby="cb-product" className="section bg-bg">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="05" kicker="Product design" id="cb-product" title="Designing the game before the game starts." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                From venue discovery to payment, every step was designed as one experience. Five
                stages, each with one job — and one decision the player shouldn’t have to think about.
              </p>
            </Reveal>
          </div>
          <div className="mt-14 md:mt-20">
            <JourneyTabs />
          </div>

          {/* Desktop parity */}
          <div className="mt-20 md:mt-28 grid gap-5 md:grid-cols-2">
            <Reveal>
              <BrowserFrame
                src={img.app.dtList}
                alt="CricBook desktop design: futsal venues near you, in a grid of venue cards"
                url="cricbook.lk/venues"
                sizes="(min-width:768px) 46vw, 92vw"
                ratio="1440/927"
              />
            </Reveal>
            <Reveal delay={1}>
              <BrowserFrame
                src={img.app.dtSlots}
                alt="CricBook desktop design: select a time slot with a booking summary"
                url="cricbook.lk/venues/…/book"
                sizes="(min-width:768px) 46vw, 92vw"
                ratio="16/10"
              />
            </Reveal>
          </div>
          <Reveal>
            <p className="mt-5 font-mono text-[11px] tracking-[0.06em] text-ink-mute">
              The same flow, designed for desktop — one component system across both.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 08 — Booking experience */}
      <section
        aria-labelledby="cb-booking"
        className="on-dark relative bg-bg-ink text-white pt-[80px] md:pt-[120px] pb-16"
        style={{ background: `linear-gradient(180deg, ${CB.indigoDeep} 0%, ${CB.indigo} 100%)` }}
      >
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
            <Head
              n="06"
              kicker="Booking experience"
              id="cb-booking"
              title={
                <>
                  From “Where should we play?” to{" "}
                  <span style={{ color: CB.mint }}>“See you at 8.”</span>
                </>
              }
              dark
            />
            <Reveal delay={1}>
              <p className="t-lead text-white/75 max-w-[44ch]">
                Eight screens, about a minute. The slot is held while you check out, so it can’t be
                taken from under you mid-booking.
              </p>
            </Reveal>
          </div>
        </div>
        <div className="mt-12 lg:mt-0">
          <BookingSequence />
        </div>
      </section>

      {/* 09 — Venue owner experience */}
      <section aria-labelledby="cb-venue" className="section bg-bg">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="07" kicker="Venue experience" id="cb-venue" title="Behind every booking is a venue." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                A booking platform that only serves players is half a product. Venue operators needed
                to run their business — cash, walk-ins, regulars and staff included — not simply
                receive bookings.
              </p>
            </Reveal>
          </div>

          {/* Player + Venue = one platform */}
          <Reveal className="mt-14">
            <div className="grid items-stretch gap-3 md:grid-cols-[1fr_auto_1fr_auto_1.1fr]">
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="t-meta text-[10px] text-ink-mute">Player experience</p>
                <p className="mt-2 t-h4">Find, book and pay in about a minute.</p>
              </div>
              <span aria-hidden="true" className="grid place-items-center font-display text-[32px] text-ink-mute">+</span>
              <div className="rounded-2xl border border-line bg-white p-6">
                <p className="t-meta text-[10px] text-ink-mute">Venue experience</p>
                <p className="mt-2 t-h4">Run every court from one live calendar.</p>
              </div>
              <span aria-hidden="true" className="grid place-items-center font-display text-[32px] text-ink-mute">=</span>
              <div className="rounded-2xl p-6 text-white" style={{ background: CB.indigo }}>
                <p className="t-meta text-[10px] text-[#22E0A0]">CricBook</p>
                <p className="mt-2 font-display text-[clamp(18px,1.5vw,21px)] font-medium leading-[1.3]">
                  One connected platform — a slot sold anywhere is off sale everywhere.
                </p>
              </div>
            </div>
          </Reveal>

          <div className="on-dark mt-10 rounded-[24px] md:rounded-[32px] bg-bg-ink p-5 sm:p-8 md:p-12 text-white">
            <VenueConsole />
            <div className="mt-10 border-t border-white/10 pt-8 grid gap-6 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,2fr)] lg:gap-12">
              <p className="t-meta text-white/55">Console modules</p>
              <ul className="flex flex-wrap gap-2">
                {consoleModules.map((m) => (
                  <li key={m} className="rounded-full border border-white/15 px-3.5 py-1.5 text-[13px] text-white/80">
                    {m}
                  </li>
                ))}
              </ul>
            </div>
            <p className="mt-8 font-mono text-[11px] leading-[1.6] text-white/60">
              Console views are from CricBook’s public venue demo — the venue, names and figures in
              them are illustrative, as labelled in the product.
            </p>
          </div>

          <div className="mt-6 grid gap-5 md:grid-cols-[1.4fr_1fr]">
            <Reveal>
              <BrowserFrame
                src={img.web.ownerSignIn}
                alt="CricBook venue management sign-in: Run your venue. Not your notebook."
                url="cricbook.lk/dashboard-login"
                sizes="(min-width:768px) 56vw, 92vw"
              />
            </Reveal>
            <Reveal delay={1}>
              <div className="relative h-full min-h-[360px] overflow-hidden rounded-[18px] bg-[#1C244B]">
                <SmartImage
                  src={img.social.flyerOwners}
                  alt="CricBook for venue owners flyer: Keep taking cash. Lose the diary."
                  sizes="(min-width:768px) 36vw, 92vw"
                  position="top"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 10 — Platform ecosystem */}
      <section aria-labelledby="cb-system" className="section overflow-hidden border-t border-line bg-bg-warm">
        <div className="wrap">
          <Head
            n="08"
            kicker="The system"
            id="cb-system"
            title="One platform in the middle of the game."
            lead="Players and venues never had a shared source of truth. CricBook became it — every capability below reads and writes the same courts, slots and bookings."
            className="text-center [&_.eyebrow]:justify-center [&_h2]:mx-auto [&_p.t-lead]:mx-auto"
          />
          <div className="mt-16 md:mt-20">
            <Ecosystem />
          </div>
        </div>
      </section>

      {/* 11 — Responsive */}
      <section aria-labelledby="cb-responsive" className="section bg-bg overflow-hidden">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="09" kicker="Responsive" id="cb-responsive" title="Designed for the screen in your hand." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                Courts get booked on the way to somewhere — in a tuk-tuk, on a commute, mid-argument
                in the group chat about who’s free. So the phone came first, and it installs to the
                home screen like an app.
              </p>
            </Reveal>
          </div>

          {/* Device composition */}
          <Reveal className="mt-14 md:mt-20">
            <div className="relative mx-auto max-w-[1180px] pb-10 md:pb-16">
              <div className="w-full md:w-[78%]">
                <BrowserFrame
                  src={img.web.venue}
                  alt="CricBook venue page on desktop"
                  url="cricbook.lk/venues/prime-sports-hub-i-malabe"
                  sizes="(min-width:1280px) 920px, (min-width:768px) 76vw, 92vw"
                />
              </div>
              <div className="absolute right-[18%] top-[14%] hidden md:block w-[26%] max-w-[300px]">
                <TabletFrame src={img.live.tabletHome} alt="CricBook homepage on a tablet" sizes="300px" />
              </div>
              <div className="absolute right-0 top-[30%] w-[30%] md:w-[17%] max-w-[200px]">
                <PhoneFrame src={img.live.mobileHome} alt="CricBook homepage on a phone" sizes="(min-width:768px) 200px, 30vw" />
              </div>
            </div>
          </Reveal>

          {/* Mobile screen row */}
          <ul
            className="mt-10 flex gap-4 md:gap-6 overflow-x-auto snap-x snap-mandatory -mx-[var(--gutter)] px-[var(--gutter)] pb-4 md:grid md:grid-cols-5 md:overflow-visible md:mx-0 md:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Mobile screens"
          >
            {[
              { src: img.live.mobileHome, label: "Mobile homepage", alt: "CricBook mobile homepage with sport and area search" },
              { src: img.live.mobileMap, label: "Venue listing", alt: "CricBook mobile venue map with prices" },
              { src: img.live.mobileVenue, label: "Venue details", alt: "CricBook mobile venue details page with availability" },
              { src: img.app.slots, label: "Availability", alt: "CricBook mobile availability and slot selection" },
              { src: img.app.confirmed, label: "Booking confirmation", alt: "CricBook mobile booking confirmation" },
            ].map((s, i) => (
              <li key={s.label} className="w-[56vw] max-w-[240px] flex-none snap-start md:w-auto md:max-w-none">
                <Reveal delay={(i % 4) as 0 | 1 | 2 | 3}>
                  <PhoneFrame src={s.src} alt={s.alt} sizes="(min-width:768px) 18vw, 56vw" />
                  <p className="mt-4 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute">
                    <span className="text-brand-ink">{String(i + 1).padStart(2, "0")}</span> {s.label}
                  </p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 12 — Website */}
      <section aria-labelledby="cb-web" className="section border-t border-line" style={{ background: CB.surface }}>
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="10" kicker="Website design & development" id="cb-web" title="Where product meets brand." />
            <Reveal delay={1}>
              <div>
                <p className="t-lead text-ink-2 max-w-[48ch]">
                  The public site has to sell a product, earn a stranger’s trust and bring venues on
                  board — while every page stays one tap from a live booking. It balances:
                </p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {websiteBalance.map((b) => (
                    <li key={b} className="rounded-full border border-black/10 bg-white px-3.5 py-1.5 text-[13px] text-ink-2">
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal className="mt-14 md:mt-20">
            <ScrollingPage src={img.web.homeLong} alt="The full CricBook homepage, from hero to footer" />
          </Reveal>

          <ol className="mt-16 md:mt-24 grid gap-x-5 gap-y-12 md:grid-cols-2">
            {websiteSequence.map((w, i) => (
              <li key={w.label} className={i % 2 === 1 ? "md:mt-24" : ""}>
                <Reveal>
                  <p className="mb-4 flex items-center gap-3 font-mono text-[11px] tracking-[0.14em] uppercase text-ink-mute">
                    <span className="text-brand-ink">{String(i + 1).padStart(2, "0")}</span>
                    {w.label}
                    {i < websiteSequence.length - 1 && <span aria-hidden="true" className="text-ink-mute/50">→</span>}
                  </p>
                  <BrowserFrame src={w.src} alt={w.alt} url={w.path} sizes="(min-width:768px) 46vw, 92vw" />
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 13 — SEO */}
      <section aria-labelledby="cb-seo" className="section bg-bg">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="11" kicker="Search & growth" id="cb-seo" title="Built to be discovered." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                SEO wasn’t bolted on after launch. The information architecture follows the way
                players search — sport, then area, then venue — so every search path ends at a
                bookable slot.
              </p>
            </Reveal>
          </div>

          {/* Funnel */}
          <Reveal className="mt-14">
            <ol className="grid gap-2 md:grid-cols-5">
              {seoFunnel.map((f, i) => (
                <li
                  key={f.step}
                  className="relative rounded-2xl px-5 py-6 text-white"
                  style={{
                    background: [CB.indigoDeep, CB.indigo, "#322A8A", CB.electric, CB.magenta][i],
                  }}
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] opacity-70">{String(i + 1).padStart(2, "0")}</span>
                  <p className="mt-6 font-display text-[24px] font-medium uppercase tracking-[-0.02em]">{f.step}</p>
                  <p className="mt-1 font-mono text-[11px] opacity-85 break-words">{f.example}</p>
                  {i < seoFunnel.length - 1 && (
                    <span aria-hidden="true" className="absolute -right-3 top-1/2 z-[1] hidden h-6 w-6 -translate-y-1/2 place-items-center rounded-full bg-bg text-[12px] text-ink md:grid">
                      →
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-16">
            <div>
              <ul className="border-t border-line">
                {seoFoundations.map((f) => (
                  <li key={f.title} className="grid gap-1 border-b border-line py-5 sm:grid-cols-[180px_1fr] sm:gap-6">
                    <span className="font-display text-[16px] font-medium text-ink">{f.title}</span>
                    <span className="text-[14px] leading-[1.55] text-ink-2">{f.body}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8">
                <p className="t-meta text-[10px] text-ink-mute">Areas the site is structured around</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {seoAreas.map((a) => (
                    <li key={a} className="rounded-full bg-bg-warm px-3 py-1.5 text-[13px] text-ink-2 ring-1 ring-line">
                      {a}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[13px] leading-[1.55] text-ink-mute max-w-[52ch]">
                  Plus sport pages for indoor cricket and futsal, court-dimension guides, a court price
                  index and area landing pages for venue owners across the island.
                </p>
              </div>
            </div>
            <ul className="grid grid-cols-2 gap-4 self-start">
              {seoPages.map((p, i) => (
                <li key={p.path} className={i % 2 === 1 ? "mt-10" : ""}>
                  <Reveal delay={(i % 2) as 0 | 1}>
                    <BrowserFrame src={p.src} alt={p.alt} url={`cricbook.lk${p.path}`} sizes="(min-width:1024px) 26vw, 46vw" />
                    <p className="mt-3 font-mono text-[10px] tracking-[0.14em] uppercase text-ink-mute">{p.label}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <Reveal>
            <p className="mt-10 font-mono text-[11px] text-ink-mute">
              We don’t publish traffic or ranking numbers for CricBook here — this is the foundation, not a scoreboard.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 14 — Content & social */}
      <section aria-labelledby="cb-social" className="section border-t border-line bg-bg">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="12" kicker="Content & social" id="cb-social" title="The product doesn’t stop at the interface." />
            <Reveal delay={1}>
              <p className="t-lead text-ink-2 max-w-[48ch]">
                We extended the CricBook identity into social content, promotional communication and
                growth assets, so the brand stayed recognisable long before anyone opened the app.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 md:mt-20 grid grid-cols-2 gap-3 md:grid-cols-12 md:gap-4">
            <Reveal className="col-span-2 md:col-span-4 md:row-span-2">
              <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden rounded-[18px] bg-[#1C244B]">
                <SmartImage src={img.social.flyer} alt="CricBook venue flyer: What is CricBook, three steps to go live" sizes="(min-width:768px) 40vw, 92vw" position="top" />
              </div>
            </Reveal>
            {[
              { src: img.social.courts, alt: "CricBook launch post: Courts" },
              { src: img.social.foundingMint, alt: "CricBook campaign post: Founding courts, mint" },
              { src: img.social.owners, alt: "CricBook post for venue owners" },
              { src: img.social.foundingMagenta, alt: "CricBook campaign post: Founding courts, magenta" },
            ].map((s, i) => (
              <Reveal key={s.src} delay={(i % 3) as 0 | 1 | 2} className="md:col-span-4">
                <div className="relative aspect-square overflow-hidden rounded-[18px]">
                  <SmartImage src={s.src} alt={s.alt} sizes="(min-width:768px) 24vw, 46vw" />
                </div>
              </Reveal>
            ))}
            {[
              { src: img.social.storyWhy, alt: "CricBook story: Why I started CricBook" },
              { src: img.social.storyMessage, alt: "CricBook story: You message the venue… and then you wait for a reply." },
              { src: img.social.storyComingSoon, alt: "CricBook story: Coming soon" },
            ].map((s, i) => (
              <Reveal key={s.src} delay={(i % 3) as 0 | 1 | 2} className={i === 2 ? "hidden md:block md:col-span-4" : "md:col-span-4"}>
                <div className="relative aspect-[9/16] overflow-hidden rounded-[18px]">
                  <SmartImage src={s.src} alt={s.alt} sizes="(min-width:768px) 30vw, 46vw" />
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <div className="mt-4 grid grid-cols-3 gap-3 md:gap-4">
              {[
                { src: img.social.proof, alt: "CricBook post: Proof" },
                { src: img.social.how, alt: "CricBook post: How" },
                { src: img.social.courtsAlt, alt: "CricBook post: Courts, alternate" },
              ].map((s) => (
                <div key={s.src} className="relative aspect-square overflow-hidden rounded-[18px]">
                  <SmartImage src={s.src} alt={s.alt} sizes="(min-width:768px) 30vw, 31vw" />
                </div>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* 15 — Motion */}
      <section aria-labelledby="cb-motion" className="on-dark section text-white" style={{ background: CB.indigoDeep }}>
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.9fr)] lg:items-end">
            <Head n="13" kicker="Motion" id="cb-motion" title="Designed to move." dark />
            <Reveal delay={1}>
              <p className="t-lead text-white/75 max-w-[46ch]">
                A logo reveal that strikes like the mark, and a vertical story reel that walks through
                the problem — for players and for venues — before CricBook arrives.
              </p>
            </Reveal>
          </div>

          <div className="mt-14 md:mt-20 grid gap-4 md:gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.35fr)]">
            <Reveal>
              <LazyVideo
                src={video.logoReveal.src}
                poster={video.logoReveal.poster}
                label="CricBook logo reveal animation"
                className="aspect-square rounded-[20px] bg-[#1C244B]"
              />
              <p className="mt-3 font-mono text-[11px] tracking-[0.14em] uppercase text-white/55">Logo reveal</p>
            </Reveal>
            <ul className="grid grid-cols-2 gap-3 md:grid-cols-4 md:gap-4 self-end" aria-label="Story reel">
              {video.reel.map((r, i) => (
                <li key={r.src}>
                  <Reveal delay={(i % 4) as 0 | 1 | 2 | 3}>
                    <LazyVideo src={r.src} poster={r.poster} label={r.alt} className="aspect-[9/16] rounded-[16px] bg-[#1C244B]" />
                    <p className="mt-3 font-mono text-[10px] tracking-[0.12em] uppercase text-white/55">{r.label}</p>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 16 — Gallery */}
      <section aria-label="CricBook visual gallery" className="section bg-bg">
        <div className="wrap-wide">
          <Reveal>
            <div className="relative aspect-[4/3] md:aspect-[21/9] overflow-hidden rounded-[20px] md:rounded-[32px]">
              <SmartImage src={img.photo.court1} alt="Indoor cricket nets under floodlights" sizes="(min-width:1560px) 1520px, 96vw" />
              <div aria-hidden="true" className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 md:bottom-10 md:left-10 flex items-end justify-between gap-6">
                <p className="font-display text-[clamp(28px,4.4vw,64px)] font-medium uppercase leading-[0.95] tracking-[-0.03em] text-white max-w-[14ch]">
                  Book. Play. <span style={{ color: CB.mint }}>Compete.</span>
                </p>
                <div className="hidden md:block w-[16%] max-w-[210px] translate-y-[30%]">
                  <PhoneFrame src={img.app.confirmed} alt="" sizes="210px" />
                </div>
              </div>
            </div>
          </Reveal>

          <div className="mt-4 md:mt-5 grid gap-4 md:gap-5 md:grid-cols-12">
            <Reveal className="md:col-span-7">
              <div className="relative h-full min-h-[280px] overflow-hidden rounded-[20px] p-5 md:p-10" style={{ background: CB.surface }}>
                <BrowserFrame src={img.app.dtConfirmed} alt="CricBook desktop design: You are booked confirmation" url="cricbook.lk/bookings" sizes="(min-width:768px) 52vw, 88vw" />
              </div>
            </Reveal>
            <Reveal delay={1} className="md:col-span-5">
              <div className="relative aspect-[4/5] md:aspect-auto md:h-full overflow-hidden rounded-[20px]">
                <SmartImage src={img.photo.futsalStrike} alt="Futsal player striking the ball on indoor turf" sizes="(min-width:768px) 38vw, 92vw" />
              </div>
            </Reveal>
            <Reveal className="md:col-span-4">
              <div className="relative aspect-square overflow-hidden rounded-[20px]" style={{ background: CB.navy }}>
                <SmartImage src={img.brand.lockupDark} alt="CricBook logo lockup on navy" sizes="(min-width:768px) 30vw, 92vw" />
              </div>
            </Reveal>
            <Reveal delay={1} className="md:col-span-8">
              <div className="relative h-full min-h-[300px] overflow-hidden rounded-[20px]" style={{ background: CB.indigo }}>
                <div className="absolute inset-0 opacity-40">
                  <SmartImage src={img.photo.futsalCage} alt="" sizes="(min-width:768px) 60vw, 92vw" />
                </div>
                <div className="relative flex h-full items-center justify-center gap-4 md:gap-8 p-6 md:p-10">
                  {[img.app.list, img.app.venue, img.app.bookings].map((s, i) => (
                    <div key={s} className={`w-[30%] max-w-[190px] ${i === 1 ? "-translate-y-4" : "translate-y-4"}`}>
                      <PhoneFrame src={s} alt="" sizes="(min-width:768px) 190px, 28vw" />
                    </div>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal className="md:col-span-12">
              <div className="relative aspect-[5/2] md:aspect-[4/1] overflow-hidden rounded-[20px] bg-white ring-1 ring-line">
                <SmartImage src={img.brand.wordmarkWide} alt="CricBook wordmark" sizes="(min-width:1560px) 1520px, 96vw" fit="contain" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 17 — Outcome */}
      <section aria-labelledby="cb-outcome" className="section border-t border-line bg-bg-warm">
        <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-20">
          <Head
            n="14"
            kicker="Outcome"
            id="cb-outcome"
            title="Built as a foundation for scale."
            lead="CricBook is early, and we’d rather show the foundation than invent a scoreboard. What exists today:"
          />
          <ol className="border-t border-line self-end">
            {outcomes.map((o, i) => (
              <li key={o} className="flex items-baseline gap-5 border-b border-line py-4">
                <span className="font-mono text-[11px] tracking-[0.16em] text-brand-ink">{String(i + 1).padStart(2, "0")}</span>
                <span className="font-display text-[clamp(18px,1.6vw,22px)] font-medium tracking-[-0.015em] text-ink">{o}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 18 — Technology */}
      <section aria-labelledby="cb-tech" className="section bg-bg">
        <div className="wrap">
          <Head
            n="15"
            kicker="Technology"
            id="cb-tech"
            title="Engineered like a product, not a brochure."
            lead="One codebase serves players and venue owners, on the web and on the home screen. The stack below is what CricBook actually runs on."
          />
          <dl className="mt-14 grid border-l border-t border-line sm:grid-cols-2 lg:grid-cols-4">
            {technology.map((t) => (
              <div key={t.group} className="border-b border-r border-line p-6">
                <dt className="t-meta text-[10px] text-ink-mute">{t.group}</dt>
                <dd className="mt-4">
                  <ul className="flex flex-col gap-1.5">
                    {t.items.map((it) => (
                      <li key={it} className="font-display text-[16px] font-medium text-ink">
                        {it}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* 19 — Every layer */}
      <section aria-labelledby="cb-layers" className="section border-t border-line bg-bg">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end">
            <Head n="16" kicker="One project, many disciplines" id="cb-layers" title="One product. Every layer." />
            <Reveal delay={1}>
              <p className="font-mono text-[12px] tracking-[0.24em] uppercase text-ink-2">
                Design <span className="text-brand-ink">×</span> Technology <span className="text-brand-ink">×</span> Growth
              </p>
            </Reveal>
          </div>
          <div className="mt-14 md:mt-20">
            <LayersRail />
          </div>
          <Reveal>
            <p className="mt-14 t-lead text-ink-2 max-w-[60ch]">
              Idea, brand, experience, platform, launch, growth — carried by one studio, so nothing
              was lost between the people who designed it and the people who built it.
            </p>
          </Reveal>
        </div>
      </section>

      {/* 20 — FAQ */}
      <section aria-labelledby="cb-faq" className="section-tight border-t border-line bg-bg">
        <div className="wrap max-w-[900px]">
          <Reveal>
            <p className="eyebrow">Questions</p>
            <h2 id="cb-faq" className="t-h3 mt-4">About this project</h2>
          </Reveal>
          <div className="mt-8 border-t border-line">
            {faqs.map((f) => (
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

      {/* 21 — Closing */}
      <section aria-labelledby="cb-close" className="on-dark relative overflow-hidden bg-bg-ink text-white section-loose">
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(45% 60% at 80% 20%, rgba(237,28,142,.18), transparent 70%), radial-gradient(50% 55% at 10% 90%, rgba(34,224,160,.14), transparent 70%)`,
          }}
        />
        <div className="wrap relative">
          <Reveal>
            <p className="eyebrow">Closing</p>
            <h2 id="cb-close" className="t-display mt-6 max-w-[16ch]">
              Good digital products don’t stop at the interface.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead mt-8 max-w-[56ch] text-white/75">
              CricBook brought brand, product design, technology and growth into one connected
              experience — built by Uniix Studio.
            </p>
          </Reveal>
          <Reveal delay={2}>
            <div className="mt-14 border-t border-line-dark pt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
              <p className="t-h3 text-white">Have a product worth building?</p>
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

      {/* 22 — Project navigation */}
      <NextProjectExhibition nextProject={nextProject} prevProject={prevProject} />
    </>
  );
}
