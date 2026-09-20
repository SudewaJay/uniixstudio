"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/content";

export default function CaseStudyCTA({
  currentProjectTitle,
}: {
  currentProjectTitle?: string;
}) {
  return (
    <section
      id="case-study-cta"
      className="on-dark relative overflow-hidden bg-bg-ink text-white section-loose"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(45% 60% at 75% 25%, rgba(248,200,74,0.18), transparent 70%), radial-gradient(55% 55% at 15% 85%, rgba(232,98,26,0.18), transparent 70%)",
        }}
      />

      <div className="wrap relative">
        <div className="mx-auto max-w-[920px] text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-white/60 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-2" />
              <span>Studio Partnership</span>
            </div>
            <h2 className="t-display">
              Ready for your brand&apos;s
              <br />
              <span className="t-italic accent-grad-text">
                defining digital chapter?
              </span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p className="t-lead mt-8 mx-auto max-w-[54ch] text-white/75">
              {currentProjectTitle
                ? `Like ${currentProjectTitle}, every engagement begins with an honest 30-minute strategic consultation. No pitch deck, no pressure.`
                : "Tell us about what you're building. We'll tell you how we'd approach it — architecture, design, and growth systems."}
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-11 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-light group">
                Start a project <span className="cta-arrow">↗</span>
              </Link>
              <Link href="/portfolio" className="btn btn-outline-light">
                Explore all projects
              </Link>
            </div>
          </Reveal>

          <Reveal delay={3}>
            <dl className="mt-16 grid gap-8 sm:grid-cols-3 border-t border-line-dark pt-10 text-left sm:text-center">
              <div>
                <dt className="t-meta text-white/45 text-[10px]">Email Direct</dt>
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
                <dt className="t-meta text-white/45 text-[10px]">Direct Message</dt>
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
                <dt className="t-meta text-white/45 text-[10px]">Availability</dt>
                <dd className="mt-2 text-[15px] font-medium text-white">
                  Accepting Q3 / Q4 Commissions
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
