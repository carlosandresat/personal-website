import { Px, Sprite, hash, progress, step, type Grid } from "../draw";

// "Python is your gateway to AI": a door swings open onto light and a robot.

const LEFT = 14;
const RIGHT = 25;
const TOP = 6;
const FLOOR = 26;

const ROBOT: Grid = [
  "....4...",
  "....1...",
  ".111111.",
  ".141141.",
  ".111111.",
  ".114411.",
  "..1111..",
  "11111111",
  "1.1111.1",
  "1.1111.1",
  "..1..1..",
  "..1..1..",
];

export function Door({ frame }: { frame: number }) {
  const open = progress(frame, 4, 18);
  const panel = Math.round(12 - open * 10);
  const robotRise = progress(frame, 14, 24);
  const blinking = frame % 40 >= 36;
  const antenna = step(frame, 4) % 2 === 0 ? "4" : "3";

  const robotY = Math.round(FLOOR - 12 + (1 - robotRise) * 12);
  const robot = ROBOT.map((row, i) => {
    if (i === 0) return row.replace("4", antenna);
    if (i === 3 && blinking) return row.replace(/4/g, "1");
    return row;
  });

  return (
    <>
      {/* Light spilling out across the floor. */}
      {open > 0.4
        ? [1, 2, 3].map((d) => (
            <Px key={d} x={LEFT - d * 2} y={FLOOR - 1 + d} w={RIGHT - LEFT + 1 + d * 4} c="2" />
          ))
        : null}

      <Px x={LEFT} y={TOP} w={RIGHT - LEFT + 1} h={FLOOR - TOP} c="3" />
      <Px x={LEFT + 3} y={TOP + 3} w={RIGHT - LEFT - 5} h={FLOOR - TOP - 6} c="4" />

      {/* Data rising out of the doorway. */}
      {open > 0.6
        ? Array.from({ length: 6 }, (_, i) => {
            const y = FLOOR - 2 - ((frame * 0.4 + hash(i) * 20) % 18);
            return <Px key={i} x={LEFT + 1 + Math.floor(hash(i, 3) * 10)} y={y} c="2" />;
          })
        : null}

      {/* Rises through the floor: only the rows above it are drawn. */}
      {robotRise > 0 ? <Sprite grid={robot.slice(0, FLOOR - robotY)} x={16} y={robotY} /> : null}

      {panel > 0 ? (
        <>
          <Px x={LEFT} y={TOP} w={panel} h={FLOOR - TOP} c="1" />
          <Px x={LEFT + panel - 1} y={TOP} h={FLOOR - TOP} c="2" />
          {panel > 3 ? <Px x={LEFT + panel - 3} y={16} c="3" /> : null}
        </>
      ) : null}

      <Px x={LEFT - 1} y={TOP - 1} w={RIGHT - LEFT + 3} c="2" />
      <Px x={LEFT - 1} y={TOP} h={FLOOR - TOP} c="2" />
      <Px x={RIGHT + 1} y={TOP} h={FLOOR - TOP} c="2" />
      <Px x={0} y={FLOOR} w={LEFT - 1} c="2" />
      <Px x={RIGHT + 2} y={FLOOR} w={40 - RIGHT - 2} c="2" />
    </>
  );
}
