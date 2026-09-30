import manifest from "./course-trailers.json";

export type TrailerSource = { video: string; poster: string };

/** Landscape plays from `md` up; portrait on phones. */
export type CourseTrailerSources = {
  landscape: TrailerSource;
  portrait: TrailerSource;
};

/**
 * Trailer URLs (Vercel Blob) by course slug and locale. The JSON is written
 * by `pnpm upload` in video/ — don't edit it by hand. A course or locale
 * without an entry just renders no trailer section.
 */
const TRAILERS = manifest as Record<string, Record<string, CourseTrailerSources>>;

export function courseTrailer(slug: string, locale: string): CourseTrailerSources | undefined {
  return TRAILERS[slug]?.[locale];
}
