/// <reference types="react/canary" />
import { ViewTransition } from "react";
import type { Project } from "./content";
import { FadeImages } from "./fade-images";

// A project's screenshots. The card and the detail page render them under
// the same transition name, so navigating between them morphs one into
// the other instead of cutting. Cropped from the top, so each site's
// header and hero always show. Motion lives in globals.css (.shot); more
// than one screenshot fades slowly through them (fade-images.tsx).
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
      <FadeImages
        images={project.images.map((src) => ({
          src,
          alt: `${project.title} — screenshot`,
        }))}
        sizes={sizes}
        priority={priority}
        className={className}
      />
    </ViewTransition>
  );
}
