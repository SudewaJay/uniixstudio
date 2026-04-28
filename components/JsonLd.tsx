/**
 * Inject a JSON-LD schema object into <head> via a server-rendered script tag.
 *
 * Usage:
 *   import { organizationSchema } from "@/lib/schema";
 *   <JsonLd data={organizationSchema()} />
 *
 * Multiple schemas can be batched via schemaGraph() to produce one @graph node.
 */
export default function JsonLd({ data }: { data: object }) {
  return (
    <script
      type="application/ld+json"
      // JSON.stringify is safe here — schema objects never contain user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
