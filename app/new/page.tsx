import { TypewriterSwap } from "./typewriter-swap";
import { ObfuscatedEmail } from "./email";

export default function NewHome() {
  return (
    <main
      className="grid font-sans h-full text-20"
      style={{
        gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
        gridTemplateRows: "auto minmax(0, 1fr) auto auto",
        columnGap: "var(--fluid-gutter)",
        rowGap: "var(--space-pad)",
        padding: "var(--space-pad)",
      }}
    >
      {/* meta block — top left, links home */}
      <a
        href="/new"
        className="font-mono uppercase text-10 tracking-[0.02em] reveal grid gap-1 hover:text-[var(--sheet-fg)] transition-colors"
        style={{
          gridColumn: "1 / span 5",
          gridRow: "1",
          color: "var(--sheet-mute)",
          ["--i" as never]: 0,
        }}
      >
        <div>Marc Illien</div>
        <div>8002 Zurich</div>
      </a>

      {/* nav — top right */}
      <nav
        className="font-mono uppercase text-10 text-right tracking-[0.02em] reveal grid gap-1"
        style={{
          gridColumn: "10 / span 3",
          gridRow: "1",
          color: "var(--sheet-mute)",
          ["--i" as never]: 1,
        }}
      >
        <a
          href="/new/project"
          className="hover:text-[var(--sheet-fg)] transition-colors"
        >
          Projects →
        </a>
        <a
          href="/new/services"
          className="hover:text-[var(--sheet-fg)] transition-colors"
        >
          Services →
        </a>
      </nav>

      {/* centered fat triangle with i2089 logo */}
      <section
        className="reveal-bloom"
        style={{
          gridColumn: "1 / -1",
          gridRow: "2",
          display: "grid",
          placeItems: "center",
          ["--i" as never]: 2,
        }}
      >
        <svg
          viewBox="0 0 100 86.6"
          aria-label="i2089"
          className="new-glow"
          style={{
            width: "min(60cqi, 70%)",
            height: "auto",
            display: "block",
          }}
        >
          <polygon
            points="50,0 100,86.6 0,86.6"
            fill="none"
            stroke="var(--sheet-mute)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            opacity={0.2}
          />
          <text
            x="50"
            y="62"
            textAnchor="middle"
            dominantBaseline="middle"
            fill="none"
            stroke="var(--sheet-mute)"
            strokeWidth={1}
            vectorEffect="non-scaling-stroke"
            fontFamily="var(--font-sans)"
            fontWeight={500}
            fontSize={24}
            letterSpacing="-0.111em"
            paintOrder="stroke"
            opacity={0.5}
          >
            i2089
          </text>
        </svg>
      </section>

      {/* display title */}
      <section
        style={{
          gridColumn: "1 / -1",
          gridRow: "3",
          display: "grid",
          alignItems: "end",
        }}
      >
        <h1 className="font-sans font-medium text-80 tracking-[-0.04em]">
          <a
            href="/new/services"
            className="block hover:opacity-80 transition-opacity"
            aria-label="Services — Agentic, Coding, Engineering"
          >
            <span
              className="block reveal"
              style={{ ["--i" as never]: 3 }}
            >
              Agentic.
            </span>
            <span
              className="block reveal"
              style={{ ["--i" as never]: 4 }}
            >
              <span
                className="strike"
                style={{ ["--i" as never]: 4 }}
              >
                Coding.
              </span>
            </span>
            <span
              className="block reveal"
              style={{ ["--i" as never]: 5 }}
            >
              <TypewriterSwap words={["Engineering.", "Design."]} />
            </span>
          </a>
        </h1>
      </section>

      {/* footer band */}
      <section
        style={{
          gridColumn: "1 / -1",
          gridRow: "4",
          display: "grid",
          gridTemplateColumns: "repeat(12, minmax(0, 1fr))",
          columnGap: "var(--fluid-gutter)",
          alignItems: "end",
          paddingTop: "clamp(1rem, 3cqi, 2.5rem)",
        }}
      >
        <ObfuscatedEmail
          className="font-sans text-20 underline underline-offset-4 decoration-1 reveal inline-block"
          style={{ gridColumn: "1 / span 4", ["--i" as never]: 6 }}
        />

        <div
          className="reveal font-mono text-10 uppercase tracking-[0.02em] text-right text-[var(--sheet-mute)]"
          style={{
            gridColumn: "11 / span 2",
            ["--i" as never]: 7,
          }}
        >
          2026
        </div>
      </section>
    </main>
  );
}
