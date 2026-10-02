import Link from "next/link";
import { Text } from "./text";

// Wordmark — full height of the left column, links back home. The
// subline is hung off the wordmark's baseline out of flow so the
// wordmark itself lands on the frame's midline.
export function Wordmark() {
  return (
    <section className="grid place-items-center p-pad">
      <Link
        href="/"
        className="relative grid justify-items-center transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
      >
        <Text variant="logo">i2089</Text>
        <Text
          as="div"
          variant="signature"
          className="absolute left-1/2 top-full grid w-max -translate-x-1/2 justify-items-center gap-y-[0.35em] mt-[clamp(6px,0.9vw,18px)]"
        >
          <span>Digital Experiences</span>
          <span>by Marc Illien</span>
        </Text>
      </Link>
    </section>
  );
}
