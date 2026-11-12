"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "./text";

// PFD R5: both offers are one step away from every page
const links = [
  { href: "/ai-solutions", label: "AI coaching" },
  { href: "/engineering", label: "UX / Frontend Engineering" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

// The foot of the wordmark column, spread across its full width with
// equal space around each link, each centred in its column. From lg the
// four links share one row. Below lg "UX / Frontend Engineering" (~210px
// in the label type) does not fit one row with the others, so they form
// a 2x2 grid: the two offers on top, Projects and About below. Lives
// inside the wordmark section, so on mobile it sits at the foot of the
// wordmark row and scrolls away with it.
export function Nav() {
  const pathname = usePathname();
  return (
    <Text
      as="nav"
      variant="footer"
      aria-label="Main"
      className="absolute inset-x-0 bottom-0 z-10 grid grid-cols-[repeat(2,auto)] justify-evenly gap-y-label p-pad-tight lg:grid-cols-[repeat(4,auto)]"
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
