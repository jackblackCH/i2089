/* An item is either a plain sentence (rendered as a highlight line)
   or a term/text pair (rendered as a definition row with an arrow). */
export type Item = string | { term: string; text: string };

export type Service = {
  slug: string;
  title: string;
  items: Item[];
};

/* Copy follows the precision-copy rules: objective language, short
   complete sentences, concrete and checkable, no sales adjectives. */
export const services: Service[] = [
  {
    slug: "ai-solutions",
    title: "Consulting & AI Solutions",
    items: [
      "A week of team backlog cleared in one engineer's afternoon. Whole team, not one enthusiast.",
      {
        term: "The gap",
        text: "One engineer ships 10x with Claude. The rest of the team ships at 1x. The gap holds until someone closes it.",
      },
      {
        term: "Team enablement",
        text: "1:1 sessions, workshops, pair programming. Your own tickets, not slides. Whole team ships with AI in weeks, not quarters.",
      },
      {
        term: "Agentic workflows",
        text: "Workflows that plan, code, test, and review. You keep the final call. Claude Code, Codex, or your company's stack.",
      },
      {
        term: "Hands-on delivery",
        text: "Engineering next to your team. A feature in a day, a rewrite in a week. Code review, tests, handover: unchanged.",
      },
      {
        term: "No disruption",
        text: "Your compliance rules, your LLM, your codebase. Rollout in weeks, not months. Delivery keeps running.",
      },
    ],
  },
  {
    slug: "engineering",
    title: "Frontend Software Engineering",
    items: [
      {
        term: "Frontend",
        text: "Fast, maintainable web apps in TypeScript, React (Next.js or Vite), and Tailwind.",
      },
      {
        term: "Backend",
        text: "Architecture and APIs the frontend can rely on.",
      },
      {
        term: "UI/UX Design",
        text: "Interfaces designed in code. Accessible, tested, shipped.",
      },
    ],
  },
  {
    slug: "about",
    title: "Marc Illien",
    items: [
      "Frontend software engineer from Zürich. I build precise, tasteful digital products, and teach teams to work with AI every day.",
      {
        term: "since 2023",
        text: "i2089 — Consulting for AI introduction, AI design, and Agentic Engineering. Self-employed, Zürich.",
      },
      {
        term: "since 2014",
        text: "Lecturer, Frontend Engineering (CAS Frontend Engineering). OST — Eastern Switzerland University of Applied Sciences, Rapperswil.",
      },
      {
        term: "2025 — 2026",
        text: "Frontend Software Engineer, AXA Switzerland (WebHub). Contract, Zürich.",
      },
      {
        term: "2024",
        text: "Frontend Architect and Lead, AXA Switzerland. SME multi-step wizard and calculator in React, published on axa.ch as a microfrontend. Contract, Zürich.",
      },
      {
        term: "2023 — 2024",
        text: "Frontend Consulting and Development, air up®. Headless e-commerce on Next.js and Shopify, design system in Tailwind and shadcn/ui. Freelance, Munich.",
      },
      {
        term: "2022 — 2023",
        text: "Frontend Architect and Fullstack Engineer, AXA. Consultant-communication messenger in TypeScript and React. Contract, Winterthur.",
      },
    ],
  },
];

export const bySlug = Object.fromEntries(services.map((s) => [s.slug, s]));

export type Project = {
  slug: string;
  title: string;
  period: string;
  text: string;
  href: string;
  linkLabel: string;
  /** screenshot under public/projects/ */
  image: string;
  /** detail page — the role I held, in plain words */
  role: string;
  /** detail page — what the project is, one or two sentences */
  intro: string;
  /** detail page — what I did and what came of it, one idea per line */
  highlights: string[];
  stack: string[];
};

