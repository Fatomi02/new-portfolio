"use client";

import { useId, useState } from "react";
import type { ContactFieldErrors } from "@/lib/contact-schema";

type Status = "idle" | "submitting" | "success" | "error";

const fieldClass =
  // Placeholder is muted at full strength: faded further it drops under
  // 4.5:1, and placeholder text has to meet contrast like any other text.
  "border-line bg-bg w-full rounded-xl border px-4 py-3 text-sm transition-[border-color,box-shadow] duration-200 placeholder:text-muted hover:border-line-strong focus-visible:border-accent focus-visible:shadow-[var(--shadow-sm)]";

/**
 * Validation lives entirely on the server.
 *
 * The route handler already checks every field against `contactSchema`
 * and returns the messages keyed by field name, so importing the schema
 * here as well would ship zod to every visitor — around 90 KB of
 * JavaScript — to re-derive answers the server is about to send anyway.
 * Submitting costs one round trip, and the messages shown are by
 * definition the ones the server enforces.
 */
export function ContactForm() {
  const formId = useId();
  const [status, setStatus] = useState<Status>("idle");
  const [formError, setFormError] = useState<string | null>(null);
  const [fieldErrors, setFieldErrors] = useState<ContactFieldErrors>({});

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const form = event.currentTarget;
    const values = Object.fromEntries(new FormData(form));

    setFieldErrors({});
    setFormError(null);
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = await response.json().catch(() => ({}));

      if (!response.ok || !result.ok) {
        const returned = result.fieldErrors as
          | Record<string, string[]>
          | undefined;

        if (returned) {
          setFieldErrors({
            name: returned.name?.[0],
            email: returned.email?.[0],
            message: returned.message?.[0],
          });
        }

        // Only surface a form-level message when no field owns the problem,
        // so a failed submit never says the same thing twice.
        setFormError(
          returned
            ? null
            : (result.error ?? "Something went wrong. Please try again."),
        );
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setFormError(
        "Could not reach the server. Please check your connection and try again.",
      );
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div
        role="status"
        className="border-line bg-surface rounded-xl border p-8 text-center"
      >
        <p className="font-display text-h3">Thanks — message sent.</p>
        <p className="text-muted mt-2 text-sm">
          I&rsquo;ll get back to you as soon as I can.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="link-underline text-muted hover:text-fg mt-5 text-sm transition-colors"
        >
          Send another
        </button>
      </div>
    );
  }

  const isSubmitting = status === "submitting";

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <Field
        id={`${formId}-name`}
        name="name"
        label="Name"
        autoComplete="name"
        placeholder="Ada Lovelace"
        error={fieldErrors.name}
        disabled={isSubmitting}
      />

      <Field
        id={`${formId}-email`}
        name="email"
        type="email"
        label="Email"
        autoComplete="email"
        placeholder="ada@example.com"
        error={fieldErrors.email}
        disabled={isSubmitting}
      />

      <Field
        id={`${formId}-message`}
        name="message"
        label="Message"
        placeholder="What are you working on?"
        error={fieldErrors.message}
        disabled={isSubmitting}
        multiline
      />

      {/* Honeypot: off-screen rather than display:none, since some bots
          skip hidden inputs. aria-hidden + tabIndex keep it away from
          screen readers and the keyboard, and the name avoids anything
          a browser might autofill for a real person. */}
      <div aria-hidden="true" className="absolute left-[-9999px] w-px">
        <label htmlFor={`${formId}-hp`}>Leave this field empty</label>
        <input
          id={`${formId}-hp`}
          name="hp_check"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          disabled={isSubmitting}
          className="btn btn-primary disabled:pointer-events-none disabled:opacity-50"
        >
          {isSubmitting ? "Sending…" : "Send message"}
          {!isSubmitting && (
            <svg
              aria-hidden="true"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="arrow size-3.5"
            >
              <path d="M3 8h10M9 4l4 4-4 4" />
            </svg>
          )}
        </button>

        {/* Announced to screen readers when it fills in */}
        <p
          role="status"
          aria-live="polite"
          className="text-sm text-[var(--accent)]"
        >
          {formError}
        </p>
      </div>
    </form>
  );
}

interface FieldProps {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  disabled?: boolean;
  multiline?: boolean;
}

function Field({
  id,
  name,
  label,
  type = "text",
  placeholder,
  autoComplete,
  error,
  disabled,
  multiline = false,
}: FieldProps) {
  const errorId = `${id}-error`;
  const shared = {
    id,
    name,
    placeholder,
    disabled,
    "aria-invalid": error ? (true as const) : undefined,
    "aria-describedby": error ? errorId : undefined,
    className: `${fieldClass} ${error ? "border-[var(--accent)]" : ""}`,
  };

  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-sm font-medium">
        {label}
      </label>

      {multiline ? (
        <textarea
          {...shared}
          rows={5}
          className={`${shared.className} resize-y`}
        />
      ) : (
        <input {...shared} type={type} autoComplete={autoComplete} />
      )}

      {error && (
        <p id={errorId} className="mt-2 text-sm text-[var(--accent)]">
          {error}
        </p>
      )}
    </div>
  );
}