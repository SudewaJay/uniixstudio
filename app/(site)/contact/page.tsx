import type { Metadata } from "next";
import { pageMeta } from "@/lib/seo-metadata";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { getSiteSettings } from "@/lib/cms/site";
import Link from "next/link";
import { getLocations } from "@/lib/cms/locations";
import { breadcrumbSchema, faqPageSchema, schemaGraph } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = pageMeta("/contact/");

const NEXT_STEPS = [
  {
    title: "Tell us about the project",
    body: "Send the form or a WhatsApp message: what you need, rough timing and any links you already have.",
  },
  {
    title: "We reply within 24 hours",
    body: "A real person on the team comes back with questions and honest thoughts on whether we're the right fit.",
  },
  {
    title: "You get a clear plan and quote",
    body: "If it's a fit, we send the scope, timeline and a fixed quote before any work starts.",
  },
];

/** Shown on the page and fed to FAQPage schema, so the two always match. */
const FAQS = [
  {
    question: "How quickly will you reply?",
    answer:
      "Within 24 hours. Every enquiry gets a real response from a person on the Uniix Studio team, not an auto-reply.",
  },
  {
    question: "How much does a project cost?",
    answer:
      "It depends on scope. Our service pages list package starting prices for logo design, brand identity, web design and more, and you'll get a fixed quote before any work starts.",
  },
  {
    question: "Do you only work with businesses in Sri Lanka?",
    answer:
      "No. We're based in Sri Lanka and work with brands across Sri Lanka, Australia and the UK.",
  },
  {
    question: "What should I include in my first message?",
    answer:
      "What you want to build, your rough timeline and budget, and links to your current website or social pages if you have them. A short message is fine; we'll ask follow-up questions.",
  },
];

