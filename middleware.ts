import { NextResponse, type NextRequest } from "next/server";

/**
 * Language routing for the Finland page ONLY (see `config.matcher`) — every
 * other route on the site is untouched and stays English.
 *
 * A visit to /finland/ is sent to the Finnish version /finland/fi/ when the
 * visitor is in Finland (Vercel's geo header) or their browser prefers
 * Finnish — unless they have explicitly chosen English with the FI/EN switch
 * (cookie). Crawlers are never redirected, so both language URLs stay
 * indexable and are linked to each other with hreflang.
 */
/** Keep in sync with FI_LANG_COOKIE in lib/finland-i18n.ts (inlined to keep
 * the middleware bundle free of page content). */
const FI_LANG_COOKIE = "uniix_fi_lang";

const BOT = /bot|crawl|spider|slurp|bingpreview|facebookexternalhit|linkedinbot|whatsapp|telegram|twitterbot|embedly|lighthouse/i;

export function middleware(req: NextRequest) {
  const choice = req.cookies.get(FI_LANG_COOKIE)?.value;
  if (choice === "en") return NextResponse.next();

  const ua = req.headers.get("user-agent") ?? "";
  if (BOT.test(ua)) return NextResponse.next();

  const country = req.headers.get("x-vercel-ip-country");
  const prefersFinnish = /^fi\b/i.test(req.headers.get("accept-language") ?? "");

  if (choice === "fi" || country === "FI" || prefersFinnish) {
    const url = req.nextUrl.clone();
    url.pathname = "/finland/fi/";
    const res = NextResponse.redirect(url, 307);
    res.headers.set("Vary", "Accept-Language, Cookie");
    return res;
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/finland", "/finland/"],
};
