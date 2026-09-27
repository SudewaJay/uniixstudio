import 'dotenv/config'
import assert from 'node:assert/strict'
import { getPayload, type CollectionSlug, type Payload } from 'payload'
import config from '../payload.config'
import type { User } from '../payload-types'

const ctx = { disableRevalidate: true }

let payload: Payload
const createdUsers: number[] = []
const createdDocs: { collection: CollectionSlug; id: number | string }[] = []

async function cleanup() {
  for (const doc of createdDocs.reverse()) {
    try {
      await payload.delete({
        collection: doc.collection,
        id: doc.id,
        overrideAccess: true,
        context: ctx,
      })
    } catch {
      // ignore cleanup errors
    }
  }
  for (const id of createdUsers) {
    try {
      await payload.delete({
        collection: 'users',
        id,
        overrideAccess: true,
        context: ctx,
      })
    } catch {
      // ignore cleanup errors
    }
  }
}

async function runTests() {
  console.log('--- Starting CMS Integration Tests ---')
  payload = await getPayload({ config })

  // 1. Create temporary users with each role through Local API (overrideAccess: true)
  const timestamp = Date.now()
  const password = 'TestPassword123!'

  const superAdmin = (await payload.create({
    collection: 'users',
    data: {
      email: `test-superadmin-${timestamp}@uniixstudio.com`,
      password,
      role: 'super-admin',
      name: 'Test Super Admin',
    },
    overrideAccess: true,
    context: ctx,
  })) as User
  createdUsers.push(superAdmin.id)

  const admin = (await payload.create({
    collection: 'users',
    data: {
      email: `test-admin-${timestamp}@uniixstudio.com`,
      password,
      role: 'admin',
      name: 'Test Admin',
    },
    overrideAccess: true,
    context: ctx,
  })) as User
  createdUsers.push(admin.id)

  const editor = (await payload.create({
    collection: 'users',
    data: {
      email: `test-editor-${timestamp}@uniixstudio.com`,
      password,
      role: 'editor',
      name: 'Test Editor',
    },
    overrideAccess: true,
    context: ctx,
  })) as User
  createdUsers.push(editor.id)

  const author1 = (await payload.create({
    collection: 'users',
    data: {
      email: `test-author1-${timestamp}@uniixstudio.com`,
      password,
      role: 'author',
      name: 'Test Author 1',
    },
    overrideAccess: true,
    context: ctx,
  })) as User
  createdUsers.push(author1.id)

  const author2 = (await payload.create({
    collection: 'users',
    data: {
      email: `test-author2-${timestamp}@uniixstudio.com`,
      password,
      role: 'author',
      name: 'Test Author 2',
    },
    overrideAccess: true,
    context: ctx,
  })) as User
  createdUsers.push(author2.id)

  console.log('✓ Temporary users created (super-admin, admin, editor, author1, author2)')

  // 2. An anonymous find on blog-posts/projects/services/pages returns no drafts.
  // First, create a draft in blog-posts, projects, services, pages
  const draftPost = await payload.create({
    collection: 'blog-posts',
    data: {
      title: `Draft Post ${timestamp}`,
      category: 'Design',
      publishDate: new Date().toISOString(),
      _status: 'draft',
    },
    draft: true,
    overrideAccess: true,
    context: ctx,
  })
  createdDocs.push({ collection: 'blog-posts', id: draftPost.id })

  const draftProject = await payload.create({
    collection: 'projects',
    data: {
      title: `Draft Project ${timestamp}`,
      overline: 'Brand Identity',
      headline: 'Draft Project Headline',
      summary: 'Draft project summary',
      year: 2026,
      _status: 'draft',
    },
    draft: true,
    overrideAccess: true,
    context: ctx,
  })
  createdDocs.push({ collection: 'projects', id: draftProject.id })

  const draftService = await payload.create({
    collection: 'services',
    data: {
      name: `Draft Service ${timestamp}`,
      pageTitle: `Draft Service ${timestamp}`,
      shortDescription: 'Draft summary',
      _status: 'draft',
    },
    draft: true,
    overrideAccess: true,
    context: ctx,
  })
  createdDocs.push({ collection: 'services', id: draftService.id })

  const draftPage = await payload.create({
    collection: 'pages',
    data: {
      title: `Draft Page ${timestamp}`,
      slug: `draft-page-${timestamp}`,
      layout: [
        {
          blockType: 'hero',
          heading: 'Draft Page Lead',
        },
      ],
      _status: 'draft',
    },
    draft: true,
    overrideAccess: true,
    context: ctx,
  })
  createdDocs.push({ collection: 'pages', id: draftPage.id })

  // Query each anonymously and check no drafts returned
  for (const collection of ['blog-posts', 'projects', 'services', 'pages'] as const) {
    const res = await payload.find({
      collection,
      overrideAccess: false,
    })
    for (const doc of res.docs) {
      assert.notEqual(doc._status, 'draft', `Anonymous find on ${collection} returned a draft`)
    }
  }

  // Specifically check our created draft documents are not returned anonymously
  const anonPost = await payload.find({
    collection: 'blog-posts',
    where: { id: { equals: draftPost.id } },
    overrideAccess: false,
  })
  assert.equal(anonPost.docs.length, 0, 'Anonymous find returned created draft blog post')

  const anonProject = await payload.find({
    collection: 'projects',
    where: { id: { equals: draftProject.id } },
    overrideAccess: false,
  })
  assert.equal(anonProject.docs.length, 0, 'Anonymous find returned created draft project')

  const anonService = await payload.find({
    collection: 'services',
    where: { id: { equals: draftService.id } },
    overrideAccess: false,
  })
  assert.equal(anonService.docs.length, 0, 'Anonymous find returned created draft service')

  const anonPage = await payload.find({
    collection: 'pages',
    where: { id: { equals: draftPage.id } },
    overrideAccess: false,
  })
  assert.equal(anonPage.docs.length, 0, 'Anonymous find returned created draft page')

  console.log('✓ Anonymous find returns no drafts on blog-posts, projects, services, pages')

  // 3. Anonymous access to users, contact-submissions, redirects and authors.email is denied or hidden.
  async function assertAccessDenied(collection: CollectionSlug) {
    try {
      const res = await payload.find({
        collection,
        overrideAccess: false,
      })
      assert.equal(res.docs.length, 0, `Anonymous access to ${collection} was not empty/denied`)
    } catch (err: unknown) {
      const e = err as { status?: number; message?: string }
      assert.ok(
        e.status === 403 || /forbidden|not allowed|unauthorized/i.test(e.message || ''),
        `Expected Forbidden error for ${collection}, got: ${err}`,
      )
    }
  }

  await assertAccessDenied('users')
  await assertAccessDenied('contact-submissions')
  await assertAccessDenied('redirects')

  // Create an author with an email
  const testAuthor = await payload.create({
    collection: 'authors',
    data: {
      name: `Test Author ${timestamp}`,
      slug: `test-author-${timestamp}`,
      email: `author-private-${timestamp}@uniixstudio.com`,
    },
    overrideAccess: true,
    context: ctx,
  })
  createdDocs.push({ collection: 'authors', id: testAuthor.id })

  // Query authors anonymously: email must be hidden
  const anonAuthor = await payload.findByID({
    collection: 'authors',
    id: testAuthor.id,
    overrideAccess: false,
  })
  assert.equal((anonAuthor as { email?: string }).email, undefined, 'Anonymous access revealed author email')

  // With staff user, email should be visible
  const staffAuthor = await payload.findByID({
    collection: 'authors',
    id: testAuthor.id,
    overrideAccess: false,
    user: editor,
  })
  assert.equal(
    (staffAuthor as { email?: string }).email,
    `author-private-${timestamp}@uniixstudio.com`,
    'Staff user could not see author email',
  )

  console.log('✓ Anonymous access to users, contact-submissions, redirects, and authors.email is denied/hidden')

  // 4. An author can create a draft blog post, cannot publish it (_status: 'published' throws), and cannot update a post created by someone else.
  const authorPost = await payload.create({
    collection: 'blog-posts',
    data: {
      title: `Author Post ${timestamp}`,
      category: 'Design',
      publishDate: new Date().toISOString(),
      _status: 'draft',
    },
    draft: true,
    overrideAccess: false,
    user: author1,
    context: ctx,
  })
  createdDocs.push({ collection: 'blog-posts', id: authorPost.id })
  assert.equal(authorPost.title, `Author Post ${timestamp}`)

  // Author cannot publish it (_status: 'published' throws)
  await assert.rejects(
    async () => {
      await payload.update({
        collection: 'blog-posts',
        id: authorPost.id,
        data: {
          _status: 'published',
        },
        overrideAccess: false,
        user: author1,
        context: ctx,
      })
    },
    (err: Error) => {
      return err.message.includes('Authors can save drafts') || err.message.includes('publish')
    },
    'Author publishing should throw',
  )

  // Author cannot update a post created by someone else (author2 cannot update author1's post)
  await assert.rejects(
    async () => {
      await payload.update({
        collection: 'blog-posts',
        id: authorPost.id,
        data: {
          title: `Updated by other author ${timestamp}`,
        },
        overrideAccess: false,
        user: author2,
        context: ctx,
      })
    },
    /not found|forbidden|unauthorized/i,
    'Author2 updating author1 post should be rejected',
  )

  console.log('✓ Author permissions verified (create draft: ok, publish: rejected, update others: rejected)')

  // 5. An editor can publish content but can't create users, update Settings, or read contact submissions.
  // Editor can publish content:
  const publishedByEditor = await payload.update({
    collection: 'blog-posts',
    id: authorPost.id,
    data: {
      title: `Published by Editor ${timestamp}`,
      author: testAuthor.id,
      coverImage: {
        url: 'https://example.com/cover.jpg',
        alt: 'Cover alt text',
      },
      excerpt: 'Valid excerpt for published post',
      body: {
        root: {
          type: 'root',
          format: '',
          indent: 0,
          version: 1,
          children: [
            {
              type: 'paragraph',
              format: '',
              indent: 0,
              version: 1,
              children: [
                {
                  type: 'text',
                  text: 'Published body content',
                  format: 0,
                  mode: 'normal',
                  style: '',
                  detail: 0,
                  version: 1,
                },
              ],
              direction: 'ltr',
            },
          ],
          direction: 'ltr',
        },
      },
      _status: 'published',
    },
    overrideAccess: false,
    user: editor,
    context: ctx,
  })
  assert.equal(publishedByEditor._status, 'published')

  // Editor can't create users:
  await assert.rejects(
    async () => {
      await payload.create({
        collection: 'users',
        data: {
          email: `editor-new-user-${timestamp}@uniixstudio.com`,
          password,
          role: 'author',
        },
        overrideAccess: false,
        user: editor,
        context: ctx,
      })
    },
    /forbidden|not allowed|unauthorized/i,
    'Editor creating user should be rejected',
  )

  // Editor can't update Settings:
  await assert.rejects(
    async () => {
      await payload.updateGlobal({
        slug: 'settings',
        data: {
          tagline: 'Editor updated tagline',
        },
        overrideAccess: false,
        user: editor,
        context: ctx,
      })
    },
    /forbidden|not allowed|unauthorized/i,
    'Editor updating settings should be rejected',
  )

  // Editor can't read contact submissions:
  try {
    const editorSubs = await payload.find({
      collection: 'contact-submissions',
      overrideAccess: false,
      user: editor,
    })
    assert.equal(editorSubs.docs.length, 0, 'Editor should not be able to read contact submissions')
  } catch (err: unknown) {
    const e = err as { status?: number; message?: string }
    assert.ok(
      e.status === 403 || /forbidden|not allowed|unauthorized/i.test(e.message || ''),
      `Expected Forbidden error for editor reading contact-submissions, got: ${err}`,
    )
  }

  console.log('✓ Editor permissions verified (publish content: ok, create user: denied, update settings: denied, read submissions: denied)')

  // 6. An admin can read contact submissions but cannot create users.
  const testSubmission = await payload.create({
    collection: 'contact-submissions',
    data: {
      name: 'Test Lead',
      email: `lead-${timestamp}@example.com`,
      message: 'Hello, this is a test lead enquiry.',
      status: 'new',
    },
    overrideAccess: true,
    context: ctx,
  })
  createdDocs.push({ collection: 'contact-submissions', id: testSubmission.id })

  const adminSubs = await payload.find({
    collection: 'contact-submissions',
    where: { id: { equals: testSubmission.id } },
    overrideAccess: false,
    user: admin,
  })
  assert.equal(adminSubs.docs.length, 1)
  assert.equal(adminSubs.docs[0].email, `lead-${timestamp}@example.com`)

  // Admin cannot create users:
  await assert.rejects(
    async () => {
      await payload.create({
        collection: 'users',
        data: {
          email: `admin-new-user-${timestamp}@uniixstudio.com`,
          password,
          role: 'editor',
        },
        overrideAccess: false,
        user: admin,
        context: ctx,
      })
    },
    /forbidden|not allowed|unauthorized/i,
    'Admin creating user should be rejected',
  )

  console.log('✓ Admin permissions verified (read submissions: ok, create users: denied)')

  // 7. Only a super-admin can change a user's role.
  // Admin cannot change user role
  await assert.rejects(
    async () => {
      await payload.update({
        collection: 'users',
        id: editor.id,
        data: {
          role: 'admin',
        },
        overrideAccess: false,
        user: admin,
        context: ctx,
      })
    },
    /forbidden|not allowed|unauthorized/i,
    'Admin changing user role should be rejected',
  )

  // Editor cannot change own role (field access strips it)
  const selfUpdate = await payload.update({
    collection: 'users',
    id: editor.id,
    data: {
      role: 'super-admin',
    },
    overrideAccess: false,
    user: editor,
    context: ctx,
  })
  assert.equal(selfUpdate.role, 'editor', 'Editor should not be able to escalate own role to super-admin')

  // Super-admin can change user role
  const updatedUser = await payload.update({
    collection: 'users',
    id: author2.id,
    data: {
      role: 'editor',
    },
    overrideAccess: false,
    user: superAdmin,
    context: ctx,
  })
  assert.equal(updatedUser.role, 'editor', 'Super-admin failed to change user role')

  console.log('✓ User role changing verified (only super-admin allowed)')

  // 8. Slugs are auto-generated from the title, normalised to lowercase-hyphen, and duplicates are rejected.
  const autoSlugPost = await payload.create({
    collection: 'blog-posts',
    data: {
      title: `Slug Test Post & Special Characters ${timestamp}!`,
      category: 'Design',
      publishDate: new Date().toISOString(),
      _status: 'draft',
    },
    draft: true,
    overrideAccess: true,
    context: ctx,
  })
  createdDocs.push({ collection: 'blog-posts', id: autoSlugPost.id })
  assert.equal(
    autoSlugPost.slug,
    `slug-test-post-and-special-characters-${timestamp}`,
    'Slug was not auto-generated and normalised correctly',
  )

  // Duplicate slug rejected
  await assert.rejects(
    async () => {
      await payload.create({
        collection: 'blog-posts',
        data: {
          title: `Another Post With Duplicate Slug`,
          slug: autoSlugPost.slug,
          category: 'Design',
          publishDate: new Date().toISOString(),
          _status: 'draft',
        },
        draft: true,
        overrideAccess: true,
        context: ctx,
      })
    },
    (err: Error) => {
      return (
        err.name === 'ValidationError' ||
        /unique|duplicate|already exists/i.test(err.message)
      )
    },
    'Duplicate slug should be rejected',
  )

  console.log('✓ Slug auto-generation, normalisation, and duplicate rejection verified')

  // 9. A slug in pages that collides with a reserved section (e.g. blog) is rejected.
  await assert.rejects(
    async () => {
      await payload.create({
        collection: 'pages',
        data: {
          title: 'Blog',
          slug: 'blog',
          layout: [
            {
              blockType: 'hero',
              heading: 'Colliding Page',
            },
          ],
        },
        overrideAccess: true,
        context: ctx,
      })
    },
    (err: Error) => {
      const msg = `${err.message} ${JSON.stringify((err as { data?: unknown }).data || '')}`.toLowerCase()
      return (
        err.name === 'ValidationError' ||
        msg.includes('already a site section') ||
        msg.includes('reserved') ||
        msg.includes('validation')
      )
    },
    'Creating page with reserved slug "blog" should be rejected',
  )

  console.log('✓ Reserved page slug rejection verified')

  // 10. Redirects:
  // - from is normalised to a trailing slash.
  // - Self-redirects are rejected.
  // - A loop A→B then B→A is rejected on the second create.
  const redirectA = await payload.create({
    collection: 'redirects',
    data: {
      from: `/test-redirect-a-${timestamp}`,
      to: `/test-redirect-b-${timestamp}/`,
      type: 'permanent',
      enabled: true,
    },
    overrideAccess: true,
    context: ctx,
  })
  createdDocs.push({ collection: 'redirects', id: redirectA.id })
  assert.equal(
    redirectA.from,
    `/test-redirect-a-${timestamp}/`,
    'Redirect "from" should be normalised to a trailing slash',
  )

  // Self-redirect rejected
  await assert.rejects(
    async () => {
      await payload.create({
        collection: 'redirects',
        data: {
          from: `/self-redirect-${timestamp}/`,
          to: `/self-redirect-${timestamp}/`,
          type: 'permanent',
          enabled: true,
        },
        overrideAccess: true,
        context: ctx,
      })
    },
    /cannot point to itself/i,
    'Self-redirect should be rejected',
  )

  // Loop A -> B then B -> A rejected
  await assert.rejects(
    async () => {
      await payload.create({
        collection: 'redirects',
        data: {
          from: `/test-redirect-b-${timestamp}/`,
          to: `/test-redirect-a-${timestamp}/`,
          type: 'permanent',
          enabled: true,
        },
        overrideAccess: true,
        context: ctx,
      })
    },
    /redirect loop/i,
    'Loop redirect should be rejected on second create',
  )

  console.log('✓ Redirects verified (normalised trailing slash, self-redirect rejected, loop rejected)')

  // 11. A location page with a duplicate (location, service) pair is rejected.
  const existingLP = await payload.find({
    collection: 'location-pages',
    limit: 1,
    depth: 0,
    overrideAccess: true,
    context: ctx,
  })
  assert.ok(existingLP.docs.length > 0, 'Should have at least one existing location page')
  const locId = typeof existingLP.docs[0].location === 'object' ? existingLP.docs[0].location.id : existingLP.docs[0].location
  const srvId = typeof existingLP.docs[0].service === 'object' ? existingLP.docs[0].service.id : existingLP.docs[0].service

  await assert.rejects(
    async () => {
      await payload.create({
        collection: 'location-pages',
        data: {
          location: locId,
          service: srvId,
          h1: `Duplicate LP ${timestamp}`,
          serviceLabel: 'Service Label',
          lede: 'Lede text',
          intro: [{ paragraph: 'Intro paragraph' }],
          benefits: [{ title: 'Benefit 1', body: 'Benefit body' }],
        },
        overrideAccess: true,
        context: ctx,
      })
    },
    /already exists/i,
    'Duplicate (location, service) pair should be rejected',
  )

  console.log('✓ Duplicate (location, service) location page rejection verified')

  // 12. The image group requires alt text when a URL is given.
  await assert.rejects(
    async () => {
      await payload.create({
        collection: 'authors',
        data: {
          name: `No Alt Author ${timestamp}`,
          slug: `no-alt-author-${timestamp}`,
          avatar: {
            url: 'https://example.com/avatar.jpg',
            alt: '',
          },
        },
        overrideAccess: true,
        context: ctx,
      })
    },
    (err: Error) => {
      const msg = `${err.message} ${JSON.stringify((err as { data?: unknown }).data || '')}`.toLowerCase()
      return (
        err.name === 'ValidationError' ||
        msg.includes('alt text is required') ||
        msg.includes('validation') ||
        msg.includes('alt')
      )
    },
    'Image URL without alt text should be rejected',
  )

  console.log('✓ Image group requiring alt text when URL is given verified')

  console.log('\nAll CMS Integration Tests Passed Successfully!')
}

try {
  await runTests()
} catch (err) {
  console.error('\nCMS Integration Test Failure:', err)
  process.exitCode = 1
} finally {
  console.log('Cleaning up test data...')
  await cleanup()
  console.log('Cleanup complete.')
  if (process.exitCode === 1) {
    process.exit(1)
  }
  process.exit(0)
}
