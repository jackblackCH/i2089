/* PFD before/after data for the compare toggle (dev and Vercel previews
   only, see compare-toggle.tsx). Before = commit 01eff2d, scored in
   docs/pfd/2026-11-11/report.md. After = this branch, scored with the
   same rubric. Evidence is measured by the same script for both
   (docs/pfd/2026-11-11/evidence-*.json). Remove this folder after merge. */

export type Layers = { L0: number; L1: number; L2: number; L3: number; L4: number };
export type PageScore = {
  before: Layers | null;
  after: Layers;
  evidence: string[];
  open?: string[];
};

export const overall = (s: Layers) =>
  Math.round((s.L0 * 1.5 + s.L1 + s.L2 + s.L3 + s.L4) / 5.5);

const detail = (title: string): PageScore => ({
  before: { L0: 76, L1: 65, L2: 80, L3: 45, L4: 45 },
  after: { L0: 82, L1: 72, L2: 84, L3: 52, L4: 74 },
  evidence: [
    "Contact: y 1094–1244 px, 13 px text link → y 203 px, filled, 45 px tall",
    "Nav: 0 → 2 offer links, so the page leads back to the offers",
    "Mobile first row: 210 px → 150 px; body 13 → 15 px",
    "Tap targets: smallest 9 px → 33 px",
    "Share image: none → yes",
  ],
  open: [`${title}: one outcome line (TODO(marc) in content.ts)`],
});

export const SCORES: Record<string, PageScore> = {
  "/": {
    before: { L0: 80, L1: 55, L2: 80, L3: 30, L4: 30 },
    after: { L0: 82, L1: 78, L2: 86, L3: 58, L4: 78 },
    evidence: [
      "Arrows: fallback system glyphs → drawn to the font's metrics",
      "Bands: text changed every 10 s → fixed labels with arrows",
      "Name: 11 px tracked caps → the logo itself turns into MARC ILLIEN",
      "Contact: none → filled button at y 785 px (desktop)",
      "Client line: 0 → 5 names, each linked to its proof",
      "Nav: 0 → 2 offer links",
    ],
    open: [
      "Mobile: contact sits below the first screen (y 934 px); the bands are the first-screen next steps",
      "Anonymous AI result (TODO(marc))",
    ],
  },
  "/ai": {
    before: { L0: 78, L1: 55, L2: 75, L3: 30, L4: 35 },
    after: { L0: 85, L1: 78, L2: 86, L3: 52, L4: 80 },
    evidence: [
      "Multipliers: 5 (10x, 50x, 5x to 10x) → 0",
      "Pitch words (slop, backlog melts, boring tickets) → calm, checkable facts",
      "Contact: y 936 px, 13 px link → y 249 px, filled, 45 px tall",
      "Name: one term everywhere, \"Agentic Engineering\", explained in plain words first",
      "Format: three numbered steps (workshop day, coaching on real tickets, optional joining)",
      "Client line labelled \"Engineering clients\" (Sincerity: none is an AI case)",
    ],
    open: [
      "The measured result for the lead offer (Swiss SME, tickets per sprint): still TODO(marc). R4 hard fail until then",
      "Calendar link, own-work links (TODO(marc))",
    ],
  },
  "/engineering": {
    before: { L0: 78, L1: 60, L2: 82, L3: 45, L4: 35 },
    after: { L0: 84, L1: 74, L2: 86, L3: 62, L4: 76 },
    evidence: [
      "Contact: y 791 px, 13 px link → y 203 px, filled",
      "Client line: AXA named in prose only → 5 linked names",
      "AXA case page: hidden → live at /projects/axa",
      "Multipliers in the contact line: 1 → 0",
    ],
  },
  "/about": {
    before: { L0: 76, L1: 65, L2: 82, L3: 60, L4: 40 },
    after: { L0: 82, L1: 76, L2: 86, L3: 68, L4: 76 },
    evidence: [
      "Contact: y 967 px → y 203 px, filled",
      "Intro: \"10x faster with AI\" → \"coach dev teams in working with AI tools\"",
      "Smallest tap target: 13 px → 35 px (desktop)",
    ],
  },
  "/projects": {
    before: { L0: 82, L1: 70, L2: 76, L3: 50, L4: 50 },
    after: { L0: 84, L1: 78, L2: 82, L3: 62, L4: 76 },
    evidence: [
      "Contact: y 1372 px → y 203 px, filled",
      "AXA contracts: hidden → listed with its own case page",
      "Card text: #fff (ΔE 5.4 off the token) → --np-fg",
    ],
  },
  "/projects/axa": {
    before: null,
    after: { L0: 82, L1: 72, L2: 84, L3: 56, L4: 74 },
    evidence: ["New page: the AXA case existed in content.ts but was hidden"],
    open: ["AXA: one outcome line (TODO(marc))"],
  },
  "/projects/branded-goods": detail("Branded Goods"),
  "/projects/air-up": detail("air up®"),
  "/projects/talentir": detail("Talentir"),
};

export const SITE = {
  before: { L0: 78, L1: 55, L2: 80, L3: 38, L4: 35 },
  after: { L0: 84, L1: 78, L2: 86, L3: 62, L4: 79 },
};
