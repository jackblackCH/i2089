import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { bands } from "./_shared/content";
import { Text } from "./_shared/text";
import { WithArrow } from "./_shared/arrow";
import { pageMeta } from "./_shared/seo";

export const metadata: Metadata = pageMeta({
  title: "Marc Illien · Frontend / UX and agentic engineering, Zürich",
  description:
    "Frontend and UX for web and mobile apps in React, Next.js and React Native, and agentic engineering for teams. Marc Illien, Zürich.",
  path: "/",
  absolute: true,
});

// Right column, three equal bands in one style: a big title with an arrow
// and one small line under it. Frontend / UX first (the main offer),
// then Agentic Engineering, then the contact as a band of its own, so
// the page reads as one pattern three times (PFD L0: three chunks; L2:
// one style, no mixed box). Proof (clients, audience) lives on the offer
// pages, Work and About. Nothing on home moves while people read (R1);
// the contact stays in the first screen on phones (R5). On md+ each band
// takes at least its content and shares the rest of the height evenly;
// the bands enter like every page (.enter, 50ms apart).
const ROW =
  "group grid content-center gap-y-item px-pad py-[calc(var(--spacing-pad)/2)] focus-visible:outline-1 focus-visible:outline-offset-[-12px] focus-visible:outline-(--np-fg)";

const ARROW =
  "transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none";

function Band({ title, sub }: { title: string; sub: ReactNode }) {
  return (
    <>
      <Text as="h2" variant="title" className="text-balance">
        <span className="text-trim block">
          <WithArrow text={title} arrowClassName={ARROW} />
        </span>
      </Text>
      <Text as="p" variant="body" className="text-trim text-pretty text-(--np-mute)">
        {sub}
      </Text>
    </>
  );
}

export default function HomePage() {
  return (
    <section className="np-panel enter grid md:grid-rows-[repeat(3,minmax(min-content,1fr))] md:overflow-y-auto">
      {/* the whole band is the link: it looks like one target, so it is
          one. Hover nudges the arrow toward the page instead of dimming
          the text (dimming reads as disabled); focus outlines the band. */}
      {bands.map((band, i) => (
        <Link
          key={band.slugs[0]}
          href={`/${band.slugs[0]}`}
          className={`${ROW} ${i > 0 ? "np-groove-t" : ""}`}
        >
          <Band title={band.words[0]} sub={band.sub} />
        </Link>
      ))}
      <a href="mailto:hi@i2089.com" className={`${ROW} np-groove-t`}>
        <Band title="Let's talk" sub="hi@i2089.com · Zürich or remote" />
      </a>
    </section>
  );
}
