import Link from "next/link";
import { Text } from "./text";

export function Footer() {
  return (
    <footer className="col-span-full grid grid-cols-1 border-t border-(--np-rule) md:grid-cols-2">
      <Text
        variant="footer"
        className="px-[clamp(24px,3vw,64px)] pt-[clamp(10px,0.9vw,16px)] md:py-[clamp(10px,0.9vw,16px)]"
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
        className="border-(--np-rule) px-[clamp(24px,3vw,64px)] pb-[clamp(10px,0.9vw,16px)] md:border-l md:py-[clamp(10px,0.9vw,16px)]"
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
