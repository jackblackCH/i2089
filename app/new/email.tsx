"use client";

import { useEffect, useRef } from "react";

/**
 * Bot-resistant mailto link.
 *
 * Source HTML contains only the reversed string ("moc.9802i@ih") — no `@`
 * adjacent to a domain, so naive email regex scrapers miss it. CSS
 * `direction: rtl; unicode-bidi: bidi-override` flips it visually so humans
 * still read "hi@i2089.com". The `mailto:` href is attached on the client.
 *
 * Only the inner <span> uses RTL — the outer <a> stays LTR so it aligns
 * normally inside its grid cell.
 */
const REVERSED = "moc.9802i@ih";

type Props = {
  className?: string;
  style?: React.CSSProperties;
};

export function ObfuscatedEmail({ className, style }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const decoded = REVERSED.split("").reverse().join("");
    ref.current.href = `mailto:${decoded}`;
    ref.current.setAttribute("aria-label", `Email ${decoded}`);
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
    >
      <span
        style={{
          unicodeBidi: "bidi-override",
          direction: "rtl",
          display: "inline-block",
        }}
      >
        {REVERSED}
      </span>
    </a>
  );
}
