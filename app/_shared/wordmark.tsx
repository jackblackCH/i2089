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
  offer: "Agentic engineering, frontend & user interfaces",
};

export function Wordmark({ home = false }: { home?: boolean }) {
  const mark = (
    <Text as={home ? "h1" : "span"} variant="logo" className="np-logo-host">
      {/* the visible logo (i2089 turning into MARC ILLIEN) is hidden
            from assistive tech; this line reads instead. On home it is
            the h1, so it carries the offer too. */}
      <span className="sr-only">
        i2089 · {BYLINE.name}
        {home && `, ${BYLINE.offer}, Zürich`}
      </span>
      <LogoMark />
    </Text>
  );

  return (
    <section
      className={`p-pad relative grid place-items-center max-md:grid-rows-[1fr_auto] max-md:pb-[calc(var(--spacing-pad)/2)] ${
        home
          ? "max-md:min-h-[max(38svh,210px)]"
          : "max-md:min-h-[max(18svh,150px)]"
      }`}
    >
      {home ? (
        <div className="relative grid">{mark}</div>
      ) : (
        <Link href="/" className="link-mark relative grid">
          {mark}
        </Link>
      )}
      {/* after the mark: on phones it is the second row, in flow */}
      <Nav />
    </section>
  );
}
