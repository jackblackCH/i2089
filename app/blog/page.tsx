import type { Metadata } from "next";
import Link from "next/link";
import { pageMeta } from "../_shared/seo";
import { BlogShell } from "./blog-shell";
import { allPosts, formatDate } from "./posts";

export const metadata: Metadata = pageMeta({
  title: "Blog: frontend, apps and agentic engineering",
  description:
    "Notes on frontend, apps and agentic engineering, from an independent software engineer in Zürich.",
  path: "/blog",
});

export default function BlogIndex() {
  const posts = allPosts();
  return (
    <BlogShell title="Blog">
      {posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="blog-list">
          {posts.map((p) => (
            <li key={p.slug}>
              <p className="blog-date">
                {formatDate(p.date)}
                {p.draft && " · Draft"}
              </p>
              <h2>
                <Link href={`/blog/${p.slug}`}>{p.title}</Link>
              </h2>
              <p>{p.description}</p>
            </li>
          ))}
        </ul>
      )}
    </BlogShell>
  );
}
