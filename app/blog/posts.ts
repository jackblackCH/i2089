import fs from "node:fs";
import path from "node:path";
import { marked, type Tokens } from "marked";

// Blog posts are Markdown files in content/blog/, with a small front
// matter block (title, date, description, optional tldr, draft). Drafts
// show on localhost and Vercel previews only, never on i2089.com, and
// never in the sitemap or llms.txt there.
export type Post = {
  slug: string;
  title: string;
  /** ISO date, YYYY-MM-DD */
  date: string;
  description: string;
  tldr?: string;
  draft: boolean;
  html: string;
};

const DIR = path.join(process.cwd(), "content/blog");

export const SHOW_DRAFTS =
  process.env.NODE_ENV === "development" ||
  process.env.VERCEL_ENV === "preview";

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// An image alone in a paragraph becomes a <figure>; its Markdown title
// ("…") becomes the caption.
marked.use({
  renderer: {
    paragraph({ tokens }: Tokens.Paragraph) {
      const inner = this.parser.parseInline(tokens);
      return tokens.length === 1 && tokens[0].type === "image"
        ? `${inner}\n`
        : `<p>${inner}</p>\n`;
    },
    image({ href, title, text }: Tokens.Image) {
      const caption = title
        ? `<figcaption>${escapeHtml(title)}</figcaption>`
        : "";
      return `<figure><img src="${escapeHtml(href)}" alt="${escapeHtml(text)}" loading="lazy" />${caption}</figure>`;
    },
  },
});

function parse(file: string): Post {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`content/blog/${file}: front matter missing`);
  const meta: Record<string, string> = {};
  for (const line of match[1].split("\n")) {
    const i = line.indexOf(":");
    if (i > 0)
      meta[line.slice(0, i).trim()] = line
        .slice(i + 1)
        .trim()
        .replace(/^"(.*)"$/, "$1");
  }
  for (const key of ["title", "date", "description"])
    if (!meta[key]) throw new Error(`content/blog/${file}: "${key}" missing`);
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title,
    date: meta.date,
    description: meta.description,
    tldr: meta.tldr || undefined,
    draft: meta.draft === "true",
    html: marked.parse(match[2], { async: false }) as string,
  };
}

/** newest first; drafts only where SHOW_DRAFTS */
export function allPosts(): Post[] {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function postBySlug(slug: string): Post | undefined {
  return allPosts().find((p) => p.slug === slug);
}

// Swiss German date format: 12.11.2026
export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Zurich",
  });
