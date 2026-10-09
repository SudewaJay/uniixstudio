import { Barlow_Condensed, Inter } from "next/font/google";
import clsx from "clsx";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import { PhoneFrame } from "./Frames";
import { CB, img, palette, slotStates } from "./data";

/**
 * CricBook's own display face, used only for the specimens in this section —
 * scoped here so no other Uniix page downloads it.
 */
const barlow = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "800"],
  display: "swap",
  preload: false,
});
const inter = Inter({ subsets: ["latin"], weight: ["400", "600"], display: "swap", preload: false });

export default function BrandSection() {
  return (
    <section
      aria-labelledby="cb-brand"
      className="on-dark relative overflow-hidden section text-white"
      style={{ background: CB.indigo }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={img.brand.spark}
        alt=""
        aria-hidden="true"
        loading="lazy"
        className="pointer-events-none absolute -left-[10%] bottom-[-12%] w-[46%] max-w-[560px] opacity-[.08]"
      />
      <div className="wrap relative">
        <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)] lg:items-end">
          <Reveal>
            <p className="eyebrow"><span className="text-[#22E0A0]">04</span> Brand identity</p>
            <h2 id="cb-brand" className="t-h2 mt-5 max-w-[16ch]">
              Built to feel as energetic as the game.
            </h2>
          </Reveal>
          <Reveal delay={1}>
            <p className="t-lead text-white/75 max-w-[44ch]">
              Two strokes of lightning, magenta over mint, and a ball in flight. The spark
              mark carries the speed of the sport; the condensed wordmark carries its noise.
              Then we made the whole system work inside a booking interface.
            </p>
          </Reveal>
        </div>

        {/* Logo presentation */}
        <div className="mt-14 md:mt-20 grid gap-4 md:gap-5 md:grid-cols-6">
          <Reveal className="md:col-span-4">
            <div className="relative aspect-[16/9] overflow-hidden rounded-[20px] bg-white">
              <SmartImage src={img.brand.lockupLight} alt="CricBook logo lockup on white — spark mark with Cric in navy and Book in magenta" sizes="(min-width:768px) 60vw, 92vw" position="center" />
            </div>
          </Reveal>
          <Reveal delay={1} className="md:col-span-2 grid grid-cols-2 md:grid-cols-1 gap-4 md:gap-5">
            <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden rounded-[20px] ring-1 ring-white/10" style={{ background: CB.navy }}>
              <SmartImage src={img.brand.markDark} alt="CricBook spark mark on navy" sizes="(min-width:768px) 30vw, 45vw" />
            </div>
            <div className="relative aspect-square md:aspect-auto md:h-full overflow-hidden rounded-[20px] ring-1 ring-white/10">
              <SmartImage src={img.brand.monogramDark} alt="CricBook CB monogram on navy with lightning accents" sizes="(min-width:768px) 30vw, 45vw" />
            </div>
          </Reveal>
        </div>

        {/* Palette — proportional to how much each colour is used */}
        <Reveal className="mt-16 md:mt-24">
          <div className="flex items-baseline justify-between gap-6">
            <h3 className="t-meta text-white/60">Colour — weighted by use</h3>
          </div>
          <ul className="mt-6 flex flex-col md:flex-row gap-2 md:h-[300px]">
            {palette.map((c) => (
              <li
                key={c.hex}
                className="group relative flex min-h-[88px] flex-col justify-between rounded-[16px] p-5 ring-1 ring-white/10"
                style={{ background: c.hex, color: c.fg, flexGrow: c.flex, flexBasis: 0 }}
              >
                <span className="font-mono text-[11px] tracking-[0.12em] uppercase">{c.hex}</span>
                <span>
                  <span className={clsx(barlow.className, "block text-[24px] md:text-[28px] font-semibold uppercase leading-none")}>
                    {c.name}
                  </span>
                  <span className={clsx("mt-2 block text-[13px] leading-[1.4] md:max-w-[22ch]", c.shade ? "-mx-1.5 w-fit rounded-md bg-black/25 px-1.5 py-0.5" : "opacity-80")}>{c.role}</span>
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Typography */}
        <div className="mt-16 md:mt-24 grid gap-4 md:gap-5 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <Reveal>
            <div className="h-full rounded-[20px] bg-white/[.04] p-6 md:p-10 ring-1 ring-white/10">
              <p className="t-meta text-white/55">Display — Barlow Condensed 800</p>
              <p className={clsx(barlow.className, "mt-6 font-extrabold uppercase leading-[0.88] text-[clamp(52px,8vw,120px)] tracking-[-0.01em]")}>
                Book the court.
                <br />
                <span style={{ color: CB.mint }}>Not the phone call.</span>
              </p>
              <p className="mt-8 font-mono text-[11px] tracking-[0.3em] text-white/50">BOOK · PLAY · COMPETE</p>
            </div>
          </Reveal>
          <Reveal delay={1}>
            <div className="h-full rounded-[20px] bg-white/[.04] p-6 md:p-10 ring-1 ring-white/10">
              <p className="t-meta text-white/55">Text — Inter 400 / 500 / 600</p>
              <p className={clsx(inter.className, "mt-6 text-[28px] md:text-[34px] font-semibold leading-[1.15] tracking-[-0.02em]")}>
                Live availability across indoor cricket and futsal courts.
              </p>
              <p className={clsx(inter.className, "mt-4 text-[15px] leading-[1.6] text-white/70")}>
                Condensed for the headline noise. A neutral grotesque for prices, times and
                court numbers — the parts players read under floodlights on a phone.
              </p>
              <div className={clsx(barlow.className, "mt-8 grid grid-cols-3 gap-3 text-center")}>
                {["60s", "24/7", "24h"].map((n, i) => (
                  <div key={n} className="rounded-xl bg-white/[.06] py-4">
                    <span className="block text-[34px] font-extrabold leading-none">{n}</span>
                    <span className="mt-1 block font-mono text-[9px] tracking-[0.12em] uppercase text-white/60">
                      {["To book", "Online", "Free cancel"][i]}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Identity → interface */}
        <Reveal className="mt-16 md:mt-24">
          <h3 className="t-meta text-white/60">From identity to interface</h3>
        </Reveal>
        <div className="mt-6 grid gap-4 md:gap-5 lg:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)]">
          <Reveal>
            <div className="h-full rounded-[20px] bg-[#F4F3F8] p-6 md:p-10 text-ink">
              <p className="t-meta text-ink-mute">UI kit — components</p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-[15px] font-semibold text-white" style={{ background: CB.magenta }}>
                  Find a court <span aria-hidden="true">→</span>
                </span>
                <span className="inline-flex items-center rounded-full px-6 py-3 text-[15px] font-semibold text-white" style={{ background: CB.electric }}>
                  List your court free
                </span>
                <span className="inline-flex items-center rounded-full border px-6 py-3 text-[15px] font-semibold" style={{ borderColor: "#E6E3F2", color: CB.indigo }}>
                  Get directions
                </span>
              </div>

              <p className="mt-8 t-meta text-ink-mute">Slot states — labelled, not only coloured</p>
              <ul className="mt-4 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {slotStates.map((s, i) => (
                  <li
                    key={s.label}
                    className="rounded-xl border-2 px-3 py-3"
                    style={{ background: s.bg, borderColor: s.border, color: s.fg }}
                  >
                    <span className="block font-mono text-[12px] font-semibold">{`${7 + i}:00 PM`}</span>
                    <span className="block text-[12px] font-semibold uppercase tracking-[0.06em]">{s.label}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 t-meta text-ink-mute">Venue card</p>
              <div className="mt-4 flex max-w-[420px] overflow-hidden rounded-2xl bg-white shadow-sm2 ring-1 ring-black/5">
                <div className="relative w-[38%] flex-none">
                  <SmartImage src={img.photo.court1} alt="" sizes="160px" />
                </div>
                <div className="p-4">
                  <span className="inline-block rounded-md px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em]" style={{ background: "#E6FBF3", color: "#067A52" }}>
                    Cricket · Futsal
                  </span>
                  <p className={clsx(barlow.className, "mt-2 text-[22px] font-extrabold uppercase leading-none")} style={{ color: CB.indigo }}>
                    Indoor arena
                  </p>
                  <p className="mt-2 text-[13px] text-ink-mute">Colombo · 2.4 km</p>
                  <p className="mt-1 text-[14px] font-semibold" style={{ color: "#A30F5F" }}>
                    Price on the card, per hour
                  </p>
                </div>
              </div>
            </div>
          </Reveal>

          <Reveal delay={1}>
            <div className="flex h-full items-center justify-center gap-4 rounded-[20px] bg-white/[.04] p-6 md:p-10 ring-1 ring-white/10">
              <div className="w-1/2 max-w-[210px]">
                <PhoneFrame src={img.app.splash} alt="CricBook app splash screen with the spark mark" sizes="(min-width:1024px) 210px, 42vw" />
              </div>
              <div className="w-1/2 max-w-[210px] translate-y-8">
                <PhoneFrame src={img.app.onboarding} alt="CricBook onboarding: Every court in Sri Lanka, one tap away." sizes="(min-width:1024px) 210px, 42vw" />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
