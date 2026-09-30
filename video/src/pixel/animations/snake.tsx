import { Px, step } from "../draw";

// "Build games in the console": a game of Snake playing itself.

/** Grid cells are 2×2 pixels inside a 1px border. */
const CELL = 2;
const OX = 2;
const OY = 2;

/** A closed route through the grid, as corners. */
const CORNERS: [number, number][] = [
  [1, 1], [14, 1], [14, 4], [4, 4], [4, 7], [15, 7], [15, 11], [1, 11], [1, 1],
];

function route(): [number, number][] {
  const cells: [number, number][] = [];
  for (let i = 0; i < CORNERS.length - 1; i++) {
    const [ax, ay] = CORNERS[i];
    const [bx, by] = CORNERS[i + 1];
    const steps = Math.abs(bx - ax) + Math.abs(by - ay);
    for (let s = 0; s < steps; s++) {
      cells.push([ax + Math.sign(bx - ax) * s, ay + Math.sign(by - ay) * s]);
    }
  }
  return cells;
}

const ROUTE = route();
/** Route positions (unrolled, so they keep counting past a lap) of food. */
const FOOD = [10, 24, 39, 52, 66, 81, 95, 110];
const SPEED = 0.8;

export function Snake({ frame }: { frame: number }) {
  const head = Math.floor(frame * SPEED) + 4;
  const eaten = FOOD.filter((f) => f <= head).length;
  const length = 4 + eaten * 2;
  const food = FOOD.find((f) => f > head);
  const justAte = FOOD.some((f) => f <= head && head - f < 3);
  const at = (i: number) => ROUTE[((i % ROUTE.length) + ROUTE.length) % ROUTE.length];

  return (
    <>
      <Px x={1} y={1} w={38} c="2" />
      <Px x={1} y={28} w={38} c="2" />
      <Px x={1} y={1} h={28} c="2" />
      <Px x={38} y={1} h={28} c="2" />

      {food !== undefined && step(frame, 8) % 2 === 0 ? (
        <Px x={OX + at(food)[0] * CELL} y={OY + at(food)[1] * CELL} w={CELL} h={CELL} c="4" />
      ) : null}

      {Array.from({ length }, (_, k) => head - k)
        .filter((i) => i >= 0)
        .map((i, k) => {
          const [cx, cy] = at(i);
          return (
            <Px
              key={i}
              x={OX + cx * CELL}
              y={OY + cy * CELL}
              w={CELL}
              h={CELL}
              c={k === 0 ? "4" : justAte && k < 3 ? "4" : "3"}
            />
          );
        })}

      {/* Score ticks along the top border. */}
      {Array.from({ length: eaten }, (_, i) => (
        <Px key={i} x={34 - i * 2} y={1} c="4" />
      ))}
    </>
  );
}
