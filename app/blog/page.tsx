import type { Metadata } from "next";
import Link from "next/link";
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
      <header className="mb-14 sm:mb-20">
        <p className="eyebrow mb-3">Writing</p>
        <h1 className="font-display text-h1 max-w-[16ch]">
          Notes on building for the web
        </h1>
      </header>

      {posts.length === 0 ? (
        <p className="text-muted">
          No posts yet. Add an <code className="font-mono text-sm">.mdx</code>{" "}
          file to <code className="font-mono text-sm">content/blog/</code> to
          publish the first one.
        </p>
      ) : (
        <ol className="divide-line/70 divide-y border-t border-[var(--line)]">
          {posts.map((post, index) => (
            <li key={post.slug}>
              <Reveal delay={Math.min(index, 4) * 0.05}>
                <Link
                  href={`/blog/${post.slug}`}
                  className="group grid gap-x-10 gap-y-2 py-8 sm:grid-cols-[9rem_1fr] sm:py-10"
                >
                  <p className="text-muted pt-1 font-mono text-xs tracking-wide tabular-nums">
                    <time dateTime={post.frontmatter.date}>
                      {formatDate(post.frontmatter.date)}
                    </time>
                  </p>

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
                    <p className="text-muted/80 mt-3 font-mono text-xs">
                      {post.readingTime}
                    </p>
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
