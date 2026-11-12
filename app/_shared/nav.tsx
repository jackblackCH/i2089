"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Text } from "./text";

// Work · About · Blog, centred under the wordmark. The two offers are not
// repeated here: on home they are the big bands, and on every other page
// the logo leads back to them (one more click; Marc's call, 2026-11-12).
const LINKS = [
  { href: "/projects", label: "Work" },
  { href: "/about", label: "About" },
  { href: "/blog", label: "Blog" },
];

function NavLink({ href, label }: { href: string; label: string }) {
  const pathname = usePathname();
  // exact match is the page itself; a deeper path (a project under
  // Work) is still "here" for sighted and screen-reader users
  const exact = pathname === href;
  const active = exact || pathname.startsWith(`${href}/`);
  return (
    <Link
      href={href}
      aria-current={exact ? "page" : active ? "true" : undefined}
      // "you are here": bright with a thin underline
      className={`link-label hit-area whitespace-nowrap ${
        active
          ? "text-(--np-fg) underline decoration-1 underline-offset-[0.4em]"
          : ""
      }`}
    >
      {label}
    </Link>
  );
}

// Phones: in flow under the logo; md+: pinned to the foot of the
// wordmark column. Centred in both, like the logo above it.
export function Nav() {
  return (
    <Text
      as="nav"
      variant="footer"
      aria-label="Main"
      className="md:p-pad-tight z-10 flex justify-center self-end justify-self-stretch pt-[calc(var(--spacing-pad)/2)] md:absolute md:inset-x-0 md:bottom-0"
    >
      <ul className="flex gap-x-[0.6em]">
        {LINKS.map((l, i) => (
          <li key={l.href} className="flex gap-x-[0.6em]">
            <NavLink {...l} />
            {i < LINKS.length - 1 && (
              <span aria-hidden className="text-(--np-mute)">
                ·
              </span>
            )}
          </li>
        ))}
      </ul>
    </Text>
  );
}
