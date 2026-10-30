/**
 * SEO fix pass — the CMS half (content edits the code can't make).
 *
 *   node node_modules/payload/bin.js run scripts/cms/seo-fix-pass.ts            # dry run: prints the plan
 *   node node_modules/payload/bin.js run scripts/cms/seo-fix-pass.ts -- --apply # writes to the database
 *
 * Writes go straight to the live CMS, so review SEO_BLOG_DECISIONS.md first.
 * Every step is idempotent (re-running skips what's already done) and nothing is
 * deleted: merged posts are set back to draft, so they can be republished.
 *
 *   1. Packaging design service: process steps, materials & finishes, FAQs, Bilesma case study.
 *   2. Merges: copy the listed sections of each merged post into its target, then unpublish it.
 *   3. Keep posts: one contextual paragraph with 2 service links + 1 case-study link.
 *
 * Pages refresh on their hourly revalidate (the hooks are skipped outside Next).
 */
import 'dotenv/config'
import { getPayload, type Payload } from 'payload'
import {
  convertLexicalToMarkdown,
  convertMarkdownToLexical,
  type SanitizedServerEditorConfig,
} from '@payloadcms/richtext-lexical'
import config from '../../payload.config'
import { normalizeMarkdownForLexical } from './markdown'
import { KEEP, MERGE } from '../../lib/blog-decisions.mjs'

const APPLY = process.argv.includes('--apply')
const ctx = { disableRevalidate: true }

let payload: Payload
let editorConfig: SanitizedServerEditorConfig

type Lexical = Parameters<typeof convertLexicalToMarkdown>[0]['data']
const toMd = (data: unknown) => convertLexicalToMarkdown({ data: data as Lexical, editorConfig })
const toLexical = (md: string) => convertMarkdownToLexical({ editorConfig, markdown: normalizeMarkdownForLexical(md) })

const log = (s: string) => console.log(`${APPLY ? '✔' : '·'} ${s}`)

/* --------------------------------- markdown -------------------------------- */

