import type { Metadata } from "next";
import Link from "next/link";
import { bands } from "./_shared/content";
import { Text } from "./_shared/text";
import { Contact, Clients } from "./_shared/contact";
import { WithArrow } from "./_shared/arrow";
import { pageMeta } from "./_shared/seo";

export const metadata: Metadata = pageMeta({
  title: "Marc Illien · Agentic engineering, web & app interfaces, Zürich",
  description:
    "Agentic engineering for dev teams, and web and app interfaces in React, Next.js and React Native. Marc Illien, independent software engineer in Zürich.",
  path: "/",
  absolute: true,
});

// Right column, three calm rows: the two offers as whole-row links, then
// one closing row with the audience and its proof (who it is for, and
// the clients that show it) right above the contact action. PFD: three
// chunks (L0); the audience is a claim, not a third offer, so it does not
// get an offer-sized band (L2/L4); proof sits next to the decision (L3);
// the contact stays in the first screen on phones (R5). Nothing on home
// moves while people read (R1). On md+ each row takes at least its
// content and shares the rest of the height evenly; the rows enter like
// every page (.enter, 50ms apart).
const ROW = "grid content-center p-pad md:py-[calc(var(--spacing-pad)/2)]";

export default function HomePage() {
  const [ai, apps, audience] = bands;
  return (
    <section className="np-panel enter grid md:grid-rows-[repeat(3,minmax(min-content,1fr))] md:overflow-y-auto">
      {/* the whole row is the link: it looks like one target, so it is
          one. Hover nudges the arrow toward the page instead of dimming
          the text (dimming reads as disabled); focus outlines the row. */}
      {[ai, apps].map((band, i) => (
        <Link
          key={band.words[0]}
          href={`/${band.slugs[0]}`}
          className={`group ${ROW} ${i > 0 ? "np-groove-t" : ""} focus-visible:outline-1 focus-visible:outline-offset-[-12px] focus-visible:outline-(--np-fg)`}
        >
          <Text as="h2" variant="title" className="text-balance">
            <span className="text-trim block">
              <WithArrow
                text={band.words[0]}
                arrowClassName="transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
              />
            </span>
          </Text>
        </Link>
      ))}
      <div className={`np-groove-t ${ROW} gap-y-group`}>
        <Clients label={audience.words[0]} />
        <Contact />
      </div>
    </section>
  );
}
