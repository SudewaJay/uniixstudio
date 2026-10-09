import type { CollectionBeforeChangeHook, CollectionConfig } from 'payload'
import { editorOrOwnDoc, isStaff, publishedOrStaff } from '../access'
import { faqsField, featuredField, hrefField, imageField, seoField, slugField } from '../fields'
import { auditFields, authorsCannotPublish, stampAudit } from '../hooks/audit'
import { revalidateHooks } from '../hooks/revalidate'
import { draftVersions, previewUrl } from '../utilities/preview'

/** Count words in a Lexical document (text nodes only). */
function lexicalWordCount(node: unknown): number {
  if (!node || typeof node !== 'object') return 0
  const n = node as { text?: unknown; children?: unknown[]; root?: unknown }
  if (n.root) return lexicalWordCount(n.root)
  let count = typeof n.text === 'string' ? n.text.trim().split(/\s+/).filter(Boolean).length : 0
  if (Array.isArray(n.children)) for (const c of n.children) count += lexicalWordCount(c)
  return count
}

const computeReadingStats: CollectionBeforeChangeHook = ({ data }) => {
  if (data?.body) {
    const words = lexicalWordCount(data.body)
    data.wordCount = words
    data.readTime = `${Math.max(1, Math.round(words / 220))} min read`
  }
  return data
}

/**
 * Blog / Insights — /blog/ and /blog/<slug>/.
 * Publishing = Payload's Publish button. A post published with a future
 * "Publish date" stays hidden until that date (the listing refreshes hourly).
 */
export const BlogPosts: CollectionConfig = {
  slug: 'blog-posts',
  labels: { singular: 'Blog Post', plural: 'Blog Posts' },
  admin: {
    group: 'Content',
    useAsTitle: 'title',
    defaultColumns: ['thumbnail', 'title', 'category', 'author', 'publishDate', '_status'],
    listSearchableFields: ['title', 'slug', 'primaryKeyword', 'excerpt'],
    pagination: { defaultLimit: 25 },
    preview: (doc) => previewUrl(`/blog/${doc.slug}/`),
  },
  versions: draftVersions,
  access: {
    read: publishedOrStaff,
    create: isStaff,
    update: editorOrOwnDoc,
    delete: editorOrOwnDoc,
    readVersions: isStaff,
  },
  hooks: {
    beforeChange: [authorsCannotPublish, stampAudit, computeReadingStats],
    ...revalidateHooks('blog-posts'),
  },
  defaultSort: '-publishDate',
  fields: [
    {
      // List-view thumbnail only (type 'ui' stores nothing). See payload/admin/ThumbnailCell.tsx.
      name: 'thumbnail',
      label: 'Image',
      type: 'ui',
      admin: {
        components: { Cell: '/payload/admin/ThumbnailCell#ThumbnailCell' },
        custom: { imageField: 'coverImage' },
      },
    },
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            { name: 'title', type: 'text', required: true, admin: { description: 'The H1.' } },
            {
              name: 'excerpt',
              type: 'textarea',
              required: true,
              maxLength: 320,
              admin: { description: 'Card copy + meta description fallback. ~2 sentences.' },
            },
            imageField('coverImage', { label: 'Cover image', required: true, caption: true }),
            { name: 'body', type: 'richText', required: true },
            {
              name: 'keyTakeaways',
              type: 'text',
              hasMany: true,
              admin: { description: 'Short "in brief" answers beside the intro (editorial layout).' },
            },
            {
              name: 'ctaBlock',
              type: 'textarea',
              admin: { description: 'Optional emphasised line above "Continue reading".' },
            },
            {
              type: 'collapsible',
              label: 'Closing call to action (editorial layout)',
              admin: { initCollapsed: true },
              fields: [
                { name: 'ctaHeading', type: 'text' },
                {
                  type: 'row',
                  fields: [
                    { name: 'ctaLabel', type: 'text', admin: { width: '50%' } },
                    hrefField('ctaHref', { admin: { width: '50%' } }),
                  ],
                },
              ],
            },
            faqsField(8),
            {
              name: 'faqSchema',
              label: 'Emit FAQPage schema',
              type: 'checkbox',
              defaultValue: false,
              admin: { description: 'Google no longer shows FAQ rich results for most sites; leave off unless needed.' },
            },
          ],
        },
        {
          label: 'Relationships',
          fields: [
            {
              name: 'relatedPosts',
              type: 'relationship',
              relationTo: 'blog-posts',
              hasMany: true,
              maxRows: 3,
              filterOptions: ({ id }) => ({ id: { not_equals: id } }),
            },
            { name: 'relatedServices', type: 'relationship', relationTo: 'services', hasMany: true, maxRows: 4 },
          ],
        },
        {
          label: 'SEO',
          fields: [
            { name: 'primaryKeyword', type: 'text' },
            { name: 'secondaryKeywords', type: 'text', hasMany: true },
            seoField(),
          ],
        },
      ],
    },
    slugField('title'),
    {
      name: 'publishDate',
      type: 'date',
      required: true,
      index: true,
      defaultValue: () => new Date().toISOString(),
      admin: {
        position: 'sidebar',
        date: { pickerAppearance: 'dayAndTime' },
        description: 'Posts with a future date stay hidden until then.',
      },
    },
    {
      name: 'updatedDate',
      label: 'Last substantive update',
      type: 'date',
      admin: { position: 'sidebar', description: 'Sets dateModified in schema.' },
    },
    { name: 'author', type: 'relationship', relationTo: 'authors', required: true, admin: { position: 'sidebar' } },
    {
      name: 'category',
      type: 'select',
      required: true,
      defaultValue: 'Insights',
      index: true,
      options: ['Design', 'Technology', 'Growth', 'Insights'],
      admin: { position: 'sidebar' },
    },
    { name: 'tags', type: 'text', hasMany: true, admin: { position: 'sidebar' } },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'standard',
      options: [
        { label: 'Standard', value: 'standard' },
        { label: 'Editorial long-form (sticky contents)', value: 'editorial' },
      ],
      admin: { position: 'sidebar' },
    },
    featuredField(),
    {
      name: 'tableOfContents',
      type: 'checkbox',
      defaultValue: false,
      admin: { position: 'sidebar' },
    },
    {
      type: 'row',
      admin: { position: 'sidebar' },
      fields: [
        { name: 'wordCount', type: 'number', admin: { readOnly: true, width: '50%' } },
        { name: 'readTime', type: 'text', admin: { readOnly: true, width: '50%' } },
      ],
    },
    ...auditFields,
  ],
}
