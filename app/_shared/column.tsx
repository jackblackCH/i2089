import type { ReactNode } from "react";
import Link from "next/link";
import { Text } from "./text";
import { Contact, Clients, EMAIL } from "./contact";

// The right column of every content page: one flowing column — title,
// the contact action, content, client line — spaced by the group step.
// The contact sits right under the title, so every page shows its next
// step in the first screen (PFD R2, R5). It scrolls as a whole on md+
// (never a box inside a box); the quiet links close the page at the foot.
export function Column({
  title,
  back,
  linkedin = false,
  clients,
  children,
}: {
  title: string;
  /** small back link, out of flow in the title's top padding so the
      title lands exactly where it does on every other page */
  back?: { href: string; label: string };
  linkedin?: boolean;
  /** label for the client line under the content; omit to hide it */
  clients?: string;
  children?: ReactNode;
}) {
  return (
    <section className="np-panel relative flex flex-col md:overflow-y-auto">
      {back && (
        <Text
          variant="footer"
          className="absolute left-pad top-[calc(var(--spacing-pad)/2)] -translate-y-1/2"
        >
          <Link href={back.href} className="link-label hit-area">
            ← {back.label}
          </Link>
        </Text>
      )}

      <Text
        as="article"
        variant="body"
        className="enter flex flex-col gap-y-group pt-pad"
      >
        <Text as="h1" variant="title" className="px-pad">
          <span className="text-trim block">{title}</span>
        </Text>
        <Contact className="px-pad" />
        {children}
        {clients && (
          <div className="px-pad">
            <Clients label={clients} />
          </div>
        )}
      </Text>

      <Foot linkedin={linkedin} />
    </section>
  );
}

function Foot({ linkedin }: { linkedin: boolean }) {
  return (
    <Text
      as="div"
      variant="body"
      className="mt-auto grid justify-items-start gap-y-item p-pad"
    >
      {linkedin && (
        <a
          href="https://www.linkedin.com/in/marcillien/"
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet hit-area text-trim inline-flex items-center gap-x-label"
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
      )}
      <a href={`mailto:${EMAIL}`} className="link-quiet hit-area text-trim">
        {EMAIL}
      </a>
    </Text>
  );
}
