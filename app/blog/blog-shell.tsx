import Link from "next/link";
import type { ReactNode } from "react";
import { Contact } from "../_shared/contact";
import "./blog.css";

// The blog's own page: one column on a Distill-style grid, cloned from a
// reference post (measurements in docs/pfd/2026-11-12-blog.md). It leaves
// the two-column frame: a header with the name and the nav, the title
// block with a rule under it, the article, and the contact at the end.
const NAV = [
  { href: "/ai", label: "Agentic" },
  { href: "/frontend", label: "Frontend & UI" },
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
];

export function BlogShell({
  title,
  meta,
  children,
}: {
  title: string;
  meta?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="blog">
      <header className="blog-header">
        <p className="blog-name">
          <Link href="/">Marc Illien</Link>
          <span aria-hidden> / </span>
          <Link href="/blog">Blog</Link>
        </p>
        <nav aria-label="Main" className="blog-nav">
          {NAV.map((l) => (
            <Link key={l.href} href={l.href}>
              {l.label}
            </Link>
          ))}
        </nav>
      </header>
      <div className="blog-title">
        <h1>{title}</h1>
      </div>
      <article className="blog-article">
        {meta}
        {children}
        <hr />
        <Contact className="blog-contact" />
        <p className="blog-colophon">©2026 Marc Illien, Zürich</p>
      </article>
    </div>
  );
}