export const contracts: Project[] = [
  {
    slug: "axa",
    title: "AXA Switzerland",
    period: "since 2018 — ongoing",
    text: "Recurring frontend contracts at Switzerland's largest insurer since 2018. Custom React apps: an SME calculator, an internal-agent communication tool, and pattern library design.",
    href: "https://axa.ch",
    linkLabel: "axa.ch",
    image: "/projects/axa.jpg",
    role: "Frontend Architect and Engineer",
    intro:
      "Recurring contracts at Switzerland's largest insurer since 2018.",
    highlights: [
      "Led the frontend for an SME wizard and calculator, published on axa.ch as a microfrontend.",
      "Built a messenger that lets agents talk with their clients, in TypeScript and React.",
      "Worked on the design of the pattern library.",
    ],
    stack: ["TypeScript", "React"],
  },
];

/* Detail-page copy: simple English, one idea per line, facts only.
   TODO(marc): each highlight list wants one line with a real outcome —
   a number, a launch, what changed for the team. */
export const projects: Project[] = [
  {
    slug: "branded-goods",
    title: "Branded Goods",
    period: "2025 — 2026",
    text: "Frontend and partial UI design for branded-goods.ch in Next.js and Tailwind, on Saleor open-source e-commerce. Built as a partner of Avolut.",
    href: "https://branded-goods.ch",
    linkLabel: "branded-goods.ch",
    image: "/projects/branded-goods.jpg",
    role: "Frontend Engineer and UI Designer",
    intro:
      "branded-goods.ch is an online shop built on Saleor, an open-source e-commerce platform. I worked on it as a partner of Avolut.",
    highlights: [
      "Built the shop's frontend in Next.js and Tailwind, on top of Saleor's API.",
      "Designed parts of the interface myself, straight in code.",
    ],
    stack: ["Next.js", "Tailwind", "Saleor", "TypeScript"],
  },
  {
    slug: "air-up",
    title: "air up®",
    period: "2023 — 2024",
    text: "Headless e-commerce on Next.js and Shopify. Design system with Tailwind and shadcn/ui, trunk-based delivery, frontend leadership across the team.",
    href: "https://air-up.com",
    linkLabel: "air-up.com",
    image: "/projects/air-up.jpg",
    role: "Frontend Consultant and Lead Frontend",
    intro:
      "air up® sells its scent-flavoured drinking bottles online. I joined the team in Munich as a freelance frontend consultant.",
    highlights: [
      "Built the headless shop on Next.js, with Shopify behind it.",
      "Set up a design system with Tailwind and shadcn/ui, so the team works from one set of components.",
      "Added 3D and motion to the shop.",
      "Moved the team to trunk-based delivery: small changes, merged straight into the main branch.",
      "Led the frontend work across the team.",
    ],
    stack: ["Next.js", "Shopify", "Tailwind", "shadcn/ui", "TypeScript"],
  },
  {
    slug: "talentir",
    title: "Talentir",
    period: "2024",
    text: "UX/UI design and frontend for Talentir, the payout infrastructure for agencies, brands, labels and platforms. Product UI in Next.js and Tailwind, built with modern development methods for speed.",
    href: "https://talentir.com",
    linkLabel: "talentir.com",
    image: "/projects/talentir.jpg",
    role: "UX/UI Designer and Frontend Engineer",
    intro:
      "Talentir handles payouts for agencies, brands, labels and platforms. I designed and built the product that its customers work in.",
    highlights: [
      "Designed the product's UX and UI: how it works, and how it looks.",
      "Built the frontend in Next.js and Tailwind.",
      "Brought modern development methods into the project, so the team could move faster.",
    ],
    stack: ["Next.js", "Tailwind", "TypeScript"],
  },
];

export const projectBySlug = Object.fromEntries(
  projects.map((p) => [p.slug, p]),
);

/* the home typewriter — bands only clarify, never introduce new
   concepts: each cycles names for the same offer. The third band
   is the static audience line. */
export const bands: { words: string[]; slugs: string[] }[] = [
  {
    words: ["Consulting", "AI Solutions", "AI Workshops"],
    slugs: [
      "ai-solutions",
      "ai-solutions",
      "ai-solutions",
    ],
  },
  {
    words: ["Frontend Engineering", "Software Engineering", "Digital Experiences"],
    slugs: ["engineering", "engineering", "engineering"],
  },
  {
    words: ["for Startups, SMEs and Corporates"],
    slugs: [],
  },
];
