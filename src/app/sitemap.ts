import type { MetadataRoute } from "next";
import { courses } from "@/data/courses";
import { exploraTopics } from "@/data/explora";
import { locales } from "@/navigation";
import { SITE_URL, languageAlternates, localeUrl } from "@/lib/seo";

// Students are left out while they are noindex (placeholder data), and so
// are the /links hubs.
const PATHS = [
  "",
  "/courses",
  "/development",
  ...courses.map((course) => `/courses/${course.slug}`),
];

/** Spanish-only content: the English pages exist but are noindex. */
const SPANISH_PATHS = ["/explora", ...exploraTopics.map((topic) => `/explora/${topic.slug}`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const spanish = SPANISH_PATHS.map((path) => ({
    url: localeUrl("es", path),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));
  return [...spanish, ...PATHS.flatMap((path) => {
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
  })];
}
