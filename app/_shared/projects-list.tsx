"use client";

import { useRef } from "react";
import Image from "next/image";
import { Text } from "./text";
import type { Project } from "./content";

// Each card is just the screenshot with a title + date overlaid at the
// bottom, over a gradient scrim so the text stays legible on any image.
// Mobile stacks; md+ shows a 2-column grid; short containers flip to a
// horizontal scroll-snap carousel via the `carousel:` variant.
export function ProjectsList({
  projects,
  label,
}: {
  projects: Project[];
  label?: string;
}) {
  const ref = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = first
      ? first.getBoundingClientRect().width +
        parseFloat(getComputedStyle(el).columnGap || "0")
      : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="grid content-center gap-y-[clamp(12px,1.2vw,20px)] p-pad [container-name:projects] [container-type:size] carousel:overflow-hidden">
      {label && (
        <Text variant="footer" className="justify-self-start">
          {label}
        </Text>
      )}
      <ul
        ref={ref}
        className="grid gap-y-[clamp(16px,1.6vw,28px)] md:grid-cols-2 md:gap-x-pad carousel:flex carousel:gap-x-pad carousel:snap-x carousel:snap-mandatory carousel:overflow-x-auto carousel:overscroll-x-contain carousel:pb-2 carousel:[scrollbar-width:none] carousel:[&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <li
            key={p.title}
            className="carousel:min-w-0 carousel:shrink-0 carousel:snap-start carousel:basis-[calc(50%-(var(--spacing-pad)/2))]"
          >
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${p.title} — ${p.linkLabel}`}
              className="group relative block aspect-[16/10] w-full overflow-hidden border border-(--np-rule)"
            >
              <Image
                src={p.image}
                alt={`${p.title} — screenshot`}
                fill
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 40vw, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
              />

              {/* legibility scrim — only strong at the bottom where text sits */}
              <div
                aria-hidden
                className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/80 via-black/40 to-transparent"
              />

              {/* title + date, overlaid bottom-left. Link label sits
                  bottom-right as a small monospace echo of the URL. */}
              <div className="text-15 absolute inset-0 flex items-end justify-between gap-4 p-[clamp(16px,1.6vw,28px)] text-white">
                <div className="grid gap-y-[0.2em]">
                  <span className="font-medium leading-tight">{p.title}</span>
                  <span className="text-10 font-mono uppercase tracking-[0.06em] opacity-70">
                    {p.period}
                  </span>
                </div>
                <span className="text-10 font-mono uppercase tracking-[0.06em] opacity-70">
                  {p.linkLabel} ↗
                </span>
              </div>
            </a>
          </li>
        ))}
      </ul>

      <nav
        aria-label="Projects carousel"
        className="text-10 hidden justify-self-end gap-4 font-mono uppercase tracking-[0.02em] text-(--np-mute) carousel:flex"
      >
        <button
          type="button"
          onClick={() => scroll(-1)}
          aria-label="Previous projects"
          className="hover:text-(--np-fg) focus-visible:text-(--np-fg) focus-visible:outline-none transition-colors"
        >
          ← Prev
        </button>
        <span aria-hidden className="text-(--np-rule)">
          /
        </span>
        <button
          type="button"
          onClick={() => scroll(1)}
          aria-label="Next projects"
          className="hover:text-(--np-fg) focus-visible:text-(--np-fg) focus-visible:outline-none transition-colors"
        >
          Next →
        </button>
      </nav>
    </div>
  );
}
