import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { use } from "react";
import { CourseDetail } from "@/components/course-detail";
import { courses, getCourse } from "@/data/courses";
import { locales } from "@/navigation";

type Props = {
  params: Promise<{ locale: string; slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.flatMap((locale) =>
    courses.map((course) => ({ locale, slug: course.slug }))
  );
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const { locale, slug } = await props.params;
  const course = getCourse(slug);
  if (!course) return {};

  const t = await getTranslations({ locale, namespace: "Courses" });
  const title = t(`${course.key}.meta.title`);
  return {
    title,
    description: t(`${course.key}.meta.description`),
    openGraph: {
      images: [{ url: course.ogImage, width: 1200, height: 630, alt: title }],
    },
  };
}

export default function CoursePage(props: Props) {
  const { locale, slug } = use(props.params);
  setRequestLocale(locale);

  const course = getCourse(slug);
  if (!course) notFound();

  return <CourseDetail course={course} />;
}
