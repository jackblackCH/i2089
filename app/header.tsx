import { ObfuscatedEmail } from "./email";

const META_CLASS =
  "text-10 text-(--sheet-mute) hover:text-(--sheet-fg) font-mono uppercase tracking-[0.02em] transition-colors";

type NavLink = { href: string; label: string };

export function Header({ nav }: { nav: NavLink[] }) {
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
        {nav.map((item, idx) => (
          <div key={item.href} className={idx === 0 ? "mb-[3px]" : undefined}>
            <a
              href={item.href}
              className="hover:text-(--sheet-fg) transition-colors"
            >
              {item.label}
            </a>
          </div>
        ))}
      </nav>
    </>
  );
}
