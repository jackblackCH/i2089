import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMeta } from "../../_shared/seo";
import { BlogShell } from "../blog-shell";
import { allPosts, formatDate, postBySlug } from "../posts";

export function generateStaticParams() {
  return allPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) return {};
  return {
    ...pageMeta({
      title: post.title,
      description: post.description,
      path: `/blog/${slug}`,
    }),
    ...(post.draft ? { robots: { index: false, follow: false } } : {}),
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = postBySlug(slug);
  if (!post) notFound();

  return (
    <BlogShell
      title={post.title}
      meta={
        <div className="blog-meta">
          <div className="blog-byline">
            <span>Marc Illien</span>
            <time dateTime={post.date}>{formatDate(post.date)}</time>
          </div>
          {post.draft && (
            <p className="blog-draft">Draft · only visible on previews</p>
          )}
        </div>
      }
    >
      {post.tldr && (
        <div className="blog-tldr">
          tl;dr
          <p>{post.tldr}</p>
        </div>
      )}
      {/* the post body from blogs/<slug>/index.md, rendered at build
          time; it opens with the rule that closes the intro (posts.ts) */}
      <div
        className="blog-body"
        dangerouslySetInnerHTML={{ __html: post.html }}
      />
    </BlogShell>
  );
}
