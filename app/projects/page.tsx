import type { Metadata } from "next";
import { Entry, type EntryProps } from "../entry";
import { Header } from "../header";

export const metadata: Metadata = {
  title: "Projects // i2089 — Marc Illien",
  description:
    "Selected work by Marc Illien — Eckert Branded Goods (Saleor · Next.js) and AXA Switzerland. Frontend consulting, engineering and headless commerce.",
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
    eyebrow: "2019 — 2024",
    title: "AXA",
    description:
      "Lead frontend engineer for many projects within the AXA Switzerland ecosystem.",
    link: { name: "axa.ch", href: "https://axa.ch" },
  },
];

export default function ProjectsPage() {
  return (
    <main className="text-20 gap-x-(--fluid-gutter) gap-y-(--space-pad) p-(--space-pad) grid h-full grid-cols-12 grid-rows-[auto_minmax(0,1fr)] font-sans">
      <Header nav={[{ href: "/services", label: "Services" }]} />

      <section className="gap-y-(--space-pad) col-span-full row-start-2 mt-auto grid min-h-0 content-center overflow-y-auto">
        {projects.map((p, idx) => (
          <Entry key={p.title} {...p} index={idx} />
        ))}
      </section>
    </main>
  );
}
