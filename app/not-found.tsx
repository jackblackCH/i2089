import Link from "next/link";
import { Frame } from "./_shared/frame";
import { Column } from "./_shared/column";

export default function NotFound() {
  return (
    <Frame>
      <Column title="Page not found">
        <div className="grid justify-items-start gap-y-item px-pad">
          <p>This page doesn&apos;t exist, or it moved.</p>
          <Link href="/" className="link-quiet text-trim">
            ← Back to start
          </Link>
        </div>
      </Column>
    </Frame>
  );
}
