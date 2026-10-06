import type { Scene } from "./types";

export const FPS = 30;
/** Frames of each scene before its voice starts, and after it ends. */
export const LEAD = 8;
export const TAIL = 14;
/** Each scene fades in over this many frames (no overlap, so audio stays put). */
export const FADE = 8;
/** Without a recording, scenes are sized from the text at a calm speaking pace. */
const WORDS_PER_SECOND = 2.6;

/** Shortest a scene can be, so its animation has room even with a short line. */
const MIN_SECONDS: Record<Scene["kind"], number> = {
  hook: 2.5,
  points: 3,
  plot: 4,
  graph: 4,
  array: 4,
  code: 4,
  pixel: 3.5,
  outro: 3.5,
};

/** Frame of the cover image: the hook's headline is fully in by then. */
export const COVER_FRAME = 70;

export const plain = (say: string) => say.replace(/\*/g, "");

export function estimateSeconds(say: string | undefined) {
  if (!say) return 0;
  return plain(say).split(/\s+/).filter(Boolean).length / WORDS_PER_SECOND;
}

/** Voice length in frames: the recording if there is one, else the estimate. */
export function voiceFrames(scene: Scene, recorded: number | null) {
  return Math.ceil((recorded ?? estimateSeconds(scene.say)) * FPS);
}

export function sceneFrames(scene: Scene, recorded: number | null) {
  const voiced = LEAD + voiceFrames(scene, recorded) + TAIL;
  const hold = Math.round((scene.hold ?? 0) * FPS);
  return Math.max(Math.round(MIN_SECONDS[scene.kind] * FPS), voiced + hold);
}

/**
 * When step `i` of `n` happens: its own `at` if given, else spread evenly
 * between `from` and `to` (fractions of the scene).
 */
export function stepFrame(frames: number, i: number, n: number, at?: number, from = 0.08, to = 0.75) {
  const fraction = at ?? (n <= 1 ? from : from + ((to - from) * i) / (n - 1));
  return Math.round(fraction * frames);
}
