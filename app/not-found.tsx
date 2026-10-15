import type { Metadata } from "next";
import Link from "next/link";
import { Column } from "./_shared/column";

export const metadata: Metadata = { title: "Page not found" };

export default function NotFound() {
  return (
    <Column title="Page not found">
      <div className="gap-y-item px-pad grid justify-items-start">
        <p>I couldn&apos;t find this page. It may have moved.</p>
        <Link href="/" className="link-quiet text-trim">
          ← Back to start
        </Link>
      </div>
    </Column>
  );
}
