import { Px, Sprite, step, type Grid } from "../draw";

// "Automate repetitive tasks": boxes ride a belt and a press seals each one.

const BELT = 20;
const SPEED = 0.5;
const SPACING = 20;
/** Where box centres are when the press comes down. */
const PRESS_X = 20;

const OPEN_BOX: Grid = ["2.11.2", "222222", "222222", "222222", "222222"];
const SEALED_BOX: Grid = ["334433", "334433", "333333", "333333", "333333"];
const GEAR: Grid[] = [
  ["..4..", ".444.", "44.44", ".444.", "..4.."],
  ["4...4", ".444.", ".4.4.", ".444.", "4...4"],
];

export function Conveyor({ frame }: { frame: number }) {
  const shift = frame * SPEED;
  const first = Math.floor((frame - 100) / SPACING);
  const boxes: number[] = [];
  for (let i = first; i <= Math.floor(frame / SPACING) + 2; i++) {
    // Boxes already on the belt when the clip starts, then one per SPACING.
    const x = -6 + shift - i * SPACING * SPEED + 12;
    if (x > -7 && x < 41) boxes.push(x);
  }
  const pressing = boxes.some((x) => Math.abs(x + 3 - PRESS_X) < 1.5);

  return (
    <>
      {/* Press. */}
      <Px x={15} y={2} w={11} h={6} c="2" />
      <Sprite grid={GEAR[step(frame, 6) % 2]} x={18} y={2} />
      <Px x={20} y={8} h={pressing ? 5 : 2} c="2" />
      <Px x={17} y={pressing ? 13 : 10} w={7} h={2} c="3" />

      {boxes.map((x) => {
        const sealed = x + 3 >= PRESS_X;
        return <Sprite key={x} grid={sealed ? SEALED_BOX : OPEN_BOX} x={x} y={BELT - 5} />;
      })}

      <Px x={0} y={BELT} w={40} c="3" />
      <Px x={0} y={BELT + 1} w={40} h={3} c="1" />
      {Array.from({ length: 7 }, (_, i) => (
        <Px key={i} x={(i * 6 + Math.floor(shift)) % 42 - 1} y={BELT} c="4" />
      ))}
      {[3, 11, 19, 27, 35].map((x) => (
        <g key={x}>
          <Px x={x} y={BELT + 1} w={3} h={3} c="2" />
          <Px x={x + 1} y={BELT + 2} c={step(frame, 8) % 2 ? "3" : "1"} />
        </g>
      ))}
      <Px x={2} y={BELT + 4} h={4} c="2" />
      <Px x={37} y={BELT + 4} h={4} c="2" />
      <Px x={0} y={BELT + 8} w={40} c="2" />
    </>
  );
}
