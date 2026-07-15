import type { Metadata } from "next";
import Link from "next/link";
import { contracts, projects } from "../_shared/content";
import { Text } from "../_shared/text";
import { ProjectsList } from "../_shared/projects-list";
import { Copyright } from "../_shared/copyright";
import "../_shared/shared.css";

export const metadata: Metadata = {
  title: "Projects / Clients",
  description:
    "Selected projects — Branded Goods (Saleor, Next.js), air up® (Shopify, Next.js), Talentir. Recurring contracts at AXA Switzerland since 2018.",
};

export default function ProjectsPage() {
  return (
    <main className="np fixed inset-0 z-50 grid grid-cols-1 grid-rows-[38svh_1fr] overflow-y-auto md:grid-cols-2 md:grid-rows-1">
      {/* wordmark — full height of the left column, links back home */}
      <section className="grid place-items-center p-pad">
        <Link
          href="/"
          className="grid justify-items-center gap-y-[clamp(6px,0.9vw,18px)] transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
        >
          <Text variant="logo">i2089</Text>
          <Text
            as="div"
            variant="signature"
            className="grid justify-items-center gap-y-[0.35em]"
          >
            <span>Digital Experiences</span>
            <span>by Marc Illien</span>
          </Text>
        </Link>
      </section>

      {/* Same fictive band rhythm as [slug]: 4 equal-weight rows
          (title / projects / contracts / contact) + copyright, no
          visible dividers between them. */}
      <section className="grid grid-rows-[repeat(4,minmax(0,0.35fr))_auto] border-t border-(--np-rule) md:border-l md:border-t-0">
        <Text
          as="h1"
          variant="title"
          className="grid content-center p-pad"
        >
          <span className="text-trim block">Projects / Clients</span>
        </Text>

        <ProjectsList projects={projects} label="Projects" />
        <ProjectsList projects={contracts} label="Contracts" />

        <Text
          as="div"
          variant="body"
          className="grid content-center gap-y-[0.6em] p-pad"
        >
          <span className="text-(--np-mute)">Open for new projects.</span>
          <a
            href="mailto:hi@i2089.com"
            className="w-max transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
          >
            hi@i2089.com
          </a>
        </Text>

        <Copyright />
      </section>
    </main>
  );
}

