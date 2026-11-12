import Link from "next/link";
import { Text } from "./text";
import { Shot } from "./shot";
import type { Project } from "./content";
import { Arrow } from "./arrow";

// Large cards: the screenshot with title + date overlaid on a bottom
// gradient scrim. One column, a group step apart; when the list itself
// is at least 60rem wide (a very wide screen), two columns, so four
// cases form a 2x2 grid instead of a narrow strip (container query, so
// it follows the column, not the window). Card height is locked by
// pb-[62.5%] (10/16), so images keep their aspect at any width.
export function ProjectsList({
  projects,
  label,
}: {
  projects: Project[];
  label?: string;
}) {
  return (
    <div className="gap-y-label px-pad @container grid">
      {label && (
        <Text variant="footer" as="h2" className="np-label text-trim">
          <span className="np-label-text">{label}</span>
        </Text>
      )}
      <ul className="gap-y-group grid min-w-0 gap-x-group @min-[60rem]:grid-cols-2">
        {projects.map((p) => (
          // a card, not text: free of the 60ch text measure (globals.css)
          <li key={p.slug} className="min-w-0 max-w-none">
            <Link
              href={`/projects/${p.slug}`}
              aria-label={`${p.title}, ${p.period}`}
              className="group block w-full outline-offset-4 transition-transform duration-160 ease-out focus-visible:outline-1 focus-visible:outline-(--np-fg) active:scale-[0.98] motion-reduce:active:scale-100"
            >
              <div className="np-card w-full overflow-hidden pb-[62.5%]">
                <Shot project={p} sizes="(min-width: 768px) 45vw, 90vw" />

                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                />

                {/* the foreground token at full strength, not the label
                    colour — the text sits on the dark scrim, not on the page */}
                <div className="p-item absolute inset-0 flex items-end justify-between gap-x-item text-(--np-fg)">
                  <div className="grid gap-y-[0.6em]">
                    <span className="text-trim">{p.title}</span>
                    <Text variant="footer" className="text-trim text-(--np-fg)/80!">
                      {p.period}
                    </Text>
                  </div>
                  <Arrow className="transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
