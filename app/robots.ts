import type { MetadataRoute } from "next";
import { profile } from "@/content/profile";

export default function robots(): MetadataRoute.Robots {
  const site = profile.siteUrl.replace(/\/$/, "");

  return {
    rules: { userAgent: "*", allow: "/" },
    sitemap: `${site}/sitemap.xml`,
    host: site,
  };
}
