import type { Metadata } from "next";
import "./globals.css";
import "./playground.css";
import { PostHogProvider } from "../components/PostHogProvider";
import { Analytics } from "@vercel/analytics/next";
import { Frame } from "./_shared/frame";
import { CompareToggle } from "./_compare/compare-toggle";

// PFD before/after toggle: on localhost and Vercel previews only, never
// on i2089.com. Remove with app/_compare after merge.
const COMPARE_BEFORE =
  process.env.NODE_ENV === "development"
    ? "http://localhost:2223"
    : process.env.VERCEL_ENV === "preview"
      ? "https://i2089.com"
      : null;

export const metadata: Metadata = {
  metadataBase: new URL("https://i2089.com"),
  // keywords first, name last — Google shows ~60 characters
  title: {
    template: "%s · Marc Illien",
    default: "Marc Illien · AI consulting & frontend engineering, Zürich",
  },
  description:
    "AI coaching for dev teams and frontend engineering in React and Next.js. Marc Illien, independent software engineer in Zürich.",
};

// The wordmark byline reveals once per session (see .np-byline in
// shared.css). Runs before paint: if the reveal already played, mark the
// root so CSS skips it; otherwise remember it and mark the root after the
// reveal has finished, so later navigations show the line at rest.
const SIGNATURE_ONCE = `try{var k='i2089-signature',d=document.documentElement;if(sessionStorage.getItem(k)){d.dataset.signatureSeen=''}else{sessionStorage.setItem(k,'1');setTimeout(function(){d.dataset.signatureSeen=''},1200)}}catch(e){document.documentElement.dataset.signatureSeen=''}`;

// Schema.org JSON-LD so search engines and LLMs can identify the entity
// behind the site without guessing from prose.
const JSON_LD = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://i2089.com/#marc",
      name: "Marc Illien",
      url: "https://i2089.com",
      email: "hi@i2089.com",
      jobTitle: "Independent Software Engineer",
      description:
        "Independent software engineer in Zürich, working on Agentic Engineering, frontend engineering and digital products.",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Zürich",
        addressCountry: "CH",
      },
      sameAs: ["https://www.linkedin.com/in/marcillien/"],
      knowsAbout: [
        "Agentic Engineering",
        "Large Language Models",
        "Frontend Engineering",
        "React",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
      ],
      worksFor: { "@id": "https://i2089.com/#org" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://i2089.com/#org",
      name: "i2089",
      url: "https://i2089.com",
      founder: { "@id": "https://i2089.com/#marc" },
      areaServed: "Worldwide",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Zürich",
        addressCountry: "CH",
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://i2089.com/#site",
      url: "https://i2089.com",
      name: "i2089",
      publisher: { "@id": "https://i2089.com/#org" },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-svh" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: SIGNATURE_ONCE }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
        />
      </head>
      <body>
        <PostHogProvider>
          <div className="new-frame">
            <div className="new-root">
              <Frame>{children}</Frame>
            </div>
          </div>
        </PostHogProvider>
        {COMPARE_BEFORE && <CompareToggle beforeOrigin={COMPARE_BEFORE} />}
        <Analytics />
      </body>
    </html>
  );
}
