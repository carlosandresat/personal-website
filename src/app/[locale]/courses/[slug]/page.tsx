import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { useTranslations } from "next-intl";
import { use } from "react";
import { CourseDetail } from "@/components/course-detail";
import { JsonLd } from "@/components/json-ld";
import { courses, courseStats, getCourse } from "@/data/courses";
import { locales } from "@/navigation";
import {
  SITE_NAME,
  SITE_URL,
  breadcrumbSchema,
  localeUrl,
  pageMetadata,
} from "@/lib/seo";

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
  return pageMetadata({
    locale,
    path: `/courses/${slug}`,
    title: t(`${course.key}.meta.title`),
    description: t(`${course.key}.meta.description`),
    image: course.ogImage,
  });
}

/** ISO 8601 duration, e.g. 1500 → `PT25H`, 90 → `PT1H30M`. */
const isoDuration = (minutes: number) =>
  `PT${Math.floor(minutes / 60)}H${minutes % 60 ? `${minutes % 60}M` : ""}`;

export default function CoursePage(props: Props) {
  const { locale, slug } = use(props.params);
  setRequestLocale(locale);

  const course = getCourse(slug);
  if (!course) notFound();

  const t = useTranslations("Courses");
  const tn = useTranslations("Navbar");
  const url = localeUrl(locale, `/courses/${slug}`);

  return (
    <>
      <JsonLd
        data={{
          "@graph": [
            {
              "@type": "Course",
              "@id": `${url}#course`,
              name: t(`${course.key}.title`),
              description: t(`${course.key}.meta.description`),
              url,
              image: `${SITE_URL}${course.ogImage}`,
              provider: {
                "@type": "Person",
                "@id": `${SITE_URL}/#person`,
                name: SITE_NAME,
                url: SITE_URL,
              },
              offers: {
                "@type": "Offer",
                category: "Paid",
                price: course.basePrice,
                priceCurrency: "USD",
                url,
              },
              hasCourseInstance: {
                "@type": "CourseInstance",
                courseMode: "online",
                courseWorkload: isoDuration(courseStats(course).totalMinutes),
              },
            },
            breadcrumbSchema([
              { name: tn("home"), url: localeUrl(locale, "") },
              { name: tn("courses"), url: localeUrl(locale, "/courses") },
              { name: t(`${course.key}.title`), url },
            ]),
          ],
        }}
      />
      <CourseDetail course={course} />
    </>
  );
}
