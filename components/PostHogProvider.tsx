"use client";

import { useEffect } from "react";

// PostHog is loaded lazily after the page is idle so it never blocks paint or
// interaction. Nothing in the app uses `usePostHog()`, so we skip the React
// context wrapper — that alone drops posthog-js/react from the initial bundle.
type IdleWindow = Window & {
  requestIdleCallback?: (
    cb: () => void,
    opts?: { timeout: number },
  ) => number;
  cancelIdleCallback?: (id: number) => void;
};

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;
    if (!key) return;

    const load = () => {
      import("posthog-js").then(({ default: posthog }) => {
        posthog.init(key, {
          api_host: "/ingest",
          ui_host: "https://eu.posthog.com",
          defaults: "2025-05-24",
          capture_exceptions: true,
          // skip the side-loaded recorder (~53 KiB) and surveys (~32 KiB)
          // bundles — neither feature is used on this site
          disable_session_recording: true,
          disable_surveys: true,
        });
      });
    };

    const w = window as IdleWindow;
    if (w.requestIdleCallback) {
      const id = w.requestIdleCallback(load, { timeout: 3000 });
      return () => w.cancelIdleCallback?.(id);
    }
    const id = window.setTimeout(load, 2000);
    return () => window.clearTimeout(id);
  }, []);

  return <>{children}</>;
}
