"use client";

import Link from "next/link";
import { Column } from "./_shared/column";

export default function Error({ reset }: { reset: () => void }) {
  return (
    <Column title="Something broke">
      <div className="gap-y-item px-pad grid justify-items-start">
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
  );
}
