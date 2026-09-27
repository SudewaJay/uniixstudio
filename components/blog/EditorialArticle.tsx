import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import ReactMarkdown, { type Components } from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import Reveal from "@/components/Reveal";
import JsonLd from "@/components/JsonLd";
import type { BlogPost } from "@/lib/blog-fs";
import { formatDate } from "@/lib/format";
import type { Service } from "@/lib/services";
import type { Location } from "@/lib/locations";

/**
 * Long-form "editorial" article template, opted into per post with
 * `layout: "editorial"` in frontmatter. Server-rendered only — the sticky
 * contents rail is pure CSS, so this adds no client JavaScript beyond the
 * site-wide Reveal wrapper.
 */

type Props = {
  post: BlogPost;
  schema: object;
  related: BlogPost[];
  servingAreas: Pick<Location, "slug" | "name">[];
  /** Published services, used to resolve post.relatedServices ("pillar/slug"). */
  allServices: Service[];
  contact: { whatsappLink?: string; phone?: string };
};

/** Same slug for the TOC entry (from markdown) and the rendered heading. */
function slugify(text: string) {
  return text
    .toLowerCase()
    .replace(/&/g, " and ")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function textOf(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (node && typeof node === "object" && "props" in node) {
    return textOf((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

/** H2s from the markdown source, stripped of inline syntax. */
function tocFrom(body: string) {
  return [...body.matchAll(/^## (.+)$/gm)].map((m) => {
    const label = m[1]
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/[*_`]/g, "")
      .trim();
    return { label, id: slugify(label) };
  });
}

/** "Web design in Sri Lanka — fast, brand-led sites." → "Fast, brand-led sites." */
function serviceBlurb(metaDescription: string) {
  const afterDash = metaDescription.split(" — ")[1] ?? metaDescription;
  const first = afterDash.split(/(?<=\.)\s/)[0].replace(/ From Uniix Studio\.?$/, "");
  return first.charAt(0).toUpperCase() + first.slice(1);
}

const markdownComponents: Components = {
  h2: ({ children }) => (
    <h2
      id={slugify(textOf(children))}
      className="font-display font-medium text-ink mt-16 mb-5 leading-[1.12] tracking-[-0.025em] scroll-mt-[calc(var(--header-h)+24px)]"
      style={{ fontSize: "clamp(26px,2.8vw,36px)" }}
    >
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3
      id={slugify(textOf(children))}
      className="font-display font-medium text-ink mt-10 mb-3 text-[21px] md:text-[23px] leading-[1.25] tracking-[-0.015em] scroll-mt-[calc(var(--header-h)+24px)]"
    >
      {children}
    </h3>
  ),
  // Markdown wraps a standalone image in <p>; the img renderer emits a
  // <figure>, which can't live inside <p>, so unwrap image-only paragraphs.
  p: ({ node, children }) => {
    const kids = node?.children ?? [];
    if (kids.length === 1 && kids[0].type === "element" && kids[0].tagName === "img") {
      return <>{children}</>;
    }
    return <p className="text-[17px] leading-[1.75] text-ink-2 mb-5">{children}</p>;
  },
  ul: ({ children }) => (
    <ul className="list-disc marker:text-brand-ink pl-6 my-5 text-[17px] leading-[1.7] text-ink-2 space-y-2">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="list-decimal marker:text-ink-mute marker:font-mono marker:text-[14px] pl-6 my-5 text-[17px] leading-[1.7] text-ink-2 space-y-2">
      {children}
    </ol>
  ),
  strong: ({ children }) => (
    <strong className="text-ink font-semibold">{children}</strong>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-10 border-l-2 border-brand-ink pl-6 font-display text-ink text-[22px] md:text-[26px] leading-[1.35] tracking-[-0.015em] [&_p]:text-inherit [&_p]:text-[inherit] [&_p]:leading-[inherit] [&_p]:mb-0">
      {children}
    </blockquote>
  ),
  // <aside data-tone="insight|uniix"> blocks in the markdown become callouts.
  aside: ({ children, ...rest }) => {
    const tone = (rest as Record<string, unknown>)["data-tone"];
    const label = (rest as Record<string, unknown>)["data-label"] as
      | string
      | undefined;
    const dark = tone === "uniix";
    return (
      <aside
        className={
          dark
            ? "on-dark my-10 rounded-lg2 bg-bg-ink p-7 md:p-9 [&_p]:text-white/80 [&_strong]:text-white [&_li]:text-white/80 [&_a]:text-brand-2"
            : "my-10 rounded-lg2 border border-line bg-bg-warm p-7 md:p-9 [&_p:last-child]:mb-0"
        }
      >
        <p className="eyebrow !mb-4">
          {label ?? (dark ? "How we approach it" : "Key insight")}
        </p>
        {children}
      </aside>
    );
  },
  img: ({ src, alt, title }) =>
    typeof src === "string" ? (
      <figure className="my-10">
        {/* Diagrams are authored at 1200×675; explicit dimensions prevent CLS. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={src}
          alt={alt ?? ""}
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          className="w-full h-auto rounded-lg2 border border-line bg-bg-paper"
        />
        {title ? (
          <figcaption className="mt-3 text-[14px] leading-[1.55] text-ink-mute">
            {title}
          </figcaption>
        ) : null}
      </figure>
    ) : null,
  table: ({ children }) => (
    <div className="my-8 overflow-x-auto rounded-xl border border-line bg-bg-paper">
      <table className="w-full min-w-[560px] border-collapse text-[15px] text-ink-2">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => (
    <thead className="bg-bg-warm text-ink">{children}</thead>
  ),
  th: ({ children }) => (
    <th className="border-b border-line px-4 py-3 text-left font-semibold align-top">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-line-soft px-4 py-3 align-top leading-[1.6]">
      {children}
    </td>
  ),
  a: ({ href, children }) => {
    const cls =
      "text-brand-ink underline decoration-brand-ink/30 underline-offset-4 hover:decoration-brand-ink transition-colors";
    if (href?.startsWith("/")) {
      return (
        <Link href={href} className={cls}>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} className={cls} target="_blank" rel="noopener">
        {children}
      </a>
    );
  },
};

export default function EditorialArticle({
  post,
  schema,
  related,
  servingAreas,
  allServices,
  contact,
}: Props) {
  const toc = tocFrom(post.body);
  const services = (post.relatedServices ?? [])
    .map((key) => {
      const [pillar, slug] = key.split("/");
      const s = allServices.find((x) => x.pillar === pillar && x.slug === slug);
      return s
        ? {
            href: `/services/${pillar}/${slug}/`,
            name: s.name,
            blurb: serviceBlurb(s.metaDescription),
          }
        : null;
    })
    .filter((s): s is NonNullable<typeof s> => s !== null);
  const localCover = post.coverImage.startsWith("/");
  const hasFaqs = post.faqs && post.faqs.length > 0;
  const ctaHref = post.ctaHref ?? "/contact/";

  return (
    <article>
      <JsonLd data={schema} />

      {/* Hero */}
      <header className="pt-32 md:pt-40 pb-10 md:pb-14">
        <div className="wrap">
          <Reveal>
            <nav aria-label="Breadcrumb" className="mb-8">
              <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 t-meta text-ink-mute">
                <li>
                  <Link href="/" className="hover:text-ink transition-colors">
                    Home
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li>
                  <Link href="/blog/" className="hover:text-ink transition-colors">
                    Insights
                  </Link>
                </li>
                <li aria-hidden="true">/</li>
                <li className="text-ink-2">{post.category}</li>
              </ol>
            </nav>
            <div className="grid lg:grid-cols-[minmax(0,1fr)_340px] gap-10 lg:gap-16 items-end">
              <div>
                <h1
                  className="font-display font-medium text-ink leading-[1.02] tracking-[-0.035em] max-w-[20ch]"
                  style={{ fontSize: "clamp(36px,5.2vw,72px)" }}
                >
                  {post.title}
                </h1>
                <p className="t-lead mt-6 text-ink-2 max-w-[58ch]">
                  {post.excerpt}
                </p>
                <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
                  <div className="flex items-center gap-3">
                    <div className="size-11 rounded-full bg-brand-grad text-white grid place-items-center font-display font-semibold text-[17px]">
                      {post.author.initial}
                    </div>
                    <div>
                      <p className="font-semibold text-ink text-[14px]">
                        {post.author.name}
                      </p>
                      <p className="text-ink-mute text-[12px]">{post.author.role}</p>
                    </div>
                  </div>
                  <dl className="flex flex-wrap gap-x-6 gap-y-2 t-meta text-ink-mute">
                    <div className="flex gap-2">
                      <dt className="sr-only">Published</dt>
                      <dd>
                        <time dateTime={post.publishDate}>
                          {formatDate(post.publishDate)}
                        </time>
                      </dd>
                    </div>
                    {post.updatedDate && post.updatedDate !== post.publishDate ? (
                      <div className="flex gap-2">
                        <dt>Updated</dt>
                        <dd>
                          <time dateTime={post.updatedDate}>
                            {formatDate(post.updatedDate)}
                          </time>
                        </dd>
                      </div>
                    ) : null}
                    <div className="flex gap-2">
                      <dt className="sr-only">Reading time</dt>
                      <dd>{post.readTime}</dd>
                    </div>
                  </dl>
                </div>
              </div>

              {post.keyTakeaways && post.keyTakeaways.length > 0 ? (
                <div className="rounded-lg2 border border-line bg-bg-paper p-6 md:p-7 shadow-sm2">
                  <p className="eyebrow mb-4">In brief</p>
                  <ul className="flex flex-col gap-3">
                    {post.keyTakeaways.map((t) => (
                      <li
                        key={t}
                        className="flex gap-3 text-[15px] leading-[1.55] text-ink-2"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-[9px] size-1.5 flex-none rounded-full bg-brand-ink"
                        />
                        <span>{t}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </Reveal>
        </div>
      </header>

      {/* Featured visual — the LCP element, so it loads eagerly. */}
      <div className="pb-12 md:pb-16">
        <div className="wrap">
          <figure>
            <div className="relative aspect-[16/9] rounded-lg2 overflow-hidden border border-line bg-bg-warm">
              {localCover ? (
                <Image
                  src={post.coverImage}
                  alt={post.coverAlt ?? ""}
                  fill
                  priority
                  sizes="(min-width: 1280px) 1240px, calc(100vw - 40px)"
                  className="object-cover"
                />
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImage}
                  alt={post.coverAlt ?? ""}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              )}
            </div>
            {post.coverCaption ? (
              <figcaption className="mt-3 text-[14px] text-ink-mute">
                {post.coverCaption}
              </figcaption>
            ) : null}
          </figure>
        </div>
      </div>

      {/* Body + contents rail */}
      <div className="pb-20 md:pb-28">
        <div className="wrap grid lg:grid-cols-[minmax(0,1fr)_280px] gap-12 xl:gap-20">
          <div className="min-w-0 max-w-[70ch] lg:order-1">
            {toc.length > 2 ? (
              <details className="lg:hidden mb-10 rounded-lg2 border border-line bg-bg-paper group">
                <summary className="cursor-pointer list-none flex items-center justify-between px-5 py-4 t-meta text-ink">
                  Contents
                  <span
                    aria-hidden="true"
                    className="transition-transform group-open:rotate-45 text-[18px] leading-none"
                  >
                    +
                  </span>
                </summary>
                <ol className="px-5 pb-5 flex flex-col gap-2.5">
                  {toc.map((t, i) => (
                    <li key={t.id} className="flex gap-3 text-[15px] leading-[1.45]">
                      <span className="font-mono text-[12px] text-ink-mute pt-0.5 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <a href={`#${t.id}`} className="text-ink-2 hover:text-brand-ink">
                        {t.label}
                      </a>
                    </li>
                  ))}
                </ol>
              </details>
            ) : null}

            <div className="[&>*:first-child]:mt-0">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                rehypePlugins={[rehypeRaw]}
                components={markdownComponents}
              >
                {post.body}
              </ReactMarkdown>
            </div>

            {hasFaqs ? (
              <section aria-labelledby="faq" className="mt-20">
                <h2
                  id="faq"
                  className="font-display font-medium text-ink mb-8 leading-[1.12] tracking-[-0.025em] scroll-mt-[calc(var(--header-h)+24px)]"
                  style={{ fontSize: "clamp(26px,2.8vw,36px)" }}
                >
                  Frequently asked questions
                </h2>
                <div className="border-t border-line">
                  {post.faqs!.map((f) => (
                    <details key={f.question} className="group border-b border-line">
                      <summary className="cursor-pointer list-none flex items-start justify-between gap-6 py-6">
                        <h3 className="font-display font-medium text-ink text-[19px] md:text-[21px] leading-[1.3] tracking-[-0.01em]">
                          {f.question}
                        </h3>
                        <span
                          aria-hidden="true"
                          className="mt-1 flex-none size-7 rounded-full border border-line grid place-items-center text-ink-2 transition-transform group-open:rotate-45"
                        >
                          +
                        </span>
                      </summary>
                      <p className="pb-6 -mt-1 text-[17px] leading-[1.7] text-ink-2 max-w-[62ch]">
                        {f.answer}
                      </p>
                    </details>
                  ))}
                </div>
              </section>
            ) : null}
          </div>

          <aside className="hidden lg:block lg:order-2">
            <div className="sticky top-[calc(var(--header-h)+24px)] flex flex-col gap-8">
              {toc.length > 2 ? (
                <nav aria-label="Contents">
                  <p className="eyebrow mb-4">Contents</p>
                  <ol className="flex flex-col gap-2.5 border-l border-line pl-4">
                    {toc.map((t) => (
                      <li key={t.id}>
                        <a
                          href={`#${t.id}`}
                          className="block text-[14px] leading-[1.45] text-ink-mute hover:text-ink transition-colors"
                        >
                          {t.label}
                        </a>
                      </li>
                    ))}
                    {hasFaqs ? (
                      <li>
                        <a
                          href="#faq"
                          className="block text-[14px] leading-[1.45] text-ink-mute hover:text-ink transition-colors"
                        >
                          FAQs
                        </a>
                      </li>
                    ) : null}
                  </ol>
                </nav>
              ) : null}
              <div className="rounded-lg2 bg-bg-ink on-dark p-6">
                <p className="text-white font-display font-medium text-[18px] leading-[1.3] tracking-[-0.01em]">
                  {post.ctaHeading ?? "Planning a website project?"}
                </p>
                <Link href={ctaHref} className="btn btn-light btn-sm mt-5 w-full">
                  {post.ctaLabel ?? "Start a project"}
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>

      {/* Related services */}
      {services.length > 0 ? (
        <section className="border-t border-line-soft py-16 md:py-20">
          <div className="wrap">
            <p className="eyebrow mb-4">Related services</p>
            <h2
              className="font-display font-medium text-ink mb-10 tracking-[-0.025em] leading-[1.1]"
              style={{ fontSize: "clamp(26px,3vw,40px)" }}
            >
              Where Uniix Studio can help
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {services.map((s) => (
                <Link
                  key={s.href}
                  href={s.href}
                  className="group flex flex-col justify-between gap-6 rounded-lg2 border border-line bg-bg-paper p-6 hover:border-ink/30 hover:shadow-soft transition-all"
                >
                  <div>
                    <p className="font-display font-medium text-ink text-[20px] tracking-[-0.015em]">
                      {s.name}
                    </p>
                    <p className="mt-2 text-[14px] leading-[1.55] text-ink-mute">
                      {s.blurb}
                    </p>
                  </div>
                  <span className="link-cta text-[14px]">
                    Explore <span className="cta-arrow">→</span>
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {/* Contextual CTA */}
      <section className="bg-bg-ink on-dark py-20 md:py-28">
        <div className="wrap">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow mb-6">Next step</p>
              <p
                className="font-display font-medium text-white leading-[1.08] tracking-[-0.03em]"
                style={{ fontSize: "clamp(30px,4vw,52px)" }}
              >
                {post.ctaHeading ?? "Planning a website project?"}
              </p>
              {post.ctaBlock ? (
                <p className="t-lead mt-6 text-white/70 max-w-[56ch]">
                  {post.ctaBlock}
                </p>
              ) : null}
              <div className="mt-10 flex flex-wrap gap-3">
                <Link href={ctaHref} className="btn btn-accent">
                  {post.ctaLabel ?? "Start a project"} <span aria-hidden="true">↗</span>
                </Link>
                {contact.whatsappLink && (
                  <a
                    href={contact.whatsappLink}
                    className="btn btn-outline-light"
                    target="_blank"
                    rel="noopener"
                  >
                    WhatsApp {contact.phone}
                  </a>
                )}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {servingAreas.length > 0 ? (
        <section className="py-12 border-b border-line-soft">
          <div className="wrap">
            <p className="text-ink-2 text-[15px] leading-[1.6]">
              <span className="t-meta text-ink-mute mr-3">Service areas</span>
              {servingAreas.map((a, i) => (
                <span key={a.slug}>
                  <Link
                    href={`/locations/${a.slug}/`}
                    className="font-medium text-ink underline underline-offset-4 decoration-line hover:decoration-ink transition-colors"
                  >
                    Web design in {a.name}
                  </Link>
                  {i < servingAreas.length - 1 ? " · " : ""}
                </span>
              ))}
            </p>
          </div>
        </section>
      ) : null}

      {/* Related reading */}
      <section className="py-20 md:py-28">
        <div className="wrap">
          <h2
            className="font-display font-medium text-ink mb-10 tracking-[-0.025em]"
            style={{ fontSize: "clamp(28px,3.5vw,42px)" }}
          >
            Continue reading
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
            {related.map((rp, i) => (
              <Reveal key={rp.slug} delay={i as 0 | 1 | 2}>
                <article className="group flex flex-col h-full">
                  <Link
                    href={`/blog/${rp.slug}/`}
                    className="block w-full mb-4 overflow-hidden rounded-2xl aspect-[16/10] bg-bg-warm border border-line-soft"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={rp.coverImage}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                  </Link>
                  <div className="flex items-center gap-x-3">
                    <time
                      dateTime={rp.publishDate}
                      className="t-meta text-ink-mute"
                    >
                      {formatDate(rp.publishDate)}
                    </time>
                    <span className="rounded-full border border-line px-3 py-1 font-medium text-ink-2 text-[11px]">
                      {rp.category}
                    </span>
                  </div>
                  <h3 className="mt-3 font-display font-medium text-ink text-[20px] leading-[1.2] tracking-[-0.015em] group-hover:text-brand-ink transition-colors">
                    <Link href={`/blog/${rp.slug}/`}>{rp.title}</Link>
                  </h3>
                </article>
              </Reveal>
            ))}
          </div>
          <div className="mt-12">
            <Link href="/blog/" className="btn btn-secondary">
              All insights ↗
            </Link>
          </div>
        </div>
      </section>
    </article>
  );
}
