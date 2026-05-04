import type { CollectionConfig } from 'payload'

export const Authors: CollectionConfig = {
  slug: 'authors',
  admin: {
    group: 'Editorial',
    useAsTitle: 'name',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      required: true,
    },
    {
      name: 'slug',
      type: 'text',
      unique: true,
      required: true,
      // In a real app we'd auto-generate this via beforeValidate hook based on name
    },
    {
      name: 'role',
      type: 'text',
    },
    {
      name: 'bio',
      type: 'textarea',
    },
    {
      name: 'initial',
      type: 'text',
      maxLength: 1,
    },
    {
      name: 'avatar',
      type: 'upload',
      relationTo: 'media',
    },
    {
      name: 'email',
      type: 'email',
    },
    {
      name: 'socials',
      type: 'group',
      fields: [
        { name: 'linkedin', type: 'text' },
        { name: 'twitter', type: 'text' },
        { name: 'website', type: 'text' },
      ],
    },
  ],
}
