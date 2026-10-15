import type { Metadata } from "next";
import { contracts, projects } from "../_shared/content";
import { ProjectsList } from "../_shared/projects-list";
import { Frame } from "../_shared/frame";
import { Column } from "../_shared/column";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Selected projects — Branded Goods (Saleor, Next.js), air up® (Shopify, Next.js), Talentir. Recurring contracts at AXA Switzerland since 2018.",
};

export default function ProjectsPage() {
  return (
    <Frame>
      <Column title="Projects">
        <ProjectsList projects={projects} />
        {/* Contracts section hidden for now — re-enable when ready:
        <ProjectsList projects={contracts} label="Contracts" /> */}
      </Column>
    </Frame>
  );
}
