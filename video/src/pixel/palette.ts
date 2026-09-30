import { color } from "../theme";

/**
 * One character per pixel in sprite grids. "1"–"4" are brand greens from dark
 * to bright; "0" is the screen colour itself, for painting over something.
 */
export type PixelTone = "0" | "1" | "2" | "3" | "4";

export const PIXEL: Record<PixelTone, string> = {
  "0": "hsla(142, 40%, 5%, 1)",
  "1": "hsla(142, 55%, 13%, 1)",
  "2": "hsla(142, 60%, 24%, 1)",
  "3": color.brand(),
  "4": "hsla(142, 85%, 72%, 1)",
};

/** Logical resolution of the stage screen. */
export const SCREEN_W = 40;
export const SCREEN_H = 30;
