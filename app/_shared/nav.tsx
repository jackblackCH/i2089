"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "./text";

// PFD R5: both offers are one step away from every page
const links = [
  { href: "/ai", label: "Agentic Engineering" },
  { href: "/frontend", label: "Frontend & User Interfaces" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

// The foot of the wordmark column.
// Phones: in flow under the logo, inside the section's side padding, so
// its edges line up with the content below. Two columns read top to
// bottom: the offers on the left edge, Projects and About on the right
// edge (282px, fits the 294px a 390px phone leaves; four in a row would
// need ~420px). Half a block step above and below, a group step between
// the rows, so the taller tap areas (shared.css) never overlap.
// md+: pinned to the foot of the column, spread with equal space around
// each link, each centred; a 2x2 grid until xl, one row from xl (the
// two long offer labels need ~370px together; at lg the row would have
// no gaps left).
export function Nav() {
  const pathname = usePathname();
  return (
    <Text
      as="nav"
      variant="footer"
      aria-label="Main"
      className="gap-y-group md:gap-y-label md:p-pad-tight z-10 grid grid-flow-col grid-rows-2 justify-between self-end justify-self-stretch pt-[calc(var(--spacing-pad)/2)] md:absolute md:inset-x-0 md:bottom-0 md:grid-flow-row md:grid-cols-[repeat(2,auto)] md:grid-rows-none md:justify-evenly xl:grid-cols-[repeat(4,auto)]"
    >
      {links.map(({ href, label }, i) => {
        // exact match is the page itself; a deeper path (a project under
        // Projects) is still "here" for sighted and screen-reader users
        const exact = pathname === href;
        const active = exact || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={exact ? "page" : active ? "true" : undefined}
            className={`link-label hit-area whitespace-nowrap md:justify-self-center md:text-center ${
              i < 2 ? "justify-self-start" : "justify-self-end"
            } ${active ? "text-(--np-fg)" : ""}`}
          >
            {label}
          </Link>
        );
      })}
    </Text>
  );
}
