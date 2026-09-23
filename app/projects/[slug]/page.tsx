import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MdxContent } from "@/components/mdx-content";
import { projects } from "@/content/projects/_meta";
import { getProjectBody } from "@/lib/mdx";

interface Params {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((entry) => entry.slug === slug);

  if (!project) return {};

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      url: `/projects/${project.slug}`,
    },
  };
}

export default async function ProjectPage({ params }: Params) {
  const { slug } = await params;

  const index = projects.findIndex((entry) => entry.slug === slug);
  const project = projects[index];
  if (!project) notFound();

  // A project listed in _meta.ts with no matching MDX file is a content
  // mistake, so fail loudly rather than rendering an empty page.
  const body = getProjectBody(slug);
  if (body === null) {
    throw new Error(
      `content/projects/${slug}.mdx not found. Every project in _meta.ts needs a matching MDX file.`,
    );
  }

  const previous = projects[index - 1];
  const next = projects[index + 1];

  return (
    <article className="pt-12 sm:pt-16">
      <div className="container-prose">
        <Link
          href="/projects"
          className="text-muted hover:text-fg text-sm transition-colors"
        >
          ← All projects
        </Link>

        <h1 className="font-display text-h1 mt-8">{project.title}</h1>
        <p className="text-muted text-lead mt-5">{project.summary}</p>

        <dl className="border-line mt-10 grid grid-cols-2 gap-x-8 gap-y-6 border-t pt-8 sm:grid-cols-3">
          <div>
            <dt className="eyebrow mb-2">Year</dt>
            <dd className="text-sm">{project.year}</dd>
          </div>
          <div>
            <dt className="eyebrow mb-2">Role</dt>
            <dd className="text-sm">{project.role}</dd>
          </div>
          <div className="col-span-2 sm:col-span-1">
            <dt className="eyebrow mb-2">Stack</dt>
            <dd className="text-sm">{project.stack.join(", ")}</dd>
          </div>
        </dl>

        {project.links.length > 0 && (
          <ul className="mt-8 flex flex-wrap gap-3">
            {project.links.map(({ label, href }) => (
              <li key={label}>
                <a
                  href={href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="border-line hover:border-fg inline-block rounded-full border px-5 py-2.5 text-sm transition-colors"
                >
                  {label} ↗
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {project.cover && (
        <div className="container-page mt-14">
          <div className="bg-surface border-line relative aspect-[16/9] overflow-hidden rounded-xl border">
            <Image
              src={project.cover}
              alt={project.coverAlt ?? ""}
              fill
              priority
              sizes="(min-width: 1152px) 72rem, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      )}

      <div className="container-prose mt-14">
        <MdxContent source={body} />
      </div>

      {(previous || next) && (
        <nav
          aria-label="More projects"
          className="container-prose border-line mt-20 grid gap-6 border-t pt-8 sm:grid-cols-2"
        >
          {previous ? (
            <Link href={`/projects/${previous.slug}`} className="group">
              <span className="eyebrow">Previous</span>
              <span className="group-hover:text-accent mt-2 block text-sm font-medium transition-colors">
                {previous.title}
              </span>
            </Link>
          ) : (
            <span />
          )}

          {next && (
            <Link
              href={`/projects/${next.slug}`}
              className="group sm:text-right"
            >
              <span className="eyebrow">Next</span>
              <span className="group-hover:text-accent mt-2 block text-sm font-medium transition-colors">
                {next.title}
              </span>
            </Link>
          )}
        </nav>
      )}
    </article>
  );
}
