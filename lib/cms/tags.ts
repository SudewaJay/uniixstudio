/**
 * Cache-tag vocabulary shared by the CMS hooks (writers) and the frontend
 * queries (readers). Kept dependency-free so Payload config code can import it.
 *
 *   cms:<collection>           any list/aggregate built from that collection
 *   cms:<collection>:<slug>    a single document's detail query
 *   cms:global:<global>        a global
 *
 * A query that populates relationships declares the tags of every collection
 * it reads, so e.g. editing a project refreshes service pages that list it —
 * without invalidating unrelated content.
 */
export const collectionTag = (collection: string) => `cms:${collection}`
export const docTag = (collection: string, slug: string) => `cms:${collection}:${slug}`
export const globalTag = (global: string) => `cms:global:${global}`
