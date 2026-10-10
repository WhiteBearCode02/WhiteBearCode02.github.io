import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Navigation } from "./Navigation";
import { MobileMenu } from "./MobileMenu";
import { ExternalLink } from "@/components/common/ExternalLink";
import { ResumeButton } from "@/components/common/ResumeButton";
import { profile } from "@/data/profile";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link href="/" className="brand" aria-label="이현준 홈">
          <span className="brand-mark">
            h<span>.</span>
          </span>
          <span>
            HYUNJOON LEE<small>Developer Portfolio</small>
          </span>
        </Link>
        <nav className="desktop-navigation" aria-label="주 메뉴">
          <Navigation />
        </nav>
        <div className="header-actions">
          <ExternalLink href={profile.github} className="github-header">
            GitHub <ArrowUpRight size={15} aria-hidden="true" />
          </ExternalLink>
          <ResumeButton compact />
        </div>
        <MobileMenu resume={<ResumeButton compact />} />
      </div>
    </header>
  );
}
