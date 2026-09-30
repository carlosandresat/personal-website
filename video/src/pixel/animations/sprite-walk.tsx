import { Px, Sprite, step } from "../draw";
import { MASCOT, MASCOT_H, MASCOT_W, blinking } from "../mascot";

// The blocks demo running: forever { move 10 steps; bounce if on edge;
// next costume }. The mascot paces the stage and flips at each wall.

const FLOOR = 25;
const LEFT = 2;
const RIGHT = 40 - 2 - MASCOT_W;
const SPEED = 0.6;

/** Before the green flag: the mascot waits where the walk will start. */
export function SpriteStand({ frame }: { frame: number }) {
  return (
    <>
      <Px x={0} y={FLOOR} w={40} c="2" />
      <Px x={0} y={2} h={FLOOR - 2} c="2" />
      <Px x={39} y={2} h={FLOOR - 2} c="2" />
      <Sprite grid={frame % 90 > 84 ? blinking(MASCOT[0]) : MASCOT[0]} x={LEFT} y={FLOOR - MASCOT_H} />
    </>
  );
}

export function SpriteWalk({ frame }: { frame: number }) {
  const span = RIGHT - LEFT;
  const lap = Math.floor(frame * SPEED) % (span * 2);
  const forward = lap < span;
  const x = forward ? LEFT + lap : RIGHT - (lap - span);
  const atLeft = x <= LEFT + 1;
  const atRight = x >= RIGHT - 1;

  return (
    <>
      <Px x={0} y={FLOOR} w={40} c="2" />
      <Px x={0} y={2} h={FLOOR - 2} c={atLeft ? "4" : "2"} />
      <Px x={39} y={2} h={FLOOR - 2} c={atRight ? "4" : "2"} />

      {/* Footprints of the last few "move 10 steps". */}
      {[1, 2, 3].map((k) => (
        <Px key={k} x={x + MASCOT_W / 2 - (forward ? k * 3 : -k * 3)} y={FLOOR + 2} c={k === 1 ? "3" : "2"} />
      ))}

      <Sprite grid={MASCOT[step(frame, 6) % 2]} x={x} y={FLOOR - MASCOT_H} flip={!forward} />
    </>
  );
}
