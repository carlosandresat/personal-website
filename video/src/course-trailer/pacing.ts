import { REPLAY_AFTER } from "../pixel/animations";

/**
 * Each list item's turn on screen before the next one arrives (3 s): long
 * enough to read it and to watch its stage animation play twice.
 */
export const ITEM_FRAMES = REPLAY_AFTER * 2;
/** The last item, and with it the complete list, stays this long (3.5 s). */
export const HOLD_FRAMES = ITEM_FRAMES + 15;
/** Fade between two pages of the same list. */
export const PAGE_SWAP_FRAMES = 12;
/** The motivations' central idea, on its own (4 s): it's the longest line. */
export const HERO_FRAMES = 120;
/** Cross-fade between scenes; it overlaps both, so scenes pad for it. */
export const TRANSITION_FRAMES = 12;

/** Frames a list of `count` items needs from its first item's entrance. */
export function listFrames(count: number) {
  return (count - 1) * ITEM_FRAMES + HOLD_FRAMES;
}

export const pad2 = (n: number) => String(n).padStart(2, "0");
