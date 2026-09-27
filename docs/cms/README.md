# Uniix Studio CMS Documentation

Comprehensive reference for editors, developers, and deployment operators managing the Payload CMS powering the Uniix Studio website.

---

## 1. Editor Guide

The CMS is accessed at `/admin`. Sign in with your assigned staff credentials.

### Admin Groups

The left sidebar organizes content into four functional groups:

| Group | Purpose | Included Collections & Globals |
|---|---|---|
| **Content** | Core business and editorial offerings | Blog Posts, Authors, Services, Pillars, Projects, Industries, Locations, Location Service Pages, FAQs, Process, Why Points, Testimonials, Clients, Team |
| **Site** | Sitewide chrome, brand metadata, and settings | Site Settings, Nav, Footer, Promo Bar, Stats, Homepage Globals, About Globals |
| **Marketing** | Campaign landing pages and traffic routing | Landing Pages (Block-based pages at `/<slug>/`), Redirects |
| **System** | Administrative and incoming operational data | Media Library, Enquiries (Contact Submissions), Users |

### User Roles & Permissions

Server-enforced access controls govern every collection and global:

- **Super Admin (`super-admin`)**: Full access across all collections, site settings, and user management (invitations, role promotion, role downgrading).
- **Admin (`admin`)**: Access to all content, media, site settings, redirects, and inbound customer enquiries (Contact Submissions). Cannot create or manage user accounts.
- **Editor (`editor`)**: Create, edit, and publish content across all content collections and landing pages. Cannot view customer enquiries, cannot update Site Settings, and cannot create users.
- **Author (`author`)**: Restricted to drafting their own blog posts and uploading media. Cannot publish posts (must request an Editor or Admin review), and cannot edit posts created by others.
- **Public / Anonymous**: Can only query published documents where `_status: 'published'`. No draft leakage.

### Drafts, Versioning & Live Preview

1. **Auto-save & Versions**:
   - Versioned collections (`blog-posts`, `pages`, `projects`, `services`, `homepage`, `about`) maintain up to 25 revision snapshots.
   - Changes auto-save every 1.5 seconds.
2. **Draft Preview**:
   - Clicking **Preview** in the admin sidebar redirects through `/api/preview?path=...`.
   - The server verifies your active authenticated CMS session cookie (`payload-token`) and enables Next.js Draft Mode (`__prerender_bypass`).
   - A sticky **Preview Banner** appears at the top of the screen indicating draft preview mode is active, with a direct **Exit preview** link.
   - Next.js fetches the latest draft document bypassing cache.

### Scheduled Publishing

- Every publishable collection has a **Publish Date** field (`publishDate`).
- Set a future date/time on the post, then click **Publish**.
- The public site filters out items where `publishDate > NOW()`. The post will automatically become visible once its scheduled time arrives, with hourly ISR background refreshing on listing routes.

### Images: Uploads vs URLs & Alt Text

The unified Image group accommodates both external URLs (Cloudinary, legacy `/public` paths) and new Media Library uploads:

1. **Uploads**:
   - Uploading a file automatically generates responsive WebP/JPEG renditions (`thumbnail` 400w, `card` 900w, `hero` 1920w, `og` 1200x630).
   - In production with `BLOB_READ_WRITE_TOKEN`, images are hosted on Vercel Blob with immutable CDN URLs.
2. **External URLs**:
   - Paste direct URLs from Cloudinary or external asset CDNs into "or image URL".
3. **Alt Text Requirement**:
   - **Alt text is mandatory** whenever an image URL is supplied. Screen readers and SEO crawlers rely on accurate descriptive text.

### SEO Fields & Canonical Overrides

Every major content item includes the shared SEO group:
- **Meta Title**: Target ~60 characters (max 70). Defaults to the page/post title.
- **Meta Description**: Target ~155 characters (max 200). Defaults to the post excerpt or service summary.
- **Canonical Override**: Leave empty to auto-generate the canonical link (`https://www.uniixstudio.com/.../`). Only set when cross-posting or consolidating duplicate URLs.
- **No Index / No Follow**: Prevents search engines from indexing the page. Automatically excluded from `sitemap.xml`.

