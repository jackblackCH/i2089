"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Props = {
  words: string[];
  /** optional link target per word — when set, the visible word links
      to its page and the target swaps with the cycle */
  hrefs?: string[];
  /** total duration of one word's cycle (type + hold + erase) — keep equal
      across instances so parallel typewriters never drift out of sync */
  cycleMs?: number;
  typeMs?: number;
  eraseMs?: number;
  /** ms before the first erase begins */
  initialHoldMs?: number;
};

export function TypeCycle({
  words,
  hrefs,
  cycleMs = 10000,
  typeMs = 110,
  eraseMs = 55,
  initialHoldMs = 4200,
}: Props) {
  const [text, setText] = useState(words[0]);
  const [index, setIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (
      words.length < 2 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    const type = async (word: string) => {
      for (let k = 1; k <= word.length; k++) {
        if (cancelled) return;
        setText(word.slice(0, k));
        await sleep(typeMs);
      }
    };

    const erase = async (word: string) => {
      for (let k = word.length - 1; k >= 0; k--) {
        if (cancelled) return;
        setText(word.slice(0, k));
        await sleep(eraseMs);
      }
    };

    (async () => {
      await sleep(initialHoldMs);
      if (cancelled) return;
      setAnimating(true);

      let i = 0;
      while (!cancelled) {
        const current = words[i % words.length];
        const next = words[(i + 1) % words.length];

        await erase(current);
        if (cancelled) return;
        setIndex((i + 1) % words.length);
        await sleep(600);
        if (cancelled) return;
        await type(next);
        if (cancelled) return;

        // pad the hold so every cycle takes exactly cycleMs, keeping
        // parallel instances in lockstep regardless of word length
        const spent =
          current.length * eraseMs + 600 + next.length * typeMs;
        await sleep(Math.max(2000, cycleMs - spent));
        i++;
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [words, cycleMs, typeMs, eraseMs, initialHoldMs]);

  // the animated text is empty mid-erase and partial mid-type, so assistive
  // tech reads the full current word instead of the animation frames
  const label = words[index];
  const content = (
    <span aria-hidden className="text-trim block min-h-[1.05em]">
      {text}
      {animating && <span className="new-caret" />}
    </span>
  );

  const href = hrefs?.[index];
  if (!href) {
    return (
      <>
        <span className="sr-only">{label}</span>
        {content}
      </>
    );
  }

  return (
    <Link
      href={href}
      aria-label={label}
      className="transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
    >
      {content}
    </Link>
  );
}
