"use client";

/// <reference types="react/canary" />
import { ViewTransition, useEffect, useState } from "react";
import Image from "next/image";
import type { Project } from "./content";

// A project's screenshots. The card and the detail page render them under
// the same transition name, so navigating between them morphs one into
// the other instead of cutting. Cropped from the top, so each site's
// header and hero always show. Motion lives in globals.css (.shot).
//
// More than one screenshot: they lie on top of each other and fade
// slowly from one to the next (1.6s cross-fade, 6s per image). The fade
// pauses while the tab is hidden, and under reduced motion only the first
// image shows.
const HOLD_MS = 6000;

export function Shot({
  project,
  sizes,
  priority = false,
  className = "",
}: {
  project: Project;
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
  const { images } = project;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => {
      if (!document.hidden) setActive((i) => (i + 1) % images.length);
    }, HOLD_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <ViewTransition name={`shot-${project.slug}`} share="shot">
      <div className="absolute inset-0">
        {images.map((src, i) => (
          <Image
            key={src}
            src={src}
            alt={i === active ? `${project.title} — screenshot` : ""}
            aria-hidden={i === active ? undefined : true}
            fill
            priority={priority && i === 0}
            sizes={sizes}
            className={`object-cover object-top transition-opacity duration-[1600ms] ease-in-out ${
              i === active ? "opacity-100" : "opacity-0"
            } ${className}`}
          />
        ))}
      </div>
    </ViewTransition>
  );
}
