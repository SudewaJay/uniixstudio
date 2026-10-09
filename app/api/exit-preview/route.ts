import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import type { NextRequest } from "next/server";

/** Leaves draft mode and returns to the page being previewed (same-site only). */
export async function GET(req: NextRequest) {
  (await draftMode()).disable();
  const referer = req.headers.get("referer");
  let path = "/";
  if (referer) {
    const url = new URL(referer);
    if (url.host === req.nextUrl.host) path = url.pathname;
  }
  redirect(path);
}
