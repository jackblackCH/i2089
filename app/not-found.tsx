import Link from "next/link";
import { Column } from "./_shared/column";

export default function NotFound() {
  return (
    <Column title="Page not found">
      <div className="gap-y-item px-pad grid justify-items-start">
        <p>This page doesn&apos;t exist, or it moved.</p>
        <Link href="/" className="link-quiet text-trim">
          ← Back to start
        </Link>
      </div>
    </Column>
  );
}
