import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";

/* One source of truth for typography. Size lives inside the variant —
   never as a separate prop — so every occurrence of a role is
   identical across pages. */
const variants = {
  /* outlined display wordmark (i2089) */
  logo: "np-outline text-trim text-[clamp(72px,16vw,180px)] font-bold leading-none tracking-[-0.04em] md:text-[clamp(56px,9vw,180px)]",
  /* page titles and homepage bands */
  title:
    "text-[clamp(30px,6.6vw,72px)] font-medium leading-[1.05] tracking-[-0.02em] md:text-[clamp(30px,3.4vw,44px)]",
  /* body copy on detail pages — exactly half the title scale */
  /* mobile middle = 8vw × (1.22 / 3.4) so the title:body ratio matches
     the md/lg proportion (~2.8:1) at every viewport */
  body: "text-[clamp(13px,2.2vw,36px)] leading-snug md:text-[clamp(15px,1.22vw,22px)]",
  /* labels, small links and the colophon — 11px floor so uppercase
     tracking stays legible */
  footer:
    "text-[clamp(11px,0.8vw,13px)] uppercase tracking-[0.08em] text-(--np-mute)",
  /* subline under the wordmark — spread to the logo's full width; size
     and tracking live in .np-signature (shared.css), since the tracking
     is computed from the logo size */
  signature: "np-signature font-normal uppercase leading-none text-(--np-mute)",
} as const;

type Variant = keyof typeof variants;

type TextProps<T extends ElementType> = {
  variant: Variant;
  as?: T;
  className?: string;
  children: ReactNode;
} & Omit<ComponentPropsWithoutRef<T>, "className" | "children">;

export function Text<T extends ElementType = "span">({
  variant,
  as,
  className = "",
  children,
  ...rest
}: TextProps<T>) {
  const Tag = (as ?? "span") as ElementType;
  return (
    <Tag className={`${variants[variant]} ${className}`} {...rest}>
      {children}
    </Tag>
  );
}
