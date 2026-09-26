import clsx from "clsx";
import styles from "./finland.module.css";

/**
 * A browser frame whose contents evolve through five states: old site →
 * structure → designed experience → product → growth. Built from divs and
 * SVG only — no screenshots to download, and every state is a sketch of an
 * idea rather than a picture of a client's site.
 *
 * `active` picks the visible layer. `solo` renders only that layer (used by
 * the mobile timeline, where each stage carries its own small frame).
 */
export default function TransformFrame({ active, solo = false }: { active: number; solo?: boolean }) {
  const layers = [OldSite, Structure, Experience, Product, Growth];

  return (
    <div className="overflow-hidden rounded-lg2 border border-line bg-bg-paper shadow-lift">
      {/* Chrome */}
      <div className="flex items-center gap-2 border-b border-line bg-bg px-4 py-2.5">
        <span className="size-2 rounded-full bg-ink/15" />
        <span className="size-2 rounded-full bg-ink/15" />
        <span className="size-2 rounded-full bg-ink/15" />
        <span className="ml-3 h-5 flex-1 max-w-[260px] rounded-full bg-ink/[0.05] px-3 font-mono text-[9px] leading-5 text-ink-mute">
          yourcompany.fi
        </span>
      </div>

      <div className="relative aspect-[16/11] w-full overflow-hidden">
        {layers.map((Layer, i) =>
          solo && i !== active ? null : (
            <div
              key={i}
              aria-hidden="true"
              className={clsx(styles.tfLayer, (solo || i === active) && styles.tfOn)}
            >
              <Layer />
            </div>
          ),
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- 01 Old */
function OldSite() {
  return (
    <div className="absolute inset-0 bg-[#E9E6DF] p-[4%] font-serif text-[#5b5b5b]">
      <div className="flex h-[14%] items-center justify-between bg-[#71808F] px-[3%] text-[clamp(7px,1vw,11px)] font-bold uppercase tracking-wide text-white/90">
        <span>Welcome to our website!</span>
        <span className="opacity-70">Home | About | Services | News | Contact</span>
      </div>
      <div className="mt-[3%] grid h-[70%] grid-cols-[1fr_30%] gap-[3%]">
        <div className="flex flex-col gap-[5%]">
          <div className="h-[40%] border-2 border-dashed border-[#a9a39a] bg-[#d8d3ca]" />
          <div className="space-y-[3%]">
            {[92, 80, 88, 64].map((w) => (
              <div key={w} className="h-[6px] bg-[#c9c3b9]" style={{ width: `${w}%` }} />
            ))}
          </div>
          <div className="w-fit rotate-[-1.5deg] bg-[#F4D03F] px-2 py-1 text-[clamp(7px,1vw,11px)] font-bold text-[#8a2b2b]">
            NEW!! Click here
          </div>
        </div>
        <div className="flex flex-col gap-[6%]">
          <div className="h-[45%] bg-[#cfc9bf]" />
          <div className="h-[20%] border border-[#b7b0a5] bg-white/40" />
          <div className="h-[18%] bg-[#bdb6aa]" />
        </div>
      </div>
      <div className="mt-[3%] h-[5%] bg-[#71808F]/60" />
    </div>
  );
}

/* --------------------------------------------------------- 02 Structure */
function Structure() {
  const box = "rounded-[6px] border border-dashed border-ink/30 bg-white/50 flex items-start p-[2%] font-mono text-[clamp(6px,0.8vw,9px)] uppercase tracking-[0.14em] text-ink-mute";
  return (
    <div className="absolute inset-0 bg-bg p-[5%]">
      {/* 12-column grid overlay */}
      <div aria-hidden className="absolute inset-y-0 left-[5%] right-[5%] grid grid-cols-12 gap-[1.5%]">
        {Array.from({ length: 12 }).map((_, i) => (
          <span key={i} className="bg-[#36546E]/[0.06]" />
        ))}
      </div>
      <div className="relative grid h-full grid-rows-[8%_38%_1fr_12%] gap-[4%]">
        <div className={box}>Nav</div>
        <div className="grid grid-cols-[1.4fr_1fr] gap-[3%]">
          <div className={box}>Hero · value proposition</div>
          <div className={box}>Proof</div>
        </div>
        <div className="grid grid-cols-3 gap-[3%]">
          <div className={box}>Service</div>
          <div className={box}>Service</div>
          <div className={box}>Service</div>
        </div>
        <div className={clsx(box, "border-brand-ink/50 text-brand-ink")}>Primary action</div>
      </div>
    </div>
  );
}

/* -------------------------------------------------------- 03 Experience */
function Experience() {
  return (
    <div className="absolute inset-0 bg-bg">
      <div className="relative h-[58%] overflow-hidden bg-bg-ink p-[5%]">
        <div aria-hidden className="absolute -right-[10%] -top-[30%] size-[70%] rounded-full bg-brand-grad opacity-60 blur-2xl" />
        <div className="relative flex h-full flex-col justify-end">
          <div className="h-[9%] w-[62%] rounded-full bg-white/90" />
          <div className="mt-[3%] h-[9%] w-[44%] rounded-full bg-brand-2" />
          <div className="mt-[5%] h-[4%] w-[38%] rounded-full bg-white/40" />
          <div className="mt-[6%] flex gap-[3%]">
            <span className="h-[clamp(10px,2.4vw,22px)] w-[18%] rounded-full bg-white" />
            <span className="h-[clamp(10px,2.4vw,22px)] w-[14%] rounded-full border border-white/40" />
          </div>
        </div>
      </div>
      <div className="grid h-[42%] grid-cols-3 gap-[3%] p-[5%]">
        {[0, 1, 2].map((i) => (
          <div key={i} className="flex flex-col gap-[10%] rounded-[8px] border border-line bg-bg-paper p-[8%]">
            <span className={clsx("h-[22%] w-[30%] rounded-full", i === 1 ? "bg-brand-ink" : "bg-ink/80")} />
            <span className="h-[10%] w-[80%] rounded-full bg-ink/15" />
            <span className="h-[10%] w-[60%] rounded-full bg-ink/10" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* ----------------------------------------------------------- 04 Product */
function Product() {
  return (
    <div className="absolute inset-0 grid grid-cols-[20%_1fr] bg-bg">
      <div className="flex flex-col gap-[6%] bg-bg-ink p-[12%]">
        <span className="h-[5%] w-[60%] rounded-full bg-brand-2" />
        {[70, 55, 62, 48].map((w, i) => (
          <span key={i} className={clsx("h-[3%] rounded-full", i === 0 ? "bg-white/80" : "bg-white/25")} style={{ width: `${w}%` }} />
        ))}
      </div>
      <div className="flex flex-col gap-[4%] p-[5%]">
        <div className="grid h-[26%] grid-cols-3 gap-[3%]">
          {[0.62, 0.4, 0.78].map((v, i) => (
            <div key={i} className="flex flex-col justify-between rounded-[8px] border border-line bg-bg-paper p-[7%]">
              <span className="h-[14%] w-[50%] rounded-full bg-ink/15" />
              <span className="h-[26%] rounded-full bg-ink/85" style={{ width: `${v * 100}%` }} />
            </div>
          ))}
        </div>
        <div className="relative flex-1 rounded-[8px] border border-line bg-bg-paper p-[4%]">
          <div className="flex h-full items-end gap-[3%]">
            {[40, 58, 46, 70, 62, 84, 76, 92].map((h, i) => (
              <span
                key={i}
                className={clsx("flex-1 rounded-t-[3px]", i === 7 ? "bg-brand-ink" : "bg-[#36546E]/25")}
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
        <div className="flex flex-wrap gap-[2%]">
          {["API", "CMS", "Auth", "Cloud"].map((t) => (
            <span key={t} className="rounded-full border border-line bg-bg-paper px-[3%] py-[1%] font-mono text-[clamp(6px,0.8vw,9px)] uppercase tracking-[0.12em] text-ink-2">
              {t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------ 05 Growth */
function Growth() {
  return (
    <div className="absolute inset-0 bg-bg">
      <div className="absolute inset-0 opacity-35">
        <Experience />
      </div>
      <div className="absolute inset-[8%] flex flex-col rounded-[10px] border border-line bg-bg-paper/95 p-[5%] shadow-soft">
        <div className="flex items-center justify-between">
          <span className="font-mono text-[clamp(6px,0.8vw,9px)] uppercase tracking-[0.14em] text-ink-mute">
            Visibility · Conversion
          </span>
          <span className="rounded-full bg-emerald-600/10 px-2 py-0.5 font-mono text-[clamp(6px,0.8vw,9px)] text-emerald-700">
            ↑ trending
          </span>
        </div>
        <svg viewBox="0 0 200 80" className="mt-[4%] w-full flex-1" preserveAspectRatio="none" fill="none">
          <path d="M0 60H200M0 40H200M0 20H200" stroke="rgba(18,16,14,.08)" />
          <path
            d="M0 72 C30 70 46 64 70 60 S110 46 130 38 S170 16 200 8"
            stroke="#BF4508"
            strokeWidth="2"
            vectorEffect="non-scaling-stroke"
            pathLength={1}
            className={styles.tfDraw}
          />
          <path d="M0 72 C30 70 46 64 70 60 S110 46 130 38 S170 16 200 8 V80 H0Z" fill="rgba(191,69,8,.08)" />
        </svg>
        <div className="mt-[4%] grid grid-cols-3 gap-[3%]">
          {["Search", "Leads", "Speed"].map((t) => (
            <div key={t} className="rounded-[6px] border border-line p-[6%]">
              <span className="block font-mono text-[clamp(6px,0.7vw,8px)] uppercase tracking-[0.12em] text-ink-mute">{t}</span>
              <span className="mt-[8%] block h-[6px] w-[70%] rounded-full bg-ink/80" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
