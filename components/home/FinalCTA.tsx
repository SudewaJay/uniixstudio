import Link from "next/link";
import { site } from "@/lib/content";
import Reveal from "../Reveal";

/**
 * Section 11 — the one closing CTA.
 *
 * The page previously ended with a stats bar, a blog section and a CTA that
 * repeated "Let's make it real" alongside the hero's own CTA and the promo
 * bar's. This is now the single conversion moment on the page, and its primary
 * action points at /contact — the same destination as the header and hero, not
 * a mailto: that dead-ends on machines with no mail client.
 */
export default function FinalCTA() {
  return (
    <section
      id="cta"
      className="on-dark relative overflow-hidden bg-bg-ink text-white section-loose"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(44% 60% at 78% 22%, rgba(248,200,74,0.20), transparent 70%), radial-gradient(56% 54% at 12% 92%, rgba(232,98,26,0.20), transparent 70%)",
        }}
      />

      <div className="wrap relative">
        <div className="mx-auto max-w-[900px] text-center">
          <Reveal>
            <h2 className="t-display">
              Have a project
              <br />
              <span className="t-italic accent-grad-text">worth building?</span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p className="t-lead mt-8 mx-auto max-w-[52ch] text-white/70">
              Tell us what you&apos;re working on. We&apos;ll tell you how we&apos;d
              approach it — a free 30-minute call, an honest read on fit, no pitch deck.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-11 flex flex-wrap justify-center gap-3">
              <Link href="/contact" className="btn btn-light group">
                Start a project <span className="cta-arrow">↗</span>
              </Link>
              <Link href="/portfolio" className="btn btn-outline-light">
                View our work
              </Link>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <dl className="mt-16 grid gap-8 sm:grid-cols-3 border-t border-line-dark pt-10 text-left sm:text-center">
              <div>
                <dt className="t-meta text-white/45 text-[10px]">Email</dt>
                <dd className="mt-2">
                  <a
                    href={`mailto:${site.email}`}
                    className="text-[15px] font-medium text-white hover:text-brand-2 transition-colors duration-micro"
                  >
                    {site.email}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-meta text-white/45 text-[10px]">WhatsApp</dt>
                <dd className="mt-2">
                  <a
                    href={site.whatsappLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[15px] font-medium text-white hover:text-brand-2 transition-colors duration-micro"
                  >
                    {site.phone}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="t-meta text-white/45 text-[10px]">Response</dt>
                <dd className="mt-2 text-[15px] font-medium text-white">
                  Within 24 hours
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
