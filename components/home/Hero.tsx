import Link from "next/link";
import type { ReelFilm } from "./HeroShowreel";

interface HeroProps {
  films?: ReelFilm[];
}

/**
 * Cinematic Hero Section.
 *
 * Full-bleed, full-height HTML5 video hero with layered dark cinematic overlays,
 * minimal centered typography, dual action CTAs, and a subtle scroll indicator.
 * Seamlessly integrates under the inverted header via `data-nav-invert`.
 */
export default function Hero({}: HeroProps = {}) {
  return (
    <section
      data-nav-invert
      aria-label="Introduction"
      className="on-dark relative isolate flex min-h-[720px] h-[100svh] w-full flex-col justify-between overflow-hidden bg-bg-ink text-white"
    >
      {/* Background HTML5 Video Layer with Fallback Poster */}
      <div
        className="absolute inset-0 pointer-events-none overflow-hidden z-0 bg-bg-ink"
        aria-hidden="true"
        style={{
          backgroundImage: "url('/images/hero-poster.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <video
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          poster="/images/hero-poster.jpg"
          className="hero-video absolute inset-0 h-full w-full object-cover object-center filter brightness-[0.88] contrast-[1.04]"
        >
          <source media="(max-width: 768px)" src="/videos/hero-mobile.mp4" type="video/mp4" />
          <source src="/videos/hero.mp4" type="video/mp4" />
          <source src="/videos/hero.webm" type="video/webm" />
        </video>

        {/* Layer 1: Dark Directional Gradient Overlay for Navigation & Bottom Contrast */}
        <div
          className="hero-overlay absolute inset-0 z-[1] pointer-events-none"
          style={{
            background:
              "linear-gradient(180deg, rgba(14,11,8,0.75) 0%, rgba(14,11,8,0.26) 30%, rgba(14,11,8,0.36) 65%, rgba(14,11,8,0.92) 100%)",
          }}
        />

        {/* Layer 2: Editorial Center Vignette for Flawless Typographic Contrast */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none"
          style={{
            background:
              "radial-gradient(ellipse 75% 65% at 50% 50%, rgba(14,11,8,0.22) 0%, rgba(14,11,8,0.70) 100%)",
          }}
        />

        {/* Layer 3: Warm Amber Atmospheric Light in Peripheral Deep Shadows */}
        <div
          className="absolute inset-0 z-[2] pointer-events-none opacity-30 mix-blend-screen"
          style={{
            background:
              "radial-gradient(50% 50% at 85% 85%, rgba(217,84,11,0.25) 0%, transparent 70%)",
          }}
        />

        {/* Layer 4: Soft Edge Fade Seamlessly Connecting into BrandStatement */}
        <div className="absolute inset-x-0 bottom-0 h-32 z-[3] pointer-events-none bg-gradient-to-b from-transparent to-bg-ink" />
      </div>

      {/* Optical Header Clearance Spacer:
          Balances the fixed top announcement bar (36px) + header (~68px) = ~104px */}
      <div className="h-[96px] sm:h-[104px] w-full shrink-0 pointer-events-none" aria-hidden="true" />

      {/* Main Centered Hero Content */}
      <div className="wrap relative z-10 flex flex-1 flex-col items-center justify-center text-center px-4 sm:px-6">
        {/* Main Headline */}
        <h1 className="t-display text-white max-w-[1180px] font-medium leading-[0.92] sm:leading-[0.90] tracking-[-0.058em] text-[clamp(44px,7.2vw,104px)]">
          <span className="mask-line">
            <span style={{ animationDelay: "100ms" }} className="block">
              We build brands
            </span>
          </span>
          <span className="mask-line mt-1 sm:mt-2">
            <span
              style={{ animationDelay: "220ms" }}
              className="t-italic accent-grad-text block"
            >
              people remember.
            </span>
          </span>
        </h1>

        {/* Minimal Supporting Text */}
        <p
          className="rise-in mt-6 sm:mt-7 max-w-[640px] text-white/80 font-normal leading-[1.55] sm:leading-[1.6] text-[clamp(15px,1.2vw,17.5px)] tracking-[-0.01em]"
          style={{ animationDelay: "380ms" }}
        >
          Brand identities, digital experiences, and growth systems for ambitious companies.
        </p>

        {/* Dual CTA Buttons */}
        <div
          className="rise-in mt-8 sm:mt-9 flex flex-col sm:flex-row items-center justify-center gap-3.5 sm:gap-4 w-full sm:w-auto"
          style={{ animationDelay: "500ms" }}
        >
          <Link
            href="/contact/"
            className="btn btn-light group w-full sm:w-auto min-h-[54px] min-w-[188px] px-8 text-[15px] font-medium tracking-[-0.01em] shadow-[0_12px_32px_rgba(0,0,0,0.35)] hover:shadow-[0_18px_40px_rgba(0,0,0,0.5)] transition-all duration-std ease-uniix"
          >
            Start a project <span className="cta-arrow ml-1">↗</span>
          </Link>
          <Link
            href="/portfolio/"
            className="btn btn-outline-light w-full sm:w-auto min-h-[54px] min-w-[172px] px-8 text-[15px] font-medium tracking-[-0.01em] border-white/30 hover:border-white hover:bg-white/10 transition-all duration-std ease-uniix"
          >
            View our work
          </Link>
        </div>
      </div>

      {/* Subtle Scroll Indicator */}
      <div
        className="rise-in relative z-10 shrink-0 pb-6 sm:pb-8 flex flex-col items-center justify-center pointer-events-auto"
        style={{ animationDelay: "620ms" }}
      >
        <a
          href="#brand-statement"
          aria-label="Scroll to explore"
          className="group flex flex-col items-center gap-2 text-white/45 hover:text-white transition-colors duration-std ease-uniix"
        >
          <span className="w-[20px] h-[32px] rounded-full border border-white/35 group-hover:border-white/70 flex items-start justify-center p-[4px] transition-colors duration-std ease-uniix">
            <span className="w-1 h-2 rounded-full bg-white/75 group-hover:bg-white animate-[bounce_2s_infinite]" />
          </span>
          <span className="text-[10px] tracking-[0.18em] uppercase font-mono text-white/40 group-hover:text-white/80 transition-colors duration-std ease-uniix">
            Scroll
          </span>
        </a>
      </div>
    </section>
  );
}
