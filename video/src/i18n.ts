import en from "../../messages/en.json";
import es from "../../messages/es.json";

/**
 * The site's own message files. Course copy (title, objectives, outcomes,
 * track labels) is read from here so a trailer never drifts from its page.
 */
export const MESSAGES = { en, es };

export type Locale = keyof typeof MESSAGES;

type CoursesMessages = (typeof es)["Courses"];

export type CourseCopy = {
  title: string;
  difficulty: string;
  outcomes?: Record<string, string>;
  /** Trailer-only for now; the course page doesn't render these. */
  motivations?: {
    central: string;
    learning: Record<string, string>;
    course: Record<string, string>;
  };
};

export function coursesMessages(locale: Locale): CoursesMessages {
  return MESSAGES[locale].Courses;
}

export function courseCopy(locale: Locale, key: string): CourseCopy {
  const course = (coursesMessages(locale) as unknown as Record<string, unknown>)[key];
  if (!course) throw new Error(`No Courses.${key} in messages/${locale}.json`);
  return course as CourseCopy;
}

/** Numbered message maps ({"1": …, "2": …}) in order. */
export function numbered(map: Record<string, string> | undefined): string[] {
  if (!map) return [];
  return Object.keys(map)
    .sort((a, b) => Number(a) - Number(b))
    .map((k) => map[k]);
}

/** The /development page's copy, which the process explainer reads. */
export function developmentMessages(locale: Locale) {
  return MESSAGES[locale].Development;
}
