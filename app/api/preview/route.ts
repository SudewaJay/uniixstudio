import { draftMode } from "next/headers";
import { redirect } from "next/navigation";
import { NextResponse, type NextRequest } from "next/server";
import { getPayloadClient } from "@/lib/cms/payload";

/**
 * Enables Next.js draft mode for CMS staff only. The admin "Preview" button
 * links here; the Payload session cookie is verified server-side, so the URL
 * alone grants nothing. Only same-site paths are accepted (no open redirect).
 */
export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") ?? "/";
  if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) {
    return NextResponse.json({ error: "Invalid preview path" }, { status: 400 });
  }

  const payload = await getPayloadClient();
  const { user } = await payload.auth({ headers: req.headers });
  if (!user) {
    return NextResponse.json({ error: "Sign in to the CMS to preview drafts." }, { status: 401 });
  }

  (await draftMode()).enable();
  redirect(path);
}
