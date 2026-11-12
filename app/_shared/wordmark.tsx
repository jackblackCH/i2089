import Link from "next/link";
import { Text } from "./text";
import { Nav } from "./nav";
import { LogoMark } from "./logo-mark";

// Wordmark — full height of the left column. The byline is hung off the
// wordmark's baseline out of flow, so place-items-center sees the
// wordmark alone and lands it on the frame's midline; in flow it would
// drag the pair's center up by half the byline's height. On home it is
// the page's h1; everywhere else it links back home.
//
// PFD R2: the mark stays big, and who and what are readable. From xl up
// the byline is one line justified from the stem of the "i" to the edge
// of the "9", like the old subline, but in mixed case at ~0.128 of the
// logo size (14.7px at 1280, 16.6px at 1440). Below xl that size gets too
// small, so the byline is the name alone, centred under the mark; the
// bands and titles beside it say what. Mobile subpages drop it: there R1
// (a compact first row, lower layer) wins over R2.
export const BYLINE = {
  name: "Marc Illien",
  offer: "AI coaching & frontend engineering",
};

export function Wordmark({ home = false }: { home?: boolean }) {
  const mark = (
    <>
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
      <Text
        as="div"
        variant="body"
        aria-hidden={home || undefined}
        className={`np-byline absolute inset-x-[calc(var(--logo)*0.045)] top-full mt-item ${
          home ? "" : "max-md:hidden"
        }`}
      >
        <span className="text-trim block text-center xl:hidden">{BYLINE.name}</span>
        <span className="np-byline-justified text-trim hidden xl:block">
          {BYLINE.name}
          <span className="text-(--np-mute)"> · {BYLINE.offer}</span>
        </span>
      </Text>
    </>
  );

  return (
    <section
      className={`p-pad relative grid place-items-center ${
        home ? "max-md:min-h-[max(38svh,210px)]" : "max-md:min-h-[max(18svh,150px)]"
      }`}
    >
      <Nav />
      {home ? (
        <div className="relative grid">{mark}</div>
      ) : (
        <Link href="/" className="link-mark relative grid">
          {mark}
        </Link>
      )}
    </section>
  );
}
