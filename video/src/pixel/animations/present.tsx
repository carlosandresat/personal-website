import { Px, Sprite, hash, progress, step } from "../draw";
import { MASCOT, MASCOT_H } from "../mascot";

// "Present their projects with confidence": the kid points at their project
// on a big screen and the audience applauds.

const STAGE_FLOOR = 20;
const SEATS = [3, 9, 15, 21, 27, 33];

export function Present({ frame }: { frame: number }) {
  const bars = [5, 8, 6, 10];
  const grow = progress(frame, 0, 12);
  const pointing = frame >= 6 && step(frame, 3) % 3 !== 2;
  const clapping = frame >= 18;

  return (
    <>
      {/* The project on screen: a chart that builds up. */}
      <Px x={2} y={3} w={20} h={14} c="2" />
      <Px x={3} y={4} w={18} h={12} c="1" />
      {bars.map((h, i) => {
        const height = Math.round(h * grow);
        return <Px key={i} x={5 + i * 4} y={14 - height} w={2} h={height} c={i === 3 ? "4" : "3"} />;
      })}
      <Px x={4} y={14} w={16} c="2" />
      <Px x={6} y={17} h={3} c="2" />
      <Px x={17} y={17} h={3} c="2" />

      <Px x={0} y={STAGE_FLOOR} w={40} c="2" />
      <Sprite grid={MASCOT[0]} x={26} y={STAGE_FLOOR - MASCOT_H} />
      {pointing ? <Px x={22} y={STAGE_FLOOR - 5} w={4} c="4" /> : null}

      {/* Audience: heads and shoulders, clapping and cheering. */}
      {SEATS.map((x, i) => {
        const bob = clapping && (step(frame, 6) + i) % 2 === 0 ? 1 : 0;
        const clap = clapping && (step(frame, 8) + i) % 2 === 0;
        return (
          <g key={x}>
            <Px x={x + 1} y={24 - bob} w={2} h={2} c="2" />
            <Px x={x} y={26 - bob} w={4} h={4} c="1" />
            {clapping ? (
              clap ? (
                <Px x={x + 1} y={22 - bob} w={2} c="4" />
              ) : (
                <>
                  <Px x={x} y={22 - bob} c="3" />
                  <Px x={x + 3} y={22 - bob} c="3" />
                </>
              )
            ) : null}
          </g>
        );
      })}

      {/* Cheers rising from the seats. */}
      {frame >= 22
        ? SEATS.map((x, i) => {
            const t = (frame + Math.floor(hash(i) * 20)) % 20;
            return <Px key={i} x={x + 2} y={21 - t / 2} c={t < 10 ? "4" : "3"} />;
          })
        : null}
    </>
  );
}
