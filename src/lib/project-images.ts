import generatedImages from "@/data/project-images.generated.json";
import type { ProjectImage } from "@/types/project";

type ProjectImageId = "airptcoach-home" | "al2beat-learning" | "sumo-poster";
const images: Partial<
  Record<ProjectImageId, Pick<ProjectImage, "src" | "width" | "height">>
> = generatedImages;

/** Uses only build-generated metadata, so filters also work on static hosting. */
export function getProjectImage(
  id: ProjectImageId,
  description: Pick<ProjectImage, "label" | "alt">,
): ProjectImage {
  return { ...description, ...images[id] };
}
