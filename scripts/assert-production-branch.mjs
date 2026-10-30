/**
 * Build guard. Fails a Vercel production build that isn't from `main`.
 *
 * "Redeploy" / "Promote to Production" on a preview rebuilds that branch with
 * production settings, so anything merged to main but missing from the branch
 * silently disappears from the live site (this took the design.uniixstudio.com
 * pitch links down once). Production must always come from main.
 *
 * Emergency override: set ALLOW_PRODUCTION_FROM_BRANCH=1 on the deployment.
 */
const PRODUCTION_BRANCH = 'main'

const env = process.env.VERCEL_ENV
const ref = process.env.VERCEL_GIT_COMMIT_REF

if (env !== 'production') process.exit(0)

if (!ref) {
  console.warn('⚠ Production build without git metadata; cannot verify the branch.')
  process.exit(0)
}

if (ref !== PRODUCTION_BRANCH && process.env.ALLOW_PRODUCTION_FROM_BRANCH !== '1') {
  console.error(
    `✖ Production builds must come from "${PRODUCTION_BRANCH}", but this one is from "${ref}".\n` +
      `  Merge the PR into ${PRODUCTION_BRANCH} instead of redeploying or promoting a preview.\n` +
      '  Emergency override: ALLOW_PRODUCTION_FROM_BRANCH=1',
  )
  process.exit(1)
}
