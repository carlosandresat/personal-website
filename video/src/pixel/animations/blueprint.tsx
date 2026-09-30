import { Px, Sprite, lerp, progress, step, type Grid } from "../draw";

// Planning: a proposal writes itself (scope, then cost), a roadmap's bars
// line up beside it, the proposal is signed and the plan gets stamped.

const DOC = { x: 3, y: 3, w: 16, h: 25 };
/** [y, width] of each line of the proposal, typed in order. */
const TEXT: [number, number][] = [
  [9, 11],
  [11, 9],
  [13, 10],
];
/** [y, start x, length] of each roadmap bar. */
const BARS: [number, number, number][] = [
  [10, 22, 6],
  [13, 25, 7],
  [16, 29, 6],
  [19, 32, 6],
];
const BARS_FROM = 44;
const BAR_FRAMES = 12;
const SIGN_FROM = 106;
const SIGN_TO = 130;
const STAMP_AT = 140;

const DOLLAR: Grid = [".4.", "444", "4..", "444", "..4", "444", ".4."];
/** A pen stroke, left to right, relative to (6, 22). */
const SIGNATURE = [
  [0, 2], [1, 1], [2, 0], [2, 1], [3, 2], [4, 2], [5, 1],
  [6, 0], [7, 1], [7, 2], [8, 2], [9, 1], [10, 1],
];
const STAMP: Grid = [
  ".44444.",
  "4111114",
  "4111134",
  "4311314",
  "4133114",
  "4111114",
  ".44444.",
];

export function Blueprint({ frame }: { frame: number }) {
  const title = Math.round(9 * progress(frame, 4, 10));
  const signed = Math.round(SIGNATURE.length * progress(frame, SIGN_FROM, SIGN_TO));
  const pen = SIGNATURE[Math.max(0, signed - 1)];
  const stampY = Math.round(lerp(-8, 22, progress(frame, STAMP_AT, STAMP_AT + 5)));
  const impact = frame >= STAMP_AT + 5 && frame < STAMP_AT + 11;
  const calendar = frame >= 30;

  return (
    <>
      {/* The proposal. */}
      <Px x={DOC.x} y={DOC.y} w={DOC.w} h={DOC.h} c="2" />
      <Px x={DOC.x + 1} y={DOC.y + 1} w={DOC.w - 2} h={DOC.h - 2} c="1" />
      <Px x={6} y={6} w={title} c="4" />
      {TEXT.map(([y, w], i) => {
        const from = 12 + i * 8;
        return <Px key={y} x={6} y={y} w={Math.round(w * progress(frame, from, from + 7))} c="3" />;
      })}
      {frame >= 38 ? (
        <>
          <Sprite grid={DOLLAR} x={6} y={15} />
          <Px x={10} y={18} w={Math.round(6 * progress(frame, 38, 44))} c="3" />
        </>
      ) : null}
      <Px x={6} y={25} w={11} c="2" />
      {SIGNATURE.slice(0, signed).map(([dx, dy], i) => (
        <Px key={i} x={6 + dx} y={22 + dy} c="4" />
      ))}
      {signed > 0 && frame < SIGN_TO + 4 ? (
        <>
          <Px x={7 + pen[0]} y={21 + pen[1]} c="2" />
          <Px x={8 + pen[0]} y={20 + pen[1]} c="3" />
        </>
      ) : null}

      {/* The roadmap: a calendar and bars that line up one after another. */}
      {calendar ? (
        <>
          <Px x={21} y={4} w={17} h={3} c="3" />
          <Px x={24} y={3} c="4" />
          <Px x={34} y={3} c="4" />
          <Px x={21} y={9} h={14} c="2" />
          <Px x={21} y={22} w={17} c="2" />
        </>
      ) : null}
      {BARS.map(([y, x, length], i) => {
        const from = BARS_FROM + i * BAR_FRAMES;
        const w = Math.round(length * progress(frame, from, from + BAR_FRAMES - 2));
        const growing = w > 0 && w < length;
        return (
          <g key={y}>
            <Px x={x} y={y} w={w} h={2} c="3" />
            {growing ? <Px x={x + w - 1} y={y} h={2} c="4" /> : null}
          </g>
        );
      })}

      {/* The seal lands under the roadmap: the plan is approved. */}
      {frame >= STAMP_AT ? <Sprite grid={STAMP} x={31} y={stampY} /> : null}
      {impact
        ? [
            [29, 21],
            [39, 21],
            [29, 29],
            [39, 29],
          ].map(([x, y], i) => <Px key={i} x={x} y={y} c={step(frame, 10) % 2 ? "3" : "4"} />)
        : null}
    </>
  );
}
