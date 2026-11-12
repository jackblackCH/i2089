import fs from "node:fs";
import path from "node:path";
import { ASSET_TYPES, BLOGS_DIR, allPosts, postAssets } from "../../posts";

// Serves the files next to a post's index.md (images, videos, PDFs) at
// /blog/<slug>/<file>, so a post links them as ./file.jpg. Static: every
// file is generated at build time, also for the static export.
export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return allPosts().flatMap((p) =>
    postAssets(p.slug).map((file) => ({ slug: p.slug, file })),
  );
}

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string; file: string }> },
) {
  const { slug, file } = await params;
  const type = ASSET_TYPES[path.extname(file).toLowerCase()];
  const known = allPosts().some((p) => p.slug === slug);
  if (!type || !known || file !== path.basename(file)) {
    return new Response("Not found", { status: 404 });
  }
  const data = fs.readFileSync(path.join(BLOGS_DIR, slug, file));
  return new Response(data, {
    headers: {
      "Content-Type": type,
      "Cache-Control": "public, max-age=86400",
    },
  });
}
