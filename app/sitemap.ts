import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/content";

const SITE = "https://www.puurgeeske.nl";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = ["", "/over", "/blog", "/contact"].map((route) => ({
    url: `${SITE}${route}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1 : 0.7,
  }));

  const posts = getBlogPosts().map((post) => ({
    url: `${SITE}/blog/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "yearly" as const,
    priority: 0.5,
  }));

  return [...staticRoutes, ...posts];
}
