import type { Metadata } from "next";
import { TypeCycle } from "./_shared/type-cycle";
import { bands } from "./_shared/content";
import { Text } from "./_shared/text";
import "./_shared/shared.css";

export const metadata: Metadata = {
  title: "Agentic Consulting, Frontend Software Engineering",
  description:
    "Agentic Consulting, Frontend and Software Engineering, and digital experiences for startups, SMEs, and corporates. Zürich, Switzerland.",
};

export default function HomePage() {
  return (
    <main className="np fixed inset-0 z-50 grid grid-cols-1 grid-rows-[38svh_1fr] overflow-y-auto md:grid-cols-2 md:grid-rows-1">
      {/* wordmark — takes the full height of the left column */}
      <section className="grid place-items-center p-pad">
        <div className="grid justify-items-center gap-y-[clamp(6px,0.9vw,18px)]">
          <Text as="h1" variant="logo">
            i2089
          </Text>
          <Text
            as="div"
            variant="signature"
            className="grid justify-items-center gap-y-[0.35em]"
          >
            <span>Digital Experiences</span>
            <span>by Marc Illien</span>
          </Text>
        </div>
      </section>

      {/* right column: three bands, then the copyright pinned bottom-right */}
      <section className="grid grid-rows-[repeat(3,minmax(0,0.35fr))_auto] border-t border-(--np-rule) md:border-l md:border-t-0">
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
        <Text
          variant="footer"
          className="border-t border-(--np-rule) px-pad py-pad-tight text-right"
        >
          ©2026 i2089 :: Marc Illien :: Zürich
        </Text>
      </section>
    </main>
  );
}
