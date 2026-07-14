"use client";

import { useRef } from "react";
import Image from "next/image";
import { Text } from "./text";
import type { Project } from "./content";

// Layout: mobile stacks, md+ splits into a 2-column grid. When the
// LIST'S OWN container is too short (<=460px tall) the grid would push
// content off-screen, so we switch to a horizontal scroll-snap carousel
// via the `carousel:` custom variant defined in globals.css. The wrapping
// div is a named `size` container so the query reads its actual height;
// this only works because the wrapper sits in a `minmax(0,1fr)` grid row,
// giving it a size independent of its content.
export function ProjectsList({ projects }: { projects: Project[] }) {
  const ref = useRef<HTMLUListElement>(null);

  const scroll = (direction: 1 | -1) => {
    const el = ref.current;
    if (!el) return;
    // Scroll by one card width including the gap, so each click advances
    // to the next snap point instead of drifting.
    const first = el.firstElementChild as HTMLElement | null;
    const step = first
      ? first.getBoundingClientRect().width +
        parseFloat(getComputedStyle(el).columnGap || "0")
      : el.clientWidth;
    el.scrollBy({ left: direction * step, behavior: "smooth" });
  };

  return (
    <div className="grid min-h-0 content-start gap-y-[clamp(16px,1.6vw,28px)] overflow-y-auto border-t border-(--np-rule) p-[clamp(24px,3vw,64px)] [container-name:projects] [container-type:size] carousel:overflow-y-hidden">
      <ul
        ref={ref}
        className="text-[clamp(13px,2.2vw,36px)] leading-snug md:text-[clamp(15px,1.22vw,22px)] grid gap-y-[2em] md:grid-cols-2 md:gap-x-[clamp(24px,3vw,64px)] carousel:flex carousel:gap-x-[clamp(24px,3vw,64px)] carousel:snap-x carousel:snap-mandatory carousel:overflow-x-auto carousel:overscroll-x-contain carousel:pb-2 carousel:[scrollbar-width:none] carousel:[&::-webkit-scrollbar]:hidden"
      >
        {projects.map((p) => (
          <li
            key={p.title}
            className="grid gap-y-[0.6em] carousel:min-w-0 carousel:shrink-0 carousel:snap-start carousel:basis-[calc(50%-(clamp(24px,3vw,64px)/2))]"
          >
            <a
              href={p.href}
              target="_blank"
              rel="noopener noreferrer"
              className="grid gap-y-[0.6em] transition-opacity hover:opacity-80 focus-visible:opacity-80 focus-visible:outline-none"
            >
              <Image
                src={p.image}
                alt={`${p.title} — screenshot`}
                width={1200}
                height={750}
                sizes="(min-width: 1024px) 40vw, (min-width: 768px) 40vw, 90vw"
                className="aspect-[16/10] w-full border border-(--np-rule) object-cover"
              />
              <span className="grid grid-cols-[1fr_auto] items-baseline gap-x-[1em]">
                <span>{p.title}</span>
                <span className="text-(--np-mute)">{p.linkLabel} ↗</span>
              </span>
            </a>
            <span className="text-(--np-mute)">{p.text}</span>
            <Text variant="footer">{p.period}</Text>
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
