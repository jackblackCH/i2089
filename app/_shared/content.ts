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
    slug: "ai",
    title: "Consulting",
    items: [
      {
        term: "Workflows",
        text: "Cut delivery from weeks to days with LLM workflows.",
      },
      {
        term: "Teams",
        text: "Get your whole team working with AI: 1:1 sessions, workshops, pair programming.",
      },
      {
        term: "Performance",
        text: "Increase team performance by 10x.",
      },
      {
        term: "Transition",
        text: "Switch to AI-supported development without halting delivery.",
      },
    ],
  },
  {
    slug: "engineering",
    title: "Frontend Software Engineering",
    items: [
      {
        term: "Frontend",
        text: "Ship fast, maintainable web apps in TypeScript, React, Next.js, and Tailwind.",
      },
      {
        term: "Software",
        text: "Build architecture and APIs that survive handovers.",
      },
      {
        term: "Design",
        text: "See your interface working in code, not in mockups.",
      },
      {
        term: "Products",
        text: "Launch your product, end to end. From prototype to production.",
      },
    ],
  },
  {
    slug: "about",
    title: "Marc Illien",
    items: [
      "Software engineer from Zürich, making shiny digital products with precision and taste, and teaching teams to build with AI.",
      {
        term: "since 2023",
        text: "i2089 — AI consulting, AI design, and Agentic Engineering. Self-employed, Zürich.",
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
    text: "Recurring frontend contracts at Switzerland's largest insurer, a new project most years. Custom React apps — an SME calculator and an internal-agent customer-communication tool — and component library design in 2019.",
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
    words: ["Consulting", "AI Workflows", "Workshops"],
    slugs: ["ai", "ai", "ai"],
  },
  {
    words: ["Frontend Engineering", "Software Engineering", "Digital Products"],
    slugs: ["engineering", "engineering", "engineering"],
  },
  {
    words: ["for Startups, SMEs and Corporates"],
    slugs: [],
  },
];
