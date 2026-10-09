import type { Field, GlobalConfig, GroupField } from 'payload'
import { anyone, isEditor } from '../access'
import { headingFields, seoField } from '../fields'
import { validateVimeoId } from '../fields/validators'
import { revalidateGlobal } from '../hooks/revalidate'
import { previewUrl } from '../utilities/preview'

/** Eyebrow + heading (+ italic accent) + support line for one section. */
export function sectionCopy(name: string, label: string, extra: Field[] = []): GroupField {
  return {
    name,
    label,
    type: 'group',
    fields: [
      { name: 'eyebrow', type: 'text' },
      headingFields('heading'),
      { name: 'support', type: 'textarea' },
      ...extra,
    ],
  }
}

/**
 * Homepage copy and curation. Layout, order and motion live in code; this
 * controls what each section says and which work it features. Empty fields
 * fall back to the built-in copy.
 */
export const Homepage: GlobalConfig = {
  slug: 'homepage',
  label: 'Homepage',
  admin: {
    group: 'Site',
    description: 'Section copy and featured content for the homepage.',
    preview: () => previewUrl('/'),
  },
  versions: { drafts: true, max: 25 },
  access: { read: anyone, update: isEditor, readVersions: isEditor },
  hooks: { afterChange: [revalidateGlobal('homepage')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Sections',
          fields: [
            {
              name: 'brandStatement',
              type: 'group',
              fields: [
                { name: 'body', type: 'textarea' },
                { name: 'trustLine', type: 'text', admin: { description: 'Above the client logos.' } },
              ],
            },
            sectionCopy('pillars', 'Services (pillars)'),
            sectionCopy('work', 'Selected work'),
            sectionCopy('industries', 'Industries'),
            sectionCopy('process', 'Process'),
            sectionCopy('why', 'Why Uniix'),
            sectionCopy('results', 'Results'),
            sectionCopy('clientStories', 'Client stories'),
            sectionCopy('insights', 'Insights'),
          ],
        },
        {
          label: 'Featured content',
          fields: [
            {
              name: 'featuredWork',
              type: 'relationship',
              relationTo: 'projects',
              hasMany: true,
              maxRows: 6,
              admin: { description: 'Projects in the "Selected work" scroller, in this order.' },
            },
            {
              name: 'pillarProof',
              type: 'array',
              maxRows: 3,
              admin: { description: 'One real project per discipline, shown beside the pillar list.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'pillar', type: 'relationship', relationTo: 'pillars', required: true, admin: { width: '33%' } },
                    { name: 'project', type: 'relationship', relationTo: 'projects', required: true, admin: { width: '33%' } },
                    {
                      name: 'evidence',
                      type: 'text',
                      required: true,
                      admin: { width: '34%', description: 'A tag the project actually carries.' },
                    },
                  ],
                },
              ],
            },
            {
              name: 'industryProof',
              type: 'array',
              admin: {
                description: 'Real work behind an industry. Industries without proof render as typographic cards.',
              },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'industry', type: 'relationship', relationTo: 'industries', required: true, admin: { width: '34%' } },
                    { name: 'project', type: 'relationship', relationTo: 'projects', admin: { width: '33%' } },
                    {
                      name: 'filmVimeoId',
                      label: 'or film (Vimeo ID)',
                      type: 'text',
                      validate: validateVimeoId,
                      admin: { width: '33%' },
                    },
                  ],
                },
              ],
            },
          ],
        },
        { label: 'SEO', fields: [seoField()] },
      ],
    },
  ],
}
