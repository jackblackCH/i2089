import Link from "next/link";
import { Text } from "./text";
import { Nav } from "./nav";

// Wordmark — full height of the left column. The byline is hung off the
// wordmark's baseline out of flow, so place-items-center sees the
// wordmark alone and lands it on the frame's midline; in flow it would
// drag the pair's center up by half the byline's height. On home it is
// the page's h1; everywhere else it links back home.
//
// PFD R2: the mark stays big, but who and what are now readable (body
// size, not an 11px tracked subline), so the first screen names the
// person and the offer. Mobile subpages drop it: there R1 (a compact
// first screen, lower layer) wins over R2, and the title says "what".
export const BYLINE = {
  name: "Marc Illien",
  offer: "AI coaching & frontend engineering, Zürich",
};

export function Wordmark({ home = false }: { home?: boolean }) {
  const mark = (
    <>
      <Text as={home ? "h1" : "span"} variant="logo">
        i2089
        {/* on home the logo is the h1; the hidden suffix reads the
            byline as part of it, and the visible byline is hidden from
            assistive tech so it is not read twice */}
        {home && (
          <span className="sr-only">
            {" "}
            · {BYLINE.name}, {BYLINE.offer}
          </span>
        )}
      </Text>
      {/* left edge on the stem of the "i" (0.045 of the logo size skips
          the glyph's side bearing) */}
      <Text
        as="div"
        variant="body"
        aria-hidden={home || undefined}
        className={`np-byline absolute top-full left-[calc(var(--logo)*0.045)] mt-item grid gap-y-label ${
          home ? "" : "max-md:hidden"
        }`}
      >
        <span className="text-trim block">{BYLINE.name}</span>
        <span className="text-trim block text-(--np-mute)">{BYLINE.offer}</span>
      </Text>
    </>
  );

  return (
    <section className="p-pad relative grid place-items-center">
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
