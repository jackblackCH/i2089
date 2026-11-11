// Arrows drawn to Helvetica Neue LT Pro 53 Extended, which has no arrow
// glyphs of its own (→ ← ↗ fell back to a system font). Measured on the
// font, per 1000 units: crossbar of "H" 92, en dash 84 thick with its
// centre 280 above the baseline, x-height 524. So the shaft sits on the
// dash axis at crossbar weight, the head is about one x-height tall with
// 45° arms a touch heavier (like the font's diagonals), square ends and a
// sharp tip. The box is 0.88em wide and sits on the baseline, so it sets
// like a glyph and scales with the text around it.
type Dir = "right" | "left" | "up-right";

const PATHS: Record<Dir, { shaft: string; head: string }> = {
  right: { shaft: "M50 -280H800", head: "M560 -530L800 -280L560 -30" },
  left: { shaft: "M830 -280H80", head: "M320 -530L80 -280L320 -30" },
  "up-right": { shaft: "M130 -70L730 -670", head: "M400 -700H760V-340" },
};

export function Arrow({
  dir = "right",
  className = "",
}: {
  dir?: Dir;
  className?: string;
}) {
  const { shaft, head } = PATHS[dir];
  return (
    <svg
      viewBox="0 -760 880 760"
      aria-hidden="true"
      focusable="false"
      className={`inline-block h-[0.76em] w-[0.88em] overflow-visible align-baseline ${className}`}
      fill="none"
      stroke="currentColor"
      strokeLinecap="butt"
      strokeLinejoin="miter"
      strokeMiterlimit={4}
    >
      <path d={shaft} strokeWidth={90} />
      <path d={head} strokeWidth={96} />
    </svg>
  );
}

// The last word and the arrow never part at a line break.
export function WithArrow({
  text,
  dir = "right",
  arrowClassName = "",
}: {
  text: string;
  dir?: Dir;
  arrowClassName?: string;
}) {
  const i = text.lastIndexOf(" ");
  const head = i < 0 ? "" : text.slice(0, i + 1);
  const last = i < 0 ? text : text.slice(i + 1);
  return (
    <>
      {head}
      <span className="whitespace-nowrap">
        {last}
        {" "}
        <Arrow dir={dir} className={arrowClassName} />
      </span>
    </>
  );
}
