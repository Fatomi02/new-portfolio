import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { ReadingProgress } from "@/components/reading-progress";
import { formatDate, getAllPosts, getPost } from "@/lib/mdx";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) return {};

  return {
    title: post.frontmatter.title,
    description: post.frontmatter.summary,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      type: "article",
      title: post.frontmatter.title,
      description: post.frontmatter.summary,
      publishedTime: post.frontmatter.date,
      url: `/blog/${post.slug}`,
      tags: post.frontmatter.tags,
    },
  };
}

export default async function PostPage({ params }: Params) {
  const { slug } = await params;
  const post = getPost(slug);

  // Drafts are reachable by direct URL in development but never in production
  if (!post || (post.frontmatter.draft && process.env.NODE_ENV !== "development")) {
    notFound();
  }

  return (
    <article className="container-prose pt-12 sm:pt-16">
      <ReadingProgress />

      <Link
        href="/blog"
        className="arrow-link arrow-link-back text-muted hover:text-fg text-sm"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="arrow size-3.5"
        >
          <path d="M13 8H3M7 4L3 8l4 4" />
        </svg>
        All posts
      </Link>

      <header className="border-line mt-8 border-b pb-8">
        <h1 className="font-display text-h1">{post.frontmatter.title}</h1>

        {post.frontmatter.summary && (
          <p className="text-muted text-lead mt-5">{post.frontmatter.summary}</p>
        )}

        <div className="text-muted mt-6 flex flex-wrap items-center gap-x-3 font-mono text-xs">
          <time dateTime={post.frontmatter.date}>
            {formatDate(post.frontmatter.date)}
          </time>
          <span aria-hidden="true" className="opacity-50">
            ·
          </span>
          <span>{post.readingTime}</span>
        </div>

        {post.frontmatter.tags.length > 0 && (
          <ul className="mt-5 flex flex-wrap gap-2">
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
      </header>

      <div className="mt-10">
        <MdxContent source={post.content} />
      </div>
    </article>
  );
}