### Redirects (Marketing → Redirects)

Used to forward legacy paths or updated slugs to new destinations:
- **From**: Enter site-relative path (e.g. `/old-service/`). The CMS automatically normalizes this to include trailing slashes.
- **To**: Internal path (`/services/technology/`) or absolute external URL.
- **Type**: Permanent (`308`) or Temporary (`307`).
- **Loop Prevention & Integrity**: The CMS validates against self-redirects (`A → A`) and circular chains (`A → B → A`), rejecting invalid configurations with descriptive error messages.

### Landing Pages & Layout Blocks

Custom campaign pages (`/slug/`) and legal pages are built in **Pages** via modular blocks:
- **Hero**: Eyebrow, split gradient heading, lede paragraph, image, and CTAs.
- **Rich Text**: Lexical rich text with width presets (narrow, standard, wide).
- **Split Content**: Two-column layout with copy and imagery.
- **Stats / Metric Strip**: Stat counter metrics with light, warm, or dark background tones.
- **Gallery**: Multi-column masonry media showcases.
- **Process, Testimonials, FAQ Accordion, CTAs**: High-converting modular blocks reusing design system tokens.
- **Reserved Slugs**: Slugs matching coded routes (`blog`, `services`, `portfolio`, `about`, `contact`, `admin`, `api`, etc.) are prohibited.

### Inbound Enquiries (System → Enquiries)

- Form submissions from `/contact/` are saved in `contact-submissions`.
- Status defaults to `new`. Staff can update statuses to `contacted`, `qualified`, `converted`, or `archived`, and add internal notes.
- Private: Readable only by Admins and Super Admins. Never accessible via public APIs.

---

## 2. Developer Guide

### Architecture Overview

```
Frontend (Next.js 15 App Router)
   │
   ▼
lib/cms/ (Data Layer)
   │  ├── cache: unstable_cache + tag-based invalidation
   │  ├── seo: buildMetadata & JSON-LD helpers
   │  ├── payload: getPayload singleton
   │  └── domain modules: blog, services, projects, etc.
   │
   ▼
Payload CMS 3.84 (Local API)
   │  ├── payload.config.ts
   │  ├── payload/collections/
   │  ├── payload/globals/
   │  ├── payload/blocks/
   │  └── payload/hooks/ (revalidate.ts, audit.ts)
   │
   ▼
PostgreSQL (Drizzle ORM / pg)
```

### Data Layer (`lib/cms/`)

Frontend pages never import `payload` directly; they call typed functions in `lib/cms/`:
- `cmsQuery`: Wraps queries in Next.js `unstable_cache`, attaches cache tags, and bypasses cache when Draft Mode is active.
- `lib/cms/tags.ts`: Generates structured tags (e.g., `cms:blog-posts`, `cms:services`, `cms:settings`).
- `payload/hooks/revalidate.ts`: Calls `revalidateTag()` on publish-state transitions (`published` ↔ `draft`) so live pages update immediately without a full site rebuild.

### Development Workflow: Adding a Field

Follow this workflow whenever updating schemas:

1. **Edit Collection or Global**:
   - Modify the field definition in `payload/collections/` or `payload/globals/`.
2. **Regenerate Types & Import Map**:
   ```bash
   npm run cms:types
   ```
   This updates `payload-types.ts` and `app/(payload)/admin/importMap.js`.
3. **Generate Migration**:
   ```bash
   node node_modules/payload/bin.js migrate:create add_my_field
   ```
4. **Review Migration**:
   - Inspect the generated migration in `migrations/`. Confirm no unexpected `DROP TABLE` or `DROP COLUMN` statements exist.
5. **Run Migration**:
   ```bash
   npm run cms:migrate
   ```
