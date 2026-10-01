import { clipFrames, type ShotId } from "./pacing.ts";

export type RecordFormat = "landscape" | "portrait";

/** Pages with a trailer, by their slug in src/data/course-trailers.json. */
export type EmbedSlug = "front-end-html-css-js" | "development";

/**
 * A scroll keyframe: [frame, target]. The target is a scrollY in CSS pixels,
 * or "video" to center the page's visible <video> in the viewport.
 */
export type ScrollKey = [number, number | "video"];

export type Shot = {
  id: ShotId;
  /** Path on the site, locale included. */
  path: string;
  frames: number;
  scroll: Record<RecordFormat, ScrollKey[]>;
  /** The trailer the page's <video> plays, drawn over it in the composition. */
  embed?: EmbedSlug;
};

/**
 * What scripts/record-site.mts films for the site tour. Scrolls ease between
 * keyframes; the last keyframe holds.
 */
export const SHOTS: Shot[] = [
  {
    id: "hero",
    path: "/es",
    frames: clipFrames("hero"),
    // A slow drift: on a phone the hero is tall, so it travels further,
    // from the name down to the photo.
    scroll: { landscape: [[0, 0], [clipFrames("hero"), 90]], portrait: [[0, 0], [clipFrames("hero"), 300]] },
  },
  {
    id: "catalog",
    path: "/es/courses",
    frames: clipFrames("catalog"),
    scroll: { landscape: [[0, 120], [clipFrames("catalog"), 560]], portrait: [[0, 180], [clipFrames("catalog"), 900]] },
  },
  {
    id: "course",
    path: "/es/courses/front-end-html-css-js",
    frames: clipFrames("course"),
    embed: "front-end-html-css-js",
    scroll: { landscape: [[0, 0], [clipFrames("course") - 10, "video"]], portrait: [[0, 120], [clipFrames("course"), 500]] },
  },
  {
    id: "development",
    path: "/es/development",
    frames: clipFrames("development"),
    embed: "development",
    scroll: { landscape: [[0, 0], [clipFrames("development") - 20, "video"]], portrait: [[0, 60], [clipFrames("development") - 20, "video"]] },
  },
];

/** Viewports the site is filmed at, sized to stay sharp inside the frames. */
export const RECORD_VIEWPORTS: Record<
  RecordFormat,
  { width: number; height: number; deviceScaleFactor: number; isMobile: boolean; hasTouch: boolean }
> = {
  landscape: { width: 1440, height: 810, deviceScaleFactor: 1, isMobile: false, hasTouch: false },
  portrait: { width: 390, height: 844, deviceScaleFactor: 1.5, isMobile: true, hasTouch: true },
};

/** Per frame and per format: where the page's <video> sits, in CSS px of the viewport. */
export type EmbedRect = { x: number; y: number; width: number; height: number } | null;

/** What the recorder writes next to the clips (public/social-trailer/recording.json). */
export type Recording = Record<
  RecordFormat,
  Record<ShotId, { clip: string; embed: { slug: EmbedSlug; rects: EmbedRect[] } | null }>
>;
