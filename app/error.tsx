"use client";

import Link from "next/link";
import { Frame } from "./_shared/frame";
import { Column } from "./_shared/column";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <Frame>
      <Column title="Something broke">
        <div className="grid justify-items-start gap-y-item px-pad">
          <p>This page didn&apos;t load properly.</p>
          <button
            type="button"
            onClick={reset}
            className="link-quiet text-trim cursor-pointer"
          >
            ↻ Try again
          </button>
          <Link href="/" className="link-quiet text-trim">
            ← Back to start
          </Link>
        </div>
      </Column>
    </Frame>
  );
}
