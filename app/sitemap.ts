import type { MetadataRoute } from "next";
import { projects } from "@/content/projects/_meta";
import { getAllPosts } from "@/lib/mdx";
import { siteUrl } from "@/lib/site-url";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return [
    { url: `${siteUrl}/`, lastModified: now, priority: 1 },
    { url: `${siteUrl}/projects`, lastModified: now, priority: 0.8 },
    { url: `${siteUrl}/blog`, lastModified: now, priority: 0.6 },

    ...projects.map((project) => ({
      url: `${siteUrl}/projects/${project.slug}`,
      lastModified: now,
      priority: 0.7,
    })),

    ...getAllPosts().map((post) => ({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      priority: 0.5,
    })),
  ];
}
