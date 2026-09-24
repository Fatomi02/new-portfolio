import { profile } from "@/content/profile";

/**
 * The site's public origin, resolved at build time.
 *
 * Canonical URLs, Open Graph tags, the sitemap and the RSS feed all read
 * from this, and all of them are wrong if it points somewhere the site
 * isn't. So rather than hardcoding a domain, it is resolved in order:
 *
 *   1. NEXT_PUBLIC_SITE_URL — set this once you put a custom domain in
 *      front of the site.
 *   2. VERCEL_PROJECT_PRODUCTION_URL — set automatically by Vercel to the
 *      project's production domain (e.g. portfolio.vercel.app). This means
 *      a Vercel deploy is correct with no configuration at all.
 *   3. profile.siteUrl — the local development fallback.
 *
 * Note this is VERCEL_PROJECT_PRODUCTION_URL, not VERCEL_URL: the latter
 * is unique to each deployment, so using it would point every canonical
 * tag at a preview build that will never be the live site.
 */
function resolve(): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) {
    return process.env.NEXT_PUBLIC_SITE_URL;
  }

  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }

  return profile.siteUrl;
}

/** Absolute origin, never with a trailing slash. */
export const siteUrl = resolve().replace(/\/+$/, "");
