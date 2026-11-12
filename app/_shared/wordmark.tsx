import Link from "next/link";
import { Text } from "./text";
import { Nav } from "./nav";
import { LogoMark } from "./logo-mark";

// Wordmark — full height of the left column, centred on the frame's
// midline. On home it is the page's h1; everywhere else it links home.
//
// PFD R2: the logo itself turns from i2089 into MARC ILLIEN
// (logo-mark.tsx), so there is no separate name line under it. BYLINE
// feeds the hidden text that assistive tech reads instead.
export const BYLINE = {
  name: "Marc Illien",
  offer: "Frontend / UX and Agentic Engineering",
};

export function Wordmark({ home = false }: { home?: boolean }) {
  // The visible logo (i2089 turning into MARC ILLIEN) is hidden from
  // assistive tech and kept OUT of the h1 and the link text: its letters
  // are drawn twice (the flap halves), so as text they read
  // "ii22008899…" to search engines. The h1 on home and the home link
  // elsewhere carry only this clean line.
  const name = `i2089 · ${BYLINE.name}`;
  const mark = (
    <Text as="div" variant="logo" className="np-logo-host">
      <LogoMark />
    </Text>
  );

  return (
    <section
      className={`p-pad relative grid place-items-center max-md:grid-rows-[1fr_auto] max-md:pb-[calc(var(--spacing-pad)/2)] ${
        home
          ? "max-md:min-h-[max(32svh,210px)]"
          : "max-md:min-h-[max(18svh,150px)]"
      }`}
    >
      {home ? (
        <div className="relative grid">
          <h1 className="sr-only">{`${name}, ${BYLINE.offer}, Zürich`}</h1>
          {mark}
        </div>
      ) : (
        // the link covers the logo, so the whole mark stays the target;
        // hovering it dims the mark (np-mark in globals.css)
        <div className="np-mark relative grid">
          {mark}
          <Link href="/" className="link-mark absolute inset-0">
            <span className="sr-only">{name}</span>
          </Link>
        </div>
      )}
      {/* after the mark: on phones it is the second row, in flow */}
      <Nav />
    </section>
  );
}
