import { Px, Sprite, hash, progress, step, type Grid } from "../draw";
import type { PixelTone } from "../palette";

// Deployment: a countdown, the app lifts off, and the world lights up with
// people using it.

const FLOOR = 27;
const ROCKET_X = 17;
const LIFTOFF = 40;
const GLOBE_AT = 66;
const USERS_FROM = 82;
const CX = 20;
const CY = 16;
const R = 10;

const DIGITS: Grid[] = [
  ["444", "..4", ".44", "..4", "444"],
  ["444", "..4", "444", "4..", "444"],
  [".4.", "44.", ".4.", ".4.", "444"],
];

const ROCKET: Grid = [
  "...4...",
  "..444..",
  ".44444.",
  ".41114.",
  ".41114.",
  ".44444.",
  ".43334.",
  ".43334.",
  ".44444.",
  "3444443",
  "33.4.33",
  "3.....3",
];
const FLAMES: Grid[] = [
  ["444", "434", ".3.", ".2."],
  ["434", ".4.", ".3.", "..."],
];

function Globe({ frame, radius }: { frame: number; radius: number }) {
  const spin = Math.floor(frame / 5);
  const pixels: React.ReactNode[] = [];
  for (let y = CY - R; y <= CY + R; y++) {
    for (let x = CX - R; x <= CX + R; x++) {
      const dist = Math.hypot(x - CX, y - CY);
      if (dist > radius) continue;
      let c: PixelTone = "1";
      if (dist > radius - 1) c = "2";
      else if (hash(Math.floor((((x - CX + spin) % 24) + 24) % 24 / 3), Math.floor(y / 3)) > 0.55) c = "3";
      pixels.push(<Px key={`${x}:${y}`} x={x} y={y} c={c} />);
    }
  }
  return (
    <>
      {pixels}
      {radius >= R ? <Px x={CX - 5} y={CY - 6} w={2} c="4" /> : null}
    </>
  );
}

/** Where each user lights up, around the globe. */
const USERS = Array.from({ length: 8 }, (_, k) => {
  const a = ((k * 45 + 20) * Math.PI) / 180;
  return { x: Math.round(CX + Math.cos(a) * 14), y: Math.round(CY + Math.sin(a) * 11), at: USERS_FROM + k * 7 };
});

export function Launch({ frame }: { frame: number }) {
  const count = Math.floor(frame / 10);
  const lift = Math.max(0, frame - LIFTOFF);
  const rocketY = FLOOR - ROCKET.length - Math.round(lift * lift * 0.045);
  const ignited = frame >= LIFTOFF - 8;
  // The camera follows the rocket up: the ground drops out of view.
  const ground = Math.round(Math.max(0, frame - 56) * 0.9);
  const radius = Math.round(R * progress(frame, GLOBE_AT, GLOBE_AT + 8));

  return (
    <>
      {frame < 30 ? <Sprite grid={DIGITS[Math.min(2, count)]} x={3} y={3} /> : null}

      {frame < GLOBE_AT ? (
        <>
          {/* Launch tower and pad. */}
          <Px x={27} y={12 + ground} h={15} w={2} c="2" />
          {[14, 18, 22].map((y) => (
            <Px key={y} x={24} y={y + ground} w={3} c="2" />
          ))}
          <Px x={12} y={FLOOR + ground} w={17} c="2" />
          <Px x={0} y={FLOOR + 1 + ground} w={40} h={2} c="1" />

          {/* Smoke rolling out from the pad on ignition. */}
          {ignited
            ? [-1, 1].flatMap((dir) =>
                [0, 1, 2].map((k) => {
                  const spread = Math.min(12, (frame - LIFTOFF + 8) * 0.4 + k * 3);
                  return (
                    <Px
                      key={`${dir}:${k}`}
                      x={CX + dir * spread - 1}
                      y={FLOOR - 2 - k + ground}
                      w={3 - (k === 2 ? 1 : 0)}
                      h={2}
                      c={k === 0 ? "3" : "2"}
                    />
                  );
                })
              )
            : null}

          {rocketY > -ROCKET.length ? (
            <>
              <Sprite grid={ROCKET} x={ROCKET_X} y={rocketY} />
              {ignited ? (
                <Sprite grid={FLAMES[step(frame, 10) % 2]} x={ROCKET_X + 2} y={rocketY + ROCKET.length} />
              ) : null}
            </>
          ) : null}

          {/* Speed streaks once it's flying. */}
          {lift > 6
            ? [8, 30, 12, 34].map((x, i) => (
                <Px key={i} x={x} y={(i * 9 + frame * 2) % 34 - 4} h={3} c="2" />
              ))
            : null}
        </>
      ) : (
        <Globe frame={frame} radius={radius} />
      )}

      {USERS.map(({ x, y, at }, k) => {
        if (frame < at) return null;
        const since = frame - at;
        const lit = (step(frame, 3) + k) % 7 !== 0;
        return (
          <g key={k}>
            <Px x={x} y={y} c={since < 6 || lit ? "4" : "3"} />
            {since < 6
              ? [
                  [-2, 0],
                  [2, 0],
                  [0, -2],
                  [0, 2],
                ].map(([dx, dy], i) => <Px key={i} x={x + dx} y={y + dy} c="3" />)
              : null}
          </g>
        );
      })}

      {/* On air. */}
      {frame >= USERS_FROM ? (
        <>
          <Px x={2} y={2} w={2} h={2} c={step(frame, 3) % 2 ? "4" : "2"} />
          <Px x={5} y={2} w={7} h={2} c="3" />
        </>
      ) : null}
    </>
  );
}
