import type { Metadata } from "next";
import { allWork } from "../_shared/content";
import { pageMeta } from "../_shared/seo";
import { ProjectsList } from "../_shared/projects-list";
import { Column } from "../_shared/column";

export const metadata: Metadata = pageMeta({
  title: "Projects: Next.js, Shopify & Saleor work",
  description:
    "My work: Branded Goods on Saleor, air up® on Shopify and Talentir's product UI, all on Next.js. What I did, my role and the stack.",
  path: "/projects",
});

export default function ProjectsPage() {
  return (
    <Column title="Projects">
      {/* one list, so four cases can form a 2x2 grid on a wide screen:
          the projects first, then the AXA contracts */}
      <ProjectsList projects={allWork} />
    </Column>
  );
}
