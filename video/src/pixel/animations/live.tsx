import { Px, Sprite, step, type Grid } from "../draw";

// "Live classes": a student's "?" gets an instant "!" from the instructor on
// screen, and the student hops.

const FLOOR = 26;

const BUBBLE: Grid = [
  ".33333.",
  "3.....3",
  "3.....3",
  "3.....3",
  "3.....3",
  "3.....3",
  ".33333.",
];
const QUESTION: Grid = ["444", "..4", ".44", "...", ".4."];
const BANG: Grid = ["4", "4", "4", ".", "4"];

const STUDENT: Grid = [
  "..44..", "..44..", ".3333.", "3.33.3", "3.33.3", "..33..",
  "..33..", "..33..", ".3..3.", ".3..3.", ".3..3.",
];

export function Live({ frame }: { frame: number }) {
  const asked = frame >= 8;
  const answered = frame >= 22;
  const resolved = frame >= 34;
  const talking = step(frame, 8) % 2 === 0;
  const hop = resolved && frame < 44 ? Math.round(3 * Math.sin((Math.PI * (frame - 34)) / 10)) : 0;
  const bob = step(frame, 3) % 2;

  return (
    <>
      {/* Monitor with the instructor. */}
      <Px x={2} y={3} w={24} h={18} c="2" />
      <Px x={3} y={4} w={22} h={16} c="1" />
      <Px x={12} y={21} w={4} c="2" />
      <Px x={9} y={22} w={10} c="2" />
      {step(frame, 3) % 2 === 0 ? <Px x={5} y={6} w={2} h={2} c="4" /> : null}
      <Px x={12} y={9} w={4} h={4} c="4" />
      <Px x={13} y={11} w={2} c={talking && !resolved ? "1" : "4"} />
      <Px x={13} y={13} w={2} c="3" />
      <Px x={9} y={14} w={10} h={6} c="3" />

      {answered ? (
        <>
          <Sprite grid={BUBBLE} x={17} y={5 - bob} />
          <Sprite grid={BANG} x={20} y={6 - bob} />
        </>
      ) : null}

      <Px x={0} y={FLOOR} w={40} c="2" />
      <Sprite grid={STUDENT} x={30} y={FLOOR - STUDENT.length - hop} />

      {asked && !resolved ? (
        <>
          <Sprite grid={BUBBLE} x={29} y={4} />
          <Px x={31} y={11} c="3" />
          <Sprite grid={QUESTION} x={31} y={5} />
        </>
      ) : null}
    </>
  );
}
