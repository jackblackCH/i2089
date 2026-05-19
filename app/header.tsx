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
      {/* meta — top left, links home + email */}
      <div
        className="reveal col-span-5 row-start-1 grid gap-1"
        style={{ ["--i" as never]: 0 }}
      >
        <a href="/" className={`${META_CLASS} grid gap-1`}>
          <div>Marc Illien</div>
          <div>Zurich</div>
        </a>
        <ObfuscatedEmail className={META_CLASS} />
      </div>

      {/* nav — top right */}
      <nav
        className="reveal text-10 text-(--sheet-mute) col-span-3 col-start-10 row-start-1 text-right font-mono uppercase tracking-[0.02em]"
        style={{ ["--i" as never]: 1 }}
      >
        {nav.map((item, idx) => {
          const isActive = pathname === item.href;
          return (
            <div
              key={item.href}
              className={idx === 0 ? "mb-[3px]" : undefined}
            >
              <a
                href={item.href}
                aria-current={isActive ? "page" : undefined}
                className={`${isActive ? "text-(--sheet-fg)" : ""} hover:text-(--sheet-fg) focus-visible:text-(--sheet-fg) focus-visible:outline-none transition-colors`}
              >
                {item.label}
              </a>
            </div>
          );
        })}
      </nav>
    </>
  );
}
