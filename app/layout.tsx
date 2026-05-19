import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import "./playground.css";
import { PostHogProvider } from "../components/PostHogProvider";
import { Analytics } from "@vercel/analytics/next";
import { ThemeToggle } from "./theme-toggle";

export const metadata: Metadata = {
  title:
    "i2089 // Marc Illien // Frontend Engineering // Agentic Engineering // Zürich",
  description:
    "i2089 — the independent engineering studio of Marc Illien in Zurich. Agentic Engineering, Fullstack & Frontend Development, UX/UI prototyping.",
};

// Runs before paint to apply the persisted theme so the canvas doesn't flash.
const THEME_BOOT = `try{var t=localStorage.getItem('i2089-new-theme');var f=document.currentScript.parentElement;if(t==='light'||t==='dark')f.dataset.theme=t;}catch(e){}`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-svh">
      <body className={`${GeistSans.variable} ${GeistMono.variable}`}>
        <PostHogProvider>
          <div className="new-frame" data-theme="dark">
            <script dangerouslySetInnerHTML={{ __html: THEME_BOOT }} />
            <ThemeToggle />
            <div className="new-root">{children}</div>
          </div>
        </PostHogProvider>
        <Analytics />
      </body>
    </html>
  );
}
