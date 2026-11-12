import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, bySlug } from "../_shared/content";
import { pageMeta } from "../_shared/seo";
import { Text } from "../_shared/text";
import { Column } from "../_shared/column";

// PFD R4: the client line on the two offer pages. On the AI page the
// label says what the work was, since none of these clients is an AI
// engagement yet (Sincerity test).
const CLIENT_LABEL: Record<string, string> = {
  ai: "Engineering clients",
  engineering: "Clients",
};

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

// Only render the slugs from generateStaticParams — otherwise /favicon.ico,
// /robots.txt lookups, and any random path get routed through this catch-all
// and crash Turbopack in dev.
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = bySlug[slug];
  if (!service) return {};
  // About carries the name in its own title, so it skips the
  // "· Marc Illien" suffix
  return pageMeta({
    title: service.seoTitle,
    description: service.description,
    path: `/${slug}`,
    absolute: slug === "about",
  });
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
    <Column
      title={service.title}
      linkedin={slug === "about"}
      clients={CLIENT_LABEL[slug]}
    >
      {/* each entry is a label over its text, one label-step apart;
            entries are a group-step apart, like sections on a project */}
      <ul className="gap-y-group px-pad grid">
        {service.items.map((item) =>
          typeof item === "string" ? (
            <li key={item} className="text-trim">
              {item}
            </li>
          ) : (
            <li key={item.term} className="gap-y-label grid">
              <Text variant="footer" className="np-label np-term text-trim">
                <span className="np-label-text">{item.term}</span>
              </Text>
              {"steps" in item ? (
                // a format, read in order: numbers in the label colour,
                // hung in the gutter like the project list arrows
                <ol className="gap-y-item grid">
                  {item.steps.map((step, i) => (
                    <li key={step} className="text-trim pl-item relative">
                      <span
                        aria-hidden
                        className="absolute left-0 text-(--np-mute) tabular-nums"
                      >
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <p>{item.text}</p>
              )}
            </li>
          ),
        )}
      </ul>
    </Column>
  );
}
