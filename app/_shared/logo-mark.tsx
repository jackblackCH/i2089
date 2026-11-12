"use client";

import { useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { usePathname } from "next/navigation";
import {
  LOGO_SEEN_KEY,
  REPLAY_EVENT,
  VARIANTS_EVENT,
  readVariants,
  type Variants,
} from "./variants";

// The outlined logo, which turns from i2089 into MARC ILLIEN in the same
// style and place. Both words are stacked in one grid cell; at rest one
// is hidden (data-rest), during a motion both run. Motion, timing and fit
// come from the variants on <html> (variants.ts); sizes and rest states
// live in shared.css (.np-logo). Every motion sweeps left to right by
// each letter's x position, so the two words never overlap in one place.
const SRC = "i2089";
const DST = ["MARC", "ILLIEN"];
const EASE = "cubic-bezier(0.77, 0, 0.175, 1)";
// strong ease-out: starts fast, so the change reads as instant
const EASE_OUT = "cubic-bezier(0.23, 1, 0.32, 1)";
// the home loop shows the name this many times, then rests on it
const LOOP_CYCLES = 2;
const SWEEP = 520; // ms from the first to the last letter

type Side = "src" | "dst";

// a replay forgets that the motion played and bumps the snapshot, so the
// effect below starts over
let replays = 0;
const subscribe = (cb: () => void) => {
  const replay = () => {
    try {
      sessionStorage.removeItem(LOGO_SEEN_KEY);
    } catch {}
    delete document.documentElement.dataset.logoSeen;
    replays++;
    cb();
  };
  window.addEventListener(VARIANTS_EVENT, cb);
  window.addEventListener(REPLAY_EVENT, replay);
  return () => {
    window.removeEventListener(VARIANTS_EVENT, cb);
    window.removeEventListener(REPLAY_EVENT, replay);
  };
};
const snapshot = () => {
  const v = readVariants();
  return `${v.motion}|${v.timing}|${v.fit}|${replays}`;
};

function Letters({ text }: { text: string }) {
  return (
    <>
      {[...text].map((ch, i) => (
        <span key={i} className="np-ch">
          <span className="np-half np-top">{ch}</span>
          <span className="np-half np-bot" aria-hidden>
            {ch}
          </span>
        </span>
      ))}
    </>
  );
}

export function LogoMark() {
  const root = useRef<HTMLSpanElement>(null);
  const key = useSyncExternalStore(subscribe, snapshot, () => "");
  const home = usePathname() === "/";

  // a layout effect: the rest state (i2089 or the name) is set before
  // paint, so a client navigation never flashes the wrong word
  useLayoutEffect(() => {
    const node = root.current;
    if (!node || !key) return;
    const el: HTMLSpanElement = node;
    const [motion, chosen] = key.split("|") as [
      Variants["motion"],
      Variants["timing"],
    ];
    // the loop runs on home only; reading pages play once and rest on the
    // name (PFD R1: nothing moves while people read)
    const timing: Variants["timing"] =
      chosen === "loop" && !home ? "once" : chosen;
    document.documentElement.dataset.page = home ? "home" : "sub";
    let alive = true;
    const running: Animation[] = [];
    const layer = (s: Side) => el.querySelector<HTMLElement>(`.np-logo-${s}`)!;
    const wait = (ms: number) => new Promise<void>((r) => setTimeout(r, ms));
    // a hidden tab doesn't need the motion: wait until it is visible again
    const whenVisible = () =>
      document.hidden
        ? new Promise<void>((r) => {
            const on = () => {
              if (document.hidden) return;
              document.removeEventListener("visibilitychange", on);
              r();
            };
            document.addEventListener("visibilitychange", on);
          })
        : Promise.resolve();
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    const setRest = (s: Side | "both") => (el.dataset.rest = s);
    const seen = () => {
      try {
        sessionStorage.setItem(LOGO_SEEN_KEY, "1");
      } catch {}
      document.documentElement.dataset.logoSeen = "";
    };

    // each letter's start time: its x position across the whole mark
    const letters = (s: Side) => {
      const box = el.getBoundingClientRect();
      return [...layer(s).querySelectorAll<HTMLElement>(".np-ch")].map((ch) => {
        const r = ch.getBoundingClientRect();
        return {
          ch,
          t: ((r.left + r.width / 2 - box.left) / box.width) * SWEEP,
        };
      });
    };
    const run = (a: Animation) => (running.push(a), a.finished.catch(() => {}));

    async function play(from: Side, to: Side) {
      if (!alive) return;
      setRest("both");
      const f = layer(from);
      const t = layer(to);
      const jobs: Promise<unknown>[] = [];
      if (reduced) {
        jobs.push(
          run(
            f.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 150,
              fill: "forwards",
            }),
          ),
        );
        jobs.push(
          run(
            t.animate([{ opacity: 0 }, { opacity: 1 }], {
              duration: 150,
              fill: "both",
            }),
          ),
        );
      } else if (motion === "wipe") {
        const rule = el.querySelector<HTMLElement>(".np-logo-rule")!;
        const w = el.getBoundingClientRect().width;
        const o = { duration: 760, easing: EASE, fill: "both" as const };
        jobs.push(
          run(
            f.animate(
              [
                { clipPath: "inset(-20% -20% -20% 0%)" },
                { clipPath: "inset(-20% -20% -20% 100%)" },
              ],
              o,
            ),
          ),
        );
        jobs.push(
          run(
            t.animate(
              [
                { clipPath: "inset(-20% 100% -20% -20%)" },
                { clipPath: "inset(-20% -20% -20% -20%)" },
              ],
              o,
            ),
          ),
        );
        jobs.push(
          run(
            rule.animate(
              [
                { transform: "translateX(0)", opacity: 0 },
                { opacity: 1, offset: 0.1 },
                { opacity: 1, offset: 0.9 },
                { transform: `translateX(${w}px)`, opacity: 0 },
              ],
              o,
            ),
          ),
        );
      } else if (motion === "blur") {
        for (const { ch, t: d } of letters(from))
          jobs.push(
            run(
              ch.animate(
                [
                  { opacity: 1, filter: "blur(0)" },
                  { opacity: 0, filter: "blur(8px)" },
                ],
                { duration: 300, delay: d, easing: EASE_OUT, fill: "both" },
              ),
            ),
          );
        for (const { ch, t: d } of letters(to))
          jobs.push(
            run(
              ch.animate(
                [
                  { opacity: 0, filter: "blur(8px)" },
                  { opacity: 1, filter: "blur(0)" },
                ],
                {
                  duration: 420,
                  delay: d + 160,
                  easing: "cubic-bezier(0.23, 1, 0.32, 1)",
                  fill: "both",
                },
              ),
            ),
          );
      } else if (motion === "flap") {
        // split-flap: the old top half folds down over the hinge, the old
        // bottom folds away; the new bottom half falls into place with a
        // small settle, the new top shows as the old one leaves
        for (const { ch, t: d } of letters(from)) {
          const [top, bot] = ch.children as unknown as HTMLElement[];
          jobs.push(
            run(
              top.animate(
                [{ transform: "rotateX(0)" }, { transform: "rotateX(-90deg)" }],
                { duration: 130, delay: d, easing: "ease-in", fill: "both" },
              ),
            ),
          );
          jobs.push(
            run(
              bot.animate([{ opacity: 1 }, { opacity: 0 }], {
                duration: 1,
                delay: d + 130,
                fill: "both",
              }),
            ),
          );
        }
        for (const { ch, t: d } of letters(to)) {
          const [top, bot] = ch.children as unknown as HTMLElement[];
          jobs.push(
            run(
              top.animate([{ opacity: 0 }, { opacity: 1 }], {
                duration: 1,
                delay: d + 60,
                fill: "both",
              }),
            ),
          );
          jobs.push(
            run(
              bot.animate(
                [
                  { transform: "rotateX(90deg)" },
                  { transform: "rotateX(-12deg)", offset: 0.75 },
                  { transform: "rotateX(0)" },
                ],
                {
                  duration: 220,
                  delay: d + 130,
                  easing: "ease-in",
                  fill: "both",
                },
              ),
            ),
          );
        }
      } else {
        // decode: the new word fills with glyphs from the font that lock
        // into place left to right
        jobs.push(
          run(
            f.animate([{ opacity: 1 }, { opacity: 0 }], {
              duration: 140,
              fill: "forwards",
            }),
          ),
        );
        const pool = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        const items = letters(to).map(({ ch, t: d }) => ({
          halves: [...ch.children] as HTMLElement[],
          final: ch.firstElementChild!.textContent!,
          lock: d + 260,
        }));
        const start = performance.now();
        jobs.push(
          new Promise<void>((done) => {
            const tick = () => {
              const now = performance.now() - start;
              let left = 0;
              for (const it of items) {
                const c =
                  !alive || now >= it.lock || it.final === " "
                    ? it.final
                    : pool[(Math.random() * pool.length) | 0];
                if (c !== it.final) left++;
                for (const h of it.halves) h.textContent = c;
              }
              if (left && alive) setTimeout(tick, 45);
              else done();
            };
            tick();
          }),
        );
      }
      await Promise.all(jobs);
      if (!alive) return;
      setRest(to);
      for (const a of running.splice(0)) a.cancel();
    }

    async function start() {
      setRest("src");
      const was = !!sessionStorage.getItem(LOGO_SEEN_KEY);
      if (timing === "once") {
        if (was) return setRest("dst");
        await wait(1200);
        await play("src", "dst");
        if (alive) seen();
      } else if (timing === "back") {
        if (was) return;
        await wait(1200);
        await play("src", "dst");
        await wait(2200);
        await play("dst", "src");
        if (alive) seen();
      } else if (timing === "loop") {
        // home: show the name LOOP_CYCLES times, then rest on it for the
        // session (later visits start on the name); paused in hidden tabs
        if (was) return setRest("dst");
        let side: Side = "src";
        let shown = 0;
        await wait(1200);
        while (alive) {
          await whenVisible();
          const next: Side = side === "src" ? "dst" : "src";
          await play(side, next);
          side = next;
          if (next === "dst" && ++shown >= LOOP_CYCLES) {
            if (alive) seen();
            return;
          }
          await wait(6000);
        }
      }
    }

    // hover / focus: the wordmark section is the target, so the whole
    // stage reacts, not only the glyphs
    let side: Side = "src";
    let want: Side = "src";
    let busy = false;
    const go = async () => {
      if (busy) return;
      busy = true;
      while (alive && side !== want) {
        const next = want;
        await play(side, next);
        side = next;
      }
      busy = false;
    };
    const stage = el.closest("section");
    const on = () => ((want = "dst"), go());
    const off = () => ((want = "src"), go());
    if (timing === "hover" && stage) {
      stage.addEventListener("pointerenter", on);
      stage.addEventListener("pointerleave", off);
      stage.addEventListener("focusin", on);
      stage.addEventListener("focusout", off);
    }

    if (timing !== "hover") start();
    else setRest("src");

    return () => {
      alive = false;
      for (const a of running.splice(0)) a.cancel();
      if (stage) {
        stage.removeEventListener("pointerenter", on);
        stage.removeEventListener("pointerleave", off);
        stage.removeEventListener("focusin", on);
        stage.removeEventListener("focusout", off);
      }
    };
  }, [key, home]);

  return (
    <span ref={root} className="np-logo" data-rest="src" aria-hidden>
      <span className="np-logo-src">
        <Letters text={SRC} />
      </span>
      <span className="np-logo-dst">
        {DST.map((line, i) => (
          <span key={line} className="np-logo-line">
            {i > 0 && <span className="np-logo-gap"> </span>}
            <Letters text={line} />
          </span>
        ))}
      </span>
      <span className="np-logo-rule" />
    </span>
  );
}
