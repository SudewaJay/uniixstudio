/**
 * "Design that moves people." → ["Design that", "moves people."] — the site's
 * signature heading renders the trailing words in the italic gradient style.
 */
export function splitAccent(text: string, accentWords = 2): { headline: string; accentText: string } {
  const words = text.trim().split(/\s+/);
  if (words.length <= accentWords) return { headline: "", accentText: text.trim() };
  return {
    headline: words.slice(0, -accentWords).join(" "),
    accentText: words.slice(-accentWords).join(" "),
  };
}
