import type { Metadata } from "next";
import Link from "next/link";
import { bands } from "./_shared/content";
import { Text } from "./_shared/text";
import { Contact, Clients } from "./_shared/contact";
import { pageMeta } from "./_shared/seo";

export const metadata: Metadata = pageMeta({
  title: "Marc Illien · AI consulting & frontend engineering, Zürich",
  description:
    "AI coaching for dev teams and frontend engineering in React and Next.js. Marc Illien, independent software engineer in Zürich.",
  path: "/",
  absolute: true,
});

// Right column: the two offers as fixed links with an arrow (PFD R1:
// nothing a visitor clicks moves while they read), the audience band
// with the client line as its proof, and the contact action (PFD R5).
// Four chunks, the working-memory budget for one view. On mobile the
// frame scrolls, so the rows take their natural height.
export default function HomePage() {
  const [ai, engineering, audience] = bands;
  return (
    <section className="np-panel grid md:grid-rows-[repeat(3,minmax(0,0.3fr))_auto]">
      {[ai, engineering].map((band, i) => (
        <Text
          key={band.words[0]}
          as="h2"
          variant="title"
          className={`p-pad grid content-center ${i > 0 ? "np-groove-t" : ""}`}
        >
          <Link href={`/${band.slugs[0]}`} className="link-quiet text-trim block">
            {band.words[0]}
            <span aria-hidden>{"\u00a0"}→</span>
          </Link>
        </Text>
      ))}
      <div className="np-groove-t p-pad grid content-center gap-y-group">
        <Text as="h2" variant="title" className="text-(--np-mute)">
          <span className="text-trim block">{audience.words[0]}</span>
        </Text>
        <Clients />
      </div>
      <Contact className="np-groove-t p-pad" />
    </section>
  );
}
