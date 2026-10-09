import type { ArrayField, Block, CollectionConfig } from 'payload'
import { isAdmin, isEditor, publishedOrStaff } from '../access'
import { faqsField, featuredField, imageField, orderField, seoField, slugField, videosField } from '../fields'
import { validateHexColor, validateUrl } from '../fields/validators'
import { auditFields, stampAudit } from '../hooks/audit'
import { revalidateHooks } from '../hooks/revalidate'
import { draftVersions, previewUrl } from '../utilities/preview'

/* --------------------------- narrative blocks --------------------------- */

const eyebrow = { name: 'eyebrow', type: 'text' } as const
const headline = { name: 'headline', type: 'text', required: true } as const
const lead = { name: 'lead', type: 'textarea' } as const

const titleBodyArray = (name: string, minRows = 1): ArrayField => ({
  name,
  type: 'array',
  minRows,
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'body', type: 'textarea', required: true },
  ],
})

const narrativeBlocks: Block[] = [
  {
    slug: 'narrativeBrief',
    labels: { singular: 'The brief', plural: 'The brief' },
    fields: [eyebrow, headline, lead, titleBodyArray('problems'), { name: 'footnote', type: 'textarea' }],
  },
  {
    slug: 'narrativeApproach',
    labels: { singular: 'Approach', plural: 'Approach' },
    fields: [
      eyebrow,
      headline,
      { name: 'pullQuote', type: 'textarea', required: true },
      {
        name: 'proofs',
        type: 'array',
        fields: [
          { name: 'claim', type: 'text', required: true },
          { name: 'evidence', type: 'textarea', required: true },
        ],
      },
    ],
  },
  {
    slug: 'narrativeIa',
    labels: { singular: 'Information architecture', plural: 'Information architecture' },
    fields: [
      eyebrow,
      headline,
      lead,
      {
        name: 'quadrants',
        type: 'array',
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'label', type: 'text', required: true, admin: { width: '30%' } },
              { name: 'title', type: 'text', required: true, admin: { width: '70%' } },
            ],
          },
          { name: 'description', type: 'textarea', required: true },
          { name: 'query', type: 'text', required: true, admin: { description: 'Search query this section answers.' } },
        ],
      },
    ],
  },
  {
    slug: 'narrativePillars',
    labels: { singular: 'Pillars', plural: 'Pillars' },
    fields: [eyebrow, headline, lead, titleBodyArray('items')],
  },
  {
    slug: 'narrativeOutcome',
    labels: { singular: 'Outcome', plural: 'Outcome' },
    fields: [
      eyebrow,
      headline,
      {
        name: 'stats',
        type: 'array',
        fields: [
          {
            type: 'row',
            fields: [
              { name: 'value', type: 'text', required: true, admin: { width: '30%' } },
              { name: 'label', type: 'text', required: true, admin: { width: '70%' } },
            ],
          },
          { name: 'body', type: 'textarea' },
        ],
      },
      { name: 'closing', type: 'textarea' },
    ],
  },
]

const principles = (name: string): ArrayField => ({
  name,
  type: 'array',
  admin: { initCollapsed: true },
  fields: [
    { name: 'title', type: 'text', required: true },
    { name: 'detail', type: 'textarea', required: true },
  ],
})

const imageList = (name: string, description?: string): ArrayField => ({
  name,
  type: 'array',
  admin: { initCollapsed: true, description },
  fields: [imageField('image', { required: true })],
})

/* ------------------------------ collection ------------------------------ */

/**
 * Work / case studies — /portfolio/ and /portfolio/<slug>/.
 * A project is a card on the portfolio grid; switching on "Case study page"
 * gives it a full storytelling page built from the Story/Design/Media tabs.
 */
