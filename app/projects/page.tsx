import type { Metadata } from "next";
import Link from "next/link";
import { contracts, projects } from "../_shared/content";
import { Text } from "../_shared/text";
import { ProjectsList } from "../_shared/projects-list";
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
      <section className="grid place-items-center p-[clamp(24px,3vw,64px)]">
        <Link
          href="/"
          className="grid justify-items-center gap-y-[clamp(6px,0.9vw,18px)] transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
        >
          <Text variant="logo">i2089</Text>
          <span className="grid justify-items-center gap-y-[0.15em] text-[clamp(18px,4vw,45px)] font-bold leading-none tracking-[-0.04em] text-(--np-fg) md:text-[clamp(14px,2.25vw,45px)]">
            <span>Design &amp; Development</span>
            <span>by Marc Illien</span>
          </span>
        </Link>
      </section>

      {/* title / projects / contracts / contact / copyright */}
      <section className="grid grid-rows-[auto_minmax(0,1fr)_minmax(0,1fr)_auto_auto] border-t border-(--np-rule) md:border-l md:border-t-0">
        <Text
          as="h1"
          variant="title"
          className="grid content-center p-[clamp(24px,3vw,64px)]"
        >
          <span className="text-trim block">Projects / Clients</span>
        </Text>

        <ProjectsList projects={projects} label="Projects" />
        <ProjectsList projects={contracts} label="Contracts" />

        <Text
          as="div"
          variant="body"
          className="grid content-center gap-y-[0.6em] border-t border-(--np-rule) p-[clamp(24px,3vw,64px)]"
        >
          <span className="text-(--np-mute)">Open for new projects.</span>
          <a
            href="mailto:hi@i2089.com"
            className="w-max transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
          >
            hi@i2089.com
          </a>
        </Text>

        <Text
          variant="footer"
          className="border-t border-(--np-rule) px-[clamp(24px,3vw,64px)] py-[clamp(10px,0.9vw,16px)] text-right"
        >
          ©2026 i2089 :: i2089 :: Zürich :: 2026
        </Text>
      </section>
    </main>
  );
}

