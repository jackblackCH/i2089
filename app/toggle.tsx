"use client";

import { useState } from "react";

type Props = {
  onToggle: (state: boolean) => void;
  onLabel?: string;
  offLabel?: string;
  className?: string;
};

export default function Toggle({
  onToggle,
  onLabel = "ON",
  offLabel = "OFF",
  className,
}: Props) {
  const [on, setOn] = useState(false);

  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => {
        const next = !on;
        setOn(next);
        onToggle(next);
      }}
      className={`text-10 text-(--sheet-mute) inline-flex items-center gap-2 font-mono uppercase tracking-[0.02em] transition-colors ${className ?? ""}`}
    >
      <span
        aria-hidden
        className="inline-block h-2 w-2 rounded-full"
        style={{
          background: on ? "var(--sheet-fg)" : "transparent",
          border: "1px solid currentColor",
          transition: "background 200ms ease",
        }}
      />
      <span>{on ? onLabel : offLabel}</span>
    </button>
  );
}
