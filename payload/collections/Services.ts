import type { CollectionConfig } from 'payload'

/**
 * Service detail page — one document per /services/[pillar]/[service]/.
 * UX is grouped into Tabs so the editor never sees a wall of fields:
 *   1. Content     — what the page actually says
 *   2. SEO         — title, meta, OG, FAQs (PAA box targeting)
 *   3. Settings    — pillar, ordering, related, CTA
 */
export const Services: CollectionConfig = {
  slug: 'services',
  labels: { singular: 'Service', plural: 'Services' },
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name', 'pillar', 'pageTitle', 'featured', 'updatedAt'],
    listSearchableFields: ['name', 'rawName', 'pageTitle', 'slug'],
    description: 'The 13 detail pages under /services/[pillar]/[service]/. SEO-aligned with the Masterplan.',
    group: 'Services',
    pagination: { defaultLimit: 25 },
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        /* ------------------------------ CONTENT ------------------------------ */
        {
          label: 'Content',
          description: 'The visible page copy — headline, body, pricing, FAQs.',
          fields: [
            {
              name: 'name',
              type: 'text',
              required: true,
              admin: {
                description: 'Short display label — e.g., "Brand Identity". Used in nav, breadcrumbs, sibling cards.',
                width: '50%',
              },
            },
            {
              name: 'rawName',
              type: 'text',
              admin: {
                description: 'Full marketing name — e.g., "Brand Identity Design". Used inside body copy.',
                width: '50%',
              },
            },
            {
              name: 'pageTitle',
              type: 'text',
              required: true,
              admin: {
                description: 'The H1 on the page. Per Masterplan §3.1 use the pattern: "[Service] in Sri Lanka | [Value Prop]".',
              },
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
              admin: {
                description: 'Full page body. Minimum 800 words per Masterplan. Include H2s for: What\'s Included, Process, Why Uniix, Pricing.',
              },
            },
            {
              name: 'pricingFromLKR',
              type: 'number',
              admin: {
                description: 'Starting price in LKR. Optional — leave blank to omit pricing chip.',
                step: 10000,
              },
            },
            {
              name: 'faqs',
              type: 'array',
              labels: { singular: 'FAQ', plural: 'FAQs' },
              admin: {
                description: '5 questions max per Masterplan §3.1. Renders visible accordion AND emits FAQPage JSON-LD for People Also Ask boxes.',
                initCollapsed: true,
              },
              fields: [
                { name: 'question', type: 'text', required: true },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  admin: { description: '2–3 sentences. Start with the answer directly — no "Great question" preamble.' },
                },
              ],
              maxRows: 8,
            },
          ],
        },

        /* -------------------------------- SEO -------------------------------- */
        {
          label: 'SEO',
          description: 'Title tag, meta description, OG image. Page already auto-emits Service + Breadcrumb JSON-LD.',
          fields: [
            {
              name: 'metaDescription',
              type: 'textarea',
              required: true,
              maxLength: 160,
              admin: {
                description: 'Max 160 chars (warn at 150). Lead with the primary keyword. Soft CTA at the end.',
              },
            },
            {
              name: 'primaryKeyword',
              type: 'text',
              admin: {
                description: 'Primary keyword for this page (per Masterplan §3.2). Drives JSON-LD keywords + SEO sidebar.',
              },
            },
            {
              name: 'ogImage',
              type: 'upload',
              relationTo: 'media',
              admin: {
                description: 'Custom OG image (1200×630). Falls back to dynamic /opengraph-image if blank.',
              },
            },
          ],
        },

        /* ------------------------------ SETTINGS ----------------------------- */
        {
          label: 'Settings',
          description: 'Routing, hierarchy, and what shows in lists.',
          fields: [
            {
              name: 'slug',
              type: 'text',
              unique: true,
              required: true,
              admin: {
                description: 'URL slug. Unique site-wide. Lowercase, hyphens. e.g., "brand-identity".',
                width: '50%',
              },
            },
            {
              name: 'pillar',
              type: 'relationship',
              relationTo: 'pillars',
              required: true,
              admin: {
                description: 'Parent pillar (Design / Technology / Growth). Determines the URL prefix.',
                width: '50%',
              },
            },
            {
              name: 'displayOrder',
              type: 'number',
              defaultValue: 0,
              admin: {
                description: 'Lower numbers appear first inside the pillar.',
                width: '50%',
                step: 1,
              },
            },
            {
              name: 'featured',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Pin this service to the top of its pillar page.',
                width: '50%',
              },
            },
            {
              name: 'relatedServices',
              type: 'relationship',
              relationTo: 'services',
              hasMany: true,
              maxRows: 3,
              admin: {
                description: 'Up to 3 related services shown at the bottom of the page.',
              },
            },
            {
              name: 'cta',
              type: 'group',
              admin: { description: 'Custom CTA button. Falls back to "Get a free consultation" if blank.' },
              fields: [
                { name: 'label', type: 'text', admin: { width: '50%' } },
                { name: 'href', type: 'text', admin: { width: '50%' } },
              ],
            },
          ],
        },
      ],
    },
  ],
}
