"use client";

import { useEffect, useState } from "react";

type Props = {
  beforeLines: [string, string];
  afterLines: [string, string];
  /** ms after mount before line 1 starts typing */
  initialDelay?: number;
  /** ms between line 1 finishing and line 2 starting (typing in, and again on the swap) */
  betweenLinesMs?: number;
  /** ms both before-lines stay on screen before line 1 gets struck */
  holdMs?: number;
  /** ms the strike line stays visible on line 1 before the erase begins */
  holdStruckMs?: number;
  /** ms pause inside a single line between erase complete and type start */
  pauseAfterEraseMs?: number;
  typeMs?: number;
  eraseMs?: number;
};

/**
 * Animation arc:
 *   type Vibe → type Coding → hold → strike Vibe → hold struck →
 *   erase Vibe (strike shrinks with it) → type Agentic →
 *   erase Coding → type Engineering
 *
 * Strictly sequential — only one line animates at a time; caret follows the active line.
 */
export function BrandLineSwap({
  beforeLines,
  afterLines,
  initialDelay = 220,
  betweenLinesMs = 220,
  holdMs = 2200,
  holdStruckMs = 700,
  pauseAfterEraseMs = 200,
  typeMs = 70,
  eraseMs = 38,
}: Props) {
  const [textA, setTextA] = useState("");
  const [textB, setTextB] = useState("");
  const [active, setActive] = useState<0 | 1 | null>(null);
  const [strikingA, setStrikingA] = useState(false);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setTextA(afterLines[0]);
      setTextB(afterLines[1]);
      return;
    }

    let cancelled = false;
    const sleep = (ms: number) =>
      new Promise<void>((resolve) => setTimeout(resolve, ms));

    const type = async (target: string, set: (s: string) => void) => {
      for (let k = 1; k <= target.length; k++) {
        if (cancelled) return;
        set(target.slice(0, k));
        await sleep(typeMs);
      }
    };

    const erase = async (current: string, set: (s: string) => void) => {
      for (let k = current.length - 1; k >= 0; k--) {
        if (cancelled) return;
        set(current.slice(0, k));
        await sleep(eraseMs);
      }
    };

    (async () => {
      await sleep(initialDelay);
      if (cancelled) return;

      // line 1: type "Vibe."
      setActive(0);
      await type(beforeLines[0], setTextA);
      if (cancelled) return;
      setActive(null);
      await sleep(betweenLinesMs);
      if (cancelled) return;

      // line 2: type "Coding."
      setActive(1);
      await type(beforeLines[1], setTextB);
      if (cancelled) return;
      setActive(null);

      // both visible — hold
      await sleep(holdMs);
      if (cancelled) return;

      // line 1: strike → hold struck → erase → pause → type "Agentic."
      setStrikingA(true);
      // .strike-now's CSS animation runs 700ms
      await sleep(700);
      if (cancelled) return;
      await sleep(holdStruckMs);
      if (cancelled) return;

      setActive(0);
      await erase(beforeLines[0], setTextA);
      if (cancelled) return;
      setStrikingA(false);
      await sleep(pauseAfterEraseMs);
      if (cancelled) return;
      await type(afterLines[0], setTextA);
      if (cancelled) return;
      setActive(null);
      await sleep(betweenLinesMs);
      if (cancelled) return;

      // line 2: erase → pause → type "Engineering."
      setActive(1);
      await erase(beforeLines[1], setTextB);
      if (cancelled) return;
      await sleep(pauseAfterEraseMs);
      if (cancelled) return;
      await type(afterLines[1], setTextB);
      if (cancelled) return;
      setActive(null);
    })();

    return () => {
      cancelled = true;
    };
  }, [
    beforeLines,
    afterLines,
    initialDelay,
    betweenLinesMs,
    holdMs,
    holdStruckMs,
    pauseAfterEraseMs,
    typeMs,
    eraseMs,
  ]);

  const renderLine = (text: string, isActive: boolean, struck: boolean) => (
    // reserve the line height so the page doesn't jump while text types in/out
    <span className="block" style={{ minHeight: "0.95em" }}>
      <span className={struck ? "strike-now" : "inline-block"}>{text}</span>
      {isActive && <span aria-hidden className="new-caret" />}
    </span>
  );

  return (
    <>
      {renderLine(textA, active === 0, strikingA)}
      {renderLine(textB, active === 1, false)}
    </>
  );
}
