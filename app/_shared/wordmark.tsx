import Link from "next/link";
import { Text } from "./text";
import { Nav } from "./nav";

// Wordmark — full height of the left column. The subline is hung off the
// wordmark's baseline out of flow, so place-items-center sees the
// wordmark alone and lands it on the frame's midline; in flow it would
// drag the pair's center up by half the subline's height. On home it is
// the page's h1; everywhere else it links back home.
export function Wordmark({ home = false }: { home?: boolean }) {
  const mark = (
    <>
      <Text as={home ? "h1" : "span"} variant="logo">
        i2089
        {/* on home the logo is the h1; the hidden suffix gives search
            engines and screen readers the words the bands show */}
        {home && (
          <span className="sr-only">
            {" "}
            · AI consulting & frontend engineering by Marc Illien
          </span>
        )}
      </Text>
      {/* one line from the stem of the "i" to the edge of the "9"
          (inset-x-[0.45em] skips the glyphs' side bearings) */}
      <Text
        as="div"
        variant="signature"
        className="absolute inset-x-[0.45em] top-full mt-[1.6em]"
      >
        Digital Experiences by Marc Illien
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
