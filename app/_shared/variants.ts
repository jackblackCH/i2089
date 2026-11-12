/* The chosen design variants (Marc, 2026-11-12): the logo motion (i2089
   → MARC ILLIEN), its timing and fit, the label style and the blog look.
   They live as data attributes on <html>, set before paint by the script
   in layout.tsx, so CSS and the logo read one source. The before/after
   switcher (app/_compare) is gone; every visitor gets DEFAULTS. The other
   options stay listed until their CSS branches are pruned. */
export const AXES = {
  motion: {
    label: "Motion",
    options: {
      flap: "Split-flap",
      decode: "Decode",
      wipe: "Wipe",
      blur: "Blur",
    },
  },
  timing: {
    label: "Timing",
    options: {
      once: "Once, rest on name",
      hover: "Hover / focus",
      back: "Once, back to i2089",
      loop: "Loop on home (2 cycles), once elsewhere",
    },
  },
  fit: {
    label: "Fit",
    options: {
      lines: "Two lines",
      scaled: "One line, scaled",
      same: "One line, same size",
    },
  },
  blog: {
    label: "Blog",
    options: {
      dark: "Dark (system font, site colours)",
      clone: "Clone (system font, light)",
      site: "Site (Helvetica, dark)",
    },
  },
  labels: {
    label: "Labels",
    options: {
      calm: "Calm: numbers + hairlines, button filled",
      off: "Off",
    },
  },
} as const;

export type Axis = keyof typeof AXES;
export type Variants = { [A in Axis]: keyof (typeof AXES)[A]["options"] };

// Chosen by Marc on 2026-11-12. The loop runs on home only; reading
// pages play the motion once and rest on the name (PFD R1). Labels calm:
// plain small caps, numbered on the offer pages, hairlines between
// entries, so the filled contact button is the only filled shape (R5).
// See docs/pfd/2026-11-12-variants.md.
export const DEFAULTS: Variants = {
  motion: "blur",
  timing: "loop",
  fit: "same",
  labels: "calm",
  blog: "dark",
};

/** sessionStorage flag: the logo motion has played this session */
export const LOGO_SEEN_KEY = "i2089-logo";
export const VARIANTS_EVENT = "i2089-variants";
export const REPLAY_EVENT = "i2089-logo-replay";

/* Inline, before paint: apply the variants and mark a logo motion that
   already played, so a "rest on the name" page never flashes i2089
   first. */
export function variantsScript() {
  return `try{var d=document.documentElement,v=${JSON.stringify(DEFAULTS)};for(var k in v)d.dataset[k]=v[k];d.dataset.page=location.pathname==="/"?"home":"sub";if(sessionStorage.getItem(${JSON.stringify(LOGO_SEEN_KEY)}))d.dataset.logoSeen=""}catch(e){}`;
}

export function readVariants(): Variants {
  const d = document.documentElement.dataset;
  return {
    motion: (d.motion as Variants["motion"]) ?? DEFAULTS.motion,
    timing: (d.timing as Variants["timing"]) ?? DEFAULTS.timing,
    fit: (d.fit as Variants["fit"]) ?? DEFAULTS.fit,
    labels: (d.labels as Variants["labels"]) ?? DEFAULTS.labels,
    blog: (d.blog as Variants["blog"]) ?? DEFAULTS.blog,
  };
}
