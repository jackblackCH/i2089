import type { ReactNode } from "react";
import Link from "next/link";
import { Text } from "./text";
import { Contact, Clients } from "./contact";
import { Arrow } from "./arrow";

// The right column of every content page, built like home: three
// bands, split by the same groove, each centred in its own share of the
// height (PFD L2: one pattern on every page).
//   1. the head: back link and title;
//   2. the content;
//   3. the foot: the selected work (offer pages) or LinkedIn (About),
//      then the contact, so the page ends on its next step (Marc,
//      2026-11-12; PFD R5 trade: on a long page the contact is now below
//      the first screen, the address stays in reach via scrolling).
// md+: every band takes at least its content and the bands share the
// rest of the height evenly, so the column fills the screen, grows and
// shrinks with it, and the content band sits on the logo's midline when
// it fits; a taller page scrolls as a whole (never a box inside a box).
// Phones: the bands stack, half a page padding above and below each.
const BAND = "grid content-center py-[calc(var(--spacing-pad)/2)]";

export function Column({
  title,
  back,
  linkedin = false,
  clients,
  children,
}: {
  title: string;
  /** small back link above the title */
  back?: { href: string; label: string };
  linkedin?: boolean;
  /** label for the selected work at the foot; omit to hide it */
  clients?: string;
  children?: ReactNode;
}) {

  return (
    <Text
      as="section"
      variant="body"
      className="np-panel enter grid md:auto-rows-[minmax(min-content,1fr)] md:overflow-y-auto"
    >
      <div className={`${BAND} gap-y-item px-pad`}>
        {back && (
          <Text variant="footer" className="text-trim">
            <Link href={back.href} className="link-label hit-area">
              <Arrow dir="left" /> {back.label}
            </Link>
          </Text>
        )}
        <Text as="h1" variant="title">
          <span className="text-trim block">{title}</span>
        </Text>
        {/* the contact sits at the foot; on a long page or a phone it is
            below the first screen, so the head points to it (PFD R5)
            without repeating the address */}
        <Text variant="footer" className="text-trim">
          <a href="#contact" className="link-label hit-area">
            Contact <Arrow dir="down" />
          </a>
        </Text>
      </div>
      {children && (
        <div className={`${BAND} np-groove-t gap-y-group`}>{children}</div>
      )}
      <div
        id="contact"
        className={`${BAND} np-groove-t gap-y-group px-pad scroll-mt-pad`}
      >
        {clients && <Clients label={clients} />}
        {linkedin && <LinkedIn />}
        <Contact />
      </div>
    </Text>
  );
}

// LinkedIn, in the foot on About, above the contact.
function LinkedIn() {
  return (
    <div>
      <a
        href="https://www.linkedin.com/in/marcillien/"
        target="_blank"
        rel="noopener noreferrer"
        className="link-quiet hit-area text-trim gap-x-[0.6em] inline-flex items-center"
      >
        <svg
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
          className="h-[0.95em] w-[0.95em]"
        >
          <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
        </svg>
        LinkedIn
      </a>
    </div>
  );
}
