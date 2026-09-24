import { profile } from "@/content/profile";
import { siteUrl } from "@/lib/site-url";

/**
 * Structured data for the home page. Lets search engines show the name,
 * job title and social profiles as a person rather than a generic page.
 */
export function JsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    description: profile.tagline,
    email: `mailto:${profile.email}`,
    url: siteUrl,
    sameAs: profile.socials.map((social) => social.href),
  };

  return (
    <script
      type="application/ld+json"
      // Values come from a local content file, never user input
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
