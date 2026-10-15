import type { Metadata } from "next";

const NAME = "Marc Illien";

/* Every page's metadata in one shape: the search keywords lead the title
   and the name closes it (layout.tsx template "%s · Marc Illien"), the
   description is written for the result snippet (~150 characters), and
   each page declares its canonical URL. Open Graph and Twitter repeat the
   same title and description, since a page-level openGraph object
   replaces the layout's rather than merging with it. The share image
   comes from opengraph-image.tsx for every route. */
export function pageMeta({
  title,
  description,
  path,
  absolute = false,
}: {
  title: string;
  description: string;
  path: string;
  /** use the title as-is, without "· Marc Illien" (home, About) */
  absolute?: boolean;
}): Metadata {
  const full = absolute ? title : `${title} · ${NAME}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title: full,
      description,
      url: path,
      siteName: "i2089",
      locale: "en_CH",
      type: "website",
    },
    twitter: { card: "summary_large_image", title: full, description },
  };
}
