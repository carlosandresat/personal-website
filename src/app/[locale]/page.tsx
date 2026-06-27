import HomeSection from "@/components/home-section";
import ProjectsSection from "@/components/projects-section";
import TechStackSection from "@/components/tech-stack-section";
import ServicesSection from "@/components/services-section";
import ExperiencesSection from "@/components/experiences-section";
import { setRequestLocale } from "next-intl/server";
import { use } from "react";

export default function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = use(props.params);
  setRequestLocale(locale);

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
