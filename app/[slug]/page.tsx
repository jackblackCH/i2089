import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { services, bySlug } from "../_shared/content";
import { Text } from "../_shared/text";
import "../_shared/shared.css";

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = bySlug[slug];
  if (!service) return {};
  return {
    title: slug === "about" ? "About" : service.title,
    description: `${service.title} — i2089, Marc Illien. Zürich, Switzerland.`,
  };
}

export default async function ContentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = bySlug[slug];
  if (!service) notFound();

  return (
    <main className="np fixed inset-0 z-50 grid grid-cols-1 grid-rows-[38svh_1fr] overflow-y-auto md:grid-cols-2 md:grid-rows-1">
      {/* wordmark — full height of the left column, links back home */}
      <section className="grid place-items-center p-[clamp(24px,3vw,64px)]">
        <Link
          href="/"
          className="grid justify-items-center gap-y-[clamp(6px,0.9vw,18px)] transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
        >
          <Text variant="logo">i2089</Text>
          <Text
            as="div"
            variant="signature"
            className="grid justify-items-center gap-y-[0.35em]"
          >
            <span>Digital Experiences</span>
            <span>by Marc Illien</span>
          </Text>
        </Link>
      </section>

      {/* title / items / contact / copyright — all blocks share the same
          padding token and left edge, so the type column is one straight
          line down the page. Copyright pinned bottom-right. */}
      <section className="grid grid-rows-[auto_minmax(0,1fr)_auto_auto] border-t border-(--np-rule) md:border-l md:border-t-0">
        <Text
          as="h1"
          variant="title"
          className="p-[clamp(24px,3vw,64px)]"
        >
          <span className="text-trim block">{service.title}</span>
        </Text>

        {/* items — packed from the top with a proportional row gap.
            Term/description columns use subgrid so every row's baseline
            and column x line up perfectly. */}
        <Text
          as="ul"
          variant="body"
          className="grid min-h-0 auto-rows-min gap-x-[clamp(1.5em,2vw,3em)] gap-y-[clamp(0.9em,1.4vw,1.6em)] overflow-y-auto border-t border-(--np-rule) p-[clamp(24px,3vw,64px)] md:grid-cols-[max-content_1fr]"
        >
          {service.items.map((item) =>
            typeof item === "string" ? (
              <li key={item} className="leading-[1.45] md:col-span-2">
                {item}
              </li>
            ) : (
              <li
                key={item.term}
                className="grid grid-cols-1 gap-y-[0.3em] md:col-span-2 md:grid-cols-subgrid md:items-baseline"
              >
                <span>{item.term}</span>
                <span className="text-(--np-mute)">{item.text}</span>
              </li>
            ),
          )}
        </Text>

        <Text
          as="div"
          variant="body"
          className="grid gap-y-[0.6em] border-t border-(--np-rule) p-[clamp(24px,3vw,64px)]"
        >
          {slug === "about" && (
            <a
              href="https://www.linkedin.com/in/marcillien/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex w-max items-center gap-x-[0.5em] leading-none transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-[0.95em] w-[0.95em] translate-y-[0.03em]"
              >
                <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.36V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0z" />
              </svg>
              LinkedIn
            </a>
          )}
          <span className="text-(--np-mute)">
            Open for new{" "}
            <Link
              href="/projects"
              className="underline underline-offset-4 transition-colors hover:text-(--np-fg) focus-visible:text-(--np-fg) focus-visible:outline-none"
            >
              projects
            </Link>
            .
          </span>
          <a
            href="mailto:hi@i2089.com"
            className="w-max transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
          >
            hi@i2089.com
          </a>
        </Text>

        <Text
          variant="footer"
          className="border-t border-(--np-rule) px-[clamp(24px,3vw,64px)] py-[clamp(10px,0.9vw,16px)] text-right"
        >
          ©2026 i2089 :: i2089 :: Zürich :: 2026
        </Text>
      </section>
    </main>
  );
}
