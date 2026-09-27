import type { ArrayField, Field, FieldHook, GroupField, TextField } from 'payload'

/** The subset of text-field options our factories let callers override. */
type TextOverrides = {
  label?: string
  required?: boolean
  defaultValue?: string
  admin?: NonNullable<TextField['admin']>
  validate?: (value: unknown) => true | string
}
import {
  maxLengthMessage,
  slugify,
  validateHref,
  validateSlug,
  validateUrl,
  validateUrlOrPath,
  validateVimeoId,
} from './validators'

/* --------------------------------- slug --------------------------------- */

/**
 * URL slug. Auto-derived from `from` when left blank, always normalised to
 * lowercase-hyphen form, unique across the collection.
 */
export function slugField(from = 'title', overrides: TextOverrides = {}): TextField {
  const deriveSlug: FieldHook = ({ value, data, originalDoc }) => {
    if (typeof value === 'string' && value.trim()) return slugify(value)
    const source = data?.[from] ?? originalDoc?.[from]
    return typeof source === 'string' && source.trim() ? slugify(source) : value
  }
  return {
    name: 'slug',
    type: 'text',
    required: true,
    unique: true,
    index: true,
    validate: validateSlug,
    hooks: { beforeValidate: [deriveSlug] },
    admin: {
      position: 'sidebar',
      description: `The URL segment. Leave blank to generate it from the ${from}. Changing it on a live page breaks old links — add a redirect.`,
    },
    ...overrides,
  } as TextField
}

/* --------------------------------- image -------------------------------- */

type ImageOpts = {
  label?: string
  required?: boolean
  description?: string
  caption?: boolean
}

/**
 * Image reference: an uploaded Media item OR an external URL (existing
 * Cloudinary / /public assets). Upload wins when both are set. Alt text is
 * required whenever an image is present.
 */
export function imageField(name: string, opts: ImageOpts = {}): GroupField {
  const { label, required = false, description, caption = false } = opts
  return {
    name,
    label,
    type: 'group',
    admin: {
      description:
        description ??
        'Upload to the Media library, or paste an existing image URL (Cloudinary or a /public path).',
    },
    fields: [
      {
        type: 'row',
        fields: [
          {
            name: 'media',
            label: 'Upload',
            type: 'upload',
            relationTo: 'media',
            admin: { width: '50%' },
          },
          {
            name: 'url',
            label: 'or image URL',
            type: 'text',
            admin: { width: '50%', placeholder: 'https://res.cloudinary.com/…' },
            validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
              if (required && !value && !siblingData?.media) return 'Add an image — upload one or paste a URL.'
              return validateUrlOrPath(value)
            },
          },
        ],
      },
      {
        name: 'alt',
        type: 'text',
        label: 'Alt text',
        admin: {
          description:
            'Describe the image for screen readers and search. Uploaded images fall back to the alt text saved in the Media library.',
        },
        validate: (value: unknown, { siblingData }: { siblingData: Record<string, unknown> }) => {
          if (siblingData?.url && !siblingData?.media && !value) return 'Alt text is required for image URLs.'
          return true
        },
      },
      ...(caption ? [{ name: 'caption', type: 'text' } as Field] : []),
    ],
  }
}

/* --------------------------------- links -------------------------------- */

export function hrefField(name = 'href', overrides: TextOverrides = {}): TextField {
  return {
    name,
    type: 'text',
    validate: validateHref,
    admin: { description: 'Internal path ("/contact"), full URL, "mailto:" or "tel:".' },
    ...overrides,
  } as TextField
}

export function linkFields(opts: { required?: boolean } = {}): Field[] {
  return [
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: opts.required, admin: { width: '40%' } },
        hrefField('href', { required: opts.required, admin: { width: '45%' } }),
        { name: 'newTab', type: 'checkbox', label: 'New tab', admin: { width: '15%' } },
      ],
    },
  ]
}

export function linksArray(name: string, overrides: Partial<ArrayField> = {}): ArrayField {
  return {
    name,
    type: 'array',
    fields: linkFields({ required: true }),
    admin: { initCollapsed: true },
    ...overrides,
  }
}

/* ------------------------------ heading pair ------------------------------ */

/** "Plain words + *italic gradient accent*" — the site's signature heading. */
export function headingFields(prefix = 'heading', required = false): Field {
  return {
    type: 'row',
    fields: [
      { name: prefix, type: 'text', required, admin: { width: '55%' } },
      {
        name: `${prefix}Accent`,
        type: 'text',
        admin: { width: '45%', description: 'Rendered in the italic gradient style.' },
      },
    ],
  }
}

