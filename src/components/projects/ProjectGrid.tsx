"use client";

import { useState } from "react";
import { getProjects, projectCategories } from "@/data/projects";
import type { ProjectCategory } from "@/types/project";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid() {
  const [category, setCategory] = useState<"All" | ProjectCategory>("All");
  const visible = getProjects(category);
  return (
    <>
      <div
        className="project-filter"
        role="group"
        aria-label="프로젝트 분야 필터"
      >
        {projectCategories.map((item) => (
          <button
            type="button"
            key={item}
            aria-pressed={category === item}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="project-count" aria-live="polite">
        {visible.length}개의 프로젝트
      </p>
      <div className="project-grid">
        {visible.map((project, index) => (
          <ProjectCard key={project.slug} project={project} index={index} />
        ))}
      </div>
    </>
  );
}
