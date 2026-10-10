export interface Skill {
  name: string;
  usage: "project" | "learning";
  projects?: string[];
}

export const skillGroups: {
  name: string;
  icon: "code" | "phone" | "brain" | "layout" | "database" | "tools" | "cloud";
  skills: Skill[];
}[] = [
  {
    name: "Programming Languages",
    icon: "code",
    skills: [
      { name: "C", usage: "learning" },
      { name: "C++", usage: "learning" },
      { name: "C#", usage: "learning" },
      { name: "Java", usage: "learning" },
      { name: "Kotlin", usage: "project", projects: ["AIRPTCoach"] },
      { name: "Python", usage: "project", projects: ["AIRPTCoach", "Al2Beat"] },
      { name: "JavaScript", usage: "project", projects: ["Al2Beat"] },
      { name: "TypeScript", usage: "project", projects: ["Al2Beat"] },
    ],
  },
  {
    name: "Android Development",
    icon: "phone",
    skills: ["Android SDK", "Kotlin", "CameraX", "Jetpack Room"].map(
      (name) => ({ name, usage: "project", projects: ["AIRPTCoach"] }),
    ),
  },
  {
    name: "AI / Machine Learning",
    icon: "brain",
    skills: [
      { name: "PyTorch", usage: "learning" },
      ...["YOLO", "MediaPipe", "TensorFlow Lite", "Data Preprocessing"].map(
        (name): Skill => ({ name, usage: "project", projects: ["AIRPTCoach"] }),
      ),
    ],
  },
  {
    name: "Frontend",
    icon: "layout",
    skills: ["React", "HTML5", "CSS3", "JavaScript", "TypeScript"].map(
      (name) => ({ name, usage: "project", projects: ["Al2Beat"] }),
    ),
  },
  {
    name: "Backend & Database",
    icon: "database",
    skills: [
      { name: "Java Spring", usage: "learning" },
      { name: "Supabase", usage: "project", projects: ["AIRPTCoach"] },
      { name: "SQL", usage: "learning" },
    ],
  },
  {
    name: "Development Tools",
    icon: "tools",
    skills: ["Git", "GitHub", "VS Code", "Android Studio", "Google Colab"].map(
      (name) => ({ name, usage: "learning" }),
    ),
  },
  {
    name: "Deployment",
    icon: "cloud",
    skills: [{ name: "Vercel", usage: "project", projects: ["Al2Beat"] }],
  },
];
