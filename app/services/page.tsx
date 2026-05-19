import type { Metadata } from "next";
import { Entry, type EntryProps } from "../entry";
import { Header } from "../header";

export const metadata: Metadata = {
  title: "Services // i2089 — Marc Illien",
  description:
    "Services by Marc Illien — Agentic Engineering for corporates and startups, Fullstack Frontend Development & consulting, UX/UI design with prototypes and MVPs.",
};

const primary: EntryProps[] = [
  {
    title: "Agentic Engineering for Corporates and Startups.",
    description:
      "Consulting and coaching for teams in corporate companies and startups. We teach teams how to effectively use LLMs, such as Claude Code and Codex.",
  },
  {
    title: "Fullstack Frontend Development & Consulting.",
    description:
      "High-quality frontend development and consulting for modern, performant web applications. Maintainable code that is not overengineered.",
  },
  {
    title: "UX/UI Design, Prototypes and MVP's.",
    description: "High-quality design & development of prototypes and MVPs.",
  },
];

export default function ServicesPage() {
  return (
    <main className="text-20 gap-x-(--fluid-gutter) gap-y-(--space-pad) p-(--space-pad) grid h-full grid-cols-12 grid-rows-[auto_minmax(0,1fr)] font-sans">
      <Header nav={[{ href: "/projects", label: "Projects" }]} />

      <section className="gap-y-(--space-pad) col-span-full row-start-2 mt-auto grid min-h-0 content-center overflow-y-auto">
        {primary.map((s, idx) => (
          <Entry key={s.title} {...s} index={idx} />
        ))}
      </section>
    </main>
  );
}
