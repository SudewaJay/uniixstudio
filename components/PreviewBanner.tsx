/**
 * Shown only while Next.js draft mode is on (enabled by /api/preview after a
 * CMS login check). Makes it impossible to mistake draft content for live.
 */
export default function PreviewBanner() {
  return (
    <div
      role="status"
      className="fixed bottom-4 left-1/2 z-[300] -translate-x-1/2 flex items-center gap-3 rounded-full bg-ink px-5 py-2.5 text-[13px] text-white shadow-soft"
    >
      <span className="inline-block size-2 rounded-full bg-brand-4" aria-hidden="true" />
      Preview — showing unpublished drafts
      {/* Plain anchor: the route handler must run, not a client transition. */}
      {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
      <a href="/api/exit-preview" className="underline underline-offset-4 hover:text-brand-4">
        Exit preview
      </a>
    </div>
  );
}
