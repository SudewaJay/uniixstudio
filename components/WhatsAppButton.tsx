/**
 * Floating WhatsApp chat button, bottom-right on every site page.
 * Sits below the mobile nav drawer (z-190) so the open menu covers it.
 * Clicks are tracked as GA4 enquiries by ThirdPartyScripts (wa.me href).
 */
export default function WhatsAppButton({ link }: { link?: string }) {
  if (!link) return null;

  const url = new URL(link);
  if (!url.searchParams.has("text")) {
    url.searchParams.set("text", "Hi Uniix Studio, I'd like to talk about a project.");
  }

  return (
    <a
      href={url.toString()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Uniix Studio on WhatsApp"
      className="group fixed right-4 bottom-[calc(1rem+env(safe-area-inset-bottom))] sm:right-6 sm:bottom-6 z-[150] flex items-center gap-2"
    >
      <span className="pointer-events-none hidden sm:block rounded-full bg-ink px-3.5 py-2 text-[13px] font-medium text-white shadow-soft opacity-0 translate-x-2 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 group-focus-visible:opacity-100 group-focus-visible:translate-x-0">
        Chat on WhatsApp
      </span>
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_8px_24px_rgba(18,16,14,0.22)] transition-transform duration-200 group-hover:scale-105 group-active:scale-95">
        <svg viewBox="0 0 32 32" aria-hidden="true" className="h-7 w-7 fill-current">
          <path d="M16.004 3C8.82 3 3 8.82 3 16c0 2.29.6 4.53 1.74 6.5L3 29l6.68-1.75A12.94 12.94 0 0 0 16.004 29C23.18 29 29 23.18 29 16S23.18 3 16.004 3Zm0 23.64c-1.97 0-3.9-.53-5.58-1.53l-.4-.24-3.96 1.04 1.06-3.86-.26-.4A10.6 10.6 0 0 1 5.36 16c0-5.87 4.77-10.64 10.64-10.64 5.86 0 10.64 4.77 10.64 10.64 0 5.86-4.78 10.64-10.64 10.64Zm5.83-7.96c-.32-.16-1.89-.93-2.18-1.04-.29-.11-.5-.16-.72.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.35-.5-2.57-1.59-.95-.85-1.59-1.9-1.78-2.22-.19-.32-.02-.49.14-.65.14-.14.32-.37.48-.56.16-.19.21-.32.32-.53.11-.21.05-.4-.03-.56-.08-.16-.72-1.73-.98-2.37-.26-.62-.52-.54-.72-.55h-.61c-.21 0-.56.08-.85.4-.29.32-1.12 1.09-1.12 2.66s1.14 3.09 1.3 3.3c.16.21 2.25 3.43 5.45 4.81.76.33 1.35.53 1.82.67.76.24 1.46.21 2.01.13.61-.09 1.89-.77 2.15-1.52.27-.75.27-1.39.19-1.52-.08-.13-.29-.21-.61-.37Z" />
        </svg>
      </span>
    </a>
  );
}
