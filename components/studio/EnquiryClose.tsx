import Link from "next/link";
import type { ReactNode } from "react";
import { Magnetic, RollText } from "@/components/home/studio/motion";

/**
 * The closing frame of the inner pages: one orange band, one big line and the
 * three ways to start (contact form, WhatsApp, email). It sits directly above
 * the dark footer, the same way the homepage brief builder does, so every page
 * ends on the same beat.
 */
export default function EnquiryClose({
  id = "start",
  heading,
  primaryHref = "/contact/",
  primaryLabel = "Start a project",
  note,
  email,
  whatsappLink,
  whatsappText,
}: {
  id?: string;
  heading: ReactNode;
  primaryHref?: string;
  primaryLabel?: string;
  note?: ReactNode;
  email: string;
  whatsappLink?: string;
  whatsappText?: string;
}) {
  const wa = whatsappLink
    ? whatsappText
      ? `${whatsappLink}${whatsappLink.includes("?") ? "&" : "?"}text=${encodeURIComponent(whatsappText)}`
      : whatsappLink
    : undefined;

  return (
    <section id={id} aria-labelledby={`${id}-title`} className="relative overflow-hidden bg-brand-3 py-24 text-ink md:py-32">
      <div className="wrap-wide">
        <h2
          id={`${id}-title`}
          className="max-w-[16ch] font-display font-medium leading-[0.92] tracking-[-0.05em] text-[clamp(44px,7.4vw,124px)]"
        >
          {heading}
        </h2>
        {note && <p className="mt-8 max-w-[46ch] text-[clamp(16px,1.3vw,19px)] leading-[1.5] text-ink/75">{note}</p>}

        <div className="mt-12 flex flex-col gap-6 border-t border-ink/20 pt-8 md:mt-16 md:flex-row md:items-center md:justify-between">
          <Magnetic>
            <Link href={primaryHref} className="btn group bg-ink text-white hover:bg-ink/85">
              {primaryLabel} <span className="cta-arrow">↗</span>
            </Link>
          </Magnetic>
          <ul className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[15px]">
            {wa && (
              <li>
                <a href={wa} target="_blank" rel="noopener noreferrer" className="group inline-flex min-h-[44px] items-center gap-1.5 font-medium">
                  <RollText>WhatsApp</RollText>
                  <span aria-hidden="true">↗</span>
                </a>
              </li>
            )}
            <li>
              <a href={`mailto:${email}`} className="group inline-flex min-h-[44px] items-center font-medium">
                <RollText>{email}</RollText>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
