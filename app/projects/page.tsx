import type { Metadata } from "next";
import { Entry, type EntryProps } from "../entry";
import { Header } from "../header";

export const metadata: Metadata = {
  title: "Projects // i2089 — Marc Illien",
  description:
    "Selected work by Marc Illien — Eckert Branded Goods (Saleor · Next.js) and air up® (Shopify · Next.js). Frontend consulting, engineering and headless commerce.",
};

const projects: EntryProps[] = [
  // {
  //   eyebrow: "2026 — In Progress",
  //   title: "Personal Magic",
  //   description:
  //     "Agentic workflows, tooling and engineering practice from first principles.",
  //   link: { name: "Personal Magic", href: "#" },
  // },
  {
    eyebrow: "Jun 2025 — Mar 2026",
    title: "Eckert Branded Goods",
    description:
      "Frontend Development with Next.js and Tailwind CSS for branded-goods.ch. Developed as business partner of Avolut.ch. Technology: and Saleor.io, an AI-ready, open-source e-commerce platform.",
    link: { name: "branded-goods.ch", href: "https://branded-goods.ch" },
  },
  {
    eyebrow: "May 2023 — May 2024",
    title: "air up®",
    description:
      "Headless e-commerce on Next.js and Shopify. Tailwind with Shadcn/ui, end-to-end design system, trunk-based delivery. Frontend consulting and technical leadership across the team.",
    link: { name: "air-up.com", href: "https://air-up.com" },
  },
  // {
  //   title: "More Clients",
  //   description:
  //     "AXA Switzerland (2019—2024) — Lead frontend engineer across many projects in the AXA ecosystem.",
  // },
];

export default function ProjectsPage() {
  return (
    <main className="text-20 gap-x-(--fluid-gutter) gap-y-(--space-pad) p-(--space-pad) grid h-full grid-cols-12 grid-rows-[auto_minmax(0,1fr)] font-sans">
      <Header
        nav={[
          { href: "/projects", label: "Projects" },
          { href: "/services", label: "Services" },
        ]}
      />

      <section className="gap-y-(--space-pad) col-span-full row-start-2 mt-auto grid min-h-0 content-center overflow-y-auto">
        {projects.map((p, idx) => (
          <Entry key={p.title} {...p} index={idx} />
        ))}
      </section>
    </main>
  );
}
