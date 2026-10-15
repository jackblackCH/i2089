import Link from "next/link";
import { Text } from "./text";

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
      </Text>
      <Text
        as="div"
        variant="signature"
        className="absolute left-1/2 top-full grid w-max -translate-x-1/2 justify-items-center gap-y-[0.35em] mt-[clamp(6px,0.9vw,18px)]"
      >
        <span>Digital Experiences</span>
        <span>by Marc Illien</span>
      </Text>
    </>
  );

  return (
    <section className="grid place-items-center p-pad">
      {home ? (
        <div className="relative grid justify-items-center">{mark}</div>
      ) : (
        <Link href="/" className="link-quiet relative grid justify-items-center">
          {mark}
        </Link>
      )}
    </section>
  );
}
