"use client";

import Link from "next/link";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <main className="text-20 gap-x-(--fluid-gutter) p-(--space-pad) grid h-full grid-cols-12 grid-rows-[auto_minmax(0,1fr)] font-sans">
      <section className="col-span-full row-start-2 grid content-center gap-y-(--space-block)">
        <div className="text-10 text-(--sheet-mute) col-span-full font-mono uppercase tracking-[0.02em]">
          Something broke
        </div>
        <h1 className="text-40 col-span-full whitespace-break-spaces font-sans font-medium leading-snug tracking-[-0.04em]">
          A component crashed on this page.
        </h1>
        <div className="col-span-full flex gap-6">
          <button
            type="button"
            onClick={reset}
            className="text-15 text-(--sheet-mute) hover:text-(--sheet-fg) transition-colors"
          >
            ↻ Try again
          </button>
          <Link
            href="/"
            className="text-15 text-(--sheet-mute) hover:text-(--sheet-fg) transition-colors"
          >
            ← Back to start
          </Link>
        </div>
      </section>
    </main>
  );
}
