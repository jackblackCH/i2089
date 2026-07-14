import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { projects } from "../new/content";
import { Text } from "../new/text";
import { Footer } from "../new/footer";
import "../new/new.css";

export const metadata: Metadata = {
  title: "Projects / Clients",
  description:
    "Selected work — Eckert Branded Goods (Saleor, Next.js) and air up® (Shopify, Next.js). Frontend engineering and headless commerce. Zürich, Switzerland.",
};

export default function ProjectsPage() {
  return (
    <main className="np fixed inset-0 z-50 grid grid-cols-1 grid-rows-[auto_1fr_auto] overflow-y-auto md:grid-cols-2 md:grid-rows-[minmax(0,1fr)_auto]">
      {/* wordmark — links back home */}
      <section className="grid min-h-[38svh] grid-cols-3 grid-rows-3 p-[clamp(24px,3vw,64px)] md:min-h-0">
        <Text
          as={Link}
          href="/"
          variant="logo"
          className="col-span-full row-start-2 place-self-center transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
        >
          i2089
        </Text>
      </section>

      {/* title / showcase / contact — same band model as detail pages */}
      <section className="grid grid-rows-[auto_minmax(0,1fr)_auto] border-t border-(--np-rule) md:border-l md:border-t-0">
        <Text
          as="h1"
          variant="title"
          className="grid content-center p-[clamp(24px,3vw,64px)]"
        >
          <span className="text-trim block">Projects / Clients</span>
        </Text>

        {/* 4:4 split — two equal columns, one project per half */}
        <Text
          as="ul"
          variant="body"
          className="grid min-h-0 content-start gap-x-[clamp(24px,3vw,64px)] gap-y-[2em] overflow-y-auto border-t border-(--np-rule) p-[clamp(24px,3vw,64px)] md:grid-cols-2"
        >
          {projects.map((p) => (
            <li key={p.title} className="grid gap-y-[0.6em]">
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="grid gap-y-[0.6em] transition-opacity hover:opacity-80 focus-visible:opacity-80 focus-visible:outline-none"
              >
                <Image
                  src={p.image}
                  alt={`${p.title} — screenshot`}
                  width={1200}
                  height={750}
                  sizes="(min-width: 768px) 40vw, 90vw"
                  className="aspect-[16/10] w-full border border-(--np-rule) object-cover"
                />
                <span className="grid grid-cols-[1fr_auto] items-baseline gap-x-[1em]">
                  <span>{p.title}</span>
                  <span className="text-(--np-mute)">{p.linkLabel} ↗</span>
                </span>
              </a>
              <span className="text-(--np-mute)">{p.text}</span>
              <Text variant="footer">{p.period}</Text>
            </li>
          ))}
        </Text>

        <Text
          as="div"
          variant="body"
          className="grid content-center gap-y-[0.6em] border-t border-(--np-rule) p-[clamp(24px,3vw,64px)]"
        >
          <span className="text-(--np-mute)">Open for new projects.</span>
          {/* self-link omitted on this page — already here */}
          <a
            href="mailto:hi@i2089.com"
            className="w-max transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
          >
            hi@i2089.com
          </a>
        </Text>
      </section>

      <Footer />
    </main>
  );
}
