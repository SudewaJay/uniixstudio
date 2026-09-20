"use client";

import Link from "next/link";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/content";

export default function PortfolioCTA() {
  return (
    <section
      id="portfolio-cta"
      className="on-dark relative overflow-hidden bg-bg-ink text-white section-loose"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(48% 60% at 75% 20%, rgba(248,200,74,0.18), transparent 70%), radial-gradient(55% 55% at 15% 85%, rgba(232,98,26,0.18), transparent 70%)",
        }}
      />

      <div className="wrap relative">
        <div className="mx-auto max-w-[920px] text-center">
          <Reveal>
            <div className="inline-flex items-center gap-3 font-mono text-[11px] tracking-[0.22em] uppercase text-white/60 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-2" />
              <span>Studio Commission</span>
            </div>
            <h2 className="t-display">
              Your next project
              <br />
              <span className="t-italic accent-grad-text">
                could be here.
              </span>
            </h2>
          </Reveal>

          <Reveal delay={1}>
            <p className="t-lead mt-8 mx-auto max-w-[54ch] text-white/75">
              Let&apos;s build something worth remembering. Tell us about your challenge
              and we&apos;ll schedule an exploratory strategy call to map your digital trajectory.
            </p>
          </Reveal>

          <Reveal delay={2}>
            <div className="mt-11 flex flex-wrap justify-center gap-4">
              <Link href="/contact" className="btn btn-light group">
                Start a project <span className="cta-arrow">↗</span>
              </Link>
              <Link href="/services" className="btn btn-outline-light">
                Explore capabilities
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
                <dt className="t-meta text-white/45 text-[10px]">Studio Line</dt>
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
                <dt className="t-meta text-white/45 text-[10px]">Turnaround</dt>
                <dd className="mt-2 text-[15px] font-medium text-white">
                  Response within 24 hours
                </dd>
              </div>
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
