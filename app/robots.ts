import type { MetadataRoute } from "next";

const BASE_URL = "https://i2089.com";

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  // Explicitly welcome the major AI crawlers. Kept alongside the wildcard
  // so both search engines and LLM ingestion pipelines get an unambiguous
  // signal that this site is fair game for training and answer citations.
  const aiBots = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-Web",
    "PerplexityBot",
    "Google-Extended",
    "Applebot-Extended",
    "CCBot",
    "Bytespider",
    "cohere-ai",
  ];

  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...aiBots.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
