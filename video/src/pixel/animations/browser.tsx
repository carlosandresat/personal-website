import { Px, type Grid } from "../draw";
import type { PixelTone } from "../palette";

/** Mouse pointer; draw with its tip at (x, y). */
export const CURSOR: Grid = ["4...", "44..", "444.", "4444", "44..", "4.4."];

/**
 * A browser window: outline, a title bar with three dots, and a content
 * area filled with `body`. Content starts at (x + 1, y + 3).
 */
export function BrowserFrame({
  x,
  y,
  w,
  h,
  body = "1",
  outline = "2",
}: {
  x: number;
  y: number;
  w: number;
  h: number;
  body?: PixelTone;
  outline?: PixelTone;
}) {
  if (w < 3 || h < 4) return null;
  return (
    <>
      <Px x={x} y={y} w={w} h={h} c={outline} />
      <Px x={x + 1} y={y + 3} w={w - 2} h={h - 4} c={body} />
      {w >= 8 ? (
        <>
          <Px x={x + 1} y={y + 1} c="4" />
          <Px x={x + 3} y={y + 1} c="3" />
          <Px x={x + 5} y={y + 1} c="3" />
        </>
      ) : null}
    </>
  );
}
