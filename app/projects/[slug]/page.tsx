import type { Metadata } from "next";
import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "../../_shared/content";
import { Text } from "../../_shared/text";
import { Wordmark } from "../../_shared/wordmark";
import { Copyright } from "../../_shared/copyright";
import "../../_shared/shared.css";

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) return {};
  return {
    title: project.title,
    description: `${project.title}, ${project.period}. ${project.role}. ${project.intro}`,
  };
}

// A label over its content, one label-step apart. Both are trimmed to
// cap height and baseline so the gap you set is the gap you see.
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid content-start gap-y-label">
      <Text variant="footer" as="h2" className="text-trim">
        {label}
      </Text>
      {children}
    </div>
  );
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectBySlug[slug];
  if (!project) notFound();

  return (
    <main className="np fixed inset-0 z-50 grid grid-cols-1 grid-rows-[38svh_1fr] overflow-y-auto md:grid-cols-2 md:grid-rows-1">
      <Wordmark />

      {/* One flowing column: on md+ it scrolls as a whole, on mobile the
          page does. Contact is pushed to the bottom when the content is
          short. The back link sits out of flow in the top padding, so
          the title lands exactly where it does on every other page. */}
      <section className="relative flex flex-col border-t border-(--np-rule) md:overflow-y-auto md:border-l md:border-t-0">
        <Text
          variant="footer"
          className="absolute left-pad top-[calc(var(--spacing-pad)/2)] -translate-y-1/2"
        >
          <Link
            href="/projects"
            className="transition-colors hover:text-(--np-fg) focus-visible:text-(--np-fg) focus-visible:outline-none"
          >
            ← All projects
          </Link>
        </Text>

        {/* Title, image and text are spaced by the same group step, so
            the gap above the image equals the gap below it. */}
        <Text
          as="article"
          variant="body"
          className="flex flex-col gap-y-group pt-pad"
        >
          <Text as="h1" variant="title" className="px-pad">
            <span className="text-trim block">{project.title}</span>
          </Text>

          {/* full bleed — only the text needs the side padding */}
          <div className="relative overflow-hidden border-y border-(--np-rule) pb-[62.5%]">
            <Image
              src={project.image}
              alt={`${project.title} — screenshot`}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>

          <div className="grid gap-y-group px-pad">
            {/* role takes what's left, period only its own width, so a
                narrow column wraps the role, not the year */}
            <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-group">
              <Field label="Role">
                <p>{project.role}</p>
              </Field>
              <Field label="Period">
                <p>{project.period}</p>
              </Field>
            </div>

            <p>{project.intro}</p>

            <Field label="What I did">
              <ul className="grid gap-y-item">
                {project.highlights.map((h) => (
                  <li key={h} className="text-trim relative pl-[1.4em]">
                    <span
                      aria-hidden
                      className="absolute left-0 text-(--np-mute)"
                    >
                      →
                    </span>
                    {h}
                  </li>
                ))}
              </ul>
            </Field>

            <Field label="Stack">
              <p>{project.stack.join(", ")}</p>
            </Field>

            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-trim w-max transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
            >
              {project.linkLabel} ↗
            </a>
          </div>
        </Text>

        <Text
          as="div"
          variant="body"
          className="mt-auto grid content-center gap-y-[0.6em] p-pad"
        >
          <span>Open for new projects.</span>
          <a
            href="mailto:hi@i2089.com"
            className="w-max transition-opacity hover:opacity-60 focus-visible:opacity-60 focus-visible:outline-none"
          >
            hi@i2089.com
          </a>
        </Text>
      </section>

      <Copyright />
    </main>
  );
}
