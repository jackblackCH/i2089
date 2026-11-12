/* An item is a plain sentence (a highlight line), a term/text pair (a
   label over its text), or a term with numbered steps (a format, read in
   order). */
export type Item =
  string | { term: string; text: string } | { term: string; steps: string[] };
// In an item's text, [words](/projects/slug) links a project that has a
// page (rich-text.tsx renders it; llms.txt makes the URL absolute).

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
   complete sentences, concrete and checkable, no sales adjectives.
   Finished work (project Work lines, past About entries) is written as
   front-loaded accomplishment lines in the implied first person ("Led
   the frontend…"). Offer entries are noun phrases ("Interfaces that are
   easy to use…"): a present-tense verb without a subject reads as an
   order to the reader (PFD 2026-11-12). Current roles on About keep "I"
   ("I run i2089…"). See swiss-engineer-voice. */
export const services: Service[] = [
  {
    slug: "frontend",
    /* Marc's main offer, first everywhere, one name in every place:
       "Frontend / UX" (Marc, 2026-11-12; home band, title, blog nav,
       share image), so the link and the page it opens agree (PFD L4). One offer for web and mobile interfaces (a third offer
       would split attention, PFD L0); each example is a case on the
       site. */
    title: "Frontend / UX",
    seoTitle: "Frontend / UX: web & mobile apps, Zürich",
    description:
      "Interfaces that are easy to use, designed and built in code: web apps in React and Next.js, iOS and Android apps with React Native, Expo or SwiftUI. Zürich.",
    /* Three entries, only what a buyer needs (Marc, 2026-11-12): what
       they get, where it runs, one proof each. TODO(marc): a mobile app
       case (name, store link) once one can be shown. */
    items: [
      {
        term: "Interfaces and UX",
        text: "Interfaces that are easy to use, designed and built right in code. Like the [SME calculator on axa.ch](/projects/axa) or the [air up® shop](/projects/air-up).",
      },
      {
        term: "Web and mobile apps",
        text: "Performant web apps, mobile-first and responsive. iOS and Android apps, end to end from the code to the App Store and Google Play.",
      },
      {
        term: "Business software",
        text: "Software that fits how your business works: internal tools, customer portals, SaaS. Like a [custom WhatsApp-like consultant messenger](/projects/axa) for insurers.",
      },
    ],
  },
  {
    slug: "ai",
    /* "Agentic Engineering": the name peers use for disciplined work with
       coding agents (ti8m, INNOQ, Caylent); "AI integration" reads as
       product/RAG work, "AI transformation" as C-level change. The first
       item says in plain words what the team gets. Research 2026-11-12. */
    title: "Agentic Engineering for teams",
    seoTitle: "Agentic engineering coaching for teams, Zürich",
    description:
      "AI coding agents like Claude Code and Codex in your team's projects: a workshop day, then coaching on real tickets. Every change still goes through review.",
    /* PFD run 2026-11-12 (docs/pfd/2026-11-12-ai-page.md): three entries,
       about 110 words. The outcome and the safety rule first (R2, R4),
       the format as the path to the contact (R5), one name for the tool
       (R3). Checkable claims only (R4): "faster" is not claimed until a
       measured result exists.
       TODO(marc): the measured result, anonymous for now ("At a Swiss SME,
       a team of [n] developers went from [n] to [n] tickets per sprint in
       [n] weeks."), and the real length of the coaching step and the team
       size it fits; do not show numbers until they are real. */
    items: [
      {
        term: "The result",
        text: "AI coding agents like Claude Code and Codex, in the projects your team already has. Your engineers decide, and every change still goes through your code review and tests.",
      },
      {
        term: "How it works",
        steps: [
          "A workshop day: Claude Code set up in your codebase, with rules and skills that fit it.",
          "Coaching on your real tickets, in 1:1s and pair programming: which prompts and workflows fit which task.",
          "Optional: an engineer and coach inside your team.",
        ],
      },
      {
        term: "Who coaches",
        text: "Sixteen years of engineering software, usually as a lead, with coaching as part of it. Claude Code and Codex in daily use for the last year.",
      },
    ],
  },
  {
    slug: "about",
    title: "Marc Illien",
    seoTitle: "Marc Illien, frontend & UX engineer and AI coach, Zürich",
    description:
      "Frontend and UX engineer and AI coach in Zürich. Teaching at OST since 2014; work for AXA Switzerland, air up®, Talentir and Branded Goods.",
    items: [
      "Hi, I'm Marc, a frontend engineer in Zürich. I build web and mobile products and coach dev teams in working with AI tools.",
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
        text: "I build frontends for [AXA Switzerland's](/projects/axa) WebHub. Contract, Zürich.",
      },
      {
        term: "2024",
        text: "Led the frontend for [AXA's SME wizard and calculator](/projects/axa), a React microfrontend on axa.ch. Contract, Zürich.",
      },
      {
        term: "2023 — 2024",
        text: "Built [air up®'s headless shop](/projects/air-up) on Next.js and Shopify, plus its design system. Freelance, Munich.",
      },
      {
        term: "2022 — 2023",
        text: "Architected a [WhatsApp-like custom messenger](/projects/axa) for internal communications, in TypeScript and React. Contract, Winterthur.",
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
  /** screenshots under public/projects/, shown in this order; with more
      than one, the card and the case page fade slowly through them */
  images: string[];
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
    text: "Recurring frontend contracts at Switzerland's largest insurer since 2018. Custom React apps: the SME wizard and calculator on axa.ch, a WhatsApp-like messenger for internal communications, and the pattern library design.",
    href: "https://axa.ch",
    linkLabel: "axa.ch",
    // the SME calculator I led first, then the axa.ch homepage
    images: ["/projects/axa-calculator.jpg", "/projects/axa.jpg"],
    role: "Frontend Architect and Engineer",
    intro: "Recurring contracts at Switzerland's largest insurer since 2018.",
    highlights: [
      "Led the frontend for the SME wizard and calculator, published on axa.ch as a microfrontend.",
      "Built the UI and frontend for a WhatsApp-like messenger that lets agents talk with their clients.",
      "Helped design the pattern library.",
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
    text: "I designed and built the product filters and the shop frontend of branded-goods.ch, in Next.js and Tailwind on Saleor, an open-source e-commerce platform. I worked as a partner of Avolut.",
    href: "https://branded-goods.ch",
    linkLabel: "branded-goods.ch",
    images: ["/projects/branded-goods.jpg"],
    role: "Frontend Engineer and UI Designer",
    intro:
      "branded-goods.ch is an online shop built on Saleor, an open-source e-commerce platform. I worked on it as a partner of Avolut.",
    highlights: [
      "Designed and built the product filters: complex form components for each product's custom attributes.",
      "Developed the shop frontend in Next.js and Tailwind, on Saleor's API.",
      "Designed parts of the interface right in code, as custom components integrated into the shop.",
    ],
    stack: ["Next.js", "Saleor", "Tailwind", "TypeScript"],
  },
  {
    slug: "air-up",
    title: "air up®",
    period: "2023 — 2024",
    text: "I built headless e-commerce on Next.js and Shopify, with a 3D model viewer and a custom 3D configurator in Three.js, set up a design system with Tailwind and shadcn/ui and led the frontend.",
    href: "https://air-up.com",
    linkLabel: "air-up.com",
    images: ["/projects/air-up.jpg"],
    role: "Frontend Consultant and Lead Frontend",
    intro:
      "air up® sells its scent-flavoured drinking bottles online. I joined the team in Munich as a freelance frontend consultant.",
    highlights: [
      "Led the frontend and built the headless shop on Next.js and Shopify.",
      "Built a custom 3D configurator for special products.",
      "Integrated a 3D model viewer into the shop frontend with Three.js.",
      "Set up a design system, so the team builds from one set of components.",
    ],
    stack: ["Next.js", "Shopify", "Three.js", "Tailwind", "shadcn/ui", "TypeScript"],
  },
  {
    slug: "talentir",
    title: "Talentir",
    period: "2024",
    text: "I designed the UX and UI for Talentir, which handles payouts for agencies, brands, labels and platforms, and built the product in Next.js and Tailwind with modern development methods.",
    href: "https://talentir.com",
    linkLabel: "talentir.com",
    images: ["/projects/talentir.jpg"],
    role: "UX/UI Designer and Frontend Engineer",
    intro:
      "Talentir handles payouts for agencies, brands, labels and platforms. I designed and built the product that its customers work in.",
    highlights: [
      "Designed the product's UX and UI, then built its frontend in Next.js and Tailwind.",
      "Introduced modern dev methods, so the team moved faster.",
    ],
    stack: ["Next.js", "Tailwind", "TypeScript"],
  },
];

/* every case with a detail page: projects first, then the AXA contracts */
export const allWork: Project[] = [...projects, ...contracts];

export const projectBySlug = Object.fromEntries(
  allWork.map((p) => [p.slug, p]),
);

/* PFD R4: "Selected work" at the end of the offer pages. Each name links
   to its case page, so a buyer can check the claim. OST (teaching, not a
   case) lives on About (Marc, 2026-11-12). */
export const clients: { name: string; href: string }[] = [
  { name: "AXA", href: "/projects/axa" },
  { name: "air up®", href: "/projects/air-up" },
  { name: "Talentir", href: "/projects/talentir" },
  { name: "Branded Goods", href: "/projects/branded-goods" },
];

/* the home: three equal bands, each a big title with an arrow and one
   small line under it. Frontend / UX (Marc's main offer) first, then
   Agentic Engineering, then the contact. PFD: three chunks (L0), one
   style for all rows (L2), the offers first and the contact last (L4),
   nothing moves while people read (R1). Kept as word lists, since
   app/proto still reads bands[0] and bands[1]. */
export const bands: { words: string[]; slugs: string[]; sub: string }[] = [
  {
    words: ["Frontend / UX"],
    slugs: ["frontend"],
    sub: "Web and mobile apps. UX, design and development.",
  },
  {
    words: ["Agentic Engineering"],
    slugs: ["ai"],
    sub: "AI coding and design workflows.",
  },
];
