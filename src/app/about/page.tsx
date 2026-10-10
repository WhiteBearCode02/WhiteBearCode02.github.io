import { ArrowUpRight, GraduationCap, Microscope } from "lucide-react";
import { PageHeading } from "@/components/common/SectionHeading";
import { CertificationsSection, ContactCTA } from "@/components/home/Sections";
import { ExternalLink } from "@/components/common/ExternalLink";
import { ResumeButton } from "@/components/common/ResumeButton";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "About",
  "개발자 이현준의 자기소개, 학력과 개발에 대한 생각을 소개합니다.",
  "/about",
);

export default function AboutPage() {
  return (
    <>
      <section className="container page-section">
        <PageHeading
          eyebrow="ABOUT / HYUNJOON LEE"
          title="About me"
          description="기술의 선택에 근거를 더하고, 구현으로 문제를 해결합니다."
        />
        <div className="about-layout">
          <aside className="profile-card">
            <div className="profile-monogram" aria-label="이현준 이니셜">
              HL<span>.</span>
            </div>
            <h2>{profile.name}</h2>
            <p className="mono">{profile.englishName}</p>
            <div className="profile-roles">
              {profile.roles.map((role) => (
                <span key={role}>{role}</span>
              ))}
            </div>
            <ExternalLink href={profile.github} className="text-link">
              GitHub 방문 <ArrowUpRight size={16} aria-hidden="true" />
            </ExternalLink>
            <ResumeButton />
          </aside>
          <div className="about-content">
            <p className="eyebrow">INTRODUCTION</p>
            <h2>문제의 원인을 이해하는 것부터.</h2>
            {profile.bio.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
            <div className="education-grid">
              <article>
                <GraduationCap size={23} aria-hidden="true" />
                <p className="eyebrow">EDUCATION</p>
                <h3>{profile.university}</h3>
                <p>{profile.major}</p>
                <p className="muted">{profile.graduation}</p>
              </article>
              <article>
                <Microscope size={23} aria-hidden="true" />
                <p className="eyebrow">RESEARCH</p>
                <h3>AICS 학부 연구생</h3>
                <p>AI · 데이터 · 시뮬레이션</p>
                <p className="muted">2025.03 — 현재</p>
              </article>
            </div>
          </div>
        </div>
      </section>
      <CertificationsSection />
      <ContactCTA />
    </>
  );
}
