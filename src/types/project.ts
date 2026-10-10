export type ProjectCategory = "Android" | "AI-ML" | "Full-Stack" | "Research";
export type ProjectTheme = "mint" | "violet" | "blue";

export interface ProjectImage {
  label: string;
  src?: string;
  width?: number;
  height?: number;
  alt: string;
}

export interface ProjectSection {
  id: string;
  eyebrow: string;
  title: string;
  paragraphs?: string[];
  items?: string[];
  note?: string;
}

export interface ProblemSolving {
  title: string;
  problem: string;
  analysis: string;
  solution: string;
  result: string;
}

export interface Project {
  slug: string;
  name: string;
  subtitle: string;
  description: string;
  categories: ProjectCategory[];
  theme: ProjectTheme;
  technologies: string[];
  github?: string;
  demo?: string;
  document?: string;
  images: ProjectImage[];
  sections: ProjectSection[];
  problems?: ProblemSolving[];
}
