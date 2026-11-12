"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

// Screenshots stacked on top of each other that fade slowly from one to
// the next: a 1.6s cross-fade, 6s per image. The fade pauses while the
// tab is hidden, and under reduced motion only the first image shows.
// Used by the project shots and the work preview on home.
const HOLD_MS = 6000;

export function FadeImages({
  images,
  sizes,
  priority = false,
  className = "",
}: {
  images: { src: string; alt: string }[];
  sizes: string;
  priority?: boolean;
  className?: string;
}) {
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
    <div className="absolute inset-0">
      {images.map(({ src, alt }, i) => (
        <Image
          key={src}
          src={src}
          alt={i === active ? alt : ""}
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
  );
}
