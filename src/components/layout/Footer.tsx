import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import { ExternalLink } from "@/components/common/ExternalLink";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <Link href="/" className="footer-name">
            HYUNJOON LEE<span className="accent">.</span>
          </Link>
          <p>기술을 이해하고, 문제를 해결합니다.</p>
        </div>
        <div className="footer-links">
          <a href={`mailto:${profile.email}`}>
            Email <ArrowUpRight size={14} aria-hidden="true" />
          </a>
          <ExternalLink href={profile.github}>
            GitHub <ArrowUpRight size={14} aria-hidden="true" />
          </ExternalLink>
        </div>
        <p className="footer-note">이현준 · Developer Portfolio</p>
      </div>
    </footer>
  );
}
