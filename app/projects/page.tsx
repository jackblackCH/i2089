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
      {/* wordmark — full height of the left column, links back home. The
          subline is hung off the wordmark's baseline out of flow so the
          wordmark itself lands on the frame's midline. */}
      <section className="grid place-items-center p-pad">
        <Link
          href="/"
          className="relative grid justify-items-center transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
        >
          <Text variant="logo">i2089</Text>
          <Text
            as="div"
            variant="signature"
            className="absolute left-1/2 top-full grid w-max -translate-x-1/2 justify-items-center gap-y-[0.35em] mt-[clamp(6px,0.9vw,18px)]"
          >
            <span>Digital Experiences</span>
            <span>by Marc Illien</span>
          </Text>
        </Link>
      </section>

      {/* Title / projects / contact / copyright. Projects row takes 1fr
          leftover; the others size to content. Section fills the column
          height exactly. */}
      <section className="grid grid-rows-[auto_minmax(0,1fr)_auto_auto] border-t border-(--np-rule) md:border-l md:border-t-0">
        <Text
          as="h1"
          variant="title"
          className="grid content-center p-pad"
        >
          <span className="text-trim block">Projects / Clients</span>
        </Text>

        <ProjectsList projects={projects} label="Projects" />
        {/* Contracts section hidden for now — re-enable when ready:
        <ProjectsList projects={contracts} label="Contracts" /> */}

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

