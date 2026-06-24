"use client";

import { useState } from "react";
import { site } from "@/lib/content";

const services = [
  "Brand identity",
  "Website design & development",
  "UI/UX design",
  "Performance marketing",
  "SEO",
  "Something else",
];

const budgets = [
  "Under LKR 100k",
  "LKR 100k – 500k",
  "LKR 500k – 1M",
  "LKR 1M+",
  "Not sure yet",
];

export default function ContactForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    message: "",
    /** Honeypot — bots fill every field, humans never see this. */
    website: "",
  });
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof typeof form>(key: K, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = (await res.json().catch(() => ({}))) as {
        ok?: boolean;
        error?: string;
      };
      if (!res.ok || !data.ok) {
        setError(
          data.error ??
            "Could not send right now. Please email us at hey@uniixstudio.com.",
        );
        setSubmitting(false);
        return;
      }
      setSent(true);
    } catch {
      setError(
        "Network error — please try again, or email us directly at hey@uniixstudio.com.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div role="status" aria-live="polite" className="bg-bg-paper border border-line rounded-lg2 p-10 md:p-14 text-center">
        <div className="w-16 h-16 rounded-full bg-brand-grad text-white grid place-items-center mx-auto mb-6">
          <svg
            width="28"
            height="28"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <h3
          className="font-display font-medium mb-3"
          style={{ fontSize: "clamp(28px,3vw,36px)", letterSpacing: "-0.02em" }}
        >
          Your message is on its way.
        </h3>
        <p className="text-ink-2 text-[16px] leading-[1.6] max-w-[44ch] mx-auto">
          We&apos;ll be in touch within 24 hours. Want to chat sooner? WhatsApp us
          at{" "}
          <a href={site.whatsappLink} className="underline">
            {site.whatsapp}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={onSubmit}
      className="bg-bg-paper border border-line rounded-lg2 p-8 md:p-12 flex flex-col gap-6"
    >
      {/* Honeypot — hidden from humans, catches naive bots */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-10000px",
          width: 1,
          height: 1,
          overflow: "hidden",
        }}
      >
        <label htmlFor="contact-website">Website (leave blank)</label>
        <input
          id="contact-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(e) => update("website", e.target.value)}
        />
      </div>

      {error && (
        <div
          role="alert"
          className="bg-red-50 border border-red-200 text-red-800 rounded-lg2 px-4 py-3 text-[14px]"
        >
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-6">
        <Field
          label="Your name"
          required
          value={form.name}
          onChange={(v) => update("name", v)}
          placeholder="Your full name"
          autoComplete="name"
        />
        <Field
          label="Email"
          type="email"
          required
          value={form.email}
          onChange={(v) => update("email", v)}
          placeholder="you@company.com"
          autoComplete="email"
        />
      </div>

      <Field
        label="Company"
        value={form.company}
        onChange={(v) => update("company", v)}
        placeholder="Optional"
        autoComplete="organization"
      />

      <SelectField
        label="What can we help with?"
        value={form.service}
        onChange={(v) => update("service", v)}
        options={services}
      />

      <SelectField
        label="Project budget"
        value={form.budget}
        onChange={(v) => update("budget", v)}
        options={budgets}
      />

      <div className="flex flex-col gap-2">
        <label htmlFor="project-message" className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
          Tell us about your project <span aria-hidden="true">*</span>
        </label>
        <textarea
          id="project-message"
          required
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          rows={5}
          placeholder="A few sentences on what you're trying to achieve, your timeline, and anything we should know."
          className="bg-bg border border-line rounded px-4 py-3.5 text-[15px] leading-[1.55] resize-y focus:outline-none focus:border-brand-3 focus:ring-2 focus:ring-brand-3/20 transition-all min-h-[120px]"
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-2">
        <p className="text-xs text-ink-mute max-w-[44ch]">
          By submitting, you agree to be contacted by Uniix Studio about your
          enquiry. We never share your details.
        </p>
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary self-start md:self-auto disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? "Sending…" : "Send enquiry ↗"}
        </button>
      </div>
    </form>
  );
}

function Field({
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  autoComplete,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  const id = label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        className="bg-bg border border-line rounded px-4 py-3.5 text-[15px] min-h-[44px] focus:outline-none focus:border-brand-3 focus:ring-2 focus:ring-brand-3/20 transition-all"
      />
    </div>
  );
}

function SelectField({
  label,
  value,
  onChange,
  options,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
        {label}
      </label>
      <div className="flex flex-wrap gap-2">
        {options.map((opt) => {
          const active = value === opt;
          return (
            <button
              type="button"
              key={opt}
              onClick={() => onChange(active ? "" : opt)}
              aria-pressed={active}
              className={`px-4 py-2.5 text-sm rounded-full border transition-all min-h-[44px] ${
                active
                  ? "bg-ink text-white border-ink"
                  : "bg-bg-paper text-ink-2 border-line hover:border-ink/40"
              }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
