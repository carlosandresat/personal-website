import { PAGE_SWAP_FRAMES, TRANSITION_FRAMES } from "../course-trailer/pacing";

export const INTRO_FRAMES = 120;
export const CLOSING_FRAMES = 120;

/** When the first phase arrives in the phases scene. */
export const PHASES_START = 16;
/**
 * Each phase's turn (6.5 s): its title and summary, then the client's part
 * and the developer's, each with time to be read while the stage tells it.
 */
export const PHASE_FRAMES = 195;
/** Beats inside a phase, from its start. */
export const SUMMARY_AT = 10;
export const CLIENT_AT = 50;
export const DEVELOPER_AT = 100;

export function phaseStart(index: number) {
  return PHASES_START + index * PHASE_FRAMES;
}

export function phasesFrames(count: number) {
  return phaseStart(count) + TRANSITION_FRAMES;
}

export { PAGE_SWAP_FRAMES };
