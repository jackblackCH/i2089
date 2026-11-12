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
  { href: "/blog", label: "Blog" },
];

// below xl two columns: the offers on the left, the rest on the right
// (static classes, so Tailwind sees them)
const PLACE = [
  "col-start-1 row-start-1",
  "col-start-1 row-start-2",
  "col-start-2 row-start-1",
  "col-start-2 row-start-2",
  "col-start-2 row-start-3",
];

// The foot of the wordmark column.
// Phones: in flow under the logo, inside the section's side padding, so
// its edges line up with the content below. Two columns: the two offers
// on the left edge; Projects, About and Blog on the right edge (fits the
// 294px a 390px phone leaves; five in a row would need ~460px). Half a
// block step above and below, a group step between the rows, so the
// taller tap areas (shared.css) never overlap.
// md+: pinned to the foot of the column, the same two columns spread with
// equal space around them, each link centred; one row of five from xl.
export function Nav() {
  const pathname = usePathname();
  return (
    <Text
      as="nav"
      variant="footer"
      aria-label="Main"
      className="gap-y-group md:gap-y-label md:p-pad-tight z-10 grid grid-cols-[repeat(2,auto)] justify-between self-end justify-self-stretch pt-[calc(var(--spacing-pad)/2)] md:absolute md:inset-x-0 md:bottom-0 md:justify-evenly xl:grid-cols-[repeat(5,auto)]"
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
            className={`link-label hit-area whitespace-nowrap md:justify-self-center md:text-center xl:col-start-auto xl:row-start-auto ${PLACE[i]} ${
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
