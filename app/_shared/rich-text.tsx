import Link from "next/link";
import { Fragment } from "react";

// Renders the one inline markup content.ts uses: [words](/path). Only
// site-internal paths become links; anything else stays plain text.
const LINK = /\[([^\]]+)\]\((\/[^)\s]*)\)/g;

export function RichText({ text }: { text: string }) {
  const parts: React.ReactNode[] = [];
  let last = 0;
  for (const m of text.matchAll(LINK)) {
    const i = m.index ?? 0;
    if (i > last) parts.push(text.slice(last, i));
    parts.push(
      <Link key={i} href={m[2]} className="link-inline">
        {m[1]}
      </Link>,
    );
    last = i + m[0].length;
  }
  if (last < text.length) parts.push(text.slice(last));
  return <Fragment>{parts}</Fragment>;
}
