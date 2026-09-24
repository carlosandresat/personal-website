import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { locales } from "@/navigation";
import { SITE_URL, languageAlternates, localeUrl } from "@/lib/seo";

// Students are left out while they are noindex (placeholder data).
const PATHS = [
  "",
  "/courses",
  "/development",
  ...courses.map((course) => `/courses/${course.slug}`),
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PATHS.flatMap((path) => {
    const languages = Object.fromEntries(
      Object.entries(languageAlternates(path)).map(([lang, href]) => [
        lang,
        `${SITE_URL}${href}`,
      ])
    );
    return locales.map((locale) => ({
      url: localeUrl(locale, path),
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
      alternates: { languages },
    }));
  });
}
