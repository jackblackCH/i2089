import Link from "next/link";
import { Text } from "./text";
import { clients } from "./content";
import { Arrow } from "./arrow";

export const EMAIL = "hi@i2089.com";

// The one primary action, on every page (PFD R5): a warm line and the
// address as a filled button, so it stands out from the quiet text
// around it (signal detection) and says exactly what happens on click
// (information scent). One per view, no pressure, no sales verb. It
// presses in to 0.97 on :active, so the click feels heard.
// TODO(marc): calendar link — add a quiet "or pick a time" link next to
// the button once the booking URL exists.
export function Contact({ className = "" }: { className?: string }) {
  return (
    <Text
      as="div"
      variant="body"
      className={`gap-y-item grid content-center justify-items-start ${className}`}
    >
      {/* the location next to the action: for Swiss buyers it is a
          relevance cue (PFD L3) */}
      {/* trimmed like the title, so the space above the line equals the
          space under the button: one page padding each (column.tsx) */}
      <p className="text-trim">Let&apos;s talk. Zürich or remote.</p>
      <a
        href={`mailto:${EMAIL}`}
        className="np-cta text-trim gap-x-label px-item py-label inline-flex items-center bg-(--np-fg) text-(--np-surface) transition-[transform,opacity] duration-160 ease-out hover:opacity-85 focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-(--np-fg) active:scale-[0.97] motion-reduce:active:scale-100"
      >
        {EMAIL}
        <Arrow />
      </a>
    </Text>
  );
}

// The client line (PFD R4, L3 trust signal): a label over one line of
// names, right under the contact action (column.tsx), so the proof sits
// next to the decision. The names are bright links like body text; each
// one opens the page that proves it.
export function Clients({ label = "Clients" }: { label?: string }) {
  return (
    <div className="gap-y-label grid">
      <Text as="h2" variant="footer" className="np-label text-trim">
        <span className="np-label-text">{label}</span>
      </Text>
      {/* wraps between names, never inside one */}
      <Text
        as="ul"
        variant="body"
        className="gap-y-label flex flex-wrap text-(--np-mute)"
      >
        {clients.map((c, i) => (
          <li key={c.name} className="text-trim whitespace-nowrap">
            <Link href={c.href} className="link-body hit-area">
              {c.name}
            </Link>
            {i < clients.length - 1 && (
              <span aria-hidden className="px-[0.45em] text-(--np-mute)">
                ·
              </span>
            )}
          </li>
        ))}
      </Text>
    </div>
  );
}
