import { ContactForm } from "@/components/contact-form";
import { Reveal } from "@/components/reveal";
import { Section } from "@/components/section";
import { profile } from "@/content/profile";

export function ContactSection() {
  return (
    <Section id="contact" eyebrow="Contact" title="Let's work together">
      <div className="grid gap-x-16 gap-y-10 md:grid-cols-[1fr_1fr]">
        <Reveal>
          <p className="text-lead max-w-[38ch]">
            Open to frontend roles and freelance work. Tell me what you&rsquo;re
            building and I&rsquo;ll reply within a couple of days.
          </p>

          <p className="text-muted mt-6 text-sm">
            Prefer email?{" "}
            <a href={`mailto:${profile.email}`} className="link-underline text-fg">
              {profile.email}
            </a>
          </p>
        </Reveal>

        <Reveal delay={0.08}>
          <ContactForm />
        </Reveal>
      </div>
    </Section>
  );
}
