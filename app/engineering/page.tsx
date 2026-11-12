import Link from "next/link";
import { Column } from "../_shared/column";
import { WithArrow } from "../_shared/arrow";

// The frontend page's first URL, /engineering, lives on as a redirect. next.config.mjs
// sends a 308 to /frontend on Vercel; the static export
// (BUILD_STATIC=1) has no config redirects, so this page redirects with a
// meta refresh instead (React hoists <meta> into <head>), which works
// without JavaScript. The link covers anything that ignores it.
export default function Engineering() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/frontend" />
      <link rel="canonical" href="https://i2089.com/frontend" />
      <Column title="This page moved">
        <div className="gap-y-item px-pad grid justify-items-start">
          <Link href="/frontend" className="link-quiet text-trim">
            <WithArrow text="Frontend & User Interfaces" />
          </Link>
        </div>
      </Column>
    </>
  );
}
