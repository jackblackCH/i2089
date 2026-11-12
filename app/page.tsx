import type { Metadata } from "next";
import Link from "next/link";
import { allWork, bands } from "./_shared/content";
import { Text } from "./_shared/text";
import { Contact, Clients } from "./_shared/contact";
import { WithArrow } from "./_shared/arrow";
import { FadeImages } from "./_shared/fade-images";
import { pageMeta } from "./_shared/seo";
import { allPosts } from "./blog/posts";

export const metadata: Metadata = pageMeta({
  title: "Marc Illien · Agentic engineering & frontend, Zürich",
  description:
    "Agentic engineering for dev teams, frontend and user interfaces in React and Next.js. Marc Illien, independent software engineer in Zürich.",
  path: "/",
  absolute: true,
});

// Right column: the two offers as whole-row links with an arrow (PFD R1:
// nothing a visitor clicks moves while they read), the audience band
// with the client line and the latest post as its proof, and the contact
// action with a live look at the work beside it (PFD R5, proof next to
// the decision). Four chunks, the working-memory budget for one view.
// On md+ each row takes at least its content and the rest of the height
// is shared evenly, with half the block padding vertically so all four
// fit one screen; on mobile the frame scrolls and rows take their
// natural height. The rows enter like every page (.enter, 50ms apart).
const ROW = "grid content-center p-pad md:py-[calc(var(--spacing-pad)/2)]";

// the AXA calculator first (Marc's own work), then each case's first shot
const WORK = [
  ...allWork.flatMap((p) =>
    p.images
      .filter((src) => src.includes("calculator"))
      .map((src) => ({ src, alt: `${p.title} — screenshot` })),
  ),
  ...allWork.map((p) => ({ src: p.images[0], alt: `${p.title} — screenshot` })),
].filter((img, i, all) => all.findIndex((x) => x.src === img.src) === i);

export default function HomePage() {
  const [ai, engineering, audience] = bands;
  const latest = allPosts().find((p) => !p.draft);
  return (
    <section className="np-panel enter grid md:grid-rows-[repeat(4,minmax(min-content,1fr))] md:overflow-y-auto">
      {/* the whole row is the link: it looks like one target, so it is
          one. Hover nudges the arrow toward the page instead of dimming
          the text (dimming reads as disabled); focus outlines the row. */}
      {[ai, engineering].map((band, i) => (
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
      <div className={`np-groove-t ${ROW} gap-y-group max-md:order-4`}>
        <Text as="h2" variant="title" className="text-balance text-(--np-mute)">
          <span className="text-trim block">{audience.words[0]}</span>
        </Text>
        <div className="gap-y-item grid">
          <Clients />
          {latest && (
            <div className="gap-y-label grid">
              <Text as="h2" variant="footer" className="np-label text-trim">
                <span className="np-label-text">Latest</span>
              </Text>
              <Text as="p" variant="body" className="text-trim">
                <Link
                  href={`/blog/${latest.slug}`}
                  className="link-label hit-area text-(--np-mute)"
                >
                  <WithArrow text={latest.title} />
                </Link>
              </Text>
            </div>
          )}
        </div>
      </div>
      {/* on phones the contact comes right after the two offers, so it
          lands in the first screen (PFD R5); md+ keeps it last */}
      <div
        className={`np-groove-t ${ROW} gap-x-group gap-y-group items-center max-md:order-3 md:grid-cols-[auto_minmax(0,13rem)]`}
      >
        <Contact />
        <Link
          href="/projects"
          aria-label="Work: AXA, air up®, Talentir, Branded Goods"
          className="group gap-y-label grid w-full max-w-[13rem] justify-self-start transition-transform duration-160 ease-out active:scale-[0.98] motion-reduce:active:scale-100 md:justify-self-end"
        >
          <div className="np-card relative w-full overflow-hidden pb-[62.5%]">
            <FadeImages images={WORK} sizes="13rem" />
          </div>
          <Text variant="footer" className="text-trim">
            <WithArrow
              text="Work"
              arrowClassName="transition-transform duration-200 ease-out group-hover:translate-x-1 motion-reduce:transition-none"
            />
          </Text>
        </Link>
      </div>
    </section>
  );
}
