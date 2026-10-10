import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FileText } from "lucide-react";
import type { Project, ProjectSection } from "@/types/project";
import { ProjectMedia } from "@/components/common/ProjectMedia";
import { ExternalLink } from "@/components/common/ExternalLink";

function DetailSection({ section }: { section: ProjectSection }) {
  return (
    <section className="detail-section" id={section.id}>
      <p className="eyebrow">{section.eyebrow}</p>
      <h2>{section.title}</h2>
      {section.paragraphs?.map((paragraph) => (
        <p key={paragraph}>{paragraph}</p>
      ))}
      {section.items ? (
        <ul className="detail-list">
          {section.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      ) : null}
      {section.note ? <p className="content-note">{section.note}</p> : null}
    </section>
  );
}

function ProblemSolvingSection({ project }: { project: Project }) {
  return (
    <section className="detail-section" id="problem-solving">
      <p className="eyebrow">PROBLEM SOLVING</p>
      <h2>문제를 분석하고, 개선한 과정</h2>
      <div className="problem-cases">
        {project.problems?.map((problem, index) => (
          <article className="problem-case" key={problem.title}>
            <h3>
              <span className="mono">{String(index + 1).padStart(2, "0")}</span>
              {problem.title}
            </h3>
            <dl>
              {(["problem", "analysis", "solution", "result"] as const).map(
                (key) => (
                  <div key={key}>
                    <dt>{key.toUpperCase()}</dt>
                    <dd>{problem[key]}</dd>
                  </div>
                ),
              )}
            </dl>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProjectDetail({ project }: { project: Project }) {
  const sections: { id: string; title: string }[] = project.sections.map(
    ({ id, eyebrow }) => ({ id, title: eyebrow }),
  );
  if (project.problems?.length)
    sections.splice(4, 0, { id: "problem-solving", title: "PROBLEM SOLVING" });
  return (
    <div className={`container project-detail theme-${project.theme}`}>
      <Link href="/projects/" className="back-link">
        <ArrowLeft size={16} aria-hidden="true" />
        프로젝트 목록
      </Link>
      <header className="project-detail-heading">
        <p className="eyebrow">{project.categories.join(" / ")}</p>
        <h1>
          {project.name}
          <span className="accent">.</span>
        </h1>
        <p className="project-subtitle">{project.subtitle}</p>
        <p>{project.description}</p>
        <div className="tech-list">
          {project.technologies.map((technology) => (
            <span className="tech-badge" key={technology}>
              {technology}
            </span>
          ))}
        </div>
      </header>
      <ProjectMedia
        image={project.images[0]}
        theme={project.theme}
        name={project.name}
      />
      <div className="detail-layout">
        <aside className="detail-sidebar">
          <nav aria-label="프로젝트 상세 목차">
            <p className="eyebrow">ON THIS PAGE</p>
            {sections.map((section) => (
              <a href={`#${section.id}`} key={section.id}>
                {section.title}
              </a>
            ))}
            <a href="#gallery">GALLERY</a>
            <a href="#links">LINKS</a>
          </nav>
        </aside>
        <div className="detail-content">
          {project.sections.map((section) => (
            <div key={section.id}>
              <DetailSection section={section} />
              {section.id === "architecture" && project.problems?.length ? (
                <ProblemSolvingSection project={project} />
              ) : null}
            </div>
          ))}
          <section className="detail-section" id="gallery">
            <p className="eyebrow">GALLERY</p>
            <h2>프로젝트 화면과 자료</h2>
            <p>
              {project.images.some((image) => image.src)
                ? "프로젝트의 실제 화면과 자료입니다. 원본 이미지를 열어 자세히 확인할 수 있습니다."
                : "실제 화면과 자료를 추가할 예정입니다."}
            </p>
            <div className="gallery-grid">
              {project.images.map((image) => (
                <figure key={image.label}>
                  <ProjectMedia
                    image={image}
                    theme={project.theme}
                    name={project.name}
                  />
                  <figcaption>{image.label}</figcaption>
                  {image.src ? (
                    <a
                      href={image.src}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="image-original-link"
                      aria-label={`${image.label} 원본 이미지 보기`}
                    >
                      원본 이미지 보기{" "}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ) : null}
                </figure>
              ))}
            </div>
          </section>
          <section className="detail-section" id="links">
            <p className="eyebrow">LINKS</p>
            <h2>프로젝트 더 살펴보기</h2>
            <div className="hero-actions">
              {project.github ? (
                <ExternalLink
                  href={project.github}
                  className="button button-secondary"
                >
                  GitHub 저장소 <ArrowUpRight size={16} aria-hidden="true" />
                </ExternalLink>
              ) : null}
              {project.demo ? (
                <ExternalLink
                  href={project.demo}
                  className="button button-primary"
                >
                  Live Demo <ArrowUpRight size={16} aria-hidden="true" />
                </ExternalLink>
              ) : null}
              {project.document ? (
                <a
                  className="button button-secondary"
                  href={project.document}
                  download
                >
                  <FileText size={16} aria-hidden="true" />
                  연구 PDF 다운로드
                </a>
              ) : null}
              {!project.github && !project.demo && !project.document ? (
                <p className="muted">
                  {project.images.some((image) => image.src)
                    ? "연구 자료는 위 갤러리에서 확인할 수 있습니다. 논문 PDF는 추후 공개할 예정입니다."
                    : "연구 자료와 논문 PDF는 추후 공개할 예정입니다."}
                </p>
              ) : null}
            </div>
            <Link href="/projects/" className="back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              다른 프로젝트 보기
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
