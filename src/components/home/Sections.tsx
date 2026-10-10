import Link from "next/link";
import {
  ArrowUpRight,
  Award,
  BrainCircuit,
  Code2,
  Database,
  LayoutTemplate,
  Mail,
  Smartphone,
  Wrench,
  Cloud,
} from "lucide-react";
import { SectionHeading } from "@/components/common/SectionHeading";
import { ProjectCard } from "@/components/projects/ProjectCard";
import { Timeline } from "@/components/common/Timeline";
import { projects } from "@/data/projects";
import { profile } from "@/data/profile";
import { skillGroups } from "@/data/skills";
import { certifications } from "@/data/certifications";

export function FeaturedProjects() {
  return (
    <section className="section container" id="featured">
      <SectionHeading
        eyebrow="01 / SELECTED WORK"
        title="경험을 담은 프로젝트"
        description="모바일, 웹, 연구. 서로 다른 문제를 기술로 풀어낸 기록입니다."
        action={
          <Link className="text-link" href="/projects/">
            전체 프로젝트 <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        }
      />
      <div className="project-grid">
        {projects.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </section>
  );
}

export function AboutPreview() {
  return (
    <section className="section section-surface">
      <div className="container about-preview">
        <div>
          <p className="eyebrow">02 / ABOUT ME</p>
          <h2>
            선택의 이유를 설명하고,
            <br />
            <span className="muted">결과를 검증하는 개발자.</span>
          </h2>
        </div>
        <div>
          <p>
            새로운 기술의 도입보다 중요한 것은 문제에 맞는 선택이라고
            생각합니다. 기술의 장단점을 비교하고, 구현과 검증을 통해 더 나은
            방법을 찾아갑니다.
          </p>
          <p>
            순천향대학교 컴퓨터소프트웨어공학과에서 공부하며 AICS 학부
            연구생으로 AI와 데이터, 시뮬레이션을 탐구하고 있습니다.
          </p>
          <Link href="/about/" className="text-link">
            이현준에 대해 더 알아보기{" "}
            <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

const skillIcons = {
  code: Code2,
  phone: Smartphone,
  brain: BrainCircuit,
  layout: LayoutTemplate,
  database: Database,
  tools: Wrench,
  cloud: Cloud,
};

export function SkillsSection() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="03 / TOOLKIT"
        title="문제 해결에 사용하는 도구들"
        description="프로젝트에 적용한 기술과 학습·실습한 기술을 구분했습니다."
      />
      <div className="skill-legend">
        <span>
          <i className="status-dot" />
          프로젝트 적용
        </span>
        <span>
          <i className="legend-learning" />
          학습·실습
        </span>
      </div>
      <div className="skills-grid">
        {skillGroups.map((group) => {
          const Icon = skillIcons[group.icon];
          return (
            <article className="skill-group" key={group.name}>
              <h3>
                <Icon size={18} aria-hidden="true" />
                {group.name}
              </h3>
              <div className="tech-list">
                {group.skills.map((skill) => (
                  <span
                    key={skill.name}
                    className={`skill-badge ${skill.usage === "project" ? "skill-applied" : ""}`}
                    title={
                      skill.projects
                        ? `프로젝트 적용: ${skill.projects.join(", ")}`
                        : "학습·실습"
                    }
                  >
                    <i aria-hidden="true" />
                    {skill.name}
                    <span className="sr-only">
                      {" "}
                      ·{" "}
                      {skill.usage === "project"
                        ? "프로젝트 적용"
                        : "학습·실습"}
                    </span>
                  </span>
                ))}
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ExperiencePreview() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="04 / EXPERIENCE"
        title="배우고, 탐구하며 넓혀온 경험"
        action={
          <Link href="/experience/" className="text-link">
            활동 자세히 보기 <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        }
      />
      <Timeline />
    </section>
  );
}

export function CertificationsSection() {
  return (
    <section className="section container">
      <SectionHeading
        eyebrow="05 / CERTIFICATIONS"
        title="학습을 이어가는 기록"
      />
      <div className="certification-grid">
        {certifications.map((certification) => (
          <article className="certification-card" key={certification.name}>
            <Award size={21} aria-hidden="true" />
            <span
              className={`status-badge ${certification.obtained ? "status-obtained" : ""}`}
            >
              {certification.status}
            </span>
            <h3>{certification.name}</h3>
            <p>{certification.organization}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ContactCTA() {
  return (
    <section className="section container">
      <div className="contact-cta">
        <div>
          <p className="eyebrow">LET’S BUILD SOMETHING</p>
          <h2>
            함께 문제를 해결하고
            <br />
            성장할 기회를 기다립니다<span className="accent">.</span>
          </h2>
          <p>프로젝트와 개발 경험에 대해 편하게 연락해주세요.</p>
        </div>
        <Link href="/contact/" className="button button-primary">
          <Mail size={18} aria-hidden="true" />
          연락하기 <ArrowUpRight size={17} aria-hidden="true" />
        </Link>
        <span className="cta-decoration" aria-hidden="true">
          ↗
        </span>
      </div>
    </section>
  );
}

export function ContactInformation() {
  return (
    <p>
      Android 애플리케이션, AI/머신러닝, 웹 서비스 개발과 관련된 다양한 기회에
      관심이 있습니다. 프로젝트 및 개발 경험에 대한 문의는{" "}
      <a href={`mailto:${profile.email}`}>이메일</a> 또는 GitHub를 통해
      연락해주세요.
    </p>
  );
}
