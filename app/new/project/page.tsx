import { ObfuscatedEmail } from "../email";

type Project = {
  title: string;
  date: string;
  description: string;
  link: { name: string; href: string };
};

const projects: Project[] = [
  {
    title: "Personal Magic",
    date: "2026 — In Progress",
    description:
      "Agentic workflows, tooling and engineering practice from first principles.",
    link: { name: "Personal Magic", href: "#" },
  },
  {
    title: "Eckert Branded Goods",
    date: "Jun 2025 — Mar 2026",
    description:
      "Swiss e-commerce platform, designed and developed with Saleor, an AI-ready, open-source e-commerce platform.",
    link: { name: "branded-goods.ch", href: "https://branded-goods.ch" },
  },
  {
    title: "AXA",
    date: "2019 — 2024",
    description:
      "Lead frontend on KMU Rechner (2019 & 2025) and the internal messenger.",
    link: { name: "axa.ch", href: "https://axa.ch" },
  },
];

export default function ProjectPage() {
  return (
    <main
      className="grid h-full font-sans text-20 grid-cols-12 grid-rows-[auto_minmax(0,1fr)_auto] gap-x-[var(--fluid-gutter)] gap-y-[var(--space-pad)] p-[var(--space-pad)]"
    >
      {/* meta — top left, links home */}
      <a
        href="/new"
        className="reveal col-span-5 row-start-1 grid gap-1 font-mono text-10 uppercase tracking-[0.02em] text-[var(--sheet-mute)] hover:text-[var(--sheet-fg)] transition-colors"
        style={{ ["--i" as never]: 0 }}
      >
        <div>Marc Illien</div>
        <div>8002 Zurich</div>
      </a>

      {/* nav — top right */}
      <nav
        className="reveal col-start-10 col-span-3 row-start-1 grid gap-1 font-mono text-10 uppercase tracking-[0.02em] text-right text-[var(--sheet-mute)]"
        style={{ ["--i" as never]: 1 }}
      >
        <a
          href="/new/services"
          className="hover:text-[var(--sheet-fg)] transition-colors"
        >
          Services →
        </a>
      </nav>

      {/* body — same structure as the services page */}
      <section className="col-span-full row-start-2 min-h-0 overflow-y-auto grid content-center gap-y-[4rem]">
        {projects.map((p, idx) => (
          <article
            key={p.title}
            className="reveal grid grid-cols-12 gap-x-[var(--fluid-gutter)] gap-y-[var(--space-block)]"
            style={{ ["--i" as never]: 2 + idx }}
          >
            {/* date subline */}
            <div className="col-span-full font-mono text-10 uppercase tracking-[0.02em] text-[var(--sheet-mute)]">
              {p.date}
            </div>

            {/* title — full width */}
            <h2 className="col-span-full font-sans font-medium text-40 tracking-[-0.04em] leading-snug whitespace-break-spaces">
              {p.title}
            </h2>

            {/* description + link — 2/3 + 1/3 */}
            <p className="col-span-8 text-15 leading-[1.45] text-[var(--sheet-mute)]">
              {p.description}
            </p>
            <a
              href={p.link.href}
              target={p.link.href.startsWith("http") ? "_blank" : undefined}
              rel={p.link.href.startsWith("http") ? "noopener noreferrer" : undefined}
              className="col-span-4 self-end text-right text-15 text-[var(--sheet-mute)] hover:text-[var(--sheet-fg)] transition-colors"
            >
              {p.link.name} ↗
            </a>
          </article>
        ))}
      </section>

      {/* footer */}
      <section
        className="col-span-full row-start-3 grid grid-cols-12 gap-x-[var(--fluid-gutter)] items-end pt-[var(--space-row)]"
      >
        <ObfuscatedEmail
          className="reveal col-span-4 inline-block font-sans text-15 underline underline-offset-4 decoration-1"
          style={{ ["--i" as never]: 5 }}
        />

        <div
          className="reveal col-start-11 col-span-2 text-right font-mono text-10 uppercase tracking-[0.02em] text-[var(--sheet-mute)]"
          style={{ ["--i" as never]: 6 }}
        >
          2026
        </div>
      </section>
    </main>
  );
}
