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
  title: string;
  period: string;
  text: string;
  href: string;
  linkLabel: string;
  /** screenshot under public/projects/ */
  image: string;
};

export const contracts: Project[] = [
  {
    title: "AXA Switzerland",
    period: "since 2018 — ongoing",
    text: "Recurring frontend contracts at Switzerland's largest insurer since 2018. Custom React apps: an SME calculator, an internal-agent communication tool, and pattern library design.",
    href: "https://axa.ch",
    linkLabel: "axa.ch",
    image: "/projects/axa.jpg",
  },
];

export const projects: Project[] = [
  {
    title: "Branded Goods",
    period: "2025 — 2026",
    text: "Frontend and partial UI design for branded-goods.ch in Next.js and Tailwind, on Saleor open-source e-commerce. Built as a partner of Avolut.",
    href: "https://branded-goods.ch",
    linkLabel: "branded-goods.ch",
    image: "/projects/branded-goods.jpg",
  },
  {
    title: "air up®",
    period: "2023 — 2024",
    text: "Headless e-commerce on Next.js and Shopify. Design system with Tailwind and shadcn/ui, trunk-based delivery, frontend leadership across the team.",
    href: "https://air-up.com",
    linkLabel: "air-up.com",
    image: "/projects/air-up.jpg",
  },
  {
    title: "Talentir",
    period: "2024",
    text: "Frontend for talentir.com, the payout infrastructure for agencies, brands, labels and platforms. Marketing site and product UI in Next.js and Tailwind.",
    href: "https://talentir.com",
    linkLabel: "talentir.com",
    image: "/projects/talentir.jpg",
  },
];

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
