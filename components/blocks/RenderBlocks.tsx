import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import clsx from "clsx";
import type { Page } from "@/payload-types";
import Reveal from "@/components/Reveal";
import SmartImage from "@/components/ui/SmartImage";
import TestimonialsSection from "@/components/TestimonialsSection";
import ContactForm from "@/components/ContactForm";
import { VideoShowcase } from "@/components/VideoShowcase";
import JsonLd from "@/components/JsonLd";
import { faqPageSchema } from "@/lib/schema";
import { docs, resolveImage, richTextToMarkdown } from "@/lib/cms/helpers";
import { getServices } from "@/lib/cms/services";
import { getProjects } from "@/lib/cms/projects";
import { getClients, getFeaturedClients, getFeaturedTestimonials, getProcess, getTeam, getTestimonials } from "@/lib/cms/content";
import { getSiteSettings } from "@/lib/cms/site";
import { BlockIntro, BlockSection, proseClass } from "./shared";

type Block = NonNullable<Page["layout"]>[number];
type Of<T extends Block["blockType"]> = Extract<Block, { blockType: T }>;

const isExternal = (href: string) => /^https?:\/\//.test(href);

function CtaLink({ label, href, newTab, variant = "btn-primary" }: { label?: string | null; href?: string | null; newTab?: boolean | null; variant?: string }) {
  if (!label || !href) return null;
  return (
    <Link
      href={href}
      className={clsx("btn", variant)}
      target={newTab || isExternal(href) ? "_blank" : undefined}
      rel={newTab || isExternal(href) ? "noopener noreferrer" : undefined}
    >
      {label} <span className="cta-arrow">↗</span>
    </Link>
  );
}

/* ---------------------------------------------------------------- blocks */

