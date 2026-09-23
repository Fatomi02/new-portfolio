import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";
import { projects } from "@/content/projects/_meta";
import { getAllPosts } from "@/lib/mdx";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = profile.siteUrl.replace(/\/$/, "");
  const now = new Date();

  return [
    { url: `${site}/`, lastModified: now, priority: 1 },
    { url: `${site}/projects`, lastModified: now, priority: 0.8 },
    { url: `${site}/blog`, lastModified: now, priority: 0.6 },

    ...projects.map((project) => ({
      url: `${site}/projects/${project.slug}`,
      lastModified: now,
      priority: 0.7,
    })),

    ...getAllPosts().map((post) => ({
      url: `${site}/blog/${post.slug}`,
      lastModified: new Date(post.frontmatter.date),
      priority: 0.5,
    })),
  ];
}
