/**
 * Build guard (read-only). Fails the build when the database is behind the
 * code, instead of letting `next build` crash on missing tables — or worse,
 * deploy empty pages.
 *
 * Migrations are NOT run here on purpose: a Vercel build runs for every
 * preview branch, and must never change the production schema. Run them
 * deliberately with `npm run cms:migrate` (see docs/cms/README.md).
 */
import 'dotenv/config'
import pg from 'pg'
import { migrations } from '../../migrations'

const url = process.env.DATABASE_URL || process.env.DATABASE_URI || process.env.POSTGRES_URL
if (!url) {
  console.error('✖ DATABASE_URL is not set.')
  process.exit(1)
}

const client = new pg.Client({ connectionString: url })
await client.connect()
try {
  await client.query('SET SESSION CHARACTERISTICS AS TRANSACTION READ ONLY')
  const table = await client.query(`SELECT to_regclass('public.payload_migrations') AS t`)
  const rows = table.rows[0]?.t
    ? (await client.query<{ name: string; batch: number }>('SELECT name, batch FROM payload_migrations')).rows
    : []
  const applied = new Set(rows.filter((r) => Number(r.batch) > 0).map((r) => r.name))
  const pending = migrations.map((m) => m.name).filter((n) => !applied.has(n))

  if (pending.length) {
    console.error(`\n✖ Database is behind the code — ${pending.length} migration(s) not applied:`)
    for (const n of pending) console.error(`   · ${n}`)
    if (rows.some((r) => Number(r.batch) === -1)) {
      console.error('\n  This database still carries the old "dev push" marker, so the first')
      console.error('  migration needs one interactive confirmation. From a trusted machine:')
    } else {
      console.error('\n  From a trusted machine:')
    }
    console.error('    DATABASE_URL=<target db> npm run cms:migrate')
    console.error('  (take a Neon backup branch first — see docs/cms/README.md)\n')
    process.exit(1)
  }
  console.log(`✔ Database schema is current (${migrations.length} migrations applied).`)
} finally {
  await client.end()
}