export const Projects: CollectionConfig = {
  slug: 'projects',
  labels: { singular: 'Project', plural: 'Projects' },
  admin: {
    group: 'Portfolio',
    useAsTitle: 'title',
    defaultColumns: ['title', 'client', 'year', 'feature', '_status', 'displayOrder'],
    listSearchableFields: ['title', 'client', 'slug', 'summary'],
    description: 'Portfolio work and case studies at /portfolio/.',
    preview: (doc) => previewUrl(`/portfolio/${doc.slug}/`),
  },
  versions: draftVersions,
  access: { read: publishedOrStaff, create: isEditor, update: isEditor, delete: isAdmin, readVersions: isEditor },
  hooks: { beforeChange: [stampAudit], ...revalidateHooks('projects') },
  defaultSort: 'displayOrder',
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Overview',
          fields: [
            { name: 'title', type: 'text', required: true },
            {
              name: 'overline',
              type: 'text',
              required: true,
              admin: { description: 'Discipline line above the title, e.g. "Brand Identity · Web".' },
            },
            { name: 'headline', type: 'text', required: true },
            { name: 'summary', type: 'textarea', required: true, admin: { description: 'Card + meta description fallback.' } },
            imageField('coverImage', { label: 'Cover image', required: true }),
            {
              name: 'heroOverlay',
              type: 'checkbox',
              admin: { description: 'Overlay the title on the cover image instead of stacking them.' },
            },
            {
              type: 'row',
              fields: [
                { name: 'client', type: 'text', admin: { width: '34%' } },
                { name: 'year', type: 'number', min: 1990, max: 2100, admin: { width: '16%' } },
                { name: 'location', type: 'text', admin: { width: '50%' } },
              ],
            },
            {
              type: 'row',
              fields: [
                {
                  name: 'industryLabel',
                  label: 'Industry (display)',
                  type: 'text',
                  admin: { width: '50%', description: 'Free text, e.g. "Marketplace · Mobility".' },
                },
                {
                  name: 'liveUrl',
                  label: 'Live site URL',
                  type: 'text',
                  validate: validateUrl,
                  admin: { width: '50%' },
                },
              ],
            },
            {
              name: 'tags',
              type: 'text',
              hasMany: true,
              admin: { description: 'Discipline pills + portfolio filters, e.g. "Brand Identity".' },
            },
            {
              name: 'audienceTier',
              type: 'select',
              options: [
                { label: 'Enterprise', value: 'enterprise' },
                { label: 'Mid-market', value: 'midmarket' },
                { label: 'SMB', value: 'smb' },
                { label: 'Startup', value: 'startup' },
                { label: 'Non-profit', value: 'nonprofit' },
              ],
              admin: { description: '"Filter by business type" on /portfolio.' },
            },
            {
              name: 'serviceTags',
              label: 'Services delivered (display)',
              type: 'text',
              hasMany: true,
              admin: { description: 'Shown in the project dossier; linked to service pages when names match.' },
            },
            { name: 'deliverables', type: 'text', hasMany: true },
            {
              type: 'collapsible',
              label: 'Typographic card fallback (developer)',
              admin: {
                initCollapsed: true,
                description: 'Used only when the cover image fails. Tailwind classes — edit with care.',
              },
              fields: [
                { name: 'bg', type: 'text', defaultValue: 'from-[#0f1014] to-[#1a1d24]' },
                { name: 'bigText', type: 'text' },
                { name: 'bigClass', type: 'text', defaultValue: 'font-display font-bold tracking-[-0.04em] text-white/10' },
              ],
            },
          ],
        },
        {
          label: 'Story',
          fields: [
            {
              type: 'row',
              fields: [
                { name: 'problem', label: 'Challenge', type: 'textarea', admin: { width: '33%' } },
                { name: 'solution', type: 'textarea', admin: { width: '33%' } },
                { name: 'result', type: 'textarea', admin: { width: '34%' } },
              ],
            },
            {
              name: 'metrics',
              type: 'array',
              labels: { singular: 'Metric', plural: 'Metrics' },
              admin: { initCollapsed: true, description: 'e.g. +240% · Organic traffic.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'prefix', type: 'text', admin: { width: '15%' } },
                    { name: 'value', type: 'text', required: true, admin: { width: '20%' } },
                    { name: 'suffix', type: 'text', admin: { width: '15%' } },
                    { name: 'label', type: 'text', required: true, admin: { width: '50%' } },
                  ],
                },
                { name: 'description', type: 'textarea' },
              ],
            },
            {
              name: 'narrative',
              type: 'blocks',
              blocks: narrativeBlocks,
              admin: {
                initCollapsed: true,
                description: 'Structured storytelling. When present it replaces the long-form body.',
              },
            },
            {
              name: 'body',
              label: 'Long-form story',
              type: 'richText',
              admin: { description: 'Optional free-form case study copy.' },
            },
            {
              name: 'contentBlocks',
              label: 'Image + text sections',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                { name: 'heading', type: 'text', required: true },
                { name: 'body', type: 'textarea', required: true },
                imageField('image'),
                {
                  name: 'imagePosition',
                  type: 'select',
                  defaultValue: 'left',
                  options: ['left', 'right'],
                },
              ],
            },
            {
              name: 'testimonial',
              type: 'group',
              fields: [
                { name: 'quote', type: 'textarea' },
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', admin: { width: '50%' } },
                    { name: 'role', type: 'text', admin: { width: '50%' } },
                  ],
                },
              ],
            },
            faqsField(),
          ],
        },
        {
          label: 'Design system',
          fields: [
            { name: 'designRationale', type: 'textarea' },
            {
              name: 'colorPalette',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true, admin: { width: '50%' } },
                    { name: 'hex', type: 'text', required: true, validate: validateHexColor, admin: { width: '50%' } },
                  ],
                },
                { name: 'role', type: 'textarea', required: true },
              ],
            },
            {
              name: 'typography',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'family', type: 'text', required: true, admin: { width: '40%' } },
                    {
                      name: 'role',
                      type: 'select',
                      required: true,
                      options: ['display', 'body', 'mono'],
                      admin: { width: '30%' },
                    },
                    { name: 'weights', type: 'text', admin: { width: '30%' } },
                  ],
                },
                { name: 'sample', type: 'text' },
                { name: 'rationale', type: 'textarea' },
              ],
            },
            principles('uiPrinciples'),
            principles('motionPrinciples'),
            {
              name: 'techStack',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'name', type: 'text', required: true, admin: { width: '35%' } },
                    { name: 'category', type: 'text', admin: { width: '30%' } },
                    { name: 'url', type: 'text', validate: validateUrl, admin: { width: '35%' } },
                  ],
                },
              ],
            },
            {
              name: 'wireframes',
              type: 'array',
              admin: { initCollapsed: true },
              fields: [imageField('image', { required: true }), { name: 'caption', type: 'text' }],
            },
          ],
        },
        {
          label: 'Gallery & media',
          fields: [
            imageList('gallery'),
            {
              type: 'row',
              fields: [
                { name: 'galleryHeading', type: 'text', admin: { width: '60%', placeholder: 'Selected views' } },
                {
                  name: 'galleryAspect',
                  type: 'select',
                  defaultValue: '4/3',
                  options: [
                    { label: 'Landscape 4:3', value: '4/3' },
                    { label: 'Screen 16:10', value: '16/10' },
                    { label: 'Wide 16:9', value: '16/9' },
                    { label: 'Photo 3:2', value: '3/2' },
                    { label: 'Portrait 4:5', value: '4/5' },
                    { label: 'Square 1:1', value: '1/1' },
                  ],
                  admin: { width: '40%' },
                },
              ],
            },
            imageList('socialGallery', 'Square social / brand creatives.'),
            { name: 'socialGalleryHeading', type: 'text', admin: { placeholder: 'Social media design' } },
            {
              name: 'socialCampaign',
              type: 'group',
              admin: { description: 'Auto-sliding campaign carousel.' },
              fields: [
                { name: 'title', type: 'text' },
                { name: 'description', type: 'textarea' },
                {
                  name: 'images',
                  type: 'array',
                  admin: { initCollapsed: true },
                  fields: [imageField('image', { required: true }), { name: 'label', type: 'text' }],
                },
              ],
            },
            videosField(),
          ],
        },
        {
          label: 'Relationships',
          fields: [
            { name: 'industry', type: 'relationship', relationTo: 'industries' },
            { name: 'services', type: 'relationship', relationTo: 'services', hasMany: true },
            {
              name: 'relatedProjects',
              type: 'relationship',
              relationTo: 'projects',
              hasMany: true,
              maxRows: 3,
              filterOptions: ({ id }) => ({ id: { not_equals: id } }),
            },
          ],
        },
        { label: 'SEO', fields: [seoField()] },
      ],
    },
    slugField('title'),
    {
      name: 'hasCaseStudy',
      label: 'Case study page',
      type: 'checkbox',
      defaultValue: true,
      admin: { position: 'sidebar', description: 'Off = card only, no /portfolio/<slug>/ page.' },
    },
    featuredField('feature', 'Larger card on the portfolio grid.'),
    orderField(),
    ...auditFields,
  ],
}