6. **Verify Codebase**:
   ```bash
   npm run typecheck
   npm run lint
   npm run test
   ```

### The Seed Script (`scripts/cms/seed.ts`)

- **Source of Truth**: `content/**/*.mdx` and TS modules in `lib/` (blog, services, content, industries, locations).
- **Idempotent Upsert**:
  - `npm run cms:seed`: Inserts missing records only; existing records matched by slug/key are skipped.
  - `SEED_UPDATE_EXISTING=1 npm run cms:seed`: Overwrites existing records with content file data.
  - `SEED_DRY_RUN=1 npm run cms:seed`: Dry run reporting what would be created/updated without DB mutations.

---

## 3. Production Runbook

Execute these steps in order when releasing migrations to production.

### Step 1: Read-Only Schema Parity Check
Before running any migration on production, verify database parity by querying `information_schema.columns` in the production Neon database and comparing against a reference database created from the baseline migration alone:
```sql
SELECT table_name, column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public'
ORDER BY table_name, column_name;
```
Ensure all tables and columns match the expected pre-migration state.

### Step 2: Back Up and Branch the Neon Database
In the Neon Console:
1. Create a point-in-time backup of the production database branch.
2. Create an isolated branch (e.g., `pre-cms-v2-backup`) from `main` to allow immediate zero-downtime rollback if needed.

### Step 3: Run Database Migrations
From a trusted terminal with the production `DATABASE_URL` configured:
```bash
npm run cms:migrate
```
*Note on the push marker*: If prompted interactively about the legacy dev push marker (`payload_migrations` / push status), answer `yes`. The baseline migration removes the marker and establishes clean migration tracking.

Verify status:
```bash
npm run cms:migrate:status
```
Both `20260927_023825_baseline` and `*_cms_v2` must report as applied.

### Step 4: Run the Content Seed
Populate the CMS with verified content:
```bash
SEED_UPDATE_EXISTING=1 npm run cms:seed
```
*Why this is safe*: Production records were verified to have no human edits since inception. This establishes the initial synchronized state across all 14 collections and 7 globals.

### Step 5: Verify Production Environment Variables
In the Vercel Project Settings (Environment Variables), confirm the following are set:
- `DATABASE_URL` (Neon Postgres connection string)
- `PAYLOAD_SECRET` (Secure 32+ byte secret)
- `NEXT_PUBLIC_SITE_URL` (`https://www.uniixstudio.com`)
- `BLOB_READ_WRITE_TOKEN` (Vercel Blob token for media uploads)
- `RESEND_API_KEY` (Resend email API key)
- `CONTACT_TO_EMAIL` (`hey@uniixstudio.com`)
- `CONTACT_FROM` (`Uniix Studio <onboarding@resend.dev>` or verified domain)
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` (`uniix-studio`)

### Step 6: Deploy to Vercel
Trigger deployment via CLI or git push once repository permissions are configured:
```bash
npx vercel --prod
```

> **Deployment Blocker Notice**:
> Vercel Git Deploys are currently blocked because the GitHub account is connected to a different Vercel team/account. Deploys must be executed via authenticated Vercel CLI (`vercel --prod`) or the GitHub integration connection must be re-linked in the Vercel dashboard under Project Settings → Git.

### Step 7: Post-Deploy Smoke Checks
1. Log in to `/admin` with the existing administrative account (promoted to `super-admin`).
2. Verify Content dashboards:
   - Blog posts list renders all 63 articles.
   - Services list renders all 19 services across 3 pillars.
   - Projects list renders all 8 case studies.
3. Perform a quick spot-check on the live site:
   - Homepage renders full pillar service listings.
   - `/sitemap.xml` returns 200 with industry and service URLs.
   - `/robots.txt` returns 200 with `/admin/` and `/api/` disallows.
   - Submit a test enquiry on `/contact/` and verify receipt in the CMS Enquiries list.
