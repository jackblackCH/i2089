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
    title: "Consulting & AI solutions",
    items: [
      "With AI tools, one engineer can clear a week of team backlog in an afternoon. I help the whole team work that way.",
      {
        term: "AI done right",
        text: "Used well, AI makes an engineer 10x more efficient. With agents that plan, write and test code in parallel, 50x is possible. Getting there takes practice with the tools. Without it, AI mostly produces slop.",
      },
      {
        term: "Team enablement",
        text: "I run 1:1 sessions, workshops and pair programming on your team's real tickets. Within a few weeks, the whole team works with AI.",
      },
      {
        term: "Agentic workflows",
        text: "I set up AI workflows that plan, write, test and review code. Your team reviews the result and makes the final decision. They run on Claude Code, Codex or the tools your company already uses.",
      },
      {
        term: "Hands-on delivery",
        text: "I also work as an engineer in your team. With AI, a feature can take a day and a rewrite a week. Your code review, tests and handover stay the same.",
      },
      {
        term: "No disruption",
        text: "I work within your compliance rules, with your LLM and in your codebase. Rollout takes weeks, and your team keeps delivering during it.",
      },
    ],
  },
  {
    slug: "engineering",
    title: "Frontend software engineering",
    items: [
      {
        term: "Frontend",
        text: "I build fast, maintainable web apps in TypeScript, React (with Next.js or Vite) and Tailwind.",
      },
      {
        term: "Backend",
        text: "I design the architecture and APIs that the frontend depends on.",
      },
      {
        term: "UI/UX design",
        text: "I design interfaces directly in code, with accessibility and tests built in.",
      },
    ],
  },
  {
    slug: "about",
    title: "Marc Illien",
    items: [
      "I'm a frontend software engineer in Zürich. I build web products and teach teams to use AI in their daily work.",
      {
        term: "since 2023",
        text: "i2089. Consulting on AI adoption, AI design and Agentic Engineering. Self-employed, Zürich.",
      },
      {
        term: "since 2014",
        text: "Lecturer, Frontend Engineering (CAS Frontend Engineering). OST, Eastern Switzerland University of Applied Sciences, Rapperswil.",
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
        text: "Frontend Architect and Fullstack Engineer, AXA. Messenger for consultants to talk with their clients, in TypeScript and React. Contract, Winterthur.",
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
    period: "since 2018",
    text: "Recurring frontend contracts at Switzerland's largest insurer since 2018. Custom React apps: an SME calculator, an internal-agent communication tool, and pattern library design.",
    href: "https://axa.ch",
    linkLabel: "axa.ch",
    image: "/projects/axa.jpg",
    role: "Frontend Architect and Engineer",
    intro: "Recurring contracts at Switzerland's largest insurer since 2018.",
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
    text: "I built the frontend and designed parts of the UI for branded-goods.ch, using Next.js and Tailwind on Saleor, an open-source e-commerce platform. I worked as a partner of Avolut.",
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
    text: "I built headless e-commerce on Next.js and Shopify, set up a design system with Tailwind and shadcn/ui, moved the team to trunk-based delivery and led the frontend.",
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
      "Moved the team to trunk-based delivery, where small changes go straight into the main branch.",
      "Led the frontend work across the team.",
    ],
    stack: ["Next.js", "Shopify", "Tailwind", "shadcn/ui", "TypeScript"],
  },
  {
    slug: "talentir",
    title: "Talentir",
    period: "2024",
    text: "I designed the UX and UI for Talentir, which handles payouts for agencies, brands, labels and platforms, and built the product in Next.js and Tailwind with modern development methods.",
    href: "https://talentir.com",
    linkLabel: "talentir.com",
    image: "/projects/talentir.jpg",
    role: "UX/UI Designer and Frontend Engineer",
    intro:
      "Talentir handles payouts for agencies, brands, labels and platforms. I designed and built the product that its customers work in.",
    highlights: [
      "Designed how the product works and how it looks.",
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
    words: ["Consulting", "AI solutions", "AI workshops"],
    slugs: ["ai-solutions", "ai-solutions", "ai-solutions"],
  },
  {
    words: [
      "Frontend engineering",
      "Software engineering",
      "Digital experiences",
    ],
    slugs: ["engineering", "engineering", "engineering"],
  },
  {
    words: ["for startups, SMEs and corporates"],
    slugs: [],
  },
];
