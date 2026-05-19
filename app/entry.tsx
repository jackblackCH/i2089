type EntryLink = { name: string; href: string };

export type EntryProps = {
  /** Small mono uppercase line above the title (e.g. a date). */
  eyebrow?: string;
  /** Display title — text-40, full width. */
  title: string;
  /** Description body — text-15 mute. Spans 2/3 when a link is present. */
  description?: string;
  /** Optional right-aligned link at 1/3 width. */
  link?: EntryLink;
  /** Stagger index for the reveal animation. */
  index?: number;
};

/**
 * Generic project/service item.
 *
 * Internal vertical rhythm is tight (`gap-y-2`) so eyebrow → title →
 * description/link read as a single block. The wrapping section is expected
 * to use a much larger `gap-y-(--space-pad)` between entries so each block
 * is clearly its own unit.
 */
export function Entry({
  eyebrow,
  title,
  description,
  link,
  index = 0,
}: EntryProps) {
  const isExternal = link?.href.startsWith("http") ?? false;
  const descSpan = link ? "col-span-8" : "col-span-full md:col-span-8";

  return (
    <article
      className="reveal grid grid-cols-12 gap-x-1 gap-y-2"
      style={{ ["--i" as never]: 2 + index }}
    >
      {eyebrow && (
        <div className="text-10 text-(--sheet-mute) col-span-full font-mono uppercase tracking-[0.02em]">
          {eyebrow}
        </div>
      )}

      <h2 className="text-40 col-span-full mb-0.5 whitespace-break-spaces font-sans font-medium leading-snug tracking-[-0.04em]">
        {title}
      </h2>

      {description && (
        <p className={`text-15 text-(--sheet-mute) ${descSpan} leading-[1.45]`}>
          {description}
        </p>
      )}

      {link && <LinkBlock link={link} external={isExternal} />}
    </article>
  );
}

function LinkBlock({ link, external }: { link: EntryLink; external: boolean }) {
  // Tie the arrow to the last word with a non-breaking space so it never
  // wraps to its own line; only the head of the name may break onto a line above.
  const words = link.name.trim().split(/\s+/);
  const head = words.slice(0, -1).join(" ");
  const tail = words[words.length - 1];

  return (
    <a
      href={link.href}
      target={external ? "_blank" : undefined}
      rel={external ? "noopener noreferrer" : undefined}
      className="text-15 text-(--sheet-mute) hover:text-(--sheet-fg) col-span-4 self-end text-right transition-colors"
    >
      {head && <>{head} </>}
      <span className="whitespace-nowrap">{tail} ↗</span>
    </a>
  );
}
