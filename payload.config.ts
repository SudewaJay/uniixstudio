import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import path from 'path'
import { fileURLToPath } from 'url'

import { Settings } from './payload/globals/Settings'
import { Nav } from './payload/globals/Nav'
import { PromoBar } from './payload/globals/PromoBar'
import { Stats } from './payload/globals/Stats'

import { Users } from './payload/collections/Users'
import { Pillars } from './payload/collections/Pillars'
import { Services } from './payload/collections/Services'
import { BlogPosts } from './payload/collections/BlogPosts'
import { Authors } from './payload/collections/Authors'
import { Industries } from './payload/collections/Industries'
import { Projects } from './payload/collections/Projects'
import { Testimonials } from './payload/collections/Testimonials'
import { Clients } from './payload/collections/Clients'
import { Process } from './payload/collections/Process'
import { WhyPoints } from './payload/collections/WhyPoints'
import { Redirects } from './payload/collections/Redirects'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

export default buildConfig({
  admin: {
    user: 'users',
    meta: {
      titleSuffix: ' · Uniix Studio CMS',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url: 'data:image/svg+xml,' + encodeURIComponent(
            "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23F8C84A'/><stop offset='.5' stop-color='%23F07B20'/><stop offset='1' stop-color='%23E8621A'/></linearGradient></defs><rect width='100' height='100' rx='22' fill='url(%23g)'/><text x='50' y='70' font-family='system-ui' font-size='62' font-weight='900' fill='white' text-anchor='middle'>U</text></svg>"
          ),
        },
      ],
      openGraph: {
        title: 'Uniix Studio CMS',
        description: 'Content management for uniixstudio.com',
      },
    },
  },
  editor: lexicalEditor({}),
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || '',
    },
  }),
  plugins: [
    vercelBlobStorage({
      enabled: true,
      collections: {
        media: true,
      },
      token: process.env.BLOB_READ_WRITE_TOKEN || '',
    }),
  ],
  collections: [
    Users,
    Pillars,
    Services,
    BlogPosts,
    Authors,
    Industries,
    Projects,
    Testimonials,
    Clients,
    Process,
    WhyPoints,
    Redirects,
    {
      slug: 'media',
      upload: {
        imageSizes: [
          { name: 'thumbnail', width: 400, position: 'centre' },
          { name: 'card', width: 800, position: 'centre' },
          { name: 'hero', width: 1600, position: 'centre' },
          { name: 'og', width: 1200, height: 630, position: 'centre' }
        ],
        adminThumbnail: 'thumbnail',
      },
      fields: [
        {
          name: 'alt',
          type: 'text',
          required: true,
        }
      ]
    }
  ],
  globals: [
    Settings,
    Nav,
    PromoBar,
    Stats,
  ],
  secret: process.env.PAYLOAD_SECRET || 'fallback-secret',
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
})
