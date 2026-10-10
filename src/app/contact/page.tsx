import { ArrowUpRight, Code2, Mail } from "lucide-react";
import { PageHeading } from "@/components/common/SectionHeading";
import { ContactInformation } from "@/components/home/Sections";
import { ExternalLink } from "@/components/common/ExternalLink";
import { ResumeButton } from "@/components/common/ResumeButton";
import { profile } from "@/data/profile";
import { pageMetadata } from "@/lib/site";

export const metadata = pageMetadata(
  "Contact",
  "개발자 이현준에게 이메일과 GitHub로 연락할 수 있습니다.",
  "/contact",
);

export default function ContactPage() {
  return (
    <section className="container page-section contact-page">
      <PageHeading
        eyebrow="CONTACT / LET’S TALK"
        title="Let’s connect"
        description="함께 문제를 해결하고 성장할 기회를 기다립니다."
      />
      <div className="contact-layout">
        <div>
          <ContactInformation />
          <div className="hero-actions">
            <a
              href={`mailto:${profile.email}`}
              className="button button-primary"
            >
              <Mail size={17} aria-hidden="true" />
              이메일 보내기 <ArrowUpRight size={17} aria-hidden="true" />
            </a>
            <ResumeButton />
          </div>
        </div>
        <div className="contact-cards">
          <a className="contact-card" href={`mailto:${profile.email}`}>
            <Mail size={23} aria-hidden="true" />
            <div>
              <span className="eyebrow">EMAIL</span>
              <strong>{profile.email}</strong>
            </div>
            <ArrowUpRight size={20} aria-hidden="true" />
          </a>
          <ExternalLink href={profile.github} className="contact-card">
            <Code2 size={23} aria-hidden="true" />
            <div>
              <span className="eyebrow">GITHUB</span>
              <strong>WhiteBearCode02</strong>
            </div>
            <ArrowUpRight size={20} aria-hidden="true" />
          </ExternalLink>
        </div>
      </div>
    </section>
  );
}
