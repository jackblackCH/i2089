"use client";

import { useEffect, useState } from "react";

type Props = {
  words: string[];
  startDelay?: number;
  holdMs?: number;
  typeMs?: number;
  eraseMs?: number;
  loop?: boolean;
};

export function TypewriterSwap({
  words,
  startDelay = 2400,
  holdMs = 2400,
  typeMs = 70,
  eraseMs = 38,
  loop = true,
}: Props) {
  const [text, setText] = useState(words[0] ?? "");

  useEffect(() => {
    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced || words.length < 2) return;

    (async () => {
      await sleep(startDelay);
      let i = 0;
      while (!cancelled) {
        const current = words[i];
        const next = words[(i + 1) % words.length];

        await sleep(holdMs);
        if (cancelled) return;

        // erase current
        for (let k = current.length; k >= 0; k--) {
          if (cancelled) return;
          setText(current.slice(0, k));
          await sleep(eraseMs);
        }

        // type next
        for (let k = 1; k <= next.length; k++) {
          if (cancelled) return;
          setText(next.slice(0, k));
          await sleep(typeMs);
        }

        i = (i + 1) % words.length;
        if (!loop && i === 0) return;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [words, startDelay, holdMs, typeMs, eraseMs, loop]);

  return (
    <span className="inline-flex items-baseline">
      <span>{text}</span>
      <span aria-hidden className="new-caret" />
    </span>
  );
}
