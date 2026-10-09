import type { GlobalConfig } from 'payload'
import { anyone, isEditor } from '../access'
import { revalidateGlobal } from '../hooks/revalidate'

export const PromoBar: GlobalConfig = {
  slug: 'promo-bar',
  label: 'Promo Bar',
  admin: { group: 'Website', description: 'The thin rotating bar at the very top of every page.' },
  access: { read: anyone, update: isEditor },
  hooks: { afterChange: [revalidateGlobal('promo-bar')] },
  fields: [
    { name: 'enabled', type: 'checkbox', defaultValue: true },
    {
      name: 'taglines',
      type: 'array',
      maxRows: 8,
      fields: [{ name: 'text', type: 'text', required: true, maxLength: 90 }],
    },
    {
      name: 'rotateInterval',
      type: 'number',
      defaultValue: 3800,
      min: 1500,
      max: 20000,
      admin: { step: 100, description: 'Milliseconds between taglines.' },
    },
  ],
}
