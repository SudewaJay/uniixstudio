/**
 * Hero backdrop: stepped columns of orange light on either side of a dark
 * centre, brightest at the outer edges and along the bottom horizon.
 *
 * Pure CSS (no images, no JS). Each column is a vertical gradient that warms
 * from transparent at the top to the brand ramp at the bottom; columns step up
 * in strength towards the edge. A slow "breathe" animation runs per column and
 * is switched off under prefers-reduced-motion (see .hero-beam in globals.css).
 */

// Inner → outer. width is % of one side; a is peak opacity.
const COLUMNS = [
  { w: 13, a: 0.16 },
  { w: 15, a: 0.26 },
  { w: 16, a: 0.4 },
  { w: 17, a: 0.58 },
  { w: 18, a: 0.78 },
  { w: 21, a: 1 },
];

function beam(a: number) {
  return [
    // left-edge sheen, so each column reads as a pane of glass
    "linear-gradient(90deg, rgba(255,214,150,0.10) 0, rgba(255,214,150,0) 22%)",
    `linear-gradient(180deg,
      rgba(18,16,14,0) 0%,
      rgba(191,69,8,${(a * 0.28).toFixed(3)}) 38%,
      rgba(232,98,26,${(a * 0.7).toFixed(3)}) 70%,
      rgba(240,123,32,${(a * 0.92).toFixed(3)}) 88%,
      rgba(245,166,35,${a.toFixed(3)}) 100%)`,
  ].join(",");
}

function Side({ flip }: { flip?: boolean }) {
  return (
    <div
      className="absolute inset-y-0 flex w-[34%] md:w-[30%]"
      style={{
        [flip ? "right" : "left"]: 0,
        flexDirection: flip ? "row" : "row-reverse",
        // Columns, their edge lines and sheen all dissolve into the page
        // towards the top instead of ending on a visible edge.
        maskImage: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.6) 45%, #000 70%)",
        WebkitMaskImage: "linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.15) 22%, rgba(0,0,0,0.6) 45%, #000 70%)",
      }}
    >
      {COLUMNS.map((c, i) => (
        <div
          key={i}
          className="hero-beam h-full"
          style={{
            width: `${c.w}%`,
            backgroundImage: beam(c.a),
            transform: flip ? "scaleX(-1)" : undefined,
            animationDelay: `${-i * 1.7}s`,
            ["--beam-dur" as string]: `${5 + ((i * 7) % 5) * 0.8}s`,
            ["--streak-delay" as string]: `${-((i * 1.3 + (flip ? 2.1 : 0)) % 6)}s`,
          }}
        />
      ))}
    </div>
  );
}

export default function HeroBeams() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-bg-ink">
      {/* Soft corner glow behind the columns */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(60% 55% at 0% 100%, rgba(232,98,26,0.35), transparent 70%), radial-gradient(60% 55% at 100% 100%, rgba(232,98,26,0.35), transparent 70%)",
        }}
      />

      <Side />
      <Side flip />

      {/* Dark centre stage: keeps the headline on near-black */}
      <div
        className="absolute inset-y-0 left-1/2 w-[64%] -translate-x-1/2 md:w-[48%]"
        style={{
          background:
            "linear-gradient(90deg, rgba(18,16,14,0) 0%, #12100E 18%, #12100E 82%, rgba(18,16,14,0) 100%)",
          // Thin out near the bottom so the horizon glow runs edge to edge.
          maskImage: "linear-gradient(180deg, #000 0%, #000 62%, rgba(0,0,0,0.35) 100%)",
          WebkitMaskImage: "linear-gradient(180deg, #000 0%, #000 62%, rgba(0,0,0,0.35) 100%)",
        }}
      />

      {/* Horizon: warm light pooling along the bottom edge */}
      <div
        className="hero-horizon absolute inset-x-0 bottom-0 h-[30%]"
        style={{
          background:
            "radial-gradient(60% 100% at 50% 100%, rgba(240,123,32,0.38) 0%, rgba(232,98,26,0.12) 45%, transparent 75%)",
        }}
      />

      {/* Top fade: blends everything into the header area */}
      <div className="absolute inset-x-0 top-0 h-[40%] bg-gradient-to-b from-bg-ink via-bg-ink/70 to-transparent" />

      {/* Fine grain so the gradients don't band */}
      <div className="hero-grain absolute inset-0 opacity-[0.07] mix-blend-overlay" />

    </div>
  );
}
