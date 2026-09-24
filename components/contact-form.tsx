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