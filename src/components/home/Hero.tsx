import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ExternalLink } from "@/components/common/ExternalLink";
import { ResumeButton } from "@/components/common/ResumeButton";
import { DeveloperVisual } from "./DeveloperVisual";

export function Hero() {
  return (
    <section className="hero container">
      <div className="hero-top">
        <div className="hero-introduction">
          <p className="eyebrow">HYUNJOON LEE · DEVELOPER PORTFOLIO</p>
          <p className="hero-greeting">
            안녕하세요,
            <br />
            이현준입니다<span className="accent">.</span>
          </p>
          <p className="hero-tagline">{profile.tagline}</p>
          <p className="hero-description">{profile.introduction}</p>
          <div className="hero-actions">
            <Link href="/projects/" className="button button-primary">
              프로젝트 보기 <ArrowUpRight size={17} aria-hidden="true" />
            </Link>
            <ExternalLink
              href={profile.github}
              className="button button-secondary"
            >
              GitHub <ArrowUpRight size={17} aria-hidden="true" />
            </ExternalLink>
            <ResumeButton />
          </div>
        </div>
        <div className="hero-heading">
          <h1 className="hero-title" lang="en">
            <span>SOFTWARE</span>
            <span>
              DEVELOPER<span className="hero-period">.</span>
            </span>
          </h1>
          <div className="hero-roles">
            {profile.roles.map((role) => (
              <span key={role}>{role}</span>
            ))}
          </div>
        </div>
      </div>
      <DeveloperVisual />
      <div className="hero-bottom">
        <span className="mono">IDEAS INTO WORKING SOFTWARE</span>
        <a href="#featured" className="scroll-link">
          EXPLORE MY WORK <ArrowDown size={15} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
