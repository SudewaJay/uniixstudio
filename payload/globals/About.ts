import type { GlobalConfig } from 'payload'
import { anyone, isEditor } from '../access'
import { headingFields, seoField } from '../fields'
import { revalidateGlobal } from '../hooks/revalidate'
import { previewUrl } from '../utilities/preview'
import { sectionCopy } from './Homepage'

const statement = (name: string, label: string) => ({
  name,
  label,
  type: 'group' as const,
  fields: [{ name: 'eyebrow', type: 'text' as const }, headingFields('heading'), { name: 'body', type: 'textarea' as const }],
})

/** /about/ copy. Team members come from the Team collection. */
export const About: GlobalConfig = {
  slug: 'about',
  label: 'About Page',
  admin: { group: 'Website', preview: () => previewUrl('/about/') },
  versions: { drafts: true, max: 25 },
  access: { read: anyone, update: isEditor, readVersions: isEditor },
  hooks: { afterChange: [revalidateGlobal('about')] },
  fields: [
    {
      type: 'tabs',
      tabs: [
        {
          label: 'Content',
          fields: [
            {
              name: 'hero',
              type: 'group',
              fields: [{ name: 'eyebrow', type: 'text' }, headingFields('heading'), { name: 'lede', type: 'textarea' }],
            },
            {
              name: 'story',
              type: 'group',
              fields: [
                { name: 'eyebrow', type: 'text' },
                { name: 'paragraphs', type: 'array', fields: [{ name: 'paragraph', type: 'textarea', required: true }] },
              ],
            },
            statement('mission', 'Mission'),
            statement('vision', 'Vision'),
            sectionCopy('team', 'Team section'),
            sectionCopy('why', 'Why choose us'),
            {
              name: 'awards',
              label: 'Awards & certifications',
              type: 'array',
              admin: { initCollapsed: true, description: 'Shown only when at least one is added.' },
              fields: [
                {
                  type: 'row',
                  fields: [
                    { name: 'title', type: 'text', required: true, admin: { width: '50%' } },
                    { name: 'issuer', type: 'text', admin: { width: '30%' } },
                    { name: 'year', type: 'text', admin: { width: '20%' } },
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
