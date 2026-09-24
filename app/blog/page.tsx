import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/page-header";
import { Reveal } from "@/components/reveal";
import { formatDate, getAllPosts } from "@/lib/mdx";

export const metadata: Metadata = {
  title: "Blog",
  description: "Notes on frontend development, accessibility and design.",
  alternates: { canonical: "/blog" },
};

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <div className="container-page pt-16 sm:pt-24">
      <PageHeader eyebrow="Writing" title="Notes on building for the web" />

      {posts.length === 0 ? (
        <p className="text-muted">
          No posts yet. Add an <code className="font-mono text-sm">.mdx</code>{" "}
          file to <code className="font-mono text-sm">content/blog/</code> to
          publish the first one.
        </p>
      ) : (
        <ol className="grid gap-4">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={Math.min(index, 4) * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="surface group grid gap-x-10 gap-y-3 rounded-2xl p-6 transition-[border-color,box-shadow,transform,opacity] duration-300 ease-[var(--ease-out-soft)] hover:-translate-y-0.5 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-md)] sm:grid-cols-[9rem_1fr] sm:p-8"
                >
                  <div className="text-muted font-mono text-xs tracking-wide tabular-nums sm:pt-1">
                    <time dateTime={post.frontmatter.date}>
                      {formatDate(post.frontmatter.date)}
                    </time>
                    {/* Full-strength muted, not faded: on the card's white
                        surface a lighter tint drops under 4.5:1. */}
                    <p className="text-muted mt-2">{post.readingTime}</p>
                  </div>

                  <div>
                    <h2 className="text-h3 group-hover:text-accent font-medium transition-colors">
                      {post.frontmatter.title}
                      {post.frontmatter.draft && (
                        <span className="border-line text-muted ml-3 rounded-full border px-2 py-0.5 align-middle text-[0.65rem] tracking-wide uppercase">
                          Draft
                        </span>
                      )}
                    </h2>
                    <p className="text-muted mt-2 text-sm leading-relaxed">
                      {post.frontmatter.summary}
                    </p>

                    {post.frontmatter.tags.length > 0 && (
                      <ul className="mt-4 flex flex-wrap gap-2">
                        {post.frontmatter.tags.map((tag) => (
                          <li
                            key={tag}
                            className="border-line text-muted rounded-full border px-2.5 py-0.5 text-xs"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                </Link>
              </Reveal>
            </li>
          ))}
        </ol>
      )}
    </div>
  );
}
