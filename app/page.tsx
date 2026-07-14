import type { Metadata } from "next";
import { TypeCycle } from "./new/type-cycle";
import { OutlineToggle } from "./new/outline-toggle";
import { bands } from "./new/content";
import { Text } from "./new/text";
import { Footer } from "./new/footer";
import "./new/new.css";

export const metadata: Metadata = {
  title: "Agentic Consulting, Frontend Software Engineering",
  description:
    "Agentic Consulting, Frontend and Software Engineering, and digital products for startups, SMEs, and corporates. Zürich, Switzerland.",
};

export default function HomePage() {
  return (
    <main className="np fixed inset-0 z-50 grid grid-cols-1 grid-rows-[auto_1fr_auto] overflow-y-auto md:grid-cols-2 md:grid-rows-[minmax(0,1fr)_auto]">
      {/* wordmark — mobile: first row full width; desktop: left half,
          invisible 3x3 subgrid with the mark centered in the middle row */}
      <section className="grid min-h-[38svh] grid-cols-3 grid-rows-3 p-[clamp(24px,3vw,64px)] md:min-h-0">
        <Text
          as="h1"
          variant="logo"
          className="col-span-full row-start-2 place-self-center"
        >
          i2089
        </Text>
      </section>

      {/* content — mobile: stacked below; desktop: right half, 3 bands:
          the two offers (typewriter cycles names for the same thing,
          never a new concept) and the static audience line */}
      <section className="grid grid-rows-3 border-t border-(--np-rule) md:border-l md:border-t-0">
        {bands.map((band, i) => (
          <Text
            key={band.words[0]}
            as="h2"
            variant="title"
            className={`np-line grid content-center p-[clamp(24px,3vw,64px)] ${
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

      <Footer />

      <OutlineToggle />
    </main>
  );
}
