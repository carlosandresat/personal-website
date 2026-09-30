import { useCurrentFrame } from "remotion";

import { Sprite, step, type Grid } from "./draw";
import { PIXEL } from "./palette";

// The trailers' own pixel kid: stands in for course artwork we shouldn't use
// in promotion (e.g. the Scratch Cat), and is the sprite the blocks program.

const HEAD: Grid = [
  "...2222...",
  "..222222..",
  "..244442..",
  "..414414..",
  "..444444..",
  "...4114...",
  "....44....",
  "..333333..",
];

const BLINK_ROW = "..444444..";

/** Two costumes, so "next costume" reads as a walk cycle. */
export const MASCOT: Grid[] = [
  [
    ...HEAD,
    ".3.3333.3.",
    ".4.3333.4.",
    "...3333...",
    "...2..2...",
    "...2..2...",
    "..11..11..",
  ],
  [
    ...HEAD,
    "..333333..",
    "..433334..",
    "...3333...",
    "..2....2..",
    ".2......2.",
    ".11....11.",
  ],
];

export const MASCOT_W = 10;
export const MASCOT_H = 14;

/** A mascot costume with its eyes shut, for blinking. */
export function blinking(grid: Grid): Grid {
  return grid.map((row, i) => (i === 3 ? BLINK_ROW : row));
}

/**
 * The mascot on its own, scaled up as artwork (title and closing scenes):
 * bobbing, blinking now and then, with a soft brand glow behind it.
 */
export function MascotArt({ size }: { size: number }) {
  const frame = useCurrentFrame();
  const bob = step(frame, 3) % 2;
  const costume = frame % 90 > 84 ? blinking(MASCOT[0]) : MASCOT[0];

  return (
    <svg
      viewBox={`-1 -2 ${MASCOT_W + 2} ${MASCOT_H + 3}`}
      width={size}
      height={(size * (MASCOT_H + 3)) / (MASCOT_W + 2)}
      shapeRendering="crispEdges"
      style={{ filter: `drop-shadow(0 0 ${size / 10}px ${PIXEL["3"]})` }}
    >
      <Sprite grid={costume} x={0} y={-bob} />
    </svg>
  );
}
