/**
 * Contact form handler — wired to Resend.
 *
 * Requires env vars:
 *   RESEND_API_KEY   — get from https://resend.com (free 3,000/mo)
 *   CONTACT_TO_EMAIL — where enquiries land (defaults to hey@uniixstudio.com)
 *   CONTACT_FROM     — verified sender, e.g. "Uniix Studio <noreply@uniixstudio.com>"
 *                      (requires the sending domain to be verified in Resend with
 *                      SPF + DKIM + DMARC DNS records)
 */

import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type Payload = {
  name?: string;
  email?: string;
  company?: string;
  service?: string;
  budget?: string;
  message?: string;
  /** Honeypot — must be empty. Real users won't see this field. */
  website?: string;
};

function escapeHtml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function nl2br(s: string): string {
  return escapeHtml(s).replace(/\n/g, "<br>");
}

export async function POST(req: Request) {
  let data: Payload;
  try {
    data = (await req.json()) as Payload;
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  // Honeypot — bots fill every field; humans don't see this one.
  if (data.website && data.website.trim() !== "") {
    // Silently accept so the bot thinks it worked, but do nothing.
    return NextResponse.json({ ok: true });
  }

  const name = (data.name ?? "").trim();
  const email = (data.email ?? "").trim();
  const message = (data.message ?? "").trim();
  const company = (data.company ?? "").trim();
  const service = (data.service ?? "").trim();
  const budget = (data.budget ?? "").trim();

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Name, email and message are required." },
      { status: 400 },
    );
  }
  // Lightweight email shape check (more permissive than rfc-strict to avoid false negatives)
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { ok: false, error: "Please enter a valid email address." },
      { status: 400 },
    );
  }
  if (message.length < 10) {
    return NextResponse.json(
      { ok: false, error: "Tell us a little more about the project." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Message is a bit long — please trim under 5,000 characters." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("[contact] RESEND_API_KEY not set");
    return NextResponse.json(
      { ok: false, error: "Email service not configured." },
      { status: 500 },
    );
  }

  const to = process.env.CONTACT_TO_EMAIL || "hey@uniixstudio.com";
  const from = process.env.CONTACT_FROM || "Uniix Studio <onboarding@resend.dev>";

  const resend = new Resend(apiKey);

  const subject = `New project enquiry — ${name}`;
  const text = [
    `Name:    ${name}`,
    `Email:   ${email}`,
    `Company: ${company || "—"}`,
    `Service: ${service || "—"}`,
    `Budget:  ${budget || "—"}`,
    "",
    "Message:",
    message,
  ].join("\n");

  const html = `
<!doctype html>
<html><body style="font-family:-apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;background:#fafafa;padding:24px;color:#0F1B2D">
  <table cellpadding="0" cellspacing="0" style="max-width:600px;margin:auto;background:#ffffff;border:1px solid #e5e7eb;border-radius:12px;overflow:hidden">
    <tr><td style="padding:24px 28px;border-bottom:1px solid #f1f5f9">
      <div style="font:600 12px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.18em;text-transform:uppercase;color:#64748b">New enquiry</div>
      <div style="font:600 22px/1.2 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;margin-top:6px">${escapeHtml(name)}</div>
    </td></tr>
    <tr><td style="padding:20px 28px">
      <table cellpadding="0" cellspacing="0" style="width:100%;font:400 14px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">
        <tr><td style="color:#64748b;width:120px;padding:4px 0">Email</td><td style="padding:4px 0"><a href="mailto:${escapeHtml(email)}" style="color:#0F1B2D">${escapeHtml(email)}</a></td></tr>
        <tr><td style="color:#64748b;padding:4px 0">Company</td><td style="padding:4px 0">${escapeHtml(company || "—")}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0">Service</td><td style="padding:4px 0">${escapeHtml(service || "—")}</td></tr>
        <tr><td style="color:#64748b;padding:4px 0">Budget</td><td style="padding:4px 0">${escapeHtml(budget || "—")}</td></tr>
      </table>
    </td></tr>
    <tr><td style="padding:8px 28px 28px">
      <div style="font:600 11px/1 ui-monospace,SFMono-Regular,Menlo,monospace;letter-spacing:.18em;text-transform:uppercase;color:#64748b;margin-bottom:10px">Message</div>
      <div style="font:400 15px/1.6 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif">${nl2br(message)}</div>
    </td></tr>
  </table>
  <p style="text-align:center;color:#94a3b8;font:400 12px/1.5 -apple-system,BlinkMacSystemFont,Segoe UI,sans-serif;margin-top:16px">
    Sent from the uniixstudio.com contact form · reply directly to this email to respond
  </p>
</body></html>`;

  try {
    const { error } = await resend.emails.send({
      from,
      to,
      subject,
      text,
      html,
      replyTo: email, // hitting "reply" goes straight to the sender
    });
    if (error) {
      console.error("[contact] resend error", error);
      return NextResponse.json(
        { ok: false, error: "Could not send right now. Please email us directly." },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[contact] exception", err);
    return NextResponse.json(
      { ok: false, error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
