import type { Metadata } from "next";
import { TypeCycle } from "./_shared/type-cycle";
import { bands } from "./_shared/content";
import { Text } from "./_shared/text";
import { Copyright } from "./_shared/copyright";
import "./_shared/shared.css";

export const metadata: Metadata = {
  title: "Consulting, Frontend Software Engineering",
  description:
    "Consulting for AI introduction, AI design, and Agentic Engineering, and Frontend and Software Engineering, and digital experiences for startups, SMEs, and corporates. Zürich, Switzerland.",
};

export default function HomePage() {
  return (
    <main className="np fixed inset-0 z-50 grid grid-cols-1 grid-rows-[38svh_1fr] overflow-y-auto md:grid-cols-2 md:grid-rows-1">
      {/* wordmark — takes the full height of the left column. The subline is
          hung off the wordmark's baseline out of flow, so place-items-center
          sees the wordmark alone and lands it on the frame's midline; in flow
          it would drag the pair's center up by half the subline's height. */}
      <section className="grid place-items-center p-pad">
        <div className="relative grid justify-items-center">
          <Text as="h1" variant="logo">
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
        </div>
      </section>

      {/* right column: three bands filling the full column height */}
      <section className="grid grid-rows-[repeat(3,minmax(0,0.35fr))] border-t border-(--np-rule) md:border-l md:border-t-0">
        {bands.map((band, i) => (
          <Text
            key={band.words[0]}
            as="h2"
            variant="title"
            className={`np-line grid content-center p-pad ${
              i > 0 ? "border-t border-(--np-rule)" : ""
            }`}
          >
            <TypeCycle
              words={band.words}
              hrefs={band.slugs.map((slug) => `/${slug}`)}
            />
          </Text>
        ))}
      </section>

      <Copyright />
    </main>
  );
}
