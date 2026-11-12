import type { Metadata } from "next";
import Link from "next/link";
import { bands } from "./_shared/content";
import { Text } from "./_shared/text";
import { Contact, Clients } from "./_shared/contact";
import { pageMeta } from "./_shared/seo";
import { WithArrow } from "./_shared/arrow";

export const metadata: Metadata = pageMeta({
  title: "Marc Illien · AI consulting & UX / frontend engineering, Zürich",
  description:
    "AI coaching for dev teams and UX / frontend engineering in React and Next.js. Marc Illien, independent software engineer in Zürich.",
  path: "/",
  absolute: true,
});

// Right column: the two offers as fixed links with an arrow (PFD R1:
// nothing a visitor clicks moves while they read), the audience band
// with the client line as its proof, and the contact action (PFD R5).
// Four chunks, the working-memory budget for one view. On md+ each row
// takes at least its content and the rest of the height is shared
// evenly, with half the block padding vertically so all four fit one
// screen; on mobile the frame scrolls and rows take their natural height.
const ROW = "grid content-center p-pad md:py-[calc(var(--spacing-pad)/2)]";

export default function HomePage() {
  const [ai, engineering, audience] = bands;
  return (
    <section className="np-panel grid md:grid-rows-[repeat(4,minmax(min-content,1fr))] md:overflow-y-auto">
      {[ai, engineering].map((band, i) => (
        <Text
          key={band.words[0]}
          as="h2"
          variant="title"
          className={`${ROW} ${i > 0 ? "np-groove-t" : ""}`}
        >
          <Link href={`/${band.slugs[0]}`} className="link-quiet text-trim block">
            <WithArrow text={band.words[0]} />
          </Link>
        </Text>
      ))}
      <div className={`np-groove-t ${ROW} gap-y-group max-md:order-4`}>
        <Text as="h2" variant="title" className="text-(--np-mute)">
          <span className="text-trim block">{audience.words[0]}</span>
        </Text>
        <Clients />
      </div>
      {/* on phones the contact comes right after the two offers, so it
          lands in the first screen (PFD R5); md+ keeps it last */}
      <Contact className={`np-groove-t ${ROW} max-md:order-3`} />
    </section>
  );
}
