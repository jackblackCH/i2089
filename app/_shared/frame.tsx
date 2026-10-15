import type { ReactNode } from "react";
import { Nav } from "./nav";
import { Wordmark } from "./wordmark";
import { Copyright } from "./copyright";
import "./shared.css";

// Every page: wordmark left, content right, nav top-left and copyright
// bottom-left of the frame. md+ locks the frame to the viewport and the
// right column scrolls; on mobile the whole frame scrolls.
export function Frame({
  home = false,
  children,
}: {
  home?: boolean;
  children: ReactNode;
}) {
  return (
    <main className="np fixed inset-0 grid grid-cols-1 grid-rows-[38svh_1fr] overflow-y-auto md:grid-cols-2 md:grid-rows-1">
      <Nav />
      <Wordmark home={home} />
      {children}
      <Copyright />
    </main>
  );
}
