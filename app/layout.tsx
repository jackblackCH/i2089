import type { Metadata } from "next";
import "./globals.css";
import "./playground.css";
import { PostHogProvider } from "../components/PostHogProvider";
import { Analytics } from "@vercel/analytics/next";

export const metadata: Metadata = {
  metadataBase: new URL("https://i2089.com"),
  title: {
    template: "i2089 :: Marc Illien :: %s",
    default: "i2089 :: Marc Illien",
  },
  description:
    "Marc Illien runs i2089, an independent software studio in Zürich. He works on Agentic Engineering, frontend development, UX/UI prototypes and MVPs.",
};

// The wordmark subline reveals once per session (see .np-signature in
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
    <html
      lang="en"
      className="h-svh"
      suppressHydrationWarning
    >
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
            <div className="new-root">{children}</div>
          </div>
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
