"use client";

import { useEffect, useRef } from "react";

/**
 * Bot-resistant mailto link — user-friendly: select, copy/paste and
 * screen-readers all work like a plain email.
 *
 * Strategy (two cheap, layered defenses):
 *   1. The visible text ships with the `@` encoded as the HTML entity
 *      `&#64;`. Naive scrapers that grep raw HTML for `name@domain` miss
 *      it. The browser decodes the entity when parsing, so the DOM text
 *      is "hi@i2089.com" — users see and copy it normally.
 *   2. The `href` is `#` in the SSR markup so bots can't grep for
 *      `mailto:` either. `useEffect` swaps in the real mailto URL on
 *      hydration. A click before hydration is silently prevented; once
 *      hydrated, clicking opens the user's mail client.
 */
const NAME = "hi";
const HOST = "i2089.com";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function ObfuscatedEmail({ className, style }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const email = `${NAME}@${HOST}`;
    ref.current.href = `mailto:${email}`;
    ref.current.setAttribute("aria-label", `Email ${email}`);
  }, []);

  return (
    <a
      ref={ref}
      href="#"
      onClick={(e) => {
        if (ref.current?.getAttribute("href") === "#") e.preventDefault();
      }}
      className={className}
      style={style}
      dangerouslySetInnerHTML={{ __html: `${NAME}&#64;${HOST}` }}
    />
  );
}
