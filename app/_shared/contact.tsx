import Link from "next/link";
import { Text } from "./text";
import { clients } from "./content";
import { Arrow } from "./arrow";

export const EMAIL = "hi@i2089.com";

// The one primary action, on every page (PFD R5): a warm line and the
// address as a filled button, so it stands out from the quiet text
// around it (signal detection) and says exactly what happens on click
// (information scent). One per view, no pressure, no sales verb.
// TODO(marc): calendar link — add a quiet "or pick a time" link next to
// the button once the booking URL exists.
export function Contact({ className = "" }: { className?: string }) {
  return (
    <Text
      as="div"
      variant="body"
      className={`grid content-center justify-items-start gap-y-item ${className}`}
    >
      <p>Let&apos;s talk.</p>
      <a
        href={`mailto:${EMAIL}`}
        className="text-trim inline-flex items-center gap-x-label bg-(--np-fg) px-item py-label text-(--np-surface) transition-opacity duration-160 ease-out hover:opacity-85 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-(--np-fg)"
      >
        {EMAIL}
        <Arrow />
      </a>
    </Text>
  );
}

// The client line (PFD R4, L1 trust signal): a label over one line of
// names, like every other entry on the page, so it reads as content and
// not as a footer block. Each name links to the page that proves it.
export function Clients({ label = "Clients" }: { label?: string }) {
  return (
    <div className="gap-y-label grid">
      <Text as="h2" variant="footer" className="text-trim">
        {label}
      </Text>
      {/* wraps between names, never inside one */}
      <Text as="ul" variant="body" className="flex flex-wrap gap-y-label text-(--np-mute)">
        {clients.map((c, i) => (
          <li key={c.name} className="text-trim whitespace-nowrap">
            <Link href={c.href} className="link-label hit-area">
              {c.name}
            </Link>
            {i < clients.length - 1 && (
              <span aria-hidden className="px-[0.45em]">
                ·
              </span>
            )}
          </li>
        ))}
      </Text>
    </div>
  );
}
