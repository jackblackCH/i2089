"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "./text";

const links = [
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

// Top-left of the frame, mirroring the copyright bottom-left. Absolute,
// not fixed: on mobile the frame scrolls, and the nav scrolls away with
// the wordmark instead of sitting on top of the content.
export function Nav() {
  const pathname = usePathname();
  return (
    <Text
      as="nav"
      variant="footer"
      aria-label="Main"
      className="absolute left-0 top-0 z-10 flex gap-x-[1.6em] p-pad-tight"
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
