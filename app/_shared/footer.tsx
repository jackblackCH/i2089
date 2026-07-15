import Link from "next/link";
import { Text } from "./text";

export function Footer() {
  return (
    <footer className="col-span-full grid grid-cols-1 border-t border-(--np-rule) md:grid-cols-2">
      <Text
        variant="footer"
        className="px-pad pt-pad-tight md:py-pad-tight"
      >
        ©2026 i2089 ::{" "}
        <Link
          href="/about"
          className="transition-colors hover:text-(--np-fg) focus-visible:text-(--np-fg) focus-visible:outline-none"
        >
          Marc Illien
        </Link>
      </Text>
      <Text
        variant="footer"
        className="border-(--np-rule) px-pad pb-pad-tight md:border-l md:py-pad-tight"
      >
        <Link
          href="/projects"
          className="transition-colors hover:text-(--np-fg) focus-visible:text-(--np-fg) focus-visible:outline-none"
        >
          Projects / Clients
        </Link>{" "}
        :: Zürich, Switzerland
      </Text>
    </footer>
  );
}
