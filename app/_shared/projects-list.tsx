import Image from "next/image";
import Link from "next/link";
import { Text } from "./text";
import type { Project } from "./content";

// One column of large cards: the screenshot with title + date overlaid
// on a bottom gradient scrim. Cards are a group-step apart, like every
// other block in the column. Card height is locked by pb-[62.5%] (10/16)
// so images always render at full aspect regardless of parent height.
export function ProjectsList({
  projects,
  label,
}: {
  projects: Project[];
  label?: string;
}) {
  return (
    <div className="gap-y-label px-pad grid">
      {label && (
        <Text variant="footer" as="h2" className="text-trim">
          {label}
        </Text>
      )}
      <ul className="gap-y-group grid min-w-0">
        {projects.map((p) => (
          <li key={p.slug} className="min-w-0">
            <Link
              href={`/projects/${p.slug}`}
              aria-label={`${p.title}, ${p.period}`}
              className="group block w-full outline-offset-4 focus-visible:outline-1 focus-visible:outline-(--np-fg)"
            >
              <div className="relative w-full overflow-hidden border border-(--np-rule) pb-[62.5%]">
                <Image
                  src={p.image}
                  alt={`${p.title} — screenshot`}
                  fill
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />

                <div
                  aria-hidden
                  className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
                />

                {/* white, not the label colour — the text sits on the
                    dark scrim, not on the page */}
                <div className="p-item absolute inset-0 flex items-end justify-between gap-4 text-white">
                  <div className="gap-y-label grid">
                    <span className="text-trim font-medium">{p.title}</span>
                    <Text variant="footer" className="text-trim text-white/80!">
                      {p.period}
                    </Text>
                  </div>
                  <span
                    aria-hidden
                    className="text-trim transition-transform duration-300 group-hover:translate-x-1"
                  >
                    →
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
