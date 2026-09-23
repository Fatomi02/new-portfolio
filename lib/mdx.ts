import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import readingTime from "reading-time";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import rehypePrettyCode, {
  type Options as PrettyCodeOptions,
} from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import type { Post, PostFrontmatter } from "@/lib/content-types";

const CONTENT_DIR = path.join(process.cwd(), "content");
const POSTS_DIR = path.join(CONTENT_DIR, "blog");
const PROJECTS_DIR = path.join(CONTENT_DIR, "projects");

const prettyCodeOptions: PrettyCodeOptions = {
  // Two themes so code blocks follow the site theme without re-highlighting
  // The high-contrast variants, not the plain ones: GitHub's default
  // light theme has several tokens (orange, red) that miss 4.5:1 even on
  // pure white, and this site's code background is a warm off-white.
  theme: {
    light: "github-light-high-contrast",
    dark: "github-dark-high-contrast",
  },
  keepBackground: false,
  // Block only. Passing a bare string would also apply to inline code,
  // which wraps every `like this` in a line-level span and breaks it
  // onto its own line mid-sentence.
  defaultLang: { block: "plaintext" },
};

/**
 * Shared MDX pipeline. Passed to <MDXRemote options={{ mdxOptions }} />
 * by both the blog and the project case studies, so a code block or a
 * table renders identically wherever it appears.
 */
export const mdxOptions = {
  remarkPlugins: [remarkGfm],
  rehypePlugins: [
    rehypeSlug,
    [rehypePrettyCode, prettyCodeOptions],
    // Runs after rehypeSlug so every heading already has an id to link to
    [
      rehypeAutolinkHeadings,
      { behavior: "wrap", properties: { className: "heading-anchor" } },
    ],
  ],
} as const;

function readMdx(dir: string, slug: string): string | null {
  const filePath = path.join(dir, `${slug}.mdx`);
  // Guard against a slug like "../secrets" escaping the content directory
  if (!filePath.startsWith(dir + path.sep)) return null;
  if (!fs.existsSync(filePath)) return null;
  return fs.readFileSync(filePath, "utf8");
}

function listSlugs(dir: string): string[] {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

/* ─────────────────────────── Blog ─────────────────────────── */

function toPost(slug: string, raw: string): Post {
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  if (!frontmatter.title || !frontmatter.date) {
    throw new Error(
      `content/blog/${slug}.mdx is missing a "title" or "date" in its frontmatter.`,
    );
  }

  return {
    slug,
    frontmatter: {
      ...frontmatter,
      tags: frontmatter.tags ?? [],
      summary: frontmatter.summary ?? "",
    },
    content,
    readingTime: readingTime(content).text,
  };
}

export function getPost(slug: string): Post | null {
  const raw = readMdx(POSTS_DIR, slug);
  return raw === null ? null : toPost(slug, raw);
}

/**
 * Newest first. Drafts stay visible while developing so you can preview
 * them, and are dropped from the production build.
 */
export function getAllPosts(): Post[] {
  return listSlugs(POSTS_DIR)
    .map((slug) => toPost(slug, readMdx(POSTS_DIR, slug)!))
    .filter(
      (post) =>
        process.env.NODE_ENV === "development" || !post.frontmatter.draft,
    )
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime(),
    );
}

/* ───────────────────────── Projects ───────────────────────── */

/**
 * The case-study body for a project. Metadata lives in
 * content/projects/_meta.ts; this is only the prose.
 */
export function getProjectBody(slug: string): string | null {
  const raw = readMdx(PROJECTS_DIR, slug);
  return raw === null ? null : matter(raw).content;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}
