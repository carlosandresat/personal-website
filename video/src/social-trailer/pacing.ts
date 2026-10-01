/**
 * The social trailer's clock. Everything is cut to a 120 BPM grid (a beat is
 * 15 frames, a bar 60) so scene changes land on the downbeats of the
 * generated soundtrack. Scripts run this file directly with Node's type
 * stripping (scripts/synth-audio.mts, scripts/record-site.mts), so it imports
 * nothing.
 */

export const FPS = 30;
export const BEAT = 15;
export const BAR = BEAT * 4;

/** Mirrors TRANSITION_FRAMES in course-trailer/pacing.ts (checked at runtime). */
export const TRANSITION = 12;

/** Where each scene takes over, in bars, and where the video ends. */
const CUT_BARS = { hook: 0, tour: 2, development: 6, courses: 9, closing: 13, end: 15 };

export type SceneId = Exclude<keyof typeof CUT_BARS, "end">;
export const SCENE_ORDER: SceneId[] = ["hook", "tour", "development", "courses", "closing"];

/** Absolute frame of each cut (mid-transition). */
export const CUT = Object.fromEntries(
  Object.entries(CUT_BARS).map(([id, bars]) => [id, bars * BAR])
) as Record<SceneId | "end", number>;

export const DURATION = CUT.end;

/**
 * Absolute frame where a scene's sequence starts: half a transition before
 * its cut, since the cross-fade overlaps both scenes. Scene-local frames
 * below are counted from here.
 */
export function sceneStart(id: SceneId) {
  return id === "hook" ? 0 : CUT[id] - TRANSITION / 2;
}

/** Sequence length, padded for the transitions on either side. */
export function sceneFrames(id: SceneId) {
  const i = SCENE_ORDER.indexOf(id);
  const next = SCENE_ORDER[i + 1];
  const end = next ? CUT[next] + TRANSITION / 2 : CUT.end;
  return end - sceneStart(id);
}

/** A scene-local frame for an absolute one. */
export function local(id: SceneId, absolute: number) {
  return absolute - sceneStart(id);
}

// --- 01 Hook ---------------------------------------------------------------

export const HOOK = {
  eyebrowAt: 4,
  eyebrowCharsPerFrame: 1.5,
  titleAt: 14,
  titleStagger: 5,
  subAt: 52,
};

// --- 02 Site tour ----------------------------------------------------------

/**
 * The recorded clips, cut on beats: the hero for a bar and a half, the
 * course catalog and a course page for three beats each, /development for
 * a bar. `from` is absolute; each clip is recorded a little longer than it
 * shows, to cover the cross-fades.
 */
export const TOUR_CLIPS = [
  { shot: "hero", from: CUT.tour, beats: 6 },
  { shot: "catalog", from: CUT.tour + 6 * BEAT, beats: 3 },
  { shot: "course", from: CUT.tour + 9 * BEAT, beats: 3 },
  { shot: "development", from: CUT.tour + 12 * BEAT, beats: 4 },
] as const;

export type ShotId = (typeof TOUR_CLIPS)[number]["shot"];

/** Frames a clip has to cover: its beats plus the overlap on either side. */
export function clipFrames(shot: ShotId) {
  const clip = TOUR_CLIPS.find((c) => c.shot === shot)!;
  return clip.beats * BEAT + TRANSITION + 6;
}

// --- 03 Development / 04 Courses -------------------------------------------

/** First list item, two beats after the cut; then one every three beats. */
export const ITEMS_AT = 2 * BEAT;
export const ITEM_EVERY = 3 * BEAT;

export function itemAt(id: "development" | "courses", index: number) {
  return local(id, CUT[id] + ITEMS_AT + index * ITEM_EVERY);
}

// --- 05 Closing ------------------------------------------------------------

export const CLOSING = {
  logoAt: 6,
  titleAt: 12,
  pillAt: 30,
  urlAt: 42,
  urlCharsPerFrame: 1.4,
};
