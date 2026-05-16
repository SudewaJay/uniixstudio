/**
 * Reset a Payload admin password from the command line.
 *
 * Usage:
 *   EMAIL='you@example.com' PASSWORD='new-strong-password' \
 *     npx tsx scripts/reset-admin-password.ts
 *
 * Or if you forgot the email too, run:
 *   npx tsx scripts/reset-admin-password.ts --list
 *   (prints all admin emails so you can pick one)
 */

import 'dotenv/config'
import { getPayload } from 'payload'
import configPromise from '../payload.config'

async function main() {
  const payload = await getPayload({ config: configPromise })

  // --list mode: dump all users so you can find yourself
  if (process.argv.includes('--list')) {
    const res = await payload.find({ collection: 'users', limit: 50 })
    if (res.docs.length === 0) {
      console.log('\n(no users in the database — register fresh at /admin)\n')
    } else {
      console.log('\nExisting users:')
      for (const u of res.docs as Array<{ id: unknown; email?: string; role?: string }>) {
        console.log(`  · ${u.email || '(no email)'}  role=${u.role || 'unknown'}  id=${u.id}`)
      }
      console.log('\nRe-run with:  EMAIL=<that-email> PASSWORD=<new-password> npx tsx scripts/reset-admin-password.ts\n')
    }
    process.exit(0)
  }

  const email = process.env.EMAIL
  const password = process.env.PASSWORD
  if (!email || !password) {
    console.error('Missing EMAIL or PASSWORD env var.')
    console.error('Run: EMAIL=you@example.com PASSWORD=newpass npx tsx scripts/reset-admin-password.ts')
    console.error('Or:  npx tsx scripts/reset-admin-password.ts --list   (to see existing emails)')
    process.exit(1)
  }

  const found = await payload.find({
    collection: 'users',
    where: { email: { equals: email } },
    limit: 1,
  })

  if (found.docs.length === 0) {
    console.error(`No user with email "${email}".`)
    console.error('Run with --list to see existing emails, or register a new user at /admin.')
    process.exit(1)
  }

  const user = found.docs[0] as { id: unknown; email?: string }

  await payload.update({
    collection: 'users',
    id: user.id as never,
    data: { password } as never,
  })

  console.log(`\n✅ Password updated for ${user.email}`)
  console.log(`   Sign in at /admin with that email + your new password.\n`)
  process.exit(0)
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
