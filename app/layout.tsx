import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import "./globals.css";

const font = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title:
    "i2089 - Marc Illien - High quality frontend development made in Zurich",
  description:
    "Frontend Development with React, Frontend Architecture, Consulting, Prototypes & MVP's, Motion Design 3D, Design Systems, Living Styleguides, Micro Frontend Applications, Code- and tech stack reviews.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-svh">
      <body className={font.className}>{children}</body>
    </html>
  );
}
