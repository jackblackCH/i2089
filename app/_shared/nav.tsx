"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "./text";

// Two groups instead of five equal links, so the footer reads as two
// chunks (Cowan: 3–5 chunks). The offers stay one click away from every
// page (PFD R5), in the bright colour with short names; the rest sits
// beside them in the label grey.
const OFFERS = [
  { href: "/ai", label: "Agentic" },
  { href: "/frontend", label: "Frontend & UI" },
];
const MORE = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

function NavLink({
  href,
  label,
  offer,
}: {
  href: string;
  label: string;
  offer: boolean;
}) {
  const pathname = usePathname();
  // exact match is the page itself; a deeper path (a project under
  // Work) is still "here" for sighted and screen-reader users
  const exact = pathname === href;
  const active = exact || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={exact ? "page" : active ? "true" : undefined}
      // "you are here" is a thin underline: the offers are always bright,
      // so brightness alone can't mark the current page
      className={`hit-area whitespace-nowrap ${
        offer ? "link-quiet text-(--np-fg)" : "link-label"
      } ${active ? "text-(--np-fg) underline decoration-1 underline-offset-[0.4em]" : ""}`}
    >
      {label}
    </Link>
  );
}

// The foot of the wordmark column: offers on the left, Work · About ·
// Blog on the right. Phones: in flow under the logo, inside the section's
// side padding, so both edges line up with the content below; two auto
// columns (the offers stacked, the rest on one line), the free space
// between them. md+: pinned to the foot of the
// column, both groups on one line, wrapping only when the column is
// narrow.
export function Nav() {
  return (
    <Text
      as="nav"
      variant="footer"
      aria-label="Main"
      className="md:gap-x-group md:gap-y-item md:p-pad-tight z-10 grid grid-cols-[auto_auto] items-start justify-between self-end justify-self-stretch pt-[calc(var(--spacing-pad)/2)] md:absolute md:inset-x-0 md:bottom-0 md:flex md:flex-wrap md:items-baseline"
    >
      <ul className="gap-y-group md:gap-x-group grid md:flex">
        {OFFERS.map((l) => (
          <li key={l.href}>
            <NavLink {...l} offer />
          </li>
        ))}
      </ul>
      <ul className="gap-x-label md:gap-x-item flex">
        {MORE.map((l, i) => (
          <li key={l.href} className="gap-x-label flex">
            <NavLink {...l} offer={false} />
            {/* a dot between the three on phones; md+ spaces them */}
            {i < MORE.length - 1 && (
              <span aria-hidden className="text-(--np-mute) md:hidden">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </Text>
  );
}
