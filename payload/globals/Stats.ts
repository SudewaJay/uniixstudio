import type { GlobalConfig } from 'payload'
import { anyone, isEditor } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'

export const Stats: GlobalConfig = {
  slug: 'stats',
  label: 'Results & Stats',
  admin: {
    group: 'Website',
    description: 'Headline figures (homepage "Results"). Only publish numbers you can substantiate.',
  },
  access: { read: anyone, update: isEditor },
  hooks: { afterChange: [revalidateGlobal('stats')] },
  fields: [
    {
      name: 'entries',
      type: 'array',
      maxRows: 4,
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
  ],
}
