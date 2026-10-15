import Link from "next/link";
import { Column } from "../_shared/column";

// The old-design /services page lives on as a redirect. next.config.mjs
// sends a 308 to /ai-solutions on Vercel; the static export
// (BUILD_STATIC=1) has no config redirects, so this page redirects with a
// meta refresh instead (React hoists <meta> into <head>), which works
// without JavaScript. The link covers anything that ignores it.
export default function Services() {
  return (
    <>
      <meta httpEquiv="refresh" content="0;url=/ai-solutions" />
      <link rel="canonical" href="https://i2089.com/ai-solutions" />
      <Column title="This page moved">
        <div className="gap-y-item px-pad grid justify-items-start">
          <Link href="/ai-solutions" className="link-quiet text-trim">
            Consulting & AI solutions →
          </Link>
        </div>
      </Column>
    </>
  );
}
