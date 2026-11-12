"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { SCORES, SITE, overall, type Layers } from "./scores";
import { VariantPanel } from "./variant-panel";
import { REPLAY_EVENT } from "../_shared/variants";

// Before/after switch for the PFD fixes. Rendered only on localhost and
// Vercel previews (layout.tsx), never on i2089.com. "Before" lays the
// same path from the old build over the page in a full-screen frame:
// localhost:2223 (a worktree at 01eff2d) in dev, the live site on a
// preview. Key "b" switches, "s" shows or hides the scores, "v" the
// design variants, "r" replays the logo motion. Remove this folder after
// merge.
// pages that moved: the old build only knows their first URL
const BEFORE_PATH: Record<string, string> = { "/ai": "/ai-solutions" };

export function CompareToggle({ beforeOrigin }: { beforeOrigin: string }) {
  const pathname = usePathname();
  const [before, setBefore] = useState(false);
  const [panel, setPanel] = useState(false);
  const [variants, setVariants] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t?.closest("input,textarea,[contenteditable]")) return;
      if (e.key === "b") setBefore((v) => !v);
      if (e.key === "s") setPanel((v) => !v);
      if (e.key === "v") setVariants((v) => !v);
      if (e.key === "r") window.dispatchEvent(new Event(REPLAY_EVENT));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const page = SCORES[pathname];
  const s = page ?? { before: SITE.before, after: SITE.after, evidence: [] };
  const missingBefore = page && page.before === null;

  return (
    <>
      {before &&
        (missingBefore ? (
          <div className="fixed inset-0 z-[100] grid place-items-center bg-black text-sm text-neutral-300">
            This page is new. It has no &ldquo;before&rdquo;.
          </div>
        ) : (
          <iframe
            key={pathname}
            title="Before"
            src={beforeOrigin + (BEFORE_PATH[pathname] ?? pathname)}
            className="fixed inset-0 z-[100] h-full w-full border-0 bg-black"
          />
        ))}

      <div className="fixed right-3 bottom-3 z-[101] grid max-w-[min(26rem,calc(100vw-1.5rem))] justify-items-end gap-2 font-mono text-[12px] leading-snug text-neutral-100">
        {variants && <VariantPanel />}
        {panel && (
          <div className="max-h-[70svh] w-full overflow-y-auto rounded-md border border-white/15 bg-neutral-950/95 p-3 shadow-2xl backdrop-blur">
            <div className="mb-2 text-neutral-400">
              PFD · {page ? pathname : "site (no page data)"}
            </div>
            <ScoreTable before={s.before} after={s.after} />
            {s.evidence.length > 0 && (
              <>
                <div className="mt-3 mb-1 text-neutral-400">Evidence</div>
                <ul className="grid gap-1">
                  {s.evidence.map((e) => (
                    <li key={e}>✓ {e}</li>
                  ))}
                </ul>
              </>
            )}
            {page?.open && (
              <>
                <div className="mt-3 mb-1 text-neutral-400">Still open</div>
                <ul className="grid gap-1 text-amber-200">
                  {page.open.map((e) => (
                    <li key={e}>○ {e}</li>
                  ))}
                </ul>
              </>
            )}
            <div className="mt-3 text-neutral-500">
              Site: {overall(SITE.before)} → {overall(SITE.after)} · keys: b, s,
              v, r
            </div>
          </div>
        )}
        <div className="flex overflow-hidden rounded-md border border-white/15 bg-neutral-950/95 shadow-xl">
          {(["Before", "After"] as const).map((label) => {
            const on = (label === "Before") === before;
            return (
              <button
                key={label}
                type="button"
                aria-pressed={on}
                onClick={() => setBefore(label === "Before")}
                className={`px-3 py-2 ${on ? "bg-neutral-100 text-neutral-950" : "text-neutral-300 hover:text-white"}`}
              >
                {label}
              </button>
            );
          })}
          <button
            type="button"
            aria-pressed={variants}
            onClick={() => setVariants((v) => !v)}
            className={`border-l border-white/15 px-3 py-2 ${variants ? "text-white" : "text-neutral-300 hover:text-white"}`}
          >
            Variants
          </button>
          <button
            type="button"
            aria-pressed={panel}
            onClick={() => setPanel((v) => !v)}
            className={`border-l border-white/15 px-3 py-2 ${panel ? "text-white" : "text-neutral-300 hover:text-white"}`}
          >
            Scores
          </button>
        </div>
      </div>
    </>
  );
}

const signed = (d: number | null) =>
  d === null ? "" : d > 0 ? `+${d}` : `${d}`;

function ScoreTable({
  before,
  after,
}: {
  before: Layers | null;
  after: Layers;
}) {
  const keys = ["L0", "L1", "L2", "L3", "L4"] as const;
  const delta = (k: (typeof keys)[number]) =>
    before ? after[k] - before[k] : null;
  return (
    <table className="w-full tabular-nums">
      <thead className="text-neutral-400">
        <tr>
          <th className="text-left font-normal">Layer</th>
          <th className="text-right font-normal">Before</th>
          <th className="text-right font-normal">After</th>
          <th className="text-right font-normal">Δ</th>
        </tr>
      </thead>
      <tbody>
        {keys.map((k) => (
          <tr key={k}>
            <td>{k}</td>
            <td className="text-right">{before ? before[k] : "–"}</td>
            <td className="text-right">{after[k]}</td>
            <td className="text-right text-emerald-300">{signed(delta(k))}</td>
          </tr>
        ))}
        <tr className="border-t border-white/15 font-bold">
          <td>Overall</td>
          <td className="text-right">{before ? overall(before) : "–"}</td>
          <td className="text-right">{overall(after)}</td>
          <td className="text-right text-emerald-300">
            {signed(before ? overall(after) - overall(before) : null)}
          </td>
        </tr>
      </tbody>
    </table>
  );
}
