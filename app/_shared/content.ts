/* An item is either a plain sentence (rendered as a highlight line)
   or a term/text pair (rendered as a definition row with an arrow). */
export type Item = string | { term: string; text: string };

export type Service = {
  slug: string;
  /** the page's H1 */
  title: string;
  /** <title>, keywords first; the layout adds "· Marc Illien" */
  seoTitle: string;
  /** search snippet, ~150 characters */
  description: string;
  items: Item[];
};

/* Copy follows the precision-copy rules: objective language, short
   complete sentences, concrete and checkable, no sales adjectives. */
export const services: Service[] = [
  {
    slug: "ai-solutions",
    title: "AI consulting & coaching",
    seoTitle: "AI consulting & coaching for dev teams, Zürich",
    description:
      "I help make your dev team 10x faster with AI. Hands-on coaching with Claude Code, Codex and agentic workflows, on your real tickets.",
    items: [
      {
        term: "AI & LLMs since day one",
        text: "I help your team and engineers work 10x faster with Claude Code and modern agentic workflows. With agents running in parallel, it's up to 50x. I've done the practice, so your team skips the slop.",
      },
      {
        term: "Team enablement",
        text: "I coach your team on its real tickets, in 1:1s, workshops and pair programming. In a few weeks, everyone ships 5x to 10x and your backlog melts.",
      },
      {
        term: "Agentic workflows",
        text: "I set up AI workflows that plan, write, test and review code. Your team stays in charge and makes the final call. I build them on Claude Code, Codex or whatever your company already uses. Boring tickets are yesterday.",
      },
      {
        term: "Hands-on delivery",
        text: "I also join your team as an engineer. We ship in a day. Your reviews, tests and handover stay as they are.",
      },
      {
        term: "No disruption",
        text: "I work inside your compliance rules, LLM and codebase. I roll out in weeks, and your team keeps shipping.",
      },
    ],
  },
  {
    slug: "engineering",
    title: "Frontend engineering",
    seoTitle: "Frontend engineer for React & Next.js, Zürich",
    description:
      "I design and build fast web apps that stay easy to change, in TypeScript, React, Next.js and Tailwind. Frontend engineering from Zürich.",
    items: [
      {
        term: "Custom business software",
        text: "My specialty. I build software tailored to how your business works, from internal tools to customer portals, built to last. Like the SME calculator on axa.ch or AXA's consultant messenger.",
      },
      {
        term: "Frontend",
        text: "I build fast web apps that stay easy to change, mostly with TypeScript, React, Next.js and Tailwind.",
      },
      {
        term: "Backend and DevOps",
        text: "My backends are usually small and run on Node.js. With my DevOps skills, they're easy to run and deploy anywhere.",
      },
      {
        term: "UI/UX design",
        text: "I know how to design in code. When it helps, I use Claude Design or Figma with Claude via MCP. I build for performance from the start, so Core Web Vitals and Lighthouse scores stay green.",
      },
    ],
  },
  {
    slug: "about",
    title: "Marc Illien",
    seoTitle: "Marc Illien, frontend engineer & AI coach in Zürich",
    description:
      "I'm a frontend engineer and AI coach in Zürich. I've taught at OST since 2014 and worked with AXA Switzerland, air up® and more.",
    items: [
      "Hi, I'm Marc, a frontend engineer in Zürich. I build web products and help make teams 10x faster with AI.",
      {
        term: "since 2023",
        text: "I run i2089: AI consulting, AI design and Agentic Engineering. Self-employed, Zürich.",
      },
      {
        term: "since 2014",
        text: "I teach Frontend Engineering (CAS) at OST in Rapperswil.",
      },
      {
        term: "2025 — 2026",
        text: "I build frontends for AXA Switzerland's WebHub. Contract, Zürich.",
      },
      {
        term: "2024",
        text: "I led the frontend for AXA's SME wizard and calculator, a React microfrontend on axa.ch. Contract, Zürich.",
      },
      {
        term: "2023 — 2024",
        text: "I built air up®'s headless shop on Next.js and Shopify, plus its design system. Freelance, Munich.",
      },
      {
        term: "2022 — 2023",
        text: "I architected AXA's consultant messenger in TypeScript and React. Contract, Winterthur.",
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
      "I led the frontend for an SME wizard and calculator, published on axa.ch as a microfrontend.",
      "I built a messenger that lets agents talk with their clients, in TypeScript and React.",
      "I worked on the design of the pattern library.",
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
      "I built the frontend in Next.js and Tailwind, on Saleor's API.",
      "I designed parts of the interface, right in code.",
    ],
    stack: ["Next.js", "Saleor", "Tailwind", "TypeScript"],
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
      "I built the headless shop on Next.js and Shopify.",
      "I set up a design system, so the team builds from one set of components.",
      "I added 3D and motion.",
      "I moved the team to trunk-based delivery, with small changes going straight to main.",
      "I led the frontend across the team.",
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
      "I designed how the product works and looks.",
      "I built the frontend in Next.js and Tailwind.",
      "I brought in modern dev methods, so the team moved faster.",
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
