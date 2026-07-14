"use client";

import { useState } from "react";

/** Dev helper — toggles the typewriter bands between filled and outlined. */
export function OutlineToggle() {
  const [outlined, setOutlined] = useState(false);

  const toggle = () => {
    const next = !outlined;
    setOutlined(next);
    document
      .querySelector<HTMLElement>(".np")
      ?.toggleAttribute("data-outline", next);
  };

  return (
    <button
      type="button"
      onClick={toggle}
      className="fixed bottom-4 right-4 z-[60] border border-(--np-rule) px-3 py-2 font-mono text-[11px] uppercase tracking-[0.08em] text-(--np-mute) transition-colors hover:text-(--np-fg)"
    >
      {outlined ? "outlined" : "filled"}
    </button>
  );
}
