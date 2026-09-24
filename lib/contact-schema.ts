import { z } from "zod";

/**
 * One schema, imported by both the form and the route handler, so the
 * rules a visitor sees inline are exactly the rules the server enforces.
 */
export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { error: "Please enter your name." })
    .max(80, { error: "That name is too long." }),

  email: z.email({ error: "Please enter a valid email address." }),

  message: z
    .string()
    .trim()
    .min(20, { error: "A little more detail, please — at least 20 characters." })
    .max(4000, { error: "That message is too long for this form." }),

  /**
   * Honeypot. Hidden from sight and from assistive tech, so a human
   * never fills it in; bots that fill every field give themselves away.
   *
   * Deliberately accepts anything. Rejecting a non-empty value here
   * would return a validation error naming this field, which tells the
   * bot exactly what tripped it. The route handler checks the value
   * instead and answers with a plain success, so a bot learns nothing
   * and has no reason to retry with the field left blank.
   *
   * Named `hp_check` rather than something plausible like `website`:
   * `website` maps to the `url` autocomplete token, so a browser or
   * password manager can fill it for a real person — and their message
   * would then be discarded while they were told it had been sent.
   */
  hp_check: z.string().optional(),
});

export type ContactInput = z.infer<typeof contactSchema>;

/** Field name → first error message, ready to render under each input. */
export type ContactFieldErrors = Partial<
  Record<keyof ContactInput, string>
>;