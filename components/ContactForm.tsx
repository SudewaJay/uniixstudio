"use client";

import { useEffect, useRef, useState } from "react";
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

const timelines = [
  "As soon as possible",
  "Within 1–3 months",
  "3+ months",
  "Flexible",
];

/**
 * One question at a time: what they need, then the project, then who they
 * are. Starting with a single tap lowers the cost of beginning; contact
 * details come last, once the visitor has already invested in the answers.
 */
const steps = [
  { title: "Your need", heading: "What can we help with?" },
  { title: "The project", heading: "Tell us about the project." },
  { title: "Your details", heading: "Where should we reply?" },
] as const;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

type Form = {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  /** Honeypot — bots fill every field, humans never see this. */
  website: string;
};

type Errors = Partial<Record<keyof Form, string>>;

/** Client-side checks for one step. Mirrors the rules in /api/contact. */
function validate(step: number, form: Form): Errors {
  const errors: Errors = {};
  if (step === 0 && !form.service) {
    errors.service = "Pick the option closest to what you need.";
  }
  if (step === 1) {
    const message = form.message.trim();
    if (message.length < 10) {
      errors.message = "A sentence or two is enough. What are you trying to achieve?";
    } else if (message.length > 5000) {
      errors.message = "Please keep this under 5,000 characters.";
    }
  }
  if (step === 2) {
    if (!form.name.trim()) errors.name = "Please add your name.";
    if (!EMAIL_RE.test(form.email.trim())) {
      errors.email = "Please enter a valid email address.";
    }
  }
  return errors;
}

export default function ContactForm() {
  const [form, setForm] = useState<Form>({
    name: "",
    email: "",
    company: "",
    service: "",
    budget: "",
    timeline: "",
    message: "",
    website: "",
  });
  const [step, setStep] = useState(0);
  const [errors, setErrors] = useState<Errors>({});
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Move focus to the new step's heading so keyboard and screen-reader users
  // land on the next question. Skipped on first render so the page doesn't
  // jump to the form on load.
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigated = useRef(false);
  useEffect(() => {
    if (hasNavigated.current) headingRef.current?.focus();
  }, [step]);

  const update = <K extends keyof Form>(key: K, value: string) => {
    setForm((f) => ({ ...f, [key]: value }));
    setErrors((e) => (e[key] ? { ...e, [key]: undefined } : e));
  };

  const goTo = (next: number) => {
    hasNavigated.current = true;
    setErrors({});
    setError(null);
    setStep(next);
  };

  const send = async () => {
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

  // Every step's primary button is a submit, so Enter in a text field moves
  // forward. Only the last step actually sends.
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const stepErrors = validate(step, form);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      const first = Object.keys(stepErrors)[0];
      document.getElementById(`contact-${first}`)?.focus();
      return;
    }
    if (step < steps.length - 1) goTo(step + 1);
    else void send();
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

  const isLast = step === steps.length - 1;

  return (
    <form
      onSubmit={onSubmit}
      noValidate
      className="bg-bg-paper border border-line rounded-lg2 p-8 md:p-12 flex flex-col gap-8"
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

      {/* Progress */}
      <ol className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-[11px] tracking-[0.18em] uppercase">
        {steps.map((s, i) => (
          <li
            key={s.title}
            aria-current={i === step ? "step" : undefined}
            className={
              i === step
                ? "text-brand-3"
                : i < step
                  ? "text-ink-2"
                  : "text-ink-mute"
            }
          >
            {i + 1}. {s.title}
          </li>
        ))}
      </ol>

      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-xs text-ink-mute">
            Step {step + 1} of {steps.length}
          </p>
          <h3
            ref={headingRef}
            tabIndex={-1}
            className="t-h3 focus:outline-none"
          >
            {steps[step].heading}
          </h3>
        </div>

        {error && (
          <div
            role="alert"
            className="bg-red-50 border border-red-200 text-red-800 rounded-lg2 px-4 py-3 text-[14px]"
          >
            {error}
          </div>
        )}

        {step === 0 && (
          <ChoiceField
            name="service"
            label="Choose one"
            value={form.service}
            onChange={(v) => update("service", v)}
            options={services}
            error={errors.service}
          />
        )}

        {step === 1 && (
          <>
            <div className="flex flex-col gap-2">
              <label htmlFor="contact-message" className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
                What are you trying to achieve? <span aria-hidden="true">*</span>
              </label>
              <textarea
                id="contact-message"
                required
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                rows={5}
                placeholder="A few sentences on the goal, what exists today, and anything we should know."
                aria-invalid={errors.message ? true : undefined}
                aria-describedby={errors.message ? "contact-message-error" : undefined}
                className="bg-bg border border-line rounded px-4 py-3.5 text-[15px] leading-[1.55] resize-y focus:outline-none focus:border-brand-3 focus:ring-2 focus:ring-brand-3/20 transition-all min-h-[120px] aria-[invalid=true]:border-red-500"
              />
              <FieldError id="contact-message-error" message={errors.message} />
            </div>

            <ChoiceField
              name="budget"
              label="Budget range (optional)"
              value={form.budget}
              onChange={(v) => update("budget", v)}
              options={budgets}
            />

            <ChoiceField
              name="timeline"
              label="Ideal timing (optional)"
              value={form.timeline}
              onChange={(v) => update("timeline", v)}
              options={timelines}
            />
          </>
        )}

        {step === 2 && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <Field
                name="name"
                label="Your name"
                required
                value={form.name}
                onChange={(v) => update("name", v)}
                placeholder="Your full name"
                autoComplete="name"
                error={errors.name}
              />
              <Field
                name="email"
                label="Email"
                type="email"
                required
                value={form.email}
                onChange={(v) => update("email", v)}
                placeholder="you@company.com"
                autoComplete="email"
                error={errors.email}
              />
            </div>

            <Field
              name="company"
              label="Company"
              value={form.company}
              onChange={(v) => update("company", v)}
              placeholder="Optional"
              autoComplete="organization"
            />

            <p className="text-xs text-ink-mute max-w-[52ch]">
              By submitting, you agree to be contacted by Uniix Studio about your
              enquiry. We never share your details.
            </p>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 pt-2">
        {step > 0 ? (
          <button
            type="button"
            onClick={() => goTo(step - 1)}
            className="text-sm text-ink-2 hover:text-ink transition-colors min-h-[44px] px-1"
          >
            ← Back
          </button>
        ) : (
          <span />
        )}
        <button
          type="submit"
          disabled={submitting}
          className="btn btn-primary disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isLast ? (submitting ? "Sending…" : "Send enquiry ↗") : "Continue →"}
        </button>
      </div>
    </form>
  );
}

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} className="text-[13px] text-red-700">
      {message}
    </p>
  );
}

