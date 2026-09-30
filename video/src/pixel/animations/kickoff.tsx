import { Px, Sprite, lerp, progress, step, type Grid } from "../draw";
import { BUBBLE, CHECK, CLIENT, DEVELOPER, QUESTION } from "./people";

// Requirements: the client shares an idea, the developer asks about it and
// writes everything down, and the notes get a check.

const FLOOR = 27;
const NOTE = { x: 14, y: 7, w: 12, h: 19 };
/** Written width of each line of notes. */
const LINES = [8, 6, 8, 5, 7];
const WRITE_FROM = 60;
const LINE_FRAMES = 12;
const DONE = WRITE_FROM + LINES.length * LINE_FRAMES + 4;

const BULB: Grid = [".444.", "44444", "44444", "44444", ".444.", ".343.", ".222.", "..2.."];
/** Rays around the bulb, relative to its top-left corner. */
const RAYS = [
  [2, -2],
  [-2, 2],
  [6, 2],
  [-1, -1],
  [5, -1],
];

export function Kickoff({ frame }: { frame: number }) {
  const idea = frame >= 8 && frame < DONE;
  const asking = frame >= 36 && frame < WRITE_FROM;
  const writing = frame >= WRITE_FROM && frame < DONE;
  const done = frame >= DONE;
  const talk = step(frame, 6) % 2;
  const hop = done && frame < DONE + 10 ? Math.round(2 * Math.sin((Math.PI * (frame - DONE)) / 10)) : 0;
  const noteY = Math.round(lerp(30, NOTE.y, progress(frame, 44, 54)));

  const clientY = FLOOR - CLIENT.length - hop - (idea && frame < 36 ? talk : 0);
  const devY = FLOOR - DEVELOPER.length - hop - (asking || writing ? talk : 0);

  const written = LINES.map((w, i) => {
    const from = WRITE_FROM + i * LINE_FRAMES;
    return Math.round(w * progress(frame, from, from + LINE_FRAMES - 2));
  });
  const current = Math.min(LINES.length - 1, Math.max(0, Math.floor((frame - WRITE_FROM) / LINE_FRAMES)));
  const tipX = NOTE.x + 2 + written[current];
  const tipY = noteY + 3 + current * 2;

  return (
    <>
      <Px x={0} y={FLOOR} w={40} c="2" />

      {/* The notepad rises between them, then fills line by line. */}
      {noteY < 30 ? (
        <>
          <Px x={NOTE.x} y={noteY} w={NOTE.w} h={NOTE.h} c="2" />
          <Px x={NOTE.x + 1} y={noteY + 1} w={NOTE.w - 2} h={NOTE.h - 2} c="1" />
          {[0, 1, 2, 3].map((i) => (
            <Px key={i} x={NOTE.x + 2 + i * 3} y={noteY - 1} c="3" />
          ))}
          {written.map((w, i) => (
            <Px key={i} x={NOTE.x + 2} y={noteY + 3 + i * 2} w={w} c="3" />
          ))}
        </>
      ) : null}

      {writing ? (
        <>
          <Px x={tipX} y={tipY} c="4" />
          <Px x={tipX + 1} y={tipY - 1} c="2" />
          <Px x={tipX + 2} y={tipY - 2} c="2" />
          <Px x={tipX + 3} y={tipY - 3} c="3" />
        </>
      ) : null}

      {done ? (
        <>
          <Sprite grid={CHECK} x={NOTE.x + 3} y={noteY + 12} />
          {[
            [11, 5],
            [28, 8],
            [12, 21],
            [28, 24],
          ].map(([x, y], i) => ((step(frame, 4) + i) % 3 !== 0 ? <Px key={i} x={x} y={y} c="4" /> : null))}
        </>
      ) : null}

      {idea ? (
        <>
          {/* The idea: a bulb over the client's head, glowing on and off. */}
          <Sprite grid={BULB} x={3} y={5} tone={step(frame, 4) % 2 === 0 ? undefined : "3"} />
          {step(frame, 4) % 2 === 0
            ? RAYS.map(([dx, dy], i) => <Px key={i} x={3 + dx} y={5 + dy} c="4" />)
            : null}
        </>
      ) : null}

      {asking ? (
        <>
          <Sprite grid={BUBBLE} x={30} y={5} />
          <Px x={33} y={12} c="3" />
          <Sprite grid={QUESTION} x={32} y={6} />
        </>
      ) : null}

      <Sprite grid={CLIENT} x={3} y={clientY} />
      <Sprite grid={DEVELOPER} x={31} y={devY} flip />
    </>
  );
}
