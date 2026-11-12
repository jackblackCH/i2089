"use client";

import { useSyncExternalStore } from "react";
import {
  AXES,
  DEFAULTS,
  REPLAY_EVENT,
  VARIANTS_EVENT,
  readVariants,
  writeVariants,
  type Axis,
  type Variants,
} from "../_shared/variants";

// The design-variant switcher (dev and previews only, with the compare
// toggle). Each axis is a row of buttons; a change to the logo axes
// replays the motion so you see it at once.
const subscribe = (cb: () => void) => {
  window.addEventListener(VARIANTS_EVENT, cb);
  return () => window.removeEventListener(VARIANTS_EVENT, cb);
};
const snapshot = () => JSON.stringify(readVariants());

export function VariantPanel() {
  const json = useSyncExternalStore(subscribe, snapshot, () => "");
  if (!json) return null;
  const v = JSON.parse(json) as Variants;
  const replay = () => window.dispatchEvent(new Event(REPLAY_EVENT));
  const set = (axis: Axis, value: string) => {
    writeVariants({ ...v, [axis]: value } as Variants);
    if (axis !== "labels") replay();
  };

  return (
    <div className="w-full rounded-md border border-white/15 bg-neutral-950/95 p-3 shadow-2xl backdrop-blur">
      {(Object.keys(AXES) as Axis[]).map((axis) => (
        <div key={axis} className="mb-3">
          <div className="mb-1 text-neutral-400">{AXES[axis].label}</div>
          <div className="flex flex-wrap gap-1">
            {Object.entries(AXES[axis].options).map(([value, label]) => {
              const on = v[axis] === value;
              return (
                <button
                  key={value}
                  type="button"
                  aria-pressed={on}
                  onClick={() => set(axis, value)}
                  className={`rounded px-2 py-1 ${on ? "bg-neutral-100 text-neutral-950" : "border border-white/15 text-neutral-300 hover:text-white"}`}
                >
                  {label}
                </button>
              );
            })}
          </div>
        </div>
      ))}
      <div className="grid grid-cols-2 gap-1">
        <button
          type="button"
          onClick={replay}
          className="rounded border border-white/25 px-2 py-1.5 text-neutral-100 hover:bg-white/10"
        >
          Replay motion (r)
        </button>
        <button
          type="button"
          onClick={() => {
            writeVariants(DEFAULTS);
            replay();
          }}
          className="rounded border border-white/25 px-2 py-1.5 text-neutral-100 hover:bg-white/10"
        >
          Reset to defaults
        </button>
      </div>
    </div>
  );
}
