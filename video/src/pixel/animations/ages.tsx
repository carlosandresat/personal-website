import { Px, Sprite, step, transpose, type Grid } from "../draw";

// "Never too late (or too early)": a turning hourglass over a child, an adult
// and an older adult with a cane, each hopping and waving in turn.

const FLOOR = 26;

const HOURGLASS: Grid = [
  "333333333",
  ".3.....3.",
  ".3.....3.",
  "..3...3..",
  "...3.3...",
  "....3....",
  "...3.3...",
  "..3...3..",
  ".3.....3.",
  ".3.....3.",
  "333333333",
];

/** Interior cells [x, y] in the order sand settles in each bulb. */
const TOP_BULB: [number, number][] = [
  [4, 4],
  [3, 3], [4, 3], [5, 3],
  [2, 2], [3, 2], [4, 2], [5, 2], [6, 2],
  [2, 1], [3, 1], [4, 1], [5, 1], [6, 1],
];
const BOTTOM_BULB: [number, number][] = [
  [2, 9], [3, 9], [4, 9], [5, 9], [6, 9],
  [2, 8], [3, 8], [4, 8], [5, 8], [6, 8],
  [3, 7], [4, 7], [5, 7],
  [4, 6],
];

type Person = { down: Grid; wave: Grid };

const CHILD: Person = {
  down: [".44.", ".44.", "3333", ".33.", ".33.", ".3.3", ".3.3"],
  wave: [".44.3", ".443.", "333..", ".33..", ".33..", ".3.3.", ".3.3."],
};

const ADULT: Person = {
  down: [
    "..44..", "..44..", ".3333.", "3.33.3", "3.33.3", "..33..",
    "..33..", "..33..", ".3..3.", ".3..3.", ".3..3.",
  ],
  wave: [
    "..44.3", "..44.3", ".33333", "3.33..", "3.33..", "..33..",
    "..33..", "..33..", ".3..3.", ".3..3.", ".3..3.",
  ],
};

const ELDER: Person = {
  down: [
    "...44..", "...44..", "..333..", ".3333..", "..33.3.", "..33..2",
    "..33..2", "..33..2", ".3..3.2", ".3..3.2", ".3..3.2",
  ],
  wave: [
    "3..44..", ".3.44..", "..333..", "..333..", "..33.3.", "..33..2",
    "..33..2", "..33..2", ".3..3.2", ".3..3.2", ".3..3.2",
  ],
};

function Hopper({ person, x, frame, offset }: { person: Person; x: number; frame: number; offset: number }) {
  const t = frame - offset;
  if (t < 0) return null;
  const phase = t % 30;
  const jump = phase < 10 ? Math.round(4 * Math.sin((Math.PI * phase) / 10)) : 0;
  const grid = phase < 12 && step(t, 8) % 2 === 0 ? person.wave : person.down;
  return <Sprite grid={grid} x={x} y={FLOOR - grid.length - jump} />;
}

function Hourglass({ frame }: { frame: number }) {
  const t = frame % 60;
  const x = 15;
  const y = 3;

  // Last 12 frames of the cycle: tipped on its side, turning over.
  if (t >= 48) {
    return t < 54 ? (
      <Sprite grid={transpose(HOURGLASS)} x={x - 1} y={y + 1} />
    ) : (
      <Sprite grid={HOURGLASS} x={x} y={y} />
    );
  }

  const fallen = Math.round((t / 48) * TOP_BULB.length);
  return (
    <>
      <Sprite grid={HOURGLASS} x={x} y={y} />
      {TOP_BULB.slice(0, TOP_BULB.length - fallen).map(([cx, cy]) => (
        <Px key={`t${cx}:${cy}`} x={x + cx} y={y + cy} c="4" />
      ))}
      {BOTTOM_BULB.slice(0, fallen).map(([cx, cy]) => (
        <Px key={`b${cx}:${cy}`} x={x + cx} y={y + cy} c="4" />
      ))}
      {fallen < TOP_BULB.length && step(frame, 10) % 2 === 0 ? <Px x={x + 4} y={y + 5} c="4" /> : null}
    </>
  );
}

export function Ages({ frame }: { frame: number }) {
  return (
    <>
      <Hourglass frame={frame} />
      <Px x={0} y={FLOOR} w={40} c="2" />
      <Hopper person={CHILD} x={7} frame={frame} offset={0} />
      <Hopper person={ADULT} x={17} frame={frame} offset={6} />
      <Hopper person={ELDER} x={28} frame={frame} offset={12} />
    </>
  );
}
