import Link from "next/link";
import { Header } from "./header";

export default function NotFound() {
  return (
    <main className="text-20 gap-x-(--fluid-gutter) p-(--space-pad) grid h-full grid-cols-12 grid-rows-[auto_minmax(0,1fr)] font-sans">
      <Header
        nav={[
          { href: "/projects", label: "Projects" },
          { href: "/services", label: "Services" },
        ]}
      />

      <section className="col-span-full row-start-2 grid content-center gap-y-(--space-block)">
        <div className="text-10 text-(--sheet-mute) col-span-full font-mono uppercase tracking-[0.02em]">
          404 — Not found
        </div>
        <h1 className="text-40 col-span-full whitespace-break-spaces font-sans font-medium leading-snug tracking-[-0.04em]">
          This page doesn&apos;t exist.
        </h1>
        <Link
          href="/"
          className="text-15 text-(--sheet-mute) hover:text-(--sheet-fg) col-span-full transition-colors"
        >
          ← Back to start
        </Link>
      </section>
    </main>
  );
}
