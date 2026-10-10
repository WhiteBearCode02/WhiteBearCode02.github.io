import Image from "next/image";
import { Activity, Braces, Network, ImageIcon } from "lucide-react";
import type { ProjectImage, ProjectTheme } from "@/types/project";

const icons = { mint: Activity, violet: Braces, blue: Network };

export function ProjectMedia({
  image,
  theme,
  name,
  compact = false,
}: {
  image: ProjectImage;
  theme: ProjectTheme;
  name: string;
  compact?: boolean;
}) {
  const Icon = icons[theme];
  return (
    <div
      className={`project-media theme-${theme} ${compact ? "media-compact" : ""} ${image.src ? `media-real ${compact ? "" : "media-expanded"}` : ""}`}
    >
      {image.src ? (
        compact ? (
          <Image
            src={image.src}
            alt={image.alt}
            fill
            sizes="(max-width: 700px) 100vw, 50vw"
            className="project-image"
          />
        ) : (
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width ?? 1600}
            height={image.height ?? 900}
            sizes="(max-width: 700px) 100vw, 80vw"
            className="project-image"
          />
        )
      ) : (
        <>
          <div className="media-grid" aria-hidden="true" />
          <div className="media-composition" aria-hidden="true">
            <span />
            <span />
          </div>
          <div className="media-symbol" aria-hidden="true">
            <Icon strokeWidth={1.3} />
          </div>
          <span className="media-wordmark" lang="en" aria-hidden="true">
            {name}
          </span>
          <div className="media-label">
            <span>{name}</span>
            <span>
              <ImageIcon size={12} aria-hidden="true" />
              {compact ? "화면" : image.label} · 이미지 준비 중
            </span>
          </div>
        </>
      )}
    </div>
  );
}
