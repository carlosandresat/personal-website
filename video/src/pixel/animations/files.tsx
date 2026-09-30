import { Px, Sprite, lerp, progress, step, type Grid } from "../draw";

// "Read, process and save data in files": documents slide into a folder and
// a bar chart updates with each one.

const DOC: Grid = [
  "44443.",
  "444433",
  "444444",
  "422224",
  "444444",
  "422244",
  "444444",
  "422224",
];

/** One document per 45 frames, so an item's turn shows two of them. */
const CYCLE = 45;
const BARS_X = [31, 34, 37];
/** Chart heights after each document lands. */
const HEIGHTS = [
  [2, 3, 2],
  [4, 6, 3],
  [6, 5, 8],
  [8, 9, 6],
  [5, 8, 10],
];

export function Files({ frame }: { frame: number }) {
  const cycle = Math.floor(frame / CYCLE);
  const t = frame % CYCLE;
  const docX = lerp(-6, 15, progress(t, 0, 14));
  const docY = lerp(4, 13, progress(t, 14, 22));
  const grow = progress(t, 22, 32);
  const before = HEIGHTS[cycle % HEIGHTS.length];
  const after = HEIGHTS[(cycle + 1) % HEIGHTS.length];

  return (
    <>
      {/* Folder: back, then the document, then the front panel over it. */}
      <Px x={14} y={11} w={4} c="2" />
      <Px x={14} y={12} w={12} h={10} c="2" />
      {t < 22 ? <Sprite grid={DOC} x={docX} y={docY} /> : null}
      <Px x={14} y={15} w={12} h={7} c="3" />
      <Px x={15} y={16} w={10} c="4" />

      {/* Processing arrow. */}
      {t >= 20 && t < 34 && step(frame, 8) % 2 === 0 ? (
        <>
          <Px x={27} y={17} w={2} c="3" />
          <Px x={28} y={16} c="3" />
          <Px x={28} y={18} c="3" />
        </>
      ) : null}

      <Px x={30} y={8} h={14} c="2" />
      <Px x={30} y={21} w={10} c="2" />
      {BARS_X.map((x, i) => {
        const h = Math.round(lerp(before[i], after[i], grow));
        return (
          <g key={x}>
            <Px x={x} y={21 - h} w={2} h={h} c="3" />
            <Px x={x} y={21 - h} w={2} c="4" />
          </g>
        );
      })}
    </>
  );
}
