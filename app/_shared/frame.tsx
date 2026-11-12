"use client";

/// <reference types="react/canary" />
import { ViewTransition, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import { Wordmark } from "./wordmark";
import { Copyright } from "./copyright";
import "./shared.css";

// The site frame: wordmark left (with the nav at its foot), the page in the
// right column, copyright bottom-left. Rendered once in the root layout, so
// it stays mounted across navigations — only the right column changes.
// md+ locks the frame to the viewport and the right column scrolls; on
// mobile the whole frame scrolls.
export function Frame({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const home = pathname === "/";
  // the blog has its own one-column page (app/blog/blog-shell.tsx): no
  // wordmark column, no pinned copyright. It still scrolls inside the
  // fixed .np layer, which keeps the page above the sheet styles of
  // playground.css.
  if (pathname === "/blog" || pathname.startsWith("/blog/")) {
    return (
      <main className="np fixed inset-0 overflow-y-auto">
        <ViewTransition default="page">{children}</ViewTransition>
      </main>
    );
  }
  return (
    // on mobile the wordmark row is shorter on subpages, so their content
    // starts higher (PFD R1); home keeps the full stage. Home's 210px floor
    // fits the padding, logo, hanging byline and nav. Subpages hide the
    // byline on mobile, so 150px fits the padding, logo and nav. Those
    // floors are min-heights on the wordmark section (wordmark.tsx), and
    // the row is min-content, so it grows when the logo needs more (MARC
    // over ILLIEN). An auto or minmax(…, auto) row would not: in a
    // fixed-height grid whose content overflows, auto rows only get the
    // item's min-height, with no free space left to grow into.
    <main className="np fixed inset-0 grid grid-cols-1 grid-rows-[min-content_1fr] overflow-y-auto md:grid-cols-2 md:grid-rows-1">
      <Wordmark home={home} />
      {/* the page is one transition boundary: when a navigation swaps it,
          React runs a view transition and the column cross-fades
          (globals.css, .page). The frame around it stays still. */}
      <ViewTransition default="page">{children}</ViewTransition>
      <Copyright />
    </main>
  );
}
