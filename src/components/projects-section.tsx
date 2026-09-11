import { useTranslations } from "next-intl";

import { pad2 } from "@/components/design/ledger-divider";
import { SectionHeader } from "@/components/design/section-header";
import { SectionShell } from "@/components/design/section-shell";
import ProjectCard from "@/components/project-card";
import EdfBody from "@/components/projects/edf-body";
import KidneyAppBody from "@/components/projects/kidneyapp-body";
import OrientaYTBody from "@/components/projects/orientayt-body";
import TinderYTBody from "@/components/projects/tinderyt-body";
import TutoUBody from "@/components/projects/tutou-body";
import { PROJECTS, type ProjectId } from "@/data/projects";

/**
 * Each project's write-up keeps its own component: the five message subtrees
 * have genuinely different shapes, so a single generic body would mean
 * migrating all five to a block model in both locale files.
 */
const BODIES: Record<ProjectId, () => React.JSX.Element> = {
  tinderyt: TinderYTBody,
  edf: EdfBody,
  tutou: TutoUBody,
  orientayt: OrientaYTBody,
  kidneyapp: KidneyAppBody,
};

export default function ProjectsSection() {
  const t = useTranslations("Projects");

  return (
    <SectionShell id="projects">
      <SectionHeader
        eyebrow={t("eyebrow")}
        title={t("title")}
        meta={pad2(PROJECTS.length)}
      />

      <div className="grid w-full gap-6 md:grid-cols-2 lg:grid-cols-3">
        {PROJECTS.map((project) => {
          const Body = BODIES[project.id];
          return (
            <ProjectCard key={project.id} project={project}>
              <Body />
            </ProjectCard>
          );
        })}
      </div>
    </SectionShell>
  );
}
