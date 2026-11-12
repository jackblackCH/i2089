"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "./text";

// PFD R5: both offers are one step away from every page
const links = [
  { href: "/ai-solutions", label: "AI coaching" },
  { href: "/engineering", label: "Engineering" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

// The foot of the wordmark column: four equal columns across its full
// width, each link centred in its cell. Phones are too narrow for four
// equal cells ("AI COACHING" and "ENGINEERING" would touch), so there
// the links sit at equal gaps from edge to edge. Lives inside the wordmark
// section, so on mobile it sits at the foot of the wordmark row and
// scrolls away with it.
export function Nav() {
  const pathname = usePathname();
  return (
    <Text
      as="nav"
      variant="footer"
      aria-label="Main"
      className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-[repeat(4,auto)] justify-between p-pad-tight md:grid-cols-4 md:justify-normal"
    >
      {links.map(({ href, label }) => {
        // exact match is the page itself; a deeper path (a project under
        // Projects) is still "here" for sighted and screen-reader users
        const exact = pathname === href;
        const active = exact || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={exact ? "page" : active ? "true" : undefined}
            className={`link-label hit-area justify-self-center text-center whitespace-nowrap ${active ? "text-(--np-fg)" : ""}`}
          >
            {label}
          </Link>
        );
      })}
    </Text>
  );
}
