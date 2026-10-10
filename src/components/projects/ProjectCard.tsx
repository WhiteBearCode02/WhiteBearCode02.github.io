import Link from "next/link";
import { ArrowUpRight, Code2 } from "lucide-react";
import type { Project } from "@/types/project";
import { ProjectMedia } from "@/components/common/ProjectMedia";
import { ExternalLink } from "@/components/common/ExternalLink";

export function ProjectCard({
  project,
  index,
}: {
  project: Project;
  index: number;
}) {
  return (
    <article className={`project-card theme-${project.theme}`}>
      <Link
        href={`/projects/${project.slug}/`}
        className="project-card-visual"
        aria-label={`${project.name} 상세 보기`}
      >
        <ProjectMedia
          image={project.images[0]}
          theme={project.theme}
          name={project.name}
          compact
        />
      </Link>
      <div className="project-card-body">
        <div className="project-card-meta">
          <span className="mono">{String(index + 1).padStart(2, "0")}</span>
          <span>{project.categories.join(" / ")}</span>
        </div>
        <Link
          href={`/projects/${project.slug}/`}
          className="project-card-title"
        >
          <h3>{project.name}</h3>
          <ArrowUpRight size={22} aria-hidden="true" />
        </Link>
        <p>{project.description}</p>
        <div className="tech-list">
          {project.technologies.slice(0, 5).map((technology) => (
            <span className="tech-badge" key={technology}>
              {technology}
            </span>
          ))}
          {project.technologies.length > 5 ? (
            <span className="tech-badge">
              +{project.technologies.length - 5}
            </span>
          ) : null}
        </div>
        <div className="project-card-links">
          <Link href={`/projects/${project.slug}/`}>
            상세 보기 <ArrowUpRight size={14} aria-hidden="true" />
          </Link>
          {project.github ? (
            <ExternalLink
              href={project.github}
              label={`${project.name} GitHub 저장소`}
            >
              <Code2 size={14} aria-hidden="true" />
              GitHub
            </ExternalLink>
          ) : null}
          {project.demo ? (
            <ExternalLink
              href={project.demo}
              label={`${project.name} 데모 열기`}
            >
              Demo <ArrowUpRight size={14} aria-hidden="true" />
            </ExternalLink>
          ) : null}
        </div>
      </div>
    </article>
  );
}
