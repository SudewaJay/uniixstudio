/**
 * Lightweight loading skeleton for route-level `loading.tsx` boundaries.
 * These routes are statically prerendered, so this mainly smooths perceived
 * performance during client-side navigation transitions.
 */
export default function PageSkeleton({ cards = 6 }: { cards?: number }) {
  return (
    <div className="pt-40 pb-16 md:pt-48 md:pb-20" aria-busy="true" aria-live="polite">
      <span className="sr-only">Loading…</span>
      <div className="wrap">
        {/* Header */}
        <div className="h-3 w-28 rounded bg-line animate-pulse" />
        <div className="mt-6 h-14 w-3/4 max-w-[640px] rounded-lg2 bg-line animate-pulse" />
        <div className="mt-8 h-4 w-full max-w-[52ch] rounded bg-line-soft animate-pulse" />
        <div className="mt-3 h-4 w-2/3 max-w-[44ch] rounded bg-line-soft animate-pulse" />

        {/* Card grid */}
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: cards }).map((_, i) => (
            <div key={i} className="rounded-lg2 border border-line-soft overflow-hidden">
              <div className="aspect-[4/3] bg-line animate-pulse" />
              <div className="p-5">
                <div className="h-4 w-2/3 rounded bg-line animate-pulse" />
                <div className="mt-3 h-3 w-full rounded bg-line-soft animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
