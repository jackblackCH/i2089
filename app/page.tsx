import type { Metadata } from "next";
import { Header } from "./header";
import OrientationInfo from "./orientation-info";
import { TypewriterSwap } from "./typewriter-swap";

export const metadata: Metadata = {
  title: "i2089 // Agentic. Coding. Engineering.",
  description:
    "i2089 — the independent web engineering studio of Marc Illien in Zürich. High-quality Frontend- and Agentic Engineering, LLMs, production code.",
};

export default function Home() {
  return (
    <main className="text-20 gap-x-(--fluid-gutter) p-(--space-pad) grid h-full grid-cols-12 grid-rows-[auto_minmax(0,1fr)_auto] font-sans">
      <OrientationInfo />
      <Header
        nav={[
          { href: "/projects", label: "Projects →" },
          { href: "/services", label: "Services →" },
        ]}
      />

      {/* centered fat triangle with i2089 logo */}
      <section
        className="reveal-bloom col-span-full row-start-2 grid place-items-center"
        style={{ ["--i" as never]: 2 }}
      >
        <div className="new-aura-wrap relative grid w-[min(60cqi,70%)] place-items-center">
          <div className="new-aura" aria-hidden />
          <svg
            viewBox="0 0 100 86.6"
            aria-label="i2089"
            className="new-glow relative z-10 block h-auto w-full"
          >
            <polygon
              points="50,0 100,86.6 0,86.6"
              fill="none"
              stroke="var(--sheet-mute)"
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
              opacity={0.45}
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
              opacity={0.95}
            >
              i2089
            </text>
          </svg>
        </div>
      </section>

      {/* display title */}
      <section className="col-span-full row-start-3 grid items-end">
        <h1 className="text-80 font-sans font-medium tracking-[-0.04em]">
          <a
            href="/services"
            className="block transition-opacity hover:opacity-80"
            aria-label="Services — Agentic, Coding, Engineering"
          >
            <span className="reveal block" style={{ ["--i" as never]: 3 }}>
              Agentic.
            </span>
            <span className="reveal block" style={{ ["--i" as never]: 4 }}>
              <span className="strike" style={{ ["--i" as never]: 4 }}>
                Coding.
              </span>
            </span>
            <span className="reveal block" style={{ ["--i" as never]: 5 }}>
              <TypewriterSwap words={["Engineering.", "Design."]} />
            </span>
          </a>
        </h1>
      </section>
    </main>
  );
}
