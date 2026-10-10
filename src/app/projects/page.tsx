import { PageHeading } from "@/components/common/SectionHeading";
import { ProjectGrid } from "@/components/projects/ProjectGrid";
import { ContactCTA } from "@/components/home/Sections";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Projects",
  "AIRPTCoach, Al2Beat, SUMO 연구 프로젝트의 구현 과정과 문제 해결 경험을 소개합니다.",
  "/projects",
);

export default function ProjectsPage() {
  return (
    <>
      <section className="container page-section">
        <PageHeading
          eyebrow="PROJECTS / SELECTED WORK"
          title="Projects"
          description="문제를 정의하고, 기술을 선택하고, 구현으로 연결한 경험입니다."
        />
        <ProjectGrid />
      </section>
      <ContactCTA />
    </>
  );
}
