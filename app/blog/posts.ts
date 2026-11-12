import fs from "node:fs";
import path from "node:path";
import { Marked, type Tokens } from "marked";

// Blog posts live in /blogs, one folder per post:
//
//   blogs/
//     taste-doesnt-compile/
//       index.md        the post: front matter + Markdown
//       demo.jpg        images and other files, linked as ./demo.jpg
//
// The folder name is the URL slug (/blog/taste-doesnt-compile). Front
// matter: title, date (YYYY-MM-DD), description, optional tldr, draft.
// Drafts show on localhost and Vercel previews only, never on i2089.com,
// in the sitemap or in llms.txt.
//
// Structure, 1:1 with the reference post: the intro (byline, tl;dr) is
// followed by a full-width rule; every "## Heading" opens a chapter with a
// full-width rule and an underlined heading; "### Heading" structures a
// chapter without lines. So a post is a few long chapters, not many
// short ones.
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

export const BLOGS_DIR = path.join(process.cwd(), "blogs");

export const SHOW_DRAFTS =
  process.env.NODE_ENV === "development" ||
  process.env.VERCEL_ENV === "preview";

/** files a post folder may serve next to its index.md */
export const ASSET_TYPES: Record<string, string> = {
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".png": "image/png",
  ".webp": "image/webp",
  ".avif": "image/avif",
  ".gif": "image/gif",
  ".svg": "image/svg+xml",
  ".mp4": "video/mp4",
  ".pdf": "application/pdf",
};

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

// a relative link (./demo.jpg) points into the post's own folder, served
// at /blog/<slug>/demo.jpg (app/blog/[slug]/[file]/route.ts)
const resolve = (slug: string, href: string) =>
  /^(?:[a-z]+:|\/|#)/i.test(href)
    ? href
    : `/blog/${slug}/${href.replace(/^\.\//, "")}`;

function render(slug: string, markdown: string) {
  // its own instance: the global `marked` keeps renderers across dev
  // reloads, so an old renderer would stay active
  const marked = new Marked({
    renderer: {
      paragraph({ tokens }: Tokens.Paragraph) {
        const inner = this.parser.parseInline(tokens);
        // an image alone in a paragraph becomes a figure
        return tokens.length === 1 && tokens[0].type === "image"
          ? `${inner}\n`
          : `<p>${inner}</p>\n`;
      },
      // a chapter: full-width rule, then the underlined heading
      heading({ tokens, depth }: Tokens.Heading) {
        const inner = this.parser.parseInline(tokens);
        return depth === 2
          ? `<hr />\n<h2>${inner}</h2>\n`
          : `<h${depth}>${inner}</h${depth}>\n`;
      },
      image({ href, title, text }: Tokens.Image) {
        const caption = title
          ? `<figcaption>${escapeHtml(title)}</figcaption>`
          : "";
        return `<figure><img src="${escapeHtml(resolve(slug, href))}" alt="${escapeHtml(text)}" loading="lazy" />${caption}</figure>`;
      },
      link({ href, title, tokens }: Tokens.Link) {
        const t = title ? ` title="${escapeHtml(title)}"` : "";
        return `<a href="${escapeHtml(resolve(slug, href))}"${t}>${this.parser.parseInline(tokens)}</a>`;
      },
    },
  });
  let html = marked.parse(markdown, { async: false }) as string;
  // the intro always ends with a rule, also when the body starts with
  // plain text; a "---" next to a chapter rule collapses into one
  if (!html.trimStart().startsWith("<hr")) html = `<hr />\n${html}`;
  return html.replace(/(<hr \/>\s*){2,}/g, "<hr />\n");
}

function parse(slug: string): Post {
  const file = path.join(BLOGS_DIR, slug, "index.md");
  const raw = fs.readFileSync(file, "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) throw new Error(`blogs/${slug}/index.md: front matter missing`);
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
    if (!meta[key]) throw new Error(`blogs/${slug}/index.md: "${key}" missing`);
  return {
    slug,
    title: meta.title,
    date: meta.date,
    description: meta.description,
    tldr: meta.tldr || undefined,
    draft: meta.draft === "true",
    html: render(slug, match[2]),
  };
}

/** newest first; drafts only where SHOW_DRAFTS */
export function allPosts(): Post[] {
  if (!fs.existsSync(BLOGS_DIR)) return [];
  return fs
    .readdirSync(BLOGS_DIR, { withFileTypes: true })
    .filter(
      (d) =>
        d.isDirectory() &&
        fs.existsSync(path.join(BLOGS_DIR, d.name, "index.md")),
    )
    .map((d) => parse(d.name))
    .filter((p) => SHOW_DRAFTS || !p.draft)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function postBySlug(slug: string): Post | undefined {
  return allPosts().find((p) => p.slug === slug);
}

/** the files next to a post's index.md that the blog serves */
export function postAssets(slug: string): string[] {
  const dir = path.join(BLOGS_DIR, slug);
  return fs
    .readdirSync(dir)
    .filter((f) => ASSET_TYPES[path.extname(f).toLowerCase()]);
}

// Swiss German date format: 12.11.2026
export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00Z`).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "Europe/Zurich",
  });
