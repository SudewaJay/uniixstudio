import { site } from "@/lib/content";
import Reveal from "./Reveal";

export default function CTASection() {
  return (
    <section id="cta" className="bg-bg-ink text-white py-24 md:py-32 relative overflow-hidden">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(40% 60% at 80% 30%, rgba(248,200,74,0.20), transparent 70%), radial-gradient(60% 50% at 10% 90%, rgba(232,98,26,0.18), transparent 70%)",
        }}
      />
      <div className="wrap relative">
        <div className="text-center max-w-[880px] mx-auto">
          <Reveal>
            <span className="eyebrow justify-center text-white/70">Let&apos;s build</span>
          </Reveal>
          <Reveal delay={1}>
            <h2
              className="display mt-6"
              style={{ fontSize: "clamp(44px,6.5vw,88px)", color: "#fff" }}
            >
              Got a project in mind?
              <br />
              <span className="italic-display gradient-text">
                Let&apos;s make it real.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={2}>
            <p className="text-lg text-white/75 max-w-[60ch] mx-auto mt-6 mb-10 leading-[1.55]">
              Book a free 30-minute strategy call. We&apos;ll review your goals,
              audit your current presence, and tell you honestly if we&apos;re
              the right fit — no pitch deck, no pressure.
            </p>
          </Reveal>
          <Reveal delay={3}>
            <div className="flex gap-3.5 justify-center flex-wrap">
              <a href={`mailto:${site.email}`} className="btn btn-grad">
                Start a project ↗
              </a>
              <a
                href={site.whatsappLink}
                className="btn btn-ghost text-white border-white/20 hover:bg-white hover:text-ink hover:border-white"
              >
                WhatsApp us
              </a>
            </div>
          </Reveal>
          <Reveal delay={4}>
            <div className="mt-12 flex justify-center gap-12 flex-wrap font-mono text-xs tracking-[0.1em] uppercase text-white/55">
              <div>
                Email
                <strong className="block text-sm tracking-normal normal-case font-sans font-medium text-white mt-1.5">
                  {site.email}
                </strong>
              </div>
              <div>
                Studio
                <strong className="block text-sm tracking-normal normal-case font-sans font-medium text-white mt-1.5">
                  {site.location}
                </strong>
              </div>
              <div>
                Response
                <strong className="block text-sm tracking-normal normal-case font-sans font-medium text-white mt-1.5">
                  Within 24 hours
                </strong>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
