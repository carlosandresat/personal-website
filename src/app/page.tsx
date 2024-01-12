import Header from "@/components/header";
import HomeSection from "@/components/home-section";
import ProjectsSection from "@/components/projects-section";
import TechStackSection from "@/components/tech-stack-section";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center justify-between pt-16 pb-6">
        <HomeSection />
        <ProjectsSection />
        <TechStackSection />
      </main>
    </>
  );
}
