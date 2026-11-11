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
  const home = usePathname() === "/";
  return (
    // on mobile the wordmark row is shorter on subpages, so their content
    // starts higher (PFD R1); home keeps the full stage. Home's 210px floor
    // fits the padding, logo, hanging byline and nav. Subpages hide the
    // byline on mobile, so 150px fits the padding, logo and nav.
    <main
      className={`np fixed inset-0 grid grid-cols-1 overflow-y-auto md:grid-cols-2 md:grid-rows-1 ${
        home
          ? "grid-rows-[max(38svh,210px)_1fr]"
          : "grid-rows-[max(18svh,150px)_1fr]"
      }`}
    >
      <Wordmark home={home} />
      {/* the page is one transition boundary: when a navigation swaps it,
          React runs a view transition and the column cross-fades
          (globals.css, .page). The frame around it stays still. */}
      <ViewTransition default="page">{children}</ViewTransition>
      <Copyright />
    </main>
  );
}
