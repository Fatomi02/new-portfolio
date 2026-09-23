import { Reveal } from "@/components/reveal";
import { profile } from "@/content/profile";

export function About() {
  return (
    <div className="grid gap-x-16 gap-y-12 md:grid-cols-[1fr_16rem]">
      <Reveal className="space-y-5">
        {profile.bio.map((paragraph, index) => (
          <p
            key={paragraph.slice(0, 32)}
            className={
              index === 0
                ? "text-lead text-fg"
                : "text-muted leading-relaxed"
            }
          >
            {paragraph}
          </p>
        ))}
      </Reveal>

      <Reveal delay={0.1}>
        <aside className="space-y-8">
          <div>
            <h3 className="eyebrow mb-3">Based in</h3>
            <p className="text-sm">{profile.location}</p>
          </div>

          <div>
            <h3 className="eyebrow mb-3">Toolkit</h3>
            <ul className="flex flex-wrap gap-2">
              {profile.skills.map((skill) => (
                <li
                  key={skill}
                  className="border-line text-muted rounded-full border px-3 py-1 text-xs"
                >
                  {skill}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="eyebrow mb-3">Elsewhere</h3>
            <ul className="space-y-1.5">
              {profile.socials.map(({ label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="link-underline text-sm"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </Reveal>
    </div>
  );
}
