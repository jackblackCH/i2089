import { redirect } from "next/navigation";

// The old-design /services page lives on as a redirect. next.config.mjs
// already sends a 308 to /ai-solutions on Vercel; this page covers the
// static export (BUILD_STATIC=1), which has no config redirects, so old
// links and bookmarks don't land on a 404.
export default function Services() {
  redirect("/ai-solutions");
}
