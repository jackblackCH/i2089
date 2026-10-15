"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "./text";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

// Bottom-right of the wordmark column, on one line with the copyright
// bottom-left. Lives inside the wordmark section, so on mobile it sits
// at the foot of the wordmark row and scrolls away with it.
export function Nav() {
  const pathname = usePathname();
  return (
    <Text
      as="nav"
      variant="footer"
      aria-label="Main"
      className="absolute bottom-0 right-0 z-10 flex gap-x-[1.6em] p-pad-tight"
    >
      {links.map(({ href, label }) => {
        const active = pathname === href || pathname.startsWith(`${href}/`);
        return (
          <Link
            key={href}
            href={href}
            aria-current={pathname === href ? "page" : undefined}
            className={`link-label hit-area ${active ? "text-(--np-fg)" : ""}`}
          >
            {label}
          </Link>
        );
      })}
    </Text>
  );
}
