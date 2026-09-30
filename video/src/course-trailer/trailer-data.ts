import { courses } from "../../../src/data/courses";
import { courseCopy, coursesMessages, numbered, type Locale } from "../i18n";
import type { PixelAnimationId } from "../pixel/animations";
import { TRAILER_EXTRAS, TRAILER_LABELS, type CodeDemo, type TrailerLabels } from "./trailer-copy";

/** A line of copy and the stage animation that illustrates it. */
export type StagedItem = { text: string; animation: PixelAnimationId };

export type TrailerData = {
  track: string;
  title: string;
  meta: string[];
  enrolling: string;
  code: CodeDemo;
  motivations: {
    central: StagedItem;
    pages: { label: string; items: StagedItem[] }[];
  };
  outcomes: StagedItem[];
  labels: TrailerLabels;
  /** Path under the site's public/, for staticFile(); null draws the pixel mascot. */
  image: string | null;
  url: string;
};

function stage(texts: string[], animations: PixelAnimationId[], what: string): StagedItem[] {
  if (texts.length !== animations.length) {
    throw new Error(`${what}: ${texts.length} texts but ${animations.length} animations`);
  }
  return texts.map((text, i) => ({ text, animation: animations[i] }));
}

/**
 * Everything a trailer shows, resolved from the same registry and message
 * files that render the course page.
 */
export function resolveTrailerData(courseKey: string, locale: Locale): TrailerData {
  const course = courses.find((c) => c.key === courseKey);
  if (!course) throw new Error(`No course "${courseKey}" in src/data/courses.ts`);

  const extras = TRAILER_EXTRAS[courseKey];
  const code = extras?.code[locale];
  if (!extras || !code) throw new Error(`No trailer extras for ${courseKey}/${locale}`);

  const shared = coursesMessages(locale);
  const copy = courseCopy(locale, courseKey);
  const labels = { ...TRAILER_LABELS[locale], ...extras.labels?.[locale] };
  const motivations = copy.motivations;
  if (!motivations) throw new Error(`No Courses.${courseKey}.motivations in messages/${locale}.json`);
  const animations = extras.motivationAnimations;

  return {
    track: shared.track[course.track],
    title: copy.title,
    meta: [copy.difficulty, shared.online, shared.certificate],
    enrolling: shared.enrolling,
    code,
    motivations: {
      central: { text: motivations.central, animation: animations.central },
      pages: [
        {
          label: labels.learningLabel,
          items: stage(numbered(motivations.learning), animations.learning, "motivations.learning"),
        },
        {
          label: labels.courseLabel,
          items: stage(numbered(motivations.course), animations.course, "motivations.course"),
        },
      ],
    },
    outcomes: stage(numbered(copy.outcomes), extras.outcomeAnimations, "outcomes"),
    labels,
    image: extras.artwork === "mascot" ? null : course.image.replace(/^\//, ""),
    // Unprefixed on purpose: the site's middleware adds the viewer's locale.
    url: `carlosarevalo.dev/courses/${course.slug}`,
  };
}
