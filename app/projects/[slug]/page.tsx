import type { Metadata } from "next";
import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import { projects, projectBySlug } from "../../_shared/content";
import { pageMeta } from "../../_shared/seo";
import { Text } from "../../_shared/text";
import { Column } from "../../_shared/column";
import { Shot } from "../../_shared/shot";

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
function Field({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="gap-y-label grid content-start">
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
          <Field label="Role">
            <p>{project.role}</p>
          </Field>
          <Field label="Period">
            <p>{project.period}</p>
          </Field>
        </div>
      </div>

      {/* full bleed — only the text needs the side padding */}
      <div className="relative overflow-hidden border-y border-(--np-rule) pb-[50%]">
        <Shot
          project={project}
          priority
          sizes="(min-width: 768px) 50vw, 100vw"
        />
      </div>

      <div className="gap-y-group px-pad grid">
        <p>{project.intro}</p>

        <Field label="What I did">
          <ul className="gap-y-item grid">
            {project.highlights.map((h) => (
              <li key={h} className="text-trim relative pl-[1.4em]">
                <span aria-hidden className="absolute left-0 text-(--np-mute)">
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
          className="link-quiet text-trim w-max"
        >
          {project.linkLabel} ↗
        </a>
      </div>
    </Column>
  );
}
