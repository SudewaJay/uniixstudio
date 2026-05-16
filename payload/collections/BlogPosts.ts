import type { CollectionConfig } from 'payload'
import { revalidateCollection, revalidateCollectionDelete } from '../hooks/revalidate'

/**
 * Blog post — drives /blog/[slug]/ pages.
 * Tabs structure: Content / SEO & AEO / Settings & Publish.
 * Includes draft/publish workflow, auto word count + read time, and FAQPage schema emission.
 */
export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'category', 'status', 'publishDate', 'author'],
    listSearchableFields: ['title', 'slug', 'primaryKeyword', 'excerpt'],
    description: 'All published blog posts. Per Masterplan §6.2, target 20 posts on launch.',
    group: 'Editorial',
    pagination: { defaultLimit: 25 },
  },
  versions: {
    drafts: {
      autosave: { interval: 2000 },
    },
    maxPerDoc: 20,
  },
  hooks: {
    afterChange: [revalidateCollection('blog-posts')],
    afterDelete: [revalidateCollectionDelete('blog-posts')],
    // Auto-calc wordCount + readTime on save (cheap, deterministic).
    beforeChange: [
      ({ data }) => {
        if (typeof data?.body === 'string') {
          const words = data.body.trim().split(/\s+/).filter(Boolean).length
          data.wordCount = words
          data.readTime = `${Math.max(1, Math.round(words / 220))} min read`
        }
        return data
      },
    ],
  },
  access: { read: () => true },
  fields: [
    {
      type: 'tabs',
      tabs: [
        /* ------------------------------ CONTENT ------------------------------ */
        {
          label: 'Content',
          description: 'The story itself — title, body, cover image, author.',
          fields: [
            {
              name: 'title',
              type: 'text',
              required: true,
              admin: {
                description: 'Post title. Drives the H1 and the slug suggestion.',
              },
            },
            {
              name: 'excerpt',
              type: 'textarea',
              maxLength: 200,
              required: true,
              admin: {
                description: 'Shows on the blog index card and as the og:description fallback. ~2 sentences.',
              },
            },
            {
              name: 'body',
              type: 'richText',
              required: true,
              admin: {
                description: 'Full post body. Min 1,500 words per Masterplan §6.3 for blog posts.',
              },
            },
            {
              name: 'coverImage',
              type: 'upload',
              relationTo: 'media',
              required: true,
              admin: {
                description: '16:10 ratio works best — 1600×1000 minimum. Used as og:image fallback.',
                width: '60%',
              },
            },
            {
              name: 'coverImageAlt',
              type: 'text',
              required: true,
              admin: {
                description: 'Describe the image for screen readers AND keyword inclusion.',
                width: '40%',
              },
            },
            {
              name: 'author',
              type: 'relationship',
              relationTo: 'authors',
              required: true,
              admin: { width: '50%' },
            },
            {
              name: 'category',
              type: 'select',
              required: true,
              defaultValue: 'Design',
              options: [
                { label: 'Design', value: 'Design' },
                { label: 'Technology', value: 'Technology' },
                { label: 'Growth', value: 'Growth' },
                { label: 'Insights', value: 'Insights' },
              ],
              admin: { width: '50%' },
            },
            {
              name: 'ctaBlock',
              type: 'textarea',
              admin: {
                description: 'Optional emphasized line shown above the related-posts footer. Skip for stub posts.',
              },
            },
          ],
        },

        /* ----------------------------- SEO & AEO ----------------------------- */
        {
          label: 'SEO & AEO',
          description: 'Search + Answer Engine Optimization. JSON-LD is auto-emitted.',
          fields: [
            {
              name: 'primaryKeyword',
              type: 'text',
              required: true,
              admin: {
                description: 'Primary keyword for ranking. Per Masterplan §6.3 must appear in H1, first paragraph, ≥2 H2s, and conclusion.',
              },
            },
            {
              name: 'seo',
              type: 'group',
              label: 'Meta tags',
              admin: { description: 'Override the default <title> and <meta description>. Optional.' },
              fields: [
                {
                  name: 'metaTitle',
                  type: 'text',
                  maxLength: 60,
                  admin: { description: 'Max 60 chars. Lead with the primary keyword.' },
                },
                {
                  name: 'metaDescription',
                  type: 'textarea',
                  maxLength: 160,
                  admin: { description: 'Max 160 chars. Soft CTA at the end.' },
                },
                {
                  name: 'ogImage',
                  type: 'upload',
                  relationTo: 'media',
                  admin: { description: 'Custom OG image. Falls back to coverImage if blank.' },
                },
              ],
            },
            {
              name: 'faqs',
              type: 'array',
              labels: { singular: 'FAQ', plural: 'FAQs' },
              admin: {
                description: 'Per Masterplan §9. Renders visible FAQ + emits FAQPage JSON-LD for People Also Ask boxes.',
                initCollapsed: true,
              },
              fields: [
                { name: 'question', type: 'text', required: true },
                {
                  name: 'answer',
                  type: 'textarea',
                  required: true,
                  admin: { description: '2–3 sentences. Direct answer first.' },
                },
              ],
              maxRows: 8,
            },
            {
              name: 'tableOfContents',
              type: 'checkbox',
              defaultValue: false,
              admin: {
                description: 'Auto-generate TOC. Recommended for posts >2,000 words (Masterplan §6.3).',
              },
            },
          ],
        },

        /* --------------------------- SETTINGS ---------------------------- */
        {
          label: 'Settings & Publish',
          description: 'URL slug, schedule, internal linking.',
          fields: [
            {
              name: 'slug',
              type: 'text',
              unique: true,
              required: true,
              admin: {
                description: 'URL slug. Lowercase, hyphens. e.g., "10-signs-you-need-rebrand".',
                width: '60%',
              },
            },
            {
              name: 'status',
              type: 'select',
              required: true,
              defaultValue: 'draft',
              options: [
                { label: 'Draft', value: 'draft' },
                { label: 'Scheduled', value: 'scheduled' },
                { label: 'Published', value: 'published' },
              ],
              admin: { width: '40%' },
            },
            {
              name: 'publishDate',
              type: 'date',
              required: true,
              admin: {
                description: 'When the post goes (or went) live. Drives sort order on /blog.',
                date: { pickerAppearance: 'dayAndTime', displayFormat: 'd MMM yyyy h:mm a' },
                width: '50%',
              },
            },
            {
              name: 'pillarLink',
              type: 'relationship',
              relationTo: 'pillars',
              admin: {
                description: 'Topic-cluster pillar (Masterplan §6.1). Drives "View all in [pillar]" link.',
                width: '50%',
              },
            },
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'blog-posts',
              hasMany: true,
              maxRows: 3,
              admin: {
                description: 'Up to 3 related posts shown in "Continue reading".',
              },
            },
            {
              name: 'wordCount',
              type: 'number',
              admin: { readOnly: true, description: 'Auto-calculated on save.', width: '50%' },
            },
            {
              name: 'readTime',
              type: 'text',
              admin: { readOnly: true, description: 'Auto-calculated on save.', width: '50%' },
            },
          ],
        },
      ],
    },
  ],
}
