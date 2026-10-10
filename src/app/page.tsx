import { Hero } from "@/components/home/Hero";
import {
  AboutPreview,
  CertificationsSection,
  ContactCTA,
  ExperiencePreview,
  FeaturedProjects,
  SkillsSection,
} from "@/components/home/Sections";

export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedProjects />
      <AboutPreview />
      <SkillsSection />
      <ExperiencePreview />
      <CertificationsSection />
      <ContactCTA />
    </>
  );
}
