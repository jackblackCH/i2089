"use client";

import Toggle from "./toggle";
import { useDeviceOrientation } from "./use-device-orientation";

export default function OrientationInfo() {
  const { orientation, requestAccess, revokeAccess, error } =
    useDeviceOrientation();

  const onToggle = (state: boolean): void => {
    void (state ? requestAccess() : revokeAccess());
  };

  return (
    <div className="text-10 text-(--sheet-mute) pointer-events-none fixed bottom-(--space-pad) left-(--space-pad) z-10 grid gap-1 font-mono uppercase tracking-[0.02em]">
      <div className="pointer-events-auto">
        <Toggle onToggle={onToggle} onLabel="Gyro On" offLabel="Gyro Off" />
      </div>

      {orientation && (
        <ul className="grid gap-0.5">
          <li>
            ɑ: <code className="text-(--sheet-fg)">{fmt(orientation.alpha)}</code>
          </li>
          <li>
            β: <code className="text-(--sheet-fg)">{fmt(orientation.beta)}</code>
          </li>
          <li>
            γ: <code className="text-(--sheet-fg)">{fmt(orientation.gamma)}</code>
          </li>
        </ul>
      )}

      {error && <div className="text-(--sheet-fg)">{error.message}</div>}
    </div>
  );
}

function fmt(value: number | null): string {
  if (value === null) return "—";
  return value.toFixed(1).padStart(6, " ");
}