export default async function ContactPage() {
  const [site, locations] = await Promise.all([getSiteSettings(), getLocations()]);
  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact/" },
  ]);

  return (
    <>
      <JsonLd data={schemaGraph(crumbs, faqPageSchema(FAQS))} />
      <PageHeader
        eyebrow="Get in touch"
        title={
          <>
            Let&apos;s build{" "}
            <span className="italic-display gradient-text">something good.</span>
          </>
        }
        lede="Tell us a little about your project. We'll come back within 24 hours with honest thoughts on whether we're the right fit — and what the next step looks like."
      />

      <section className="pb-24 md:pb-32">
        <div className="wrap">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-10 lg:gap-16 items-start">
            <Reveal>
              <ContactForm whatsapp={site.whatsapp} whatsappLink={site.whatsappLink} source="contact-page" />
            </Reveal>

            <Reveal delay={1}>
              <aside className="flex flex-col gap-5">
                <ContactCard
                  label="Email us"
                  value={site.email}
                  href={`mailto:${site.email}`}
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <rect x="3" y="5" width="18" height="14" rx="2" />
                      <path d="m3 7 9 6 9-6" />
                    </svg>
                  }
                />
                <ContactCard
                  label="WhatsApp"
                  value={site.whatsapp ?? site.phone ?? ""}
                  href={site.whatsappLink ?? `tel:${site.phone ?? ""}`}
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M21 11.5a8.4 8.4 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.4 8.4 0 0 1-3.8-.9L3 21l1.9-5.7a8.4 8.4 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.4 8.4 0 0 1 3.8-.9 8.5 8.5 0 0 1 8.5 8.5z" />
                    </svg>
                  }
                />
                <ContactCard
                  label="Studio"
                  value={site.location}
                  icon={
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="w-5 h-5"
                    >
                      <path d="M20 10c0 7-8 12-8 12s-8-5-8-12a8 8 0 1 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                  }
                />

                <div className="bg-ink text-white rounded-lg2 p-8 relative overflow-hidden">
                  <div
                    className="absolute pointer-events-none"
                    style={{
                      top: "-40%",
                      right: "-30%",
                      width: "80%",
                      height: "120%",
                      background:
                        "radial-gradient(closest-side, rgba(232,98,26,.4), transparent 70%)",
                    }}
                  />
                  <div className="relative">
                    <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-white/65 mb-3 block">
                      Response time
                    </span>
                    <div
                      className="font-display font-medium gradient-text"
                      style={{
                        fontSize: "clamp(40px,5vw,60px)",
                        lineHeight: 0.95,
                        letterSpacing: "-0.03em",
                      }}
                    >
                      &lt; 24 hrs
                    </div>
                    <p className="text-white/80 text-[14px] leading-[1.55] mt-4 max-w-[34ch]">
                      Every enquiry gets a real response from a real person on
                      the Uniix Studio team.
                    </p>
                  </div>
                </div>

                <div className="bg-bg-warm border border-line rounded-lg2 p-7">
                  <span className="font-mono text-[10px] tracking-[0.18em] uppercase text-brand-4 block mb-3">
                    Office hours
                  </span>
                  <div className="flex flex-col gap-1.5 text-[14px] text-ink-2">
                    <div className="flex justify-between">
                      <span>Mon — Fri</span>
                      <span>9am — 7pm IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday</span>
                      <span>10am — 4pm IST</span>
                    </div>
                    <div className="flex justify-between text-ink-mute">
                      <span>Sunday</span>
                      <span>Closed</span>
                    </div>
                  </div>
                </div>
              </aside>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What happens next */}
      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <Reveal>
            <span className="eyebrow">What happens next</span>
          </Reveal>
          <ol className="mt-8 grid md:grid-cols-3 gap-5">
            {NEXT_STEPS.map((step, i) => (
              <Reveal key={step.title} delay={(i % 3) as 0 | 1 | 2}>
                <li className="h-full bg-bg-paper border border-line rounded-lg2 p-7">
                  <span className="font-mono text-[11px] tracking-[0.14em] text-brand-4 block mb-3">0{i + 1}</span>
                  <h2 className="font-display font-medium text-[20px] tracking-[-0.01em] mb-2">{step.title}</h2>
                  <p className="text-ink-2 text-[15px] leading-[1.6]">{step.body}</p>
                </li>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Service area */}
      <section className="pb-20 md:pb-28">
        <div className="wrap">
          <div className="border-t border-line pt-12 grid lg:grid-cols-[1fr_1.4fr] gap-8 lg:gap-16">
            <h2 className="display" style={{ fontSize: "clamp(32px,3.5vw,48px)" }}>
              Where we <span className="italic-display gradient-text">work.</span>
            </h2>
            <div className="text-ink-2 text-[17px] leading-[1.65] max-w-[60ch]">
              <p>
                {/* TODO(sudewa): say whether clients can meet you in person, and where. */}
                Our studio is in {site.location}, and we work with brands across Sri Lanka, Australia and the UK. These
                are the areas we cover locally:
              </p>
              {locations.length > 0 && (
                <ul className="mt-5 flex flex-wrap gap-2">
                  {locations.map((l) => (
                    <li key={l.slug}>
                      <Link
                        href={`/locations/${l.slug}/`}
                        className="inline-flex px-4 py-2 rounded-full bg-bg-paper border border-line text-[14px] text-ink hover:border-brand-3 transition-colors"
                      >
                        {l.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="pb-24 md:pb-32">
        <div className="wrap max-w-3xl">
          <h2 className="display mb-8" style={{ fontSize: "clamp(32px,3.5vw,48px)" }}>
            Before you <span className="italic-display gradient-text">get in touch.</span>
          </h2>
          <div className="divide-y divide-line border-t border-line">
            {FAQS.map((f) => (
              <div key={f.question} className="py-6">
                <h3 className="font-display font-medium text-[19px] mb-2">{f.question}</h3>
                <p className="text-ink-2 text-[16px] leading-[1.65]">{f.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function ContactCard({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: React.ReactNode;
}) {
  const className = `bg-bg-paper border border-line rounded-lg2 p-6 flex items-start gap-4 transition-all duration-300 ${
    href ? "hover:-translate-y-1 hover:shadow-sm2 hover:border-brand-3/40" : ""
  }`;
  const inner = (
    <>
      <div className="w-11 h-11 rounded-full bg-brand-grad text-white grid place-items-center flex-shrink-0">
        {icon}
      </div>
      <div>
        <div className="font-mono text-[10px] tracking-[0.18em] uppercase text-ink-mute mb-1.5">
          {label}
        </div>
        <div
          className="font-display font-medium"
          style={{ fontSize: "18px", letterSpacing: "-0.01em" }}
        >
          {value}
        </div>
      </div>
    </>
  );

  if (href) {
    return <a href={href} className={className}>{inner}</a>;
  }
  return <div className={className}>{inner}</div>;
}
