import Image from "next/image";
import { Text } from "./text";
import type { Project } from "./content";

// Each card is the screenshot with title + date overlaid on a bottom
// gradient scrim. Mobile stacks; md+ shows a 2-column grid. Card height
// is locked by pb-[62.5%] (10/16) so images always render at full
// aspect regardless of parent height.
export function ProjectsList({
  projects,
  label,
}: {
  projects: Project[];
  label?: string;
}) {
  return (
    <div className="grid content-center gap-y-[clamp(12px,1.2vw,20px)] p-pad">
      {label && (
        <Text variant="footer" className="justify-self-start">
          {label}
        </Text>
      )}
      <ul className="grid gap-[clamp(16px,1.6vw,28px)] md:grid-cols-2">
        {projects.map((p) => (
          <li key={p.title}>
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} — ${p.linkLabel}`}
              className="group block w-full"
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

                <div className="text-15 absolute inset-0 flex items-end justify-between gap-4 p-[clamp(16px,1.6vw,28px)] text-white">
                  <div className="grid gap-y-[0.2em]">
                    <span className="font-medium leading-tight">
                      {p.title}
                    </span>
                    <span className="text-10 font-mono uppercase tracking-[0.06em] opacity-70">
                      {p.period}
                    </span>
                  </div>
                  <span className="text-10 font-mono uppercase tracking-[0.06em] opacity-70">
                    {p.linkLabel} ↗
                  </span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
