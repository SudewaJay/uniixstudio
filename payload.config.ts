import { buildConfig } from 'payload'
import { postgresAdapter } from '@payloadcms/db-postgres'
import { BlocksFeature, CodeBlock, EXPERIMENTAL_TableFeature, lexicalEditor } from '@payloadcms/richtext-lexical'
import { vercelBlobStorage } from '@payloadcms/storage-vercel-blob'
import sharp from 'sharp'
import path from 'path'
import { fileURLToPath } from 'url'

import { resendAdapter } from './payload/email/resend'

import { About } from './payload/globals/About'
import { Footer } from './payload/globals/Footer'
import { Homepage } from './payload/globals/Homepage'
import { Nav } from './payload/globals/Nav'
import { PromoBar } from './payload/globals/PromoBar'
import { Settings } from './payload/globals/Settings'
import { Stats } from './payload/globals/Stats'

import { Authors } from './payload/collections/Authors'
import { BlogPosts } from './payload/collections/BlogPosts'
import { Clients } from './payload/collections/Clients'
import { ContactSubmissions } from './payload/collections/ContactSubmissions'
import { FAQs } from './payload/collections/FAQs'
import { Industries } from './payload/collections/Industries'
import { LocationPages } from './payload/collections/LocationPages'
import { Locations } from './payload/collections/Locations'
import { Media } from './payload/collections/Media'
import { Pages } from './payload/collections/Pages'
import { Pillars } from './payload/collections/Pillars'
import { Process } from './payload/collections/Process'
import { Projects } from './payload/collections/Projects'
import { Redirects } from './payload/collections/Redirects'
import { Services } from './payload/collections/Services'
import { Team } from './payload/collections/Team'
import { Testimonials } from './payload/collections/Testimonials'
import { Users } from './payload/collections/Users'
import { WhyPoints } from './payload/collections/WhyPoints'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

function requireSecret(): string {
  const secret = process.env.PAYLOAD_SECRET
  if (!secret) {
    throw new Error(
      'PAYLOAD_SECRET is not set. Refusing to start with an insecure fallback — ' +
        'set it in your environment (e.g. Vercel project env vars).',
    )
  }
  return secret
}

export default buildConfig({
  secret: requireSecret(),
  admin: {
    user: Users.slug,
    importMap: { baseDir: dirname },
    components: { beforeDashboard: ['/payload/admin/Dashboard#Dashboard'] },
    meta: {
      titleSuffix: ' · Uniix Studio CMS',
      icons: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          url:
            'data:image/svg+xml,' +
            encodeURIComponent(
              "<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'><stop offset='0' stop-color='%23F8C84A'/><stop offset='.5' stop-color='%23F07B20'/><stop offset='1' stop-color='%23E8621A'/></linearGradient></defs><rect width='100' height='100' rx='22' fill='url(%23g)'/><text x='50' y='70' font-family='system-ui' font-size='62' font-weight='900' fill='white' text-anchor='middle'>U</text></svg>",
            ),
        },
      ],
      openGraph: { title: 'Uniix Studio CMS', description: 'Content management for uniixstudio.com' },
    },
  },

  // Admin sidebar order follows this list: Content → Marketing → System, with
  // the Site globals below.
  // Order sets the sidebar: Inbox, Website, Portfolio, Blog, Services,
  // Local SEO, Admin (groups appear in the order they are first used).
  collections: [
    ContactSubmissions,
    Pages,
    Team,
    Projects,
    Clients,
    Testimonials,
    BlogPosts,
    Authors,
    Pillars,
    Services,
    Industries,
    Process,
    WhyPoints,
    FAQs,
    Locations,
    LocationPages,
    Media,
    Users,
    Redirects,
  ],
  globals: [Homepage, About, Nav, Footer, PromoBar, Stats, Settings],

  // Default features + tables and fenced code: together these round-trip every
  // construct used in the existing Markdown content (verified by the seed).
  editor: lexicalEditor({
    features: ({ defaultFeatures }) => [
      ...defaultFeatures,
      EXPERIMENTAL_TableFeature(),
      BlocksFeature({ blocks: [CodeBlock({ defaultLanguage: 'plaintext', languages: { plaintext: 'Plain text', ts: 'TypeScript', js: 'JavaScript', html: 'HTML', css: 'CSS', json: 'JSON', bash: 'Shell' } })] }),
    ],
  }),

  db: postgresAdapter({
    // Schema changes go through reviewed migrations only — never auto-push.
    push: false,
    migrationDir: path.resolve(dirname, 'migrations'),
    pool: {
      // Vercel/Neon provides DATABASE_URL; DATABASE_URI is Payload's convention.
      connectionString: process.env.DATABASE_URL || process.env.DATABASE_URI || process.env.POSTGRES_URL || '',
    },
  }),

  sharp,
  upload: { limits: { fileSize: 25 * 1024 * 1024 } }, // 25 MB

  // The site uses the Local API and REST only.
  graphQL: { disable: true },

  email: process.env.RESEND_API_KEY
    ? resendAdapter(process.env.RESEND_API_KEY, process.env.CONTACT_FROM || 'Uniix Studio <noreply@uniixstudio.com>')
    : undefined,

  plugins: [
    vercelBlobStorage({
      // Without a token (local dev) uploads use the local filesystem; the
      // plugin's fields are always inserted so the DB schema never differs.
      enabled: Boolean(process.env.BLOB_READ_WRITE_TOKEN),
      alwaysInsertFields: true,
      token: process.env.BLOB_READ_WRITE_TOKEN,
      collections: { media: { disablePayloadAccessControl: true } },
    }),
  ],

  typescript: { outputFile: path.resolve(dirname, 'payload-types.ts') },
})
