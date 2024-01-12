import Header from "@/components/header";
import HomeSection from "@/components/home-section";
import ProjectsSection from "@/components/projects-section";
import TechStackSection from "@/components/tech-stack-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <HomeSection />
        <ProjectsSection />
        <TechStackSection />
      </main>
      <Footer />
    </>
  );
}
