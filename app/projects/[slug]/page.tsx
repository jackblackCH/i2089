import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { allWork, projectBySlug } from "../../_shared/content";
import { pageMeta } from "../../_shared/seo";
import { Text } from "../../_shared/text";
import { Column } from "../../_shared/column";
import { Shot } from "../../_shared/shot";
import { Arrow } from "../../_shared/arrow";

export function generateStaticParams() {
  return allWork.map((p) => ({ slug: p.slug }));
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
  // lead with the role when the snippet still fits Google's ~158
  // characters; otherwise the intro alone
  const withRole = `${project.role}. ${project.intro}`;
  return pageMeta({
    title: `${project.title} case study: ${project.stack.slice(0, 2).join(" & ")}`,
    description: withRole.length <= 158 ? withRole : project.intro,
    path: `/projects/${slug}`,
  });
}

// A label over its content, one label-step apart. Both are trimmed to
// cap height and baseline so the gap you set is the gap you see.
function Field({
  label,
  children,
  entry = true,
}: {
  label: string;
  children: ReactNode;
  /** an entry in the page's list (hairline between entries) */
  entry?: boolean;
}) {
  return (
    <div className={`gap-y-label grid content-start ${entry ? "np-item" : ""}`}>
      <Text variant="footer" as="h2" className="np-label text-trim">
        <span className="np-label-text">{label}</span>
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
    <Column
      title={project.title}
      back={{ href: "/projects", label: "All projects" }}
    >
      {/* role and period first — they answer "what did he do?" before
            the screenshot takes the fold */}
      <div className="px-pad">
        {/* role takes what's left, period only its own width, so a
              narrow column wraps the role, not the year */}
        <div className="gap-x-group grid grid-cols-[minmax(0,1fr)_auto]">
          <Field label="Role" entry={false}>
            <p className="text-trim">{project.role}</p>
          </Field>
          <Field label="Period" entry={false}>
            <p className="text-trim">{project.period}</p>
          </Field>
        </div>
      </div>

      {/* inside the same side padding as the text, so the image keeps
          the content's edges */}
      <div className="px-pad">
        <div className="np-card relative overflow-hidden pb-[50%]">
          <Shot
            project={project}
            priority
            sizes="(min-width: 768px) 50vw, 100vw"
          />
        </div>
      </div>

      {/* the same entry pattern as the offer pages: the intro, then
          labelled entries split by a hairline (shared.css, .np-list) */}
      <div className="np-list gap-y-group px-pad grid">
        <p className="text-trim">{project.intro}</p>

        <Field label="Work">
          <ul className="gap-y-item grid">
            {project.highlights.map((h) => (
              <li key={h} className="text-trim relative">
                {/* hung in the gutter, so the text keeps the column edge;
                    text-trim puts the first baseline at cap height
                    (0.714em) and the arrow box is 0.76em tall */}
                <Arrow className="np-hang top-[-0.046em]" />
                {h}
              </li>
            ))}
          </ul>
        </Field>

        <Field label="Stack">
          <p className="text-trim">{project.stack.join(", ")}</p>
        </Field>

        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="link-quiet hit-area text-trim w-max"
        >
          {project.linkLabel} <Arrow dir="up-right" />
        </a>
      </div>
    </Column>
  );
}
