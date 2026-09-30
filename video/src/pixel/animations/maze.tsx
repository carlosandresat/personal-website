import { Px, step } from "../draw";

// "Coding trains how you solve problems": a dot works its way through a maze.

const MAZE = [
  "###################",
  "#S  #       #     #",
  "### # ##### # ### #",
  "#   #   #   #   # #",
  "# ##### # ##### # #",
  "#     # #     # # #",
  "##### # ##### # # #",
  "#   # #     # #   #",
  "# # # ##### # #####",
  "# #   #   # #     #",
  "# ##### # # ##### #",
  "#       #   #    G#",
  "###################",
];

/** Each maze cell is 2×2 screen pixels. */
const CELL = 2;
const OX = 1;
const OY = 2;

type Cell = [number, number];

function find(mark: string): Cell {
  const y = MAZE.findIndex((row) => row.includes(mark));
  return [MAZE[y].indexOf(mark), y];
}

/** Shortest path from S to G, found once at load. */
function solve(): Cell[] {
  const [sx, sy] = find("S");
  const [gx, gy] = find("G");
  const key = (x: number, y: number) => `${x},${y}`;
  const from = new Map<string, Cell | null>([[key(sx, sy), null]]);
  const queue: Cell[] = [[sx, sy]];

  while (queue.length) {
    const [x, y] = queue.shift()!;
    if (x === gx && y === gy) break;
    for (const [dx, dy] of [[1, 0], [-1, 0], [0, 1], [0, -1]]) {
      const nx = x + dx;
      const ny = y + dy;
      if (MAZE[ny]?.[nx] === "#" || from.has(key(nx, ny))) continue;
      from.set(key(nx, ny), [x, y]);
      queue.push([nx, ny]);
    }
  }

  if (!from.has(key(gx, gy))) throw new Error("Maze has no path from S to G");
  const path: Cell[] = [];
  let cell: Cell | null = [gx, gy];
  while (cell) {
    path.unshift(cell);
    cell = from.get(key(cell[0], cell[1])) ?? null;
  }
  return path;
}

const PATH = solve();
const [GOAL_X, GOAL_Y] = find("G");

export function Maze({ frame }: { frame: number }) {
  const shown = Math.min(PATH.length, Math.floor(frame * (PATH.length / 32)));
  const solved = shown === PATH.length;
  const blink = step(frame, 6) % 2 === 0;

  return (
    <>
      {MAZE.flatMap((row, y) =>
        [...row].map((ch, x) =>
          ch === "#" ? <Px key={`${x}:${y}`} x={OX + x * CELL} y={OY + y * CELL} w={CELL} h={CELL} c="2" /> : null
        )
      )}
      {PATH.slice(0, shown).map(([x, y], i) => (
        <Px
          key={i}
          x={OX + x * CELL}
          y={OY + y * CELL}
          w={CELL}
          h={CELL}
          c={i === shown - 1 && !solved ? (blink ? "4" : "3") : "3"}
        />
      ))}
      <Px
        x={OX + GOAL_X * CELL}
        y={OY + GOAL_Y * CELL}
        w={CELL}
        h={CELL}
        c={solved ? (blink ? "4" : "3") : blink ? "3" : "2"}
      />
      {solved && blink ? (
        <>
          <Px x={OX + GOAL_X * CELL - 1} y={OY + GOAL_Y * CELL - 2} c="4" />
          <Px x={OX + GOAL_X * CELL + 2} y={OY + GOAL_Y * CELL - 2} c="4" />
        </>
      ) : null}
    </>
  );
}
