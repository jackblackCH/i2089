import type { Metadata } from "next";
import { Entry, type EntryProps } from "../entry";
import { Header } from "../header";

export const metadata: Metadata = {
  title: "Services // i2089, Marc Illien",
  description:
    "Agentic engineering with the discipline of regular engineering. Daily-driving Claude Code since launch. For corporate teams and startups: coaching, embedded engineering, advisory.",
};

const primary: EntryProps[] = [
  {
    title: "Enable Agentic Engineering in corporates and startups.",
    description:
      "I help you understand the difference between vibe coding and Agentic Engineering and boost your productivity. I've used Claude Code, Codex, and the modern LLM tools daily, finished multiple projects and gained on hands experience with them.\n\nGood output takes more than knowing the tools. It takes taste, experience, and a deep understanding of what these machines can actually do and more important how to use them.\n\nUsed well, the speed and productivity boost is hard to overstate and a real advantage in any business.\n\nI specialise in teaching these skills to startups and corporates that need hands-on help getting started. Through coaching, workshops, or by joining your project as both engineer or coach.",
  },
  {
    title: "Frontend Engineering.",
    description:
      "Long enough in enterprise frontend to know the difference between code that ages well and code that doesn't. I build web apps that don't need a rewrite a year in: modern stack, fast by default, maintainable without the overengineering tax. I tend to leave the codebase better than I found it.",
  },
  {
    title: "Prototypes and MVPs.",
    description:
      "From idea to working build, fast, and built like it's going to production. Design, architecture and code that hold up the moment someone says ship it. Some prototypes are worth keeping, some aren't. I'll tell you which up front.",
  },
];

export default function ServicesPage() {
  return (
    <main className="text-20 gap-x-(--fluid-gutter) gap-y-(--space-pad) p-(--space-pad) grid h-full min-h-0 grid-cols-12 grid-rows-[auto_minmax(0,1fr)] overflow-y-auto font-sans">
      <Header
        nav={[
          { href: "/projects", label: "Projects" },
          { href: "/services", label: "Services" },
        ]}
      />

      <section className="gap-y-(--space-pad) col-span-full row-start-2 grid min-h-0 overflow-y-auto [align-content:safe_center]">
        {primary.map((s, idx) => (
          <Entry key={s.title} {...s} index={idx} />
        ))}
      </section>
    </main>
  );
}
