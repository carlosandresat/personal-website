import HomeSection from "@/components/home-section";
import ProjectsSection from "@/components/projects-section";
import TechStackSection from "@/components/tech-stack-section";
import ServicesSection from "@/components/services-section";
import ExperiencesSection from "@/components/experiences-section";

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HomeSection />
      <ServicesSection />
      <ExperiencesSection />
      <ProjectsSection />
      <TechStackSection />
    </main>
  );
}
