import { ObfuscatedEmail } from "../email";

type Service = {
  title: string;
  description: string;
  project: { name: string; href: string };
};

const primary: Service[] = [
  {
    title: "Agentic Engineering in Corporates.",
    description:
      "Coaching corporate teams to ship high-quality code with LLMs. Consulting on integrating modern LLMs into legacy systems.",
    project: { name: "Personal Magic", href: "/new/project" },
  },
  {
    title: "Fullstack- & Frontend Development.",
    description:
      "High quality Frontend Architecture and Development. Code that is maintainable and not overengineered.",
    project: { name: "Eckert Branded Goods", href: "/new/project" },
  },
  {
    title: "UX/UI Design & Prototype and MVP Development.",
    description:
      "High quality development of prototypes and MVPs.",
    project: { name: "Personal Magic", href: "/new/project" },
  },
];

const more: Service[] = [
  { title: "Rapid Prototyping", description: "Concept → working build" },
  { title: "Design Systems", description: "Tokens · components · docs" },
  { title: "Frontend Architecture", description: "Reviews · audits · advisory" },
  { title: "Motion & 3D", description: "WebGL · Three.js · shaders" },
  { title: "MVPs & Production", description: "Next.js · TypeScript · ship" },
  { title: "Tech Stack Reviews", description: "Independent technical due diligence" },
];

export default function ServicesPage() {
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
          href="/new/project"
          className="hover:text-[var(--sheet-fg)] transition-colors"
        >
          Projects →
        </a>
      </nav>

      {/* body — single grid with one unified gap, no borders */}
      <section
        className="col-span-full row-start-2 min-h-0 overflow-y-auto grid content-center gap-y-[4rem]"
      >
        {primary.map((s, idx) => (
          <article
            key={s.title}
            className="reveal grid grid-cols-12 gap-x-[var(--fluid-gutter)] gap-y-[var(--space-block)]"
            style={{ ["--i" as never]: 2 + idx }}
          >
            <h2 className="col-span-full font-sans font-medium text-40 tracking-[-0.04em] leading-snug whitespace-break-spaces">
              {s.title}
            </h2>
            <p className="col-span-8 text-15 leading-[1.45] text-[var(--sheet-mute)]">
              {s.description}
            </p>
          </article>
        ))}

        {/* "We are also specialized in" — temporarily hidden */}
        {false && (
          <div
            className="reveal grid grid-cols-12 gap-x-[var(--fluid-gutter)] gap-y-[var(--space-block)]"
            style={{ ["--i" as never]: 4 }}
          >
            <div className="col-span-12 font-mono text-10 uppercase tracking-[0.02em] text-[var(--sheet-mute)]">
              We are also specialized in
            </div>

            <ul className="col-span-12 grid grid-cols-2 gap-x-[var(--fluid-gutter)] gap-y-[var(--space-block)] list-none p-0 m-0">
              {more.map((s) => (
                <li key={s.title} className="grid gap-1">
                  <span className="text-10 text-[var(--sheet-fg)]">
                    {s.title}
                  </span>
                  <span className="font-mono text-10 uppercase tracking-[0.02em] text-[var(--sheet-mute)]">
                    {s.description}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
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
