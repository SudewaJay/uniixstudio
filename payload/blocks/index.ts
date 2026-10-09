import type { Block, Field } from 'payload'
import { headingFields, hrefField, imageField, linkFields } from '../fields'
import { validateVimeoId } from '../fields/validators'

/**
 * Landing-page blocks. Content only — every block is rendered by a React
 * component in components/blocks/ that owns layout, motion and styling.
 *
 * Deliberately excluded: a raw "Custom HTML" block (XSS risk; ask a developer
 * for a new block instead), pricing tables (live on service documents) and a
 * newsletter form (no list provider is configured).
 */

const sectionIntro: Field[] = [
  { name: 'eyebrow', type: 'text' },
  headingFields('heading'),
  { name: 'intro', type: 'textarea' },
]

const tone: Field = {
  name: 'tone',
  type: 'select',
  defaultValue: 'light',
  options: [
    { label: 'Light', value: 'light' },
    { label: 'Warm', value: 'warm' },
    { label: 'Dark', value: 'dark' },
  ],
  admin: { description: 'Background treatment from the design system.' },
}

const limit = (max: number, def: number): Field => ({
  name: 'limit',
  type: 'number',
  min: 1,
  max,
  defaultValue: def,
})

export const HeroBlock: Block = {
  slug: 'hero',
  interfaceName: 'HeroBlock',
  fields: [
    { name: 'eyebrow', type: 'text' },
    headingFields('heading', true),
    { name: 'lede', type: 'textarea' },
    imageField('image'),
    { name: 'primaryCta', type: 'group', fields: linkFields() },
    { name: 'secondaryCta', type: 'group', fields: linkFields() },
  ],
}

export const RichTextBlock: Block = {
  slug: 'richText',
  interfaceName: 'RichTextBlock',
  fields: [
    { name: 'content', type: 'richText', required: true },
    {
      name: 'width',
      type: 'select',
      defaultValue: 'prose',
      options: [
        { label: 'Reading width', value: 'prose' },
        { label: 'Wide', value: 'wide' },
      ],
    },
  ],
}

export const MediaBlock: Block = {
  slug: 'media',
  labels: { singular: 'Image / Video', plural: 'Images / Videos' },
  interfaceName: 'MediaBlock',
  fields: [
    imageField('image', { caption: true, description: 'Image, or the poster frame when a Vimeo ID is set.' }),
    { name: 'vimeoId', type: 'text', validate: validateVimeoId, admin: { description: 'Optional Vimeo film.' } },
    {
      name: 'size',
      type: 'select',
      defaultValue: 'wide',
      options: [
        { label: 'Contained', value: 'contained' },
        { label: 'Wide', value: 'wide' },
        { label: 'Full bleed', value: 'full' },
      ],
    },
  ],
}

export const SplitContentBlock: Block = {
  slug: 'splitContent',
  interfaceName: 'SplitContentBlock',
  fields: [
    ...sectionIntro,
    { name: 'body', type: 'textarea', required: true },
    imageField('image', { required: true }),
    {
      name: 'imagePosition',
      type: 'select',
      defaultValue: 'right',
      options: ['left', 'right'],
    },
    { name: 'cta', type: 'group', fields: linkFields() },
    tone,
  ],
}

export const StatsBlock: Block = {
  slug: 'stats',
  interfaceName: 'StatsBlock',
  fields: [
    ...sectionIntro,
    {
      name: 'items',
      type: 'array',
      minRows: 1,
      maxRows: 6,
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'value', type: 'text', required: true, admin: { width: '30%' } },
            { name: 'label', type: 'text', required: true, admin: { width: '70%' } },
          ],
        },
        { name: 'description', type: 'textarea' },
      ],
    },
    tone,
  ],
}

export const ServicesGridBlock: Block = {
  slug: 'servicesGrid',
  interfaceName: 'ServicesGridBlock',
  fields: [
    ...sectionIntro,
    {
      name: 'services',
      type: 'relationship',
      relationTo: 'services',
      hasMany: true,
      admin: { description: 'Pick services, or leave empty to show featured ones.' },
    },
    limit(12, 6),
  ],
}

