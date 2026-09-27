/** "2026-03-16" → "Mar 16, 2026". Tiny on purpose: safe to import from client components. */
export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}
