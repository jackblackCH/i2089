import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { services, bySlug } from "../_shared/content";
import { Text } from "../_shared/text";
import { Column } from "../_shared/column";

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
  return {
    title: slug === "about" ? "About" : service.title,
    description: `${service.title}. i2089, Marc Illien, Zürich.`,
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
    <Column title={service.title} linkedin={slug === "about"}>
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
              <Text variant="footer" className="text-trim">
                {item.term}
              </Text>
              <p>{item.text}</p>
            </li>
          ),
        )}
      </ul>
    </Column>
  );
}
