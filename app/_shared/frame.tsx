import type { ReactNode } from "react";
import { Wordmark } from "./wordmark";
import { Copyright } from "./copyright";
import "./shared.css";

// Every page: wordmark left (with the nav at its foot), content right,
// copyright bottom-left of the frame. md+ locks the frame to the viewport and the
// right column scrolls; on mobile the whole frame scrolls.
export function Frame({
  home = false,
  children,
}: {
  home?: boolean;
  children: ReactNode;
}) {
  return (
    // on mobile the wordmark row is shorter on subpages, so their
    // content starts higher; home keeps the full stage
    <main
      className={`np fixed inset-0 grid grid-cols-1 overflow-y-auto md:grid-cols-2 md:grid-rows-1 ${
        home ? "grid-rows-[38svh_1fr]" : "grid-rows-[24svh_1fr]"
      }`}
    >
      <Wordmark home={home} />
      {children}
      <Copyright />
    </main>
  );
}
