import HomeSection from "@/components/home-section";
import ProjectsSection from "@/components/projects-section";
import TechStackSection from "@/components/tech-stack-section";
import ServicesSection from "@/components/services-section";
import ExperiencesSection from "@/components/experiences-section";
import EducationSection from "@/components/education-section";
import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { JsonLd } from "@/components/json-ld";
import {
  SITE_NAME,
  SITE_URL,
  localeUrl,
  pageMetadata,
  personSchema,
} from "@/lib/seo";

export async function generateMetadata(props: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "HomePage.meta" });
  return pageMetadata({
    locale,
    path: "",
    title: t("title"),
    description: t("description"),
  });
}

export default function HomePage(props: { params: Promise<{ locale: string }> }) {
  const { locale } = use(props.params);
  setRequestLocale(locale);

  const t = useTranslations("HomePage");

  return (
    <main className="flex min-h-screen flex-col items-center">
      <JsonLd
        data={{
          "@graph": [
            personSchema(t("kicker")),
            {
              "@type": "WebSite",
              "@id": `${SITE_URL}/#website`,
              name: SITE_NAME,
              url: localeUrl(locale, ""),
              inLanguage: locale,
              author: { "@id": `${SITE_URL}/#person` },
            },
          ],
        }}
      />
      <HomeSection />
      <ServicesSection />
      <ExperiencesSection />
      <EducationSection />
      <ProjectsSection />
      <TechStackSection />
    </main>
  );
}
