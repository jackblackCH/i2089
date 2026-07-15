import { NextResponse } from "next/server";
import {
  services,
  projects,
  contracts,
  bySlug,
} from "../_shared/content";

export const dynamic = "force-static";

const BASE_URL = "https://i2089.com";

// llms.txt — https://llmstxt.org
// Generated from the same content.ts that drives the site so the two
// stay in sync. Served as text/plain, no HTML.
export function GET() {
  const about = bySlug["about"];
  const intro =
    (about?.items.find((i) => typeof i === "string") as string | undefined) ??
    "";

  const lines: string[] = [];
  lines.push(`# i2089 — Marc Illien`);
  lines.push("");
  lines.push(`> ${intro}`);
  lines.push("");
  lines.push(
    `Independent software engineer in Zürich, Switzerland. Agentic Engineering, frontend and software engineering, and digital products for startups, SMEs, and corporates.`,
  );
  lines.push("");

  lines.push(`## Services`);
  lines.push("");
  for (const s of services.filter((s) => s.slug !== "about")) {
    lines.push(`- [${s.title}](${BASE_URL}/${s.slug})`);
    for (const item of s.items) {
      if (typeof item !== "string") {
        lines.push(`  - **${item.term}**: ${item.text}`);
      }
    }
  }
  lines.push("");

  lines.push(`## Projects`);
  lines.push("");
  for (const p of projects) {
    lines.push(
      `- [${p.title}](${p.href}) — ${p.period}. ${p.text}`,
    );
  }
  lines.push("");

  lines.push(`## Contracts`);
  lines.push("");
  for (const c of contracts) {
    lines.push(`- [${c.title}](${c.href}) — ${c.period}. ${c.text}`);
  }
  lines.push("");

  lines.push(`## Career`);
  lines.push("");
  for (const item of about?.items ?? []) {
    if (typeof item !== "string") {
      lines.push(`- **${item.term}** — ${item.text}`);
    }
  }
  lines.push("");

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
