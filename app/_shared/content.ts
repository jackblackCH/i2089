/* An item is a plain sentence (a highlight line), a term/text pair (a
   label over its text), or a term with numbered steps (a format, read in
   order). */
export type Item =
  string | { term: string; text: string } | { term: string; steps: string[] };

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
    slug: "ai",
    /* "Agentic Engineering": the name peers use for disciplined work with
       coding agents (ti8m, INNOQ, Caylent); "AI integration" reads as
       product/RAG work, "AI transformation" as C-level change. The first
       item explains the term in plain words. Research 2026-11-12. */
    title: "Agentic Engineering for your dev team",
    seoTitle: "Agentic engineering & AI coaching for dev teams, Zürich",
    description:
      "Agentic engineering for dev teams in Zürich: a workshop day, then hands-on coaching with Claude Code and Codex on your real tickets.",
    /* PFD R4 (docs/pfd/2026-11-11): claims a buyer can check. No
       multipliers; the measured result below carries the claim. */
    items: [
      {
        term: "What it is",
        text: "AI coding agents like Claude Code and Codex plan, write, test and review code. Your engineers stay in charge and make the final call on every change.",
      },
      /* Marc's method, in his words (2026-11-12): rules and skills in the
         existing project, prompting strategies, design and code connected.
         "Faster" stays a goal, not a number (PFD R4). */
      {
        term: "What I teach",
        text: "I set up Claude Code in your existing projects, with rules and skills that fit your codebase. I show your team how to prompt, which strategies work for which task, and how to connect design and code. The goal: your team uses LLMs in the projects it already has, and delivers faster.",
      },
      {
        term: "Experience",
        text: "I've been engineering software for sixteen years, usually as a lead, and coaching has been part of that. For the last year, I've used Claude Code, Codex and the modern LLM tools daily.",
      },
      /* TODO(marc): the measured result, anonymous for now. Fill in and
         uncomment; keep every value checkable.
      {
        term: "A result",
        text: "At a Swiss SME, a team of [n] developers went from [n] to [n] tickets per sprint in [n] weeks.",
      },
      */
      /* PFD L4: the format, in order, so a lead can plan it.
         TODO(marc): add the real length of step 2 (weeks) and the team
         size it fits; do not show numbers until they are real. */
      {
        term: "How we work",
        steps: [
          "A workshop day with your team.",
          "Coaching on your real tickets, in 1:1s and pair programming.",
          "If you want, I join the team as engineer and coach at the same time. Your reviews, tests and handover stay as they are.",
        ],
      },
      /* Checkable, confirmed by Marc (2026-11-12). Not claimed: a
         client's own LLM gateway, or that providers never train on the
         code. TODO(marc): add those only once they are true. */
      {
        term: "Review and tests",
        text: "Every change the AI writes goes through your normal code review and tests before it is merged.",
      },
    ],
  },
  {
    slug: "frontend",
    /* Frontend & User Interfaces: user interfaces lead, each example is a
       case on the site (axa, talentir, air-up). UX lives in entry 03. */
    // non-breaking space: "User Interfaces" stays on one line
    title: "Frontend & User\u00a0Interfaces",
    seoTitle: "Frontend & user interfaces in React & Next.js, Zürich",
    description:
      "I design and build user interfaces and fast web apps that stay easy to change, in TypeScript, React, Next.js and Tailwind. From Zürich.",
    items: [
      {
        term: "User interfaces",
        text: "I design and build the interfaces people work with every day, from forms and calculators to product UIs and online shops. Like the SME calculator on axa.ch, Talentir's product or the air up® shop.",
      },
      {
        term: "Frontend engineering",
        text: "I build fast web apps that stay easy to change, mostly with TypeScript, React, Next.js and Tailwind. I build for performance from the start, so Core Web Vitals and Lighthouse scores stay green.",
      },
      {
        term: "UX and design in code",
        text: "I know how to design, and these days I also design right in code. I use Claude Design or Figma with Claude via MCP.",
      },
      {
        term: "Custom business software",
        text: "I build software tailored to how your business works, from internal tools to customer portals and SaaS products, built to last. Like AXA's consultant messenger.",
      },
      {
        term: "Backend and DevOps",
        text: "My backends are usually small and run on Node.js. With my DevOps skills, they're easy to run and deploy anywhere.",
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
      "Hi, I'm Marc, a frontend engineer in Zürich. I build web products and coach dev teams in working with AI tools.",
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

/* every case with a detail page: projects first, then the AXA contracts */
export const allWork: Project[] = [...projects, ...contracts];

export const projectBySlug = Object.fromEntries(
  allWork.map((p) => [p.slug, p]),
);

/* PFD R4: the client line. Each name links to the page that proves it,
   so a buyer can check the claim. */
export const clients: { name: string; href: string }[] = [
  { name: "AXA", href: "/projects/axa" },
  { name: "air up®", href: "/projects/air-up" },
  { name: "Talentir", href: "/projects/talentir" },
  { name: "Branded Goods", href: "/projects/branded-goods" },
  { name: "OST", href: "/about" },
];

/* the home bands: one fixed label each (PFD R1, nothing a visitor
   clicks may move while they read). The third band is the static
   audience line. Kept as word lists, since app/proto still cycles them. */
export const bands: { words: string[]; slugs: string[] }[] = [
  { words: ["Agentic Engineering for your dev team"], slugs: ["ai"] },
  { words: ["Frontend & User\u00a0Interfaces"], slugs: ["frontend"] },
  { words: ["for startups, SMEs and corporates"], slugs: [] },
];
