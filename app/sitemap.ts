import type { MetadataRoute } from "next";
import { services } from "./new/content";

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
    ...services.map((s) => ({
      url: `${BASE_URL}/${s.slug}`,
      lastModified,
      changeFrequency: "monthly" as const,
      priority: s.slug === "about" ? 0.9 : 0.8,
    })),
  ];
}
