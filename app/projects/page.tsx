import type { Metadata } from "next";
import { allWork } from "../_shared/content";
import { pageMeta } from "../_shared/seo";
import { ProjectsList } from "../_shared/projects-list";
import { Column } from "../_shared/column";

export const metadata: Metadata = pageMeta({
  title: "Work: Next.js, Shopify & Saleor projects",
  description:
    "Selected work: Branded Goods on Saleor, air up® on Shopify, Talentir's product and AXA's SME calculator. Role, work and stack for each case.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Column title="Work">
      {/* one list, so four cases can form a 2x2 grid on a wide screen:
          the projects first, then the AXA contracts */}
      <ProjectsList projects={allWork} />
    </Column>
  );
}
