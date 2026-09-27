import assert from 'node:assert/strict'
import pg from 'pg'

const BASE_URL = process.env.BASE_URL || 'http://localhost:3000'
const DB_URL = process.env.DATABASE_URL || 'postgres://localhost:5432/uniix_cms_sandbox'

const htmlPages = [
  '/',
  '/about/',
  '/services/',
  '/services/design/',
  '/services/design/brand-identity/',
  '/portfolio/',
  '/portfolio/rentmycar-lk/',
  '/blog/',
  '/blog/signs-your-business-needs-a-rebrand/',
  '/industries/',
  '/industries/healthcare/',
  '/locations/',
  '/locations/negombo/',
  '/locations/negombo/web-design/',
  '/contact/',
  '/showreel/',
]

const nonHtmlRoutes = [
  '/blog/rss.xml',
  '/sitemap.xml',
  '/robots.txt',
]

function extractH1s(html) {
  return [...html.matchAll(/<h1[^>]*>([\s\S]*?)<\/h1>/gi)]
}

function extractCanonical(html) {
  const match =
    html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i) ||
    html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i)
  return match ? match[1] : null
}

function extractJsonLd(html) {
  const scripts = [...html.matchAll(/<script[^>]*type=["']application\/ld\+json["'][^>]*>([\s\S]*?)<\/script>/gi)]
  return scripts.map((s) => s[1].trim())
}

async function runSmokeTests() {
  console.log(`--- Running Smoke Tests against ${BASE_URL} ---`)

  // 1. Setup test redirect in database
  const pool = new pg.Pool({ connectionString: DB_URL })
  let redirectCreated = false
  const redirectFrom = '/smoke-test-redirect/'
  const redirectTo = '/about/'

  try {
    await pool.query(
      `INSERT INTO redirects ("from", "to", "type", "enabled", "created_at", "updated_at")
       VALUES ($1, $2, 'permanent', true, NOW(), NOW())
       ON CONFLICT ("from") DO UPDATE SET "to" = $2, "enabled" = true`,
      [redirectFrom, redirectTo],
    )
    redirectCreated = true
  } catch (err) {
    console.warn('Could not insert redirect via pg:', err.message)
  }

  try {
    // 2. Test 200s and HTML checks
    for (const path of htmlPages) {
      const url = `${BASE_URL}${path}`
      const res = await fetch(url, { redirect: 'manual' })
      assert.equal(res.status, 200, `Expected 200 for ${path}, got ${res.status}`)

      const html = await res.text()

      // Exactly one <h1>
      const h1s = extractH1s(html)
      assert.equal(h1s.length, 1, `Expected exactly one <h1> on ${path}, found ${h1s.length}`)

      // Canonical link starting with https://www.uniixstudio.com/...
      const canonical = extractCanonical(html)
      assert.ok(canonical, `Missing canonical link on ${path}`)
      assert.ok(
        canonical.startsWith('https://www.uniixstudio.com/'),
        `Canonical on ${path} must be absolute https://www.uniixstudio.com/..., got ${canonical}`,
      )

      // Valid application/ld+json
      const jsonLdScripts = extractJsonLd(html)
      assert.ok(jsonLdScripts.length > 0, `Expected at least one application/ld+json on ${path}`)
      for (const snippet of jsonLdScripts) {
        try {
          const parsed = JSON.parse(snippet)
          assert.ok(parsed, `Parsed JSON-LD is empty on ${path}`)
        } catch (e) {
          assert.fail(`Invalid application/ld+json on ${path}: ${e.message}`)
        }
      }

      console.log(`✓ 200, single <h1>, canonical & valid JSON-LD on ${path}`)
    }

    // 3. Test non-HTML 200s
    for (const path of nonHtmlRoutes) {
      const url = `${BASE_URL}${path}`
      const res = await fetch(url)
      assert.equal(res.status, 200, `Expected 200 for ${path}, got ${res.status}`)
      console.log(`✓ 200 on ${path}`)
    }

    // 4. Test 404 for /does-not-exist/
    const notFoundRes = await fetch(`${BASE_URL}/does-not-exist/`, { redirect: 'manual' })
    assert.equal(notFoundRes.status, 404, `Expected 404 for /does-not-exist/, got ${notFoundRes.status}`)
    console.log('✓ 404 on /does-not-exist/')

    // 5. Test CMS redirect (308 with Location)
    if (redirectCreated) {
      const redirectRes = await fetch(`${BASE_URL}${redirectFrom}`, { redirect: 'manual' })
      assert.ok(
        redirectRes.status === 308 || redirectRes.status === 307,
        `Expected 308/307 for redirect, got ${redirectRes.status}`,
      )
      const rawLocation = redirectRes.headers.get('location') || ''
      const target = rawLocation.split(',')[0].trim()
      assert.ok(
        target === redirectTo || target === `${BASE_URL}${redirectTo}`,
        `Expected Location header to point to ${redirectTo}, got ${rawLocation}`,
      )
      console.log(`✓ CMS redirect works: ${redirectFrom} -> ${target} (${redirectRes.status})`)
    }

    // 6. API security: /api/users and /api/contact-submissions without auth
    const usersRes = await fetch(`${BASE_URL}/api/users`)
    if (usersRes.status === 200) {
      const data = await usersRes.json()
      assert.deepEqual(data.docs || [], [], 'Unauthenticated /api/users must return empty docs, never data')
    } else {
      assert.ok(
        usersRes.status === 401 || usersRes.status === 403,
        `Expected 401/403 for unauthenticated /api/users, got ${usersRes.status}`,
      )
    }
    console.log('✓ /api/users without auth is protected')

    const contactRes = await fetch(`${BASE_URL}/api/contact-submissions`)
    if (contactRes.status === 200) {
      const data = await contactRes.json()
      assert.deepEqual(data.docs || [], [], 'Unauthenticated /api/contact-submissions must return empty docs, never data')
    } else {
      assert.ok(
        contactRes.status === 401 || contactRes.status === 403,
        `Expected 401/403 for unauthenticated /api/contact-submissions, got ${contactRes.status}`,
      )
    }
    console.log('✓ /api/contact-submissions without auth is protected')

    // 7. Preview API security:
    // /api/preview?path=/ without a session -> 401
    const previewNoAuth = await fetch(`${BASE_URL}/api/preview/?path=/`)
    assert.equal(previewNoAuth.status, 401, `Expected 401 for /api/preview/?path=/ without auth, got ${previewNoAuth.status}`)
    console.log('✓ /api/preview without auth returns 401')

    // ?path=//evil.com -> 400
    const previewEvil = await fetch(`${BASE_URL}/api/preview/?path=//evil.com`)
    assert.equal(previewEvil.status, 400, `Expected 400 for /api/preview/?path=//evil.com, got ${previewEvil.status}`)
    console.log('✓ /api/preview with open redirect path returns 400')

    // 8. robots.txt disallows /admin/ and /api/
    const robotsRes = await fetch(`${BASE_URL}/robots.txt`)
    const robotsTxt = await robotsRes.text()
    assert.ok(robotsTxt.includes('Disallow: /admin/'), 'robots.txt should disallow /admin/')
    assert.ok(robotsTxt.includes('Disallow: /api/'), 'robots.txt should disallow /api/')
    console.log('✓ robots.txt disallows /admin/ and /api/')

    // 9. sitemap.xml contains no draft slugs and includes industry pages
    const sitemapRes = await fetch(`${BASE_URL}/sitemap.xml`)
    const sitemapXml = await sitemapRes.text()
    assert.ok(!sitemapXml.includes('/draft-'), 'sitemap.xml should contain no draft slugs')
    assert.ok(sitemapXml.includes('/industries/healthcare/'), 'sitemap.xml should include /industries/healthcare/')
    assert.ok(sitemapXml.includes('/industries/'), 'sitemap.xml should include industry pages')
    console.log('✓ sitemap.xml contains no drafts and includes industry pages')

    console.log('\nAll Smoke Tests Passed Successfully!')
  } finally {
    if (redirectCreated) {
      try {
        await pool.query('DELETE FROM redirects WHERE "from" = $1', [redirectFrom])
      } catch {
        // ignore cleanup error
      }
    }
    await pool.end()
  }
}

try {
  await runSmokeTests()
} catch (err) {
  console.error('\nSmoke Test Failure:', err)
  process.exit(1)
}
