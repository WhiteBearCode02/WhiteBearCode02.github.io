import type { Metadata } from "next";

export const site = {
  url: "https://whitebearcode02.github.io",
  title: "이현준 | Hyunjoon Lee — Software Developer",
  description:
    "Android 애플리케이션, AI/머신러닝, 풀스택 개발을 경험한 개발자 이현준의 포트폴리오입니다. AIRPTCoach, Al2Beat 및 연구 프로젝트를 소개합니다.",
};

export function pageMetadata(
  title: string,
  description: string,
  path: string,
): Metadata {
  return {
    title,
    description,
    alternates: { canonical: `${path}/` },
    openGraph: {
      title: `${title} | 이현준`,
      description,
      url: `${site.url}${path}/`,
      locale: "ko_KR",
      type: "website",
    },
  };
}
