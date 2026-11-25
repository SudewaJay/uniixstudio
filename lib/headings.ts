import type { ReactNode } from "react";

/** Stable id for a heading's text, e.g. "How much? (2026)" → "how-much-2026". */
export function headingId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[*_`[\]]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

/** Plain text of rendered markdown children. */
export function textOf(node: ReactNode): string {
  if (node == null || typeof node === "boolean") return "";
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (typeof node === "object" && "props" in node) return textOf((node as { props: { children?: ReactNode } }).props.children);
  return "";
}

/** The `## ` headings of a markdown body, in order. */
export function outline(markdown: string): Array<{ id: string; text: string }> {
  return markdown
    .split("\n")
    .filter((l) => /^##\s+/.test(l))
    .map((l) => l.replace(/^##\s+/, "").replace(/[*_`]/g, "").trim())
    .map((text) => ({ id: headingId(text), text }));
}
