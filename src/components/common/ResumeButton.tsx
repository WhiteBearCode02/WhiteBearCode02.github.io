import { Download } from "lucide-react";
import { getResumePath } from "@/lib/resume";

export function ResumeButton({ compact = false }: { compact?: boolean }) {
  const href = getResumePath();
  if (!href) return null;
  return (
    <a className="button button-secondary" href={href} download>
      <Download size={16} aria-hidden="true" />
      {compact ? "Resume" : "이력서 다운로드"}
    </a>
  );
}