/* ---------------------------------- FAQs --------------------------------- */

export function faqsField(maxRows = 10): ArrayField {
  return {
    name: 'faqs',
    label: 'FAQs',
    type: 'array',
    labels: { singular: 'FAQ', plural: 'FAQs' },
    maxRows,
    admin: {
      initCollapsed: true,
      description: 'Rendered as a visible accordion. FAQPage schema is only emitted for FAQs shown on the page.',
    },
    fields: [
      { name: 'question', type: 'text', required: true },
      {
        name: 'answer',
        type: 'textarea',
        required: true,
        admin: { description: '2–3 sentences. Lead with the direct answer.' },
      },
    ],
  }
}

/* --------------------------------- videos -------------------------------- */

export function videosField(): ArrayField {
  return {
    name: 'videos',
    type: 'array',
    admin: { initCollapsed: true, description: 'Vimeo films. Also feed the /showreel page and VideoObject schema.' },
    fields: [
      {
        type: 'row',
        fields: [
          { name: 'vimeoId', type: 'text', required: true, validate: validateVimeoId, admin: { width: '30%' } },
          { name: 'title', type: 'text', required: true, admin: { width: '40%' } },
          { name: 'client', type: 'text', required: true, admin: { width: '30%' } },
        ],
      },
      { name: 'description', type: 'textarea' },
      {
        type: 'row',
        fields: [
          { name: 'year', type: 'text', admin: { width: '50%' } },
          {
            name: 'uploadDate',
            type: 'date',
            admin: { width: '50%', description: 'Used for VideoObject.uploadDate.' },
          },
        ],
      },
    ],
  }
}

/* ----------------------------------- SEO ---------------------------------- */

/**
 * Reusable SEO group. Everything is optional — pages derive sensible
 * defaults (title, excerpt, cover image) when a field is left blank.
 */
export function seoField(): GroupField {
  return {
    name: 'seo',
    label: 'SEO',
    type: 'group',
    admin: {
      description: 'Optional overrides. Leave blank to use the page title, summary and cover image.',
    },
    fields: [
      {
        name: 'metaTitle',
        type: 'text',
        validate: maxLengthMessage(70, 'Meta title'),
        admin: { description: 'Shown in search results. ~60 characters.' },
      },
      {
        name: 'metaDescription',
        type: 'textarea',
        validate: maxLengthMessage(200, 'Meta description'),
        admin: { description: 'Shown under the title in search results. Aim for ~155 characters — longer is truncated.' },
      },
      {
        name: 'canonicalURL',
        label: 'Canonical URL',
        type: 'text',
        validate: validateUrl,
        admin: { description: 'Only set when this content is a duplicate of another URL.' },
      },
      {
        type: 'row',
        fields: [
          {
            name: 'noIndex',
            type: 'checkbox',
            label: 'Hide from search engines (noindex)',
            admin: { width: '50%' },
          },
          { name: 'noFollow', type: 'checkbox', label: 'Do not follow links (nofollow)', admin: { width: '50%' } },
        ],
      },
      {
        type: 'collapsible',
        label: 'Social sharing (Open Graph / X)',
        admin: { initCollapsed: true },
        fields: [
          { name: 'ogTitle', label: 'Social title', type: 'text' },
          { name: 'ogDescription', label: 'Social description', type: 'textarea' },
          imageField('ogImage', {
            label: 'Social image',
            description: '1200×630. Falls back to the cover image, then the site default.',
          }),
          { name: 'twitterTitle', label: 'X title (optional)', type: 'text' },
          { name: 'twitterDescription', label: 'X description (optional)', type: 'textarea' },
        ],
      },
    ],
  }
}

/* ------------------------------- ordering -------------------------------- */

export function orderField(description = 'Lower numbers appear first.'): Field {
  return {
    name: 'displayOrder',
    label: 'Order',
    type: 'number',
    defaultValue: 0,
    index: true,
    admin: { position: 'sidebar', step: 1, description },
  }
}

export function featuredField(name = 'featured', description?: string): Field {
  return {
    name,
    label: 'Featured',
    type: 'checkbox',
    defaultValue: false,
    index: true,
    admin: { position: 'sidebar', description },
  }
}
