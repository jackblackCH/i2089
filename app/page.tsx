import type { Metadata } from "next";
import { TypeCycle } from "./_shared/type-cycle";
import { bands } from "./_shared/content";
import { Text } from "./_shared/text";
import { pageMeta } from "./_shared/seo";

export const metadata: Metadata = pageMeta({
  title: "Marc Illien · AI consulting & frontend engineering, Zürich",
  description:
    "I help make dev teams 10x faster with AI, and build fast web apps in React and Next.js. AI consulting, coaching and frontend engineering, Zürich.",
  path: "/",
  absolute: true,
});

// right column: three bands filling the full column height. The static
// audience band is set in the label colour, so the two linked bands read
// as the clickable ones.
export default function HomePage() {
  return (
    <section className="np-panel grid grid-rows-[repeat(3,minmax(0,0.35fr))]">
      {bands.map((band, i) => (
        <Text
          key={band.words[0]}
          as="h2"
          variant="title"
          className={`np-line p-pad grid content-center ${
            i > 0 ? "np-groove-t" : ""
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
