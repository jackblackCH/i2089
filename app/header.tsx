"use client";

import { usePathname } from "next/navigation";
import { ObfuscatedEmail } from "./email";

const META_CLASS =
  "text-10 text-(--sheet-mute) hover:text-(--sheet-fg) focus-visible:text-(--sheet-fg) focus-visible:outline-none font-mono uppercase tracking-[0.02em] transition-colors";

type NavLink = { href: string; label: string };

export function Header({ nav }: { nav: NavLink[] }) {
  const pathname = usePathname();

  return (
    <>
      {/* meta — top left, triangle links home and spans both meta rows */}
      <div
        className="reveal col-span-5 row-start-1 grid grid-cols-[auto_1fr] items-center gap-x-2 gap-y-1"
        style={{ ["--i" as never]: 0 }}
      >
        <a
          href="/"
          aria-label="Home"
          className="text-10 text-(--sheet-mute) hover:text-(--sheet-fg) focus-visible:text-(--sheet-fg) focus-visible:outline-none row-span-2 inline-flex items-center transition-colors"
        >
          <svg
            viewBox="0 0 100 86.6"
            className="h-[2.6em] w-auto"
            aria-hidden
          >
            <polygon
              points="50,0 100,86.6 0,86.6"
              fill="none"
              stroke="currentColor"
              strokeWidth={0.5}
              vectorEffect="non-scaling-stroke"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <span className={META_CLASS}>Marc Illien | Zurich</span>
        <ObfuscatedEmail className={META_CLASS} />
      </div>

      {/* nav — top right */}
      <nav
        className="reveal text-10 text-(--sheet-mute) col-span-3 col-start-10 row-start-1 grid gap-1 text-right font-mono uppercase tracking-[0.02em]"
        style={{ ["--i" as never]: 1 }}
      >
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <a
              key={item.href}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`${isActive ? "text-(--sheet-fg)" : ""} hover:text-(--sheet-fg) focus-visible:text-(--sheet-fg) focus-visible:outline-none transition-colors`}
            >
              {item.label}
            </a>
          );
        })}
      </nav>
    </>
  );
}