function HeroBlock({ b, first }: { b: Of<"hero">; first: boolean }) {
  const img = resolveImage(b.image, "hero");
  const HeadingTag = first ? "h1" : "h2";
  return (
    <section className="pt-36 pb-16 md:pt-44 md:pb-24">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:items-end">
        <div>
          {b.eyebrow && (
            <Reveal>
              <span className="eyebrow">{b.eyebrow}</span>
            </Reveal>
          )}
          <Reveal delay={1}>
            <HeadingTag className="display mt-6" style={{ fontSize: "clamp(48px,7vw,104px)" }}>
              {b.heading}{" "}
              {b.headingAccent && <span className="italic-display gradient-text">{b.headingAccent}</span>}
            </HeadingTag>
          </Reveal>
          {b.lede && (
            <Reveal delay={2}>
              <p className="t-lead mt-8 max-w-[56ch] text-ink-2">{b.lede}</p>
            </Reveal>
          )}
          <Reveal delay={3}>
            <div className="mt-10 flex flex-wrap gap-3">
              <CtaLink {...b.primaryCta} variant="btn-primary" />
              <CtaLink {...b.secondaryCta} variant="btn-secondary" />
            </div>
          </Reveal>
        </div>
        {img && (
          <Reveal delay={2}>
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg2 bg-bg-warm">
              <SmartImage src={img.src} alt={img.alt} sizes="(min-width:1024px) 45vw, 100vw" priority={first} />
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

async function RichTextBlock({ b }: { b: Of<"richText"> }) {
  const markdown = await richTextToMarkdown(b.content);
  return (
    <section className="section-tight">
      <div className={clsx("wrap", b.width === "wide" ? "max-w-[1000px]" : "max-w-[72ch]")}>
        <div className={proseClass}>
          <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdown}</ReactMarkdown>
        </div>
      </div>
    </section>
  );
}

function MediaBlock({ b }: { b: Of<"media"> }) {
  const img = resolveImage(b.image, "hero");
  if (b.vimeoId) {
    return (
      <VideoShowcase
        heading={img?.caption ?? ""}
        subheading=""
        videos={[{ vimeoId: b.vimeoId, title: img?.alt || "Film", client: "Uniix Studio" }]}
      />
    );
  }
  if (!img) return null;
  return (
    <section className="section-tight">
      <div className={clsx(b.size === "full" ? "" : "wrap", b.size === "contained" && "max-w-[900px]")}>
        <Reveal>
          <figure>
            <div className={clsx("relative aspect-[16/9] overflow-hidden bg-bg-warm", b.size !== "full" && "rounded-lg2")}>
              <SmartImage src={img.src} alt={img.alt} sizes={b.size === "full" ? "100vw" : "(min-width:1280px) 1200px, 100vw"} />
            </div>
            {img.caption && <figcaption className="t-meta mt-4 text-ink-mute">{img.caption}</figcaption>}
          </figure>
        </Reveal>
      </div>
    </section>
  );
}

function SplitContentBlock({ b }: { b: Of<"splitContent"> }) {
  const img = resolveImage(b.image, "card");
  const dark = b.tone === "dark";
  return (
    <BlockSection tone={b.tone}>
      <div className="wrap grid gap-12 lg:grid-cols-2 lg:items-center">
        <div className={clsx(b.imagePosition === "left" && "lg:order-2")}>
          <Reveal>
            {b.eyebrow && <span className="eyebrow">{b.eyebrow}</span>}
            {b.heading && (
              <h2 className="t-h2 mt-5">
                {b.heading}{" "}
                {b.headingAccent && <span className="t-italic accent-grad-text">{b.headingAccent}</span>}
              </h2>
            )}
            {b.intro && <p className={clsx("t-lead mt-6", dark ? "text-white/70" : "text-ink-2")}>{b.intro}</p>}
            <p className={clsx("t-body mt-6 whitespace-pre-line", dark ? "text-white/75" : "text-ink-2")}>{b.body}</p>
            <div className="mt-8">
              <CtaLink {...b.cta} variant={dark ? "btn-light" : "btn-secondary"} />
            </div>
          </Reveal>
        </div>
        {img && (
          <Reveal delay={1}>
            <div className="relative aspect-[4/3] overflow-hidden rounded-lg2 bg-bg-warm">
              <SmartImage src={img.src} alt={img.alt} sizes="(min-width:1024px) 50vw, 100vw" />
            </div>
          </Reveal>
        )}
      </div>
    </BlockSection>
  );
}

function StatsBlock({ b }: { b: Of<"stats"> }) {
  const dark = b.tone === "dark";
  return (
    <BlockSection tone={b.tone}>
      <div className="wrap">
        <BlockIntro {...b} dark={dark} />
        <dl className={clsx("grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3 border-t pt-12", dark ? "border-line-dark" : "border-line")}>
          {(b.items ?? []).map((s, i) => (
            <Reveal key={s.id ?? i} delay={(i % 3) as 0 | 1 | 2}>
              <div>
                <dd className="t-numeral accent-grad-text text-[clamp(56px,7vw,112px)]">{s.value}</dd>
                <dt className={clsx("t-meta mt-6", dark ? "text-white" : "text-ink")}>{s.label}</dt>
                {s.description && <p className={clsx("t-body mt-3 max-w-[32ch]", dark ? "text-white/60" : "text-ink-2")}>{s.description}</p>}
              </div>
            </Reveal>
          ))}
        </dl>
      </div>
    </BlockSection>
  );
}

async function ServicesGridBlock({ b }: { b: Of<"servicesGrid"> }) {
  const picked = docs(b.services).map((s) => s.slug);
  const all = await getServices();
  const list = (picked.length ? picked.map((slug) => all.find((s) => s.slug === slug)) : all).filter(
    (s): s is NonNullable<typeof s> => Boolean(s),
  );
  return (
    <BlockSection>
      <div className="wrap">
        <BlockIntro {...b} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.slice(0, b.limit ?? 6).map((s, i) => (
            <Reveal key={s.slug} delay={(i % 3) as 0 | 1 | 2}>
              <li className="h-full">
                <Link
                  href={`/services/${s.pillar}/${s.slug}/`}
                  className="group block h-full rounded-lg2 border border-line bg-bg-paper p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-soft"
                >
                  <span className="t-meta text-ink-mute">{s.pillar}</span>
                  <h3 className="mt-3 font-display font-medium text-[24px] tracking-[-0.02em]">{s.name}</h3>
                  <p className="mt-3 text-ink-2 text-[15px] leading-[1.6] line-clamp-3">{s.shortDescription ?? s.metaDescription}</p>
                  <span className="link-cta mt-6 text-[14px]">
                    Explore <span className="cta-arrow">↗</span>
                  </span>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </BlockSection>
  );
}

async function ProjectsGridBlock({ b }: { b: Of<"projectsGrid"> }) {
  const picked = docs(b.projects).map((p) => p.slug);
  const all = (await getProjects()).filter((p) => p.hasDetail);
  const list = (picked.length
    ? picked.map((slug) => all.find((p) => p.slug === slug))
    : [...all.filter((p) => p.feature), ...all.filter((p) => !p.feature)]
  ).filter((p): p is NonNullable<typeof p> => Boolean(p));
  return (
    <BlockSection>
      <div className="wrap">
        <BlockIntro {...b} />
        <ul className="grid gap-8 md:grid-cols-2">
          {list.slice(0, b.limit ?? 4).map((p, i) => (
            <Reveal key={p.slug} delay={(i % 2) as 0 | 1}>
              <li>
                <Link href={`/portfolio/${p.slug}/`} className="group block">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg2 bg-bg-warm">
                    {p.coverImage && (
                      <SmartImage
                        src={p.coverImage}
                        alt={p.coverAlt ?? p.title}
                        sizes="(min-width:768px) 50vw, 100vw"
                        className="transition-transform duration-700 ease-uniix group-hover:scale-[1.03]"
                      />
                    )}
                  </div>
                  <p className="t-meta mt-5 text-ink-mute">{p.overline}</p>
                  <h3 className="mt-2 font-display font-medium text-[26px] tracking-[-0.02em]">{p.title}</h3>
                  <p className="t-body mt-2 text-ink-2 max-w-[52ch]">{p.summary}</p>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </BlockSection>
  );
}

async function TestimonialsBlock({ b }: { b: Of<"testimonials"> }) {
  const picked = docs(b.testimonials).map((t) => t.id);
  const list = picked.length
    ? (await getTestimonials()).filter((t) => picked.includes(t.id))
    : await getFeaturedTestimonials();
  return <TestimonialsSection items={list} />;
}

async function ClientLogosBlock({ b }: { b: Of<"clientLogos"> }) {
  const picked = docs(b.clients).map((c) => c.id);
  const list = picked.length ? (await getClients()).filter((c) => picked.includes(c.id)) : await getFeaturedClients();
  return (
    <section className="section-tight">
      <div className="wrap">
        {b.heading && <p className="t-meta text-ink-mute text-center">{b.heading}</p>}
        <ul className="mt-9 grid grid-cols-2 items-center gap-x-8 gap-y-9 sm:grid-cols-3 lg:grid-cols-6">
          {list.map((c) => (
            <li key={c.id} className="relative h-10 md:h-11">
              {c.logo ? (
                <SmartImage src={c.logo} alt={c.alt} sizes="140px" fit="contain" className="opacity-70 transition-opacity hover:opacity-100" />
              ) : (
                <span className={clsx("grid h-full place-items-center text-ink-2 text-[22px]", c.style)}>{c.name}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function IndustriesBlock({ b }: { b: Of<"industries"> }) {
  const list = docs(b.industries);
  return (
    <BlockSection tone="warm">
      <div className="wrap">
        <BlockIntro {...b} />
        <ul className="grid gap-x-10 border-t border-line sm:grid-cols-2">
          {list.map((ind) => (
            <li key={ind.id} className="border-b border-line">
              <Link href={`/industries/${ind.slug}/`} className="group flex items-baseline justify-between gap-6 py-6">
                <span className="font-display font-medium text-[clamp(24px,2.6vw,34px)] tracking-[-0.025em]">{ind.name}</span>
                <span className="cta-arrow text-ink-mute transition-colors group-hover:text-brand-ink">↗</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </BlockSection>
  );
}

async function ProcessBlock({ b }: { b: Of<"process"> }) {
  const picked = docs(b.stages).map((s) => s.id);
  const stages = (await getProcess()).filter((s) => !picked.length || picked.includes(s.id));
  return (
    <BlockSection tone="warm">
      <div className="wrap">
        <BlockIntro {...b} />
        <ol className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {stages.map((s, i) => (
            <Reveal key={s.id} delay={(i % 4) as 0 | 1 | 2 | 3}>
              <li className="h-full rounded-lg2 border border-line bg-bg-paper p-8">
                <span className="font-mono text-[11px] tracking-[0.18em] text-brand-4">{s.num}</span>
                <h3 className="mt-4 font-display font-medium text-[24px] tracking-[-0.015em]">{s.title}</h3>
                <p className="mt-3 text-ink-2 text-[15px] leading-[1.55]">{s.desc}</p>
              </li>
            </Reveal>
          ))}
        </ol>
      </div>
    </BlockSection>
  );
}

function FAQBlock({ b }: { b: Of<"faq"> }) {
  const faqs = docs(b.faqs).filter((f) => f.published !== false);
  if (!faqs.length) return null;
  return (
    <BlockSection>
      {/* FAQPage schema only for the FAQs actually visible on this page. */}
      <JsonLd data={faqPageSchema(faqs.map((f) => ({ question: f.question, answer: f.answer })))} />
      <div className="wrap max-w-[900px]">
        <BlockIntro {...b} />
        <div className="border-t border-line">
          {faqs.map((f) => (
            <details key={f.id} className="group border-b border-line py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 font-display text-[19px] font-medium">
                {f.question}
                <span aria-hidden="true" className="text-ink-mute transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-ink-2 text-[16px] leading-[1.65] whitespace-pre-line">{f.answer}</p>
            </details>
          ))}
        </div>
      </div>
    </BlockSection>
  );
}

function CTABlock({ b }: { b: Of<"cta"> }) {
  return (
    <section className="bg-bg-ink text-white py-24 md:py-32 relative overflow-hidden">
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(40% 60% at 80% 30%, rgba(248,200,74,0.20), transparent 70%), radial-gradient(60% 50% at 10% 90%, rgba(232,98,26,0.18), transparent 70%)",
        }}
      />
      <div className="wrap relative text-center max-w-[880px] mx-auto">
        <Reveal>
          <h2 className="display" style={{ fontSize: "clamp(40px,6vw,80px)", color: "#fff" }}>
            {b.heading}
            {b.headingAccent && (
              <>
                <br />
                <span className="italic-display gradient-text">{b.headingAccent}</span>
              </>
            )}
          </h2>
        </Reveal>
        {b.body && (
          <Reveal delay={1}>
            <p className="text-lg text-white/75 max-w-[60ch] mx-auto mt-6 leading-[1.55]">{b.body}</p>
          </Reveal>
        )}
        <Reveal delay={2}>
          <div className="mt-10 flex justify-center">
            <CtaLink label={b.label} href={b.href} variant="btn-grad" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function GalleryBlock({ b }: { b: Of<"gallery"> }) {
  const imgs = (b.images ?? []).map((i) => resolveImage(i.image, "card")).filter((i): i is NonNullable<typeof i> => Boolean(i));
  const cols = { "2": "sm:grid-cols-2", "3": "sm:grid-cols-2 lg:grid-cols-3", "4": "sm:grid-cols-2 lg:grid-cols-4" }[b.columns ?? "3"];
  return (
    <section className="section-tight">
      <div className="wrap">
        {b.heading && <h2 className="t-h3 mb-10">{b.heading}</h2>}
        <ul className={clsx("grid gap-5", cols)}>
          {imgs.map((img, i) => (
            <li key={`${img.src}-${i}`}>
              <figure>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg2 bg-bg-warm">
                  <SmartImage src={img.src} alt={img.alt} sizes="(min-width:1024px) 33vw, 50vw" />
                </div>
                {img.caption && <figcaption className="t-meta mt-3 text-ink-mute">{img.caption}</figcaption>}
              </figure>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

async function TeamBlock({ b }: { b: Of<"team"> }) {
  const picked = docs(b.members).map((m) => m.id);
  const team = await getTeam();
  const list = picked.length ? team.filter((m) => picked.includes(m.id)) : team.filter((m) => m.featured);
  return (
    <BlockSection>
      <div className="wrap">
        <BlockIntro {...b} />
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((m) => (
            <li key={m.id} className="rounded-lg2 border border-line bg-bg-paper p-8">
              {m.photo ? (
                <div className="relative size-24 overflow-hidden rounded-full">
                  <SmartImage src={m.photo.src} alt={m.photo.alt || m.name} sizes="96px" />
                </div>
              ) : (
                <div aria-hidden="true" className="grid size-24 place-items-center rounded-full bg-brand-grad font-display text-4xl font-bold text-white">
                  {m.initial}
                </div>
              )}
              <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.18em] text-brand-4">{m.role}</p>
              <h3 className="mt-2 font-display font-medium text-[24px] tracking-[-0.02em]">{m.name}</h3>
              {m.bio && <p className="mt-3 text-ink-2 text-[15px] leading-[1.6]">{m.bio}</p>}
            </li>
          ))}
        </ul>
      </div>
    </BlockSection>
  );
}

async function ContactFormBlock({ b, slug }: { b: Of<"contactForm">; slug: string }) {
  const site = await getSiteSettings();
  return (
    <BlockSection tone="warm">
      <div className="wrap grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
        <BlockIntro eyebrow={b.eyebrow} heading={b.heading} headingAccent={b.headingAccent} intro={b.intro} />
        <ContactForm whatsapp={site.whatsapp} whatsappLink={site.whatsappLink} source={b.source || `page:${slug}`} />
      </div>
    </BlockSection>
  );
}

/* --------------------------------------------------------------- render */

export default async function RenderBlocks({ blocks, slug }: { blocks: Page["layout"]; slug: string }) {
  if (!blocks?.length) return null;
  return (
    <>
      {blocks.map((b, i) => {
        const key = b.id ?? `${b.blockType}-${i}`;
        switch (b.blockType) {
          case "hero": return <HeroBlock key={key} b={b} first={i === 0} />;
          case "richText": return <RichTextBlock key={key} b={b} />;
          case "media": return <MediaBlock key={key} b={b} />;
          case "splitContent": return <SplitContentBlock key={key} b={b} />;
          case "stats": return <StatsBlock key={key} b={b} />;
          case "servicesGrid": return <ServicesGridBlock key={key} b={b} />;
          case "projectsGrid": return <ProjectsGridBlock key={key} b={b} />;
          case "testimonials": return <TestimonialsBlock key={key} b={b} />;
          case "clientLogos": return <ClientLogosBlock key={key} b={b} />;
          case "industries": return <IndustriesBlock key={key} b={b} />;
          case "process": return <ProcessBlock key={key} b={b} />;
          case "faq": return <FAQBlock key={key} b={b} />;
          case "cta": return <CTABlock key={key} b={b} />;
          case "gallery": return <GalleryBlock key={key} b={b} />;
          case "team": return <TeamBlock key={key} b={b} />;
          case "contactForm": return <ContactFormBlock key={key} b={b} slug={slug} />;
          default: return null;
        }
      })}
    </>
  );
}
