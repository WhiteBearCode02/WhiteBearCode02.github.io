import Link from "next/link";
import { ArrowDown, ArrowUpRight, Braces, Cpu, Smartphone } from "lucide-react";
import { profile } from "@/data/profile";
import { ExternalLink } from "@/components/common/ExternalLink";
import { ResumeButton } from "@/components/common/ResumeButton";

function DeveloperVisual() {
  return (
    <div
      className="developer-visual"
      aria-label="코드, 데이터, 모바일 개발을 연결하는 추상 그래픽"
    >
      <div className="visual-grid" />
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="visual-core">
        <span className="visual-core-mark">
          h<span>.</span>
        </span>
        <span className="mono">THINK → BUILD</span>
      </div>
      <div className="orbit-node node-code">
        <Braces size={24} strokeWidth={1.5} aria-hidden="true" />
        <span>CODE</span>
      </div>
      <div className="orbit-node node-ai">
        <Cpu size={24} strokeWidth={1.5} aria-hidden="true" />
        <span>AI & DATA</span>
      </div>
      <div className="orbit-node node-mobile">
        <Smartphone size={24} strokeWidth={1.5} aria-hidden="true" />
        <span>ANDROID</span>
      </div>
      <p className="visual-caption">
        <span className="status-dot" />
        Ideas into working software.
      </p>
      <span className="visual-corner">CONCEPT / DEVELOPMENT</span>
    </div>
  );
}

export function Hero() {
  return (
    <section className="hero container">
      <div className="hero-content">
        <p className="eyebrow">
          <span className="status-dot" />
          HYUNJOON LEE · DEVELOPER PORTFOLIO
        </p>
        <h1 className="hero-title">
          SOFTWARE
          <br />
          <span>DEVELOPER</span>
          <i>.</i>
        </h1>
        <h2>
          기술의 선택에 근거를 더하고,
          <br />
          구현으로 문제를 해결하는 개발자
        </h2>
        <p className="hero-description">{profile.introduction}</p>
        <div className="hero-roles">
          {profile.roles.map((role) => (
            <span key={role}>{role}</span>
          ))}
        </div>
        <div className="hero-actions">
          <Link href="/projects/" className="button button-primary">
            프로젝트 보기 <ArrowUpRight size={17} aria-hidden="true" />
          </Link>
          <ExternalLink
            href={profile.github}
            className="button button-secondary"
          >
            GitHub 방문 <ArrowUpRight size={17} aria-hidden="true" />
          </ExternalLink>
          <ResumeButton />
        </div>
      </div>
      <DeveloperVisual />
      <a href="#featured" className="scroll-link">
        <ArrowDown size={15} aria-hidden="true" />
        EXPLORE MY WORK
      </a>
    </section>
  );
}
