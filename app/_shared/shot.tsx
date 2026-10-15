/// <reference types="react/canary" />
import { ViewTransition } from "react";
import Image from "next/image";
import type { Project } from "./content";

// A project's screenshot. The card and the detail page render it under
// the same transition name, so navigating between them morphs one into
// the other instead of cutting. Cropped from the top, so the site's
// header and hero always show. Motion lives in globals.css (.shot).
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
  return (
    <ViewTransition name={`shot-${project.slug}`} share="shot">
      <Image
        src={project.image}
        alt={`${project.title} — screenshot`}
        fill
        data-shot
        priority={priority}
        sizes={sizes}
        className={`object-cover object-top ${className}`}
      />
    </ViewTransition>
  );
}
