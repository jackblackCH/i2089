import type { Metadata } from "next";
import { TypeCycle } from "./_shared/type-cycle";
import { bands } from "./_shared/content";
import { Text } from "./_shared/text";

export const metadata: Metadata = {
  title: "Consulting and frontend software engineering",
  description:
    "AI consulting, Agentic Engineering and frontend software engineering for startups, SMEs and corporates. Marc Illien, Zürich.",
};

// right column: three bands filling the full column height. The static
// audience band is set in the label colour, so the two linked bands read
// as the clickable ones.
export default function HomePage() {
  return (
    <section className="grid grid-rows-[repeat(3,minmax(0,0.35fr))] border-t border-(--np-rule) md:border-t-0 md:border-l">
      {bands.map((band, i) => (
        <Text
          key={band.words[0]}
          as="h2"
          variant="title"
          className={`np-line p-pad grid content-center ${
            i > 0 ? "border-t border-(--np-rule)" : ""
          } ${band.slugs.length ? "" : "text-(--np-mute)"}`}
        >
          <TypeCycle
            words={band.words}
            hrefs={band.slugs.map((slug) => `/${slug}`)}
          />
        </Text>
      ))}
    </section>
  );
}
