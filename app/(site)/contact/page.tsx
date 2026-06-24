import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ContactForm from "@/components/ContactForm";
import Reveal from "@/components/Reveal";
import { site } from "@/lib/content";
import { breadcrumbSchema } from "@/lib/schema";
import JsonLd from "@/components/JsonLd";

export const metadata: Metadata = {
  title: "Contact Uniix Studio | Hire a Creative Digital Agency in Sri Lanka",
  description:
    "Start a project with Uniix Studio. Tell us about your goals and we'll be in touch within 24 hours. Based in Colombo, working with brands across Sri Lanka, Australia and the UK.",
  alternates: { canonical: site.canonical("/contact/") },
};

export default function ContactPage() {
  const crumbs = breadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Contact", url: "/contact/" },
  ]);

  return (
    <>
      <JsonLd data={crumbs} />
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
              <ContactForm />
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
                  value={site.whatsapp}
                  href={site.whatsappLink}
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
