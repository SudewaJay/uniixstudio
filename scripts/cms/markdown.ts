/**
 * Lexical quote nodes hold a single paragraph, and its Markdown importer
 * merges multi-line / multi-paragraph blockquotes ("a\n> b" → "ab"). Splitting
 * them into consecutive one-paragraph quotes keeps every word intact.
 * Verified against content/: all other constructs round-trip 1:1.
 */
export function normalizeMarkdownForLexical(md: string): string {
  const lines = md.replace(/\r\n/g, '\n').split('\n')
  const isQuote = (l: string | undefined) => l !== undefined && /^\s*>\s*\S/.test(l)
  const isEmptyQuote = (l: string | undefined) => l !== undefined && /^\s*>\s*$/.test(l)
  const out: string[] = []
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i]
    if (isEmptyQuote(line) && isQuote(lines[i - 1]) && isQuote(lines[i + 1])) {
      out.push('')
      continue
    }
    out.push(line)
    if (isQuote(line) && isQuote(lines[i + 1])) out.push('')
  }
  return out.join('\n')
}
