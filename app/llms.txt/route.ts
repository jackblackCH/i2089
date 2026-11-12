import { NextResponse } from "next/server";
import {
  type Item,
  services,
  projects,
  contracts,
  bySlug,
} from "../_shared/content";
import { allPosts } from "../blog/posts";

export const dynamic = "force-static";

const BASE_URL = "https://i2089.com";

// llms.txt — https://llmstxt.org
// Generated from the same content.ts that drives the site so the two
// stay in sync. Served as text/plain, no HTML.
// a step list reads as one numbered sentence in plain text
// site links in the text ([words](/path)) become absolute URLs
const itemText = (item: Exclude<Item, string>) =>
  "text" in item
    ? item.text.replace(/\]\(\//g, `](${BASE_URL}/`)
    : item.steps.map((step, i) => `${i + 1}. ${step}`).join(" ");

export function GET() {
  const about = bySlug["about"];
  const intro =
    (about?.items.find((i) => typeof i === "string") as string | undefined) ??
    "";

  const lines: string[] = [];
  lines.push(`# i2089 :: Marc Illien`);
  lines.push("");
  lines.push(`> ${intro}`);
  lines.push("");
  lines.push(
    `Independent software engineer in Zürich, Switzerland: frontend and UX for web and mobile apps, and Agentic Engineering for teams.`,
  );
  lines.push("");

  lines.push(`## Services`);
  lines.push("");
  for (const s of services.filter((s) => s.slug !== "about")) {
    lines.push(`- [${s.title}](${BASE_URL}/${s.slug})`);
    for (const item of s.items) {
      if (typeof item !== "string") {
        lines.push(`  - **${item.term}**: ${itemText(item)}`);
      }
    }
  }
  lines.push("");

  lines.push(`## Projects`);
  lines.push("");
  for (const p of projects) {
    lines.push(
      `- [${p.title}](${BASE_URL}/projects/${p.slug}): ${p.period}. ${p.role}. ${p.text} Live: ${p.href}`,
    );
  }
  lines.push("");

  lines.push(`## Contracts`);
  lines.push("");
  for (const c of contracts) {
    // like the projects: the case page on the site, then the live site
    lines.push(
      `- [${c.title}](${BASE_URL}/projects/${c.slug}): ${c.period}. ${c.role}. ${c.text} Live: ${c.href}`,
    );
  }
  lines.push("");

  lines.push(`## Career`);
  lines.push("");
  for (const item of about?.items ?? []) {
    if (typeof item !== "string") {
      lines.push(`- **${item.term}**: ${itemText(item)}`);
    }
  }
  lines.push("");

  const posts = allPosts().filter((p) => !p.draft);
  if (posts.length) {
    lines.push(`## Blog`);
    lines.push("");
    for (const p of posts) {
      lines.push(
        `- [${p.title}](${BASE_URL}/blog/${p.slug}): ${p.date}. ${p.description}`,
      );
    }
    lines.push("");
  }

  lines.push(`## Contact`);
  lines.push("");
  lines.push(`- Email: hi@i2089.com`);
  lines.push(`- LinkedIn: https://www.linkedin.com/in/marcillien/`);
  lines.push(`- Site: ${BASE_URL}`);
  lines.push("");

  return new NextResponse(lines.join("\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
