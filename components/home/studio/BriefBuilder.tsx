"use client";

import { useLayoutEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Magnetic } from "./motion";

/**
 * Start a project — the brief writes itself.
 *
 * Instead of a "contact us" banner, the visitor composes the first line of
 * their brief by choosing from three slots. The sentence then carries into
 * the contact form (service + timeline preselected, the sentence as the
 * message), or straight into WhatsApp. No personal data leaves this section;
 * the query string only carries the three picked options.
 *
 * The slots are native <select>s set at display size: accessible, keyboard
 * and screen-reader friendly, and they open the OS picker on phones.
 * Options for `need` and `when` match ContactForm's own lists exactly.
 */
const NEED = [
  ["Brand identity", "a brand identity"],
  ["Website design & development", "a new website"],
  ["UI/UX design", "a product or app designed"],
  ["Performance marketing", "more customers from ads"],
  ["SEO", "to be found on Google"],
  ["Something else", "something else"],
] as const;

const WHO = ["a new business", "a growing company", "an established brand", "a non-profit"] as const;

const WHEN = [
  ["As soon as possible", "as soon as possible"],
  ["Within 1–3 months", "within the next few months"],
  ["3+ months", "later this year"],
  ["Flexible", "whenever it's right"],
] as const;

function Slot({
  id,
  label,
  value,
  onChange,
  options,
}: {
  id: string;
  label: string;
  value: number;
  onChange: (i: number) => void;
  options: readonly string[];
}) {
  const sizer = useRef<HTMLSpanElement>(null);
  const [w, setW] = useState<number | undefined>(undefined);
  useLayoutEffect(() => {
    if (sizer.current) setW(sizer.current.offsetWidth + 6);
  }, [value]);

  return (
    <span className="brief-slot relative inline-block max-w-full whitespace-nowrap align-baseline">
      <span ref={sizer} aria-hidden="true" className="invisible absolute left-0 top-0 whitespace-nowrap pr-[0.55em]">
        {options[value]}
      </span>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        style={{ width: w, maxWidth: "100%" }}
        className="brief-select cursor-pointer appearance-none truncate border-b-[0.06em] border-ink bg-transparent pr-[0.55em] text-ink outline-none"
      >
        {options.map((o, i) => (
          <option key={o} value={i}>
            {o}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 12 8"
        className="pointer-events-none absolute right-[0.08em] top-1/2 h-[0.2em] w-[0.3em] -translate-y-1/2"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
      >
        <path d="M1 1.5l5 5 5-5" />
      </svg>
    </span>
  );
}

export default function BriefBuilder({ email, whatsapp }: { email: string; whatsapp?: string }) {
  const [need, setNeed] = useState(1);
  const [who, setWho] = useState(0);
  const [when, setWhen] = useState(1);

  const sentence = `Hi Uniix, we need ${NEED[need][1]} for ${WHO[who]}, ideally ${WHEN[when][1]}.`;

  const contactHref = useMemo(() => {
    const q = new URLSearchParams({ service: NEED[need][0], timeline: WHEN[when][0], message: sentence });
    return `/contact/?${q.toString()}`;
  }, [need, when, sentence]);

  const waHref = whatsapp
    ? `${whatsapp}${whatsapp.includes("?") ? "&" : "?"}text=${encodeURIComponent(sentence)}`
    : undefined;

  const [copied, setCopied] = useState(false);

  return (
    <section id="start" aria-labelledby="start-title" className="relative overflow-hidden bg-brand-3 py-24 text-ink md:py-32">
      <div className="wrap-wide">
        <h2 id="start-title" className="sr-only">
          Start a project with Uniix Studio
        </h2>

        <p className="brief-line max-w-[22ch] font-display font-medium leading-[1.08] tracking-[-0.045em] text-[clamp(30px,6.4vw,104px)] md:mt-14">
          <span className="text-ink/55">Hi Uniix, we need </span>
          <Slot id="brief-need" label="What do you need?" value={need} onChange={setNeed} options={NEED.map((n) => n[1])} />
          <span className="text-ink/55"> for </span>
          <Slot id="brief-who" label="Who is it for?" value={who} onChange={setWho} options={WHO} />
          <span className="text-ink/55">, ideally </span>
          <span className="sm:whitespace-nowrap">
            <Slot id="brief-when" label="When do you need it?" value={when} onChange={setWhen} options={WHEN.map((n) => n[1])} />
            <span className="text-ink/55">.</span>
          </span>
        </p>

        <div className="mt-14 flex flex-col gap-10 border-t border-ink/25 pt-10 md:mt-20 md:flex-row md:items-end md:justify-between">
          <div className="flex flex-wrap items-center gap-3">
            <Magnetic>
              <Link href={contactHref} className="btn group bg-ink text-white hover:bg-bg-ink-2">
                Send this brief <span className="cta-arrow">↗</span>
              </Link>
            </Magnetic>
            {waHref && (
              <a
                href={waHref}
                target="_blank"
                rel="noopener noreferrer"
                className="btn border border-ink/40 text-ink hover:border-ink hover:bg-ink/5"
              >
                WhatsApp
              </a>
            )}
          </div>

          <dl className="grid gap-x-10 gap-y-4 text-[14px] md:text-right">
            <div>
              <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink/60">Email</dt>
              <dd className="mt-1">
                <button
                  type="button"
                  onClick={async () => {
                    try {
                      await navigator.clipboard.writeText(email);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 1800);
                    } catch {
                      window.location.href = `mailto:${email}`;
                    }
                  }}
                  className="font-medium underline decoration-ink/30 underline-offset-4 hover:decoration-ink"
                  aria-label={`Copy email address ${email}`}
                >
                  {copied ? "Copied ✓" : email}
                </button>
              </dd>
            </div>
          </dl>
        </div>
        <p role="status" className="sr-only">
          {copied ? "Email address copied" : ""}
        </p>
      </div>
    </section>
  );
}
