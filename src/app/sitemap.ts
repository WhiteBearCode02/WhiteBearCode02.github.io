import type { MetadataRoute } from "next";
import { getProjects } from "@/data/projects";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/projects/",
    "/about/",
    "/experience/",
    "/contact/",
    ...getProjects().map(({ slug }) => `/projects/${slug}/`),
  ].map((path) => ({
    url: `${site.url}${path}`,
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.7,
  }));
}
