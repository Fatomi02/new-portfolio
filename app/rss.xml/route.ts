import { profile } from "@/content/profile";
import { getAllPosts } from "@/lib/mdx";

/** Content only changes at build time, so prerender it like the pages. */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const posts = getAllPosts();
  const site = profile.siteUrl.replace(/\/$/, "");

  const items = posts
    .map((post) =>
      [
        "    <item>",
        `      <title>${escapeXml(post.frontmatter.title)}</title>`,
        `      <link>${site}/blog/${post.slug}</link>`,
        `      <guid isPermaLink="true">${site}/blog/${post.slug}</guid>`,
        `      <description>${escapeXml(post.frontmatter.summary)}</description>`,
        `      <pubDate>${new Date(post.frontmatter.date).toUTCString()}</pubDate>`,
        "    </item>",
      ].join("\n"),
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(profile.name)} — Blog</title>
    <link>${site}/blog</link>
    <description>${escapeXml(profile.tagline)}</description>
    <language>en</language>
    <atom:link href="${site}/rss.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
