import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, bySlug } from "../_shared/content";
import { pageMeta } from "../_shared/seo";
import { Text } from "../_shared/text";
import { RichText } from "../_shared/rich-text";
import { Column } from "../_shared/column";

// PFD R4: the selected cases at the end of the two offer pages. On the
// AI page the label says what the work was, since none of these cases is
// an AI engagement yet (Sincerity test).
const CLIENT_LABEL: Record<string, string> = {
  ai: "Selected engineering work",
  frontend: "Selected work",
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

// the entry's number among the term entries (plain sentences don't count)
const numberOf = (items: { length: number }[] | unknown[], index: number) =>
  (items as unknown[])
    .slice(0, index + 1)
    .filter((it) => typeof it !== "string").length;

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
            entries are a group-step apart, like sections on a project.
            The "calm" labels variant numbers the offer entries and puts a
            group step between entries (shared.css, .np-item). */}
      <ul className="np-list gap-y-group px-pad grid">
        {service.items.map((item, i) =>
          typeof item === "string" ? (
            <li key={item} className="text-trim">
              {item}
            </li>
          ) : (
            <li key={item.term} className="np-item gap-y-label grid">
              <Text variant="footer" className="np-label np-term text-trim">
                {/* About lists dates, so only the offer pages number */}
                {slug !== "about" && (
                  <span aria-hidden className="np-num">
                    {String(numberOf(service.items, i)).padStart(2, "0")}
                  </span>
                )}
                <span className="np-label-text">{item.term}</span>
              </Text>
              {"steps" in item ? (
                // a format, read in order: numbers in the label colour,
                // hung in the gutter, so the text keeps the column edge
                <ol className="gap-y-item grid">
                  {item.steps.map((step, i) => (
                    <li key={step} className="text-trim relative">
                      <span aria-hidden className="np-hang tabular-nums">
                        {i + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-trim">
                  <RichText text={item.text} />
                </p>
              )}
            </li>
          ),
        )}
      </ul>
    </Column>
  );
}