function Field({
  name,
  label,
  value,
  onChange,
  placeholder,
  type = "text",
  required,
  autoComplete,
  error,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
  error?: string;
}) {
  const id = `contact-${name}`;
  const errorId = `${id}-error`;
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2">
        {label} {required && <span aria-hidden="true">*</span>}
      </label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete={autoComplete}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errorId : undefined}
        className="bg-bg border border-line rounded px-4 py-3.5 text-[15px] min-h-[44px] focus:outline-none focus:border-brand-3 focus:ring-2 focus:ring-brand-3/20 transition-all aria-[invalid=true]:border-red-500"
      />
      <FieldError id={errorId} message={error} />
    </div>
  );
}

/** Single-choice pills, built on native radios so arrow keys and screen readers work. */
function ChoiceField({
  name,
  label,
  value,
  onChange,
  options,
  error,
}: {
  name: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  error?: string;
}) {
  const errorId = `contact-${name}-error`;
  return (
    <fieldset
      className="flex flex-col gap-3"
      aria-describedby={error ? errorId : undefined}
    >
      <legend className="font-mono text-[11px] tracking-[0.18em] uppercase text-ink-2 mb-3">
        {label}
      </legend>
      <div className="flex flex-wrap gap-2">
        {options.map((opt, i) => {
          const active = value === opt;
          return (
            <label
              key={opt}
              className={`relative cursor-pointer px-4 py-2.5 text-sm rounded-full border transition-all min-h-[44px] inline-flex items-center has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-brand-3/40 ${
                active
                  ? "bg-ink text-white border-ink"
                  : "bg-bg-paper text-ink-2 border-line hover:border-ink/40"
              }`}
            >
              <input
                // The first radio carries the id so validation can focus it.
                id={i === 0 ? `contact-${name}` : undefined}
                type="radio"
                name={name}
                value={opt}
                checked={active}
                onChange={() => onChange(opt)}
                className="sr-only"
              />
              {opt}
            </label>
          );
        })}
      </div>
      <FieldError id={errorId} message={error} />
    </fieldset>
  );
}