/** Split markdown into the lead (before the first H2) and its H2 sections. */
function sections(md: string) {
  const parts = md.split(/\n(?=## )/)
  const lead = parts[0].startsWith('## ') ? '' : parts.shift()!
  return { lead, sections: parts.map((p) => ({ heading: p.split('\n')[0].replace(/^##\s+/, '').trim(), text: p.trim() })) }
}

/** Closing sections new material goes in front of. */
const CLOSING = /frequently asked|faq|ready to|bottom line|where to start|conclusion|final thoughts|the honest/i

function insertBeforeClosing(md: string, block: string) {
  const { lead, sections: secs } = sections(md)
  const at = secs.findIndex((s) => CLOSING.test(s.heading))
  const out = [...secs.map((s) => s.text)]
  out.splice(at === -1 ? out.length : at, 0, block.trim())
  return [lead.trim(), ...out].filter(Boolean).join('\n\n')
}

/** Insert a paragraph just before the second H2 (after the opening section). */
function insertAfterFirstSection(md: string, para: string) {
  const { lead, sections: secs } = sections(md)
  const out = secs.map((s) => s.text)
  out.splice(Math.min(1, out.length), 0, para.trim())
  return [lead.trim(), ...out].filter(Boolean).join('\n\n')
}

/* ------------------------------ 1. packaging ------------------------------- */

// Facts below come from the Bilesma Natural case study and the existing service copy.
// TODO(sudewa): confirm the finishes you actually offer with your print partners (foil, embossing, lamination…).
const PACKAGING = {
  process: [
    { title: 'Discovery & audit', duration: 'Week 1', detail: 'We study your product, audience, competitors, and the shelf or channel it will live in.' },
    { title: 'Concept development', duration: 'Week 1–2', detail: 'Distinct directions covering structure, front-of-pack hierarchy and finish options.' },
    { title: 'Design & refinement', duration: 'Week 2–3', detail: 'We refine the chosen route across every SKU and variant, with shelf mock-ups to check it reads at a glance.' },
    { title: 'Pre-press & handover', duration: 'Week 3–4', detail: 'Print-ready artwork with bleeds, spot colours and finishes, and we liaise with your printer to protect quality.' },
  ],
  materials: `## Materials and finishes

We design for the format your product actually ships in — carry bags, folding cartons, boxes, pouches and labels — and build every file to your printer's specs.

- **Base stock.** The base sets the tone before any artwork does. On Bilesma Natural we moved from bare brown kraft to a clean white bag, which repositioned the brand from everyday to premium.
- **Colour.** We lock packaging to your brand palette and prepare spot colours so every print run matches.
- **Surface artwork.** Illustration, front-of-pack hierarchy, ingredients, barcodes and compliance details, laid out for clarity.
- **Finishes.** We specify finishes alongside the artwork, so the print-ready files include everything your printer needs.`,
  faqs: [
    {
      question: 'How much does packaging design cost in Sri Lanka?',
      answer:
        'Product packaging design in Sri Lanka typically ranges from around LKR 40,000 for a single label or bag design to LKR 250,000+ for a full packaging system across multiple product lines, depending on scope, the number of formats, and whether brand identity work is included.',
    },
    {
      question: 'How long does a packaging redesign take?',
      answer:
        'A focused single-format packaging redesign usually takes two to four weeks, including discovery, concept, revisions and print-ready files. Larger systems across multiple product lines take longer.',
    },
    {
      question: 'Can you redesign our packaging without changing our whole brand?',
      answer:
        'Yes. A packaging redesign can refresh the look and shelf presence while keeping your existing logo and core identity, or it can be paired with a fuller brand identity update if the current branding is holding you back.',
    },
    {
      question: 'Do you deliver print-ready files?',
      answer:
        'Yes. Final artwork comes with bleeds, spot colours and finishes prepared for your printer, and we liaise with the printer to protect quality.',
    },
    {
      question: 'What makes good packaging for a natural or beauty brand?',
      answer:
        "It communicates the brand promise visually — through palette, illustration and material — before any text is read. It should look premium, stay consistent across every product, and double as a marketing surface by carrying the brand's contact and web details.",
    },
  ],
}

async function packaging() {
  const res = await payload.find({ collection: 'services', where: { slug: { equals: 'packaging-design' } }, depth: 0, limit: 1 })
  const doc = res.docs[0]
  if (!doc) return log('packaging-design: not found — skipped')
  const project = (await payload.find({ collection: 'projects', where: { slug: { equals: 'bilesma-natural' } }, depth: 0, limit: 1 })).docs[0]

  const data: Record<string, unknown> = {}
  if (!doc.process?.length) data.process = PACKAGING.process
  if (!doc.faqs?.length) data.faqs = PACKAGING.faqs
  const related = (doc.relatedProjects ?? []).map((r) => (typeof r === 'object' ? r.id : r))
  if (project && !related.includes(project.id)) data.relatedProjects = [...related, project.id]
  const md = await toMd(doc.body)
  if (!md.includes('## Materials and finishes')) data.body = toLexical(insertBeforeClosing(md, PACKAGING.materials))

  if (!Object.keys(data).length) return log('packaging-design: already done')
  log(`packaging-design: set ${Object.keys(data).join(', ')}`)
  if (APPLY) await payload.update({ collection: 'services', id: doc.id, data: { ...data, _status: 'published' }, context: ctx })
}

/* -------------------------------- 2. merges -------------------------------- */

/** Sections copied from each merged post, with an optional heading rename for the new home. */
const MERGE_SECTIONS: Record<string, Array<[from: string, to?: string]>> = {
  'web-design-packages-sri-lanka': [['The comparison table', 'Website packages compared'], ['How to compare quotes honestly']],
  'business-website-cost-ja-ela': [
    ['Build cost versus cost of ownership'],
    ['Questions to ask before you accept a quote'],
    ['Red flags in a cheap quote'],
  ],
  'brand-identity-vs-logo-difference': [['Which does your business need?', 'Logo or full brand identity: which do you need?'], ['What this means for your budget']],
  'near-me-search-sri-lanka-service-area': [
    ['What Google does when someone searches "near me"'],
    ['Why fake addresses fail'],
    ['The legitimate approach: one address, many service areas'],
  ],
  'shopify-vs-woocommerce-sri-lanka': [
    ['The 30-second verdict', 'Shopify vs WooCommerce: the 30-second verdict'],
    ['The 5-year cost picture', 'Shopify vs WooCommerce: the 5-year cost picture'],
    ['The honest decision framework', 'Choosing a platform: a decision framework'],
  ],
}

const findPost = async (slug: string) =>
  (await payload.find({ collection: 'blog-posts', where: { slug: { equals: slug } }, depth: 0, limit: 1, draft: false })).docs[0]

async function merges() {
  for (const [from, to] of Object.entries(MERGE) as [string, string][]) {
    const [src, target] = await Promise.all([findPost(from), findPost(to)])
    if (!src || !target) {
      log(`merge ${from} → ${to}: post missing — skipped`)
      continue
    }
    let targetMd = await toMd(target.body)
    const srcSecs = sections(await toMd(src.body)).sections
    const added: string[] = []
    for (const [heading, rename] of MERGE_SECTIONS[from] ?? []) {
      const sec = srcSecs.find((s) => s.heading.toLowerCase() === heading.toLowerCase())
      if (!sec) {
        log(`merge ${from}: section "${heading}" not found — check by hand`)
        continue
      }
      const title = rename ?? sec.heading
      if (targetMd.includes(`## ${title}`)) continue
      targetMd = insertBeforeClosing(targetMd, sec.text.replace(/^##\s+.*$/m, `## ${title}`))
      added.push(title)
    }
    if (added.length) {
      log(`merge ${from} → ${to}: add ${added.map((a) => `"${a}"`).join(', ')}`)
      if (APPLY) await payload.update({ collection: 'blog-posts', id: target.id, data: { body: toLexical(targetMd), _status: 'published' }, context: ctx })
    }
    if (src._status !== 'draft') {
      log(`merge ${from}: unpublish (set to draft; the 301 lives in next.config)`)
      if (APPLY) await payload.update({ collection: 'blog-posts', id: src.id, data: { _status: 'draft' }, context: ctx })
    }
  }
}

/* ---------------------------- 3. contextual links --------------------------- */

const SERVICE_LABEL: Record<string, string> = {
  'design/logo-design': 'logo design',
  'design/brand-identity': 'brand identity design',
  'design/packaging-design': 'packaging design',
  'design/ui-ux-design': 'UI/UX design',
  'design/social-media-creatives': 'social media creatives',
  'technology/web-design': 'web design',
  'technology/web-development': 'web development',
  'technology/ecommerce': 'ecommerce development',
  'technology/mobile-apps': 'mobile app development',
  'technology/wordpress': 'WordPress development',
  'growth/seo': 'SEO',
  'growth/social-media': 'social media management',
  'growth/analytics': 'marketing analytics',
}

const CASE_LABEL: Record<string, string> = {
  zerro: 'the Zerro brand identity',
  'st-lukes-medilab': "St Luke's Medical Laboratory",
  'rentmycar-lk': 'RentMyCar.lk',
  'bilesma-natural-social-media': "Bilesma Natural's social media",
  cricbook: 'the CricBook app',
  'bilesma-natural': 'the Bilesma Natural packaging project',
  wasana: 'Wasana Drivers',
  terraflow: 'the Terraflow brand identity',
}

function linkParagraph(services: string[], caseStudy: string) {
  const [a, b] = services
  return (
    `If you're weighing this up for your own business, our [${SERVICE_LABEL[a]}](/services/${a}/) and ` +
    `[${SERVICE_LABEL[b]}](/services/${b}/) pages show what's included and what it costs. ` +
    `For a real example, see how we approached [${CASE_LABEL[caseStudy]}](/portfolio/${caseStudy}/).`
  )
}

async function contextualLinks() {
  for (const [slug, k] of Object.entries(KEEP) as [string, { services: string[]; caseStudy: string }][]) {
    const post = await findPost(slug)
    if (!post) {
      log(`links ${slug}: post missing — skipped`)
      continue
    }
    const md = await toMd(post.body)
    if (md.includes(`](/portfolio/${k.caseStudy}/)`) && md.includes(`](/services/${k.services[0]}/)`)) continue
    log(`links ${slug}: + /services/${k.services.join('/, /services/')}/ and /portfolio/${k.caseStudy}/`)
    if (APPLY) {
      const body = toLexical(insertAfterFirstSection(md, linkParagraph(k.services, k.caseStudy)))
      await payload.update({ collection: 'blog-posts', id: post.id, data: { body, _status: 'published' }, context: ctx })
    }
  }
}

/* ----------------------------------- run ----------------------------------- */

payload = await getPayload({ config })
editorConfig = (payload.config.editor as unknown as { editorConfig: SanitizedServerEditorConfig }).editorConfig
console.log(`\nSEO fix pass — ${APPLY ? 'APPLYING to the database' : 'dry run (add -- --apply to write)'}\n`)
await packaging()
await merges()
await contextualLinks()
console.log('\nDone.')
process.exit(0)
