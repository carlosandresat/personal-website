import { Px, Sprite, lerp, progress, step } from "../draw";
import { BrowserFrame } from "./browser";
import { KID_RUN } from "./city";

// "Your first web page is one course away": a walk past seven milestones
// (the modules), and at the finish line their web page appears.

const PATH_Y = 24;
const MILESTONES = Array.from({ length: 7 }, (_, i) => 4 + i * 4);
const ARRIVE = 84;
const GOAL = { x: 14, y: 1, w: 24, h: 13 };

export function Journey({ frame }: { frame: number }) {
  const walkerX = lerp(1, 30, Math.min(frame, ARRIVE) / ARRIVE);
  const arrived = frame >= ARRIVE;
  const runner = arrived ? KID_RUN[1] : KID_RUN[step(frame, 8) % 2];
  const pop = progress(frame, ARRIVE, ARRIVE + 6);
  const pageH = Math.round(GOAL.h * pop);

  return (
    <>
      {/* The destination, sketched in until it's reached. */}
      {!arrived
        ? Array.from({ length: GOAL.w / 2 }, (_, i) => (
            <g key={i}>
              <Px x={GOAL.x + i * 2} y={GOAL.y} c="1" />
              <Px x={GOAL.x + i * 2} y={GOAL.y + GOAL.h - 1} c="1" />
            </g>
          ))
        : null}

      <Px x={1} y={PATH_Y} w={34} c="2" />
      {MILESTONES.map((mx) => (
        <Px key={mx} x={mx} y={PATH_Y - 1} w={2} h={2} c={walkerX + 3 >= mx ? "4" : "2"} />
      ))}

      {/* Finish flag. */}
      <Px x={34} y={PATH_Y - 9} h={9} c="2" />
      <Px x={35} y={PATH_Y - 9} w={3} h={2} c={step(frame, 6) % 2 ? "3" : "4"} />

      <Sprite grid={runner} x={walkerX} y={PATH_Y - runner.length - 1} />

      {pageH >= 4 ? (
        <>
          <BrowserFrame x={GOAL.x} y={GOAL.y} w={GOAL.w} h={pageH} outline="3" />
          {pop === 1 ? (
            <>
              <Px x={GOAL.x + 2} y={GOAL.y + 4} w={14} h={2} c="4" />
              <Px x={GOAL.x + 2} y={GOAL.y + 7} w={18} c="2" />
              <Px x={GOAL.x + 2} y={GOAL.y + 9} w={12} c="2" />
              <Px x={GOAL.x + 17} y={GOAL.y + 9} w={4} h={2} c="3" />
            </>
          ) : null}
        </>
      ) : null}

      {arrived
        ? [
            [11, 3],
            [39, 6],
            [12, 12],
          ].map(([x, y], i) => ((step(frame, 4) + i) % 3 !== 0 ? <Px key={i} x={x} y={y} c="4" /> : null))
        : null}
    </>
  );
}
