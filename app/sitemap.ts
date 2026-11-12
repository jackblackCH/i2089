import type { MetadataRoute } from "next";
import { allWork, services } from "./_shared/content";
import { allPosts } from "./blog/posts";

const BASE_URL = "https://i2089.com";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    ...allWork.map((p) => ({
      url: `${BASE_URL}/projects/${p.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
    ...services.map((s) => ({
      url: `${BASE_URL}/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: s.slug === "about" ? 0.9 : 0.8,
    })),
    {
      url: `${BASE_URL}/blog`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    // drafts never reach production (posts.ts)
    ...allPosts()
      .filter((p) => !p.draft)
      .map((p) => ({
        url: `${BASE_URL}/blog/${p.slug}`,
        lastModified: new Date(p.date),
        changeFrequency: "yearly" as const,
        priority: 0.6,
      })),
  ];
}
