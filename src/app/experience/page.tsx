import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { PageHeading } from "@/components/common/SectionHeading";
import { Timeline } from "@/components/common/Timeline";
import { ContactCTA } from "@/components/home/Sections";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Experience",
  "AICS 학부 연구와 Java Spring & React 풀스택 개발 교육 활동을 소개합니다.",
  "/experience",
);

export default function ExperiencePage() {
  return (
    <>
      <section className="container page-section">
        <PageHeading
          eyebrow="EXPERIENCE / RESEARCH & LEARNING"
          title="Experience"
          description="연구와 교육을 통해 개발의 시야를 넓혀가고 있습니다."
        />
        <Timeline detailed />
        <div className="research-callout">
          <p className="eyebrow">RESEARCH HIGHLIGHT</p>
          <h2>SUMO 기반 도시 교통 시뮬레이션 연구</h2>
          <p>
            신규 도로 개설이 차량 흐름에 미치는 영향을 분석하기 위한 시스템
            설계와 학술 발표 경험입니다.
          </p>
          <Link href="/projects/sumo-research/" className="text-link">
            연구 자세히 보기 <ArrowUpRight size={16} aria-hidden="true" />
          </Link>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
