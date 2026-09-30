import { Px, Sprite, hash, progress, step, type Grid } from "../draw";

// "Don't get left behind": the city keeps moving and lighting up, and the
// runner with the laptop keeps pace with it.

/** Skyline strip that repeats every STRIP pixels: [x, width, height]. */
const STRIP = 56;
const BUILDINGS: [number, number, number][] = [
  [0, 7, 13],
  [8, 5, 9],
  [14, 8, 17],
  [23, 6, 11],
  [30, 9, 15],
  [40, 5, 8],
  [46, 8, 19],
];
const GROUND = 24;

const RUN: Grid[] = [
  [
    "..44..",
    "..44..",
    ".3333.",
    "3.33.3",
    "..33..",
    "..33..",
    ".3..3.",
    ".3..3.",
    "3....3",
    "3....3",
  ],
  [
    "..44..",
    "..44..",
    ".3333.",
    ".3333.",
    "..33..",
    "..33..",
    "..33..",
    "..3.3.",
    "..3.3.",
    ".3..3.",
  ],
];

const LAPTOP: Grid = ["444.", "424.", "444.", "2222"];

/** A child runner (hair, shorter, with a tablet) for the kids' courses. */
export const KID_RUN: Grid[] = [
  ["..22..", "..44..", ".3333.", "3.33.3", "..33..", ".2..2.", "2....2"],
  ["..22..", "..44..", ".3333.", ".3333.", "..33..", "..22..", ".2.2.."],
];
const TABLET: Grid = ["44", "42", "44"];

function Building({ x, index, lit }: { x: number; index: number; lit: number }) {
  const [, width, height] = BUILDINGS[index];
  const top = GROUND - height;
  const windows: React.ReactNode[] = [];
  for (let wy = top + 2; wy < GROUND - 1; wy += 2) {
    for (let wx = 1; wx < width - 1; wx += 2) {
      const on = hash(index * 13 + wx, wy) < lit;
      windows.push(<Px key={`${wx}:${wy}`} x={x + wx} y={wy} c={on ? "4" : "2"} />);
    }
  }
  return (
    <>
      <Px x={x} y={top} w={width} h={height} c="1" />
      {windows}
    </>
  );
}

export function City({ frame, kid = false }: { frame: number; kid?: boolean }) {
  const offset = Math.floor(frame * 0.5) % STRIP;
  const lit = 0.12 + 0.8 * progress(frame, 0, 70);
  const run = step(frame, 8) % 2;
  const runner = kid ? KID_RUN[run] : RUN[run];
  const runnerX = 15;
  const runnerY = GROUND - runner.length - (run === 1 ? 1 : 0);

  return (
    <>
      {/* Stars and moon, fixed in the sky. */}
      {[3, 9, 17, 26, 35].map((sx, i) =>
        (step(frame, 3) + i) % 4 !== 0 ? <Px key={sx} x={sx} y={2 + (i % 3) * 2} c="2" /> : null
      )}
      <Sprite grid={[".33", "3..", ".33"]} x={33} y={2} />

      {[0, 1].flatMap((k) =>
        BUILDINGS.map(([bx], index) => (
          <Building key={`${k}:${index}`} x={bx + k * STRIP - offset} index={index} lit={lit} />
        ))
      )}

      <Px x={0} y={GROUND} w={40} c="2" />
      <Px x={0} y={GROUND + 1} w={40} h={5} c="1" />
      {Array.from({ length: 6 }, (_, i) => (
        <Px key={i} x={((i * 8 - frame) % 48 + 48) % 48 - 4} y={GROUND + 3} w={3} c="3" />
      ))}

      {/* Speed lines behind the runner. */}
      {[0, 1, 2].map((i) =>
        (step(frame, 10) + i) % 3 !== 0 ? (
          <Px key={i} x={runnerX - 4 - i * 2} y={runnerY + 3 + i * 2} w={3} c="2" />
        ) : null
      )}
      {/* A screen-coloured halo keeps the runner legible over the windows. */}
      {[[-1, 0], [1, 0], [0, -1], [0, 1]].map(([dx, dy]) => (
        <Sprite key={`${dx}:${dy}`} grid={runner} x={runnerX + dx} y={runnerY + dy} tone="0" />
      ))}
      <Sprite grid={runner} x={runnerX} y={runnerY} />
      {kid ? (
        <Sprite grid={TABLET} x={runnerX + 6} y={runnerY + 2} />
      ) : (
        <Sprite grid={LAPTOP} x={runnerX + 6} y={runnerY + 2} />
      )}
    </>
  );
}

/** Same city, with a child keeping pace: "don't let your kids fall behind". */
export function CityKid({ frame }: { frame: number }) {
  return <City frame={frame} kid />;
}
