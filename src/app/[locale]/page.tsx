import {useTranslations} from 'next-intl';
import Header from "@/components/header";
import HomeSection from "@/components/home-section";
import ProjectsSection from "@/components/projects-section";
import TechStackSection from "@/components/tech-stack-section";
import ServicesSection from "@/components/services-section";
import Footer from "@/components/footer";
 
export default function HomePage() {
  const t = useTranslations('HomePage');
  return (
    <>
      <Header />
      <main className="flex min-h-screen flex-col items-center">
        <HomeSection />
        <ProjectsSection />
        <TechStackSection />
        <ServicesSection />
      </main>
      <Footer />
    </>
  );
}

