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
          <span className="text-[clamp(18px,4vw,45px)] font-bold leading-none tracking-[-0.04em] text-(--np-mute) md:text-[clamp(14px,2.25vw,45px)]">
            Marc Illien
          </span>
        </Link>
      </section>

      {/* content — title / items / contact / copyright. Copyright pinned
          bottom-right to match the homepage footer treatment. */}
      <section className="grid grid-rows-[auto_minmax(0,1fr)_auto_auto] border-t border-(--np-rule) md:border-l md:border-t-0">
        {/* the h1 is a grid container, so text-box can't trim it — the
            inner span carries the trim and gets centered as a clean
            cap-to-baseline box */}
        <Text
          as="h1"
          variant="title"
          className="grid content-center p-[clamp(24px,3vw,64px)]"
        >
          <span className="text-trim block">{service.title}</span>
        </Text>

        {/* two shared columns (term / description) via subgrid so every
            description starts at the same x. Row dividers are painted
            in the surface color: rhythm without visible lines. Plain
            sentences render as selection-style highlights that wrap
            per line. */}
        {/* strict 2-col grid, rows split the band into equal heights
            (auto-rows-fr); every row centers its content vertically,
            terms and descriptions share the two subgrid columns */}
        <Text
          as="ul"
          variant="body"
          className="grid min-h-0 auto-rows-[minmax(max-content,1fr)] gap-x-[1.5em] overflow-y-auto border-t border-(--np-rule) px-[clamp(24px,3vw,64px)] py-[clamp(12px,1.5vw,32px)] md:grid-cols-[max-content_1fr]"
        >
          {service.items.map((item) =>
            typeof item === "string" ? (
              <li key={item} className="grid content-center md:col-span-2">
                <span className="np-invert w-fit bg-(--np-fg) box-decoration-clone leading-[1.45] text-(--np-surface)">
                  {item}
                </span>
              </li>
            ) : (
              <li
                key={item.term}
                className="grid grid-cols-1 content-center items-baseline gap-y-[0.3em] md:col-span-2 md:grid-cols-subgrid"
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
          className="grid content-center gap-y-[0.6em] border-t border-(--np-rule) p-[clamp(24px,3vw,64px)]"
        >
          {slug === "about" && (
            <a
              href="https://www.linkedin.com/in/marcillien/"
              target="_blank"
              rel="noopener noreferrer"
              className="grid w-max grid-flow-col items-center gap-x-[0.5em] transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
            >
              <svg
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
                className="h-[0.9em] w-[0.9em]"
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
