import type { Metadata } from "next";
import { Entry, type EntryProps } from "../entry";
import { Header } from "../header";

export const metadata: Metadata = {
  title: "Services // i2089 — Marc Illien",
  description:
    "Agentic engineering with the discipline of regular engineering. Daily-driving Claude Code since launch. For corporate teams and startups — coaching, embedded engineering, advisory.",
};

const primary: EntryProps[] = [
  {
    title: "Agentic Engineering.",
    description:
      "Same discipline I bring to code, applied to agents. Most leadership teams want to know where agents pay off and where they don't — that's where I start. Daily-driving Claude Code since it launched, with two projects designed and developed around agents from the ground up. The learning curve is behind me. Coaching, embedded engineering, advisory, or a contained build — whichever fits.",
  },
  {
    title: "Frontend Engineering.",
    description:
      "Long enough in enterprise frontend to know the difference between code that ages well and code that doesn't. I build web apps that don't need a rewrite a year in — modern stack, fast by default, maintainable without the overengineering tax. I tend to leave the codebase better than I found it. There's one version I do — the version that lasts.",
  },
  {
    title: "Prototypes and MVPs.",
    description:
      "From idea to working build, fast — and built like it's going to production. Design, architecture and code that hold up the moment someone says ship it. Some prototypes are worth keeping, some aren't — I'll tell you which up front.",
  },
];

export default function ServicesPage() {
  return (
    <main className="text-20 gap-x-(--fluid-gutter) gap-y-(--space-pad) p-(--space-pad) grid h-full grid-cols-12 grid-rows-[auto_minmax(0,1fr)] font-sans">
      <Header
        nav={[
          { href: "/projects", label: "Projects" },
          { href: "/services", label: "Services" },
        ]}
      />

      <section className="gap-y-(--space-pad) col-span-full row-start-2 mt-auto grid min-h-0 content-center overflow-y-auto">
        {primary.map((s, idx) => (
          <Entry key={s.title} {...s} index={idx} />
        ))}
      </section>
    </main>
  );
}
