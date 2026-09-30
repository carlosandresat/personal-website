import { Px, Sprite, hash, lerp, progress, step, type Grid } from "../draw";

// "Find and fix bugs": a magnifier tracks down a bug crawling through the
// code, squashes it, and the line turns green.

const LINES = [4, 7, 10, 13, 16, 19, 22, 25];
const BUG_LINE = 16;

export const BUG: Grid[] = [
  ["..33.", ".3333", ".3343", "3.3.3"],
  ["..33.", ".3333", ".3343", ".3.3."],
];
export const SPLAT: Grid = ["2.2.2", ".222.", "2.2.2"];
const LENS: Grid = [
  "..444....",
  ".4...4...",
  "4.....4..",
  "4.....4..",
  "4.....4..",
  ".4...4...",
  "..444.4..",
  "......22.",
  ".......22",
];
const CHECK: Grid = ["......4", ".....44", "4...44.", "44.44..", ".444...", "..4...."];

export function Bug({ frame }: { frame: number }) {
  const bugX = Math.round(4 + Math.min(frame, 18) * 0.6);
  const bugY = BUG_LINE - 4;
  const caught = frame >= 18;
  const squashed = frame >= 24;
  const lensIn = progress(frame, 4, 18);
  const lensOut = progress(frame, 26, 34);
  // Leaves up and to the left, clear of the check mark on the right.
  const lensX = lerp(lerp(32, bugX - 2, lensIn), -10, lensOut);
  const lensY = lerp(lerp(1, bugY - 3, lensIn), -10, lensOut);
  const fixed = progress(frame, 26, 36);

  return (
    <>
      {LINES.map((y, i) => {
        const indent = 2 + (i % 3) * 2;
        const width = 10 + Math.floor(hash(i, 4) * 18);
        const isBugLine = y === BUG_LINE;
        return (
          <g key={y}>
            <Px x={indent} y={y} w={width} c={isBugLine && !squashed ? "2" : "1"} />
            {isBugLine && fixed > 0 ? <Px x={indent} y={y} w={Math.round(width * fixed)} c="3" /> : null}
          </g>
        );
      })}

      {squashed ? (
        <Sprite grid={SPLAT} x={bugX} y={bugY + 1} />
      ) : (
        <Sprite
          grid={BUG[caught ? 0 : step(frame, 8) % 2]}
          x={bugX}
          y={bugY}
          tone={caught && step(frame, 10) % 2 === 0 ? "4" : undefined}
        />
      )}

      {lensOut < 1 ? <Sprite grid={LENS} x={lensX} y={lensY} /> : null}
      {squashed ? <Sprite grid={CHECK} x={30} y={frame < 27 ? 7 : 6} /> : null}
    </>
  );
}
