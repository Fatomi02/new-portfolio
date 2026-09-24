import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { profile } from "@/content/profile";

/** Uses request headers and in-process state, so it must not be cached. */
export const dynamic = "force-dynamic";

const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

/**
 * Per-IP rate limit.
 *
 * In-memory on purpose: it costs nothing, needs no external service, and
 * on a personal site it stops the only attack that actually happens —
 * someone hammering the form from one machine. It resets on deploy and
 * is per-instance, which is a fair trade here. Swap in Upstash or
 * Vercel KV if this ever needs to hold across instances.
 */
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter(
    (timestamp) => now - timestamp < WINDOW_MS,
  );

  // Opportunistic cleanup so the map cannot grow without bound
  if (hits.size > 5_000) hits.clear();

  if (recent.length >= MAX_PER_WINDOW) {
    hits.set(ip, recent);
    return true;
  }

  recent.push(now);
  hits.set(ip, recent);
  return false;
}

function clientIp(request: Request): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]!.trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export async function POST(request: Request) {
  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      {
        ok: false,
        error: "Please check the highlighted fields.",
        fieldErrors: z.flattenError(parsed.error).fieldErrors,
      },
      { status: 400 },
    );
  }

  const { name, email, message, hp_check: honeypot } = parsed.data;

  // Honeypot tripped. Report success so the bot does not learn anything
  // and does not retry with the field left blank — but log it, because
  // if a browser or password manager ever starts autofilling this field
  // real messages would vanish here and the sender would be told they
  // went through.
  if (honeypot) {
    console.warn(
      `[contact] Honeypot filled — discarded without sending. ` +
        `If this was a real person, the hidden field is being autofilled. ` +
        `from: ${name} <${email}>`,
    );
    return NextResponse.json({ ok: true });
  }

  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many messages. Please try again later." },
      { status: 429 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL ?? profile.email;

  if (!apiKey) {
    // In development the message goes to the terminal, so the form can be
    // exercised with no secrets configured.
    if (process.env.NODE_ENV === "development") {
      console.info(
        `[contact] RESEND_API_KEY is not set, so no email was sent.\n` +
          `  from: ${name} <${email}>\n  to: ${to}\n  message: ${message}`,
      );
      return NextResponse.json({ ok: true });
    }

    // In production it must not claim success. Telling a visitor their
    // message was sent when it was silently dropped is worse than an
    // outage: they have no reason to follow up, and neither side finds
    // out. Fail loudly and give them the address instead.
    console.error(
      "[contact] RESEND_API_KEY is not set in production — message dropped. " +
        "Set it in the hosting provider's environment variables and redeploy.",
    );
    return NextResponse.json(
      {
        ok: false,
        error: `Email isn't configured yet, so this wasn't delivered. Please write to ${to} directly.`,
      },
      { status: 503 },
    );
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      // Must be a domain you have verified with Resend. Their shared
      // onboarding sender works for testing before you verify your own.
      from: "Portfolio <onboarding@resend.dev>",
      to,
      replyTo: email,
      subject: `Portfolio enquiry from ${name}`,
      text: `From: ${name} <${email}>\n\n${message}`,
      html:
        `<p><strong>From:</strong> ${escapeHtml(name)} ` +
        `&lt;${escapeHtml(email)}&gt;</p>` +
        `<p style="white-space:pre-wrap">${escapeHtml(message)}</p>`,
    });

    if (error) {
      console.error("[contact] Resend rejected the message:", error);
      return NextResponse.json(
        { ok: false, error: "Could not send just now. Please email me directly." },
        { status: 502 },
      );
    }
  } catch (cause) {
    console.error("[contact] Unexpected failure sending message:", cause);
    return NextResponse.json(
      { ok: false, error: "Could not send just now. Please email me directly." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}