export const ProjectsGridBlock: Block = {
  slug: 'projectsGrid',
  interfaceName: 'ProjectsGridBlock',
  fields: [
    ...sectionIntro,
    {
      name: 'projects',
      type: 'relationship',
      relationTo: 'projects',
      hasMany: true,
      admin: { description: 'Pick projects, or leave empty to show the latest featured work.' },
    },
    limit(12, 4),
  ],
}

export const TestimonialsBlock: Block = {
  slug: 'testimonials',
  interfaceName: 'TestimonialsBlock',
  fields: [
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'testimonials',
      hasMany: true,
      admin: { description: 'Leave empty to show featured testimonials.' },
    },
  ],
}

export const ClientLogosBlock: Block = {
  slug: 'clientLogos',
  interfaceName: 'ClientLogosBlock',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'clients',
      type: 'relationship',
      relationTo: 'clients',
      hasMany: true,
      admin: { description: 'Leave empty to show featured clients.' },
    },
  ],
}

export const IndustriesBlock: Block = {
  slug: 'industries',
  labels: { singular: 'Industries', plural: 'Industries' },
  interfaceName: 'IndustriesBlock',
  fields: [...sectionIntro, { name: 'industries', type: 'relationship', relationTo: 'industries', hasMany: true }],
}

export const ProcessBlock: Block = {
  slug: 'process',
  interfaceName: 'ProcessBlock',
  admin: { disableBlockName: true },
  fields: [
    ...sectionIntro,
    {
      name: 'stages',
      type: 'relationship',
      relationTo: 'process',
      hasMany: true,
      admin: { description: 'Leave empty to show every Process Stage in order.' },
    },
  ],
}

export const FAQBlock: Block = {
  slug: 'faq',
  labels: { singular: 'FAQ', plural: 'FAQs' },
  interfaceName: 'FAQBlock',
  fields: [
    ...sectionIntro,
    {
      name: 'faqs',
      type: 'relationship',
      relationTo: 'faqs',
      hasMany: true,
      required: true,
      admin: { description: 'From the FAQ bank. Only these are emitted as FAQPage schema.' },
    },
  ],
}

export const CTABlock: Block = {
  slug: 'cta',
  labels: { singular: 'Call to action', plural: 'Calls to action' },
  interfaceName: 'CTABlock',
  fields: [
    headingFields('heading', true),
    { name: 'body', type: 'textarea' },
    {
      type: 'row',
      fields: [
        { name: 'label', type: 'text', required: true, defaultValue: 'Start a project', admin: { width: '50%' } },
        hrefField('href', { required: true, defaultValue: '/contact', admin: { width: '50%' } }),
      ],
    },
  ],
}

export const GalleryBlock: Block = {
  slug: 'gallery',
  interfaceName: 'GalleryBlock',
  fields: [
    { name: 'heading', type: 'text' },
    {
      name: 'images',
      type: 'array',
      minRows: 1,
      fields: [imageField('image', { required: true, caption: true })],
    },
    {
      name: 'columns',
      type: 'select',
      defaultValue: '3',
      options: ['2', '3', '4'],
    },
  ],
}

export const TeamBlock: Block = {
  slug: 'team',
  interfaceName: 'TeamBlock',
  fields: [
    ...sectionIntro,
    {
      name: 'members',
      type: 'relationship',
      relationTo: 'team',
      hasMany: true,
      admin: { description: 'Leave empty to show featured team members.' },
    },
  ],
}

export const ContactFormBlock: Block = {
  slug: 'contactForm',
  interfaceName: 'ContactFormBlock',
  fields: [
    ...sectionIntro,
    {
      name: 'source',
      type: 'text',
      admin: { description: 'Tag stored with submissions from this form, e.g. "finland-campaign".' },
    },
  ],
}

export const pageBlocks: Block[] = [
  HeroBlock,
  RichTextBlock,
  MediaBlock,
  SplitContentBlock,
  StatsBlock,
  ServicesGridBlock,
  ProjectsGridBlock,
  TestimonialsBlock,
  ClientLogosBlock,
  IndustriesBlock,
  ProcessBlock,
  FAQBlock,
  CTABlock,
  GalleryBlock,
  TeamBlock,
  ContactFormBlock,
]
