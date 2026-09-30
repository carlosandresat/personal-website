import { Px, Sprite, type Grid } from "../draw";

// "You learn by doing": every hammer blow lays another brick in the wall.

const FLOOR = 27;
const PER_ROW = 4;
const ROWS = 4;
const PREBUILT = 6;
/** Frames between blows; the wall is done by frame 40, inside one play. */
const BEAT = 4;

const HAMMER: Grid = ["..2..", "..2..", "..2..", "..2..", "44444", "44444"];

function brickAt(index: number): [number, number] {
  const row = Math.floor(index / PER_ROW);
  const col = index % PER_ROW;
  return [10 + (row % 2) * 2 + col * 5, FLOOR - 3 - row * 3];
}

export function Bricks({ frame }: { frame: number }) {
  const total = PER_ROW * ROWS;
  const laid = Math.min(total, PREBUILT + Math.max(0, Math.floor((frame - 4) / BEAT) + 1));
  const sinceBlow = (frame - 4) % BEAT;
  const building = laid < total;

  const [nx, ny] = brickAt(Math.min(laid, total - 1));
  const [lx, ly] = brickAt(laid - 1);
  const striking = building && sinceBlow < 2;
  const hammerX = building ? nx : lx;
  const hammerY = (building ? ny : ly) - (striking ? 6 : 10);

  return (
    <>
      <Px x={0} y={FLOOR} w={40} c="2" />
      {Array.from({ length: laid }, (_, i) => {
        const [x, y] = brickAt(i);
        const fresh = i === laid - 1 && laid > PREBUILT && sinceBlow < 3;
        return <Px key={i} x={x} y={y} w={4} h={2} c={fresh ? "4" : "3"} />;
      })}

      {/* Sparks off the newest brick. */}
      {laid > PREBUILT && sinceBlow < 4 && frame >= 4
        ? [-1, 1].flatMap((dir) => [
            <Px key={`${dir}a`} x={lx + 1.5 + dir * (2 + sinceBlow)} y={ly - 1 - sinceBlow} c="4" />,
            <Px key={`${dir}b`} x={lx + 1.5 + dir * (3 + sinceBlow * 2)} y={ly - sinceBlow} c="3" />,
          ])
        : null}

      <Sprite grid={HAMMER} x={hammerX} y={hammerY} />
    </>
  );
}
