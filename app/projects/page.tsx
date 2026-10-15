import type { Metadata } from "next";
import { contracts, projects } from "../_shared/content";
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
      <ProjectsList projects={projects} />
      {/* Contracts section hidden for now — re-enable when ready:
        <ProjectsList projects={contracts} label="Contracts" /> */}
    </Column>
  );
}
