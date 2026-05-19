import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./new.css";
import { ThemeToggle } from "./theme-toggle";

export const metadata: Metadata = {
  title: "i2089 // Agentic. Coding. Engineering.",
  description:
    "i2089 — the independent engineering practice of Marc Illien. Agentic systems, production code, and engineering workflows.",
};

export default function NewLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`new-frame ${GeistSans.variable} ${GeistMono.variable}`}
      data-theme="dark"
    >
      <ThemeToggle />
      <div className="new-root">{children}</div>
    </div>
  );
}
